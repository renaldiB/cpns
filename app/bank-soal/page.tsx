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
  Layers,
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
  const [batchFilter, setBatchFilter] = useState<string>("");
  const [batches, setBatches] = useState<any[]>([]);
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
  const [formBatchNumber, setFormBatchNumber] = useState<number>(1);
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
  const [importBatchNumber, setImportBatchNumber] = useState<number>(1);
  const [importPreview, setImportPreview] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Load batches
  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBatches(data.batches || []);
        }
      })
      .catch(() => {});
  }, []);

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
      ...(batchFilter ? { batch: batchFilter } : {}),
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
  }, [page, search, categoryFilter, subtopicFilter, difficultyFilter, batchFilter]);

  // Open modal for editing
  const handleOpenEdit = (q: any) => {
    setEditingQuestion(q);
    setFormCategory(q.category);
    setFormSubtopic(q.subtopic);
    setFormStem(q.stem);
    setFormImagePath(q.imagePath || "");
    setFormExplanation(q.explanation);
    setFormDifficulty(q.difficulty);
    setFormBatchNumber(q.batchNumber || 1);
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
    setFormBatchNumber(1);
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
      batchNumber: formBatchNumber,
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
          targetBatchNumber: importBatchNumber,
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
    <div className="min-h-screen bg-canvas-light text-slate-900 dark:bg-canvas-dark dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-light pb-4 dark:border-border-dark">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Kelola Bank Soal Lokal
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 font-mono">
              Database offline tersinkronisasi ({totalCount} butir soal aktif).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 transition"
            >
              <Upload className="h-3.5 w-3.5" />
              Import (JSON/CSV)
            </button>
            <a
              href={`/api/questions/export?format=csv${batchFilter ? `&batch=${batchFilter}` : ""}`}
              className="flex items-center gap-1.5 rounded-xl border border-border-light bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Ekspor CSV
            </a>
            <button
              onClick={handleOpenNew}
              className="flex items-center gap-1.5 rounded-xl bg-cobalt-light dark:bg-cobalt-dark px-4 py-2 text-xs font-bold text-white shadow hover:opacity-90 transition active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Soal
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari teks pertanyaan / kasus..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-border-light bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-cobalt-light"
            />
          </div>

          <div>
            <select
              value={batchFilter}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-border-light bg-white px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-800 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-white shadow-sm"
            >
              <option value="">Semua Batch Paket</option>
              {batches.map((b) => (
                <option key={b.id} value={b.batchNumber}>
                  Batch {b.batchNumber}: {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setSubtopicFilter("");
                setPage(1);
              }}
              className="w-full rounded-2xl border border-border-light bg-white px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-800 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-white shadow-sm"
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
              className="w-full rounded-2xl border border-border-light bg-white px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-800 dark:border-border-dark dark:bg-surface-elevated-dark dark:text-white shadow-sm"
            >
              <option value="">Semua Kesulitan</option>
              <option value="1">Tingkat 1 (Mudah)</option>
              <option value="2">Tingkat 2 (Sedang)</option>
              <option value="3">Tingkat 3 (Sulit / HOTS)</option>
            </select>
          </div>
        </div>

        {/* Questions Table */}
        {isLoading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500">Memuat data bank soal...</div>
        ) : questions.length === 0 ? (
          <div className="rounded-3xl border border-border-light bg-white p-12 text-center text-xs text-slate-500 dark:border-border-dark dark:bg-surface-elevated-dark">
            Tidak ada soal yang sesuai dengan kombinasi pencarian / filter Anda.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-border-light bg-white shadow-sm dark:border-border-dark dark:bg-surface-elevated-dark">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-light bg-slate-50/75 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:border-border-dark dark:bg-surface-dark">
                <tr>
                  <th className="px-4 py-3.5">Batch</th>
                  <th className="px-4 py-3.5">Kategori & Sub-materi</th>
                  <th className="px-4 py-3.5">Teks Soal</th>
                  <th className="px-4 py-3.5 text-center">Tingkat</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60 dark:hover:bg-surface-dark/60 transition">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 dark:bg-surface-dark dark:text-slate-300 border border-border-light dark:border-border-dark">
                        <Layers className="h-2.5 w-2.5" />
                        Batch {q.batchNumber || 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-black text-cobalt-light dark:text-cobalt-dark mr-2">{q.category}</span>
                      <span className="text-slate-500 dark:text-slate-400">{q.subtopic}</span>
                    </td>
                    <td className="px-4 py-3.5 max-w-md">
                      <p className="line-clamp-2 font-medium text-slate-900 dark:text-slate-200 leading-relaxed">
                        {q.stem}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono font-semibold">
                      Tingkat {q.difficulty}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                          q.reviewStatus === "verified"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {q.reviewStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-surface-dark dark:hover:text-white transition"
                          title="Edit Soal"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40 transition"
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
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Total {totalCount} butir soal</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-border-light bg-white dark:bg-surface-elevated-dark dark:border-border-dark px-3 py-1.5 font-bold disabled:opacity-40 shadow-sm"
            >
              Sebelumnya
            </button>
            <span>Halaman {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={questions.length < 20}
              className="rounded-xl border border-border-light bg-white dark:bg-surface-elevated-dark dark:border-border-dark px-3 py-1.5 font-bold disabled:opacity-40 shadow-sm"
            >
              Berikutnya
            </button>
          </div>
        </div>

        {/* Add / Edit Question Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-2xl rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-2xl dark:border-border-dark dark:bg-surface-elevated-dark my-8 space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border-light pb-3 dark:border-border-dark">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {editingQuestion ? "Edit Butir Soal" : "Tambah Soal Baru"}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Batch Paket</label>
                    <select
                      value={formBatchNumber}
                      onChange={(e) => setFormBatchNumber(parseInt(e.target.value) || 1)}
                      className="w-full rounded-xl border border-border-light p-2.5 font-mono dark:bg-surface-dark dark:border-border-dark"
                    >
                      {batches.map((b) => (
                        <option key={b.id} value={b.batchNumber}>
                          Batch {b.batchNumber}: {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      className="w-full rounded-xl border border-border-light p-2.5 font-mono dark:bg-surface-dark dark:border-border-dark"
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
                      className="w-full rounded-xl border border-border-light p-2.5 dark:bg-surface-dark dark:border-border-dark"
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Teks Pertanyaan / Kasus (Stem)</label>
                  <textarea
                    rows={4}
                    required
                    value={formStem}
                    onChange={(e) => setFormStem(e.target.value)}
                    placeholder="Tuliskan pertanyaan / studi kasus soal..."
                    className="w-full rounded-2xl border border-border-light p-3 dark:bg-surface-dark dark:border-border-dark leading-relaxed"
                  />
                </div>

                {/* 5 Options */}
                <div className="space-y-2.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">
                    5 Pilihan Jawaban (A–E) dan Bobot Poin:
                  </label>
                  {formOptions.map((opt, idx) => (
                    <div key={opt.label} className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-mono font-bold dark:bg-surface-dark shrink-0">
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
                        className="flex-1 rounded-xl border border-border-light p-2 dark:bg-surface-dark dark:border-border-dark"
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
                        className="w-16 rounded-xl border border-border-light p-2 text-center font-mono font-bold dark:bg-surface-dark dark:border-border-dark"
                      />
                      <span className="font-mono text-[10px] text-slate-400">Poin</span>
                    </div>
                  ))}
                  <p className="font-mono text-[10px] text-slate-400">
                    {formCategory === "TKP"
                      ? "TKP: Setiap opsi wajib bernilai unik 1, 2, 3, 4, dan 5."
                      : "TWK/TIU: Tepat satu opsi bernilai 5, dan empat opsi lainnya bernilai 0."}
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pembahasan & Dasar Teori</label>
                  <textarea
                    rows={3}
                    required
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                    placeholder="Jelaskan alasan kunci jawaban benar..."
                    className="w-full rounded-2xl border border-border-light p-3 dark:bg-surface-dark dark:border-border-dark leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tingkat Kesulitan</label>
                    <select
                      value={formDifficulty}
                      onChange={(e) => setFormDifficulty(parseInt(e.target.value))}
                      className="w-full rounded-xl border border-border-light p-2.5 font-mono dark:bg-surface-dark dark:border-border-dark"
                    >
                      <option value={1}>1 - Mudah</option>
                      <option value={2}>2 - Sedang</option>
                      <option value={3}>3 - Sulit / HOTS</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status Verifikasi</label>
                    <select
                      value={formReviewStatus}
                      onChange={(e) => setFormReviewStatus(e.target.value)}
                      className="w-full rounded-xl border border-border-light p-2.5 font-mono dark:bg-surface-dark dark:border-border-dark"
                    >
                      <option value="verified">Verified</option>
                      <option value="needs_review">Needs Review</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-700 font-semibold dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                    {formError}
                  </div>
                )}

                <div className="flex justify-end gap-2.5 pt-3 border-t border-border-light dark:border-border-dark">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-border-light px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-dark"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-cobalt-light dark:bg-cobalt-dark px-5 py-2 font-bold text-white shadow hover:opacity-90 disabled:opacity-50 transition"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-2xl rounded-3xl border border-border-light bg-white p-6 sm:p-8 shadow-2xl dark:border-border-dark dark:bg-surface-elevated-dark my-8 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-border-light pb-3 dark:border-border-dark">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Import Soal Massal (JSON / CSV)
                </h3>
                <button onClick={() => setShowImportModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-surface-dark">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="font-bold text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  Target Batch:
                </label>
                <select
                  value={importBatchNumber}
                  onChange={(e) => setImportBatchNumber(parseInt(e.target.value) || 1)}
                  className="rounded-xl border border-border-light p-2 font-mono text-xs dark:bg-surface-dark dark:border-border-dark"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.batchNumber}>
                      Batch {b.batchNumber}: {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
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
                className="w-full rounded-2xl border border-border-light p-3 font-mono text-[11px] dark:bg-surface-dark dark:border-border-dark leading-relaxed"
              />

              {importError && (
                <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs text-rose-700 font-semibold dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  {importError}
                </div>
              )}

              {/* Preview Summary */}
              {importPreview && (
                <div className="rounded-2xl border border-border-light bg-slate-50 p-4 text-xs dark:border-border-dark dark:bg-surface-dark space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Hasil Pemeriksaan Preview:</h4>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="rounded-xl bg-white p-2 border border-border-light dark:bg-surface-elevated-dark dark:border-border-dark">
                      <span className="text-[10px] text-slate-400">Total Baris</span>
                      <p className="font-extrabold text-base">{importPreview.total}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-2 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <span className="text-[10px]">Valid</span>
                      <p className="font-extrabold text-base">{importPreview.validCount}</p>
                    </div>
                    <div className="rounded-xl bg-rose-50 p-2 border border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                      <span className="text-[10px]">Invalid</span>
                      <p className="font-extrabold text-base">{importPreview.invalidCount}</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-2 border border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                      <span className="text-[10px]">Duplikat</span>
                      <p className="font-extrabold text-base">{importPreview.duplicateCount}</p>
                    </div>
                  </div>

                  {importPreview.invalidItems?.length > 0 && (
                    <div className="text-[11px] text-rose-600 space-y-1 pt-1 font-mono">
                      <p className="font-bold">Daftar Error Baris:</p>
                      {importPreview.invalidItems.slice(0, 3).map((err: any) => (
                        <p key={err.index}>Baris {err.index}: {err.errors.join(", ")}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-3 border-t border-border-light dark:border-border-dark">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="rounded-xl border border-border-light px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-border-dark dark:text-slate-300 dark:hover:bg-surface-dark"
                >
                  Batal
                </button>
                {!importPreview ? (
                  <button
                    type="button"
                    onClick={() => handleImportSubmit(false)}
                    disabled={!importContent.trim() || isImporting}
                    className="rounded-xl bg-cobalt-light dark:bg-cobalt-dark px-4 py-2 text-xs font-bold text-white shadow hover:opacity-90 disabled:opacity-50 transition"
                  >
                    {isImporting ? "Memeriksa..." : "Cek Validasi & Duplikat"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleImportSubmit(true)}
                    disabled={importPreview.validCount === 0 || isImporting}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition"
                  >
                    {isImporting ? "Menyimpan..." : `Simpan ${importPreview.validCount} Soal ke Batch ${importBatchNumber}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
