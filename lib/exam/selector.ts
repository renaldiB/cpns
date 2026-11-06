import { CategoryId } from "@/config/subtopics";
import { QUESTION_BLUEPRINT } from "@/config/question-blueprint";
import { shuffleArray } from "./snapshot";

export interface CandidateQuestion {
  id: string;
  batchNumber?: number;
  category: CategoryId;
  subtopic: string;
  difficulty: number;
  stem: string;
  imagePath: string | null;
  explanation: string;
  sourceNote: string;
  sourceReference: string | null;
  options: Array<{ id: string; label: string; text: string; points: number }>;
}

export interface QuestionUsageRecord {
  questionId: string;
  lastUsedAt: string; // ISO
  usageCount: number;
}

/**
 * Calculate weight penalty: higher penalty for questions used recently
 */
export function calculateUsagePenalty(
  questionId: string,
  usageMap: Map<string, { lastUsedAt: string; usageCount: number }>,
  penaltyDays = 7
): number {
  const usage = usageMap.get(questionId);
  if (!usage) return 0; // Not used yet -> 0 penalty (highest priority)

  const daysSince =
    (Date.now() - new Date(usage.lastUsedAt).getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince < penaltyDays) {
    // Strongly penalize recent attempts
    return 100 + usage.usageCount * 10 - daysSince * 5;
  }

  return usage.usageCount;
}

/**
 * Select questions for full simulation attempt according to blueprint
 */
export function selectQuestionsForFullSimulation(
  allQuestions: CandidateQuestion[],
  usageMap = new Map<string, { lastUsedAt: string; usageCount: number }>(),
  randomSeed = Math.random()
): CandidateQuestion[] {
  const categories: CategoryId[] = ["TWK", "TIU", "TKP"];
  const selected: CandidateQuestion[] = [];

  for (const cat of categories) {
    const blueprint = QUESTION_BLUEPRINT[cat];
    const catPool = allQuestions.filter((q) => q.category === cat);

    if (catPool.length < blueprint.totalQuestions) {
      throw new Error(
        `Bank soal untuk kategori ${cat} tidak mencukupi. Tersedia: ${catPool.length}, dibutuhkan: ${blueprint.totalQuestions}.`
      );
    }

    // Sort pool by penalty (least used first), then shuffle with seed
    const scoredPool = catPool.map((q) => ({
      question: q,
      penalty: calculateUsagePenalty(q.id, usageMap),
      randomVal: Math.random(),
    }));

    // Group by subtopic according to blueprint
    const selectedForCat: CandidateQuestion[] = [];
    const usedIds = new Set<string>();

    // First pass: try to fulfill subtopic weights
    for (const [subtopic, targetCount] of Object.entries(blueprint.subtopicWeights)) {
      const subtopicCandidates = scoredPool
        .filter((item) => item.question.subtopic === subtopic && !usedIds.has(item.question.id))
        .sort((a, b) => a.penalty - b.penalty || a.randomVal - b.randomVal);

      const countToTake = Math.min(targetCount, subtopicCandidates.length);
      for (let i = 0; i < countToTake; i++) {
        selectedForCat.push(subtopicCandidates[i].question);
        usedIds.add(subtopicCandidates[i].question.id);
      }
    }

    // Second pass: if subtopics didn't completely fill target count, fill from remaining category pool
    if (selectedForCat.length < blueprint.totalQuestions) {
      const remainingCandidates = scoredPool
        .filter((item) => !usedIds.has(item.question.id))
        .sort((a, b) => a.penalty - b.penalty || a.randomVal - b.randomVal);

      const needed = blueprint.totalQuestions - selectedForCat.length;
      for (let i = 0; i < needed && i < remainingCandidates.length; i++) {
        selectedForCat.push(remainingCandidates[i].question);
        usedIds.add(remainingCandidates[i].question.id);
      }
    }

    // Verification check
    if (selectedForCat.length !== blueprint.totalQuestions) {
      throw new Error(
        `Gagal memilih tepat ${blueprint.totalQuestions} soal untuk kategori ${cat}. Terpilih: ${selectedForCat.length}.`
      );
    }

    // Shuffle within category to avoid predictable subtopic grouping
    const shuffledCat = shuffleArray(selectedForCat, randomSeed + categories.indexOf(cat));
    selected.push(...shuffledCat);
  }

  return selected;
}

/**
 * Select questions for practice mode
 */
export function selectQuestionsForPractice(
  allQuestions: CandidateQuestion[],
  options: {
    category: CategoryId;
    subtopics?: string[];
    difficulty?: number;
    batchNumber?: number;
    count: number;
  },
  randomSeed = Math.random()
): CandidateQuestion[] {
  let pool = allQuestions.filter((q) => q.category === options.category);

  if (options.batchNumber && options.batchNumber > 0) {
    pool = pool.filter((q) => q.batchNumber === options.batchNumber);
  }

  if (options.subtopics && options.subtopics.length > 0) {
    pool = pool.filter((q) => options.subtopics!.includes(q.subtopic));
  }

  if (options.difficulty && options.difficulty > 0) {
    pool = pool.filter((q) => q.difficulty === options.difficulty);
  }

  if (pool.length === 0) {
    throw new Error("Tidak ada soal yang cocok dengan kriteria filter latihan yang dipilih.");
  }

  const shuffled = shuffleArray(pool, randomSeed);
  const countToTake = Math.min(options.count, shuffled.length);
  return shuffled.slice(0, countToTake);
}
