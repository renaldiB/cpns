import fs from "fs";
import path from "path";
import { TWK_QUESTIONS } from "../data/questions-twk";
import { TIU_QUESTIONS } from "../data/questions-tiu";
import { TKP_QUESTIONS } from "../data/questions-tkp";
import { QuestionInputSchema } from "../lib/questions/validation";
import { normalizeStem } from "../lib/questions/dedup";

export function compileSeedData() {
  console.log("Mengompilasi 330 soal original ke data/seed-questions.json...");

  const allRaw = [...TWK_QUESTIONS, ...TIU_QUESTIONS, ...TKP_QUESTIONS];
  console.log(`Jumlah soal mentah: ${allRaw.length} (TWK: ${TWK_QUESTIONS.length}, TIU: ${TIU_QUESTIONS.length}, TKP: ${TKP_QUESTIONS.length})`);

  if (allRaw.length !== 330) {
    throw new Error(`Jumlah soal tidak tepat 330! Ditemukan: ${allRaw.length}`);
  }

  // Validate each question with Zod
  const validatedQuestions: any[] = [];
  const stemSet = new Set<string>();

  for (let i = 0; i < allRaw.length; i++) {
    const raw = allRaw[i];
    const norm = normalizeStem(raw.stem);

    if (stemSet.has(norm)) {
      throw new Error(`Duplikasi stem terdeteksi pada soal indeks ${i} (ID: ${raw.externalId}): ${raw.stem.substring(0, 50)}...`);
    }
    stemSet.add(norm);

    try {
      const parsed = QuestionInputSchema.parse(raw);
      validatedQuestions.push(parsed);
    } catch (err: any) {
      console.error(`Validasi gagal pada soal ${raw.externalId}:`, err.errors);
      throw err;
    }
  }

  const outputPayload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    totalQuestions: validatedQuestions.length,
    counts: {
      TWK: validatedQuestions.filter((q) => q.category === "TWK").length,
      TIU: validatedQuestions.filter((q) => q.category === "TIU").length,
      TKP: validatedQuestions.filter((q) => q.category === "TKP").length,
    },
    questions: validatedQuestions,
  };

  const outputPath = path.join(process.cwd(), "data", "seed-questions.json");
  fs.writeFileSync(outputPath, JSON.stringify(outputPayload, null, 2), "utf8");
  console.log(`Berhasil menyimpan ${validatedQuestions.length} soal ke ${outputPath}`);
}

if (require.main === module || process.argv[1]?.endsWith("compile-seed-data.ts")) {
  compileSeedData();
}
