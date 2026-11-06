"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { ClientSanitizedQuestion, ClientSanitizedOption } from "@/lib/exam/snapshot";
import { formatSeconds } from "@/lib/exam/timer";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  RefreshCw,
  LogOut,
  HelpCircle,
  Check,
  Grid,
} from "lucide-react";

export default function UjianPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const router = useRouter();
  const { attemptId } = use(params);

  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<ClientSanitizedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("saved");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Initial Load of Attempt
  useEffect(() => {
    fetch(`/api/attempts/${attemptId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error || "Gagal memuat sesi ujian.");
        }
        if (data.isCompleted) {
          router.replace(`/hasil/${attemptId}`);
          return;
        }

        setAttempt(data.attempt);
        setQuestions(data.questions);

        if (data.attempt.deadlineAt) {
          const deadline = new Date(data.attempt.deadlineAt).getTime();
          const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
          setRemainingSeconds(diff);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, [attemptId, router]);

  // 2. Timer Countdown Effect
  useEffect(() => {
    if (!attempt?.deadlineAt || remainingSeconds <= 0 || isLoading) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoFinalize();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [attempt?.deadlineAt, remainingSeconds, isLoading]);

  // Auto finalize on time expiration
  const handleAutoFinalize = useCallback(async () => {
    setIsFinalizing(true);
    try {
      await fetch(`/api/attempts/${attemptId}/finalize`, { method: "POST" });
      router.replace(`/hasil/${attemptId}`);
    } catch {
      router.replace(`/hasil/${attemptId}`);
    }
  }, [attemptId, router]);

  // 3. Autosave Answer
  const handleSelectOption = async (snapshotOptionId: string) => {
    const activeQ = questions[currentIndex];
    if (!activeQ) return;

    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === currentIndex ? { ...q, selectedOptionSnapshotId: snapshotOptionId } : q
      )
    );
    setSaveStatus("saving");

    try {
      const res = await fetch(`/api/attempts/${attemptId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: activeQ.position,
          selectedOptionSnapshotId: snapshotOptionId,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Penyimpanan gagal");
      }
      if (data.status === "expired") {
        router.replace(`/hasil/${attemptId}`);
        return;
      }
      setSaveStatus("saved");
    } catch (err) {
      setSaveStatus("error");
    }
  };

  // Clear answer
  const handleClearOption = async () => {
    const activeQ = questions[currentIndex];
    if (!activeQ || !activeQ.selectedOptionSnapshotId) return;

    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === currentIndex ? { ...q, selectedOptionSnapshotId: null } : q
      )
    );
    setSaveStatus("saving");

    try {
      const res = await fetch(`/api/attempts/${attemptId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: activeQ.position,
          selectedOptionSnapshotId: null,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal menghapus jawaban");
      }
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  // 4. Toggle Flag (Ragu-ragu)
  const handleToggleFlag = async () => {
    const activeQ = questions[currentIndex];
    if (!activeQ) return;

    const nextFlag = !activeQ.flagged;
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === currentIndex ? { ...q, flagged: nextFlag } : q))
    );

    try {
      await fetch(`/api/attempts/${attemptId}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: activeQ.position,
          flagged: nextFlag,
        }),
      });
    } catch {}
  };

  // 5. Finalize Exam Action
  const handleManualFinalize = async () => {
    setIsFinalizing(true);
    try {
      const res = await fetch(`/api/attempts/${attemptId}/finalize`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        router.replace(`/hasil/${attemptId}`);
      } else {
        throw new Error(data.error || "Gagal mengakhiri ujian");
      }
    } catch (err: any) {
      alert("Terjadi kesalahan saat mengakhiri ujian: " + err.message);
      setIsFinalizing(false);
    }
  };

  // 6. Keyboard Shortcuts Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === "ArrowLeft") {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
      } else if (e.key === "ArrowRight") {
        if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
      } else if (e.key.toLowerCase() === "r") {
        handleToggleFlag();
      } else if (e.key === "Escape") {
        setShowDrawer(false);
        setShowFinishModal(false);
      } else {
        const keyUpper = e.key.toUpperCase();
        if (["A", "B", "C", "D", "E"].includes(keyUpper)) {
          const activeQ = questions[currentIndex];
          if (activeQ) {
            const matchedOpt = activeQ.options.find((o) => o.visualLabel === keyUpper);
            if (matchedOpt) {
              handleSelectOption(matchedOpt.snapshotOptionId);
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, questions]);

  // Loading and Error States
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-canvas-light text-slate-800 dark:bg-canvas-dark dark:text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-cobalt-light dark:text-cobalt-dark" />
          <p className="text-sm font-semibold tracking-wide font-mono">Memuat Lembar Ujian CAT BKN...</p>
        </div>
      </div>
    );
  }

  if (errorMessage || !attempt) {
    return (
      <div className="flex h-screen items-center justify-center p-4 bg-canvas-light dark:bg-canvas-dark">
        <div className="max-w-md rounded-3xl border border-rose-200 bg-rose-50/90 p-6 text-center text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 space-y-3 shadow-xl">
          <AlertTriangle className="mx-auto h-8 w-8 text-rose-600 dark:text-rose-400" />
          <h2 className="text-lg font-bold">Terjadi Kesalahan</h2>
          <p className="text-xs">{errorMessage || "Sesi ujian tidak valid."}</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const activeQuestion = questions[currentIndex];
  const totalCount = questions.length;
  const answeredCount = questions.filter((q) => q.selectedOptionSnapshotId !== null).length;
  const flaggedCount = questions.filter((q) => q.flagged).length;
  const unansweredCount = totalCount - answeredCount;

  // Timer warning levels
  const isTimerWarning = remainingSeconds <= 600 && remainingSeconds > 300;
  const isTimerCritical = remainingSeconds <= 300 && remainingSeconds > 0;

  // Sub-pillar index ranges
  const isTWK = activeQuestion.category === "TWK";
  const isTIU = activeQuestion.category === "TIU";
  const isTKP = activeQuestion.category === "TKP";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 select-none">
      {/* Top Floating Exam HUD */}
      <header className="sticky top-0 z-30 flex h-16 sm:h-20 flex-shrink-0 items-center justify-between border-b border-border-light bg-white/90 px-4 sm:px-8 backdrop-blur-md dark:border-border-dark dark:bg-surface-elevated-dark/95 shadow-md">
        {/* Left: Metadata */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cobalt-light text-white font-black text-xs shadow-sm">
            CAT
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-xs">
                {attempt.mode === "full" ? "SIMULASI PENUH SKD" : "LATIHAN KATEGORI"}
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 dark:bg-surface-dark dark:text-slate-300 border border-border-light dark:border-border-dark">
                {activeQuestion.category}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Soal {currentIndex + 1} / {totalCount}
            </span>
          </div>
        </div>

        {/* Center: Digital Timer */}
        {attempt.deadlineAt ? (
          <div
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 font-mono text-sm sm:text-base font-black tracking-wider transition-all shadow-sm ${
              isTimerCritical
                ? "animate-pulse bg-rose-600 text-white shadow-rose-500/30"
                : isTimerWarning
                ? "bg-amber-500 text-slate-950 font-extrabold"
                : "bg-slate-100 text-slate-800 dark:bg-surface-dark dark:text-white border border-border-light dark:border-border-dark"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span className="tabular-nums">{formatSeconds(remainingSeconds)}</span>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-500 dark:bg-surface-dark dark:text-slate-400 border border-border-light dark:border-border-dark">
            Tanpa Batas Waktu
          </div>
        )}

        {/* Right: Autosave status & Finish button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            {saveStatus === "saving" && (
              <span className="flex items-center gap-1 text-cobalt-light dark:text-cobalt-dark">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Simpan...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Tersimpan
              </span>
            )}
            {saveStatus === "error" && (
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Gagal Simpan
              </span>
            )}
          </div>

          {/* Selesai Button */}
          <button
            onClick={() => setShowFinishModal(true)}
            data-testid="finish-exam-btn"
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow hover:bg-rose-700 transition active:scale-95"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Akhiri Ujian</span>
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setShowDrawer(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-light text-slate-700 md:hidden dark:border-border-dark dark:text-slate-300 bg-white dark:bg-surface-elevated-dark"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Container: Question Canvas + Right Tactical Dock */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left/Center: Question Canvas */}
        <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Category & Scoring Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-light pb-3 dark:border-border-dark">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide ${
                      isTWK
                        ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                        : isTIU
                        ? "bg-cobalt-light/15 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    }`}
                  >
                    {activeQuestion.category} • {activeQuestion.subtopic}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {isTKP ? (
                    <span className="text-emerald-600 dark:text-emerald-400">Skala Bobot 1–5 Poin</span>
                  ) : (
                    <>
                      <span className="text-emerald-600 dark:text-emerald-400">Benar: +5</span>
                      <span>|</span>
                      <span>Salah: 0</span>
                    </>
                  )}
                </div>
              </div>

              {/* Question Presentation Surface */}
              <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark">
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Petunjuk Soal No. {activeQuestion.position}
                </div>
                <p className="text-base sm:text-lg leading-relaxed font-medium text-slate-900 dark:text-slate-100 whitespace-pre-line">
                  {activeQuestion.stem}
                </p>

                {/* Question Image (if any) */}
                {activeQuestion.imagePath && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-border-light dark:border-border-dark max-w-lg bg-slate-50 dark:bg-surface-dark p-2">
                    <img
                      src={`/${activeQuestion.imagePath}`}
                      alt="Gambar Soal"
                      className="max-h-80 w-auto object-contain mx-auto rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Tactile Options A-E */}
              <div className="space-y-3">
                {activeQuestion.options.map((opt: ClientSanitizedOption) => {
                  const isSelected = activeQuestion.selectedOptionSnapshotId === opt.snapshotOptionId;
                  return (
                    <button
                      key={opt.snapshotOptionId}
                      type="button"
                      data-testid={`option-${opt.visualLabel}`}
                      onClick={() => handleSelectOption(opt.snapshotOptionId)}
                      className={`group flex w-full items-start gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                        isSelected
                          ? "border-cobalt-light bg-cobalt-light/10 shadow-sm ring-2 ring-cobalt-light/30 dark:border-cobalt-dark dark:bg-cobalt-dark/15 dark:ring-cobalt-dark/40"
                          : "border-border-light bg-white hover:border-slate-300 hover:bg-slate-50/70 dark:border-border-dark dark:bg-surface-elevated-dark dark:hover:border-slate-700 dark:hover:bg-surface-dark/80"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                          isSelected
                            ? "bg-cobalt-light text-white shadow-sm dark:bg-cobalt-dark"
                            : "bg-slate-100 text-slate-700 group-hover:bg-slate-200 dark:bg-surface-dark dark:text-slate-300"
                        }`}
                      >
                        {opt.visualLabel}
                      </div>
                      <span className="flex-1 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 pt-0.5">
                        {opt.text}
                      </span>
                      {isSelected && (
                        <div className="text-cobalt-light dark:text-cobalt-dark pt-1 self-center">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Option Utility Footnote */}
              <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-mono pt-1">
                <span>Pilih via klik atau tekan tombol keyboard [A] - [E]</span>
                {activeQuestion.selectedOptionSnapshotId && (
                  <button
                    type="button"
                    onClick={handleClearOption}
                    className="hover:text-rose-600 dark:hover:text-rose-400 underline transition-colors"
                  >
                    Kosongkan Pilihan
                  </button>
                )}
              </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border-light bg-white/95 p-3 sm:p-4 backdrop-blur-md shadow-lg dark:border-border-dark dark:bg-surface-elevated-dark/95">
              <button
                type="button"
                aria-label="Sebelumnya"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 dark:border-border-dark dark:bg-surface-dark dark:text-slate-200 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              <button
                type="button"
                aria-label="Tandai Ragu"
                onClick={handleToggleFlag}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm transition ${
                  activeQuestion.flagged
                    ? "bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400"
                    : "border border-amber-300/80 bg-amber-50/70 text-amber-900 hover:bg-amber-100 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300"
                }`}
              >
                <Flag className={`h-4 w-4 ${activeQuestion.flagged ? "fill-slate-950" : ""}`} />
                <span>{activeQuestion.flagged ? "Ditandai Ragu" : "Tandai Ragu"}</span>
              </button>

              <button
                type="button"
                aria-label="Berikutnya"
                onClick={() => setCurrentIndex((prev) => Math.min(totalCount - 1, prev + 1))}
                disabled={currentIndex === totalCount - 1}
                className="flex items-center gap-2 rounded-xl bg-cobalt-light dark:bg-cobalt-dark px-5 py-2.5 text-xs font-bold text-white shadow hover:opacity-90 disabled:opacity-40 transition"
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Desktop Question Navigator Panel */}
        <aside className="hidden lg:flex w-84 flex-shrink-0 flex-col border-l border-border-light bg-white dark:border-border-dark dark:bg-surface-elevated-dark">
          <div className="border-b border-border-light p-4 dark:border-border-dark">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Grid className="h-4 w-4" />
                Navigasi Soal
              </h3>
              <span className="font-mono text-xs text-slate-400">Total {totalCount}</span>
            </div>

            {/* Quick Stats Pill */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-emerald-50 p-2 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60">
                <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">Terjawab</span>
                <p className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">{answeredCount}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-2 dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Kosong</span>
                <p className="font-mono text-sm font-black text-slate-700 dark:text-slate-300">{unansweredCount}</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-2 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60">
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">Ragu</span>
                <p className="font-mono text-sm font-black text-amber-500">{flaggedCount}</p>
              </div>
            </div>
          </div>

          {/* 110-Question Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = q.selectedOptionSnapshotId !== null;
                const isFlagged = q.flagged;

                let btnStyle = "border-border-light text-slate-700 bg-white hover:bg-slate-50 dark:border-border-dark dark:bg-surface-dark dark:text-slate-300";
                if (isAnswered && !isFlagged) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold dark:bg-emerald-600";
                } else if (isFlagged) {
                  btnStyle = "bg-amber-500 text-slate-950 border-amber-500 font-black";
                }

                return (
                  <button
                    key={q.position}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex h-10 w-full items-center justify-center rounded-xl border font-mono text-xs font-semibold transition ${btnStyle} ${
                      isCurrent
                        ? "ring-2 ring-cobalt-light dark:ring-cobalt-dark ring-offset-2 dark:ring-offset-surface-elevated-dark"
                        : ""
                    }`}
                  >
                    <span>{q.position}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 ring-1 ring-white dark:ring-surface-dark" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t border-border-light p-3.5 text-xs text-slate-500 dark:border-border-dark dark:text-slate-400 space-y-1.5 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-emerald-600" />
              <span>Sudah dijawab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-amber-500" />
              <span>Ragu-ragu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md border border-border-light bg-white dark:border-border-dark dark:bg-surface-dark" />
              <span>Belum dijawab</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setShowDrawer(false)}
          />
          <div className="relative ml-auto flex h-full w-4/5 max-w-xs flex-col bg-white shadow-2xl dark:bg-surface-elevated-dark">
            <div className="flex items-center justify-between border-b border-border-light p-4 dark:border-border-dark">
              <h3 className="font-bold text-sm">Daftar Nomor Soal</h3>
              <button onClick={() => setShowDrawer(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-4 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = q.selectedOptionSnapshotId !== null;
                  const isFlagged = q.flagged;

                  let btnStyle = "border-border-light text-slate-700 bg-white dark:border-border-dark dark:bg-surface-dark dark:text-slate-300";
                  if (isAnswered && !isFlagged) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isFlagged) {
                    btnStyle = "bg-amber-500 text-slate-950 border-amber-500 font-bold";
                  }

                  return (
                    <button
                      key={q.position}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowDrawer(false);
                      }}
                      className={`flex h-11 w-full items-center justify-center rounded-xl border font-mono text-xs font-bold transition ${btnStyle} ${
                        isCurrent ? "ring-2 ring-cobalt-light dark:ring-cobalt-dark ring-offset-1" : ""
                      }`}
                    >
                      {q.position}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Finish Confirmation Modal (Nordic Precision Bento) */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-2xl dark:border-border-dark dark:bg-surface-elevated-dark space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Top Accent Warning Glow */}
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-500/15 p-3 text-amber-500 dark:bg-amber-500/20 shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                  Konfirmasi Pengakhiran Ujian
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Apakah Anda yakin ingin menyelesaikan ujian?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Setelah diakhiri, jawaban Anda akan langsung dinilai sesuai standar KepmenPANRB No. 321/2024.
                </p>
              </div>
            </div>

            {/* Audit Summary 3-Column Bento Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-3.5 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                  Terisi Pasti
                </span>
                <p className="font-mono text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {answeredCount}
                </p>
                <span className="text-[10px] text-slate-400">/ {totalCount} Soal</span>
              </div>
              <div className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-3.5 text-center dark:border-amber-900/60 dark:bg-amber-950/40">
                <span className="font-mono text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">
                  Ragu-Ragu
                </span>
                <p className="font-mono text-2xl font-black text-amber-500 mt-0.5">
                  {flaggedCount}
                </p>
                <span className="text-[10px] text-slate-400">Soal Ditandai</span>
              </div>
              <div className="rounded-2xl border border-rose-200/60 bg-rose-50/70 p-3.5 text-center dark:border-rose-900/60 dark:bg-rose-950/40">
                <span className="font-mono text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300">
                  Belum Dijawab
                </span>
                <p className="font-mono text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                  {unansweredCount}
                </p>
                <span className="text-[10px] text-slate-400">Soal Kosong</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="rounded-2xl bg-rose-50 p-3.5 border border-rose-200 text-xs text-rose-800 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300">
                <strong>Perhatian:</strong> Masih terdapat <strong>{unansweredCount} butir soal</strong> yang belum dijawab. Pada CAT BKN SKD tidak ada pengurangan nilai untuk jawaban salah.
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 rounded-2xl border border-border-light py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-dark transition"
              >
                Kembali Mengerjakan
              </button>
              <button
                type="button"
                onClick={handleManualFinalize}
                disabled={isFinalizing}
                className="flex-1 rounded-2xl bg-rose-600 py-3 text-xs font-bold text-white shadow-md hover:bg-rose-700 disabled:opacity-50 transition active:scale-95"
              >
                {isFinalizing ? "Memproses Nilai..." : "Ya, Akhiri Ujian"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
