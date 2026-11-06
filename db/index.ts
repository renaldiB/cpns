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

// Enable WAL, foreign keys, and busy timeout for high reliability
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("busy_timeout = 5000");

export const db = drizzle(sqlite, { schema });
export const sqliteDb = sqlite;
