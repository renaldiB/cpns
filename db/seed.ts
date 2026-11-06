import fs from "fs";
import path from "path";
import { runMigrations } from "./migrate";
import { db, sqliteDb } from "./index";
import { examProfiles, questionBatches, questions, options, settings } from "./schema";
import { BASELINE_EXAM_PROFILE, PRESET_EXAM_PROFILES } from "@/config/exam-profiles";
import { eq } from "drizzle-orm";

export function seedDatabase() {
  console.log("Memulai proses seeding database...");

  // 1. Ensure migrations are applied safely first
  runMigrations();

  const nowIso = new Date().toISOString();

  // 2. Seed All Preset Exam Profiles
  for (const prof of PRESET_EXAM_PROFILES) {
    const existingProfile = db
      .select()
      .from(examProfiles)
      .where(eq(examProfiles.id, prof.id))
      .get();

    if (!existingProfile) {
      console.log(`Menyimpan profil ujian: ${prof.name}...`);
      db.insert(examProfiles)
        .values({
          id: prof.id,
          name: prof.name,
          year: prof.year,
          examType: prof.examType,
          description: prof.description,
          referenceStatus: prof.referenceStatus,
          sourceTitle: prof.sourceTitle,
          sourceUrl: prof.sourceUrl,
          sourceDocumentNumber: prof.sourceDocumentNumber,
          verifiedAt: prof.verifiedAt,
          durationSeconds: prof.durationSeconds,
          rulesJson: JSON.stringify(prof),
          isDefault: prof.isDefault,
          createdAt: nowIso,
          updatedAt: nowIso,
        })
        .run();
    }
  }

  // 3. Seed Default Question Batches (Batches 1 to 8)
  const defaultBatches = [
    {
      id: "batch-1",
      batchNumber: 1,
      name: "Batch 1: Standar BKN 2024",
      description: "Paket soal resmi 330 butir standar KepmenPANRB No. 321/2024 (90 TWK, 105 TIU, 135 TKP).",
      targetYear: 2024,
      isActive: true,
    },
    {
      id: "batch-2",
      batchNumber: 2,
      name: "Batch 2: Prediksi & Pengayaan 2025/2026",
      description: "Paket latihan penalaran analitis, integritas ASN, etika AI & layanan publik digital, bela negara siber.",
      targetYear: 2026,
      isActive: true,
    },
    {
      id: "batch-3",
      batchNumber: 3,
      name: "Batch 3: Standar CPNS 2021",
      description: "Paket soal era awal 110 butir dan materi resmi Anti-Radikalisme (KepmenPANRB No. 1023/2021).",
      targetYear: 2021,
      isActive: true,
    },
    {
      id: "batch-4",
      batchNumber: 4,
      name: "Batch 4: Sekolah Kedinasan (Dikdin)",
      description: "Paket soal seleksi masuk IPDN, PKN STAN, Poltekip, STIS, STIN, dan Sekdin Kemenhub (KepmenPANRB 71/2024).",
      targetYear: 2024,
      isActive: true,
    },
    {
      id: "batch-5",
      batchNumber: 5,
      name: "Batch 5: Arsip Historis CPNS 2019",
      description: "Paket 100 butir soal durasi 90 menit format klasik PermenPANRB No. 24/2019 (PG TKP 126).",
      targetYear: 2019,
      isActive: true,
    },
    {
      id: "batch-6",
      batchNumber: 6,
      name: "Batch 6: Tantangan Ekstrem CPNS 2018",
      description: "Paket soal HOTS tingkat kesulitan tinggi standar PermenPANRB No. 37/2018 (PG ketat 75/80/143).",
      targetYear: 2018,
      isActive: true,
    },
    {
      id: "batch-7",
      batchNumber: 7,
      name: "Batch 7: Seleksi PPPK 2024",
      description: "Simulasi evaluasi kompetensi manajerial, sosial kultural, teknis, dan wawancara berbasis komputer.",
      targetYear: 2024,
      isActive: true,
    },
    {
      id: "batch-8",
      batchNumber: 8,
      name: "Batch 8: Rekrutmen Bersama BUMN",
      description: "Tes Kemampuan Dasar (TKD Verbal & Numerik) dan Core Values AKHLAK BUMN standar FHCI.",
      targetYear: 2024,
      isActive: true,
    },
  ];

  for (const b of defaultBatches) {
    const existing = db.select().from(questionBatches).where(eq(questionBatches.id, b.id)).get();
    if (!existing) {
      console.log(`Menambahkan paket ${b.name}...`);
      db.insert(questionBatches)
        .values({
          id: b.id,
          batchNumber: b.batchNumber,
          name: b.name,
          description: b.description,
          targetYear: b.targetYear,
          isActive: b.isActive,
          createdAt: nowIso,
          updatedAt: nowIso,
        })
        .run();
    }
  }

  // Ensure any existing questions have batch assigned
  sqliteDb.exec(`
    UPDATE questions SET batch_id = 'batch-1', batch_number = 1 WHERE batch_id IS NULL OR batch_number IS NULL;
  `);

  // 4. Seed Default Settings
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

  // 5. Seed Questions from seed-questions.json (Idempotent)
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
          batchId: q.batchId || "batch-1",
          batchNumber: q.batchNumber || 1,
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
