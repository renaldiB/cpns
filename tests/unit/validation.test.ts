import { describe, it, expect } from "vitest";
import { QuestionInputSchema } from "@/lib/questions/validation";
import { normalizeStem, calculateSimilarity, checkDuplicate } from "@/lib/questions/dedup";
import { formatSeconds, getTimerState } from "@/lib/exam/timer";

describe("Validation and Utility Unit Tests", () => {
  it("validates correct TWK question schema", () => {
    const validTwk = {
      category: "TWK" as const,
      subtopic: "pancasila",
      stem: "Lembaga yang bertugas mengesahkan Pancasila adalah...",
      explanation: "PPKI mengesahkan Pancasila pada 18 Agustus 1945.",
      difficulty: 1 as const,
      options: [
        { label: "A" as const, text: "BPUPKI", points: 0 },
        { label: "B" as const, text: "PPKI", points: 5 },
        { label: "C" as const, text: "KNIP", points: 0 },
        { label: "D" as const, text: "DPA", points: 0 },
        { label: "E" as const, text: "MPRS", points: 0 },
      ],
    };
    const result = QuestionInputSchema.safeParse(validTwk);
    expect(result.success).toBe(true);
  });

  it("rejects TWK with more than one 5-point option", () => {
    const invalidTwk = {
      category: "TWK" as const,
      subtopic: "pancasila",
      stem: "Soal TWK salah...",
      explanation: "Penjelasan",
      difficulty: 1 as const,
      options: [
        { label: "A" as const, text: "Opsi A", points: 5 },
        { label: "B" as const, text: "Opsi B", points: 5 },
        { label: "C" as const, text: "Opsi C", points: 0 },
        { label: "D" as const, text: "Opsi D", points: 0 },
        { label: "E" as const, text: "Opsi E", points: 0 },
      ],
    };
    const result = QuestionInputSchema.safeParse(invalidTwk);
    expect(result.success).toBe(false);
  });

  it("validates correct TKP question schema with unique 1..5 points", () => {
    const validTkp = {
      category: "TKP" as const,
      subtopic: "pelayanan-publik",
      stem: "Saat warga datang meminta bantuan di luar jam kerja...",
      explanation: "Opsi D paling tepat dan solutif.",
      difficulty: 2 as const,
      options: [
        { label: "A" as const, text: "Menolak tegas", points: 1 },
        { label: "B" as const, text: "Menyuruh datang besok", points: 2 },
        { label: "C" as const, text: "Mencatat nomornya", points: 3 },
        { label: "D" as const, text: "Membantu bila kondisi darurat dan sesuai SOP", points: 5 },
        { label: "E" as const, text: "Menghubungi pimpinan meminta petunjuk", points: 4 },
      ],
    };
    const result = QuestionInputSchema.safeParse(validTkp);
    expect(result.success).toBe(true);
  });

  it("rejects path traversal in imagePath", () => {
    const questionWithMaliciousPath = {
      category: "TIU" as const,
      subtopic: "figural",
      stem: "Perhatikan gambar berikut...",
      imagePath: "../../../etc/passwd",
      explanation: "Penjelasan",
      difficulty: 2 as const,
      options: [
        { label: "A" as const, text: "A", points: 5 },
        { label: "B" as const, text: "B", points: 0 },
        { label: "C" as const, text: "C", points: 0 },
        { label: "D" as const, text: "D", points: 0 },
        { label: "E" as const, text: "E", points: 0 },
      ],
    };
    const result = QuestionInputSchema.safeParse(questionWithMaliciousPath);
    expect(result.success).toBe(false);
  });

  it("detects exact duplicate stems through normalization", () => {
    const stemA = "Siapakah ketua BPUPKI yang dilantik pada tahun 1945?";
    const stemB = "siapakah  ketua bpupki yang dilantik pada tahun 1945? ";
    expect(normalizeStem(stemA)).toBe(normalizeStem(stemB));

    const check = checkDuplicate(stemB, [{ id: "q1", stem: stemA }]);
    expect(check.isExactDuplicate).toBe(true);
    expect(check.similarityScore).toBe(1.0);
  });

  it("formats timer seconds correctly", () => {
    expect(formatSeconds(6000)).toBe("01:40:00");
    expect(formatSeconds(600)).toBe("10:00");
    expect(formatSeconds(59)).toBe("00:59");
    expect(formatSeconds(0)).toBe("00:00");
  });
});
