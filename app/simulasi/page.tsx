"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";
import { EXAM_CONFIG } from "@/config/exam";
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function SimulasiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartExam = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "full" }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal memulai simulasi");
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Simulasi Penuh CAT BKN
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Konfirmasi Pelaksanaan Ujian
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Harap baca instruksi dan ketentuan simulasi dengan saksama sebelum memulai.
          </p>
        </div>

        {/* Regulatory Disclaimer Card */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Profil Ujian: {BASELINE_EXAM_PROFILE.name}
          </p>
          <p className="leading-relaxed text-blue-800 dark:text-blue-300">
            {EXAM_CONFIG.disclaimerText}
          </p>
        </div>

        {/* Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TWK</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">30 Soal</p>
            <p className="text-[11px] text-slate-500">Passing Grade: 65 (Maks: 150)</p>
            <p className="text-[10px] text-slate-400 mt-1">Benar 5 &bull; Salah 0</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TIU</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">35 Soal</p>
            <p className="text-[11px] text-slate-500">Passing Grade: 80 (Maks: 175)</p>
            <p className="text-[10px] text-slate-400 mt-1">Benar 5 &bull; Salah 0</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TKP</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">45 Soal</p>
            <p className="text-[11px] text-slate-500">Passing Grade: 166 (Maks: 225)</p>
            <p className="text-[10px] text-slate-400 mt-1">Bobot Opsi: 1 sampai 5 poin</p>
          </div>
        </div>

        {/* Rules Checklist */}
        <div className="space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Ketentuan Sistem CAT:</h4>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Total 110 Soal &bull; Durasi 100 Menit:</strong> Anda bebas berpindah antar-nomor dan antar-kategori selama waktu masih ada.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Autosave Lokal Aktif:</strong> Setiap jawaban Anda otomatis disimpan ke database SQLite komputer saat memilih opsi.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span><strong>Waktu Terus Berjalan:</strong> Menutup tab browser atau mematikan layar tidak menghentikan timer. Ujian akan difinalisasi otomatis saat batas waktu habis.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Shortcut Keyboard:</strong> Tekan <code>ArrowLeft / ArrowRight</code> untuk navigasi soal, <code>A–E</code> untuk memilih opsi, dan <code>R</code> untuk menandai ragu-ragu.</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300">
            {error}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleStartExam}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 text-base font-bold text-white shadow-md hover:bg-blue-800 transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>Menyiapkan Soal Ujian...</span>
            ) : (
              <>
                <Play className="h-5 w-5 fill-white" />
                Mulai Ujian Sekarang
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Dengan mengklik tombol di atas, waktu 100 menit akan langsung dihitung mundur.
          </p>
        </div>
      </div>
    </div>
  );
}
