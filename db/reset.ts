import { sqliteDb } from "./index";
import { runMigrations } from "./migrate";

export function resetDatabase() {
  const args = process.argv.slice(2);
  if (!args.includes("--confirm") && !args.includes("-y")) {
    console.error("PERINGATAN: Perintah ini akan menghapus SELURUH data database.");
    console.error("Untuk melanjutkan, jalankan dengan flag: npm run db:reset -- --confirm");
    process.exit(1);
  }

  console.log("Mereset database SQLite...");

  sqliteDb.exec(`
    DROP TABLE IF EXISTS attempt_questions;
    DROP TABLE IF EXISTS attempts;
    DROP TABLE IF EXISTS options;
    DROP TABLE IF EXISTS questions;
    DROP TABLE IF EXISTS exam_profiles;
    DROP TABLE IF EXISTS settings;
    DROP TABLE IF EXISTS backup_records;
  `);

  runMigrations();
  console.log("Database berhasil di-reset dan migrasi baru diterapkan.");
}

if (require.main === module || process.argv[1]?.endsWith("reset.ts")) {
  resetDatabase();
}
