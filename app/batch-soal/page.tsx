"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  BookOpen,
  Upload,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderPlus,
  ArrowRight,
  Database,
  FileText,
  Sparkles,
} from "lucide-react";

interface BatchItem {
  id: string;
  batchNumber: number;
  name: string;
  description: string | null;
  targetYear: number | null;
  isActive: boolean;
  totalQuestions: number;
  twkCount: number;
  tiuCount: number;
  tkpCount: number;
  createdAt: string;
}

export default function BatchSoalPage() {
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState<BatchItem | null>(null);

  // New Batch Form State
  const [newBatchName, setNewBatchName] = useState("");
  const [newBatchDesc, setNewBatchDesc] = useState("");
  const [newBatchNumber, setNewBatchNumber] = useState<number>(3);
  const [newBatchYear, setNewBatchYear] = useState<number>(2026);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Import State
  const [importContent, setImportContent] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/batches");
      const data = await res.json();
      if (data.success) {
        setBatches(data.batches);
        const maxNum = (data.batches as BatchItem[]).reduce((max, b) => Math.max(max, b.batchNumber), 0);
        setNewBatchNumber(maxNum + 1);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    setIsSubmitting(true);
    setFeedbackMsg(null);
    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newBatchName.trim(),
          batchNumber: newBatchNumber,
          description: newBatchDesc.trim(),
          targetYear: newBatchYear,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal membuat batch baru");
      }

      setFeedbackMsg({ type: "success", text: `Batch ${data.batch.name} berhasil dibuat!` });
      setShowCreateModal(false);
      setNewBatchName("");
      setNewBatchDesc("");
      fetchBatches();
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImportToBatch = async () => {
    if (!showImportModal || !importContent.trim()) return;
    setIsSubmitting(true);
    setImportStatus(null);
    try {
      const res = await fetch("/api/questions/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: importContent,
          mode: "commit",
          targetBatchNumber: showImportModal.batchNumber,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal mengimpor soal");
      }

      setImportStatus(`Sukses mengimpor ${data.importedCount} soal ke ${showImportModal.name}!`);
      fetchBatches();
      setTimeout(() => {
        setShowImportModal(null);
        setImportContent("");
        setImportStatus(null);
      }, 1500);
    } catch (err: any) {
      setImportStatus(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalBankQuestions = batches.reduce((sum, b) => sum + b.totalQuestions, 0);

  return (
    <div className="mx-auto max-w-[1536px] px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt-light/10 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark text-xs font-bold font-mono">
              <Layers className="h-3.5 w-3.5" />
              SISTEM BATCH SOAL
            </span>
            <span className="text-xs text-slate-400 dark:text-outline font-mono">
              Multi-Paket Latihan
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Manajemen Paket & Batch Soal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-on-surface-variant max-w-2xl leading-relaxed">
            Setiap penambahan Batch baru otomatis memperkaya bank soal untuk simulasi penuh dan latihan kategori. Anda dapat menambahkan Batch 2, 3, dan seterusnya untuk memperbarui variasi soal.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cobalt-light dark:bg-cobalt-dark text-white text-xs font-bold shadow hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Batch Baru</span>
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
            feedbackMsg.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300"
          }`}
        >
          {feedbackMsg.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container border border-border-light dark:border-border-dark">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
            Total Batch
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {batches.length}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-secondary-fixed-dim mt-0.5 block font-mono">
            {batches.filter((b) => b.isActive).length} Paket Aktif
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container border border-border-light dark:border-border-dark">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
            Total Soal Terdaftar
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {totalBankQuestions}
          </p>
          <span className="text-[11px] text-slate-400 dark:text-outline mt-0.5 block font-mono">
            Seluruh Paket
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container border border-border-light dark:border-border-dark">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
            Batch Utama (Bawaan)
          </span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 truncate">
            Batch 1 (BKN 2024)
          </p>
          <span className="text-[11px] text-cobalt-light dark:text-primary mt-0.5 block font-mono">
            330 Soal Terverifikasi
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container border border-border-light dark:border-border-dark">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-outline">
            Target Batch Baru
          </span>
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-1 truncate">
            Batch 2 (Latihan 2026)
          </p>
          <span className="text-[11px] text-amber-600 dark:text-amber-dark mt-0.5 block font-mono">
            Siap Diisi Soal Baru
          </span>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Daftar Paket Batch Soal</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-surface-container-high font-mono text-slate-600 dark:text-on-surface-variant">
            {batches.length} Paket
          </span>
        </h2>

        {isLoading ? (
          <div className="p-12 text-center text-sm font-semibold text-slate-400">
            Memuat daftar batch soal...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {batches.map((b) => {
              const isDefault = b.batchNumber === 1;
              return (
                <div
                  key={b.id}
                  className="rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark p-6 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-cobalt-light/10 text-cobalt-light dark:bg-cobalt-dark/20 dark:text-cobalt-dark font-mono font-bold text-xs">
                          BATCH #{b.batchNumber}
                        </span>
                        {isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                            Bawaan Sistem
                          </span>
                        )}
                        <span className="text-xs text-slate-400 font-mono">
                          Tahun {b.targetYear || 2024}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-outline">
                        {b.totalQuestions} Butir Soal
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-on-surface-variant mt-1 line-clamp-2">
                        {b.description || "Tidak ada deskripsi tambahan."}
                      </p>
                    </div>

                    {/* Breakdown Pill Cards */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark text-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">TWK</span>
                        <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                          {b.twkCount} Soal
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark text-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">TIU</span>
                        <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                          {b.tiuCount} Soal
                        </p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-container border border-slate-100 dark:border-border-dark text-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">TKP</span>
                        <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                          {b.tkpCount} Soal
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowImportModal(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-surface-container dark:hover:bg-surface-container-high text-slate-700 dark:text-on-surface text-xs font-bold transition"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Impor Soal</span>
                      </button>

                      <Link
                        href={`/bank-soal?batch=${b.batchNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-border-dark dark:hover:bg-surface-container text-slate-700 dark:text-on-surface text-xs font-semibold transition"
                      >
                        <Database className="h-3.5 w-3.5" />
                        <span>Bank Soal</span>
                      </Link>
                    </div>

                    <Link
                      href={`/latihan?batch=${b.batchNumber}`}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cobalt-light dark:bg-cobalt-dark text-white text-xs font-bold hover:opacity-90 transition"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Latihan Batch #{b.batchNumber}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Buat Batch Baru */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Buat Paket / Batch Soal Baru
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-on-surface-variant mb-1">
                  Nomor Batch
                </label>
                <input
                  type="number"
                  min="1"
                  value={newBatchNumber}
                  onChange={(e) => setNewBatchNumber(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container px-3 py-2 text-xs font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-on-surface-variant mb-1">
                  Nama Paket Batch
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Batch 2: Pengayaan Latihan 2026"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container px-3 py-2 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-on-surface-variant mb-1">
                  Deskripsi / Cakupan Materi
                </label>
                <textarea
                  placeholder="Catatan tujuan atau cakupan materi soal baru ini..."
                  value={newBatchDesc}
                  onChange={(e) => setNewBatchDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container px-3 py-2 text-xs h-20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-on-surface-variant mb-1">
                  Tahun Target Formasi
                </label>
                <input
                  type="number"
                  value={newBatchYear}
                  onChange={(e) => setNewBatchYear(parseInt(e.target.value) || 2026)}
                  className="w-full rounded-xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container px-3 py-2 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-outline hover:bg-slate-100 dark:hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-cobalt-light dark:bg-cobalt-dark text-white text-xs font-bold shadow hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Impor Soal ke Batch Tertentu */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Impor Soal ke {showImportModal.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Target: Batch #{showImportModal.batchNumber}
                </p>
              </div>
              <button
                onClick={() => setShowImportModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600 dark:text-on-surface-variant">
                Tempelkan Format JSON atau CSV
              </label>
              <textarea
                value={importContent}
                onChange={(e) => setImportContent(e.target.value)}
                placeholder='Tempel JSON {"questions": [...]} atau CSV standar di sini...'
                className="w-full h-44 rounded-2xl border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-surface-container p-3 font-mono text-[11px] leading-normal"
              />
              {importStatus && (
                <p className="text-xs font-bold text-cobalt-light dark:text-primary">
                  {importStatus}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-outline hover:bg-slate-100 dark:hover:bg-surface-container"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleImportToBatch}
                disabled={isSubmitting || !importContent.trim()}
                className="px-5 py-2 rounded-xl bg-cobalt-light dark:bg-cobalt-dark text-white text-xs font-bold shadow hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Mengimpor..." : "Proses Impor Soal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
