import Link from "next/link";
import { notFound } from "next/navigation";
import { getAttemptDetail } from "@/lib/exam/lifecycle";
import { EXAM_CONFIG } from "@/config/exam";
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Home,
  ShieldCheck,
  BarChart2,
  TrendingUp,
  FileText,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HasilPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const detail = getAttemptDetail(attemptId);

  if (!detail || !detail.isCompleted) {
    notFound();
  }

  const { attempt, questions } = detail;
  const summary = attempt.summary;
  const isFullSimulation = attempt.mode === "full";

  // Calculate duration spent
  let durationSpentStr = "-";
  if (attempt.startedAt && attempt.finishedAt) {
    const diffSec = Math.floor(
      (new Date(attempt.finishedAt).getTime() - new Date(attempt.startedAt).getTime()) / 1000
    );
    const m = Math.floor(diffSec / 60);
    const s = diffSec % 60;
    durationSpentStr = `${m} menit ${s} detik`;
  }

  const twkStats = summary?.categories?.TWK;
  const tiuStats = summary?.categories?.TIU;
  const tkpStats = summary?.categories?.TKP;

  const twkPassed = twkStats?.isPassed ?? false;
  const tiuPassed = tiuStats?.isPassed ?? false;
  const tkpPassed = tkpStats?.isPassed ?? false;
  const overallPassed = attempt.isPassed ?? false;

  const totalScore = attempt.scoreTotal ?? 0;
  const passingGradeThreshold = 311;
  const deviation = totalScore - passingGradeThreshold;

  return (
    <div className="min-h-screen bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Top Meta Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="font-mono text-xs text-cobalt-light dark:text-cobalt-dark font-semibold">
              SESI #{attempt.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Durasi: {durationSpentStr}</span>
            </div>
            {attempt.finishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {new Date(attempt.finishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 1. Official Passing/Status Banner & Hero Summary (Bento Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Status Bento Card (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-border-light bg-white p-6 sm:p-8 dark:border-border-dark dark:bg-surface-elevated-dark shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="flex flex-wrap items-center gap-3">
                {isFullSimulation ? (
                  overallPassed ? (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-mono text-xs font-black tracking-wider uppercase shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>MEMENUHI NILAI AMBANG BATAS (LULUS PG)</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 font-mono text-xs font-black tracking-wider uppercase shadow-sm">
                      <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      <span>BELUM MEMENUHI PASSING GRADE</span>
                    </div>
                  )
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cobalt-light/15 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark font-mono text-xs font-black tracking-wider uppercase shadow-sm">
                    <Award className="h-4 w-4" />
                    <span>HASIL EVALUASI LATIHAN MANDIRI</span>
                  </div>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-surface-dark dark:text-slate-300 font-mono text-[11px] font-semibold border border-border-light dark:border-border-dark">
                  STANDAR KEPMENPAN-RB NO. 321/2024
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {isFullSimulation
                  ? overallPassed
                    ? "Evaluasi Kelulusan SKD CPNS Tingkat Nasional"
                    : "Evaluasi Hasil Simulasi SKD CPNS"
                  : "Rekapitulasi Capaian Latihan Terarah"}
              </h2>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
                {isFullSimulation
                  ? overallPassed
                    ? "Akumulasi nilai seluruh sub-tes (TWK, TIU, TKP) melampaui batas minimal formasi umum. Anda berhak melaju ke perankingan kuota 3x formasi SKB."
                    : "Salah satu atau lebih pilar belum mencapai passing grade minimal (TWK 65, TIU 80, TKP 166). Fokuskan latihan pada sub-materi dengan deviasi terendah."
                  : "Sesi latihan mandiri selesai dievaluasi dengan kunci jawaban dan analisis bobot resmi."}
              </p>
            </div>

            {/* Metric Readout Horizontal Band */}
            {isFullSimulation && (
              <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-surface-dark border border-border-light dark:border-border-dark">
                  <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Ambang Batas (PG)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">311</span>
                    <span className="font-mono text-xs text-slate-400">pts</span>
                  </div>
                  <span className={`font-mono text-xs mt-1 block font-semibold ${totalScore >= 311 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {totalScore >= 311 ? "Melampaui" : "Di Bawah"}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-surface-dark border border-border-light dark:border-border-dark">
                  <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Deviasi Surplus
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-xl font-bold ${deviation >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {deviation >= 0 ? `+${deviation}` : deviation}
                    </span>
                    <span className="font-mono text-xs text-slate-400">pts</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-1 block">
                    dari batas 311
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-surface-dark border border-border-light dark:border-border-dark">
                  <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Efisiensi Waktu
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-cobalt-light dark:text-cobalt-dark">
                      100m
                    </span>
                    <span className="font-mono text-xs text-slate-400">alokasi</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-1 block">
                    Standar BKN
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-surface-dark border border-border-light dark:border-border-dark">
                  <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Peluang SKB
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-xl font-bold ${overallPassed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                      {overallPassed ? "A+" : "C"}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {overallPassed ? "Zona Lolos" : "Belum Lolos"}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-1 block">
                    {overallPassed ? "Prioritas Formasi" : "Tingkatkan Skor"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Hero Total Score Block (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl border border-border-light bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8 dark:border-border-dark dark:from-surface-elevated-dark dark:to-surface-dark shadow-sm flex flex-col justify-between text-center relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                AKUMULASI SKOR SKD
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-surface-dark dark:text-slate-300 border border-border-light dark:border-border-dark">
                MAX {isFullSimulation ? 550 : summary?.maxTotal ?? "-"}
              </span>
            </div>

            <div className="my-8">
              <div className="flex items-baseline justify-center gap-1 font-mono">
                <span className="text-6xl sm:text-7xl font-black tracking-tighter text-slate-900 dark:text-white tabular-nums">
                  {totalScore}
                </span>
                <span className="text-lg font-bold text-slate-400">
                  /{isFullSimulation ? 550 : summary?.maxTotal ?? "-"}
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isFullSimulation
                  ? overallPassed
                    ? "Lolos Seluruh Ambang Batas Subtes"
                    : "Perlu Peningkatan Nilai Ambang Batas"
                  : "Akurasi Latihan Tercatat"}
              </p>
            </div>

            <div className="pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Selesai dalam {durationSpentStr}</span>
            </div>
          </div>
        </div>

        {/* 2. Three Pillars Sub-Test Performance Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* TWK Card */}
          <div className="rounded-3xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-surface-elevated-dark shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase">Tes Wawasan Kebangsaan</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">TWK</h3>
              </div>
              <span className="font-mono text-xs text-slate-400">Maks 150</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                {attempt.scoreTwk ?? 0}
              </span>
              <span className="font-mono text-xs text-slate-400">/ 150</span>
            </div>

            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold ${
                  twkPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                }`}
              >
                {twkPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {twkPassed ? "LULUS (PG >= 65)" : "BELUM LULUS (< 65)"}
              </span>
            ) : (
              <span className="font-mono text-xs text-slate-500">
                Akurasi: {twkStats?.accuracy ?? 0}%
              </span>
            )}

            <div className="pt-3 border-t border-border-light dark:border-border-dark grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Benar</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{twkStats?.correctCount ?? 0}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Salah</span>
                <p className="font-bold text-rose-600 dark:text-rose-400">{twkStats?.wrongCount ?? 0}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Kosong</span>
                <p className="font-bold text-slate-500">{twkStats?.unansweredCount ?? 0}</p>
              </div>
            </div>
          </div>

          {/* TIU Card */}
          <div className="rounded-3xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-surface-elevated-dark shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase">Tes Intelegensia Umum</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">TIU</h3>
              </div>
              <span className="font-mono text-xs text-slate-400">Maks 175</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                {attempt.scoreTiu ?? 0}
              </span>
              <span className="font-mono text-xs text-slate-400">/ 175</span>
            </div>

            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold ${
                  tiuPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                }`}
              >
                {tiuPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {tiuPassed ? "LULUS (PG >= 80)" : "BELUM LULUS (< 80)"}
              </span>
            ) : (
              <span className="font-mono text-xs text-slate-500">
                Akurasi: {tiuStats?.accuracy ?? 0}%
              </span>
            )}

            <div className="pt-3 border-t border-border-light dark:border-border-dark grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Benar</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{tiuStats?.correctCount ?? 0}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Salah</span>
                <p className="font-bold text-rose-600 dark:text-rose-400">{tiuStats?.wrongCount ?? 0}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Kosong</span>
                <p className="font-bold text-slate-500">{tiuStats?.unansweredCount ?? 0}</p>
              </div>
            </div>
          </div>

          {/* TKP Card */}
          <div className="rounded-3xl border border-border-light bg-white p-6 dark:border-border-dark dark:bg-surface-elevated-dark shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase">Tes Karakteristik Pribadi</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">TKP</h3>
              </div>
              <span className="font-mono text-xs text-slate-400">Maks 225</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                {attempt.scoreTkp ?? 0}
              </span>
              <span className="font-mono text-xs text-slate-400">/ 225</span>
            </div>

            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold ${
                  tkpPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                }`}
              >
                {tkpPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {tkpPassed ? "LULUS (PG >= 166)" : "BELUM LULUS (< 166)"}
              </span>
            ) : (
              <span className="font-mono text-xs text-slate-500">
                Rata-rata: {tkpStats?.tkpDistribution?.averagePoints ?? 0} poin
              </span>
            )}

            <div className="pt-3 border-t border-border-light dark:border-border-dark grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Terjawab</span>
                <p className="font-bold text-cobalt-light dark:text-cobalt-dark">{tkpStats?.answeredCount ?? 0}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Kosong</span>
                <p className="font-bold text-slate-500">{tkpStats?.unansweredCount ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TKP Non-Binary Distribution Statistics (KepmenPAN-RB Compliance) */}
        {tkpStats?.tkpDistribution && (
          <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 dark:border-border-dark dark:bg-surface-elevated-dark shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-cobalt-light dark:text-cobalt-dark" />
                Statistik Distribusi Bobot Non-Biner TKP
              </h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Rata-rata: <strong>{tkpStats.tkpDistribution.averagePoints}</strong> / 5.00 poin
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pada sub-tes TKP tidak ada jawaban salah; opsi bernilai gradasi 1 hingga 5 poin. Target profil ASN ideal adalah konsistensi opsi 5 dan 4 poin.
            </p>

            <div className="grid grid-cols-5 gap-3 pt-2">
              {[5, 4, 3, 2, 1].map((pts) => {
                const count = (tkpStats.tkpDistribution as any)[pts] || 0;
                const totalTkpAnswered = tkpStats.answeredCount || 1;
                const pct = Math.round((count / totalTkpAnswered) * 100);
                return (
                  <div
                    key={pts}
                    className="rounded-2xl border border-border-light bg-slate-50 p-4 text-center dark:border-border-dark dark:bg-surface-dark transition"
                  >
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                      Poin {pts}
                    </span>
                    <p className="font-mono text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
                      {count}
                    </p>
                    <span className="font-mono text-[11px] text-slate-500">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Action Buttons Dock */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/pembahasan/${attempt.id}`}
            className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-cobalt-light dark:bg-cobalt-dark px-7 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            <span>Lihat Pembahasan Lengkap</span>
          </Link>
          <Link
            href="/riwayat"
            className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl border border-border-light bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 dark:hover:bg-surface-dark transition"
          >
            <Clock className="h-4 w-4" />
            <span>Riwayat Ujian</span>
          </Link>
          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl border border-border-light bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 dark:hover:bg-surface-dark transition"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
