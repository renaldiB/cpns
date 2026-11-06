"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flag,
  Filter,
  BookOpen,
  HelpCircle,
  Award,
  Calendar,
  Grid,
} from "lucide-react";

export default function PembahasanPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const router = useRouter();
  const { attemptId } = use(params);

  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filterMode, setFilterMode] = useState<string>("all");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/attempts/${attemptId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error);
        }
        if (!data.isCompleted) {
          router.replace(`/ujian/${attemptId}`);
          return;
        }
        setAttempt(data.attempt);
        setQuestions(data.questions);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [attemptId, router]);

  if (isLoading || !attempt) {
    return (
      <div className="flex h-screen items-center justify-center font-mono text-xs text-slate-500 bg-canvas-light dark:bg-canvas-dark">
        Memuat pembahasan lembar ujian CAT BKN...
      </div>
    );
  }

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    if (selectedSubtopic !== "all" && q.subtopic !== selectedSubtopic) {
      return false;
    }

    if (filterMode === "correct") {
      return q.category !== "TKP" && q.pointsAwarded === 5;
    }
    if (filterMode === "wrong") {
      return q.category !== "TKP" && q.selectedOptionSnapshotId !== null && q.pointsAwarded === 0;
    }
    if (filterMode === "blank") {
      return q.selectedOptionSnapshotId === null;
    }
    if (filterMode === "flagged") {
      return q.flagged === true;
    }
    if (filterMode === "tkp_high") {
      return q.category === "TKP" && q.pointsAwarded >= 4;
    }
    if (filterMode === "tkp_low") {
      return q.category === "TKP" && q.pointsAwarded <= 3 && q.selectedOptionSnapshotId !== null;
    }

    return true;
  });

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const allSubtopics = Array.from(new Set(questions.map((q) => q.subtopic)));

  return (
    <div className="min-h-screen bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-light pb-4 dark:border-border-dark">
          <div>
            <Link
              href={`/hasil/${attemptId}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Ringkasan Hasil
            </Link>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Pembahasan & Review Soal
            </h1>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {attempt.mode === "full" ? "Simulasi Penuh SKD CAT BKN" : "Latihan Kategori"} &bull; Skor:{" "}
              <strong className="text-cobalt-light dark:text-cobalt-dark">{attempt.scoreTotal}</strong>
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterMode}
              onChange={(e) => {
                setFilterMode(e.target.value);
                setCurrentIndex(0);
              }}
              className="rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-mono font-semibold text-slate-800 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 shadow-sm"
            >
              <option value="all">Semua Soal ({questions.length})</option>
              <option value="correct">Jawaban Benar</option>
              <option value="wrong">Jawaban Salah</option>
              <option value="blank">Soal Kosong</option>
              <option value="flagged">Ditandai Ragu</option>
              <option value="tkp_high">TKP Poin 4–5</option>
              <option value="tkp_low">TKP Poin 1–3</option>
            </select>

            <select
              value={selectedSubtopic}
              onChange={(e) => {
                setSelectedSubtopic(e.target.value);
                setCurrentIndex(0);
              }}
              className="rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-mono font-semibold text-slate-800 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 shadow-sm"
            >
              <option value="all">Semua Sub-materi</option>
              {allSubtopics.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border-light p-12 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark/50">
            Tidak ada butir soal yang sesuai dengan kombinasi filter yang dipilih.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Question Navigator Dock (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-border-light bg-white p-5 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark space-y-4">
              <div className="flex items-center justify-between border-b border-border-light pb-3 dark:border-border-dark">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                  <Grid className="h-4 w-4" />
                  Daftar Soal ({filteredQuestions.length})
                </h4>
                <span className="font-mono text-xs text-slate-400">Pilih nomor</span>
              </div>

              <div className="grid grid-cols-5 gap-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const isSelected = idx === currentIndex;
                  const isBlank = q.selectedOptionSnapshotId === null;
                  const isTkp = q.category === "TKP";
                  const isCorrect = !isTkp && q.pointsAwarded === 5;
                  const isWrong = !isTkp && !isBlank && q.pointsAwarded === 0;

                  let colorStyle = "border-border-light text-slate-700 bg-slate-50 dark:border-border-dark dark:bg-surface-dark dark:text-slate-300";
                  if (isCorrect) colorStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                  else if (isWrong) colorStyle = "bg-rose-600 text-white border-rose-600 font-bold";
                  else if (isTkp) colorStyle = "bg-cobalt-light dark:bg-cobalt-dark text-white border-cobalt-light font-bold";

                  return (
                    <button
                      key={q.position}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 w-full rounded-xl border font-mono text-xs transition ${colorStyle} ${
                        isSelected
                          ? "ring-2 ring-cobalt-light dark:ring-cobalt-dark ring-offset-2 dark:ring-offset-surface-elevated-dark"
                          : ""
                      }`}
                    >
                      {q.position}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="border-t border-border-light pt-3 space-y-1 font-mono text-[11px] text-slate-500 dark:border-border-dark dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
                  <span>Benar (+5 Poin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-rose-600" />
                  <span>Salah (0 Poin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-cobalt-light dark:bg-cobalt-dark" />
                  <span>TKP (Skala 1–5)</span>
                </div>
              </div>
            </div>

            {/* Question Review Body (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark space-y-6">
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light pb-4 dark:border-border-dark">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-cobalt-light/15 px-2.5 py-1 text-xs font-black uppercase text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark font-mono">
                      {activeQuestion.category}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-surface-dark dark:text-slate-300 border border-border-light dark:border-border-dark">
                      {activeQuestion.subtopic}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Tingkat Kesulitan {activeQuestion.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                      Poin Diperoleh:{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400">{activeQuestion.pointsAwarded}</strong>
                    </span>
                    {activeQuestion.flagged && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <Flag className="h-3 w-3" /> Ragu
                      </span>
                    )}
                  </div>
                </div>

                {/* Stem */}
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Soal Nomor {activeQuestion.position}
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-slate-900 dark:text-slate-100 font-medium whitespace-pre-line">
                    {activeQuestion.stem}
                  </p>
                  {activeQuestion.imagePath && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-border-light max-w-md bg-slate-50 dark:bg-surface-dark p-2">
                      <img src={`/${activeQuestion.imagePath}`} alt="Gambar Soal" className="object-contain rounded-lg" />
                    </div>
                  )}
                </div>

                {/* Options with Official Key and Points */}
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pilihan Jawaban & Bobot Nilai:
                  </div>
                  {activeQuestion.options.map((opt: any) => {
                    const isUserSelected = activeQuestion.selectedOptionSnapshotId === opt.snapshotOptionId;
                    const isCorrectKey = activeQuestion.category !== "TKP" && opt.points === 5;
                    const isTkpMax = activeQuestion.category === "TKP" && opt.points === 5;

                    let borderClass = "border-border-light bg-white dark:border-border-dark dark:bg-surface-dark";
                    if (isCorrectKey || isTkpMax) {
                      borderClass = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-700";
                    } else if (isUserSelected && !isCorrectKey && activeQuestion.category !== "TKP") {
                      borderClass = "border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 dark:border-rose-800";
                    }

                    return (
                      <div
                        key={opt.snapshotOptionId}
                        className={`flex items-start justify-between gap-4 rounded-2xl border p-4 text-xs transition ${borderClass}`}
                      >
                        <div className="flex items-start gap-3.5 flex-1">
                          <span
                            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl font-mono font-bold text-xs ${
                              isUserSelected
                                ? "bg-cobalt-light text-white dark:bg-cobalt-dark shadow-sm"
                                : "bg-slate-100 text-slate-700 dark:bg-surface-elevated-dark dark:text-slate-300"
                            }`}
                          >
                            {opt.visualLabel}
                          </span>
                          <div className="space-y-1.5 flex-1 pt-0.5">
                            <p className="text-slate-900 dark:text-slate-100 text-sm leading-relaxed font-medium">
                              {opt.text}
                            </p>
                            <div className="flex items-center gap-2 font-mono text-[11px]">
                              {isUserSelected && (
                                <span className="font-bold text-cobalt-light dark:text-cobalt-dark">
                                  (Pilihan Anda)
                                </span>
                              )}
                              {isCorrectKey && (
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                  &bull; Kunci Jawaban Resmi BKN
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Points Badge */}
                        <span
                          className={`rounded-xl px-2.5 py-1 font-mono font-bold text-xs shrink-0 ${
                            opt.points === 5
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : opt.points > 0
                              ? "bg-cobalt-light/15 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark"
                              : "bg-slate-100 text-slate-500 dark:bg-surface-elevated-dark dark:text-slate-400"
                          }`}
                        >
                          {opt.points} Poin
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                <div className="rounded-2xl border border-cobalt-light/30 bg-cobalt-light/5 p-5 dark:border-cobalt-dark/30 dark:bg-cobalt-dark/10 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-cobalt-light dark:text-cobalt-dark">
                    <BookOpen className="h-4 w-4" />
                    <span>Pembahasan Detail</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line font-normal">
                    {activeQuestion.explanation}
                  </p>
                  {activeQuestion.sourceReference && (
                    <p className="font-mono text-[11px] text-slate-500 pt-2 border-t border-cobalt-light/20 dark:border-cobalt-dark/20">
                      Sumber: {activeQuestion.sourceReference}
                    </p>
                  )}
                </div>

                {/* Prev / Next Review Button */}
                <div className="flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 rounded-xl border border-border-light px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-dark transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Sebelumnya
                  </button>
                  <span className="font-mono text-xs text-slate-500">
                    {currentIndex + 1} dari {filteredQuestions.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                    disabled={currentIndex === filteredQuestions.length - 1}
                    className="flex items-center gap-1.5 rounded-xl bg-cobalt-light dark:bg-cobalt-dark px-4 py-2 text-xs font-bold text-white hover:opacity-90 disabled:opacity-40 transition"
                  >
                    Berikutnya
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
