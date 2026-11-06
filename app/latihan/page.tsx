"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, SUBTOPICS, CategoryId, getSubtopicsByCategory } from "@/config/subtopics";
import { BookOpen, Play, ArrowLeft, Check, Sliders, Timer, Lightbulb, Layers } from "lucide-react";
import Link from "next/link";

function LatihanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("TWK");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<number>(0); // 0 = all
  const [enableTimer, setEnableTimer] = useState<boolean>(true);
  const [batches, setBatches] = useState<Array<{ batchNumber: number; name: string; totalQuestions: number }>>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBatches(data.batches);
        }
      })
      .catch(() => {});

    const catParam = searchParams.get("category") as CategoryId | null;
    const subParam = searchParams.get("subtopic");
    const batchParam = searchParams.get("batch");

    if (catParam && ["TWK", "TIU", "TKP"].includes(catParam)) {
      setSelectedCategory(catParam);
      if (subParam) {
        setSelectedSubtopics([subParam]);
      }
    }

    if (batchParam) {
      setSelectedBatch(parseInt(batchParam));
    }
  }, [searchParams]);

  const availableSubtopics = getSubtopicsByCategory(selectedCategory);

  const toggleSubtopic = (id: string) => {
    if (selectedSubtopics.includes(id)) {
      setSelectedSubtopics(selectedSubtopics.filter((s) => s !== id));
    } else {
      setSelectedSubtopics([...selectedSubtopics, id]);
    }
  };

  const selectAllSubtopics = () => {
    if (selectedSubtopics.length === availableSubtopics.length) {
      setSelectedSubtopics([]);
    } else {
      setSelectedSubtopics(availableSubtopics.map((s) => s.id));
    }
  };

  const handleStartPractice = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "practice",
          categoryFilter: selectedCategory,
          batchFilter: selectedBatch,
          subtopicsFilter: selectedSubtopics.length > 0 ? selectedSubtopics : undefined,
          difficulty: difficulty > 0 ? difficulty : undefined,
          questionCount,
          enableTimer,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal memulai latihan");
      }
      router.push(`/ujian/${data.attemptId}`);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Beranda
      </Link>

      <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 text-xs font-bold font-mono">
            DRILL ADAPTIF MANDIRI
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Konfigurasi Latihan Kategori
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-on-surface-variant leading-relaxed">
            Pilih materi dan atur sesi latihan mandiri sesuai kebutuhan belajar Anda.
          </p>
        </div>

        {/* Step 1: Category Picker */}
        <div className="space-y-3">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-outline">
            1. Pilih Kategori Utama
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["TWK", "TIU", "TKP"] as CategoryId[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubtopics([]);
                  }}
                  className={`rounded-2xl border p-4 text-center transition ${
                    isSelected
                      ? "border-cobalt-light bg-blue-50/70 text-blue-900 shadow-sm ring-2 ring-cobalt-light/20 dark:bg-cobalt-dark/20 dark:text-white dark:border-cobalt-dark"
                      : "border-border-light text-slate-700 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-container"
                  }`}
                >
                  <span className="block text-lg font-black font-mono">{cat}</span>
                  <span className="text-[11px] text-slate-500 dark:text-on-surface-variant line-clamp-1 mt-0.5">
                    {CATEGORIES[cat].name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Batch Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-outline flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-cobalt-light dark:text-primary" />
            <span>2. Sumber Paket / Batch Soal</span>
          </label>
          <select
            value={selectedBatch ?? ""}
            onChange={(e) => setSelectedBatch(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:text-on-surface"
          >
            <option value="">Semua Paket Batch (Gabungan Seluruh Soal)</option>
            {batches.map((b) => (
              <option key={b.batchNumber} value={b.batchNumber}>
                Batch #{b.batchNumber}: {b.name} ({b.totalQuestions} Soal)
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Subtopic Picker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-outline">
              3. Pilih Sub-Materi (Multi-Select)
            </label>
            <button
              type="button"
              onClick={selectAllSubtopics}
              className="text-xs font-bold text-cobalt-light hover:underline dark:text-primary"
            >
              {selectedSubtopics.length === availableSubtopics.length ? "Batal Pilih Semua" : "Pilih Semua Sub-materi"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {availableSubtopics.map((sub) => {
              const isChecked = selectedSubtopics.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => toggleSubtopic(sub.id)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs transition ${
                    isChecked
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-600"
                      : "border-border-light text-slate-700 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-container"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                      isChecked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <span className="font-medium truncate">{sub.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {selectedSubtopics.length === 0
              ? "Semua sub-materi dalam kategori akan diacak."
              : `${selectedSubtopics.length} sub-materi dipilih.`}
          </p>
        </div>

        {/* Step 4: Question Count & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-outline">
              4. Jumlah Soal
            </label>
            <div className="flex items-center gap-2">
              {[5, 10, 15, 20, 30].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 rounded-xl border py-2 text-xs font-bold font-mono transition ${
                    questionCount === num
                      ? "border-cobalt-light bg-cobalt-light dark:bg-cobalt-dark text-white"
                      : "border-border-light text-slate-700 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-container"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-outline">
              5. Tingkat Kesulitan
            </label>
            <div className="flex items-center gap-2">
              {[
                { val: 0, label: "Semua" },
                { val: 1, label: "Mudah" },
                { val: 2, label: "Sedang" },
                { val: 3, label: "Sulit" },
              ].map((diff) => (
                <button
                  key={diff.val}
                  type="button"
                  onClick={() => setDifficulty(diff.val)}
                  className={`flex-1 rounded-xl border py-2 text-xs font-bold transition ${
                    difficulty === diff.val
                      ? "border-cobalt-light bg-cobalt-light dark:bg-cobalt-dark text-white"
                      : "border-border-light text-slate-700 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-container"
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 5: Timer Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-border-light bg-slate-50 p-4 dark:border-border-dark dark:bg-surface-container">
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 text-slate-600 dark:text-on-surface-variant" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Gunakan Batas Waktu (Timer)</p>
              <p className="text-[11px] text-slate-500 dark:text-outline">
                {enableTimer
                  ? `Alokasi waktu: ${questionCount} menit (1 menit per soal)`
                  : "Mode santai tanpa batas waktu"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnableTimer(!enableTimer)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enableTimer ? "bg-cobalt-light dark:bg-cobalt-dark" : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enableTimer ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
            {error}
          </div>
        )}

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={handleStartPractice}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 active:scale-95 transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>Menyiapkan Latihan...</span>
            ) : (
              <>
                <Play className="h-5 w-5 fill-white" />
                Mulai Latihan {selectedCategory} ({questionCount} Soal)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LatihanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-slate-400">Memuat konfigurasi latihan...</div>}>
      <LatihanForm />
    </Suspense>
  );
}
