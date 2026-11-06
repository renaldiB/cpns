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
      <div className="flex h-screen items-center justify-center text-xs text-slate-500">
        Memuat pembahasan soal dari snapshot...
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <Link
            href={`/hasil/${attemptId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Ringkasan Hasil
          </Link>
          <h1 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            Pembahasan & Review Soal
          </h1>
          <p className="text-xs text-slate-500">
            {attempt.mode === "full" ? "Simulasi Penuh SKD" : "Latihan Kategori"} &bull; Total Skor: {attempt.scoreTotal}
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
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
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
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
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
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-500 dark:border-slate-800">
          Tidak ada soal yang cocok dengan filter yang dipilih.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Question Navigator Mini-Grid */}
          <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-fit max-h-[500px] overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Daftar Soal ({filteredQuestions.length})
            </h4>
            <div className="grid grid-cols-4 gap-1.5">
              {filteredQuestions.map((q, idx) => {
                const isSelected = idx === currentIndex;
                const isBlank = q.selectedOptionSnapshotId === null;
                const isTkp = q.category === "TKP";
                const isCorrect = !isTkp && q.pointsAwarded === 5;
                const isWrong = !isTkp && !isBlank && q.pointsAwarded === 0;

                let colorStyle = "border-slate-200 text-slate-700 bg-slate-50 dark:border-slate-800 dark:bg-slate-800";
                if (isCorrect) colorStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                else if (isWrong) colorStyle = "bg-rose-600 text-white border-rose-600 font-bold";
                else if (isTkp) colorStyle = "bg-blue-600 text-white border-blue-600 font-bold";

                return (
                  <button
                    key={q.position}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 w-full rounded-lg border text-xs transition ${colorStyle} ${
                      isSelected ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900" : ""
                    }`}
                  >
                    {q.position}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Review Body */}
          <div className="md:col-span-3 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-black uppercase text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {activeQuestion.category}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {activeQuestion.subtopic}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Tingkat {activeQuestion.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Poin Diperoleh: <strong>{activeQuestion.pointsAwarded}</strong>
                  </span>
                  {activeQuestion.flagged && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      <Flag className="h-3 w-3" /> Ragu
                    </span>
                  )}
                </div>
              </div>

              {/* Stem */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Soal Nomor {activeQuestion.position}
                </h3>
                <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium whitespace-pre-line">
                  {activeQuestion.stem}
                </p>
                {activeQuestion.imagePath && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 max-w-sm">
                    <img src={`/${activeQuestion.imagePath}`} alt="Gambar Soal" className="object-contain" />
                  </div>
                )}
              </div>

              {/* Options with Answer Key & Points Breakdown */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pilihan Jawaban & Bobot Nilai:
                </h4>
                {activeQuestion.options.map((opt: any) => {
                  const isUserSelected = activeQuestion.selectedOptionSnapshotId === opt.snapshotOptionId;
                  const isCorrectKey = activeQuestion.category !== "TKP" && opt.points === 5;
                  const isTkpMax = activeQuestion.category === "TKP" && opt.points === 5;

                  let borderClass = "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";
                  if (isCorrectKey || isTkpMax) {
                    borderClass = "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 dark:border-emerald-700";
                  } else if (isUserSelected && !isCorrectKey && activeQuestion.category !== "TKP") {
                    borderClass = "border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 dark:border-rose-800";
                  }

                  return (
                    <div
                      key={opt.snapshotOptionId}
                      className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 text-xs transition ${borderClass}`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <span
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded font-bold text-xs ${
                            isUserSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {opt.visualLabel}
                        </span>
                        <div className="space-y-1 flex-1">
                          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            {opt.text}
                          </p>
                          <div className="flex items-center gap-2 text-[10px]">
                            {isUserSelected && (
                              <span className="font-bold text-blue-700 dark:text-blue-400">
                                (Pilihan Anda)
                              </span>
                            )}
                            {isCorrectKey && (
                              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                &bull; Kunci Jawaban Benar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Points Badge */}
                      <span
                        className={`rounded-md px-2 py-1 font-bold text-xs ${
                          opt.points === 5
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : opt.points > 0
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {opt.points} Poin
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* In-depth Explanation Card */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-900/60 dark:bg-blue-950/40 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900 dark:text-blue-300">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Pembahasan Detail
                </div>
                <p className="text-xs leading-relaxed text-blue-950 dark:text-blue-100 whitespace-pre-line font-normal">
                  {activeQuestion.explanation}
                </p>
                {activeQuestion.sourceReference && (
                  <p className="text-[10px] text-blue-800/80 dark:text-blue-300/80 pt-1 border-t border-blue-200/60 dark:border-blue-900/40">
                    Referensi: {activeQuestion.sourceReference}
                  </p>
                )}
              </div>

              {/* Prev / Next Review Button */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Sebelumnya
                </button>
                <span className="text-xs text-slate-500">
                  {currentIndex + 1} dari {filteredQuestions.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-800 disabled:opacity-40"
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
  );
}
