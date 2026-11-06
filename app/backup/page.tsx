"use client";

import { useState, useEffect } from "react";
import {
  HardDrive,
  Download,
  RotateCcw,
  Plus,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function BackupPage() {
  const [backups, setBackups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [selectedFileToRestore, setSelectedFileToRestore] = useState<string | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadBackups = () => {
    setIsLoading(true);
    fetch("/api/backup")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBackups(data.backups);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadBackups();
  }, []);

  const handleCreateBackup = async () => {
    setIsCreating(true);
    setNotification(null);
    try {
      const res = await fetch("/api/backup", { method: "POST" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setNotification({
        type: "success",
        message: `Backup baru '${data.backup.filename}' berhasil dibuat dengan aman!`,
      });
      loadBackups();
    } catch (err: any) {
      setNotification({ type: "error", message: "Gagal membuat backup: " + err.message });
    } finally {
      setIsCreating(false);
    }
  };

  const handleRestoreConfirm = async () => {
    if (!selectedFileToRestore) return;
    setIsRestoring(true);
    setNotification(null);
    try {
      const res = await fetch("/api/backup/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: selectedFileToRestore }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setShowRestoreModal(false);
      setNotification({
        type: "success",
        message: `Database berhasil dipulihkan dari ${selectedFileToRestore}! Salinan pra-restore otomatis dicadangkan (ID: ${data.preBackupId}).`,
      });
      loadBackups();
    } catch (err: any) {
      setNotification({ type: "error", message: "Gagal restore database: " + err.message });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Pencadangan & Pemulihan (Backup & Restore)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola salinan cadangan database SQLite lokal dan pulihkan data Anda sewaktu-waktu dengan aman.
          </p>
        </div>

        <button
          onClick={handleCreateBackup}
          disabled={isCreating}
          className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-xs font-bold text-white shadow hover:bg-blue-800 disabled:opacity-50 transition"
        >
          <Plus className="h-4 w-4" />
          {isCreating ? "Membuat Backup..." : "Buat Backup Baru Sekarang"}
        </button>
      </div>

      {notification && (
        <div
          className={`rounded-xl border p-4 text-xs font-semibold flex items-start gap-2.5 ${
            notification.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-rose-600 mt-0.5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Safety Notice Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs text-slate-600 dark:text-slate-400">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          Prosedur Keselamatan Data Lokal
        </h3>
        <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-slate-600 dark:text-slate-300">
          <li>
            Pencadangan menggunakan <strong>SQLite Online Backup API</strong> dengan checkpoint WAL otomatis untuk mencegah file corrupt.
          </li>
          <li>
            Setiap kali Anda menjalankan <strong>Restore</strong>, sistem secara otomatis membuat backup kondisi terkini terlebih dahulu (pre-restore backup) sebagai jaring pengaman bila Anda ingin membatalkan.
          </li>
          <li>
            Unduh file backup ke flashdisk atau direktori penyimpanan lain di komputer Anda secara berkala agar riwayat latihan Anda selalu aman.
          </li>
        </ul>
      </div>

      {/* Backups List Table */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
          Daftar Arsip Backup Tersimpan ({backups.length})
        </h3>

        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">Memuat riwayat backup...</div>
        ) : backups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-500 dark:border-slate-800">
            Belum ada arsip backup tersimpan. Klik tombol &ldquo;Buat Backup Baru Sekarang&rdquo; di atas untuk membuat cadangan database pertama Anda.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3.5">Nama File Backup</th>
                  <th className="px-4 py-3.5">Tipe</th>
                  <th className="px-4 py-3.5">Ukuran</th>
                  <th className="px-4 py-3.5">Waktu Pembuatan</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {backups.map((bk) => {
                  const d = new Date(bk.createdAt);
                  return (
                    <tr key={bk.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="truncate max-w-xs">{bk.filename}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                            bk.backupType === "auto_pre_restore"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                          }`}
                        >
                          {bk.backupType === "auto_pre_restore" ? "Pre-Restore" : "Manual"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-600 dark:text-slate-300">
                        {(bk.fileSizeBytes / 1024).toFixed(1)} KB
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">
                        {d.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/api/backup/download/${bk.filename}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                            title="Unduh File Database"
                          >
                            <Download className="h-3 w-3" />
                            Unduh
                          </a>
                          <button
                            onClick={() => {
                              setSelectedFileToRestore(bk.filename);
                              setShowRestoreModal(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-400 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-500/25 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-300"
                            title="Pulihkan Database dari File Ini"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Restore
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Restore Confirmation Dialog */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Konfirmasi Restore Database
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Anda akan memulihkan database dari file: <br />
                  <strong className="text-slate-800 dark:text-slate-200">{selectedFileToRestore}</strong>
                </p>
              </div>
            </div>

            <p className="rounded-lg bg-blue-50 p-3 text-xs text-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              Sistem akan otomatis mencadangkan kondisi saat ini sebelum data lama dipulihkan. Seluruh sesi aktif akan digantikan dengan data dari backup tersebut.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRestoreModal(false)}
                className="rounded-lg border px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleRestoreConfirm}
                disabled={isRestoring}
                className="rounded-lg bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-amber-700 disabled:opacity-50"
              >
                {isRestoring ? "Memulihkan..." : "Ya, Pulihkan Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
