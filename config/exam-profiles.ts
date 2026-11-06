import { CategoryId } from "./subtopics";

export type ReferenceStatus = "official_current" | "historical" | "estimated" | "unverified";

export interface CategoryRule {
  questionCount: number;
  passingScore: number;
  maxScore: number;
  correctPoints: number;
  wrongPoints: number;
  unansweredPoints: number;
  isWeightedScore?: boolean; // For TKP where choices have points 1..5
}

export interface ExamProfile {
  id: string;
  name: string;
  year: number;
  examType: "cpns";
  description: string;
  referenceStatus: ReferenceStatus;
  sourceTitle: string;
  sourceUrl?: string;
  sourceDocumentNumber?: string;
  verifiedAt?: string;
  notes?: string;
  durationSeconds: number; // 6000 = 100 menit
  isCumulativePassing: boolean; // default false: each category has its own threshold
  categories: Record<CategoryId, CategoryRule>;
  isDefault: boolean;
  isPracticeOnlyDisclaimer: boolean;
}

export const BASELINE_EXAM_PROFILE: ExamProfile = {
  id: "cpns-2024-baseline",
  name: "CPNS TA 2024 — Referensi Historis",
  year: 2024,
  examType: "cpns",
  description: "Berdasarkan KepmenPANRB Nomor 321 Tahun 2024 tentang Nilai Ambang Batas SKD Pengadaan CPNS TA 2024.",
  referenceStatus: "historical",
  sourceTitle: "Keputusan Menteri PANRB Nomor 321 Tahun 2024",
  sourceUrl: "https://jdih.menpan.go.id/dokumen-hukum/keputusan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-321-tahun-2024-tentang-1851",
  sourceDocumentNumber: "KepmenPANRB No. 321/2024",
  verifiedAt: "2024-07-29",
  notes: "Digunakan sebagai baseline simulasi latihan. Bukan klaim regulasi resmi CPNS 2026.",
  durationSeconds: 100 * 60, // 100 menit = 6000 detik
  isCumulativePassing: false,
  isDefault: true,
  isPracticeOnlyDisclaimer: true,
  categories: {
    TWK: {
      questionCount: 30,
      passingScore: 65,
      maxScore: 150,
      correctPoints: 5,
      wrongPoints: 0,
      unansweredPoints: 0,
    },
    TIU: {
      questionCount: 35,
      passingScore: 80,
      maxScore: 175,
      correctPoints: 5,
      wrongPoints: 0,
      unansweredPoints: 0,
    },
    TKP: {
      questionCount: 45,
      passingScore: 166,
      maxScore: 225,
      correctPoints: 5, // max point
      wrongPoints: 0,
      unansweredPoints: 0,
      isWeightedScore: true,
    },
  },
};

export const INITIAL_EXAM_PROFILES: ExamProfile[] = [BASELINE_EXAM_PROFILE];

export function getTotalQuestions(profile: ExamProfile): number {
  return (
    profile.categories.TWK.questionCount +
    profile.categories.TIU.questionCount +
    profile.categories.TKP.questionCount
  );
}

export function getTotalMaxScore(profile: ExamProfile): number {
  return (
    profile.categories.TWK.maxScore +
    profile.categories.TIU.maxScore +
    profile.categories.TKP.maxScore
  );
}
