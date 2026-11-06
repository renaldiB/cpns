import Link from "next/link";
import { notFound } from "next/navigation";
import { getAttemptDetail } from "@/lib/exam/lifecycle";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
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
  PieChart,
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Disclaimer */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
        <div>
          <p className="font-bold">Status Referensi Profil Ujian</p>
          <p className="mt-0.5 leading-relaxed text-blue-800 dark:text-blue-300">
            {EXAM_CONFIG.disclaimerText}
          </p>
        </div>
      </div>

      {/* Main Result Hero Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div
          className={`p-8 text-center sm:p-10 ${
            isFullSimulation
              ? overallPassed
                ? "bg-gradient-to-b from-emerald-500/15 to-transparent"
                : "bg-gradient-to-b from-rose-500/15 to-transparent"
              : "bg-gradient-to-b from-blue-500/15 to-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-slate-800">
            {isFullSimulation ? (
              overallPassed ? (
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              ) : (
                <XCircle className="h-10 w-10 text-rose-600" />
              )
            ) : (
              <Award className="h-10 w-10 text-blue-600" />
            )}
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {isFullSimulation
              ? overallPassed
                ? "SELAMAT! ANDA LULUS PASSING GRADE"
                : "BELUM MEMENUHI PASSING GRADE"
              : "HASIL SESI LATIHAN"}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {isFullSimulation
              ? "Berdasarkan acuan KepmenPANRB No. 321/2024 (TWK >= 65, TIU >= 80, TKP >= 166)"
              : `Sesi latihan mandiri selesai &bull; Waktu terpakai: ${durationSpentStr}`}
          </p>

          {/* Big Score Display */}
          <div className="mt-6 inline-flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Skor SKD
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {attempt.scoreTotal ?? 0}
              </span>
              <span className="text-sm font-bold text-slate-400">
                / {isFullSimulation ? 550 : summary?.maxTotal ?? "-"}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span>Durasi: {durationSpentStr}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Grid */}
        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-y-0 sm:divide-x border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
          {/* TWK Card */}
          <div className="p-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-slate-500">
              <span>TWK</span>
              <span className="text-[10px] text-slate-400">(Maks 150)</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {attempt.scoreTwk ?? 0}
            </p>
            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  twkPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {twkPassed ? "Lulus (PG >= 65)" : "Tidak Lulus (< 65)"}
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                Akurasi: {twkStats?.accuracy ?? 0}%
              </span>
            )}
            <div className="text-[11px] text-slate-400 pt-1">
              Benar: {twkStats?.correctCount ?? 0} &bull; Salah: {twkStats?.wrongCount ?? 0} &bull; Kosong: {twkStats?.unansweredCount ?? 0}
            </div>
          </div>

          {/* TIU Card */}
          <div className="p-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-slate-500">
              <span>TIU</span>
              <span className="text-[10px] text-slate-400">(Maks 175)</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {attempt.scoreTiu ?? 0}
            </p>
            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  tiuPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {tiuPassed ? "Lulus (PG >= 80)" : "Tidak Lulus (< 80)"}
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                Akurasi: {tiuStats?.accuracy ?? 0}%
              </span>
            )}
            <div className="text-[11px] text-slate-400 pt-1">
              Benar: {tiuStats?.correctCount ?? 0} &bull; Salah: {tiuStats?.wrongCount ?? 0} &bull; Kosong: {tiuStats?.unansweredCount ?? 0}
            </div>
          </div>

          {/* TKP Card */}
          <div className="p-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-slate-500">
              <span>TKP</span>
              <span className="text-[10px] text-slate-400">(Maks 225)</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {attempt.scoreTkp ?? 0}
            </p>
            {isFullSimulation ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  tkpPassed
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {tkpPassed ? "Lulus (PG >= 166)" : "Tidak Lulus (< 166)"}
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                Rata-rata: {tkpStats?.tkpDistribution?.averagePoints ?? 0} poin
              </span>
            )}
            <div className="text-[11px] text-slate-400 pt-1">
              Terjawab: {tkpStats?.answeredCount ?? 0} &bull; Kosong: {tkpStats?.unansweredCount ?? 0}
            </div>
          </div>
        </div>

        {/* TKP Distribution Statistics (Required Section 3.5 & 12.4) */}
        {tkpStats?.tkpDistribution && (
          <div className="border-t border-slate-100 p-6 sm:p-8 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-blue-600" />
              Statistik Distribusi Pilihan TKP (Non-Biner)
            </h3>
            <p className="text-xs text-slate-500">
              TKP dinilai berdasarkan skala bobot 1–5 poin. Rata-rata perolehan Anda adalah{" "}
              <strong>{tkpStats.tkpDistribution.averagePoints}</strong> dari 5.00 poin maksimal per soal.
            </p>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {[5, 4, 3, 2, 1].map((pts) => {
                const count = (tkpStats.tkpDistribution as any)[pts] || 0;
                const totalTkpAnswered = tkpStats.answeredCount || 1;
                const pct = Math.round((count / totalTkpAnswered) * 100);
                return (
                  <div
                    key={pts}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Poin {pts}
                    </span>
                    <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {count}
                    </p>
                    <span className="text-[10px] text-slate-500">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href={`/pembahasan/${attempt.id}`}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow hover:bg-blue-800 transition"
        >
          <BookOpen className="h-4 w-4" />
          Lihat Pembahasan Lengkap
        </Link>
        <Link
          href="/riwayat"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
        >
          <Clock className="h-4 w-4" />
          Lihat Riwayat Ujian
        </Link>
        <Link
          href="/"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
