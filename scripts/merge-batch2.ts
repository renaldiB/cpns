import fs from "fs";
import path from "path";
import { twkQuestions } from "./create-batch2-questions";
import { tiuQuestions } from "./compile-batch2";
import { tkpQuestions } from "./create-batch2-tkp";

interface OptionData {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
  points: number;
}

interface QuestionData {
  externalId: string;
  batchId: string;
  batchNumber: number;
  category: "TWK" | "TIU" | "TKP";
  subtopic: string;
  stem: string;
  options: OptionData[];
  explanation: string;
  difficulty: number;
  sourceNote: string;
  sourceReference: string;
  reviewStatus: "verified";
  reviewNote: string;
}

console.log(`Loaded: ${twkQuestions.length} TWK, ${tiuQuestions.length} TIU, ${tkpQuestions.length} TKP.`);
if (twkQuestions.length !== 30) throw new Error(`Expected 30 TWK, got ${twkQuestions.length}`);
if (tiuQuestions.length !== 35) throw new Error(`Expected 35 TIU, got ${tiuQuestions.length}`);
if (tkpQuestions.length !== 45) throw new Error(`Expected 45 TKP, got ${tkpQuestions.length}`);

const batch2Questions: QuestionData[] = [
  ...twkQuestions,
  ...tiuQuestions,
  ...(tkpQuestions as QuestionData[]),
];

console.log(`Total Batch 2 Questions: ${batch2Questions.length}`);

// Validation
for (const q of batch2Questions) {
  if (q.options.length !== 5) {
    throw new Error(`Question ${q.externalId} does not have 5 options!`);
  }
  const labels = q.options.map((o) => o.label).sort().join("");
  if (labels !== "ABCDE") {
    throw new Error(`Question ${q.externalId} options are not A, B, C, D, E: ${labels}`);
  }

  if (q.category === "TWK" || q.category === "TIU") {
    const correctCount = q.options.filter((o) => o.points === 5).length;
    const zeroCount = q.options.filter((o) => o.points === 0).length;
    if (correctCount !== 1 || zeroCount !== 4) {
      throw new Error(`Question ${q.externalId} (${q.category}) must have exactly one 5-pt option and four 0-pt options!`);
    }
  } else if (q.category === "TKP") {
    const points = q.options.map((o) => o.points).sort().join("");
    if (points !== "12345") {
      throw new Error(`Question ${q.externalId} (TKP) must have points 1, 2, 3, 4, 5. Got: ${points}`);
    }
  }
}

// Read seed-questions.json
const seedFilePath = path.join(process.cwd(), "data", "seed-questions.json");
const seedData = JSON.parse(fs.readFileSync(seedFilePath, "utf8"));

// Filter out any existing batch-2 questions to remain idempotent
const nonBatch2 = seedData.questions.filter((q: QuestionData) => q.batchId !== "batch-2");
console.log(`Existing non-batch-2 questions: ${nonBatch2.length}`);

const combinedQuestions = [...nonBatch2, ...batch2Questions];

const twkCount = combinedQuestions.filter((q) => q.category === "TWK").length;
const tiuCount = combinedQuestions.filter((q) => q.category === "TIU").length;
const tkpCount = combinedQuestions.filter((q) => q.category === "TKP").length;

const updatedSeedData = {
  schemaVersion: seedData.schemaVersion || "1.0",
  generatedAt: new Date().toISOString(),
  totalQuestions: combinedQuestions.length,
  counts: {
    TWK: twkCount,
    TIU: tiuCount,
    TKP: tkpCount,
  },
  questions: combinedQuestions,
};

fs.writeFileSync(seedFilePath, JSON.stringify(updatedSeedData, null, 2), "utf8");
console.log(`Successfully updated ${seedFilePath}:`);
console.log(`Total questions: ${updatedSeedData.totalQuestions}`);
console.log(`Counts: TWK=${twkCount}, TIU=${tiuCount}, TKP=${tkpCount}`);
