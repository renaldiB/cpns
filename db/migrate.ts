import { sqliteDb } from "./index";

export function runMigrations() {
  console.log("Running SQLite database schema migrations...");

  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS exam_profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      year INTEGER NOT NULL,
      exam_type TEXT NOT NULL DEFAULT 'cpns',
      description TEXT NOT NULL,
      reference_status TEXT NOT NULL DEFAULT 'historical',
      source_title TEXT,
      source_url TEXT,
      source_document_number TEXT,
      verified_at TEXT,
      duration_seconds INTEGER NOT NULL DEFAULT 6000,
      rules_json TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      external_id TEXT UNIQUE,
      category TEXT NOT NULL,
      subtopic TEXT NOT NULL,
      stem TEXT NOT NULL,
      image_path TEXT,
      explanation TEXT NOT NULL,
      difficulty INTEGER NOT NULL DEFAULT 2,
      source_note TEXT NOT NULL DEFAULT 'original',
      source_reference TEXT,
      review_status TEXT NOT NULL DEFAULT 'needs_review',
      review_note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_questions_cat_sub ON questions(category, subtopic);
    CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
    CREATE INDEX IF NOT EXISTS idx_questions_review_status ON questions(review_status);
    CREATE INDEX IF NOT EXISTS idx_questions_deleted_at ON questions(deleted_at);

    CREATE TABLE IF NOT EXISTS options (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      text TEXT NOT NULL,
      points INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);

    CREATE TABLE IF NOT EXISTS attempts (
      id TEXT PRIMARY KEY,
      mode TEXT NOT NULL,
      exam_profile_id TEXT NOT NULL REFERENCES exam_profiles(id),
      exam_profile_snapshot_json TEXT NOT NULL,
      category_filter TEXT,
      subtopic_filter_json TEXT,
      started_at TEXT NOT NULL,
      deadline_at TEXT,
      finished_at TEXT,
      duration_sec_snapshot INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'in_progress',
      question_count_snapshot INTEGER NOT NULL,
      random_seed INTEGER NOT NULL,
      score_twk INTEGER,
      score_tiu INTEGER,
      score_tkp INTEGER,
      score_total INTEGER,
      is_passed INTEGER,
      summary_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_attempts_status ON attempts(status);
    CREATE INDEX IF NOT EXISTS idx_attempts_mode ON attempts(mode);
    CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON attempts(created_at);

    CREATE TABLE IF NOT EXISTS attempt_questions (
      id TEXT PRIMARY KEY,
      attempt_id TEXT NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
      question_id TEXT REFERENCES questions(id) ON DELETE SET NULL,
      position INTEGER NOT NULL,
      question_snapshot_json TEXT NOT NULL,
      selected_option_snapshot_id TEXT,
      flagged INTEGER NOT NULL DEFAULT 0,
      answered_at TEXT,
      points_awarded INTEGER,
      version INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_attempt_questions_attempt_id ON attempt_questions(attempt_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_attempt_questions_position ON attempt_questions(attempt_id, position);

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS backup_records (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_size_bytes INTEGER NOT NULL,
      backup_type TEXT NOT NULL DEFAULT 'manual',
      checksum TEXT,
      status TEXT NOT NULL DEFAULT 'success',
      created_at TEXT NOT NULL
    );
  `);

  console.log("Migrations applied successfully.");
}

if (require.main === module || process.argv[1]?.endsWith("migrate.ts")) {
  runMigrations();
}
