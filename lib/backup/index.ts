import path from "path";
import fs from "fs";
import crypto from "crypto";
import { sqliteDb, db } from "@/db";
import { backupRecords } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const BACKUP_DIR = path.join(process.cwd(), "data", "backups");

export interface BackupMetadata {
  id: string;
  filename: string;
  filePath: string;
  fileSizeBytes: number;
  backupType: "manual" | "auto_pre_restore";
  checksum: string;
  status: "success" | "failed";
  createdAt: string;
}

/**
 * Ensure backup directory exists
 */
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

/**
 * Calculate SHA-256 checksum of a file
 */
export function calculateChecksum(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

/**
 * Safely create a SQLite backup using the SQLite Online Backup API
 */
export async function createSafeBackup(backupType: "manual" | "auto_pre_restore" = "manual"): Promise<BackupMetadata> {
  ensureBackupDir();

  // First run WAL checkpoint to ensure all changes are flushed
  sqliteDb.pragma("wal_checkpoint(TRUNCATE)");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `backup_${backupType}_${timestamp}.db`;
  const targetPath = path.join(BACKUP_DIR, filename);

  // Execute better-sqlite3 native safe online backup API
  await sqliteDb.backup(targetPath);

  const stats = fs.statSync(targetPath);
  const checksum = calculateChecksum(targetPath);
  const nowIso = new Date().toISOString();
  const backupId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const record: BackupMetadata = {
    id: backupId,
    filename,
    filePath: targetPath,
    fileSizeBytes: stats.size,
    backupType,
    checksum,
    status: "success",
    createdAt: nowIso,
  };

  db.insert(backupRecords)
    .values({
      id: record.id,
      filename: record.filename,
      filePath: record.filePath,
      fileSizeBytes: record.fileSizeBytes,
      backupType: record.backupType,
      checksum: record.checksum,
      status: record.status,
      createdAt: record.createdAt,
    })
    .run();

  return record;
}

/**
 * List all backup records
 */
export function listBackups(): BackupMetadata[] {
  ensureBackupDir();
  const records = db
    .select()
    .from(backupRecords)
    .orderBy(desc(backupRecords.createdAt))
    .all();

  return records.map((r) => ({
    id: r.id,
    filename: r.filename,
    filePath: r.filePath,
    fileSizeBytes: r.fileSizeBytes,
    backupType: r.backupType as "manual" | "auto_pre_restore",
    checksum: r.checksum || "",
    status: r.status as "success" | "failed",
    createdAt: r.createdAt,
  }));
}

/**
 * Restore database from a backup file with pre-backup and integrity verification
 */
export async function restoreFromBackup(sourceBackupPath: string): Promise<{ success: boolean; preBackupId: string }> {
  if (!fs.existsSync(sourceBackupPath)) {
    throw new Error(`File backup tidak ditemukan: ${sourceBackupPath}`);
  }

  // Verify file has valid SQLite header (first 16 bytes: "SQLite format 3\0")
  const fd = fs.openSync(sourceBackupPath, "r");
  const headerBuf = Buffer.alloc(16);
  fs.readSync(fd, headerBuf, 0, 16, 0);
  fs.closeSync(fd);

  if (headerBuf.toString("utf8", 0, 15) !== "SQLite format 3") {
    throw new Error("File bukan database SQLite yang valid atau file corrupt.");
  }

  // 1. Automatically create pre-restore backup
  const preBackup = await createSafeBackup("auto_pre_restore");

  // 2. Perform safe restore by copying pages to the current active database
  // In better-sqlite3, we can open the source database and back it up into the active database file!
  const Database = (await import("better-sqlite3")).default;
  const sourceDb = new Database(sourceBackupPath, { readonly: true });

  const currentDbPath = process.env.DATABASE_URL || path.join(process.cwd(), "data", "app.db");

  // Run integrity check on source before applying
  const integrity = sourceDb.pragma("integrity_check") as Array<{ integrity_check: string }>;
  if (!integrity || integrity[0]?.integrity_check !== "ok") {
    sourceDb.close();
    throw new Error("Pemeriksaan integritas backup sumber gagal (corrupt).");
  }

  // Apply backup from source to active db
  await sourceDb.backup(currentDbPath);
  sourceDb.close();

  // Re-verify current db
  sqliteDb.pragma("wal_checkpoint(TRUNCATE)");
  const currentIntegrity = sqliteDb.pragma("integrity_check") as Array<{ integrity_check: string }>;
  if (!currentIntegrity || currentIntegrity[0]?.integrity_check !== "ok") {
    throw new Error("Pemeriksaan integritas setelah restore gagal.");
  }

  return { success: true, preBackupId: preBackup.id };
}
