# Catatan Asumsi dan Keputusan Teknis (ASSUMPTIONS.md)

Dokumen ini mencatat asumsi operasional, arsitektur, dan keputusan teknis yang diambil dalam implementasi aplikasi web simulasi SKD CPNS.

## 1. Regulasi dan Profil Ujian
- **Status Regulasi Target (CPNS 2026):** Pada saat pengembangan (November 2026), belum ada pengumuman/keputusan resmi KemenPANRB terkait penetapan nilai ambang batas spesifik SKD CPNS umum tahun 2026.
- **Profil Baseline Aktif:** Menggunakan **KepmenPANRB Nomor 321 Tahun 2024** sebagai referensi historis resmi yang valid:
  - Total soal: 110 (TWK 30, TIU 35, TKP 45).
  - Durasi: 100 menit (6000 detik).
  - Aturan skor: TWK/TIU benar 5, salah/kosong 0. TKP berbobot 1 s.d. 5, kosong 0.
  - Passing grade baseline: TWK >= 65, TIU >= 80, TKP >= 166. Total maksimum: 550.
  - Penandaan UI: Ditandai jelas dengan label `historical` / `CPNS TA 2024 — Referensi Historis`.
- **Ekstensibilitas Profil:** Pengguna dapat membuat profil baru atau mengubah passing grade dan durasi secara mandiri melalui menu Pengaturan tanpa mengubah kode sumber.

## 2. Arsitektur Local-First dan Penyimpanan
- **Database:** SQLite lokal tersimpan pada `data/app.db`.
- **Mode Journal:** `WAL` (Write-Ahead Logging) diaktifkan untuk konkurensi optimal antara autosave latar belakang dan pembacaan data.
- **Integritas Histori (Snapshotting):** Setiap attempt membekukan snapshot lengkap pertanyaan, opsi teracak, dan pemetaan skor saat attempt dibuat ke tabel `attempt_questions`. Modifikasi, arsip, atau penghapusan soal di bank soal master tidak akan mengubah data historis attempt terdahulu.
- **Autosave Anti Race-Condition:** Setiap pembaruan pilihan jawaban menyertakan nomor revisi (versioning counter) di tingkat record `attempt_questions` untuk menjamin request jawaban yang terlambat tidak menimpa jawaban terbaru.
- **Timer & Batas Waktu:** Dihitung dari `deadline_at` berbasis timestamp server lokal (UTC). Jika browser ditutup atau komputer restart, attempt dilanjutkan dengan sisa waktu yang benar. Jika deadline terlampaui, backend langsung menandai status `expired` dan memfinalisasi penilaian secara otomatis.

## 3. Privasi dan Ketiadaan Layanan Eksternal
- Server diikat secara privat dan terisolasi pada lingkungan mesin pengguna (isolated single-user context).
- Font menggunakan system font stack bawaan sistem operasi.
- Ikon menggunakan library lokal `lucide-react`.
- Tidak ada Google Fonts, CDN eksternal, telemetry, analytics, atau tracking pixel.
- Semua gambar soal disimpan secara lokal dalam direktori `data/uploads/` dengan validasi MIME dan proteksi path traversal.

## 4. Taksonomi Sub-materi dan Distribusi Blueprint
- **TWK:** Pancasila, UUD 1945, NKRI, Bhinneka Tunggal Ika, Nasionalisme, Integritas, Bela Negara, Bahasa Indonesia.
- **TIU:** Verbal (Sinonim, Antonim, Analogi, Silogisme, Analitis), Numerik (Hitungan, Deret, Perbandingan, Soal Cerita), Figural.
- **TKP:** Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme, Anti-radikalisme.
- **Target Kesulitan Baseline:** Distribusi internal latihan ~30% mudah (difficulty 1), ~50% sedang (difficulty 2), ~20% sulit (difficulty 3).

## 5. Model Pemulihan dan Backup Aman
- **Backup Online Bebas Korupsi:** Menggunakan API native SQLite `better-sqlite3.backup()` yang menyalin database halaman per halaman tanpa mengunci pembacaan aplikasi dan bebas dari risiko korupsi WAL.
- **Pre-restore Safety Net:** Setiap kali pemulihan database dijalankan melalui antarmuka atau CLI, snapshot otomatis dari database berjalan saat ini dibuat terlebih dahulu (`bk_...`) sebelum penimpaan file dilakukan.
- **Integritas Checksum:** Setiap berkas cadangan dihitung nilai hash SHA-256 untuk memvalidasi berkas tidak mengalami kerusakan fisik sebelum di-restore.

## 6. Strategi Pengujian Otomatis
- **Vitest Unit & Integration:** Menguji 12 skenario wajib (scoring TWK/TIU/TKP, evaluasi passing grade, akurasi, dan distribusi bobot non-biner TKP) serta integrasi lifecycle penuh.
- **Playwright E2E:** Dikonfigurasi dengan `workers: 1` untuk menghormati karakteristik database lokal SQLite (menghindari contention `SQLITE_BUSY` pada penulisan bersamaan antar test runner) dan menggunakan engine Chromium yang kompatibel lintas lingkungan tanpa dependensi eksternal tambahan.
