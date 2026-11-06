export const EXAM_CONFIG = {
  appName: "Simulasi CAT SKD CPNS",
  appVersion: "2.0.0",
  defaultBindHost: "127.0.0.1",
  defaultPort: 3000,
  minPracticeQuestions: 5,
  maxPracticeQuestions: 110,
  warningTimeSeconds: 600, // 10 menit tersisa -> indikator warna berubah
  criticalTimeSeconds: 300, // 5 menit tersisa
  recentAttemptUsagePenaltyDays: 7, // penalti soal yang sudah dikerjakan dalam 7 hari
  minSampleSizeForAnalysis: 5, // ambang batas minimum soal untuk analisis sub-materi
  disclaimerText:
    "Profil latihan menggunakan referensi historis CPNS TA 2024 (KepmenPANRB No. 321/2024). Verifikasi ketentuan tahun seleksi yang dituju melalui pengumuman resmi BKN / KemenPANRB.",
};
