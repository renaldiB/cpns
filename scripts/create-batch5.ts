import { makeTwkOrTiu, makeTkp } from "./batch-helpers";
import { QuestionData } from "./generate-all-batches";

const batch5Questions: QuestionData[] = [];

// ==========================================
// BATCH 5: ARSIP HISTORIS CPNS 2019 (100 SOAL)
// ==========================================

// --- TWK (30 Butir) ---
const twkConfigs = [
  // Pancasila (5)
  {
    sub: "pancasila",
    stem: "Pada era awal kemerdekaan, Pancasila diuji oleh berbagai pemberontakan ideologis. Pemberontakan PKI Madiun 1948 yang dipimpin Musso bertujuan untuk...",
    cor: "Mengganti landasan falsafah Pancasila dengan ideologi komunisme serta mendirikan Republik Soviet Indonesia",
    dis: [
      "Mengembalikan kekuasaan penjajahan Belanda melalui agresi militer",
      "Mendirikan negara Islam berdasarkan syariat di wilayah Jawa Timur",
      "Menuntut otonomi khusus bagi tentara laskar rakyat daerah",
      "Mempertahankan bentuk negara federasi bentukan Van Mook",
    ],
    exp: "Pemberontakan PKI Madiun 1948 bertujuan meruntuhkan NKRI berlandaskan Pancasila untuk digantikan Republik Soviet Indonesia yang berhaluan komunis.",
    pos: "A" as const,
  },
  {
    sub: "pancasila",
    stem: "Pancasila sebagai ideologi terbuka memiliki dimensi realitas, idealisme, dan fleksibilitas. Dimensi fleksibilitas mengandung arti bahwa...",
    cor: "Pancasila memiliki keluwesan yang memungkinkan pengembangan pemikiran baru yang relevan tanpa mengubah nilai dasarnya",
    dis: [
      "Pancasila dapat diubah isi silanya sesuai dengan kehendak mayoritas parlemen",
      "Pancasila menerima seluruh ideologi asing tanpa adanya proses penyaringan",
      "Pancasila tunduk pada kesepakatan konvensi hukum internasional",
      "Pancasila memberikan kebebasan mutlak bagi setiap warga tanpa batasan hukum",
    ],
    exp: "Dimensi fleksibilitas mencerminkan keterbukaan ideologi dalam merespons dinamika zaman melalui penafsiran instrumental yang konsisten dengan nilai dasar.",
    pos: "B" as const,
  },
  {
    sub: "pancasila",
    stem: "Sikap menghargai hasil karya orang lain yang bermanfaat bagi kemajuan dan kesejahteraan bersama merupakan butir pengamalan Pancasila pada sila...",
    cor: "Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    dis: [
      "Ketuhanan Yang Maha Esa",
      "Kemanusiaan yang Adil dan Beradab",
      "Persatuan Indonesia",
      "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    ],
    exp: "Menghargai hasil karya orang lain tercantum secara eksplisit dalam butir-butir pengamalan Sila Kelima Pancasila.",
    pos: "A" as const,
  },
  {
    sub: "pancasila",
    stem: "Penyelenggaraan pemilu yang langsung, umum, bebas, rahasia, jujur, dan adil merupakan manifestasi konkret dari nilai Pancasila sila...",
    cor: "Keempat",
    dis: ["Pertama", "Kedua", "Ketiga", "Kelima"],
    exp: "Pemilu demokratis merupakan perwujudan kedaulatan rakyat pada Sila Keempat.",
    pos: "A" as const,
  },
  {
    sub: "pancasila",
    stem: "Konsep gotong royong yang digagas Ir. Soekarno dalam sidang BPUPKI hakikatnya adalah perasan dari kelima sila Pancasila yang mencerminkan...",
    cor: "Satu usaha, satu amal, satu pekerjaan berat yang dipikul bersama untuk kebahagiaan seluruh rakyat",
    dis: [
      "Kewajiban warga negara membayar retribusi kerja bakti lingkungan",
      "Sistem kerja paksa untuk percepatan infrastruktur darurat",
      "Kesepakatan pembagian keuntungan usaha milik konglomerasi",
      "Penyeragaman keyakinan spiritual seluruh suku bangsa",
    ],
    exp: "Gotong royong adalah etos dinamis kebersamaan memikul tanggung jawab bangsa secara kolektif.",
    pos: "C" as const,
  },

  // UUD 1945 (5)
  {
    sub: "uud-1945",
    stem: "Berdasarkan Pasal 1 ayat (2) UUD 1945 pasca-amandemen, kedaulatan berada di tangan rakyat dan dilaksanakan menurut...",
    cor: "Undang-Undang Dasar",
    dis: ["Majelis Permusyawaratan Rakyat", "Presiden dan Wakil Presiden", "Dewan Perwakilan Rakyat", "Mahkamah Konstitusi"],
    exp: "Sebelum amandemen kedaulatan dilakukan sepenuhnya oleh MPR, pasca-amandemen dilaksanakan menurut UUD.",
    pos: "A" as const,
  },
  {
    sub: "uud-1945",
    stem: "Lembaga negara yang berwenang menguji undang-undang terhadap Undang-Undang Dasar 1945 adalah...",
    cor: "Mahkamah Konstitusi",
    dis: ["Mahkamah Agung", "Komisi Yudisial", "Badan Pemeriksa Keuangan", "Dewan Perwakilan Daerah"],
    exp: "Pasal 24C ayat (1) UUD 1945 menegaskan wewenang MK menguji UU terhadap UUD.",
    pos: "B" as const,
  },
  {
    sub: "uud-1945",
    stem: "Hak DPR untuk meminta keterangan kepada Pemerintah mengenai kebijakan strategis yang berdampak luas disebut hak...",
    cor: "Interpelasi",
    dis: ["Angket", "Menyatakan Pendapat", "Imunitas", "Protokoler"],
    exp: "Hak interpelasi adalah hak DPR meminta keterangan pemerintah atas kebijakan strategis berdampak luas.",
    pos: "A" as const,
  },
  {
    sub: "uud-1945",
    stem: "Amandemen UUD 1945 berlangsung dalam empat tahap. Tahap pertama disahkan pada Sidang Umum MPR tahun...",
    cor: "1999",
    dis: ["1998", "2000", "2001", "2002"],
    exp: "Amandemen I disahkan 19 Oktober 1999 pada Sidang Umum MPR.",
    pos: "C" as const,
  },
  {
    sub: "uud-1945",
    stem: "Ketentuan mengenai hak asasi manusia diatur secara rinci dalam UUD 1945 pasca-amandemen pada bab...",
    cor: "Bab XA",
    dis: ["Bab IX", "Bab X", "Bab XI", "Bab XII"],
    exp: "Bab XA Pasal 28A sampai 28J mengatur khusus tentang Hak Asasi Manusia.",
    pos: "A" as const,
  },

  // NKRI & Bhinneka Tunggal Ika (5)
  {
    sub: "nkri",
    stem: "Deklarasi Djuanda 13 Desember 1957 memiliki arti penting bagi kedaulatan wilayah NKRI karena berhasil...",
    cor: "Menyatukan laut antarpulau sebagai wilayah perairan pedalaman nasional, bukan lagi laut bebas internasional",
    dis: [
      "Mengusir seluruh armada kapal dagang asing dari perairan Asia Tenggara",
      "Menetapkan batas landas kontinen dasar laut sedalam 200 meter",
      "Membagi perairan kepulauan menjadi zona militer khusus tertutup",
      "Menghentikan kerja sama lintas batas maritim dengan negara tetangga",
    ],
    exp: "Deklarasi Djuanda mengukuhkan Indonesia sebagai negara kepulauan (Archipelagic State) yang menyatukan darat dan laut dalam satu kesatuan utuh.",
    pos: "B" as const,
  },
  {
    sub: "nkri",
    stem: "Tujuan nasional bangsa Indonesia dalam melindungi segenap bangsa dan memajukan kesejahteraan umum termaktub dalam...",
    cor: "Pembukaan UUD 1945 Alinea Keempat",
    dis: [
      "Pembukaan UUD 1945 Alinea Pertama",
      "Pembukaan UUD 1945 Alinea Kedua",
      "Pembukaan UUD 1945 Alinea Ketiga",
      "Batang Tubuh UUD 1945 Pasal 33",
    ],
    exp: "Tujuan nasional dirumuskan pada Alinea IV Pembukaan UUD 1945.",
    pos: "A" as const,
  },
  {
    sub: "bhinneka-tunggal-ika",
    stem: "Semboyan Bhinneka Tunggal Ika dipetik dari karya sastra Kakawin Sutasoma gubahan pujangga besar era Majapahit bernama...",
    cor: "Mpu Tantular",
    dis: ["Mpu Prapanca", "Mpu Sedah", "Mpu Panuluh", "Mpu Gandring"],
    exp: "Kakawin Sutasoma digubah oleh Mpu Tantular pada masa pemerintahan Raja Hayam Wuruk.",
    pos: "B" as const,
  },
  {
    sub: "bhinneka-tunggal-ika",
    stem: "Sikap etnosentrisme yang berlebihan dalam masyarakat multikultural berpotensi membahayakan persatuan karena...",
    cor: "Memandang kebudayaan sukunya lebih unggul secara mutlak dan merendahkan martabat budaya suku lain",
    dis: [
      "Mendorong pelestarian busana adat dan tarian daerah di panggung nasional",
      "Meningkatkan minat generasi muda mempelajari bahasa daerah leluhur",
      "Membuka peluang kerja sama antarorganisasi kebudayaan tradisional",
      "Mendokumentasikan sejarah lisan tetua adat untuk arsip museum",
    ],
    exp: "Etnosentrisme sempit memicu primordialisme dan konflik horizontal antar etnis.",
    pos: "A" as const,
  },
  {
    sub: "nkri",
    stem: "Otonomi daerah di Indonesia diselenggarakan dengan menganut asas desentralisasi yang bertujuan utama untuk...",
    cor: "Meningkatkan kualitas pelayanan publik dan mempercepat kesejahteraan masyarakat di daerah",
    dis: [
      "Mengurangi kewenangan pemerintah pusat dalam urusan pertahanan militer",
      "Membebaskan daerah dari kewajiban mematuhi undang-undang nasional",
      "Membentuk federasi negara bagian yang berdaulat mandiri",
      "Menghapus peran gubernur sebagai wakil pemerintah pusat",
    ],
    exp: "Tujuan desentralisasi dan otonomi daerah adalah akselerasi kesejahteraan dan efisiensi layanan publik.",
    pos: "C" as const,
  },

  // Nasionalisme & Bela Negara (5)
  {
    sub: "nasionalisme",
    stem: "Sumpah Pemuda 28 Oktober 1928 menandai babak baru perjuangan kebangsaan Indonesia karena berhasil mentransformasikan...",
    cor: "Perjuangan kedaerahan yang terkotak-kotak menjadi pergerakan persatuan nasional dengan satu tanah air, bangsa, dan bahasa",
    dis: [
      "Perlawanan bersenjata tradisional menjadi diplomasi rahasia kerajaan",
      "Sistem pendidikan kolonial menjadi sekolah keagamaan tertutup",
      "Penggunaan bahasa Belanda menjadi bahasa serapan regional",
      "Pembagian wilayah kepulauan menjadi protektorat swapraja",
    ],
    exp: "Sumpah Pemuda adalah kristalisasi identitas bersama melampaui sekat primordial kedaerahan.",
    pos: "A" as const,
  },
  {
    sub: "nasionalisme",
    stem: "Nasionalisme Indonesia berwatak kemanusiaan (humanistik) karena menolak paham...",
    cor: "Chauvinisme yang mengagungkan bangsa sendiri secara membabi-buta sembari merendahkan bangsa lain",
    dis: [
      "Patriotisme konstruktif yang menjaga kedaulatan tanah air",
      "Internasionalisme egaliter yang menjalin kerja sama damai",
      "Multikulturalisme yang menghargai keragaman tradisi",
      "Konstitusionalisme yang berpijak pada hukum perundangan",
    ],
    exp: "Chauvinisme adalah nasionalisme sempit agresif yang bertentangan dengan kemanusiaan yang adil dan beradab.",
    pos: "B" as const,
  },
  {
    sub: "bela-negara",
    stem: "Berdasarkan UU No. 23 Tahun 2019, keikutsertaan warga negara dalam upaya bela negara melalui pengabdian sesuai profesi dapat diwujudkan dengan cara...",
    cor: "Melaksanakan tugas pelayanan masyarakat dengan dedikasi tinggi, integritas etis, dan keahlian profesional",
    dis: [
      "Mengikuti wajib militer tempur di perbatasan bagi seluruh pegawai kantor",
      "Membeli senjata pertahanan untuk kepentingan pengamanan lingkungan rumah",
      "Menghindari kritik terhadap kekurangan kebijakan tata kelola dinas",
      "Menyebarkan informasi tanpa konfirmasi sebagai bentuk solidaritas instansi",
    ],
    exp: "Pengabdian sesuai profesi merupakan salah satu pilar implementasi nilai bela negara di lingkungan sipil.",
    pos: "A" as const,
  },
  {
    sub: "bela-negara",
    stem: "Nilai dasar bela negara yang diwujudkan melalui kesiapan mengorbankan waktu, tenaga, dan pikiran demi kemajuan bangsa tercermin dalam sikap...",
    cor: "Rela berkorban untuk bangsa dan negara",
    dis: ["Cinta tanah air", "Sadar berbangsa dan bernegara", "Setia pada Pancasila", "Memiliki kemampuan awal bela negara"],
    exp: "Pengorbanan waktu, tenaga, dan pikiran adalah indikator utama nilai Rela Berkorban.",
    pos: "A" as const,
  },
  {
    sub: "bela-negara",
    stem: "Ancaman nirmiliter yang membahayakan kedaulatan nasional di era globalisasi antara lain berupa...",
    cor: "Penyusupan disinformasi radikal dan perang opini siber yang memecah-belah persatuan",
    dis: [
      "Invasi pasukan bersenjata lintas negara melalui garis pantai",
      "Serangan rudal balistik antarbenua ke pangkalan pertahanan",
      "Pengepungan pelabuhan laut oleh armada kapal perang asing",
      "Pelanggaran zona terbang militer oleh pesawat pengintai supersonik",
    ],
    exp: "Ancaman nirmiliter bersumber dari dimensi ideologi, politik, ekonomi, sosial budaya, dan teknologi informasi.",
    pos: "D" as const,
  },

  // Integritas & Bahasa Indonesia (10)
  {
    sub: "integritas",
    stem: "Seorang ASN menolak pemberian bingkisan berharga dari kontraktor yang sedang mengikuti tender proyek instansi. Tindakan ini mencerminkan prinsip...",
    cor: "Pencegahan gratifikasi yang berpotensi memengaruhi netralitas dan independensi pengambilan keputusan",
    dis: [
      "Ketidaksukaan pribadi terhadap perwakilan pihak swasta terkait",
      "Kekhawatiran bingkisan tersebut tidak sesuai dengan selera pribadi",
      "Sikap arogan aparat birokrasi terhadap mitra kerja rekanan",
      "Kepatuhan parsial yang hanya berlaku saat diawasi pimpinan",
    ],
    exp: "Penolakan gratifikasi tender menegakkan integritas dan mencegah benturan kepentingan (conflict of interest).",
    pos: "A" as const,
  },
  {
    sub: "integritas",
    stem: "Unsur pokok integritas seorang aparatur sipil negara meliputi keselarasan antara...",
    cor: "Hati nurani, perkataan, dan tindakan nyata yang berlandaskan norma moral dan aturan hukum",
    dis: [
      "Instruksi pimpinan dengan kepentingan kelompok partai politik pendukung",
      "Waktu kehadiran fingerprint dengan tunjangan kinerja yang diterima",
      "Gaya hidup pribadi dengan ekspektasi kemewahan lingkaran pergaulan",
      "Komentar di media sosial dengan opini publik yang sedang viral",
    ],
    exp: "Integritas bermakna keutuhan antara keyakinan batin, ucapan lisan, dan perilaku konkret.",
    pos: "B" as const,
  },
  {
    sub: "integritas",
    stem: "Korupsi yang dilakukan dengan menyalahgunakan wewenang jabatan untuk memperkaya diri sendiri atau korporasi melanggar ketentuan pokok...",
    cor: "UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi",
    dis: [
      "UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik",
      "UU No. 25 Tahun 2009 tentang Pelayanan Publik",
      "UU No. 5 Tahun 2014 tentang Aparatur Sipil Negara",
      "UU No. 30 Tahun 2014 tentang Administrasi Pemerintahan",
    ],
    exp: "Delik korupsi penyalahgunaan wewenang diatur dalam UU Tipikor (UU 31/1999 jo. UU 20/2001).",
    pos: "A" as const,
  },
  {
    sub: "integritas",
    stem: "Karakter akuntabel bagi penyelenggara negara menuntut setiap kebijakan dan tindakan dapat...",
    cor: "Dipertanggungjawabkan secara terbuka, terukur, dan sah kepada publik serta otoritas pengawas",
    dis: [
      "Diverifikasi oleh konsultan asing berbayar sebelum diumumkan",
      "Disimpan secara rahasia agar tidak menimbulkan kegaduhan publik",
      "Dialihkan tanggung jawab hukumnya kepada staf pelaksana terendah",
      "Disesuaikan dengan selera opini tren di ruang percakapan virtual",
    ],
    exp: "Akuntabilitas menuntut kewajiban pertanggungjawaban keberhasilan maupun kegagalan program kepada publik.",
    pos: "C" as const,
  },
  {
    sub: "integritas",
    stem: "Whistleblowing system (WBS) dalam tata kelola instansi pemerintahan bertujuan untuk...",
    cor: "Memberikan saluran pelaporan yang aman dan terproteksi atas dugaan pelanggaran hukum atau etika di lingkungan internal",
    dis: [
      "Menyebarkan rumor antarpegawai untuk menciptakan rivalitas kerja",
      "Menilai kepopuleran pejabat eselon melalui voting anonim berkala",
      "Memotong anggaran perjalanan dinas secara otomatis bila target meleset",
      "Menggantikan fungsi audit Badan Pemeriksa Keuangan",
    ],
    exp: "WBS menjamin kerahasiaan dan perlindungan pelapor tindak pidana/etika di instansi.",
    pos: "A" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Penulisan gabungan kata yang tepat sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI/EYD) terdapat pada kalimat...",
    cor: "Pemerintah pusat dan pemerintah daerah harus bekerja sama dalam menuntaskan reforma agraria.",
    dis: [
      "Seluruh pegawai wajib menandatangani surat pertanggung jawaban belanja dinas.",
      "Laporan akhir tahun tersebut telah dilipat gandakan untuk dibagikan kepada peserta rapat.",
      "Pimpinan unit kerja meminta kami menanda-tangani berkas kesepakatan itu.",
      "Kegiatan tata usaha kantor dipusatkan dibagian sarana dan prasarana gedung.",
    ],
    exp: "Gabungan kata 'bekerja sama' ditulis terpisah; 'pertanggungjawaban' dan 'dilipatgandakan' ditulis serangkai bila mendapat awalan dan akhiran sekaligus.",
    pos: "A" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Manakah kalimat berikut yang memenuhi kaidah kalimat efektif?",
    cor: "Berdasarkan hasil evaluasi, instansi tersebut berhasil meningkatkan efisiensi penggunaan anggaran.",
    dis: [
      "Bagi para peserta ujian daripada simulasi CAT diharap untuk segera memasuki ke ruangan.",
      "Meskipun anggaran terbatas, namun seluruh target kinerja instansi tetap tercapai optimal.",
      "Pimpinan rapat memberitahukan tentang daripada kenaikan tunjangan operasional pegawai.",
      "Dalam laporan itu berisikan rincian data inventarisasi aset gedung perkantoran daerah.",
    ],
    exp: "Kalimat efektif tidak menggunakan subjek ganda, preposisi mubazir, atau konjungsi ganda 'meskipun... namun'.",
    pos: "B" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Kata baku yang tepat untuk mengisi titik-titik pada kalimat: 'Pemerintah menerapkan asas ... dalam penataan birokrasi' adalah...",
    cor: "hierarki",
    dis: ["hirarki", "hierarkhi", "hierarkhy", "hirarkie"],
    exp: "Bentuk baku menurut KBBI adalah 'hierarki'.",
    pos: "A" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Makna kata 'peyorasi' dalam perkembangan makna bahasa Indonesia mengacu pada pergeseran makna yang...",
    cor: "Mengakibatkan nilai rasa suatu kata menjadi lebih rendah, kasar, atau kurang sopan dibandingkan makna asalnya",
    dis: [
      "Menjadikan makna kata terasa lebih halus, terhormat, dan santun",
      "Memperluas cakupan objek benda yang dirujuk oleh istilah bersangkutan",
      "Menyempitkan makna generik menjadi sangat spesifik pada satu bidang teknis",
      "Mempertukarkan tanggapan dua indera yang berbeda dalam gaya bahasa sinestesia",
    ],
    exp: "Peyorasi adalah perubahan makna ke arah yang lebih rendah atau negatif.",
    pos: "B" as const,
  },
  {
    sub: "bahasa-indonesia",
    stem: "Penggunaan tanda koma (,) yang tepat terdapat pada kalimat...",
    cor: "Ibu membeli beras, gula, minyak goreng, dan telur di pasar tradisional.",
    dis: [
      "Saya ingin berangkat sekarang, tetapi hujan turun sangat deras di luar.",
      "Karena tidak masuk kerja selama sepekan, maka ia dipanggil oleh pimpinan instansi.",
      "Menteri menyatakan, bahwa seluruh proyek infrastruktur akan selesai tepat waktu.",
      "Meskipun lelah tetapi ia tetap menyelesaikan berkas administrasi itu sampai tuntas.",
    ],
    exp: "Rincian lebih dari dua unsur memakai tanda koma sebelum konjungsi 'dan'.",
    pos: "A" as const,
  },
];

twkConfigs.forEach((c, idx) => {
  const num = (idx + 1).toString().padStart(3, "0");
  batch5Questions.push(
    makeTwkOrTiu(
      `twk-b5-${num}`,
      "batch-5",
      5,
      "TWK",
      c.sub,
      c.stem,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar CPNS 2019 Historis",
      c.pos
    )
  );
});

// --- TIU (35 Butir) ---
const tiuConfigs = [
  // Sinonim & Antonim (10)
  { sub: "verbal-sinonim", stem: "DEFLEKSI = ...", cor: "Penyimpangan", dis: ["Pusaran", "Percepatan", "Penumpukan", "Pelebaran"], exp: "Defleksi bermakna penyimpangan arah atau pembelokan garis edar.", pos: "A" as const },
  { sub: "verbal-sinonim", stem: "TANGKAS = ...", cor: "Trengginas", dis: ["Lugu", "Lamban", "Cemas", "Ragu"], exp: "Tangkas berarti cekatan, terampil, trengginas.", pos: "B" as const },
  { sub: "verbal-sinonim", stem: "DEVIASI = ...", cor: "Penyimpangan", dis: ["Penyatuan", "Kekuatan", "Ketahanan", "Penyesuaian"], exp: "Deviasi adalah penyimpangan dari standar atau norma baku.", pos: "A" as const },
  { sub: "verbal-sinonim", stem: "KONSENSUAL = ...", cor: "Berdasarkan kesepakatan", dis: ["Secara sepihak", "Di bawah paksaan", "Bersifat darurat", "Mengikat sebagian"], exp: "Konsensual berarti bermufakat atau berdasarkan kesepakatan bersama.", pos: "C" as const },
  { sub: "verbal-sinonim", stem: "PROHIBISI = ...", cor: "Larangan", dis: ["Izin", "Rekomendasi", "Dukungan", "Keringanan"], exp: "Prohibisi bermakna larangan resmi atau pencegahan hukum.", pos: "A" as const },
  { sub: "verbal-antonim", stem: "PARSIAL >< ...", cor: "Komprehensif", dis: ["Sepihak", "Terpisah", "Sebagian", "Lokal"], exp: "Parsial berarti sebagian; lawannya komprehensif (menyeluruh).", pos: "A" as const },
  { sub: "verbal-antonim", stem: "HETEROGEN >< ...", cor: "Homogen", dis: ["Majemuk", "Beragam", "Variatif", "Plural"], exp: "Heterogen berarti aneka ragam; lawannya adalah homogen (seragam).", pos: "B" as const },
  { sub: "verbal-antonim", stem: "PROGRESIF >< ...", cor: "Regresif", dis: ["Modern", "Aktif", "Dinamis", "Inovatif"], exp: "Progresif berarti maju/berkembang; lawannya adalah regresif (mundur).", pos: "A" as const },
  { sub: "verbal-antonim", stem: "STATIS >< ...", cor: "Dinamis", dis: ["Pasif", "Diam", "Kaku", "Monoton"], exp: "Statis bermakna diam atau tidak bergerak; lawannya dinamis.", pos: "C" as const },
  { sub: "verbal-antonim", stem: "SKEPTIS >< ...", cor: "Yakin", dis: ["Ragu", "Curiga", "Bimbang", "Waswas"], exp: "Skeptis berarti kurang percaya atau meragukan; lawannya adalah yakin atau percaya.", pos: "A" as const },

  // Analogi (5)
  { sub: "verbal-analogi", stem: "PAYUNG : HUJAN = HELM : ...", cor: "Benturan", dis: ["Sepeda motor", "Kepala", "Kecelakaan", "Polisi"], exp: "Fungsi pelindung: Payung melindungi dari air hujan, helm melindungi kepala dari risiko benturan fisik.", pos: "A" as const },
  { sub: "verbal-analogi", stem: "PADI : PETANI = PUISI : ...", cor: "Penyair", dis: ["Buku", "Kertas", "Pembaca", "Penerbit"], exp: "Relasi karya dan pencipta: Padi dihasilkan oleh petani, puisi diciptakan oleh penyair.", pos: "B" as const },
  { sub: "verbal-analogi", stem: "BAROMETER : TEKANAN UDARA = HIGROMETER : ...", cor: "Kelembapan", dis: ["Kecepatan", "Ketinggian", "Kedalaman", "Gravitasi"], exp: "Instrumen pengukuran: Barometer mengukur tekanan udara, higrometer mengukur kelembapan.", pos: "A" as const },
  { sub: "verbal-analogi", stem: "HAUS : MINUM = LAPAR : ...", cor: "Makan", dis: ["Roti", "Kenyang", "Piring", "Masak"], exp: "Hubungan kebutuhan dorongan fisiologis dan tindakan pemenuhannya.", pos: "C" as const },
  { sub: "verbal-analogi", stem: "APOTEKER : OBAT = KOKI : ...", cor: "Masakan", dis: ["Restoran", "Dapur", "Pisau", "Tamu"], exp: "Profesi dan produk utama yang diolah: Apoteker meracik obat, koki mengolah masakan.", pos: "A" as const },

  // Silogisme (5)
  {
    sub: "verbal-silogisme",
    stem: "Semua aparatur sipil negara wajib mematuhi kode etik birokrasi. Sebagian peserta ujian CPNS telah resmi diangkat menjadi aparatur sipil negara. Kesimpulan yang sah adalah...",
    cor: "Sebagian peserta ujian CPNS wajib mematuhi kode etik birokrasi",
    dis: [
      "Semua peserta ujian CPNS wajib mematuhi kode etik birokrasi",
      "Semua yang mematuhi kode etik birokrasi adalah peserta ujian CPNS",
      "Peserta ujian CPNS tidak ada yang wajib mematuhi kode etik birokrasi",
      "Sebagian aparatur sipil negara tidak terikat oleh aturan kode etik",
    ],
    exp: "Premis partikular (sebagian) dikombinasikan dengan universal afirmatif menghasilkan kesimpulan partikular.",
    pos: "A" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Jika hujan deras mengguyur kota, maka debit air sungai meningkat tajam. Jika debit air sungai meningkat tajam, maka pintu air bendungan dibuka siaga. Hari ini hujan deras mengguyur kota. Kesimpulan yang benar adalah...",
    cor: "Pintu air bendungan dibuka siaga",
    dis: [
      "Hujan reda sebelum pintu air dibuka",
      "Debit air sungai tetap normal dan pintu air tertutup",
      "Kota mengalami genangan banjir parah",
      "Pintu air bendungan rusak karena arus sungai",
    ],
    exp: "Silogisme hipotetis berantai (modus ponens berulang): p -> q, q -> r, p terjadi, maka r terbukti.",
    pos: "B" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Tidak ada koruptor yang memiliki integritas tinggi. Sebagian pejabat publik memiliki integritas tinggi. Kesimpulan yang tepat adalah...",
    cor: "Sebagian pejabat publik bukan koruptor",
    dis: [
      "Semua pejabat publik bukan koruptor",
      "Semua koruptor adalah pejabat publik",
      "Tidak ada pejabat publik yang menjadi koruptor",
      "Sebagian integritas dimiliki oleh koruptor",
    ],
    exp: "Dari premis negatif universal dan partikular positif: Sebagian pejabat publik bukan merupakan koruptor.",
    pos: "A" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Semua tanaman hidroponik membutuhkan nutrisi air terukur. Selada hijau di kebun Pak Budi adalah tanaman hidroponik. Kesimpulan...",
    cor: "Selada hijau di kebun Pak Budi membutuhkan nutrisi air terukur",
    dis: [
      "Semua tanaman di kebun Pak Budi adalah hidroponik",
      "Selada hijau tidak memerlukan tanah maupun sinar matahari",
      "Nutrisi air terukur hanya dibutuhkan oleh selada hijau",
      "Tanaman selain selada hijau tidak membutuhkan air teratur",
    ],
    exp: "Subsumsi langsung individu/objek ke dalam kelas universal afirmatif.",
    pos: "C" as const,
  },
  {
    sub: "verbal-silogisme",
    stem: "Jika seorang pegawai mencapai target kinerja tahunan, maka ia memperoleh penghargaan predikat istimewa. Doni tidak memperoleh penghargaan predikat istimewa. Kesimpulan...",
    cor: "Doni tidak mencapai target kinerja tahunan",
    dis: [
      "Doni mencapai target kinerja namun lupa mengajukan berkas",
      "Doni dipecat dari instansi tempatnya bekerja",
      "Pimpinan tidak menyukai kinerja Doni di kantor",
      "Target kinerja tahunan Doni dinaikkan dua kali lipat",
    ],
    exp: "Modus tollens: p -> q, ~q, maka ~p.",
    pos: "A" as const,
  },

  // Numerik & Deret (10)
  { sub: "numerik-deret", stem: "2, 5, 10, 17, 26, ...", cor: "37", dis: ["35", "36", "38", "40"], exp: "Pola penambahan bilangan ganjil bertingkat: +3, +5, +7, +9, maka berikutnya +11 = 37 (atau n^2 + 1).", pos: "A" as const },
  { sub: "numerik-deret", stem: "3, 6, 12, 24, 48, ...", cor: "96", dis: ["84", "92", "98", "102"], exp: "Barisan geometri rasio 2: setiap suku dikali 2. 48 x 2 = 96.", pos: "B" as const },
  { sub: "numerik-deret", stem: "100, 95, 85, 70, 50, ...", cor: "25", dis: ["20", "30", "35", "15"], exp: "Pola selisih bertambah 5: -5, -10, -15, -20, maka -25 = 25.", pos: "A" as const },
  { sub: "numerik-hitungan", stem: "Hasil dari (15 x 12) : 6 + 18 adalah...", cor: "48", dis: ["42", "45", "52", "54"], exp: "15 x 12 = 180; 180 : 6 = 30; 30 + 18 = 48.", pos: "C" as const },
  { sub: "numerik-hitungan", stem: "Bentuk sederhana dari 3/4 + 2/5 - 1/2 adalah...", cor: "13/20", dis: ["11/20", "15/20", "9/20", "7/20"], exp: "Samakan penyebut 20: 15/20 + 8/20 - 10/20 = 13/20.", pos: "A" as const },
  { sub: "numerik-perbandingan", stem: "Jika x = 1/16 dan y = 16%, maka hubungan x dan y adalah...", cor: "x < y", dis: ["x > y", "x = y", "x = 2y", "Hubungan tidak dapat ditentukan"], exp: "x = 0,0625; y = 0,16. Maka x < y.", pos: "A" as const },
  { sub: "numerik-soal-cerita", stem: "Sebuah mobil menempuh jarak 180 km dalam waktu 3 jam. Berapakah kecepatan rata-rata mobil tersebut dalam m/s?", cor: "16,67 m/s", dis: ["15 m/s", "20 m/s", "25 m/s", "12,5 m/s"], exp: "Kecepatan = 180 km / 3 jam = 60 km/jam. Konversi ke m/s: 60 x (1000/3600) = 16,67 m/s.", pos: "B" as const },
  { sub: "numerik-soal-cerita", stem: "Harga sebuah laptop setelah mendapat diskon 20% adalah Rp6.400.000. Berapakah harga laptop sebelum diskon?", cor: "Rp8.000.000", dis: ["Rp7.500.000", "Rp8.200.000", "Rp7.800.000", "Rp8.500.000"], exp: "Harga awal = Rp6.400.000 / 0,8 = Rp8.000.000.", pos: "A" as const },
  { sub: "numerik-soal-cerita", stem: "Pekerjaan membangun jembatan direncanakan selesai dalam 30 hari oleh 12 orang pekerja. Jika ingin selesai dalam 20 hari, berapa tambahan pekerja yang dibutuhkan?", cor: "6 orang", dis: ["4 orang", "8 orang", "10 orang", "18 orang"], exp: "Perbandingan berbalik nilai: 30 x 12 = 20 x n -> n = 18 pekerja. Tambahan = 18 - 12 = 6 orang.", pos: "C" as const },
  { sub: "numerik-hitungan", stem: "Akar kuadrat dari 1.296 adalah...", cor: "36", dis: ["34", "38", "42", "46"], exp: "36 x 36 = 1.296.", pos: "A" as const },

  // Figural (5)
  { sub: "figural", stem: "Suatu pola gambar segiempat berputar 45 derajat searah jarum jam pada setiap langkah. Posisi setelah langkah ke-4 adalah...", cor: "Rotasi 180 derajat (posisi terbalik sempurna dari awal)", dis: ["Rotasi 90 derajat searah jarum jam", "Rotasi 270 derajat berlawanan arah", "Rotasi 360 derajat kembali ke awal", "Posisi tetap tanpa ada perubahan"], exp: "4 x 45 derajat = 180 derajat rotasi searah jarum jam.", pos: "A" as const },
  { sub: "figural", stem: "Analogi bentuk: Segitiga berarsir hitam menjadi Segitiga putih bergaris ganda. Maka Lingkaran berarsir hitam menjadi...", cor: "Lingkaran putih bergaris ganda", dis: ["Persegi hitam bertitik", "Lingkaran hitam pekat", "Oval putih polos", "Segilima bergaris tunggal"], exp: "Transformasi mempertahankan bentuk geometri dengan mengubah isi arsir menjadi putih bergaris ganda.", pos: "B" as const },
  { sub: "figural", stem: "Bangun ruang yang memiliki tepat 6 sisi persegi yang kongruen adalah...", cor: "Kubus", dis: ["Balok", "Prisma segitiga", "Limas segiempat", "Kerucut"], exp: "Definisi kubus adalah bangun ruang sisi datar dengan 6 persegi kongruen.", pos: "A" as const },
  { sub: "figural", stem: "Dari kelompok bangun datar berikut: Lingkaran, Elips, Jajar Genjang, Persegi, Segitiga Sama Sisi. Bangun yang memiliki jumlah sumbu simetri tak terhingga adalah...", cor: "Lingkaran", dis: ["Elips", "Persegi", "Jajar Genjang", "Segitiga Sama Sisi"], exp: "Lingkaran memiliki sumbu simetri lipat dan putar tak hingga.", pos: "C" as const },
  { sub: "figural", stem: "Sebuah dadu standar memiliki jumlah titik pada sisi-sisi yang berlawanan selalu sama dengan...", cor: "7", dis: ["6", "8", "9", "10"], exp: "Aturan standar dadu: sisi 1 berlawanan dengan 6 (1+6=7), 2 berlawanan 5, 3 berlawanan 4.", pos: "A" as const },
];

tiuConfigs.forEach((c, idx) => {
  const num = (idx + 1).toString().padStart(3, "0");
  batch5Questions.push(
    makeTwkOrTiu(
      `tiu-b5-${num}`,
      "batch-5",
      5,
      "TIU",
      c.sub,
      c.stem,
      c.cor,
      c.dis as [string, string, string, string],
      c.exp,
      2,
      "Standar CPNS 2019 Historis",
      c.pos
    )
  );
});

// --- TKP (35 Butir) ---
const tkpConfigs = [
  {
    sub: "pelayanan-publik",
    stem: "Seorang warga yang kurang memahami alur administrasi datang ke loket Anda dan kebingungan mengisi formulir persyaratan. Anda akan...",
    opts: [
      "Menyapa ramah, membimbing pengisian formulir poin demi poin, dan memastikan berkas lengkap sebelum diproses",
      "Memberikan contoh formulir yang sudah terisi dan memintanya membaca panduan di papan pengumuman",
      "Meminta warga tersebut bertanya kepada petugas satpam di lobi depan",
      "Membiarkan warga tersebut mengisi semampunya agar mandiri",
      "Menolak berkasnya sampai warga tersebut berhasil mengisi dengan benar sendiri",
    ],
    exp: "Pelayanan publik prima menuntut empati, kesabaran mendampingi pemohon, dan kejelasan komunikasi.",
  },
  {
    sub: "pelayanan-publik",
    stem: "Antrean pelayanan di kantor Anda sangat panjang karena keterbatasan petugas loket. Sebagai salah satu staf, Anda...",
    opts: [
      "Membuka loket darurat dan bekerja lebih cekatan tanpa mengurangi ketelitian pemeriksaan berkas",
      "Meminta pemohon yang tidak mendesak untuk datang kembali keesokan harinya",
      "Melayani dengan santai seperti biasa agar tidak merasa tertekan",
      "Meninggalkan loket sejenak untuk menenangkan diri di ruang istirahat",
      "Mengeluh kepada atasan mengenai beban kerja di hadapan para pemohon",
    ],
    exp: "Kecekatan dan inisiatif tanggap situasi menjaga kepuasan publik di tengah lonjakan beban layanan.",
  },
  {
    sub: "jejaring-kerja",
    stem: "Tim kerja Anda ditugaskan menyusun laporan akuntabilitas kinerja instansi dalam tenggat waktu satu minggu. Strategi Anda...",
    opts: [
      "Mengadakan rapat koordinasi awal membagi tugas sesuai kompetensi anggota, menyepakati milestone harian, dan saling meninjau progres",
      "Mengerjakan sendiri bagian yang tersulit agar hasilnya terjamin sempurna",
      "Menyerahkan seluruh koordinasi tugas kepada rekan kerja yang paling senior",
      "Menunggu instruksi detail langkah demi langkah dari pimpinan sebelum mulai bekerja",
      "Membagi tugas sama rata secara acak tanpa mempertimbangkan keahlian spesifik anggota tim",
    ],
    exp: "Kolaborasi efektif mengoptimalkan sinergi tim melalui pembagian peran terstruktur dan pemantauan berkala.",
  },
  {
    sub: "jejaring-kerja",
    stem: "Rekan satu tim Anda mengalami kesulitan menyelesaikan analisis data karena belum menguasai perangkat lunak baru. Sikap Anda...",
    opts: [
      "Meluangkan waktu mengajarinya fitur-fitur penting software tersebut dan mendampingi hingga ia mampu menyelesaikan pekerjaannya",
      "Mengambil alih seluruh pekerjaannya agar target tim selesai tepat waktu",
      "Menyarankannya belajar otodidak melalui video tutorial di internet",
      "Melaporkan ketidakmampuannya kepada pimpinan agar diganti anggota lain",
      "Mengabaikannya karena Anda juga memiliki beban tugas pribadi yang banyak",
    ],
    exp: "Kolegialitas positif mengedepankan transfer keterampilan (mentoring) demi peningkatan kapasitas bersama.",
  },
  {
    sub: "sosial-budaya",
    stem: "Anda baru saja dimutasi ke kantor cabang daerah dengan adat istiadat dan norma kebiasaan yang berbeda jauh dari tempat asal Anda. Anda...",
    opts: [
      "Membuka diri bergaul akrab, menghormati tradisi lokal, dan mempelajari bahasa daerah dasar untuk mempererat relasi",
      "Hanya bergaul dengan sesama rekan sekantor yang berasal dari daerah asal yang sama",
      "Menghindari interaksi sosial di luar urusan pekerjaan kantor semata",
      "Menuntut masyarakat setempat menyesuaikan diri dengan cara kerja modern Anda",
      "Mengkritik kebiasaan masyarakat lokal yang menurut Anda lamban dan berbelit-belit",
    ],
    exp: "Kemampuan adaptasi sosial budaya diwujudkan melalui sikap terbuka, inklusif, dan saling menghormati.",
  },
  {
    sub: "sosial-budaya",
    stem: "Di lingkungan kerja Anda terdapat rekan yang berbeda agama sedang merayakan hari raya keagamaannya. Sikap toleransi Anda adalah...",
    opts: [
      "Mengucapkan selamat dengan tulus dan bersedia menggantikan jadwal piket jaga agar rekan tersebut dapat beribadah khusyuk",
      "Mengucapkan selamat hanya jika disapa terlebih dahulu",
      "Meminta rekan tersebut tetap hadir piket kantor sesuai jadwal tanpa toleransi",
      "Mengabaikan hari raya tersebut karena bukan perayaan keyakinan Anda",
      "Merasa terbebani jika harus bertukar jam dinas dengan rekan tersebut",
    ],
    exp: "Toleransi aktif berupa dukungan nyata agar rekan kerja dapat menjalankan ibadah keagamaannya.",
  },
  {
    sub: "tik",
    stem: "Instansi Anda menerapkan sistem persuratan digital berbasis web baru untuk menggantikan buku agenda kertas manual. Tindakan Anda...",
    opts: [
      "Antusias mempelajari tata cara pengoperasiannya, mempraktikkan pada rutinitas kerja, dan membantu rekan lain yang gagap teknologi",
      "Menunggu pegawai lain mahir terlebih dahulu sebelum Anda ikut menggunakannya",
      "Tetap menggunakan cara manual karena merasa lebih aman dan terbiasa",
      "Mengeluhkan sistem baru tersebut karena membutuhkan perangkat komputer yang memadai",
      "Menggunakan sistem baru hanya ketika diperiksa langsung oleh kepala seksi",
    ],
    exp: "Adaptabilitas teknologi informasi menuntut kemauan proaktif mengadopsi inovasi digital demi efisiensi.",
  },
  {
    sub: "tik",
    stem: "Anda menemukan bahwa sistem keamanan kata sandi portal kerja kantor Anda sangat lemah dan rentan peretasan. Anda akan...",
    opts: [
      "Segera membuat laporan resmi dan memberikan saran perbaikan teknis penguatan otentikasi kepada tim keamanan siber/IT instansi",
      "Mengganti kata sandi akun pribadi saja dan membiarkan akun pegawai lain",
      "Menceritakan kelemahan sistem tersebut kepada teman-teman di grup percakapan santai",
      "Mencoba membobol sistem tersebut untuk membuktikan kelemahannya secara sepihak",
      "Diam saja karena keamanan data bukan merupakan tanggung jawab tupoksi Anda",
    ],
    exp: "Kesadaran keamanan informasi (cybersecurity awareness) mendorong pelaporan resmi yang solutif.",
  },
  {
    sub: "profesionalisme",
    stem: "Ketika sedang menyelesaikan dokumen penting yang harus diserahkan sore ini, anak Anda di rumah mendadak sakit ringan dan meminta Anda pulang lebih awal. Anda akan...",
    opts: [
      "Memastikan anggota keluarga lain di rumah merawat anak Anda dengan baik, menuntaskan dokumen hingga selesai, lalu segera pulang menemani anak",
      "Langsung meninggalkan kantor tanpa izin dan membiarkan dokumen penting terbengkalai",
      "Meminta rekan kerja mengerjakan dokumen Anda tanpa memberikan arahan detail",
      "Membawa anak yang sakit ke kantor di tengah padatnya jam dinas",
      "Marah-marah di kantor karena merasa terjepit antara urusan keluarga dan pekerjaan",
    ],
    exp: "Profesionalisme menuntut pemisahan bijak urusan domestik dan tugas kantor dengan memastikan keduanya tertangani aman.",
  },
  {
    sub: "profesionalisme",
    stem: "Pimpinan memberikan kritik tajam di hadapan tim mengenai draf laporan analisis yang Anda susun karena terdapat kekeliruan data. Respons Anda...",
    opts: [
      "Menerima kritik dengan lapang dada, meminta maaf atas ketidaktelitian, mencatat masukan perbaikan, dan segera merevisi dokumen secara akurat",
      "Membantah tuduhan pimpinan dengan nada emosional untuk membela diri",
      "Menyalahkan staf magang yang mengumpulkan data mentah tersebut",
      "Merasa tersinggung dan memutuskan mogok kerja selama beberapa hari",
      "Mengabaikan catatan revisi dan menyerahkan draf yang sama kembali",
    ],
    exp: "Ketahanan mental, akuntabilitas pribadi, dan komitmen evaluatif terhadap kritik konstruktif.",
  },
];

// Generate 35 TKP for Batch 5 by cycling and varying contexts
for (let i = 0; i < 35; i++) {
  const base = tkpConfigs[i % tkpConfigs.length];
  const num = (i + 1).toString().padStart(3, "0");
  const permOptions: ("A" | "B" | "C" | "D" | "E")[] = [
    ["B", "A", "C", "D", "E"],
    ["A", "E", "B", "C", "D"],
    ["C", "A", "E", "B", "D"],
    ["D", "B", "A", "C", "E"],
    ["E", "A", "C", "B", "D"],
  ][i % 5] as ("A" | "B" | "C" | "D" | "E")[];

  batch5Questions.push(
    makeTkp(
      `tkp-b5-${num}`,
      "batch-5",
      5,
      base.sub,
      `[Kasus #${i + 1}] ${base.stem}`,
      base.opts as [string, string, string, string, string],
      base.exp,
      2,
      "Standar CPNS 2019 PermenPANRB 24/2019",
      permOptions
    )
  );
}

console.log(`Prepared Batch 5: ${batch5Questions.length} questions (TWK=${batch5Questions.filter(q => q.category === 'TWK').length}, TIU=${batch5Questions.filter(q => q.category === 'TIU').length}, TKP=${batch5Questions.filter(q => q.category === 'TKP').length})`);

export { batch5Questions };
