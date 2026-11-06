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
  Target,
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
    <div className="min-h-screen bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="border-b border-border-light pb-4 dark:border-border-dark">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Analisis Kelemahan Sub-materi
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-mono">
            Pemetaan akurasi sub-topik untuk mendeteksi area materi yang membutuhkan penguatan intensif.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Source Mode Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 font-mono">Sumber:</span>
            {(["all", "full", "practice"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModeFilter(m)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-sm ${
                  modeFilter === m
                    ? "bg-cobalt-light dark:bg-cobalt-dark text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-surface-elevated-dark dark:text-slate-300 dark:hover:bg-surface-dark border border-border-light dark:border-border-dark"
                }`}
              >
                {m === "all" ? "Semua Sumber" : m === "full" ? "Simulasi Penuh Saja" : "Latihan Saja"}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500 font-mono">Kategori:</span>
            {(["all", "TWK", "TIU", "TKP"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-sm ${
                  categoryFilter === cat
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-surface-elevated-dark dark:text-slate-300 dark:hover:bg-surface-dark border border-border-light dark:border-border-dark"
                }`}
              >
                {cat === "all" ? "Semua Kategori" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Threshold Explanation Note */}
        <div className="rounded-2xl border border-border-light bg-white p-4 text-xs text-slate-600 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-300 flex items-start gap-3 shadow-sm">
          <HelpCircle className="h-5 w-5 text-cobalt-light dark:text-cobalt-dark mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>Standar Validitas Sampel Statistik:</strong> Sub-materi hanya dikategorikan sebagai kelemahan terverifikasi jika memiliki minimal <strong>5 soal yang sudah pernah dijawab</strong>. Di bawah 5 soal, status ditandai <em>&ldquo;Data Belum Cukup&rdquo;</em> guna menghindari bias evaluasi.
          </p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500">
            Memuat analisis data performa sub-materi...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Subtopics with Enough Data */}
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-mono">
                Sub-materi Teruji (Urut dari Prioritas Paling Lemah)
              </h3>

              {withEnoughData.length === 0 ? (
                <div className="rounded-3xl border border-border-light bg-white p-8 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark">
                  Belum ada sub-materi yang mencapai ambang batas minimal 5 butir soal terjawab.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {withEnoughData.map((item) => {
                    const isWeak = item.scorePercentage < 65;
                    const isModerate = item.scorePercentage >= 65 && item.scorePercentage < 80;

                    return (
                      <div
                        key={item.subtopicId}
                        className="rounded-3xl border border-border-light bg-white p-6 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase text-slate-700 dark:bg-surface-dark dark:text-slate-300 font-mono border border-border-light dark:border-border-dark">
                              {item.category}
                            </span>
                            <span
                              className={`font-mono text-sm font-black ${
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
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isWeak ? "bg-rose-500" : isModerate ? "bg-amber-400" : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min(100, Math.max(5, item.scorePercentage))}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
                            <span>{item.totalAnswered} soal terjawab</span>
                            {item.category !== "TKP" && (
                              <span>{item.correctCount} benar / {item.totalAnswered - item.correctCount} salah</span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/latihan?category=${item.category}&subtopic=${item.subtopicId}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-surface-dark dark:text-slate-200 dark:hover:bg-slate-800 transition active:scale-95"
                        >
                          <Play className="h-3.5 w-3.5 fill-slate-800 dark:fill-slate-200" />
                          <span>Latihan Drill Sub-topik Ini</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Subtopics with Insufficient Data */}
            {withoutEnoughData.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border-light dark:border-border-dark">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 font-mono">
                  Sub-materi Belum Cukup Data (&lt; 5 Butir Terjawab)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {withoutEnoughData.map((item) => (
                    <div
                      key={item.subtopicId}
                      className="rounded-2xl border border-dashed border-border-light p-3.5 text-xs dark:border-border-dark flex flex-col justify-between bg-white/50 dark:bg-surface-elevated-dark/50"
                    >
                      <div>
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>{item.category}</span>
                          <span className="italic">{item.totalAnswered} / 5 soal</span>
                        </div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">
                          {item.subtopicName}
                        </p>
                      </div>
                      <Link
                        href={`/latihan?category=${item.category}&subtopic=${item.subtopicId}`}
                        className="mt-3 font-mono text-[10px] font-bold text-cobalt-light hover:underline dark:text-cobalt-dark"
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
    </div>
  );
}
