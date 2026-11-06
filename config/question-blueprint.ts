import { CategoryId } from "./subtopics";

export interface BlueprintCategoryRule {
  category: CategoryId;
  totalQuestions: number;
  difficultyDistribution: {
    1: number; // mudah ~30%
    2: number; // sedang ~50%
    3: number; // sulit ~20%
  };
  subtopicWeights: Record<string, number>; // target count per subtopic
}

export const QUESTION_BLUEPRINT: Record<CategoryId, BlueprintCategoryRule> = {
  TWK: {
    category: "TWK",
    totalQuestions: 30,
    difficultyDistribution: {
      1: 9,  // 30%
      2: 15, // 50%
      3: 6,  // 20%
    },
    subtopicWeights: {
      "pancasila": 5,
      "uud-1945": 5,
      "nkri": 4,
      "bhinneka-tunggal-ika": 3,
      "nasionalisme": 4,
      "integritas": 3,
      "bela-negara": 3,
      "bahasa-indonesia": 3,
    },
  },
  TIU: {
    category: "TIU",
    totalQuestions: 35,
    difficultyDistribution: {
      1: 10, // ~30%
      2: 18, // ~50%
      3: 7,  // ~20%
    },
    subtopicWeights: {
      "verbal-sinonim": 3,
      "verbal-antonim": 2,
      "verbal-analogi": 3,
      "verbal-silogisme": 3,
      "verbal-analitis": 3,
      "numerik-hitungan": 5,
      "numerik-deret": 4,
      "numerik-perbandingan": 4,
      "numerik-soal-cerita": 4,
      "figural": 4,
    },
  },
  TKP: {
    category: "TKP",
    totalQuestions: 45,
    difficultyDistribution: {
      1: 13, // ~30%
      2: 23, // ~50%
      3: 9,  // ~20%
    },
    subtopicWeights: {
      "pelayanan-publik": 9,
      "jejaring-kerja": 8,
      "sosial-budaya": 7,
      "tik": 7,
      "profesionalisme": 8,
      "anti-radikalisme": 6,
    },
  },
};
