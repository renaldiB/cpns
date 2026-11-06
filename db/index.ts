import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";
import { runMigrations } from "./migrate";
import { seedDatabase } from "./seed";

// Determine if running in serverless Lambda runtime
const isLambdaRuntime = !!(
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT ||
  (process.env.NETLIFY && process.env.NEXT_RUNTIME === "nodejs")
);

// Database location: Lambda runtime must write to /tmp/app.db, while build & local uses data/app.db
const dbPath =
  process.env.DATABASE_URL ||
  (isLambdaRuntime ? path.join("/tmp", "app.db") : path.join(process.cwd(), "data", "app.db"));

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// In serverless Lambda, copy bundled data/app.db to /tmp/app.db if available
if (isLambdaRuntime && !fs.existsSync(dbPath)) {
  const localDb = path.join(process.cwd(), "data", "app.db");
  if (fs.existsSync(localDb)) {
    try {
      fs.copyFileSync(localDb, dbPath);
    } catch (_) {}
  }
}

// Single connection instance exported immediately
export const sqliteDb = new Database(dbPath);

// Pragmas
try {
  sqliteDb.pragma(isLambdaRuntime ? "journal_mode = DELETE" : "journal_mode = WAL");
  sqliteDb.pragma("foreign_keys = ON");
  sqliteDb.pragma("busy_timeout = 5000");
} catch (_) {}

export const db = drizzle(sqliteDb, { schema });

// Self-healing schema & seed check (guarantees all tables and 840 questions exist)
try {
  // 1. Ensure migrations are applied
  runMigrations(sqliteDb);

  // 2. Check if questions are fully seeded (all 840 questions)
  const qCount = sqliteDb
    .prepare("SELECT count(*) as count FROM questions WHERE deleted_at IS NULL")
    .get() as { count: number } | undefined;

  if (!qCount || qCount.count < 840) {
    console.log(`Self-healing: Found ${qCount?.count ?? 0}/840 questions. Running seed...`);
    seedDatabase({ customSqlite: sqliteDb, customDrizzle: db, cleanAttempts: false });
  }
} catch (err) {
  console.error("Database self-healing initialization error:", err);
}
