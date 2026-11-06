"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, SUBTOPICS, CategoryId, getSubtopicsByCategory } from "@/config/subtopics";
import { BookOpen, Play, ArrowLeft, Check, Sliders, Timer, Lightbulb } from "lucide-react";
import Link from "next/link";

function LatihanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("TWK");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<number>(0); // 0 = all
  const [enableTimer, setEnableTimer] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const catParam = searchParams.get("category") as CategoryId | null;
    const subParam = searchParams.get("subtopic");

    if (catParam && ["TWK", "TIU", "TKP"].includes(catParam)) {
      setSelectedCategory(catParam);
      if (subParam) {
        setSelectedSubtopics([subParam]);
      }
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

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Mode Latihan
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Konfigurasi Latihan Kategori
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Pilih materi dan atur sesi latihan mandiri sesuai kebutuhan belajar Anda.
          </p>
        </div>

        {/* Step 1: Category Picker */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
                  className={`rounded-xl border p-4 text-center transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm ring-2 ring-blue-600/20 dark:bg-blue-950/60 dark:text-blue-100 dark:border-blue-500"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="block text-lg font-black">{cat}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {CATEGORIES[cat].name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Subtopic Picker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Pilih Sub-materi (Opsional / Multi-select)
            </label>
            <button
              type="button"
              onClick={selectAllSubtopics}
              className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
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
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs transition ${
                    isChecked
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-500"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/40"
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
          <p className="text-[11px] text-slate-400">
            {selectedSubtopics.length === 0
              ? "Semua sub-materi dalam kategori akan diuji secara acak."
              : `${selectedSubtopics.length} sub-materi dipilih.`}
          </p>
        </div>

        {/* Step 3: Question Count & Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Jumlah Soal
            </label>
            <div className="flex items-center gap-2">
              {[5, 10, 15, 20, 30].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-bold transition ${
                    questionCount === num
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Tingkat Kesulitan
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value={0}>Semua Kesulitan (Campuran)</option>
              <option value={1}>Tingkat 1 (Mudah)</option>
              <option value={2}>Tingkat 2 (Sedang)</option>
              <option value={3}>Tingkat 3 (Sulit / HOTS)</option>
            </select>
          </div>
        </div>

        {/* Step 4: Timer Toggle */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 text-slate-500" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Batas Waktu Timer</p>
              <p className="text-[11px] text-slate-500">
                {enableTimer ? `Aktif (${questionCount} menit: 60 detik per soal)` : "Nonaktif (Latihan santai tanpa batas waktu)"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnableTimer(!enableTimer)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enableTimer ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
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
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300">
            {error}
          </div>
        )}

        <button
          onClick={handleStartPractice}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {isLoading ? (
            <span>Membuat Sesi Latihan...</span>
          ) : (
            <>
              <Play className="h-4 w-4 fill-white" />
              Mulai Sesi Latihan ({questionCount} Soal)
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function LatihanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Memuat form latihan...</div>}>
      <LatihanForm />
    </Suspense>
  );
}
