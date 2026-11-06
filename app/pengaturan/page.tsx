"use client";

import { useState, useEffect } from "react";
import { BASELINE_EXAM_PROFILE, ExamProfile } from "@/config/exam-profiles";
import { EXAM_CONFIG } from "@/config/exam";
import {
  Settings,
  ShieldCheck,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  Copy,
} from "lucide-react";

export default function PengaturanPage() {
  const [profiles, setProfiles] = useState<ExamProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(BASELINE_EXAM_PROFILE.id);
  const [activeProfile, setActiveProfile] = useState<ExamProfile>(BASELINE_EXAM_PROFILE);
  const [theme, setTheme] = useState<string>("system");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load profiles
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profiles.length > 0) {
          setProfiles(data.profiles);
          const found = data.profiles.find((p: any) => p.id === selectedProfileId) || data.profiles[0];
          setActiveProfile(found);
        }
      });

    // Load theme
    const saved = localStorage.getItem("cpns_theme") || "system";
    setTheme(saved);
  }, []);

  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    const found = profiles.find((p) => p.id === id);
    if (found) setActiveProfile(found);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeProfile),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setMessage("Profil ujian berhasil diperbarui dan disimpan ke SQLite lokal.");
    } catch (err: any) {
      setMessage("Gagal menyimpan: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetBaseline = () => {
    if (confirm("Reset konfigurasi profil ini ke nilai default baseline KepmenPANRB No. 321/2024?")) {
      setActiveProfile(BASELINE_EXAM_PROFILE);
    }
  };

  const handleChangeTheme = (t: "light" | "dark" | "system") => {
    setTheme(t);
    localStorage.setItem("cpns_theme", t);
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else if (t === "light") root.classList.remove("dark");
    else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Pengaturan Sistem & Profil Ujian
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Sesuaikan profil aturan simulasi, passing grade, durasi waktu, dan preferensi tampilan.
        </p>
      </div>

      {/* Theme Settings Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Tema Antarmuka Aplikasi
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "light", label: "Terang (Light)", icon: Sun },
            { id: "dark", label: "Gelap (Dark)", icon: Moon },
            { id: "system", label: "Sistem (Otomatis)", icon: Laptop },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleChangeTheme(item.id as any)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-bold transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-200"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exam Profile Configuration Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Konfigurasi Profil Aturan Ujian
            </h3>
            <p className="text-xs text-slate-500">
              Ubah passing grade atau durasi waktu simulasi penuh tanpa merombak histori lama.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetBaseline}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset ke Baseline 2024
          </button>
        </div>

        {/* Profile Details Inputs */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nama Profil
              </label>
              <input
                type="text"
                value={activeProfile.name}
                onChange={(e) => setActiveProfile({ ...activeProfile, name: e.target.value })}
                className="w-full rounded-lg border p-2.5 dark:bg-slate-800 dark:border-slate-700 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Durasi Simulasi (Menit)
              </label>
              <input
                type="number"
                min={10}
                max={240}
                value={Math.floor(activeProfile.durationSeconds / 60)}
                onChange={(e) =>
                  setActiveProfile({
                    ...activeProfile,
                    durationSeconds: (parseInt(e.target.value) || 100) * 60,
                  })
                }
                className="w-full rounded-lg border p-2.5 dark:bg-slate-800 dark:border-slate-700 font-semibold"
              />
            </div>
          </div>

          {/* Passing Grades Per Category */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-500 text-[11px]">
              Ambang Batas Nilai (Passing Grade):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border p-4 bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700">
                <span className="font-bold text-slate-500 uppercase">TWK Passing Grade</span>
                <input
                  type="number"
                  min={0}
                  max={150}
                  value={activeProfile.categories.TWK.passingScore}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setActiveProfile({
                      ...activeProfile,
                      categories: {
                        ...activeProfile.categories,
                        TWK: { ...activeProfile.categories.TWK, passingScore: val },
                      },
                    });
                  }}
                  className="mt-2 w-full rounded-lg border p-2 font-black text-lg text-center dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Default 2024: 65 (30 Soal)</span>
              </div>

              <div className="rounded-xl border p-4 bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700">
                <span className="font-bold text-slate-500 uppercase">TIU Passing Grade</span>
                <input
                  type="number"
                  min={0}
                  max={175}
                  value={activeProfile.categories.TIU.passingScore}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setActiveProfile({
                      ...activeProfile,
                      categories: {
                        ...activeProfile.categories,
                        TIU: { ...activeProfile.categories.TIU, passingScore: val },
                      },
                    });
                  }}
                  className="mt-2 w-full rounded-lg border p-2 font-black text-lg text-center dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Default 2024: 80 (35 Soal)</span>
              </div>

              <div className="rounded-xl border p-4 bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700">
                <span className="font-bold text-slate-500 uppercase">TKP Passing Grade</span>
                <input
                  type="number"
                  min={0}
                  max={225}
                  value={activeProfile.categories.TKP.passingScore}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setActiveProfile({
                      ...activeProfile,
                      categories: {
                        ...activeProfile.categories,
                        TKP: { ...activeProfile.categories.TKP, passingScore: val },
                      },
                    });
                  }}
                  className="mt-2 w-full rounded-lg border p-2 font-black text-lg text-center dark:bg-slate-900"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Default 2024: 166 (45 Soal)</span>
              </div>
            </div>
          </div>

          {message && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs font-semibold text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
              {message}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t dark:border-slate-800">
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-2.5 font-bold text-white shadow-sm hover:bg-blue-800 disabled:opacity-50 transition"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Menyimpan..." : "Simpan Perubahan Profil"}
            </button>
          </div>
        </div>
      </div>

      {/* Local Storage Transparency Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
          <HardDrive className="h-4 w-4 text-blue-600" />
          Informasi Penyimpanan Lokal Komputer
        </div>
        <p>
          Seluruh data bank soal, sesi ujian, riwayat nilai, dan profil disimpan 100% secara lokal dalam database <code>data/app.db</code> (SQLite WAL). Tidak ada data yang dikirim ke cloud atau pihak ketiga.
        </p>
      </div>
    </div>
  );
}
