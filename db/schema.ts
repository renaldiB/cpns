import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";

export const examProfiles = sqliteTable("exam_profiles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  year: integer("year").notNull(),
  examType: text("exam_type").notNull().default("cpns"),
  description: text("description").notNull(),
  referenceStatus: text("reference_status").notNull().default("historical"), // official_current, historical, estimated, unverified
  sourceTitle: text("source_title"),
  sourceUrl: text("source_url"),
  sourceDocumentNumber: text("source_document_number"),
  verifiedAt: text("verified_at"),
  durationSeconds: integer("duration_seconds").notNull().default(6000),
  rulesJson: text("rules_json").notNull(),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const questionBatches = sqliteTable(
  "question_batches",
  {
    id: text("id").primaryKey(), // e.g. "batch-1", "batch-2"
    batchNumber: integer("batch_number").notNull().unique(), // 1, 2, ...
    name: text("name").notNull(), // e.g. "Batch 1: Standar BKN 2024"
    description: text("description"),
    targetYear: integer("target_year").default(2024),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("idx_question_batches_num").on(table.batchNumber),
  ]
);

export const questions = sqliteTable(
  "questions",
  {
    id: text("id").primaryKey(),
    externalId: text("external_id").unique(),
    batchId: text("batch_id").default("batch-1"),
    batchNumber: integer("batch_number").notNull().default(1),
    category: text("category").notNull(), // TWK, TIU, TKP
    subtopic: text("subtopic").notNull(),
    stem: text("stem").notNull(),
    imagePath: text("image_path"),
    explanation: text("explanation").notNull(),
    difficulty: integer("difficulty").notNull().default(2), // 1, 2, 3
    sourceNote: text("source_note").notNull().default("original"),
    sourceReference: text("source_reference"),
    reviewStatus: text("review_status").notNull().default("needs_review"), // draft, needs_review, verified
    reviewNote: text("review_note"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    deletedAt: text("deleted_at"), // Soft-delete
  },
  (table) => [
    index("idx_questions_cat_sub").on(table.category, table.subtopic),
    index("idx_questions_difficulty").on(table.difficulty),
    index("idx_questions_review_status").on(table.reviewStatus),
    index("idx_questions_batch").on(table.batchNumber),
    index("idx_questions_deleted_at").on(table.deletedAt),
  ]
);

export const options = sqliteTable(
  "options",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    label: text("label").notNull(), // A, B, C, D, E
    text: text("text").notNull(),
    points: integer("points").notNull(), // 0 or 5 for TWK/TIU; 1..5 for TKP
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_options_question_id").on(table.questionId),
  ]
);

export const attempts = sqliteTable(
  "attempts",
  {
    id: text("id").primaryKey(),
    mode: text("mode").notNull(), // full, practice
    examProfileId: text("exam_profile_id")
      .notNull()
      .references(() => examProfiles.id),
    examProfileSnapshotJson: text("exam_profile_snapshot_json").notNull(),
    batchFilter: integer("batch_filter"), // Optional: if attempt targets specific batch (e.g. 1, 2)
    categoryFilter: text("category_filter"), // For practice mode (e.g. TWK)
    subtopicFilterJson: text("subtopic_filter_json"), // JSON array of subtopics
    startedAt: text("started_at").notNull(),
    deadlineAt: text("deadline_at"), // null if timer disabled
    finishedAt: text("finished_at"),
    durationSecSnapshot: integer("duration_sec_snapshot").notNull(),
    status: text("status").notNull().default("in_progress"), // in_progress, finished, expired, cancelled
    questionCountSnapshot: integer("question_count_snapshot").notNull(),
    randomSeed: integer("random_seed").notNull(),
    scoreTwk: integer("score_twk"),
    scoreTiu: integer("score_tiu"),
    scoreTkp: integer("score_tkp"),
    scoreTotal: integer("score_total"),
    isPassed: integer("is_passed", { mode: "boolean" }),
    summaryJson: text("summary_json"), // JSON object: stats, accuracies, tkp breakdown
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_attempts_status").on(table.status),
    index("idx_attempts_mode").on(table.mode),
    index("idx_attempts_created_at").on(table.createdAt),
  ]
);

export const attemptQuestions = sqliteTable(
  "attempt_questions",
  {
    id: text("id").primaryKey(),
    attemptId: text("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    questionId: text("question_id").references(() => questions.id, { onDelete: "set null" }),
    position: integer("position").notNull(), // 1..110
    questionSnapshotJson: text("question_snapshot_json").notNull(), // frozen question + shuffled options mapping
    selectedOptionSnapshotId: text("selected_option_snapshot_id"),
    flagged: integer("flagged", { mode: "boolean" }).notNull().default(false),
    answeredAt: text("answered_at"),
    pointsAwarded: integer("points_awarded"),
    version: integer("version").notNull().default(1), // concurrency / race condition control
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_attempt_questions_attempt_id").on(table.attemptId),
    uniqueIndex("idx_attempt_questions_position").on(table.attemptId, table.position),
  ]
);

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  valueJson: text("value_json").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const backupRecords = sqliteTable("backup_records", {
  id: text("id").primaryKey(),
  filename: text("filename").notNull(),
  filePath: text("file_path").notNull(),
  fileSizeBytes: integer("file_size_bytes").notNull(),
  backupType: text("backup_type").notNull().default("manual"), // manual, auto_pre_restore
  checksum: text("checksum"),
  status: text("status").notNull().default("success"),
  createdAt: text("created_at").notNull(),
});
