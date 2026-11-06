import { OptionLabel, ValidLabels } from "../questions/validation";
import { CategoryId } from "@/config/subtopics";

export interface FrozenOption {
  snapshotOptionId: string;
  originalOptionId: string;
  visualLabel: OptionLabel;
  text: string;
  points: number; // Server-only, hidden from client during exam
  isCorrect: boolean; // Server-only
}

export interface FrozenQuestionSnapshot {
  originalQuestionId: string;
  category: CategoryId;
  subtopic: string;
  stem: string;
  imagePath: string | null;
  explanation: string; // Server-only during exam
  difficulty: number;
  sourceNote: string;
  sourceReference: string | null;
  options: FrozenOption[];
}

export interface ClientSanitizedOption {
  snapshotOptionId: string;
  visualLabel: OptionLabel;
  text: string;
}

export interface ClientSanitizedQuestion {
  position: number;
  category: CategoryId;
  subtopic: string;
  stem: string;
  imagePath: string | null;
  options: ClientSanitizedOption[];
  selectedOptionSnapshotId: string | null;
  flagged: boolean;
}

/**
 * Deterministic PRNG or pseudo-random shuffle
 */
export function shuffleArray<T>(array: T[], seed = Math.random()): T[] {
  const result = [...array];
  let s = Math.floor(seed * 1000000);
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Create a frozen question snapshot with shuffled options
 */
export function createQuestionSnapshot(
  question: {
    id: string;
    category: CategoryId;
    subtopic: string;
    stem: string;
    imagePath: string | null;
    explanation: string;
    difficulty: number;
    sourceNote: string;
    sourceReference: string | null;
    options: Array<{ id: string; label: string; text: string; points: number }>;
  },
  randomSeed = Math.random()
): FrozenQuestionSnapshot {
  // Shuffle options
  const shuffledOptions = shuffleArray(question.options, randomSeed);

  const frozenOptions: FrozenOption[] = shuffledOptions.map((opt, index) => {
    const visualLabel = ValidLabels[index];
    const isCorrect = question.category === "TKP" ? opt.points === 5 : opt.points === 5;
    return {
      snapshotOptionId: `opt_${question.id}_${index}_${Math.random().toString(36).substring(2, 7)}`,
      originalOptionId: opt.id,
      visualLabel,
      text: opt.text,
      points: opt.points,
      isCorrect,
    };
  });

  return {
    originalQuestionId: question.id,
    category: question.category,
    subtopic: question.subtopic,
    stem: question.stem,
    imagePath: question.imagePath,
    explanation: question.explanation,
    difficulty: question.difficulty,
    sourceNote: question.sourceNote,
    sourceReference: question.sourceReference,
    options: frozenOptions,
  };
}

/**
 * Sanitize question snapshot for client view during in-progress exam
 * Strips explanation, points, and isCorrect to prevent client-side answer leaking
 */
export function sanitizeQuestionForClient(
  snapshot: FrozenQuestionSnapshot,
  position: number,
  selectedOptionSnapshotId: string | null,
  flagged: boolean
): ClientSanitizedQuestion {
  return {
    position,
    category: snapshot.category,
    subtopic: snapshot.subtopic,
    stem: snapshot.stem,
    imagePath: snapshot.imagePath,
    selectedOptionSnapshotId,
    flagged,
    options: snapshot.options.map((opt) => ({
      snapshotOptionId: opt.snapshotOptionId,
      visualLabel: opt.visualLabel,
      text: opt.text,
    })),
  };
}
