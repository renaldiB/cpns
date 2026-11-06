import fs from "fs";
import path from "path";
import { QuestionInputSchema } from "../lib/questions/validation";
import { normalizeStem } from "../lib/questions/dedup";

export interface VerificationReport {
  timestamp: string;
  totalQuestions: number;
  validQuestions: number;
  failedQuestions: number;
  duplicateCount: number;
  reviewStatusSummary: {
    verified: number;
    needs_review: number;
    draft: number;
  };
  categorySummary: {
    TWK: number;
    TIU: number;
    TKP: number;
  };
  errors: Array<{ id: string; error: string }>;
}

export function verifyQuestions(): VerificationReport {
  console.log("Memulai verifikasi menyeluruh bank soal (scripts/verify-questions)...");

  const filePath = path.join(process.cwd(), "data", "seed-questions.json");
  if (!fs.existsSync(filePath)) {
    throw new Error(`File bank soal tidak ditemukan: ${filePath}. Jalankan compile-seed-data terlebih dahulu.`);
  }

  const rawContent = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(rawContent);
  const questionsList = parsedData.questions || [];

  const report: VerificationReport = {
    timestamp: new Date().toISOString(),
    totalQuestions: questionsList.length,
    validQuestions: 0,
    failedQuestions: 0,
    duplicateCount: 0,
    reviewStatusSummary: {
      verified: 0,
      needs_review: 0,
      draft: 0,
    },
    categorySummary: {
      TWK: 0,
      TIU: 0,
      TKP: 0,
    },
    errors: [],
  };

  const seenStems = new Map<string, string>(); // stemNorm -> id

  for (let idx = 0; idx < questionsList.length; idx++) {
    const q = questionsList[idx];
    const qId = q.externalId || `index_${idx}`;

    // 1. Zod schema validation
    const validation = QuestionInputSchema.safeParse(q);
    if (!validation.success) {
      report.failedQuestions++;
      report.errors.push({
        id: qId,
        error: validation.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      });
      continue;
    }

    // 2. Duplicate stem check
    const norm = normalizeStem(q.stem);
    if (seenStems.has(norm)) {
      report.duplicateCount++;
      report.errors.push({
        id: qId,
        error: `Duplikat stem terdeteksi dengan soal ID: ${seenStems.get(norm)}`,
      });
      continue;
    }
    seenStems.set(norm, qId);

    // 3. Explanation check
    if (!q.explanation || q.explanation.trim().length < 5) {
      report.failedQuestions++;
      report.errors.push({
        id: qId,
        error: "Pembahasan kosong atau terlalu singkat",
      });
      continue;
    }

    // 4. Update stats
    report.validQuestions++;
    const cat = q.category as "TWK" | "TIU" | "TKP";
    report.categorySummary[cat] = (report.categorySummary[cat] || 0) + 1;

    const status = (q.reviewStatus || "needs_review") as "verified" | "needs_review" | "draft";
    report.reviewStatusSummary[status] = (report.reviewStatusSummary[status] || 0) + 1;
  }

  console.log("--- HASIL VERIFIKASI BANK SOAL ---");
  console.log(`Total soal diperiksa  : ${report.totalQuestions}`);
  console.log(`Lolos validasi        : ${report.validQuestions}`);
  console.log(`Gagal validasi        : ${report.failedQuestions}`);
  console.log(`Duplikat              : ${report.duplicateCount}`);
  console.log(`Komposisi Kategori    : TWK = ${report.categorySummary.TWK}, TIU = ${report.categorySummary.TIU}, TKP = ${report.categorySummary.TKP}`);
  console.log(`Status Review         : Verified = ${report.reviewStatusSummary.verified}, Needs Review = ${report.reviewStatusSummary.needs_review}, Draft = ${report.reviewStatusSummary.draft}`);

  if (report.errors.length > 0) {
    console.error("Ditemukan kesalahan pada verifikasi:");
    for (const err of report.errors) {
      console.error(`- [${err.id}]: ${err.error}`);
    }
    process.exit(1);
  } else {
    console.log("VERIFIKASI BERHASIL: Seluruh soal memenuhi standar kualitas dan spesifikasi.");
  }

  return report;
}

if (require.main === module || process.argv[1]?.endsWith("verify-questions.ts")) {
  verifyQuestions();
}
