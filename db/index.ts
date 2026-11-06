import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const isServerless = !!(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const dbPath =
  process.env.DATABASE_URL ||
  (isServerless ? path.join("/tmp", "app.db") : path.join(process.cwd(), "data", "app.db"));

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// In serverless, if /tmp/app.db doesn't exist but data/app.db exists in bundle, copy it
if (isServerless && !fs.existsSync(dbPath)) {
  const localDb = path.join(process.cwd(), "data", "app.db");
  if (fs.existsSync(localDb)) {
    try {
      fs.copyFileSync(localDb, dbPath);
    } catch (_) {}
  }
}

// Single connection instance
const sqlite = new Database(dbPath);

// Configuration pragmas: DELETE mode is safest on ephemeral /tmp serverless mount
try {
  sqlite.pragma(isServerless ? "journal_mode = DELETE" : "journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 5000");
} catch (_) {}

// Self-healing schema & seed check (guarantees tables exist on serverless cold starts)
try {
  const tableCheck = sqlite
    .prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='questions'")
    .get() as { count: number } | undefined;

  if (!tableCheck || tableCheck.count === 0) {
    const { runMigrations } = require("./migrate");
    const { seedDatabase } = require("./seed");
    runMigrations();
    seedDatabase();
  }
} catch (err) {
  console.error("Database self-healing initialization error:", err);
}

export const db = drizzle(sqlite, { schema });
export const sqliteDb = sqlite;
