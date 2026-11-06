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

export const PRESET_EXAM_PROFILES: ExamProfile[] = [
  BASELINE_EXAM_PROFILE,
  {
    id: "cpns-2021-baseline",
    name: "CPNS TA 2021 — KepmenPANRB 1023/2021",
    year: 2021,
    examType: "cpns",
    description: "Format awal ekspansi 110 soal dan integrasi materi Anti-Radikalisme.",
    referenceStatus: "historical",
    sourceTitle: "Keputusan Menteri PANRB Nomor 1023 Tahun 2021",
    sourceDocumentNumber: "KepmenPANRB No. 1023/2021",
    durationSeconds: 100 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 30, passingScore: 65, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 35, passingScore: 80, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 45, passingScore: 166, maxScore: 225, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "sekdin-2024",
    name: "Sekolah Kedinasan (Dikdin) — KepmenPANRB 71/2024",
    year: 2024,
    examType: "cpns",
    description: "Standar seleksi masuk STAN, IPDN, Poltekip, STIS, STIN, dan Sekdin Kemenhub.",
    referenceStatus: "official_current",
    sourceTitle: "Keputusan Menteri PANRB Nomor 71 Tahun 2024",
    sourceDocumentNumber: "KepmenPANRB No. 71/2024",
    durationSeconds: 100 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 30, passingScore: 65, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 35, passingScore: 80, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 45, passingScore: 156, maxScore: 225, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "cpns-2019-historical",
    name: "Historis CPNS 2019 — PermenPANRB 24/2019",
    year: 2019,
    examType: "cpns",
    description: "Format 100 soal dalam 90 menit dengan passing grade TKP 126.",
    referenceStatus: "historical",
    sourceTitle: "Peraturan Menteri PANRB Nomor 24 Tahun 2019",
    sourceDocumentNumber: "PermenPANRB No. 24/2019",
    durationSeconds: 90 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 35, passingScore: 65, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 30, passingScore: 80, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 35, passingScore: 126, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "cpns-2018-extreme",
    name: "Tantangan Ekstrem CPNS 2018 — PermenPANRB 37/2018",
    year: 2018,
    examType: "cpns",
    description: "Passing grade legendaris paling ketat dalam sejarah seleksi CPNS (TKP 143, TWK 75).",
    referenceStatus: "historical",
    sourceTitle: "Peraturan Menteri PANRB Nomor 37 Tahun 2018",
    sourceDocumentNumber: "PermenPANRB No. 37/2018",
    durationSeconds: 90 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 35, passingScore: 75, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 30, passingScore: 80, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 35, passingScore: 143, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "cpns-cumlaude-2024",
    name: "Jalur Khusus Cumlaude — KepmenPANRB 321/2024",
    year: 2024,
    examType: "cpns",
    description: "Ambang batas khusus lulusan terbaik: TIU minimal 85 dan total skor minimal 311.",
    referenceStatus: "official_current",
    sourceTitle: "Keputusan Menteri PANRB Nomor 321 Tahun 2024 Diktum Kesepuluh",
    sourceDocumentNumber: "KepmenPANRB No. 321/2024 Diktum 10",
    durationSeconds: 100 * 60,
    isCumulativePassing: true,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 30, passingScore: 0, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 35, passingScore: 85, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 45, passingScore: 0, maxScore: 225, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "pppk-kompetensi-2024",
    name: "Seleksi PPPK 2024 — KepmenPANRB 347/2024",
    year: 2024,
    examType: "cpns",
    description: "Uji kompetensi manajerial, sosial kultural, teknis, dan wawancara berbasis komputer.",
    referenceStatus: "official_current",
    sourceTitle: "Keputusan Menteri PANRB Nomor 347 Tahun 2024",
    sourceDocumentNumber: "KepmenPANRB No. 347/2024",
    durationSeconds: 120 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 30, passingScore: 60, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 35, passingScore: 70, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 45, passingScore: 130, maxScore: 225, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
  {
    id: "bumn-rbb-2024",
    name: "Rekrutmen Bersama BUMN — Standar FHCI",
    year: 2024,
    examType: "cpns",
    description: "Tes Kemampuan Dasar (TKD), Core Values AKHLAK, dan Wawasan Kebangsaan BUMN.",
    referenceStatus: "official_current",
    sourceTitle: "Standar Ujian RBB Forum Human Capital Indonesia",
    durationSeconds: 100 * 60,
    isCumulativePassing: false,
    isDefault: false,
    isPracticeOnlyDisclaimer: true,
    categories: {
      TWK: { questionCount: 30, passingScore: 65, maxScore: 150, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TIU: { questionCount: 35, passingScore: 75, maxScore: 175, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0 },
      TKP: { questionCount: 45, passingScore: 150, maxScore: 225, correctPoints: 5, wrongPoints: 0, unansweredPoints: 0, isWeightedScore: true },
    },
  },
];

export const INITIAL_EXAM_PROFILES: ExamProfile[] = PRESET_EXAM_PROFILES;

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
