"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RiwayatPage() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/history?mode=${modeFilter === "all" ? "" : modeFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAttempts(data.attempts);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [modeFilter]);

  // Chart data: chronological completed attempts
  const chartData = attempts
    .filter((a) => a.status === "finished")
    .slice(0, 15)
    .reverse()
    .map((a) => {
      const d = new Date(a.startedAt);
      return {
        tanggal: `${d.getDate()}/${d.getMonth() + 1}`,
        total: a.scoreTotal ?? 0,
        twk: a.scoreTwk ?? 0,
        tiu: a.scoreTiu ?? 0,
        tkp: a.scoreTkp ?? 0,
      };
    });

  return (
    <div className="min-h-screen bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header and Export Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-4 dark:border-border-dark">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Riwayat Simulasi & Latihan
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-mono">
              Arsip data pengerjaan mandiri tersimpan lokal di perangkat ini.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/api/history?format=csv"
              className="flex items-center gap-1.5 rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Ekspor CSV
            </a>
            <a
              href="/api/history?format=json"
              className="flex items-center gap-1.5 rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Ekspor JSON
            </a>
          </div>
        </div>

        {/* Score Trend Chart (if data >= 2) */}
        {chartData.length >= 2 ? (
          <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cobalt-light dark:text-cobalt-dark" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tren Perkembangan Akumulasi Skor SKD
              </h3>
            </div>
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="tanggal" textAnchor="end" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 550]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#181B20",
                      borderColor: "#23272F",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontFamily: "JetBrains Mono",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="total" name="Total Skor" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="twk" name="TWK" stroke="#F43F5E" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="tiu" name="TIU" stroke="#D97706" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="tkp" name="TKP" stroke="#10B981" strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border-light p-8 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark/50 font-mono">
            Grafik tren perkembangan skor akan otomatis terbentuk setelah Anda menyelesaikan minimal 2 sesi simulasi/latihan.
          </div>
        )}

        {/* Filter and Attempts Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Filter Sesi:</span>
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
                {m === "all" ? "Semua Sesi" : m === "full" ? "Simulasi Penuh" : "Latihan Kategori"}
              </button>
            ))}
          </div>

          {attempts.length === 0 ? (
            <div className="rounded-3xl border border-border-light bg-white p-12 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark">
              Belum ada riwayat ujian yang tercatat di database lokal.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-border-light bg-white shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border-light bg-slate-50/75 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:border-border-dark dark:bg-surface-dark">
                  <tr>
                    <th className="px-4 py-3.5">Waktu Pengerjaan</th>
                    <th className="px-4 py-3.5">Mode Ujian</th>
                    <th className="px-4 py-3.5 text-center">TWK</th>
                    <th className="px-4 py-3.5 text-center">TIU</th>
                    <th className="px-4 py-3.5 text-center">TKP</th>
                    <th className="px-4 py-3.5 text-center">Total Skor</th>
                    <th className="px-4 py-3.5">Status Evaluasi</th>
                    <th className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {attempts.map((att) => {
                    const d = new Date(att.startedAt);
                    const isCompleted = att.status === "finished" || att.status === "expired";
                    return (
                      <tr key={att.id} className="hover:bg-slate-50/60 dark:hover:bg-surface-dark/60 transition">
                        <td className="px-4 py-3.5">
                          <p className="font-bold text-slate-900 dark:text-white">
                            {d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                          <span className="font-mono text-[10px] text-slate-400">
                            {d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} &bull; {att.questionCount} Soal
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:bg-surface-dark dark:text-slate-300 border border-border-light dark:border-border-dark">
                            {att.mode === "full" ? "SIMULASI PENUH" : `LATIHAN ${att.categoryFilter || ""}`}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center font-mono font-semibold">{att.scoreTwk ?? "-"}</td>
                        <td className="px-4 py-3.5 text-center font-mono font-semibold">{att.scoreTiu ?? "-"}</td>
                        <td className="px-4 py-3.5 text-center font-mono font-semibold">{att.scoreTkp ?? "-"}</td>
                        <td className="px-4 py-3.5 text-center font-mono font-black text-slate-900 dark:text-white text-sm">
                          {att.scoreTotal ?? "-"}
                        </td>
                        <td className="px-4 py-3.5">
                          {att.status === "in_progress" ? (
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              Berjalan
                            </span>
                          ) : att.mode === "full" ? (
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                                att.isPassed
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                  : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                              }`}
                            >
                              {att.isPassed ? "LULUS PG" : "TIDAK LULUS"}
                            </span>
                          ) : (
                            <span className="rounded-full bg-cobalt-light/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark">
                              Selesai
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          {isCompleted ? (
                            <Link
                              href={`/hasil/${att.id}`}
                              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-cobalt-light hover:underline dark:text-cobalt-dark"
                            >
                              Hasil & Pembahasan &rarr;
                            </Link>
                          ) : (
                            <Link
                              href={`/ujian/${att.id}`}
                              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
                            >
                              Lanjutkan &rarr;
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
