import { describe, it, expect } from "vitest";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import {
  calculateAttemptScore,
  scoreSingleQuestion,
} from "@/lib/scoring";
import { createQuestionSnapshot } from "@/lib/exam/snapshot";

describe("Scoring Unit Tests (Section 12.5 Requirements)", () => {
  // Test 1: Semua TWK benar (30 soal): S_TWK = 150
  it("1. All 30 TWK correct yields S_TWK = 150", () => {
    const questions = Array.from({ length: 30 }, () => ({
      category: "TWK" as const,
      pointsAwarded: 5,
    }));
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, questions);
    expect(res.scoreTwk).toBe(150);
    expect(res.categories.TWK.isPassed).toBe(true);
  });

  // Test 2: Semua TIU benar (35 soal): S_TIU = 175
  it("2. All 35 TIU correct yields S_TIU = 175", () => {
    const questions = Array.from({ length: 35 }, () => ({
      category: "TIU" as const,
      pointsAwarded: 5,
    }));
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, questions);
    expect(res.scoreTiu).toBe(175);
    expect(res.categories.TIU.isPassed).toBe(true);
  });

  // Test 3: Seluruh 45 soal TKP opsi poin 5: S_TKP = 225
  it("3. All 45 TKP with 5-point choice yields S_TKP = 225", () => {
    const questions = Array.from({ length: 45 }, () => ({
      category: "TKP" as const,
      pointsAwarded: 5,
    }));
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, questions);
    expect(res.scoreTkp).toBe(225);
    expect(res.categories.TKP.isPassed).toBe(true);
  });

  // Test 4: Semua soal kosong: seluruh skor 0 dan tidak lulus pada profil baseline
  it("4. All blank questions yields 0 and not passed", () => {
    const questions = [
      ...Array.from({ length: 30 }, () => ({ category: "TWK" as const, pointsAwarded: null })),
      ...Array.from({ length: 35 }, () => ({ category: "TIU" as const, pointsAwarded: null })),
      ...Array.from({ length: 45 }, () => ({ category: "TKP" as const, pointsAwarded: null })),
    ];
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, questions);
    expect(res.scoreTotal).toBe(0);
    expect(res.isPassed).toBe(false);
    expect(res.categories.TWK.isPassed).toBe(false);
    expect(res.categories.TIU.isPassed).toBe(false);
    expect(res.categories.TKP.isPassed).toBe(false);
  });

  // Test 5: TWK 13 benar (65), TIU 16 benar (80), TKP mendapat 166: memenuhi ketiga ambang baseline
  it("5. Exactly at passing threshold (TWK 65, TIU 80, TKP 166) passes all categories", () => {
    const twkQuestions = [
      ...Array.from({ length: 13 }, () => ({ category: "TWK" as const, pointsAwarded: 5 })),
      ...Array.from({ length: 17 }, () => ({ category: "TWK" as const, pointsAwarded: 0 })),
    ];
    const tiuQuestions = [
      ...Array.from({ length: 16 }, () => ({ category: "TIU" as const, pointsAwarded: 5 })),
      ...Array.from({ length: 19 }, () => ({ category: "TIU" as const, pointsAwarded: 0 })),
    ];
    // TKP 166 points across 45 questions: e.g. 31 of 4 pts (124) + 14 of 3 pts (42) = 166
    const tkpQuestions = [
      ...Array.from({ length: 31 }, () => ({ category: "TKP" as const, pointsAwarded: 4 })),
      ...Array.from({ length: 14 }, () => ({ category: "TKP" as const, pointsAwarded: 3 })),
    ];

    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, [
      ...twkQuestions,
      ...tiuQuestions,
      ...tkpQuestions,
    ]);

    expect(res.scoreTwk).toBe(65);
    expect(res.scoreTiu).toBe(80);
    expect(res.scoreTkp).toBe(166);
    expect(res.scoreTotal).toBe(311);
    expect(res.categories.TWK.isPassed).toBe(true);
    expect(res.categories.TIU.isPassed).toBe(true);
    expect(res.categories.TKP.isPassed).toBe(true);
    expect(res.isPassed).toBe(true);
  });

  // Test 6: TIU 175 tetapi TWK 60: tidak lulus keseluruhan
  it("6. TIU 175 but TWK 60 fails overall despite high TIU score", () => {
    const twkQuestions = [
      ...Array.from({ length: 12 }, () => ({ category: "TWK" as const, pointsAwarded: 5 })), // 60 pts
      ...Array.from({ length: 18 }, () => ({ category: "TWK" as const, pointsAwarded: 0 })),
    ];
    const tiuQuestions = Array.from({ length: 35 }, () => ({ category: "TIU" as const, pointsAwarded: 5 })); // 175 pts
    const tkpQuestions = Array.from({ length: 45 }, () => ({ category: "TKP" as const, pointsAwarded: 5 })); // 225 pts

    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, [
      ...twkQuestions,
      ...tiuQuestions,
      ...tkpQuestions,
    ]);

    expect(res.scoreTwk).toBe(60);
    expect(res.scoreTiu).toBe(175);
    expect(res.scoreTkp).toBe(225);
    expect(res.categories.TWK.isPassed).toBe(false);
    expect(res.categories.TIU.isPassed).toBe(true);
    expect(res.categories.TKP.isPassed).toBe(true);
    expect(res.isPassed).toBe(false);
  });

  // Test 7: Skor tepat di ambang batas: lulus kategori jika operator >=
  it("7. Score exactly at passing threshold passes", () => {
    const twkQuestions = [
      ...Array.from({ length: 13 }, () => ({ category: "TWK" as const, pointsAwarded: 5 })),
      ...Array.from({ length: 17 }, () => ({ category: "TWK" as const, pointsAwarded: 0 })),
    ];
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, twkQuestions);
    expect(res.scoreTwk).toBe(65);
    expect(res.categories.TWK.isPassed).toBe(true);
  });

  // Test 8: Skor satu poin di bawah ambang: tidak lulus kategori
  it("8. Score below threshold fails category", () => {
    const twkQuestions = [
      ...Array.from({ length: 12 }, () => ({ category: "TWK" as const, pointsAwarded: 5 })), // 60 pts
      ...Array.from({ length: 18 }, () => ({ category: "TWK" as const, pointsAwarded: 0 })),
    ];
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, twkQuestions);
    expect(res.scoreTwk).toBe(60);
    expect(res.categories.TWK.isPassed).toBe(false);
  });

  // Test 9: Mode latihan 10 soal: tampilkan skor dan statistik latihan, bukan status lulus SKD penuh
  it("9. Practice mode 10 questions returns accurate scores without forcing 110-question requirement", () => {
    const practiceQuestions = Array.from({ length: 10 }, (_, i) => ({
      category: "TIU" as const,
      pointsAwarded: i % 2 === 0 ? 5 : 0,
    }));
    const res = calculateAttemptScore(BASELINE_EXAM_PROFILE, practiceQuestions);
    expect(res.scoreTiu).toBe(25);
    expect(res.categories.TIU.answeredCount).toBe(10);
    expect(res.categories.TIU.correctCount).toBe(5);
    expect(res.categories.TIU.accuracy).toBe(50);
  });

  // Test 10: TKP satu jawaban bernilai 1 sampai 5 memperoleh poin sesuai pilihan tersebut
  it("10. TKP choices 1 to 5 award exact point values", () => {
    expect(scoreSingleQuestion("TKP", 1)).toBe(1);
    expect(scoreSingleQuestion("TKP", 2)).toBe(2);
    expect(scoreSingleQuestion("TKP", 3)).toBe(3);
    expect(scoreSingleQuestion("TKP", 4)).toBe(4);
    expect(scoreSingleQuestion("TKP", 5)).toBe(5);
    expect(scoreSingleQuestion("TKP", null)).toBe(0);
  });

  // Test 11: Randomisasi urutan opsi tidak mengubah hasil scoring
  it("11. Shuffling options preserves option points and score integrity", () => {
    const rawQuestion = {
      id: "q-test-1",
      category: "TKP" as const,
      subtopic: "pelayanan-publik",
      stem: "Saat warga mengeluhkan antrean panjang...",
      imagePath: null,
      explanation: "Opsi C paling solutif",
      difficulty: 2,
      sourceNote: "original",
      sourceReference: null,
      options: [
        { id: "o-1", label: "A", text: "Menjelaskan aturan", points: 2 },
        { id: "o-2", label: "B", text: "Meminta satpam menenangkan", points: 1 },
        { id: "o-3", label: "C", text: "Membuka loket tambahan segera", points: 5 },
        { id: "o-4", label: "D", text: "Melaporkan ke atasan", points: 4 },
        { id: "o-5", label: "E", text: "Memberikan nomor antrean baru", points: 3 },
      ],
    };

    const snapshot1 = createQuestionSnapshot(rawQuestion, 0.123);
    const snapshot2 = createQuestionSnapshot(rawQuestion, 0.987);

    // Find the 5-point option in both snapshots
    const opt5InSnap1 = snapshot1.options.find((o) => o.points === 5);
    const opt5InSnap2 = snapshot2.options.find((o) => o.points === 5);

    expect(opt5InSnap1).toBeDefined();
    expect(opt5InSnap2).toBeDefined();
    expect(opt5InSnap1?.text).toBe("Membuka loket tambahan segera");
    expect(opt5InSnap2?.text).toBe("Membuka loket tambahan segera");
    expect(opt5InSnap1?.points).toBe(5);
    expect(opt5InSnap2?.points).toBe(5);
  });

  // Test 12: Snapshot tetap menilai dengan benar setelah soal induk diedit atau diarsipkan
  it("12. Snapshot evaluation remains completely unaffected by changes in parent question", () => {
    const rawQuestion = {
      id: "twk-100",
      category: "TWK" as const,
      subtopic: "pancasila",
      stem: "Rumusan sila pertama Piagam Jakarta adalah...",
      imagePath: null,
      explanation: "Ketuhanan dengan kewajiban menjalankan syariat...",
      difficulty: 1,
      sourceNote: "original",
      sourceReference: null,
      options: [
        { id: "o-a", label: "A", text: "Kemanusiaan yang adil dan beradab", points: 0 },
        { id: "o-b", label: "B", text: "Ketuhanan dengan kewajiban menjalankan syariat...", points: 5 },
        { id: "o-c", label: "C", text: "Persatuan Indonesia", points: 0 },
        { id: "o-d", label: "D", text: "Keadilan sosial", points: 0 },
        { id: "o-e", label: "E", text: "Ketuhanan Yang Maha Esa", points: 0 },
      ],
    };

    // Attempt created and snapshot frozen
    const snapshot = createQuestionSnapshot(rawQuestion, 0.555);
    const correctOptionInSnapshot = snapshot.options.find((o) => o.points === 5)!;

    // Simulate parent question being completely edited / soft-deleted in question bank
    rawQuestion.stem = "PERTANYAAN DIUBAH TOTAL OLEH PENGGUNA";
    rawQuestion.options = [];

    // The snapshot still contains original text, explanation, and points
    expect(snapshot.stem).toBe("Rumusan sila pertama Piagam Jakarta adalah...");
    expect(correctOptionInSnapshot.points).toBe(5);
    expect(snapshot.options.length).toBe(5);
  });
});
