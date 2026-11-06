/**
 * Text normalization for duplicate detection
 */
export function normalizeStem(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\d]/g, "") // remove punctuation
    .replace(/\s+/g, " ")      // collapse whitespace
    .trim();
}

/**
 * Token Jaccard similarity between two stems
 */
export function calculateSimilarity(textA: string, textB: string): number {
  const normA = normalizeStem(textA);
  const normB = normalizeStem(textB);

  if (normA === normB) return 1.0;

  const tokensA = new Set(normA.split(" ").filter((t) => t.length > 2));
  const tokensB = new Set(normB.split(" ").filter((t) => t.length > 2));

  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let intersectionCount = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersectionCount++;
    }
  }

  const unionCount = new Set([...tokensA, ...tokensB]).size;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

export interface DuplicateCheckResult {
  isExactDuplicate: boolean;
  isSimilar: boolean;
  similarityScore: number;
  matchedId?: string;
  matchedStem?: string;
}

/**
 * Check if a question stem already exists in candidate list
 */
export function checkDuplicate(
  stem: string,
  existingItems: Array<{ id: string; stem: string }>,
  similarityThreshold = 0.85
): DuplicateCheckResult {
  const normTarget = normalizeStem(stem);

  for (const item of existingItems) {
    const normExisting = normalizeStem(item.stem);
    if (normTarget === normExisting) {
      return {
        isExactDuplicate: true,
        isSimilar: true,
        similarityScore: 1.0,
        matchedId: item.id,
        matchedStem: item.stem,
      };
    }

    const similarity = calculateSimilarity(stem, item.stem);
    if (similarity >= similarityThreshold) {
      return {
        isExactDuplicate: false,
        isSimilar: true,
        similarityScore: Number(similarity.toFixed(2)),
        matchedId: item.id,
        matchedStem: item.stem,
      };
    }
  }

  return {
    isExactDuplicate: false,
    isSimilar: false,
    similarityScore: 0,
  };
}
