import { ExamProfile } from "@/config/exam-profiles";
import { CategoryId } from "@/config/subtopics";

export interface QuestionScoringInput {
  category: CategoryId;
  selectedOptionPoints: number | null; // null if unanswered
}

export interface CategoryScoreResult {
  category: CategoryId;
  score: number;
  maxScore: number;
  passingScore: number;
  isPassed: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number; // for TWK/TIU
  wrongCount: number;   // for TWK/TIU
  accuracy: number;     // 0..100
  tkpDistribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    averagePoints: number;
  };
}

export interface AttemptScoreResult {
  scoreTwk: number;
  scoreTiu: number;
  scoreTkp: number;
  scoreTotal: number;
  maxTotal: number;
  isPassed: boolean;
  categories: Record<CategoryId, CategoryScoreResult>;
}

/**
 * Score an individual question according to CPNS rules
 */
export function scoreSingleQuestion(
  category: CategoryId,
  selectedPoints: number | null | undefined
): number {
  if (selectedPoints === null || selectedPoints === undefined) {
    return 0;
  }
  if (category === "TWK" || category === "TIU") {
    // 5 for correct, 0 for wrong
    return selectedPoints === 5 ? 5 : 0;
  }
  if (category === "TKP") {
    // 1 to 5 points
    return Math.max(0, Math.min(5, Math.round(selectedPoints)));
  }
  return 0;
}

/**
 * Calculate scores and statistics for an entire attempt
 */
export function calculateAttemptScore(
  profile: ExamProfile,
  questions: Array<{ category: CategoryId; pointsAwarded: number | null }>
): AttemptScoreResult {
  const resultCategories: Record<CategoryId, CategoryScoreResult> = {
    TWK: initCategoryResult("TWK", profile),
    TIU: initCategoryResult("TIU", profile),
    TKP: initCategoryResult("TKP", profile),
  };

  for (const q of questions) {
    const cat = q.category;
    const catResult = resultCategories[cat];
    if (!catResult) continue;

    catResult.totalQuestions++;
    if (q.pointsAwarded === null || q.pointsAwarded === undefined) {
      // Unanswered
      catResult.unansweredCount++;
      if (cat === "TWK" || cat === "TIU") {
        catResult.wrongCount++;
      }
    } else {
      // Answered (either correct >0 or wrong =0)
      catResult.answeredCount++;
      catResult.score += q.pointsAwarded;
      if (cat === "TWK" || cat === "TIU") {
        if (q.pointsAwarded === 5) {
          catResult.correctCount++;
        } else {
          catResult.wrongCount++;
        }
      } else if (cat === "TKP") {
        const pts = Math.min(5, Math.max(1, q.pointsAwarded)) as 1 | 2 | 3 | 4 | 5;
        if (catResult.tkpDistribution) {
          catResult.tkpDistribution[pts] = (catResult.tkpDistribution[pts] || 0) + 1;
        }
      }
    }
  }

  // Calculate accuracies & TKP averages
  for (const catKey of ["TWK", "TIU", "TKP"] as CategoryId[]) {
    const catResult = resultCategories[catKey];
    if (catResult.answeredCount > 0) {
      if (catKey === "TWK" || catKey === "TIU") {
        catResult.accuracy = Math.round((catResult.correctCount / catResult.answeredCount) * 100);
      } else if (catResult.tkpDistribution) {
        catResult.tkpDistribution.averagePoints = Number(
          (catResult.score / catResult.answeredCount).toFixed(2)
        );
        catResult.accuracy = Math.round((catResult.score / (catResult.totalQuestions * 5)) * 100);
      }
    } else {
      catResult.accuracy = 0;
    }

    // Check passing status for this category
    catResult.isPassed = catResult.score >= catResult.passingScore;
  }

  const scoreTwk = resultCategories.TWK.score;
  const scoreTiu = resultCategories.TIU.score;
  const scoreTkp = resultCategories.TKP.score;
  const scoreTotal = scoreTwk + scoreTiu + scoreTkp;
  const maxTotal =
    resultCategories.TWK.maxScore +
    resultCategories.TIU.maxScore +
    resultCategories.TKP.maxScore;

  const isPassed =
    resultCategories.TWK.isPassed &&
    resultCategories.TIU.isPassed &&
    resultCategories.TKP.isPassed;

  return {
    scoreTwk,
    scoreTiu,
    scoreTkp,
    scoreTotal,
    maxTotal,
    isPassed,
    categories: resultCategories,
  };
}

function initCategoryResult(category: CategoryId, profile: ExamProfile): CategoryScoreResult {
  const catRule = profile.categories[category];
  return {
    category,
    score: 0,
    maxScore: catRule.maxScore,
    passingScore: catRule.passingScore,
    isPassed: false,
    totalQuestions: 0,
    answeredCount: 0,
    unansweredCount: 0,
    correctCount: 0,
    wrongCount: 0,
    accuracy: 0,
    tkpDistribution:
      category === "TKP"
        ? {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            averagePoints: 0,
          }
        : undefined,
  };
}
