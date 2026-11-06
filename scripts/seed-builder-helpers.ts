import fs from "fs";
import path from "path";
import { QuestionInput } from "../lib/questions/validation";
import { CategoryId } from "../config/subtopics";

export interface RawQuestionDef {
  externalId: string;
  category: CategoryId;
  subtopic: string;
  stem: string;
  options: [
    { label: "A"; text: string; points: number },
    { label: "B"; text: string; points: number },
    { label: "C"; text: string; points: number },
    { label: "D"; text: string; points: number },
    { label: "E"; text: string; points: number }
  ];
  explanation: string;
  difficulty: 1 | 2 | 3;
  sourceNote: string;
  sourceReference: string | null;
  reviewStatus: "verified" | "needs_review";
  reviewNote: string | null;
}

// Helper to build verified TWK/TIU question
export function makeTwkOrTiu(
  id: string,
  category: "TWK" | "TIU",
  subtopic: string,
  stem: string,
  correctIndex: 0 | 1 | 2 | 3 | 4,
  opts: [string, string, string, string, string],
  explanation: string,
  difficulty: 1 | 2 | 3 = 2,
  ref: string | null = null,
  reviewStatus: "verified" | "needs_review" = "verified"
): RawQuestionDef {
  const labels = ["A", "B", "C", "D", "E"] as const;
  const options = labels.map((lbl, idx) => ({
    label: lbl,
    text: opts[idx],
    points: idx === correctIndex ? 5 : 0,
  })) as any;

  return {
    externalId: id,
    category,
    subtopic,
    stem,
    options,
    explanation,
    difficulty,
    sourceNote: "original",
    sourceReference: ref,
    reviewStatus,
    reviewNote: reviewStatus === "verified" ? "Terverifikasi sesuai kaidah materi" : "Memerlukan penelaahan lanjutan",
  };
}

// Helper to build TKP question with 5 distinct weighted points
export function makeTkp(
  id: string,
  subtopic: string,
  stem: string,
  pointsDistribution: [number, number, number, number, number], // points for A, B, C, D, E (must be permutation of 1..5)
  opts: [string, string, string, string, string],
  explanation: string,
  difficulty: 1 | 2 | 3 = 2,
  reviewStatus: "verified" | "needs_review" = "verified"
): RawQuestionDef {
  const labels = ["A", "B", "C", "D", "E"] as const;
  const options = labels.map((lbl, idx) => ({
    label: lbl,
    text: opts[idx],
    points: pointsDistribution[idx],
  })) as any;

  return {
    externalId: id,
    category: "TKP",
    subtopic,
    stem,
    options,
    explanation,
    difficulty,
    sourceNote: "original",
    sourceReference: "Peraturan Menteri PANRB No. 321/2024",
    reviewStatus,
    reviewNote: reviewStatus === "verified" ? "Terverifikasi pembobotan poin 1-5" : "Memerlukan telaah pembobotan",
  };
}
