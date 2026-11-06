import Link from "next/link";
import { db } from "@/db";
import { attempts, backupRecords, questions, questionBatches } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import { EXAM_CONFIG } from "@/config/exam";
import { getScoreTrend, getSubtopicAnalytics } from "@/lib/analytics";
import { getAllBatches } from "@/lib/batches";
import {
  Play,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Database,
  Award,
  Layers,
  Sparkles,
  Flame,
  CheckCircle,
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

  // 4. Fetch total bank questions & batches
  const totalQuestionsCount =
    db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(sql`${questions.deletedAt} IS NULL`)
      .get()?.count || 0;

  const batches = getAllBatches();

  // Calculate quick metrics
  const completedAttemptsCount =
    db
      .select({ count: sql<number>`count(*)` })
      .from(attempts)
      .where(eq(attempts.status, "finished"))
      .get()?.count || 0;

  const passedAttemptsCount =
    db
      .select({ count: sql<number>`count(*)` })
      .from(attempts)
      .where(sql`${attempts.status} = 'finished' AND ${attempts.isPassed} = 1`)
      .get()?.count || 0;

  const passRate =
    completedAttemptsCount > 0 ? Math.round((passedAttemptsCount / completedAttemptsCount) * 100) : 0;

  return (
    <div className="mx-auto max-w-[1536px] px-4 sm:px-6 py-4 space-y-8">
      {/* Candidate Welcome & Diagnostic Stats Ribbon */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark shadow-sm">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-container-highest text-cobalt-light dark:text-primary font-mono text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-light dark:bg-emerald-dark animate-pulse" />
              CAT Engine Ready
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-container-high text-slate-600 dark:text-on-surface-variant text-xs font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
              KepmenPANRB No. 321/2024
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Selamat Datang di <span className="text-cobalt-light dark:text-cobalt-dark">Simulasi SKD CPNS</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-on-surface-variant font-medium">
            <span>Target Formasi:</span>
            <span className="font-bold text-slate-800 dark:text-on-surface">Seleksi Kompetensi Dasar CPNS</span>
            <span>&bull;</span>
            <span className="font-mono text-emerald-600 dark:text-secondary-fixed-dim bg-slate-100 dark:bg-surface-dark px-2 py-0.5 rounded-md">
              Passing Grade: 65 / 80 / 166
            </span>
          </div>
        </div>

        {/* 4-Pillar Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:shrink-0">
          <div className="flex flex-col p-3.5 sm:p-4 bg-slate-50 dark:bg-surface-container rounded-2xl min-w-[130px] border border-slate-100 dark:border-border-dark">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
              Sesi Ujian
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                {completedAttemptsCount}
              </span>
              <span className="text-xs text-slate-400">Selesai</span>
            </div>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-dark mt-1">
              {completedAttemptsCount > 0 ? "Riwayat tercatat" : "Mulai latihan"}
            </span>
          </div>

          <div className="flex flex-col p-3.5 sm:p-4 bg-slate-50 dark:bg-surface-container rounded-2xl min-w-[130px] border border-slate-100 dark:border-border-dark">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
              Prediksi Lulus
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-secondary-fixed-dim">
                {completedAttemptsCount > 0 ? `${passRate}%` : "-"}
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-dark mt-1">
              Ambang Batas PG
            </span>
          </div>

          <div className="flex flex-col p-3.5 sm:p-4 bg-slate-50 dark:bg-surface-container rounded-2xl min-w-[130px] border border-slate-100 dark:border-border-dark">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
              Skor Terakhir
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                {lastAttempt?.scoreTotal ?? "-"}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 550</span>
            </div>
            <span className="text-[10px] font-mono text-cobalt-light dark:text-primary mt-1">
              {lastAttempt ? (lastAttempt.isPassed ? "LULUS PG" : "TIDAK LULUS") : "Belum ujian"}
            </span>
          </div>

          <div className="flex flex-col p-3.5 sm:p-4 bg-slate-50 dark:bg-surface-container rounded-2xl min-w-[130px] border border-slate-100 dark:border-border-dark">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
              Bank Soal
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                {totalQuestionsCount}
              </span>
              <span className="text-xs text-slate-400">Butir</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-outline mt-1">
              {batches.length} Paket Batch
            </span>
          </div>
        </div>
      </section>

      {/* Active Attempt Resume Banner */}
      {activeAttempt && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8 shadow-md dark:border-amber-600 dark:from-amber-950/40 dark:to-orange-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-200">
                <span className="h-2 w-2 animate-ping rounded-full bg-amber-500" />
                SESI UJIAN BERJALAN
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Anda memiliki sesi ujian aktif yang belum diselesaikan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Mode: {activeAttempt.mode === "full" ? "Simulasi Penuh CAT (110 Soal)" : "Latihan Kategori"} &bull; Timer tetap tersinkronisasi di server lokal.
              </p>
            </div>
            <Link
              href={`/ujian/${activeAttempt.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-amber-700 active:scale-95 transition"
            >
              <span>Lanjutkan Ujian</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Dual Hero Workbench Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* HERO CARD 1: Full Simulated CAT Test Engine (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-surface-container-high rounded-3xl border border-border-light dark:border-border-dark shadow-sm relative overflow-hidden group">
          <div className="space-y-4 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cobalt-light text-white font-mono text-[11px] font-bold tracking-wider">
                SIMULASI CAT BKN
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-container-highest text-emerald-700 dark:text-secondary-fixed-dim font-mono text-[11px] font-semibold">
                KEPMENPANRB 321/2024
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-container-highest text-slate-600 dark:text-on-surface-variant font-mono text-[11px] flex items-center gap-1">
                <Clock className="h-3 w-3 text-amber-500" /> 100 Menit
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Simulasi Penuh SKD BKN
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-on-surface-variant leading-relaxed">
                Ujian CAT komprehensif 110 butir soal dengan lingkungan, alokasi waktu 100 menit, dan mekanisme scoring identik server resmi BKN.
              </p>
            </div>

            {/* Feature Matrix Cards */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">TWK</span>
                <span className="text-xs font-bold text-slate-800 dark:text-on-surface">30 Soal &bull; Min 65</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Maks: 150</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">TIU</span>
                <span className="text-xs font-bold text-slate-800 dark:text-on-surface">35 Soal &bull; Min 80</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Maks: 175</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">TKP</span>
                <span className="text-xs font-bold text-slate-800 dark:text-on-surface">45 Soal &bull; Min 166</span>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono">Maks: 225</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-on-surface-variant font-medium pt-1">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-secondary-fixed-dim">
                <CheckCircle2 className="h-4 w-4" /> Anti-Interupsi Autosave
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cobalt-light dark:text-primary" /> Waktu CAT Riil Server
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-500" /> Analisis Distribusi TKP
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-border-light dark:border-surface-container-highest z-10">
            <span className="text-xs font-mono text-slate-400 dark:text-outline hidden sm:inline">
              Format Ujian CAT Mandiri
            </span>
            <Link
              href="/simulasi"
              className="px-6 py-3 rounded-2xl bg-cobalt-light dark:bg-cobalt-dark hover:opacity-90 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition active:scale-95 ml-auto sm:ml-0"
            >
              <span>Mulai Ujian Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* HERO CARD 2: Targeted Category Drill Workbench (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-surface-container rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-container-high text-cobalt-light dark:text-primary font-mono text-xs font-bold uppercase tracking-wider">
                Mode Latihan Terarah
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-outline">Per Pilar SKD</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Drill Soal Per Pilar SKD
              </h2>
              <p className="text-xs text-slate-500 dark:text-on-surface-variant mt-1 leading-relaxed">
                Fokuskan latihan intensif pada kategori tertentu dengan pilihan sub-materi spesifik dan pembahasan seketika.
              </p>
            </div>

            {/* 3 Pillar Quick Launch Cards */}
            <div className="space-y-2.5 pt-1">
              {/* TWK */}
              <Link
                href="/latihan?category=TWK"
                className="group p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 dark:bg-surface-container-low dark:hover:bg-surface-container-high border border-slate-100 dark:border-border-dark transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-light flex items-center justify-center font-mono font-black text-xs shrink-0">
                    TWK
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-on-surface group-hover:text-cobalt-light dark:group-hover:text-primary transition-colors">
                      Tes Wawasan Kebangsaan
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Pancasila, UUD 1945, NKRI, Bela Negara &bull; Min 65
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-cobalt-light group-hover:translate-x-1 transition-all" />
              </Link>

              {/* TIU */}
              <Link
                href="/latihan?category=TIU"
                className="group p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 dark:bg-surface-container-low dark:hover:bg-surface-container-high border border-slate-100 dark:border-border-dark transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cobalt-light/15 text-cobalt-light dark:text-primary flex items-center justify-center font-mono font-black text-xs shrink-0">
                    TIU
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-on-surface group-hover:text-cobalt-light dark:group-hover:text-primary transition-colors">
                      Tes Inteligensia Umum
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Verbal, Numerik, Silogisme, Figural &bull; Min 80
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-cobalt-light group-hover:translate-x-1 transition-all" />
              </Link>

              {/* TKP */}
              <Link
                href="/latihan?category=TKP"
                className="group p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 dark:bg-surface-container-low dark:hover:bg-surface-container-high border border-slate-100 dark:border-border-dark transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-secondary flex items-center justify-center font-mono font-black text-xs shrink-0">
                    TKP
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-on-surface group-hover:text-cobalt-light dark:group-hover:text-primary transition-colors">
                      Tes Karakteristik Pribadi
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Pelayanan Publik, Profesionalisme, TIK &bull; Min 166
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-cobalt-light group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border-light dark:border-border-dark">
            <Link
              href="/latihan"
              className="text-xs font-bold text-cobalt-light dark:text-primary hover:underline flex items-center gap-1.5"
            >
              <span>Konfigurasi Latihan Kustom</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Question Batches Spotlight */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cobalt-light/10 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark text-xs font-bold font-mono">
                <Layers className="h-3.5 w-3.5" />
                PAKET BATCH SOAL
              </span>
              <span className="text-xs text-slate-400 font-mono">Dukungan Multi-Paket</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Ketersediaan Paket Soal Latihan & Simulasi
            </h2>
          </div>

          <Link
            href="/batch-soal"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-container dark:hover:bg-surface-container-high text-xs font-bold text-slate-800 dark:text-on-surface transition"
          >
            <span>Kelola Seluruh Batch</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {batches.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-cobalt-light/10 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark font-mono font-bold text-xs">
                    BATCH #{b.batchNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-on-surface">
                    {b.totalQuestions} Soal
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{b.name}</h3>
                <p className="text-xs text-slate-500 dark:text-on-surface-variant line-clamp-2">
                  {b.description || "Paket soal latihan SKD."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-border-dark">
                <span className="text-[11px] font-mono text-slate-400">Tahun {b.targetYear}</span>
                <Link
                  href={`/latihan?batch=${b.batchNumber}`}
                  className="text-xs font-bold text-cobalt-light dark:text-primary hover:underline flex items-center gap-1"
                >
                  <span>Latihan Soal Ini</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weakness Analytics Preview */}
      {topWeaknesses.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cobalt-light dark:text-primary" />
              <span>Prioritas Peningkatan Sub-Materi</span>
            </h2>
            <Link
              href="/analisis"
              className="text-xs font-bold text-cobalt-light dark:text-primary hover:underline flex items-center gap-1"
            >
              <span>Lihat Analisis Lengkap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {topWeaknesses.map((item) => (
              <div
                key={item.subtopicId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cobalt-light dark:text-primary">{item.category}</span>
                  <span className="font-bold text-rose-600 dark:text-rose-light">{item.accuracy}%</span>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-on-surface truncate">
                  {item.subtopicName}
                </p>
                <Link
                  href={`/latihan?category=${item.category}&subtopics=${item.subtopicId}`}
                  className="block text-center py-1.5 px-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-[11px] font-bold text-slate-700 dark:text-on-surface hover:bg-slate-100 dark:hover:bg-surface-container-high transition"
                >
                  Latih Sub-Topik Ini &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
