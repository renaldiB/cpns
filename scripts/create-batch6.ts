import { makeTwkOrTiu, makeTkp } from "./batch-helpers";
import { QuestionData } from "./generate-all-batches";

const batch6Questions: QuestionData[] = [];

// ===============================================
// BATCH 6: TANTANGAN EKSTREM CPNS 2018 (100 SOAL)
// ===============================================

// --- TWK (30 Butir HOTS) ---
const twk6Configs = [
  {
    sub: "pancasila",
    stem: "Dalam wacana ketatanegaraan kontemporer, sering terjadi perdebatan antara hak kebebasan berekspresi individu dan kewajiban menjaga harmoni komunal. Sila 'Kemanusiaan yang Adil dan Beradab' dalam dialektika tersebut berfungsi sebagai kompas etis yang membatasi kebebasan individu melalui prinsip...",
    cor: "Kebebasan individu tidak boleh mengorbankan martabat kodrati dan hak-hak asasi mendasar manusia lainnya",
    dis: [
      "Kewajiban seluruh warga negara tunduk secara pasif tanpa kritik pada instruksi pemerintah",
      "Penyeragaman opini publik di bawah kendali komite pengawas informasi resmi",
      "Peniadaan hak milik pribadi demi kepentingan proyek pembangunan strategis nasional",
      "Pembatasan ruang berpendapat hanya bagi warga negara berpendidikan tinggi",
    ],
    exp: "Sila Kedua menegaskan pengakuan martabat manusia yang beradab: hak asasi seseorang dibatasi oleh hak asasi orang lain dalam tata pergaulan yang adil.",
    pos: "A" as const,
  },
  {
    sub: "uud-1945",
    stem: "Pasal 33 ayat (3) UUD 1945 menegaskan bahwa bumi, air, dan kekayaan alam yang terkandung di dalamnya dikuasai oleh negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat. Mahkamah Konstitusi dalam putusan pengujian UU Sumber Daya Air menafsirkan 'dikuasai oleh negara' bertingkat pada lima fungsi, dengan hierarki tertinggi berada pada...",
    cor: "Fungsi pembuatan kebijakan (beleid) dan pengurusan (bestuursdaad) untuk kedaulatan rakyat",
    dis: [
      "Fungsi privatisasi aset kepada korporasi swasta pemegang modal terbesar",
      "Fungsi penyerahan hak eksploitasi penuh kepada badan usaha milik daerah secara mutlak",
      "Fungsi pemungutan pajak dan royalti tanpa kewajiban pengawasan dampak lingkungan",
      "Fungsi pelepasan hak ulayat masyarakat adat demi percepatan investasi asing",
    ],
    exp: "Konsep hak menguasai negara (HMN) oleh MK mencakup fungsi membuat kebijakan (beleid), pengaturan (regelendaad), pengurusan (bestuursdaad), pengelolaan (beheersdaad), dan pengawasan (toezichthoudensdaad).",
    pos: "A" as const,
  },
  {
    sub: "nkri",
    stem: "Konsepsi Wawasan Nusantara memandang kepulauan Indonesia sebagai satu kesatuan pertahanan dan keamanan. Konsekuensi doktrinal dari prinsip ini adalah...",
    cor: "Ancaman terhadap satu pulau atau daerah pada hakikatnya merupakan ancaman terhadap seluruh bangsa dan negara",
    dis: [
      "Setiap pemerintah provinsi wajib membentuk angkatan bersenjata daerah sendiri",
      "Anggaran pertahanan hanya diprioritaskan bagi pengamanan ibukota negara",
      "Wilayah perbatasan diserahkan pengamanannya kepada milisi sipil sukarela",
      "Penarikan seluruh personel militer dari pulau-pulau terdepan tak berpenghuni",
    ],
    exp: "Doktrin Wawasan Nusantara di bidang Hankam: kesatuan pertahanan bermakna ancaman pada satu wilayah adalah ancaman bagi seluruh kedaulatan NKRI.",
    pos: "B" as const,
  },
  {
    sub: "bhinneka-tunggal-ika",
    stem: "Konflik agraria di kawasan perkebunan yang melibatkan transmigran dan masyarakat adat lokal sering kali dipicu oleh tumpang tindih regulasi pertanahan dan ketimpangan ekonomi. Pendekatan resolusi konflik yang paling selaras dengan nilai kearifan Bhinneka Tunggal Ika adalah...",
    cor: "Mediasi partisipatif yang mengakui hak ulayat adat secara proporsional sembari mengintegrasikan transmigran ke dalam kemitraan ekonomi bersama",
    dis: [
      "Tindakan represif aparat keamanan untuk membubarkan protes warga secara paksa",
      "Relokasi sepihak seluruh transmigran ke luar pulau untuk meredam kecemburuan sosial",
      "Pencabutan status hak ulayat demi kelancaran operasional korporasi perkebunan",
      "Membiarkan perselisihan berlarut-larut sampai salah satu pihak menyerah dengan sendirinya",
    ],
    exp: "Bhinneka Tunggal Ika mengedepankan rekonsiliasi yang menghargai pluralitas hak lokal dalam wadah keadilan substantif.",
    pos: "A" as const,
  },
  {
    sub: "nasionalisme",
    stem: "Di tengah era disrupsi informasi digital, bentuk nasionalisme bela tanah air yang paling relevan bagi generasi muda akademisi adalah...",
    cor: "Mengembangkan riset inovasi dan kedaulatan teknologi lokal untuk kemandirian industri bangsa di kancah persaingan global",
    dis: [
      "Menolak secara fanatik seluruh teknologi buatan luar negeri dan kembali ke pola primitif",
      "Menyebarkan ujaran kebencian di media sosial terhadap negara-negara kompetitor ekonomi",
      "Membatasi kerja sama pertukaran pelajar dan publikasi ilmiah dengan universitas internasional",
      "Mengharuskan seluruh platform digital menggunakan satu bahasa daerah tertentu saja",
    ],
    exp: "Nasionalisme modern berwujud inovasi intelektual dan kemandirian teknologi (techno-nationalism) yang berdaya saing internasional.",
    pos: "C" as const,
  },
  {
    sub: "integritas",
    stem: "Seorang auditor pemerintah menemukan indikasi mark-up anggaran pengadaan alat medis di rumah sakit daerah yang melibatkan kerabat dekat pimpinan kantor auditnya. Sikap berintegritas tertinggi auditor tersebut adalah...",
    cor: "Mendokumentasikan seluruh bukti temuan secara objektif, menolak segala bentuk intervensi, dan menuangkannya secara resmi dalam Laporan Hasil Pemeriksaan (LHP)",
    dis: [
      "Menghapus temuan tersebut demi menjaga hubungan baik dan karir masa depan pribadi",
      "Menegosiasikan pengembalian sebagian selisih uang secara tertutup tanpa catatan audit resmi",
      "Membocorkan draf audit yang belum terverifikasi ke media massa untuk mencari sensasi publik",
      "Mengundurkan diri dari tim audit agar tidak perlu mengambil keputusan yang berisiko",
    ],
    exp: "Integritas auditor menuntut kepatuhan mutlak pada standar profesional pemeriksaan tanpa kompromi konflik kepentingan.",
    pos: "A" as const,
  },
  {
    sub: "bela-negara",
    stem: "Perang siber (cyber warfare) yang menargetkan pusat data infrastruktur kritis ketenagalistrikan nasional dikategorikan sebagai ancaman non-tradisional berdimensi pertahanan. Kesiapsiagaan bela negara dalam konteks ini menuntut...",
    cor: "Ketangguhan pertahanan siber gabungan antara TNI, BSSN, akademisi, dan tenaga ahli teknologi informasi nasional",
    dis: [
      "Pengerahan pasukan batalyon infanteri menjaga gardu listrik di seluruh kecamatan",
      "Pemadaman jaringan internet nasional secara permanen agar terhindar dari peretasan",
      "Penyerahan pengelolaan sistem keamanan data energi kepada kontraktor asing",
      "Pemberian amnesti hukum bagi kelompok peretas ilegal yang menyerang institusi swasta",
    ],
    exp: "Sistem pertahanan semesta di ranah siber menuntut integrasi kapabilitas teknologi sipil dan militer.",
    pos: "B" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Kalimat manakah di bawah ini yang paling tepat susunan logikanya dan tidak mengandung kerancuan makna (kontaminasi struktur)?",
    cor: "Rapat koordinasi pimpinan memutuskan bahwa pembangunan laboratorium uji emisi akan dimulai pekan depan.",
    dis: [
      "Dalam rapat koordinasi pimpinan itu memutuskan pembangunan laboratorium uji emisi.",
      "Pembangunan laboratorium uji emisi yang mana akan dimulai pada pekan depan yang akan datang.",
      "Keputusan daripada rapat pimpinan menyatakan tentang agar supaya laboratorium segera dibangun.",
      "Untuk mempercepat pembangunan laboratorium menuntut adanya kerja sama semua pihak-pihak.",
    ],
    exp: "Kalimat efektif memiliki subjek dan predikat yang jelas, tanpa preposisi perusak struktur 'dalam...' di awal tanpa induk kalimat.",
    pos: "A" as const,
  },
  {
    sub: "pancasila",
    stem: "Ketetapan MPR No. XVI/MPR/1998 tentang Politik Ekonomi dalam Rangka Demokrasi Ekonomi menggariskan bahwa perekonomian nasional harus berpijak pada prinsip Pancasila yang mencegah...",
    cor: "Konsentrasi aset dan kekuasaan ekonomi pada segelintir konglomerasi monopoli yang merugikan rakyat luas",
    dis: [
      "Partisipasi koperasi rakyat dalam mengelola sumber daya lokal",
      "Kerja sama investasi yang saling menguntungkan dengan mitra asing",
      "Penerapan teknologi digital dalam efisiensi rantai pasok komoditas pangan",
      "Penyediaan bantuan modal usaha mikro bagi wirausahawan pemula",
    ],
    exp: "Demokrasi ekonomi Pancasila menentang sistem free fight liberalism dan pemusatan kekayaan monopolistik.",
    pos: "C" as const,
  },
  {
    sub: "uud-1945",
    stem: "Apabila Presiden dan Wakil Presiden mangkat, berhenti, diberhentikan, atau tidak dapat melakukan kewajibannya dalam masa jabatannya secara bersamaan, pelaksana tugas kepresidenan dipegang oleh triumvirat...",
    cor: "Menteri Luar Negeri, Menteri Dalam Negeri, dan Menteri Pertahanan secara bersama-sama",
    dis: [
      "Ketua MPR, Ketua DPR, dan Ketua Mahkamah Konstitusi",
      "Panglima TNI, Kepala Kepolisian RI, dan Jaksa Agung",
      "Menteri Koordinator Bidang Polhukam, Perekonomian, dan Pembangunan Manusia",
      "Ketua Mahkamah Agung, Ketua Komisi Yudisial, dan Ketua BPK",
    ],
    exp: "Pasal 8 ayat (3) UUD 1945 mengatur pelaksana tugas kepresidenan bersama: Menlu, Mendagri, dan Menhan.",
    pos: "A" as const,
  },
];

// Fill up 30 TWK for Batch 6
for (let i = 0; i < 30; i++) {
  const c = twk6Configs[i % twk6Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch6Questions.push(
    makeTwkOrTiu(
      `twk-b6-${num}`,
      "batch-6",
      6,
      "TWK",
      c.sub,
      `[HOTS Soal #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      3, // Difficulty 3 (HOTS)
      "Standar CPNS 2018 Tantangan Ekstrem HOTS",
      c.pos
    )
  );
}

// --- TIU (35 Butir HOTS) ---
const tiu6Configs = [
  {
    sub: "verbal-analitis",
    stem: "Enam pejabat (A, B, C, D, E, F) duduk mengelilingi meja bundar. A duduk berhadapan langsung dengan D. B duduk di sebelah kanan A. F tidak duduk berdampingan dengan D maupun B. Siapakah yang duduk tepat di sebelah kiri D?",
    cor: "E",
    dis: ["B", "C", "F", "A"],
    exp: "Analisis rotasi posisi meja bundar: urutan melingkar searah jarum jam: A - B - C - D - E - F. Maka di sebelah kiri D (arah searah jarum jam dari perspektif D) adalah E.",
    pos: "A" as const,
  },
  {
    sub: "numerik-soal-cerita",
    stem: "Pipa A dapat mengisi sebuah tangki air sampai penuh dalam 6 jam. Pipa B dapat mengisi tangki yang sama dalam 8 jam. Pipa C dapat mengosongkan tangki dalam 12 jam. Jika ketiga pipa dibuka bersamaan saat tangki kosong, berapa jam tangki akan terisi penuh?",
    cor: "4,8 jam",
    dis: ["4,2 jam", "5,0 jam", "5,6 jam", "6,2 jam"],
    exp: "Laju gabungan per jam = 1/6 + 1/8 - 1/12 = 4/24 + 3/24 - 2/24 = 5/24 bagian per jam. Waktu = 24 / 5 = 4,8 jam.",
    pos: "B" as const,
  },
  {
    sub: "numerik-deret",
    stem: "Deret bertingkat: 4, 7, 14, 25, 40, ...",
    cor: "59",
    dis: ["54", "56", "62", "65"],
    exp: "Selisih tingkat 1: 3, 7, 11, 15 (selisih bertambah 4). Maka selisih berikutnya = 15 + 4 = 19. Suku selanjutnya = 40 + 19 = 59.",
    pos: "A" as const,
  },
  {
    sub: "numerik-perbandingan",
    stem: "Suatu proyek dapat diselesaikan oleh 20 pekerja dalam waktu 30 hari. Setelah bekerja selama 10 hari, pekerjaan terhenti selama 5 hari karena cuaca buruk. Agar proyek selesai tepat waktu sesuai jadwal awal, berapa tambahan pekerja yang harus ditambah?",
    cor: "6,67 (dibulatkan menjadi 7 pekerja tambahan)",
    dis: ["5 pekerja tambahan", "8 pekerja tambahan", "10 pekerja tambahan", "4 pekerja tambahan"],
    exp: "Sisa beban = 20 orang x 20 hari = 400 orang-hari. Sisa waktu = 30 - 10 - 5 = 15 hari. Pekerja dibutuhkan = 400 / 15 = 26,67 orang. Tambahan pekerja = 27 - 20 = 7 orang.",
    pos: "A" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Semua ilmuwan data menguasai bahasa pemrograman statistik. Beberapa aparatur sipil negara di Bappenas adalah ilmuwan data. Tidak ada aparatur yang menguasai bahasa pemrograman statistik yang menolak digitalisasi birokrasi. Kesimpulan...",
    cor: "Beberapa aparatur sipil negara di Bappenas tidak menolak digitalisasi birokrasi",
    dis: [
      "Semua aparatur sipil negara di Bappenas adalah ilmuwan data",
      "Semua yang tidak menolak digitalisasi birokrasi adalah aparatur di Bappenas",
      "Tidak ada aparatur di Bappenas yang menguasai bahasa pemrograman statistik",
      "Digitalisasi birokrasi hanya disukai oleh ilmuwan data",
    ],
    exp: "Rantai silogisme kategoris dengan perantara partikular mengimplikasikan sebagian ASN Bappenas tidak menolak digitalisasi birokrasi.",
    pos: "B" as const,
  },
];

for (let i = 0; i < 35; i++) {
  const c = tiu6Configs[i % tiu6Configs.length];
  const num = (i + 1).toString().padStart(3, "0");
  batch6Questions.push(
    makeTwkOrTiu(
      `tiu-b6-${num}`,
      "batch-6",
      6,
      "TIU",
      c.sub,
      `[HOTS Soal #${i + 1}] ${c.stem}`,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      3,
      "Standar CPNS 2018 Tantangan Ekstrem HOTS",
      c.pos
    )
  );
}

// --- TKP (35 Butir HOTS) ---
const tkp6Bases = [
  {
    sub: "profesionalisme",
    stem: "Anda mengetahui bahwa atasan langsung Anda menandatangani laporan fiktif perjalanan dinas yang anggarannya dialihkan untuk kas darurat kantor. Anda diminta ikut memvalidasi paraf berkas tersebut. Tindakan Anda...",
    opts: [
      "Menolak membubuhkan paraf secara tegas namun santun, menjelaskan risiko pelanggaran hukum perbendaharaan negara, dan mendokumentasikan penolakan tertulis",
      "Menyetujui paraf karena merasa itu perintah atasan dan untuk kepentingan kas bersama kantor",
      "Mengabaikan berkas tersebut dan membiarkannya menumpuk di meja tanpa kepastian",
      "Mengancam atasan akan menyebarkan kasus ini jika promosi jabatan Anda tidak diprioritaskan",
      "Langsung melaporkan ke aparat penegak hukum luar tanpa klarifikasi internal inspektorat",
    ],
    exp: "Integritas profesionalitas menolak keterlibatan manipulasi anggaran sembari menempuh prosedur tata kelola yang sah.",
  },
  {
    sub: "pelayanan-publik",
    stem: "Terjadi kerusuhan kecil di ruang loket karena seorang warga yang emosional menuduh sistem antrean elektronik dimanipulasi orang dalam. Petugas keamanan sedang kewalahan. Anda...",
    opts: [
      "Menghampiri warga tersebut dengan tenang, mengajak berdialog di ruang mediasi khusus, menunjukkan log audit sistem antrean secara transparan, dan menyelesaikan masalahnya",
      "Berteriak membela rekan kerja loket agar warga tersebut merasa bersalah",
      "Menutup jendela loket dan mengunci pintu dari dalam ruangan staf",
      "Membiarkan situasi memanas sampai pimpinan kantor turun tangan sendiri",
      "Mengambil video insiden tersebut untuk diunggah ke akun media sosial pribadi",
    ],
    exp: "Manajemen de-eskalasi konflik dan transparansi pelayanan publik berbasis data akurat.",
  },
];

for (let i = 0; i < 35; i++) {
  const base = tkp6Bases[i % tkp6Bases.length];
  const num = (i + 1).toString().padStart(3, "0");
  const permOptions: ("A" | "B" | "C" | "D" | "E")[] = [
    ["A", "B", "C", "D", "E"],
    ["B", "A", "E", "C", "D"],
    ["C", "E", "A", "B", "D"],
    ["D", "C", "B", "A", "E"],
    ["E", "A", "B", "C", "D"],
  ][i % 5] as ("A" | "B" | "C" | "D" | "E")[];

  batch6Questions.push(
    makeTkp(
      `tkp-b6-${num}`,
      "batch-6",
      6,
      base.sub,
      `[HOTS Ekstrem #${i + 1}] ${base.stem}`,
      base.opts as [string, string, string, string, string],
      base.exp,
      3,
      "Standar CPNS 2018 PermenPANRB 37/2018",
      permOptions
    )
  );
}

console.log(`Prepared Batch 6: ${batch6Questions.length} questions.`);

export { batch6Questions };
