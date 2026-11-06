import { QuestionData, OptionData } from "./generate-all-batches";

// Helper to shuffle or arrange options
function makeTwkOrTiu(
  id: string,
  batchId: string,
  batchNum: number,
  category: "TWK" | "TIU",
  subtopic: string,
  stem: string,
  correctText: string,
  distractors: [string, string, string, string],
  explanation: string,
  difficulty: number,
  ref: string,
  correctPos: "A" | "B" | "C" | "D" | "E" = "A"
): QuestionData {
  const labels: ("A" | "B" | "C" | "D" | "E")[] = ["A", "B", "C", "D", "E"];
  const options: OptionData[] = [];
  let dIdx = 0;
  for (const l of labels) {
    if (l === correctPos) {
      options.push({ label: l, text: correctText, points: 5 });
    } else {
      options.push({ label: l, text: distractors[dIdx++], points: 0 });
    }
  }
  return {
    externalId: id,
    batchId,
    batchNumber: batchNum,
    category,
    subtopic,
    stem,
    options,
    explanation,
    difficulty,
    sourceNote: "original",
    sourceReference: ref,
    reviewStatus: "verified",
    reviewNote: "Standar Kurikulum Spesifik",
  };
}

function makeTkp(
  id: string,
  batchId: string,
  batchNum: number,
  subtopic: string,
  stem: string,
  rankedOptions: [string, string, string, string, string], // index 0 is 5 pts, index 4 is 1 pt
  explanation: string,
  difficulty: number,
  ref: string,
  permutation: ("A" | "B" | "C" | "D" | "E")[] = ["B", "A", "E", "C", "D"] // maps 5,4,3,2,1 to labels
): QuestionData {
  const scores = [5, 4, 3, 2, 1];
  const options: OptionData[] = [
    { label: "A", text: "", points: 0 },
    { label: "B", text: "", points: 0 },
    { label: "C", text: "", points: 0 },
    { label: "D", text: "", points: 0 },
    { label: "E", text: "", points: 0 },
  ];

  for (let i = 0; i < 5; i++) {
    const targetLabel = permutation[i];
    const opt = options.find((o) => o.label === targetLabel)!;
    opt.text = rankedOptions[i];
    opt.points = scores[i];
  }

  return {
    externalId: id,
    batchId,
    batchNumber: batchNum,
    category: "TKP",
    subtopic,
    stem,
    options,
    explanation,
    difficulty,
    sourceNote: "original",
    sourceReference: ref,
    reviewStatus: "verified",
    reviewNote: "Standar Kurikulum Spesifik",
  };
}

export { makeTwkOrTiu, makeTkp };
