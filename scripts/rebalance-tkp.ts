import fs from "fs";
import path from "path";
import { tkpQuestions } from "./create-batch2-tkp";

// For each question, ensure points are strictly [1, 2, 3, 4, 5]
// If points has ties, break ties intelligently:
// Options that have 5 stay 5.
// For tied points, differentiate based on text tone:
// - constructive / collaborative / solution-oriented ranks higher
// - destructive / corrupt / hostile / dismissive ranks lower (1)

const updatedTkp = tkpQuestions.map((q) => {
  const currentOptions = q.options.map((o) => ({ ...o }));

  // Check if already 1,2,3,4,5
  const pts = currentOptions.map((o) => o.points).sort().join("");
  if (pts === "12345") {
    return q;
  }

  // Find the max (should be 5)
  const sorted = [...currentOptions].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Tie-breaker heuristics:
    // Negative keywords decrease rank
    const badRegex = /menolak|mengabaikan|marah|tinggi|usir|uang pelicin|diam saja|pasif|kasar|salahkan|menyerah|menghindar|keluar/i;
    const goodRegex = /koordinasi|solusi|bantuan|evaluasi|catat|diskusikan|musyawarah|saran|belajar|proaktif|inovasi/i;

    const aBad = badRegex.test(a.text) ? 1 : 0;
    const bBad = badRegex.test(b.text) ? 1 : 0;
    if (aBad !== bBad) return aBad - bBad; // bad goes down

    const aGood = goodRegex.test(a.text) ? 1 : 0;
    const bGood = goodRegex.test(b.text) ? 1 : 0;
    if (aGood !== bGood) return bGood - aGood; // good goes up

    return b.text.length - a.text.length; // more detailed usually more comprehensive in TKP
  });

  // Assign distinct points 5, 4, 3, 2, 1
  const ranked = [5, 4, 3, 2, 1];
  sorted.forEach((item, idx) => {
    const original = currentOptions.find((o) => o.label === item.label)!;
    original.points = ranked[idx];
  });

  return {
    ...q,
    options: currentOptions,
  };
});

// Verify all are now 12345
for (const q of updatedTkp) {
  const pts = q.options.map((o) => o.points).sort().join("");
  if (pts !== "12345") {
    throw new Error(`Failed to balance ${q.externalId}: ${pts}`);
  }
}

// Write back to scripts/create-batch2-tkp.ts
const content = `export const tkpQuestions = ${JSON.stringify(updatedTkp, null, 2)};\n`;
fs.writeFileSync(path.join(process.cwd(), "scripts", "create-batch2-tkp.ts"), content, "utf8");
console.log(`Successfully rebalanced all ${updatedTkp.length} TKP questions to valid 1, 2, 3, 4, 5 point distributions!`);
