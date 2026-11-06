import fs from "fs";
import path from "path";
import { OptionData, QuestionData } from "./compile-batch2";
import { batch5Questions } from "./create-batch5";
import { batch6Questions } from "./create-batch6";
import { batch7Questions } from "./create-batch7";
import { batch8Questions } from "./create-batch8";

export type { OptionData, QuestionData };

// Read current seed-questions.json
const seedFilePath = path.join(process.cwd(), "data", "seed-questions.json");
const currentSeed = JSON.parse(fs.readFileSync(seedFilePath, "utf8"));
const allCurrentQuestions: QuestionData[] = currentSeed.questions;

// Extract existing questions
const original330 = allCurrentQuestions.filter(
  (q) => !q.externalId.match(/-b[25678]-/) && q.batchId !== "batch-2"
);
const batch2Questions = allCurrentQuestions.filter(
  (q) => q.batchId === "batch-2" || q.externalId.includes("-b2-")
);

console.log(`Original questions: ${original330.length}, Batch 2 questions: ${batch2Questions.length}`);

// Split the 330 original questions into 3 sets of 110:
// 90 TWK (3x30), 105 TIU (3x35), 135 TKP (3x45)
const twk330 = original330.filter((q) => q.category === "TWK");
const tiu330 = original330.filter((q) => q.category === "TIU");
const tkp330 = original330.filter((q) => q.category === "TKP");

if (twk330.length !== 90 || tiu330.length !== 105 || tkp330.length !== 135) {
  throw new Error(`Unexpected distribution: TWK=${twk330.length}, TIU=${tiu330.length}, TKP=${tkp330.length}`);
}

// Set 1 -> Batch 1 (Standar BKN 2024 Baseline)
const batch1Questions: QuestionData[] = [
  ...twk330.slice(0, 30).map((q) => ({ ...q, batchId: "batch-1", batchNumber: 1 })),
  ...tiu330.slice(0, 35).map((q) => ({ ...q, batchId: "batch-1", batchNumber: 1 })),
  ...tkp330.slice(0, 45).map((q) => ({ ...q, batchId: "batch-1", batchNumber: 1 })),
];

// Set 2 -> Batch 3 (Standar CPNS 2021)
const batch3Questions: QuestionData[] = [
  ...twk330.slice(30, 60).map((q) => ({ ...q, batchId: "batch-3", batchNumber: 3 })),
  ...tiu330.slice(35, 70).map((q) => ({ ...q, batchId: "batch-3", batchNumber: 3 })),
  ...tkp330.slice(45, 90).map((q) => ({ ...q, batchId: "batch-3", batchNumber: 3 })),
];

// Set 3 -> Batch 4 (Sekolah Kedinasan Dikdin)
const batch4Questions: QuestionData[] = [
  ...twk330.slice(60, 90).map((q) => ({ ...q, batchId: "batch-4", batchNumber: 4 })),
  ...tiu330.slice(70, 105).map((q) => ({ ...q, batchId: "batch-4", batchNumber: 4 })),
  ...tkp330.slice(90, 135).map((q) => ({ ...q, batchId: "batch-4", batchNumber: 4 })),
];

// Combine all 8 Batches
const combinedQuestions: QuestionData[] = [
  ...batch1Questions, // 110
  ...batch2Questions, // 110
  ...batch3Questions, // 110
  ...batch4Questions, // 110
  ...batch5Questions, // 100
  ...batch6Questions, // 100
  ...batch7Questions, // 100
  ...batch8Questions, // 100
];

console.log(`Total questions across all 8 Batches: ${combinedQuestions.length}`);

// Validation check
const countsPerBatch: Record<number, { total: number; TWK: number; TIU: number; TKP: number }> = {};
for (const q of combinedQuestions) {
  if (!countsPerBatch[q.batchNumber]) {
    countsPerBatch[q.batchNumber] = { total: 0, TWK: 0, TIU: 0, TKP: 0 };
  }
  countsPerBatch[q.batchNumber].total++;
  countsPerBatch[q.batchNumber][q.category]++;
}

console.log("Summary per Batch:");
console.table(countsPerBatch);

const totalTwk = combinedQuestions.filter((q) => q.category === "TWK").length;
const totalTiu = combinedQuestions.filter((q) => q.category === "TIU").length;
const totalTkp = combinedQuestions.filter((q) => q.category === "TKP").length;

const updatedSeedData = {
  schemaVersion: "2.0",
  generatedAt: new Date().toISOString(),
  totalQuestions: combinedQuestions.length,
  counts: {
    TWK: totalTwk,
    TIU: totalTiu,
    TKP: totalTkp,
  },
  questions: combinedQuestions,
};

fs.writeFileSync(seedFilePath, JSON.stringify(updatedSeedData, null, 2), "utf8");
console.log(`Successfully written 8 batches (${combinedQuestions.length} questions) to ${seedFilePath}`);
