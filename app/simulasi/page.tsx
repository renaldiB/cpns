"use client";

import { useState, useEffect } from "react";
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
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function SimulasiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [batches, setBatches] = useState<Array<{ batchNumber: number; name: string; totalQuestions: number }>>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBatches(data.batches);
        }
      })
      .catch(() => {});
  }, []);

  const handleStartExam = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "full",
          batchFilter: selectedBatch,
        }),
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

      <div className="rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-light/10 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark px-3 py-1 text-xs font-bold font-mono">
            SIMULASI PENUH CAT BKN
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Konfirmasi Pelaksanaan Ujian
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-on-surface-variant leading-relaxed">
            Harap baca instruksi dan ketentuan simulasi dengan saksama sebelum memulai.
          </p>
        </div>

        {/* Regulatory Disclaimer Card */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-200 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Profil Ujian: {BASELINE_EXAM_PROFILE.name}
          </p>
          <p className="leading-relaxed text-blue-800 dark:text-blue-300">
            {EXAM_CONFIG.disclaimerText}
          </p>
        </div>

        {/* Batch Selection Option */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-surface-container border border-slate-200/80 dark:border-border-dark space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-on-surface flex items-center gap-2">
            <Layers className="h-4 w-4 text-cobalt-light dark:text-primary" />
            <span>Pilih Sumber Paket / Batch Soal:</span>
          </label>
          <select
            value={selectedBatch ?? ""}
            onChange={(e) => setSelectedBatch(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-surface-dark px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-on-surface"
          >
            <option value="">Semua Paket Batch (Komprehensif Gabungan)</option>
            {batches.map((b) => (
              <option key={b.batchNumber} value={b.batchNumber}>
                Batch #{b.batchNumber}: {b.name} ({b.totalQuestions} Soal)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 font-mono">
            Pilih paket spesifik untuk simulasi atau biarkan kosong untuk mengambil seluruh bank soal aktif.
          </p>
        </div>

        {/* Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border-light bg-slate-50 p-4 dark:border-border-dark dark:bg-surface-container">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">TWK</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">30 Soal</p>
            <p className="text-[11px] text-slate-500 font-mono">Passing Grade: 65 (Maks: 150)</p>
            <p className="text-[10px] text-slate-400 mt-1">Benar 5 &bull; Salah 0</p>
          </div>

          <div className="rounded-2xl border border-border-light bg-slate-50 p-4 dark:border-border-dark dark:bg-surface-container">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">TIU</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">35 Soal</p>
            <p className="text-[11px] text-slate-500 font-mono">Passing Grade: 80 (Maks: 175)</p>
            <p className="text-[10px] text-slate-400 mt-1">Benar 5 &bull; Salah 0</p>
          </div>

          <div className="rounded-2xl border border-border-light bg-slate-50 p-4 dark:border-border-dark dark:bg-surface-container">
            <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">TKP</span>
            <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">45 Soal</p>
            <p className="text-[11px] text-slate-500 font-mono">Passing Grade: 166 (Maks: 225)</p>
            <p className="text-[10px] text-slate-400 mt-1">Skala Bobot: 1 s.d. 5 poin</p>
          </div>
        </div>

        {/* Rules Checklist */}
        <div className="space-y-3 border-t border-border-light pt-5 dark:border-border-dark">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Ketentuan Sistem CAT BKN:</h4>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-on-surface-variant">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Total 110 Soal &bull; Durasi 100 Menit:</strong> Bebas berpindah antar-nomor dan antar-kategori selama sisa waktu masih ada.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Autosave Lokal Aktif:</strong> Setiap jawaban Anda otomatis tersimpan seketika ke database SQLite komputer saat memilih opsi.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span><strong>Timer Server Berjalan:</strong> Menutup browser tidak menghentikan waktu. Ujian akan difinalisasi otomatis saat batas waktu habis.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Shortcut Keyboard:</strong> Panah kiri/kanan untuk navigasi soal, tombol A–E untuk memilih opsi, tombol R untuk menandai ragu.</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-3 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
            {error}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleStartExam}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cobalt-light dark:bg-cobalt-dark py-4 text-base font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition disabled:opacity-50"
          >
            {isLoading ? (
              <span>Menyiapkan Lembar Soal...</span>
            ) : (
              <>
                <Play className="h-5 w-5 fill-white" />
                Mulai Ujian Sekarang
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] text-slate-400 font-mono">
            Waktu 100 menit akan langsung dihitung mundur di server lokal.
          </p>
        </div>
      </div>
    </div>
  );
}
