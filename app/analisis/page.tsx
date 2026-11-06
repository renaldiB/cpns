"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Play,
  Filter,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function AnalisisPage() {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/analytics?mode=${modeFilter === "all" ? "" : modeFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnalytics(data.subtopicStats || []);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [modeFilter]);

  const filtered = analytics.filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  const withEnoughData = filtered.filter((i) => i.hasEnoughData);
  const withoutEnoughData = filtered.filter((i) => !i.hasEnoughData);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Analisis Kelemahan Sub-materi
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Evaluasi performa akurasi per sub-materi untuk mendeteksi area materi yang perlu Anda tingkatkan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Source Mode Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">Sumber Data:</span>
          {(["all", "full", "practice"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                modeFilter === m
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {m === "all" ? "Semua Sumber" : m === "full" ? "Simulasi Penuh Saja" : "Latihan Saja"}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">Kategori:</span>
          {(["all", "TWK", "TIU", "TKP"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat === "all" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threshold Explanation Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300 flex items-start gap-2.5">
        <HelpCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p>
          <strong>Standar Validitas Sampel:</strong> Sub-materi hanya dikategorikan sebagai kelemahan valid jika memiliki minimal <strong>5 soal yang sudah pernah dijawab</strong>. Jika sampel kurang dari 5 soal, sistem menandai <em>&ldquo;Data Belum Cukup&rdquo;</em> untuk menghindari kesimpulan keliru berdasarkan 1 atau 2 soal semata.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-500">
          Memuat analisis data performa...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Subtopics with Enough Data */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-500 mb-4">
              Sub-materi Teruji (Urut dari Paling Perlu Ditingkatkan)
            </h3>

            {withEnoughData.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                Belum ada sub-materi yang mencapai ambang batas minimal 5 soal terjawab.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {withEnoughData.map((item) => {
                  const isWeak = item.scorePercentage < 65;
                  const isModerate = item.scorePercentage >= 65 && item.scorePercentage < 80;
                  const isStrong = item.scorePercentage >= 80;

                  return (
                    <div
                      key={item.subtopicId}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {item.category}
                          </span>
                          <span
                            className={`text-sm font-black ${
                              isWeak
                                ? "text-rose-600 dark:text-rose-400"
                                : isModerate
                                ? "text-amber-500"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {item.category === "TKP"
                              ? `${item.averagePoints} / 5.00`
                              : `${item.accuracy}% Akurasi`}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {item.subtopicName}
                        </h4>

                        {/* Progress Bar */}
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isWeak ? "bg-rose-500" : isModerate ? "bg-amber-400" : "bg-emerald-500"
                            }`}
                            style={{ width: `${Math.min(100, Math.max(5, item.scorePercentage))}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{item.totalAnswered} soal terjawab</span>
                          {item.category !== "TKP" && (
                            <span>{item.correctCount} benar / {item.totalAnswered - item.correctCount} salah</span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/latihan?category=${item.category}&subtopic=${item.subtopicId}`}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        <Play className="h-3.5 w-3.5 fill-slate-800 dark:fill-slate-200" />
                        Latihan Materi Ini
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Subtopics with Insufficient Data */}
          {withoutEnoughData.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                Sub-materi Belum Cukup Data (&lt; 5 Soal)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {withoutEnoughData.map((item) => (
                  <div
                    key={item.subtopicId}
                    className="rounded-xl border border-dashed border-slate-200 p-3 text-xs dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{item.category}</span>
                        <span className="italic">{item.totalAnswered} / 5 soal</span>
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">
                        {item.subtopicName}
                      </p>
                    </div>
                    <Link
                      href={`/latihan?category=${item.category}&subtopic=${item.subtopicId}`}
                      className="mt-2 text-[10px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Uji Materi Ini &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
