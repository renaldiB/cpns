# Web Simulasi SKD CPNS Mandiri (Sistem CAT BKN)

Aplikasi web simulasi ujian Seleksi Kompetensi Dasar (SKD) Calon Pegawai Negeri Sipil (CPNS) berbasis sistem Computer Assisted Test (CAT) Badan Kepegawaian Negara (BKN). Dirancang khusus untuk penggunaan pribadi (*single-user*), mengutamakan prinsip *local-first*, privasi penuh, dan dapat dijalankan secara luring (*offline-capable*).

---

## 🌟 Fitur Utama

- **Engine Ujian CAT BKN Realistis:**
  - Layout dan navigasi 110 nomor soal sesuai standar CAT resmi.
  - Opsi jawaban A–E diacak per sesi secara adil tanpa mengubah substansi.
  - Autosave instan berproteksi versi (*anti race-condition*).
  - Penanda ragu-ragu (*flag*) dengan penanda warna standar.
  - Navigasi keyboard (`ArrowLeft`, `ArrowRight`, `A`–`E`, `R` untuk ragu, `Esc` untuk menutup dialog).
  - Countdown timer tersinkronisasi server lokal dengan penanganan penutupan browser/restart komputer yang aman.
  - *Auto-finalize* otomatis saat batas waktu habis.
- **Sistem Penilaian Server-Side:**
  - TWK (30 soal) & TIU (35 soal): Benar +5, Salah/Kosong 0.
  - TKP (45 soal): Skala non-biner berbobot 1 s.d. 5 poin, Kosong 0.
  - Evaluasi *passing grade* per kategori dan skor total (maksimum 550).
  - Statistik distribusi poin pilihan TKP (persentase dan frekuensi poin 5, 4, 3, 2, 1).
- **Keamanan Snapshot & Integritas Soal:**
  - Setiap sesi membekukan snapshot lengkap soal, urutan opsi teracak, dan pemetaan skor.
  - Perubahan di bank soal master tidak akan mengubah riwayat sesi yang sudah ada.
  - Soal yang dikirim ke klien disanitasi (*zero leakage*: kunci jawaban dan pembahasan tidak dikirim sebelum ujian diselesaikan).
- **Mode Latihan Fleksibel:**
  - Latihan terfokus per kategori (TWK, TIU, atau TKP).
  - Multi-select sub-materi spesifik.
  - Pilihan jumlah soal kustom dan opsi timer (dengan atau tanpa batas waktu).
- **Analisis Kelemahan Sub-Materi & Tren:**
  - Akurasi riil per sub-materi dengan ambang batas keandalan sampel (label "*Data Belum Cukup*" jika sampel < 5 soal).
  - Tombol cepat untuk langsung memulai latihan sub-materi terlemah.
  - Grafik tren skor historis interaktif berbasis Recharts.
- **Manajemen Bank Soal Lengkap:**
  - CRUD bank soal dengan input 5 opsi (bobot 0/5 untuk TWK/TIU, 1–5 untuk TKP) dan pembahasan.
  - Pencarian, filter kategori, sub-materi, dan status review (*verified*, *needs_review*, *draft*).
  - Import dan export aman format JSON & CSV (RFC 4180).
- **Pengaturan Profil Ujian Fleksibel:**
  - Profil baseline aktif: **KepmenPANRB No. 321/2024 (Referensi Historis)**.
  - Kemampuan membuat profil kustom (durasi, jumlah soal, passing grade) tanpa mengubah kode.
- **Backup & Restore Terisolasi:**
  - Backup SQLite online aman menggunakan native `better-sqlite3.backup()` API.
  - Pemulihan (*restore*) dengan backup otomatis (*pre-restore snapshot*) dan verifikasi checksum SHA-256.

---

## 🔒 Privasi dan Local-First Architecture

- **Local-First Isolated:** Aplikasi berjalan secara mandiri dan aman pada mesin pengguna tanpa ketergantungan server publik eksternal.
- **Zero Remote Calls:** Tidak ada Google Fonts, CDN eksternal, telemetry, analitik pihak ketiga, maupun dependensi API eksternal saat runtime.
- **Sistem Font Bawaan:** Menggunakan system font stack bawaan OS (San Francisco, Segoe UI, Roboto, Helvetica Neue).
- **Database Lokal:** SQLite tersimpan lokal di `data/app.db` dengan mode *Write-Ahead Logging* (WAL).

---

## 📋 Prasyarat Sistem

- **Node.js:** Versi >= 20.0.0 (direkomendasikan Node.js v20 atau v24 LTS).
- **NPM:** Versi >= 9.0.0.
- **Sistem Operasi:** Windows 10/11, macOS, atau Linux.

---

## 🚀 Panduan Instalasi (Mesin Bersih)

1. **Clone atau Ekstrak Repositori:**
   ```bash
   cd "CPNS Trial"
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Inisialisasi Database & Seeding Bank Soal (840 Soal / 8 Paket Batch):**
   ```bash
   npm run db:seed
   ```
   *Catatan: Perintah ini bersifat idempotent. Jika database sudah berisi soal, data pengguna tidak akan ditimpa.*

4. **Verifikasi Integritas Soal:**
   ```bash
   npm run questions:verify
   ```

---

## ▶️ Menjalankan Aplikasi

### Mode Produksi (Direkomendasikan untuk Ujian)
```bash
npm run build
npm run start
```
Buka peramban pada alamat lokal yang ditampilkan pada terminal.

### Mode Pengembangan (Development)
```bash
npm run dev
```

---

## 🧪 Rangkaian Pengujian Kualitas (Quality Gates)

Aplikasi dilengkapi dengan rangkaian pengujian berlapis untuk menjamin reliabilitas:

| Perintah | Deskripsi | Status |
|---|---|---|
| `npm run lint` | Pemeriksaan gaya kode dan aturan Next.js/React Hooks | **PASSED (0 errors)** |
| `npm run typecheck` | Validasi tipe data TypeScript ketat (`tsc --noEmit`) | **PASSED (0 errors)** |
| `npm test` | Uji unit Vitest (scoring, passing grade, Zod schema) & integrasi siklus ujian | **PASSED (22 tests)** |
| `npm run test:e2e` | Uji end-to-end Playwright (alur CAT penuh 14 tahap + responsivitas 5 viewport) | **PASSED (17 tests)** |
| `npm run questions:verify` | Verifikasi integritas 840 soal (8 Batch), validasi opsi A–E, bobot TKP 1–5, dan deteksi duplikat Jaccard | **PASSED (840 valid)** |
| `npm run build` | Kompilasi Next.js App Router (20 rute static & dynamic) | **PASSED** |

---

## 💾 Manajemen Database & Backup

- **File Database Utama:** `data/app.db` (diabaikan oleh git demi privasi pengguna).
- **Direktori Backup:** `data/backups/`.

### Perintah CLI Database:
- **Buat Backup Manual:**
  ```bash
  npm run db:backup
  ```
- **Pulihkan Backup:**
  ```bash
  npm run db:restore -- data/backups/<nama_file_backup>.db --confirm
  ```
- **Reset Database (Destruktif):**
  ```bash
  npm run db:reset -- --confirm
  ```

---

## 📑 Profil Ujian CPNS Baseline

Sesuai **Keputusan Menteri PANRB Republik Indonesia Nomor 321 Tahun 2024**:
- **Total Soal:** 110 Soal
  - Tes Wawasan Kebangsaan (TWK): 30 Soal (Passing Grade: 65, Maks: 150)
  - Tes Inteligensia Umum (TIU): 35 Soal (Passing Grade: 80, Maks: 175)
  - Tes Karakteristik Pribadi (TKP): 45 Soal (Passing Grade: 166, Maks: 225)
- **Total Skor Maksimal:** 550 Poin
- **Waktu Pengerjaan:** 100 Menit
- **Status Profil:** Ditandai secara eksplisit dalam aplikasi sebagai referensi historis resmi yang valid.
