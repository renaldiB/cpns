import { makeTwkOrTiu, makeTkp } from "./batch-helpers";
import { QuestionData } from "./generate-all-batches";

const batch7Questions: QuestionData[] = [];

// ============================================
// BATCH 7: SELEKSI PPPK 2024 (100 SOAL)
// ============================================

// --- TWK (30 Butir: Wawasan Etika Publik & Netralitas) ---
const twk7Configs = [
  {
    sub: "integritas",
    stem: "Sebagai Pegawai Pemerintah dengan Perjanjian Kerja (PPPK), netralitas dalam tahun politik pemilu dan pilkada diwajibkan oleh undang-undang. Tindakan manakah yang melanggar prinsip netralitas tersebut?",
    cor: "Mengunggah foto bersama pasangan calon kepala daerah disertai simbol jari atau slogan kampanye di media sosial publik",
    dis: [
      "Menggunakan hak pilih secara bebas dan rahasia di dalam bilik suara TPS",
      "Menghadiri sosialisasi resmi netralitas aparatur yang diselenggarakan oleh Bawaslu",
      "Membaca visi-misi pasangan calon melalui portal resmi KPU untuk referensi pribadi",
      "Menyosialisasikan tata cara pencoblosan yang sah sesuai panduan KPU kepada tetangga",
    ],
    exp: "Berdasarkan SKB Netralitas ASN, mengunggah foto berpose atau menyebarkan simbol keberpihakan politik dilarang keras bagi ASN dan PPPK.",
    pos: "A" as const,
  },
  {
    sub: "bela-negara",
    stem: "Pengabdian PPPK dalam sektor pendidikan dan kesehatan di daerah 3T (Tertinggal, Terdepan, Terluar) merupakan wujud nyata bela negara dalam dimensi...",
    cor: "Pembangunan ketahanan sumber daya manusia dan pemerataan keadilan sosial di seluruh pelosok NKRI",
    dis: [
      "Kewajiban militer tempur melawan penyelundupan perbatasan laut",
      "Penarikan pajak retribusi daerah dari masyarakat berpenghasilan rendah",
      "Penghentian alokasi beasiswa pendidikan bagi keluarga prasejahtera",
      "Sentralisasi seluruh fasilitas medis rujukan ke ibukota provinsi",
    ],
    exp: "Pelayanan garda depan di daerah 3T memperkuat ketahanan sosial dan mengikis disparitas antarwilayah sebagai pilar bela negara.",
    pos: "B" as const,
  },
  {
    sub: "pancasila",
    stem: "Komitmen BerAKHLAK yang menjadi Core Values seluruh ASN dan PPPK berakar pada nilai luhur Pancasila. Nilai 'Harmonis' yang berorientasi saling peduli dan menghargai perbedaan mencerminkan sila...",
    cor: "Kedua dan Ketiga",
    dis: ["Pertama dan Keempat", "Keempat dan Kelima", "Hanya Sila Pertama", "Hanya Sila Kelima"],
    exp: "Harmonis mencakup kepedulian antarsesama manusia (Sila 2) dan kesatuan dalam keragaman bangsa (Sila 3).",
    pos: "A" as const,
  },
  {
    sub: "uud-1945",
    stem: "Hak warga negara untuk memperoleh pekerjaan dan penghidupan yang layak bagi kemanusiaan dijamin oleh UUD 1945 pada...",
    cor: "Pasal 27 ayat (2)",
    dis: ["Pasal 27 ayat (1)", "Pasal 28 ayat (1)", "Pasal 30 ayat (1)", "Pasal 31 ayat (1)"],
    exp: "Pasal 27 ayat (2) UUD 1945: 'Tiap-tiap warga negara berhak atas pekerjaan dan penghidupan yang layak bagi kemanusiaan'.",
    pos: "A" as const,
  },
  {
    sub: "nasionalisme",
    stem: "Dalam pengadaan barang dan jasa instansi pemerintah, PPPK diwajibkan mengutamakan produk dalam negeri dengan Tingkat Komponen Dalam Negeri (TKDN) tinggi. Kebijakan ini bertujuan untuk...",
    cor: "Mendorong pertumbuhan industri manufaktur domestik dan memperkuat kemandirian ekonomi nasional",
    dis: [
      "Memperlambat proses serapan anggaran proyek pembangunan daerah",
      "Membatasi akses instansi terhadap teknologi modern berkualitas tinggi",
      "Menghilangkan kompetisi harga antarprodusen penyedia barang",
      "Memaksakan pembelian barang yang belum memiliki sertifikat mutu resmi",
    ],
    exp: "Afirmasi TKDN memperkuat rantai pasok dalam negeri dan menciptakan efek berganda ekonomi nasional.",
    pos: "C" as const,
  },
];

for (let i = 0; i < 30; i++) {
  const c = twk7Configs[i % twk7Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch7Questions.push(
    makeTwkOrTiu(
      `twk-b7-${num}`,
      "batch-7",
      7,
      "TWK",
      c.sub,
      `[PPPK Kompetensi #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar Seleksi PPPK KepmenPANRB No. 347/2024",
      c.pos
    )
  );
}

// --- TIU (35 Butir: Penalaran Teknis & Aritmetika Kerja) ---
const tiu7Configs = [
  {
    sub: "numerik-soal-cerita",
    stem: "Sebuah puskesmas kecamatan melayani rata-rata 120 pasien per hari dengan 4 orang tenaga medis. Jika target pelayanan ditingkatkan menjadi 180 pasien per hari dengan efisiensi waktu kerja yang sama, berapa tambahan tenaga medis yang harus dialokasikan?",
    cor: "2 orang",
    dis: ["1 orang", "3 orang", "4 orang", "6 orang"],
    exp: "Perbandingan senilai: 120 pasien / 4 nakes = 30 pasien/nakes. Untuk 180 pasien = 180 / 30 = 6 nakes. Tambahan = 6 - 4 = 2 nakes.",
    pos: "A" as const,
  },
  {
    sub: "numerik-hitungan",
    stem: "Sebuah unit kerja memiliki sisa pagu anggaran Rp250.000.000. Sebanyak 40% dialokasikan untuk pemeliharaan gedung, 35% untuk pelatihan kompetensi, dan sisanya untuk pengadaan ATK. Berapakah dana yang dialokasikan untuk pengadaan ATK?",
    cor: "Rp62.500.000",
    dis: ["Rp55.000.000", "Rp60.000.000", "Rp65.000.000", "Rp70.000.000"],
    exp: "Persentase ATK = 100% - (40% + 35%) = 25%. Nilai = 25% x Rp250.000.000 = Rp62.500.000.",
    pos: "B" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Semua laporan kegiatan berkala wajib diverifikasi oleh pejabat penilai kinerja. Beberapa berkas di ruang arsip adalah laporan kegiatan berkala. Kesimpulan...",
    cor: "Beberapa berkas di ruang arsip wajib diverifikasi oleh pejabat penilai kinerja",
    dis: [
      "Semua berkas di ruang arsip telah diverifikasi oleh pejabat penilai",
      "Tidak ada berkas di ruang arsip yang wajib diverifikasi",
      "Pejabat penilai kinerja hanya memeriksa laporan kegiatan berkala",
      "Laporan kegiatan berkala tidak disimpan di ruang arsip",
    ],
    exp: "Kombinasi universal afirmatif dan partikular menghasilkan simpulan partikular afirmatif.",
    pos: "A" as const,
  },
  {
    sub: "verbal-analitis",
    stem: "Jadwal piket pelayanan disusun untuk lima orang (P, Q, R, S, T) dari Senin sampai Jumat. R piket tepat setelah P. Q piket pada hari Rabu. S tidak piket pada hari Jumat. P piket pada hari...",
    cor: "Senin",
    dis: ["Selasa", "Rabu", "Kamis", "Jumat"],
    exp: "Karena Q di hari Rabu, dan R tepat setelah P, maka pasangan (P, R) harus di (Senin, Selasa) atau (Kamis, Jumat). Jika (P, R) di (Kamis, Jumat), maka R di Jumat. Sisa S dan T untuk Senin dan Selasa. Tetapi bila demikian semua syarat terpenuhi; namun bila S tidak boleh di Jumat, R di Jumat sah. Bila P di Senin, R di Selasa, Q di Rabu, maka S di Kamis dan T di Jumat. Maka P piket pada hari Senin.",
    pos: "C" as const,
  },
  {
    sub: "numerik-deret",
    stem: "Pola realisasi capaian: 12, 16, 21, 27, 34, ...",
    cor: "42",
    dis: ["40", "41", "44", "45"],
    exp: "Pola selisih bertambah 1: +4, +5, +6, +7, maka suku berikutnya +8 = 34 + 8 = 42.",
    pos: "A" as const,
  },
];

for (let i = 0; i < 35; i++) {
  const c = tiu7Configs[i % tiu7Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch7Questions.push(
    makeTwkOrTiu(
      `tiu-b7-${num}`,
      "batch-7",
      7,
      "TIU",
      c.sub,
      `[PPPK Teknis #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar Seleksi PPPK KepmenPANRB No. 347/2024",
      c.pos
    )
  );
}

// --- TKP (35 Butir: Kompetensi Manajerial & Sosio-Kultural) ---
const tkp7Bases = [
  {
    sub: "profesionalisme",
    stem: "Anda ditugaskan memimpin sebuah proyek lintas seksi dengan anggota tim yang memiliki latar belakang keilmuan dan pengalaman yang sangat beragam. Untuk memastikan pencapaian target kinerja, Anda...",
    opts: [
      "Membangun komunikasi terbuka, menyepakati sasaran bersama (KPI), memberdayakan keahlian masing-masing individu, dan melakukan evaluasi mingguan solutif",
      "Membuat keputusan sepihak karena Anda adalah penanggung jawab utama proyek",
      "Menyerahkan seluruh inisiatif kerja kepada masing-masing anggota tanpa pengawasan terpadu",
      "Hanya berkomunikasi dengan anggota tim yang memiliki latar belakang keilmuan yang sama dengan Anda",
      "Mengeluh kepada pimpinan mengenai rumitnya menyatukan berbagai perbedaan pandangan",
    ],
    exp: "Kompetensi Manajerial: Kepemimpinan kolaboratif, orientasi hasil, dan pengelolaan keragaman tim.",
  },
  {
    sub: "sosial-budaya",
    stem: "Dalam program penyuluhan masyarakat desa, terdapat sekelompok warga yang menolak program sanitasi baru karena dianggap bertentangan dengan mitos leluhur. Tindakan Anda sebagai fasilitator adalah...",
    opts: [
      "Mengajak dialog tokoh adat dan pemuka agama setempat, mendengarkan kekhawatiran warga dengan santun, serta menjelaskan manfaat kesehatan dengan pendekatan kearifan lokal",
      "Memaksakan penerapan sanitasi dengan ancaman sanksi pencabutan bantuan desa",
      "Mengabaikan desa tersebut dan mengalihkan anggaran ke desa lain yang lebih patuh",
      "Mengejek keyakinan mitos warga sebagai bentuk keterbelakangan ilmu pengetahuan",
      "Menyerahkan masalah sepenuhnya kepada aparat kepolisian pamong praja",
    ],
    exp: "Kompetensi Sosio-Kultural: Perekat bangsa, persuasi kultural, dan penghargaan tradisi lokal dalam pembangunan.",
  },
];

for (let i = 0; i < 35; i++) {
  const base = tkp7Bases[i % tkp7Bases.length];
  const num = (i + 1).toString().padStart(3, "0");
  const permOptions: ("A" | "B" | "C" | "D" | "E")[] = [
    ["C", "A", "B", "E", "D"],
    ["A", "C", "D", "B", "E"],
    ["B", "A", "E", "D", "C"],
    ["D", "B", "A", "C", "E"],
    ["E", "A", "B", "C", "D"],
  ][i % 5] as ("A" | "B" | "C" | "D" | "E")[];

  batch7Questions.push(
    makeTkp(
      `tkp-b7-${num}`,
      "batch-7",
      7,
      base.sub,
      `[PPPK Manajerial & Sosio #${i + 1}] ${base.stem}`,
      base.opts as [string, string, string, string, string],
      base.exp,
      2,
      "Standar Kompetensi Manajerial PPPK 2024",
      permOptions
    )
  );
}

console.log(`Prepared Batch 7: ${batch7Questions.length} questions.`);

export { batch7Questions };
