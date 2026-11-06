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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header and Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Riwayat Simulasi & Latihan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Daftar seluruh sesi ujian yang pernah Anda kerjakan secara lokal di perangkat ini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/history?format=csv"
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 transition"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor CSV
          </a>
          <a
            href="/api/history?format=json"
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 transition"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor JSON
          </a>
        </div>
      </div>

      {/* Score Trend Chart (if data >= 2) */}
      {chartData.length >= 2 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Grafik Perkembangan Skor dari Waktu ke Waktu
            </h3>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="tanggal" textAnchor="end" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 550]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total Skor" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="twk" name="TWK" stroke="#059669" strokeWidth={1.5} />
                <Line type="monotone" dataKey="tiu" name="TIU" stroke="#d97706" strokeWidth={1.5} />
                <Line type="monotone" dataKey="tkp" name="TKP" stroke="#7c3aed" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 dark:border-slate-800">
          Grafik tren perkembangan skor akan tampil setelah Anda menyelesaikan minimal dua sesi ujian.
        </div>
      )}

      {/* Filter and Attempts Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Mode:</span>
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
              {m === "all" ? "Semua Sesi" : m === "full" ? "Simulasi Penuh" : "Latihan Kategori"}
            </button>
          ))}
        </div>

        {attempts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            Belum ada riwayat ujian yang tercatat.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3.5">Waktu & Sesi</th>
                  <th className="px-4 py-3.5">Mode</th>
                  <th className="px-4 py-3.5 text-center">TWK</th>
                  <th className="px-4 py-3.5 text-center">TIU</th>
                  <th className="px-4 py-3.5 text-center">TKP</th>
                  <th className="px-4 py-3.5 text-center">Total</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.map((att) => {
                  const d = new Date(att.startedAt);
                  const isCompleted = att.status === "finished" || att.status === "expired";
                  return (
                    <tr key={att.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} &bull; {att.questionCount} Soal
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {att.mode === "full" ? "SIMULASI" : `LATIHAN ${att.categoryFilter || ""}`}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center font-semibold">{att.scoreTwk ?? "-"}</td>
                      <td className="px-4 py-3.5 text-center font-semibold">{att.scoreTiu ?? "-"}</td>
                      <td className="px-4 py-3.5 text-center font-semibold">{att.scoreTkp ?? "-"}</td>
                      <td className="px-4 py-3.5 text-center font-black text-slate-900 dark:text-white">
                        {att.scoreTotal ?? "-"}
                      </td>
                      <td className="px-4 py-3.5">
                        {att.status === "in_progress" ? (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Berjalan
                          </span>
                        ) : att.mode === "full" ? (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              att.isPassed
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                            }`}
                          >
                            {att.isPassed ? "LULUS" : "TIDAK LULUS"}
                          </span>
                        ) : (
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            Selesai
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {isCompleted ? (
                          <Link
                            href={`/hasil/${att.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
                          >
                            Hasil & Pembahasan &rarr;
                          </Link>
                        ) : (
                          <Link
                            href={`/ujian/${att.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline dark:text-amber-400"
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
  );
}
