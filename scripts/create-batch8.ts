import { makeTwkOrTiu, makeTkp } from "./batch-helpers";
import { QuestionData } from "./generate-all-batches";

const batch8Questions: QuestionData[] = [];

// ============================================
// BATCH 8: REKRUTMEN BERSAMA BUMN (100 SOAL)
// ============================================

// --- TWK (30 Butir: Wawasan Kebangsaan & Korporasi Negara) ---
const twk8Configs = [
  {
    sub: "nasionalisme",
    stem: "Badan Usaha Milik Negara (BUMN) mengemban peran ganda (dual role) dalam perekonomian Indonesia, yaitu sebagai pencipta nilai ekonomi (value creator) dan sebagai...",
    cor: "Agen pembangunan nasional (agent of development) untuk kesejahteraan rakyat dan pemerataan layanan publik",
    dis: [
      "Lembaga pemungut pajak penghasilan swasta tertinggi di kawasan Asia Tenggara",
      "Pemegang otoritas tunggal penentu kebijakan moneter dan suku bunga perbankan",
      "Organisasi nirlaba yang dibebaskan dari kewajiban membukukan profit dividen",
      "Entitas bisnis yang hanya melayani kelompok industri konglomerasi tertentu",
    ],
    exp: "Peran ganda BUMN: mencetak keuntungan dividen bagi negara (value creator) sekaligus agen pemerataan pembangunan sosial (agent of development).",
    pos: "A" as const,
  },
  {
    sub: "integritas",
    stem: "Penerapan prinsip Good Corporate Governance (GCG) di lingkungan BUMN menuntut lima pilar pokok: Transparansi, Akuntabilitas, Responsibilitas, Independensi, dan...",
    cor: "Kewajaran (Fairness)",
    dis: ["Sentralisasi", "Rentabilitas", "Afiliasi", "Kerahasiaan"],
    exp: "Prinsip TARIF dalam GCG BUMN: Transparency, Accountability, Responsibility, Independency, dan Fairness (Kewajaran).",
    pos: "A" as const,
  },
  {
    sub: "pancasila",
    stem: "Kemitraan strategis antara BUMN dengan Usaha Mikro, Kecil, dan Menengah (UMKM) melalui program Tanggung Jawab Sosial dan Lingkungan (TJSL) merupakan wujud nyata pengamalan Pancasila sila...",
    cor: "Kelima: Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    dis: ["Pertama: Ketuhanan Yang Maha Esa", "Kedua: Kemanusiaan yang Adil dan Beradab", "Ketiga: Persatuan Indonesia", "Keempat: Kerakyatan"],
    exp: "Pemberdayaan ekonomi UMKM oleh BUMN bertujuan mewujudkan pemerataan kesejahteraan pada Sila Kelima.",
    pos: "A" as const,
  },
  {
    sub: "nkri",
    stem: "Sinergi BUMN klaster logistik maritim dan pelabuhan (Tol Laut) bertujuan untuk...",
    cor: "Menurunkan disparitas harga barang kebutuhan pokok antara wilayah Indonesia Barat dan Indonesia Timur",
    dis: [
      "Menghentikan seluruh aktivitas pengangkutan kapal dagang nelayan lokal",
      "Menyerahkan seluruh pengelolaan pelabuhan samudra kepada investor perorangan",
      "Membatasi pelayaran kapal penumpang hanya pada musim libur nasional",
      "Menaikkan tarif bea masuk antarprovinsi kepulauan secara berkala",
    ],
    exp: "Tol Laut BUMN memperkuat konektivitas nusantara untuk menekan disparitas harga antarwilayah NKRI.",
    pos: "A" as const,
  },
  {
    sub: "bela-negara",
    stem: "BUMN sektor energi (ketenagalistrikan dan minyak gas bumi) memegang peranan krusial dalam pertahanan nirmiliter negara karena menjaga kedaulatan atas...",
    cor: "Ketahanan energi nasional dan kepastian pasokan listrik industri strategis tanpa ketergantungan asing",
    dis: [
      "Penyediaan persenjataan tempur artileri bagi seluruh anggota satuan militer",
      "Pembatasan ekspor komoditas primer ke seluruh mitra dagang internasional",
      "Penetapan kuota impor bahan bakar tanpa pengawasan kementerian keuangan",
      "Monopoli pengelolaan sumur minyak rakyat secara tertutup tanpa kompensasi",
    ],
    exp: "Ketahanan dan kedaulatan energi nasional adalah pilar vital pertahanan negara non-militer.",
    pos: "B" as const,
  },
];

for (let i = 0; i < 30; i++) {
  const c = twk8Configs[i % twk8Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch8Questions.push(
    makeTwkOrTiu(
      `twk-b8-${num}`,
      "batch-8",
      8,
      "TWK",
      c.sub,
      `[BUMN Wawasan #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar Rekrutmen Bersama BUMN FHCI 2024",
      c.pos
    )
  );
}

// --- TIU (35 Butir: TKD BUMN Kemampuan Dasar) ---
const tiu8Configs = [
  {
    sub: "numerik-hitungan",
    stem: "Sebuah anak perusahaan BUMN mencatatkan laba bersih Rp45 miliar pada tahun pertama. Pada tahun kedua laba naik sebesar 20%, dan pada tahun ketiga naik lagi sebesar 25% dari laba tahun kedua. Berapakah laba bersih pada tahun ketiga?",
    cor: "Rp67,5 miliar",
    dis: ["Rp60,0 miliar", "Rp62,5 miliar", "Rp65,0 miliar", "Rp70,0 miliar"],
    exp: "Tahun 2 = 45 x 1,2 = 54 miliar. Tahun 3 = 54 x 1,25 = 67,5 miliar.",
    pos: "A" as const,
  },
  {
    sub: "numerik-deret",
    stem: "Deret tren rasio keuangan: 10, 12, 16, 24, 40, ...",
    cor: "72",
    dis: ["64", "68", "76", "80"],
    exp: "Pola selisih melipatgandakan diri: +2, +4, +8, +16, maka suku berikutnya +32 = 40 + 32 = 72.",
    pos: "A" as const,
  },
  {
    sub: "verbal-analogi",
    stem: "DEVIDEN : SAHAM = BUNGA : ...",
    cor: "Deposito",
    dis: ["Pasar", "Kasir", "Utang", "Pajak"],
    exp: "Imbal hasil investasi: Saham menghasilkan dividen, simpanan deposito perbankan menghasilkan bunga.",
    pos: "A" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Semua proyek transformasi digital BUMN harus mengadopsi prinsip efisiensi proses. Beberapa platform perbankan BUMN adalah proyek transformasi digital BUMN. Kesimpulan...",
    cor: "Beberapa platform perbankan BUMN harus mengadopsi prinsip efisiensi proses",
    dis: [
      "Semua platform perbankan BUMN belum mengadopsi efisiensi proses",
      "Tidak ada proyek transformasi digital BUMN yang efisien",
      "Transformasi digital hanya berlaku pada platform perbankan",
      "Efisiensi proses hanya diwajibkan bagi proyek perbankan",
    ],
    exp: "Kombinasi universal afirmatif dan partikular menghasilkan partikular afirmatif.",
    pos: "B" as const,
  },
  {
    sub: "figural",
    stem: "Transformasi logo korporat: Persegi berotasi 45 derajat (menjadi belah ketupat) dan lingkaran di dalamnya terbagi menjadi empat kuadran hitam-putih berselang. Pola yang konsisten pada segitiga sama sisi adalah...",
    cor: "Segitiga terbalik (rotasi 180 derajat) dengan elemen internal terbagi simetris inversi warna",
    dis: [
      "Segitiga memanjang horizontal tanpa perubahan warna",
      "Segitiga hilang digantikan lingkaran oval polos",
      "Segitiga berlipat menjadi enam sisi tidak beraturan",
      "Segitiga tetap pada orientasi awal tanpa ada modifikasi",
    ],
    exp: "Prinsip transformasi spasial figural: rotasi geometri fundamental disertai pembalikan nilai arsir.",
    pos: "A" as const,
  },
];

for (let i = 0; i < 35; i++) {
  const c = tiu8Configs[i % tiu8Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch8Questions.push(
    makeTwkOrTiu(
      `tiu-b8-${num}`,
      "batch-8",
      8,
      "TIU",
      c.sub,
      `[TKD BUMN #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar Rekrutmen Bersama BUMN FHCI 2024",
      c.pos
    )
  );
}

// --- TKP (35 Butir: Core Values AKHLAK BUMN) ---
const tkp8Bases = [
  {
    sub: "profesionalisme",
    stem: "Amanah (Memegang teguh kepercayaan yang diberikan): Anda dipercaya mengelola data tender rahasia proyek pengadaan strategis BUMN. Rekan akrab Anda di kantor meminta informasi kisaran pagu anggaran untuk membantu vendor kenalannya. Sikap Anda...",
    opts: [
      "Menolak tegas permintaan tersebut, menjaga kerahasiaan data sesuai pakta integritas perusahaan, dan mengingatkan rekan Anda tentang larangan konflik kepentingan",
      "Memberikan informasi secara lisan tanpa memberikan salinan dokumen resmi",
      "Meminta kompensasi bagian keuntungan dari vendor jika rekan Anda menang",
      "Menghindar dan membiarkan rekan Anda mencuri lihat dokumen di komputer Anda",
      "Marah besar dan memutuskan hubungan pertemanan seketika di ruang kerja",
    ],
    exp: "Pilar Amanah menuntut integritas etis menjaga kerahasiaan informasi perusahaan tanpa kompromi.",
  },
  {
    sub: "jejaring-kerja",
    stem: "Kolaboratif (Membangun kerja sama yang sinergis): Dua divisi dalam BUMN Anda sering berselisih paham mengenai kepemilikan data pelanggan, sehingga menghambat peluncuran produk digital bersama. Sebagai PIC proyek, Anda...",
    opts: [
      "Menginisiasi forum koordinasi intensif, menyusun protokol integrasi data terpadu (single source of truth), serta menyepakati pembagian KPI keberhasilan bersama",
      "Memilih memihak pada divisi Anda sendiri dan mengabaikan masukan divisi mitra",
      "Membatalkan peluncuran produk digital dan menunggu salah satu divisi dibubarkan",
      "Melaporkan kelemahan divisi lain langsung ke dewan direksi untuk mencari kambing hitam",
      "Mengerjakan integrasi data secara diam-diam tanpa memberitahu kedua divisi",
    ],
    exp: "Pilar Kolaboratif mengedepankan sinergi lintas fungsi dan solusi integratif yang saling menguntungkan.",
  },
];

for (let i = 0; i < 35; i++) {
  const base = tkp8Bases[i % tkp8Bases.length];
  const num = (i + 1).toString().padStart(3, "0");
  const permOptions: ("A" | "B" | "C" | "D" | "E")[] = [
    ["B", "A", "C", "D", "E"],
    ["A", "D", "B", "C", "E"],
    ["C", "A", "B", "E", "D"],
    ["D", "B", "A", "C", "E"],
    ["E", "A", "D", "B", "C"],
  ][i % 5] as ("A" | "B" | "C" | "D" | "E")[];

  batch8Questions.push(
    makeTkp(
      `tkp-b8-${num}`,
      "batch-8",
      8,
      base.sub,
      `[Core Values AKHLAK #${i + 1}] ${base.stem}`,
      base.opts as [string, string, string, string, string],
      base.exp,
      2,
      "Core Values AKHLAK BUMN Standar Kementerian BUMN",
      permOptions
    )
  );
}

console.log(`Prepared Batch 8: ${batch8Questions.length} questions.`);

export { batch8Questions };
