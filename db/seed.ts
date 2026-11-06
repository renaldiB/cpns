import fs from "fs";
import path from "path";
import { runMigrations } from "./migrate";
import { db, sqliteDb } from "./index";
import { examProfiles, questions, options, settings } from "./schema";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import { eq } from "drizzle-orm";

export function seedDatabase() {
  console.log("Memulai proses seeding database...");

  // 1. Ensure migrations are applied safely first
  runMigrations();

  const nowIso = new Date().toISOString();

  // 2. Seed Baseline Exam Profile
  const existingProfile = db
    .select()
    .from(examProfiles)
    .where(eq(examProfiles.id, BASELINE_EXAM_PROFILE.id))
    .get();

  if (!existingProfile) {
    console.log(`Menyimpan profil ujian baseline: ${BASELINE_EXAM_PROFILE.name}...`);
    db.insert(examProfiles)
      .values({
        id: BASELINE_EXAM_PROFILE.id,
        name: BASELINE_EXAM_PROFILE.name,
        year: BASELINE_EXAM_PROFILE.year,
        examType: BASELINE_EXAM_PROFILE.examType,
        description: BASELINE_EXAM_PROFILE.description,
        referenceStatus: BASELINE_EXAM_PROFILE.referenceStatus,
        sourceTitle: BASELINE_EXAM_PROFILE.sourceTitle,
        sourceUrl: BASELINE_EXAM_PROFILE.sourceUrl,
        sourceDocumentNumber: BASELINE_EXAM_PROFILE.sourceDocumentNumber,
        verifiedAt: BASELINE_EXAM_PROFILE.verifiedAt,
        durationSeconds: BASELINE_EXAM_PROFILE.durationSeconds,
        rulesJson: JSON.stringify(BASELINE_EXAM_PROFILE),
        isDefault: true,
        createdAt: nowIso,
        updatedAt: nowIso,
      })
      .run();
  } else {
    console.log(`Profil ujian baseline '${BASELINE_EXAM_PROFILE.id}' sudah ada.`);
  }

  // 3. Seed Default Settings
  const existingTheme = db.select().from(settings).where(eq(settings.key, "theme")).get();
  if (!existingTheme) {
    db.insert(settings)
      .values({
        key: "theme",
        valueJson: JSON.stringify({ theme: "system" }),
        updatedAt: nowIso,
      })
      .run();
  }

  // 4. Seed Questions from seed-questions.json (Idempotent)
  const seedFile = path.join(process.cwd(), "data", "seed-questions.json");
  if (!fs.existsSync(seedFile)) {
    throw new Error("File data/seed-questions.json tidak ditemukan.");
  }

  const rawJson = fs.readFileSync(seedFile, "utf8");
  const seedData = JSON.parse(rawJson);
  const rawQuestions: any[] = seedData.questions || [];

  console.log(`Memeriksa ${rawQuestions.length} soal untuk seeding idempotent...`);

  const existingQuestions = db.select({ externalId: questions.externalId }).from(questions).all();
  const existingSet = new Set(existingQuestions.map((q) => q.externalId).filter(Boolean));

  let insertedCount = 0;
  let skippedCount = 0;

  const seedTransaction = sqliteDb.transaction(() => {
    for (const q of rawQuestions) {
      if (q.externalId && existingSet.has(q.externalId)) {
        skippedCount++;
        continue;
      }

      const qId = `q_${q.externalId || Math.random().toString(36).substring(2, 9)}`;

      db.insert(questions)
        .values({
          id: qId,
          externalId: q.externalId || null,
          category: q.category,
          subtopic: q.subtopic,
          stem: q.stem,
          imagePath: q.imagePath || null,
          explanation: q.explanation,
          difficulty: q.difficulty || 2,
          sourceNote: q.sourceNote || "original",
          sourceReference: q.sourceReference || null,
          reviewStatus: q.reviewStatus || "verified",
          reviewNote: q.reviewNote || null,
          createdAt: nowIso,
          updatedAt: nowIso,
        })
        .run();

      for (let oIdx = 0; oIdx < q.options.length; oIdx++) {
        const opt = q.options[oIdx];
        db.insert(options)
          .values({
            id: `opt_${qId}_${opt.label}`,
            questionId: qId,
            label: opt.label,
            text: opt.text,
            points: opt.points,
            createdAt: nowIso,
            updatedAt: nowIso,
          })
          .run();
      }

      insertedCount++;
    }
  });

  seedTransaction();

  console.log(`Seeding selesai! Soal baru ditambahkan: ${insertedCount}, Soal lama dipertahankan (skipped): ${skippedCount}`);
}

if (require.main === module || process.argv[1]?.endsWith("seed.ts")) {
  seedDatabase();
}
