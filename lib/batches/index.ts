import { db, sqliteDb } from "@/db";
import { questionBatches, questions } from "@/db/schema";
import { eq, desc, and, isNull } from "drizzle-orm";

export interface BatchSummary {
  id: string;
  batchNumber: number;
  name: string;
  description: string | null;
  targetYear: number | null;
  isActive: boolean;
  totalQuestions: number;
  twkCount: number;
  tiuCount: number;
  tkpCount: number;
  createdAt: string;
  updatedAt: string;
}

export function getAllBatches(): BatchSummary[] {
  let batches = db.select().from(questionBatches).orderBy(questionBatches.batchNumber).all();

  if (batches.length === 0) {
    try {
      const { seedDatabase } = require("@/db/seed");
      seedDatabase({ customSqlite: sqliteDb, customDrizzle: db, cleanAttempts: false });
      batches = db.select().from(questionBatches).orderBy(questionBatches.batchNumber).all();
    } catch (_) {}
  }

  // Aggregate questions per batch
  const counts = sqliteDb
    .prepare(
      `
      SELECT 
        batch_number as batchNumber,
        COUNT(*) as total,
        SUM(CASE WHEN category = 'TWK' THEN 1 ELSE 0 END) as twk,
        SUM(CASE WHEN category = 'TIU' THEN 1 ELSE 0 END) as tiu,
        SUM(CASE WHEN category = 'TKP' THEN 1 ELSE 0 END) as tkp
      FROM questions
      WHERE deleted_at IS NULL
      GROUP BY batch_number
    `
    )
    .all() as Array<{
    batchNumber: number;
    total: number;
    twk: number;
    tiu: number;
    tkp: number;
  }>;

  const countMap = new Map<number, { total: number; twk: number; tiu: number; tkp: number }>();
  for (const c of counts) {
    countMap.set(c.batchNumber, {
      total: c.total || 0,
      twk: c.twk || 0,
      tiu: c.tiu || 0,
      tkp: c.tkp || 0,
    });
  }

  return batches.map((b) => {
    const stat = countMap.get(b.batchNumber) || { total: 0, twk: 0, tiu: 0, tkp: 0 };
    return {
      id: b.id,
      batchNumber: b.batchNumber,
      name: b.name,
      description: b.description,
      targetYear: b.targetYear,
      isActive: Boolean(b.isActive),
      totalQuestions: stat.total,
      twkCount: stat.twk,
      tiuCount: stat.tiu,
      tkpCount: stat.tkp,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };
  });
}

export function getBatchById(id: string): BatchSummary | null {
  const b = db.select().from(questionBatches).where(eq(questionBatches.id, id)).get();
  if (!b) return null;

  const stat = sqliteDb
    .prepare(
      `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN category = 'TWK' THEN 1 ELSE 0 END) as twk,
        SUM(CASE WHEN category = 'TIU' THEN 1 ELSE 0 END) as tiu,
        SUM(CASE WHEN category = 'TKP' THEN 1 ELSE 0 END) as tkp
      FROM questions
      WHERE batch_number = ? AND deleted_at IS NULL
    `
    )
    .get(b.batchNumber) as { total: number; twk: number; tiu: number; tkp: number } | undefined;

  return {
    id: b.id,
    batchNumber: b.batchNumber,
    name: b.name,
    description: b.description,
    targetYear: b.targetYear,
    isActive: Boolean(b.isActive),
    totalQuestions: stat?.total || 0,
    twkCount: stat?.twk || 0,
    tiuCount: stat?.tiu || 0,
    tkpCount: stat?.tkp || 0,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

export function createBatch(data: {
  name: string;
  batchNumber?: number;
  description?: string;
  targetYear?: number;
}): BatchSummary {
  const all = db.select().from(questionBatches).all();

  let nextNum = data.batchNumber;
  if (!nextNum || nextNum < 1) {
    const maxNum = all.reduce((max, b) => Math.max(max, b.batchNumber), 0);
    nextNum = maxNum + 1;
  }

  const existingNum = all.find((b) => b.batchNumber === nextNum);
  if (existingNum) {
    throw new Error(`Nomor batch ${nextNum} sudah digunakan (${existingNum.name}).`);
  }

  const id = `batch-${nextNum}`;
  const nowIso = new Date().toISOString();

  db.insert(questionBatches)
    .values({
      id,
      batchNumber: nextNum,
      name: data.name.trim(),
      description: data.description?.trim() || null,
      targetYear: data.targetYear || 2026,
      isActive: true,
      createdAt: nowIso,
      updatedAt: nowIso,
    })
    .run();

  return getBatchById(id)!;
}

export function updateBatch(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    targetYear: number;
    isActive: boolean;
  }>
) {
  const existing = db.select().from(questionBatches).where(eq(questionBatches.id, id)).get();
  if (!existing) {
    throw new Error("Batch tidak ditemukan.");
  }

  const nowIso = new Date().toISOString();
  db.update(questionBatches)
    .set({
      ...(data.name ? { name: data.name.trim() } : {}),
      ...(data.description !== undefined ? { description: data.description?.trim() || null } : {}),
      ...(data.targetYear !== undefined ? { targetYear: data.targetYear } : {}),
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      updatedAt: nowIso,
    })
    .where(eq(questionBatches.id, id))
    .run();

  return getBatchById(id)!;
}

export function deleteBatch(id: string) {
  const existing = db.select().from(questionBatches).where(eq(questionBatches.id, id)).get();
  if (!existing) {
    throw new Error("Batch tidak ditemukan.");
  }

  if (existing.batchNumber === 1) {
    throw new Error("Batch 1 adalah paket bawaan dan tidak dapat dihapus.");
  }

  const countRow = sqliteDb
    .prepare("SELECT COUNT(*) as count FROM questions WHERE batch_number = ? AND deleted_at IS NULL")
    .get(existing.batchNumber) as { count: number };

  if (countRow.count > 0) {
    throw new Error(`Batch tidak dapat dihapus karena masih memiliki ${countRow.count} soal.`);
  }

  db.delete(questionBatches).where(eq(questionBatches.id, id)).run();
  return { success: true };
}
