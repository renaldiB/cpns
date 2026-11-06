import Link from "next/link";
import { db } from "@/db";
import { attempts, backupRecords, questions } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import { EXAM_CONFIG } from "@/config/exam";
import { getScoreTrend, getSubtopicAnalytics } from "@/lib/analytics";
import {
  Play,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Database,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Fetch active attempt
  const activeAttempt = db
    .select()
    .from(attempts)
    .where(eq(attempts.status, "in_progress"))
    .orderBy(desc(attempts.startedAt))
    .get();

  // 2. Fetch last completed attempt
  const lastAttempt = db
    .select()
    .from(attempts)
    .where(eq(attempts.status, "finished"))
    .orderBy(desc(attempts.finishedAt))
    .get();

  // 3. Fetch analytics & trends
  const scoreTrends = getScoreTrend(10);
  const subtopicStats = getSubtopicAnalytics();
  const topWeaknesses = subtopicStats.filter((s) => s.hasEnoughData).slice(0, 4);

  // 4. Fetch total bank questions
  const totalQuestionsCount = db
    .select({ count: sql<number>`count(*)` })
    .from(questions)
    .where(sql`${questions.deletedAt} IS NULL`)
    .get()?.count || 0;

  // 5. Fetch last backup record
  const lastBackup = db
    .select()
    .from(backupRecords)
    .orderBy(desc(backupRecords.createdAt))
    .get();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Disclaimer Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Status Regulasi & Profil Ujian Aktif</p>
          <p className="mt-0.5 leading-relaxed text-blue-800 dark:text-blue-300">
            {EXAM_CONFIG.disclaimerText}
          </p>
        </div>
      </div>

      {/* Active Attempt Resume Banner */}
      {activeAttempt && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-600 dark:from-amber-950/40 dark:to-orange-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-200">
                <span className="h-2 w-2 animate-ping rounded-full bg-amber-500" />
                SESI UJIAN AKTIF
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Anda memiliki simulasi ujian yang sedang berjalan
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mode: {activeAttempt.mode === "full" ? "Simulasi Penuh (110 Soal)" : "Latihan Kategori"} &bull; Waktu terus berjalan di background.
              </p>
            </div>
            <Link
              href={`/ujian/${activeAttempt.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow hover:bg-amber-700 transition"
            >
              Lanjutkan Ujian Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Hero Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Simulation CTA */}
        <div className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Format Resmi CAT BKN
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">100 Menit &bull; 110 Soal</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Simulasi Penuh SKD CPNS
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Ujian CAT sesungguhnya dengan kombinasi 30 TWK, 35 TIU, dan 45 TKP. Soal diacak dengan blueprint terstandar dan opsi terlindungi anti kebocoran.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/simulasi"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-800 transition"
            >
              <Play className="h-4 w-4 fill-white" />
              Mulai Simulasi Penuh
            </Link>
          </div>
        </div>

        {/* Category Practice CTA */}
        <div className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Latihan Fleksibel
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Pilih Sub-materi Mandiri</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Latihan per Kategori
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Fokus mendalami materi spesifik (TWK, TIU, atau TKP). Atur jumlah soal, tingkat kesulitan, serta opsi timer dan pembahasan langsung.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/latihan"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 py-3.5 text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950"
            >
              <BookOpen className="h-4 w-4" />
              Konfigurasi Latihan Kategori
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Bank Soal Tersedia</span>
            <Database className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalQuestionsCount}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">330 Soal Original Siap Uji</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Skor Terakhir</span>
            <Award className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {lastAttempt?.scoreTotal ?? "-"}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {lastAttempt ? `${lastAttempt.mode === "full" ? (lastAttempt.isPassed ? "LULUS PG" : "BELUM LULUS") : "Latihan"}` : "Belum ada ujian"}
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Ambang Batas (PG)</span>
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            TWK 65 &bull; TIU 80 &bull; TKP 166
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">KepmenPANRB 321/2024</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Status Backup</span>
            <Clock className="h-4 w-4" />
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white truncate">
            {lastBackup ? "Tersimpan Aman" : "Belum Pernah"}
          </p>
          <Link href="/backup" className="text-[11px] text-blue-600 hover:underline dark:text-blue-400 font-medium">
            Kelola Backup Lokal &rarr;
          </Link>
        </div>
      </div>

      {/* Last Attempt Detailed Card (If Exists) */}
      {lastAttempt && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Hasil Ujian Terakhir</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selesai pada: {new Date(lastAttempt.finishedAt || lastAttempt.startedAt).toLocaleString("id-ID")}
              </p>
            </div>
            <Link
              href={`/hasil/${lastAttempt.id}`}
              className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Rincian Hasil & Pembahasan &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Skor TWK</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{lastAttempt.scoreTwk ?? 0}</p>
              <span className={`text-[10px] font-bold ${(lastAttempt.scoreTwk ?? 0) >= 65 ? "text-emerald-600" : "text-rose-600"}`}>
                {(lastAttempt.scoreTwk ?? 0) >= 65 ? "Memenuhi (>=65)" : "Di bawah PG"}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Skor TIU</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{lastAttempt.scoreTiu ?? 0}</p>
              <span className={`text-[10px] font-bold ${(lastAttempt.scoreTiu ?? 0) >= 80 ? "text-emerald-600" : "text-rose-600"}`}>
                {(lastAttempt.scoreTiu ?? 0) >= 80 ? "Memenuhi (>=80)" : "Di bawah PG"}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Skor TKP</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{lastAttempt.scoreTkp ?? 0}</p>
              <span className={`text-[10px] font-bold ${(lastAttempt.scoreTkp ?? 0) >= 166 ? "text-emerald-600" : "text-rose-600"}`}>
                {(lastAttempt.scoreTkp ?? 0) >= 166 ? "Memenuhi (>=166)" : "Di bawah PG"}
              </span>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Total Skor</span>
              <p className="text-xl font-black text-blue-900 dark:text-blue-200">{lastAttempt.scoreTotal ?? 0}</p>
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">Maks: 550</span>
            </div>
          </div>
        </div>
      )}

      {/* Weakness Subtopics Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-slate-900 dark:text-white">Analisis Kelemahan Sub-materi</h3>
          </div>
          <Link href="/analisis" className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Lihat Semua Sub-materi &rarr;
          </Link>
        </div>

        {topWeaknesses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Belum ada sampel data yang cukup (minimal 5 soal terjawab per sub-materi) untuk mendeteksi kelemahan.
            Silakan ikuti simulasi atau latihan terlebih dahulu.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topWeaknesses.map((w) => (
              <div key={w.subtopicId} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{w.category}</span>
                    <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">{w.scorePercentage}%</span>
                  </div>
                  <h4 className="mt-1 font-semibold text-sm text-slate-900 dark:text-white">{w.subtopicName}</h4>
                  <p className="mt-1 text-[11px] text-slate-500">{w.totalAnswered} soal diuji</p>
                </div>
                <Link
                  href={`/latihan?category=${w.category}&subtopic=${w.subtopicId}`}
                  className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Latih Materi Ini
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
