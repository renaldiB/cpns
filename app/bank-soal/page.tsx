"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  RefreshCw,
} from "lucide-react";
import { SUBTOPICS, CategoryId, getSubtopicsByCategory } from "@/config/subtopics";

export default function BankSoalPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [subtopicFilter, setSubtopicFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  // Form State for Add/Edit
  const [formCategory, setFormCategory] = useState<CategoryId>("TWK");
  const [formSubtopic, setFormSubtopic] = useState<string>("pancasila");
  const [formStem, setFormStem] = useState<string>("");
  const [formImagePath, setFormImagePath] = useState<string>("");
  const [formExplanation, setFormExplanation] = useState<string>("");
  const [formDifficulty, setFormDifficulty] = useState<number>(2);
  const [formReviewStatus, setFormReviewStatus] = useState<string>("verified");
  const [formOptions, setFormOptions] = useState([
    { label: "A", text: "", points: 0 },
    { label: "B", text: "", points: 5 },
    { label: "C", text: "", points: 0 },
    { label: "D", text: "", points: 0 },
    { label: "E", text: "", points: 0 },
  ]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Import State
  const [importContent, setImportContent] = useState<string>("");
  const [importMode, setImportMode] = useState<"preview" | "commit">("preview");
  const [importPreview, setImportPreview] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Fetch Questions
  const fetchQuestions = () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "20",
      search,
      category: categoryFilter,
      subtopic: subtopicFilter,
      difficulty: difficultyFilter,
    });

    fetch(`/api/questions?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuestions(data.items);
          setTotalCount(data.pagination.total);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, search, categoryFilter, subtopicFilter, difficultyFilter]);

  // Open modal for editing
  const handleOpenEdit = (q: any) => {
    setEditingQuestion(q);
    setFormCategory(q.category);
    setFormSubtopic(q.subtopic);
    setFormStem(q.stem);
    setFormImagePath(q.imagePath || "");
    setFormExplanation(q.explanation);
    setFormDifficulty(q.difficulty);
    setFormReviewStatus(q.reviewStatus);
    setFormOptions(q.options || []);
    setFormError(null);
    setShowAddModal(true);
  };

  // Open modal for new question
  const handleOpenNew = () => {
    setEditingQuestion(null);
    setFormCategory("TWK");
    setFormSubtopic("pancasila");
    setFormStem("");
    setFormImagePath("");
    setFormExplanation("");
    setFormDifficulty(2);
    setFormReviewStatus("verified");
    setFormOptions([
      { label: "A", text: "", points: 0 },
      { label: "B", text: "", points: 5 },
      { label: "C", text: "", points: 0 },
      { label: "D", text: "", points: 0 },
      { label: "E", text: "", points: 0 },
    ]);
    setFormError(null);
    setShowAddModal(true);
  };

  // Soft Delete Question
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin mengarsipkan soal ini? (Data riwayat lama tidak akan terhapus)")) {
      return;
    }
    try {
      const res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchQuestions();
      } else {
        alert(data.error);
      }
    } catch (err: any) {
      alert("Gagal menghapus soal: " + err.message);
    }
  };

  // Save Question Form
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const payload = {
      category: formCategory,
      subtopic: formSubtopic,
      stem: formStem,
      imagePath: formImagePath || null,
      explanation: formExplanation,
      difficulty: formDifficulty,
      reviewStatus: formReviewStatus,
      options: formOptions,
    };

    try {
      const url = editingQuestion ? `/api/questions/${editingQuestion.id}` : "/api/questions";
      const method = editingQuestion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal menyimpan soal");
      }
      setShowAddModal(false);
      fetchQuestions();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Import preview / commit
  const handleImportSubmit = async (commitMode = false) => {
    setIsImporting(true);
    setImportError(null);
    try {
      const res = await fetch("/api/questions/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: importContent,
          mode: commitMode ? "commit" : "preview",
          isAtomic: false,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Gagal memproses import");
      }

      if (commitMode) {
        alert(data.message || "Import berhasil disimpan.");
        setShowImportModal(false);
        setImportContent("");
        setImportPreview(null);
        fetchQuestions();
      } else {
        setImportPreview(data.preview);
      }
    } catch (err: any) {
      setImportError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Kelola Bank Soal
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Koleksi bank soal lokal ({totalCount} soal aktif terdaftar di database).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <Upload className="h-3.5 w-3.5" />
            Import (JSON / CSV)
          </button>
          <a
            href="/api/questions/export?format=csv"
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor CSV
          </a>
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Soal Baru
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan teks soal..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubtopicFilter("");
              setPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option value="">Semua Kategori</option>
            <option value="TWK">TWK</option>
            <option value="TIU">TIU</option>
            <option value="TKP">TKP</option>
          </select>
        </div>

        <div>
          <select
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option value="">Semua Kesulitan</option>
            <option value="1">Tingkat 1 (Mudah)</option>
            <option value="2">Tingkat 2 (Sedang)</option>
            <option value="3">Tingkat 3 (Sulit)</option>
          </select>
        </div>
      </div>

      {/* Questions Table */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-500">Memuat data bank soal...</div>
      ) : questions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          Tidak ada soal yang sesuai dengan pencarian / filter Anda.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60">
              <tr>
                <th className="px-4 py-3.5">Kategori & Sub-materi</th>
                <th className="px-4 py-3.5">Teks Soal</th>
                <th className="px-4 py-3.5 text-center">Tingkat</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-extrabold text-blue-700 dark:text-blue-400 mr-2">{q.category}</span>
                    <span className="text-slate-500">{q.subtopic}</span>
                  </td>
                  <td className="px-4 py-3.5 max-w-md">
                    <p className="line-clamp-2 font-medium text-slate-900 dark:text-slate-200">
                      {q.stem}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-center font-semibold">
                    Tingkat {q.difficulty}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        q.reviewStatus === "verified"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {q.reviewStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(q)}
                        className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                        title="Edit Soal"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="rounded p-1 text-rose-500 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40"
                        title="Arsipkan Soal"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Total {totalCount} soal</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border px-3 py-1 font-bold disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span>Halaman {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={questions.length < 20}
            className="rounded-lg border px-3 py-1 font-bold disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      </div>

      {/* Add / Edit Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-8 space-y-5">
            <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {editingQuestion ? "Edit Soal Bank Data" : "Tambah Soal Baru"}
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      const cat = e.target.value as CategoryId;
                      setFormCategory(cat);
                      const available = getSubtopicsByCategory(cat);
                      if (available.length > 0) setFormSubtopic(available[0].id);
                    }}
                    className="w-full rounded-lg border p-2 dark:bg-slate-800 dark:border-slate-700"
                  >
                    <option value="TWK">TWK</option>
                    <option value="TIU">TIU</option>
                    <option value="TKP">TKP</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Sub-materi</label>
                  <select
                    value={formSubtopic}
                    onChange={(e) => setFormSubtopic(e.target.value)}
                    className="w-full rounded-lg border p-2 dark:bg-slate-800 dark:border-slate-700"
                  >
                    {getSubtopicsByCategory(formCategory).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Teks Soal (Stem)</label>
                <textarea
                  rows={4}
                  required
                  value={formStem}
                  onChange={(e) => setFormStem(e.target.value)}
                  placeholder="Tuliskan pertanyaan / kasus soal..."
                  className="w-full rounded-lg border p-2.5 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              {/* 5 Options */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  5 Opsi Pilihan (A–E) dan Poin:
                </label>
                {formOptions.map((opt, idx) => (
                  <div key={opt.label} className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 font-bold dark:bg-slate-800">
                      {opt.label}
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={`Teks pilihan opsi ${opt.label}...`}
                      value={opt.text}
                      onChange={(e) => {
                        const next = [...formOptions];
                        next[idx].text = e.target.value;
                        setFormOptions(next);
                      }}
                      className="flex-1 rounded-lg border p-2 dark:bg-slate-800 dark:border-slate-700"
                    />
                    <input
                      type="number"
                      required
                      min={0}
                      max={5}
                      value={opt.points}
                      onChange={(e) => {
                        const next = [...formOptions];
                        next[idx].points = parseInt(e.target.value) || 0;
                        setFormOptions(next);
                      }}
                      className="w-16 rounded-lg border p-2 text-center font-bold dark:bg-slate-800 dark:border-slate-700"
                    />
                    <span className="text-[10px] text-slate-400">Poin</span>
                  </div>
                ))}
                <p className="text-[10px] text-slate-400">
                  {formCategory === "TKP"
                    ? "TKP: Setiap opsi harus memiliki poin unik 1, 2, 3, 4, dan 5."
                    : "TWK/TIU: Tepat satu opsi bernilai 5, dan empat opsi lainnya bernilai 0."}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pembahasan Detail</label>
                <textarea
                  rows={3}
                  required
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Jelaskan alasan jawaban benar / bobot poin..."
                  className="w-full rounded-lg border p-2.5 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tingkat Kesulitan</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(parseInt(e.target.value))}
                    className="w-full rounded-lg border p-2 dark:bg-slate-800 dark:border-slate-700"
                  >
                    <option value={1}>1 - Mudah</option>
                    <option value={2}>2 - Sedang</option>
                    <option value={3}>3 - Sulit / HOTS</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status Review</label>
                  <select
                    value={formReviewStatus}
                    onChange={(e) => setFormReviewStatus(e.target.value)}
                    className="w-full rounded-lg border p-2 dark:bg-slate-800 dark:border-slate-700"
                  >
                    <option value="verified">Verified</option>
                    <option value="needs_review">Needs Review</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="rounded-lg border border-rose-300 bg-rose-50 p-2.5 text-rose-700 font-semibold dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-700 px-5 py-2 font-bold text-white shadow-sm hover:bg-blue-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Soal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 my-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Import Soal Massal (JSON / CSV)
              </h3>
              <button onClick={() => setShowImportModal(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Tempelkan konten teks JSON atau format CSV baku, lalu klik &ldquo;Cek Validasi & Duplikat&rdquo; untuk memeriksa ringkasan sebelum disimpan ke database.
            </p>

            <textarea
              rows={8}
              value={importContent}
              onChange={(e) => {
                setImportContent(e.target.value);
                setImportPreview(null);
              }}
              placeholder="Tempel teks JSON atau CSV di sini..."
              className="w-full rounded-xl border p-3 font-mono text-[11px] dark:bg-slate-800 dark:border-slate-700"
            />

            {importError && (
              <div className="rounded-lg border border-rose-300 bg-rose-50 p-3 text-xs text-rose-700 font-semibold dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                {importError}
              </div>
            )}

            {/* Preview Summary */}
            {importPreview && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-slate-800/60 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">Hasil Pemeriksaan Preview:</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded bg-white p-2 border dark:bg-slate-900 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400">Total Baris</span>
                    <p className="font-extrabold text-base">{importPreview.total}</p>
                  </div>
                  <div className="rounded bg-emerald-50 p-2 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <span className="text-[10px]">Valid</span>
                    <p className="font-extrabold text-base">{importPreview.validCount}</p>
                  </div>
                  <div className="rounded bg-rose-50 p-2 border border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                    <span className="text-[10px]">Invalid</span>
                    <p className="font-extrabold text-base">{importPreview.invalidCount}</p>
                  </div>
                  <div className="rounded bg-amber-50 p-2 border border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    <span className="text-[10px]">Duplikat</span>
                    <p className="font-extrabold text-base">{importPreview.duplicateCount}</p>
                  </div>
                </div>

                {importPreview.invalidItems?.length > 0 && (
                  <div className="text-[11px] text-rose-600 space-y-1 pt-1">
                    <p className="font-bold">Daftar Error Baris:</p>
                    {importPreview.invalidItems.slice(0, 3).map((err: any) => (
                      <p key={err.index}>Baris {err.index}: {err.errors.join(", ")}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="rounded-lg border px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Batal
              </button>
              {!importPreview ? (
                <button
                  type="button"
                  onClick={() => handleImportSubmit(false)}
                  disabled={!importContent.trim() || isImporting}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-800 disabled:opacity-50"
                >
                  {isImporting ? "Memeriksa..." : "Cek Validasi & Duplikat"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleImportSubmit(true)}
                  disabled={importPreview.validCount === 0 || isImporting}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isImporting ? "Menyimpan..." : `Simpan ${importPreview.validCount} Soal Valid`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
