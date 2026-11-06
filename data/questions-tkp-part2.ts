import { makeTkp, RawQuestionDef } from "../scripts/seed-builder-helpers";

export const TKP_PART2_QUESTIONS: RawQuestionDef[] = [
  // --- TEKNOLOGI INFORMASI DAN KOMUNIKASI (TIK) (20 soal) ---
  makeTkp(
    "tkp-tik-001", "tik",
    "Instansi Anda memutuskan beralih dari pengarsipan dokumen fisik ke sistem persuratan digital terintegrasi (paperless system). Beberapa pegawai senior kesulitan dan meminta dokumen tetap dicetak secara manual. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengejek pegawai senior yang gagap teknologi",
      "Mengabaikan sistem baru dan ikut mencetak dokumen manual",
      "Mendukung penuh digitalisasi, proaktif membantu membimbing pegawai senior cara pengoperasian aplikasi dengan sabar, dan menjelaskan efisiensi yang didapat",
      "Menyuruh pegawai senior pensiun dini saja",
      "Membiarkan tim IT yang bekerja sendiri mengurus masalah tersebut"
    ],
    "Opsi C bernilai 5 karena adaptif terhadap inovasi teknologi sekaligus memiliki kepedulian membimbing rekan lintas generasi."
  ),
  makeTkp(
    "tkp-tik-002", "tik",
    "Anda menerima email mencurigakan yang mengatasnamakan bagian keuangan kementerian, meminta Anda mengklik tautan verifikasi akun dan memasukkan kata sandi email dinas Anda. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung mengklik tautan tersebut dan memasukkan kata sandi dinas Anda",
      "Meneruskan email tersebut ke seluruh teman kantor agar ikut mengecek",
      "Membalas email tersebut dengan memaki pengirim",
      "Waspada terhadap upaya phishing siber, tidak mengklik tautan apa pun, dan segera melaporkan email mencurigakan tersebut kepada unit pengelola keamanan siber / IT instansi",
      "Mengabaikan email tersebut tanpa melakukan tindakan pengamanan apa pun"
    ],
    "Opsi D bernilai 5 karena menunjukkan literasi keamanan siber (cyber security awareness) yang tinggi untuk melindungi data institusi."
  ),
  makeTkp(
    "tkp-tik-003", "tik",
    "Di era kecerdasan buatan (Artificial Intelligence / AI) yang berkembang pesat saat ini, pandangan dan sikap Anda dalam memanfaatkan teknologi tersebut untuk pekerjaan adalah...",
    [2, 3, 4, 5, 1],
    [
      "Menolak sama sekali AI karena takut pekerjaan manusia tergantikan",
      "Menyerahkan seluruh penulisan dokumen resmi dinas kepada AI tanpa diperiksa ulang",
      "Menggunakan AI sembunyi-sembunyi agar dianggap hebat oleh atasan",
      "Mempelajari dan memanfaatkan tools AI secara bijak, etis, dan bertanggung jawab sebagai akselerator riset awal data dengan tetap memverifikasi keakuratan faktanya",
      "Mengabaikan perkembangan teknologi AI dan bekerja dengan cara lama"
    ],
    "Opsi D bernilai 5 karena adaptif terhadap kemajuan teknologi mutakhir dengan tetap menjunjung etika, akuntabilitas, dan verifikasi manusia."
  ),
  makeTkp(
    "tkp-tik-004", "tik",
    "Anda menemukan bahwa kata sandi akun sistem kepegawaian Anda belum pernah diubah selama lebih dari dua tahun dan merupakan tanggal lahir Anda sendiri. Tindakan Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Membiarkannya saja karena mudah diingat dan tidak merepotkan",
      "Membagikan kata sandi tersebut kepada rekan seruangan",
      "Segera mengganti kata sandi dengan kombinasi kuat (huruf besar, kecil, angka, simbol) yang tidak mudah ditebak, serta mengaktifkan autentikasi dua faktor (2FA)",
      "Menuliskan kata sandi di kertas stiker dan menempelkannya di monitor komputer kerja",
      "Menonaktifkan sistem pengamanan akun jika memungkinkan"
    ],
    "Opsi C bernilai 5 karena disiplin mematuhi best practice keamanan informasi pribadi dan kedinasan."
  ),
  makeTkp(
    "tkp-tik-005", "tik",
    "Saat bekerja secara jarak jauh (Work From Anywhere / WFH), Anda diharuskan mengakses basis data internal instansi dari jaringan internet publik di kafe. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung menyambung ke WiFi publik gratis tanpa pengaman apa pun",
      "Mengirimkan data rahasia instansi ke email pribadi agar mudah diunduh",
      "Meminjam laptop milik pengunjung kafe lain yang lebih cepat",
      "Menggunakan jaringan pribadi virtual (VPN) resmi yang diamankan oleh instansi atau menggunakan tethering kuota internet ponsel sendiri untuk mencegah penyadapan data",
      "Mematikan antivirus komputer agar koneksi internet lebih lancar"
    ],
    "Opsi D bernilai 5 karena bertanggung jawab menjaga kerahasiaan data negara saat beraktivitas di jaringan luar kantor."
  ),
  makeTkp(
    "tkp-tik-006", "tik",
    "Pimpinan instansi menginstruksikan agar seluruh rapat koordinasi mingguan dialihkan ke aplikasi video conference daring untuk efisiensi anggaran dan waktu. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengeluh karena rapat daring tidak ada konsumsi makanan gratis",
      "Masuk ruang video conference tetapi mematikan kamera dan mikrofon lalu tidur",
      "Menyambut baik instruksi tersebut, menguasai fitur-fitur pendukung presentasi daring, dan memastikan kehadiran tepat waktu dengan koneksi yang stabil",
      "Mendesak atasan kembali ke rapat tatap muka konvensional",
      "Keluar masuk ruang pertemuan daring sesuka hati"
    ],
    "Opsi C bernilai 5 karena disiplin, adaptif memanfaatkan platform komunikasi digital, dan berorientasi efisiensi."
  ),
  makeTkp(
    "tkp-tik-007", "tik",
    "Anda melihat salah satu komputer inventaris kantor yang terhubung ke jaringan lokal kantor belum diperbarui sistem operasinya dan sering terkena malware. Tindakan Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Membiarkannya rusak agar kantor membeli komputer baru",
      "Menyalin virus tersebut ke flashdisk untuk iseng",
      "Melaporkan kondisi komputer tersebut kepada unit pengelola IT untuk segera dilakukan pembaruan patch keamanan dan pembersihan antivirus",
      "Mencabut kabel komputer dan membuangnya ke gudang",
      "Menjual komputer tersebut ke pihak luar"
    ],
    "Opsi C bernilai 5 karena peduli terhadap keamanan ekosistem IT kantor secara menyeluruh."
  ),
  makeTkp(
    "tkp-tik-008", "tik",
    "Untuk meningkatkan keterlibatan publik, instansi Anda meminta saran inovasi pemanfaatan media sosial resmi lembaga. Usulan terbaik Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengunggah kegiatan seremonial pejabat kantor setiap hari",
      "Membeli pengikut palsu (bot followers) agar tampak populer",
      "Menyajikan konten edukasi layanan publik yang interaktif, infografis ringkas yang mudah dipahami warga, dan kanal respons cepat untuk menampung pertanyaan masyarakat",
      "Membuat konten kontroversial dan sensasional demi mengejar viralitas",
      "Menutup kolom komentar media sosial agar tidak ada kritik warga"
    ],
    "Opsi C bernilai 5 karena memanfaatkan media sosial sebagai jembatan komunikasi publik yang edukatif, transparan, dan dua arah."
  ),
  makeTkp(
    "tkp-tik-009", "tik",
    "Dalam penyusunan basis data kepegawaian, terjadi perbedaan format data antar cabang kantor yang menyebabkan data tidak sinkron. Solusi berbasis TIK yang Anda usulkan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mencetak seluruh data ke ribuan lembar kertas dan mencocokkan manual",
      "Menghapus data cabang yang formatnya tidak sesuai",
      "Membuat standarisasi skema data dan memanfaatkan aplikasi spreadsheet/database berbasis cloud bersama dengan aturan validasi input terpusat",
      "Menyalahkan pimpinan cabang atas kekeliruan tersebut",
      "Membiarkan data tetap tidak sinkron"
    ],
    "Opsi C bernilai 5 karena berpikir sistemik menggunakan teknologi informasi untuk menyelesaikan inefisiensi manajerial."
  ),
  makeTkp(
    "tkp-tik-010", "tik",
    "Anda menemukan aplikasi otomasi sumber terbuka (open-source) yang dapat menghemat waktu penginputan data rutin harian Anda dari 3 jam menjadi 15 menit. Tindakan Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyembunyikan aplikasi tersebut dan memakai waktu luang 2 jam lebih untuk bermain game",
      "Menggunakan aplikasi tersebut tanpa memeriksa keamanan dan legalitasnya",
      "Mempelajari dan menguji keandalan aplikasi tersebut, berkonsultasi dengan bagian IT untuk memastikan keamanannya, lalu membagikan otomasi tersebut kepada rekan tim demi efisiensi bersama",
      "Menjual aplikasi tersebut kepada rekan kantor untuk keuntungan pribadi",
      "Menolak menggunakan aplikasi karena takut dianggap malas oleh atasan"
    ],
    "Opsi C bernilai 5 karena inovatif, taat kepatuhan tata kelola IT, dan berbagi nilai tambah demi produktivitas tim."
  ),
  makeTkp(
    "tkp-tik-011", "tik",
    "Saat Anda sedang terburu-buru menghadiri rapat penting, seorang rekan meminta Anda mengirimkan dokumen berkas rahasia jabatan melalui aplikasi pesan instan pribadi tanpa enkripsi. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung mengirimkannya tanpa berpikir panjang karena terburu-buru",
      "Mengunggah dokumen rahasia tersebut ke situs berbagi publik agar bisa diunduh siapa saja",
      "Menolak dengan marah dan membatalkan rapat",
      "Tetap berpegang pada protokol keamanan data kedinasan, mengirimkannya melalui kanal persuratan dinas resmi terenkripsi, atau meminta izin mengirimkannya segera setelah rapat selesai",
      "Membiarkan rekan tersebut mencari dokumen itu sendiri"
    ],
    "Opsi D bernilai 5 karena teguh menjaga tata kelola keamanan data negara meski dalam situasi tergesa-gesa."
  ),
  makeTkp(
    "tkp-tik-012", "tik",
    "Pemerintah menerapkan kebijakan Sistem Pemerintahan Berbasis Elektronik (SPBE) untuk mewujudkan birokrasi kelas dunia. Peran nyata yang dapat Anda kontribusikan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menghafal singkatan-singkatan peraturan SPBE tanpa menerapkannya",
      "Menolak sistem elektronik karena menganggap sistem lama lebih terbukti",
      "Aktif menggunakan dan memberikan masukan perbaikan berkelanjutan terhadap aplikasi SPBE instansi, serta meningkatkan keterampilan literasi data digital pribadi",
      "Menggantungkan seluruh keberhasilan SPBE hanya pada kementerian komunikasi",
      "Menyebarkan kabar burung bahwa SPBE memboroskan anggaran"
    ],
    "Opsi C bernilai 5 karena proaktif menjadi motor penggerak transformasi digital aparatur dari tataran operasional."
  ),
  makeTkp(
    "tkp-tik-013", "tik",
    "Dalam sebuah pelatihan penggunaan perangkat lunak baru di kantor, materi yang disampaikan terasa sangat sulit dan asing bagi Anda. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menyerah dan meninggalkan kelas pelatihan di tengah sesi",
      "Mengeluh kepada atasan bahwa aplikasi tersebut terlalu rumit",
      "Mengikuti pelatihan secara pasif dan mengabaikan materi",
      "Menyimak dengan sungguh-sungguh, tidak malu bertanya kepada pemateri atau rekan yang lebih paham, serta meluangkan waktu berlatih mandiri hingga menguasainya",
      "Menyuruh orang lain mengerjakan tes kelulusan pelatihan Anda"
    ],
    "Opsi D bernilai 5 karena memiliki persistensi belajar (learning agility) dan tekad menguasai kompetensi teknologi baru."
  ),
  makeTkp(
    "tkp-tik-014", "tik",
    "Anda melihat rekan kerja Anda sering meninggalkan komputer kerjanya dalam keadaan menyala dan akun dinas tetap terbuka (log in) saat meninggalkan ruangan. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Memanfaatkan komputernya untuk iseng mengirim pesan aneh",
      "Melihat-lihat data pribadi yang tersimpan di komputernya",
      "Mengabaikannya karena itu kelalaian rekan Anda sendiri",
      "Mengingatkannya dengan baik mengenai prinsip 'Lock Screen' saat meninggalkan meja kerja demi menjaga keamanan informasi dari pihak yang tidak berhak",
      "Mematikan komputernya secara paksa dengan mencabut stop kontak"
    ],
    "Opsi D bernilai 5 karena mengedukasi budaya sadar keamanan informasi secara kolegial dan konstruktif."
  ),
  makeTkp(
    "tkp-tik-015", "tik",
    "Masyarakat pengguna layanan di kantor Anda mengeluh bahwa website resmi instansi sering lambat diakses dan sulit dicari informasinya melalui mesin pencari. Langkah yang Anda usulkan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menghapus website kantor dan beralih ke selebaran kertas cetak",
      "Menyuruh masyarakat mengakses website hanya pada tengah malam",
      "Berkoordinasi dengan pengelola web untuk mengoptimasi performa kecepatan server (caching), memperbaiki struktur navigasi antarmuka (UI/UX), dan memperbarui konten informasi berkala",
      "Menyalahkan provider internet lokal",
      "Mengabaikan komplain warga karena website hanya formalitas"
    ],
    "Opsi C bernilai 5 karena berorientasi pada kepuasan pengguna akhir (user-centric) dengan solusi teknis komprehensif."
  ),
  makeTkp(
    "tkp-tik-016", "tik",
    "Di kantor Anda terdapat banyak flashdisk yang digunakan bergantian antar-pegawai untuk memindahkan berkas. Tindakan Anda untuk mencegah penyebaran virus komputer adalah...",
    [2, 3, 5, 4, 1],
    [
      "Melarang sama sekali penggunaan komputer di kantor",
      "Mengabaikan risiko virus karena komputer kantor bukan milik pribadi",
      "Mendorong pemanfaatan penyimpanan awan (cloud storage) resmi instansi untuk transfer berkas, serta memastikan pemindaian antivirus aktif sebelum membuka flashdisk apa pun",
      "Membeli komputer baru setiap kali terkena virus",
      "Menghapus seluruh file di flashdisk rekan tanpa izin"
    ],
    "Opsi C bernilai 5 karena memitigasi risiko keamanan data secara higienis menggunakan teknologi modern yang lebih aman."
  ),
  makeTkp(
    "tkp-tik-017", "tik",
    "Anda ditugaskan membuat paparan laporan kinerja tahunan untuk rapat pimpinan. Pemanfaatan teknologi presentasi yang paling efektif adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menuliskan seluruh teks laporan panjang per paragraf di slide tanpa gambar",
      "Membuat slide penuh animasi berlebihan yang mengalihkan perhatian isi materi",
      "Menyajikan data penting dalam bentuk visualisasi grafik yang komunikatif, ringkas, bersih, dan menonjolkan capaian kunci kinerja secara lugas",
      "Membacakan dokumen cetak tebal kata demi kata di depan pimpinan",
      "Menyerahkan pembuatan slide ke pihak luar tanpa memahami isinya"
    ],
    "Opsi C bernilai 5 karena menguasai keterampilan komunikasi visual data (data storytelling) untuk pengambilan keputusan manajerial."
  ),
  makeTkp(
    "tkp-tik-018", "tik",
    "Ketika terjadi bencana alam yang merusak gedung kantor dan seluruh berkas fisik, instansi yang menerapkan manajemen backup TIK yang baik akan...",
    [1, 2, 4, 5, 3],
    [
      "Mengalami kelumpuhan layanan permanen karena data hilang",
      "Meminta warga menyerahkan kembali seluruh berkas dari awal",
      "Pasrah menerima kehilangan seluruh arsip sejarah",
      "Dapat memulihkan operasional pelayanan dengan cepat karena memiliki sistem pencadangan data cadangan (disaster recovery plan) berkala di server off-site yang aman",
      "Menutup instansi sampai gedung baru dibangun bertahun-tahun"
    ],
    "Opsi D bernilai 5 karena memahami urgensi kesiapan mitigasi bencana data (business continuity plan) dalam tata kelola pemerintahan modern."
  ),
  makeTkp(
    "tkp-tik-019", "tik",
    "Seorang warga pemohon lanjut usia mengeluh tidak memiliki smartphone untuk mendaftar antrean online. Sikap yang Anda ambil adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menolak melayani warga tersebut sampai ia membeli smartphone",
      "Menyuruhnya pulang dan meminta tolong tetangganya",
      "Menyediakan fasilitas pendampingan anjungan loket khusus di kantor untuk mendaftarkan antrean warga yang mengalami kesenjangan digital (digital divide)",
      "Mencemooh warga yang belum melek teknologi",
      "Memberikan nomor antrean palsu secara sembarangan"
    ],
    "Opsi C bernilai 5 karena menjamin prinsip non-diskriminasi dan keadilan akses layanan publik bagi masyarakat rentan kesenjangan digital."
  ),
  makeTkp(
    "tkp-tik-020", "tik",
    "Dalam penggunaan media sosial pribadi, sikap seorang ASN yang beretika digital adalah...",
    [1, 2, 4, 5, 3],
    [
      "Bebas membagikan dokumen internal kantor demi konten viral pribadi",
      "Menyebarkan informasi yang belum jelas kebenarannya (hoaks) tanpa saring",
      "Menggunakan media sosial untuk mencela instansi pemerintah lain secara kasar",
      "Bijak dalam bermedia sosial, menjaga kehormatan korps ASN, menyaring kebenaran informasi sebelum membagikan, dan tidak menyebarkan rahasia dinas maupun ujaran kebencian",
      "Menutup seluruh akun media sosial dan tidak mau tahu dunia luar"
    ],
    "Opsi D bernilai 5 karena menjunjung tinggi etika digital, kedewasaan bermedia sosial, dan martabat profesi ASN."
  ),

  // --- PROFESIONALISME (25 soal) ---
  makeTkp(
    "tkp-pro-001", "profesionalisme",
    "Pimpinan memberikan tugas mendadak dengan tenggat waktu yang sangat ketat di sore hari, tepat saat Anda sudah bersiap-siap pulang ke rumah untuk menghadiri acara santai bersama teman. Sikap Anda adalah...",
    [1, 3, 4, 5, 2],
    [
      "Langsung menolak tugas tersebut karena jam dinas sudah hampir habis",
      "Menerima tugas tetapi mengerjakannya besok siang dengan santai",
      "Mengeluh di depan pimpinan agar tugas diberikan kepada rekan lain",
      "Menerima tugas tersebut dengan penuh tanggung jawab, mengomunikasikan penundaan acara santai kepada teman, dan menyelesaikan tugas dinas tersebut hingga tuntas dan berkualitas",
      "Mengerjakan tugas secara asal-asalan dalam 5 menit lalu buru-buru pulang"
    ],
    "Opsi D bernilai 5 karena mendahulukan komitmen tugas kedinasan di atas kepentingan pribadi dan bertanggung jawab terhadap target kerja."
  ),
  makeTkp(
    "tkp-pro-002", "profesionalisme",
    "Anda menemukan rekan kerja Anda yang merupakan sahabat karib melakukan kesalahan fatal dalam rekapitulasi data keuangan yang dapat merugikan anggaran instansi jika tidak dikoreksi. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mendiamkan saja demi menjaga perasaan sahabat karib Anda",
      "Membantu menyembunyikan kesalahan tersebut dari atasan",
      "Menceritakan kesalahan tersebut kepada rekan-rekan lain sebagai bahan gosip",
      "Memberitahukan kekeliruan data tersebut kepada sahabat Anda secara baik-baik empat mata, membantunya merevisi data yang benar, dan memastikan laporan yang diserahkan ke pimpinan telah valid dan akuntabel",
      "Langsung melaporkan ke polisi tanpa memberitahu rekan tersebut"
    ],
    "Opsi D bernilai 5 karena menjunjung profesionalisme dan akuntabilitas kerja tanpa merusak hubungan persahabatan secara bijaksana."
  ),
  makeTkp(
    "tkp-pro-003", "profesionalisme",
    "Dalam penyelesaian proyek pekerjaan tim, terjadi kendala teknis yang menyebabkan keterlambatan dari jadwal awal. Sikap Anda dalam menyikapi situasi tersebut adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mencari kambing hitam dan menyalahkan rekan tim lain",
      "Menyerah dan membiarkan proyek terbengkalai",
      "Menunggu instruksi atasan tanpa melakukan tindakan apa pun",
      "Melakukan evaluasi cepat bersama tim untuk mengidentifikasi akar hambatan, merumuskan langkah kontingensi percepatan, dan secara transparan melaporkan progres serta solusi kepada pimpinan",
      "Membuat laporan fiktif bahwa proyek sudah selesai tepat waktu"
    ],
    "Opsi D bernilai 5 karena proaktif mencari solusi, berjiwa akuntabel, dan berorientasi pada pencapaian hasil kerja."
  ),
  makeTkp(
    "tkp-pro-004", "profesionalisme",
    "Instansi Anda menawarkan beasiswa pelatihan peningkatan kompetensi keahlian khusus di luar jam kerja yang sangat relevan dengan bidang tugas Anda, namun tidak memberikan uang saku tambahan. Sikap Anda adalah...",
    [2, 3, 4, 5, 1],
    [
      "Menolak tawaran tersebut karena tidak ada uang sakunya",
      "Hanya ikut jika diwajibkan secara paksa oleh atasan",
      "Mendaftar tetapi sering membolos kelas pelatihan",
      "Antusias mendaftar dan mengikuti pelatihan tersebut dengan sungguh-sungguh demi meningkatkan kapasitas dan profesionalisme kerja diri untuk kemajuan instansi",
      "Menyuruh rekan lain yang menganggur untuk ikut"
    ],
    "Opsi D bernilai 5 karena memiliki motivasi berprestasi tinggi dan komitmen pengembangan kapasitas diri berkelanjutan (continuous learning)."
  ),
  makeTkp(
    "tkp-pro-005", "profesionalisme",
    "Anda sedang menghadapi masalah pribadi keluarga yang cukup berat di rumah. Saat tiba di kantor dan harus melayani masyarakat serta berdiskusi dengan tim kerja, sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Melampiaskan kekesalan dan amarah pribadi kepada warga yang datang ke loket",
      "Menangis di ruang rapat kerja dan menolak mengerjakan tugas",
      "Menutup loket dan meminta izin pulang cepat setiap hari",
      "Mampu mengelola emosi secara matang, memisahkan secara profesional urusan pribadi dari tugas dinas, dan tetap memberikan pelayanan terbaik serta ramah kepada masyarakat",
      "Bekerja sambil mengeluhkan masalah pribadi kepada setiap orang yang ditemui"
    ],
    "Opsi D bernilai 5 karena memiliki kecerdasan emosional yang tinggi dan menjaga etika profesionalisme ruang kerja."
  ),
  makeTkp(
    "tkp-pro-006", "profesionalisme",
    "Pimpinan memberikan kritik tajam di depan rapat evaluasi atas hasil draf laporan yang Anda susun karena terdapat beberapa kelemahan analisis data. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Membantah atasan secara emosional dan meninggalkan ruangan rapat",
      "Menyimpan dendam kepada pimpinan dan bekerja ogah-ogahan setelahnya",
      "Menyalahkan rekan tim yang membantu mencari data",
      "Menerima kritik tersebut secara objektif dan sportif, mencatat poin-poin perbaikan, serta segera merevisi laporan agar kualitas analisis data menjadi lebih tajam dan akurat",
      "Mengajukan pengunduran diri karena merasa dipermalukan"
    ],
    "Opsi D bernilai 5 karena bermental profesional, terbuka terhadap masukan korektif, dan berorientasi peningkatan mutu output."
  ),
  makeTkp(
    "tkp-pro-007", "profesionalisme",
    "Ketika Anda ditugaskan melakukan perjalanan dinas luar kota, terdapat sisa uang akomodasi dan transportasi yang tidak terpakai dari pagu anggaran yang telah dicairkan di awal. Sikap Anda adalah...",
    [1, 2, 3, 5, 4],
    [
      "Memasukkan sisa uang ke kantong pribadi dan menganggapnya sebagai rezeki tambahan",
      "Membuat nota hotel fiktif agar uang tersebut habis sesuai pagu",
      "Menggunakan sisa uang untuk mentraktir makan mewah bersama teman di luar dinas",
      "Mengembalikan seluruh sisa uang dinas tersebut ke bendahara pengeluaran instansi sesuai bukti riil pengeluaran (at-cost) dan prinsip akuntabilitas keuangan negara",
      "Menyumbangkan sisa uang tersebut ke yayasan sosial atas nama pribadi"
    ],
    "Opsi D bernilai 5 karena memegang teguh integritas keuangan negara sesuai sistem pertanggungjawaban at-cost."
  ),
  makeTkp(
    "tkp-pro-008", "profesionalisme",
    "Dalam suasana kerja yang sangat santai dan tidak ada pengawasan langsung dari atasan di kantor, hal yang tetap Anda lakukan adalah...",
    [1, 2, 4, 5, 3],
    [
      "Tidur di ruang istirahat sampai jam pulang",
      "Bermain game online atau berbelanja daring seharian",
      "Keluar kantor untuk urusan pribadi tanpa izin",
      "Tetap disiplin menggunakan jam kerja secara produktif untuk menuntaskan pekerjaan yang belum selesai, mengarsipkan dokumen, atau mempelajari regulasi baru",
      "Mengajak rekan lain mengobrol gosip sepanjang hari"
    ],
    "Opsi D bernilai 5 karena memiliki integritas diri (self-discipline) yang tidak bergantung pada ada tidaknya pengawasan fisik atasan."
  ),
  makeTkp(
    "tkp-pro-009", "profesionalisme",
    "Anda diminta oleh atasan untuk menyelesaikan sebuah analisis kebijakan yang belum pernah Anda buat sebelumnya. Waktu yang diberikan relatif singkat. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menolak tugas tersebut karena merasa tidak mampu",
      "Menyalin karya orang lain dari internet tanpa menyebutkan sumbernya (plagiat)",
      "Mengerjakan seadanya tanpa riset data pendukung",
      "Menerima tugas dengan optimis, segera mencari referensi regulasi dan contoh analisis terbaik, berkonsultasi cepat dengan mentor, serta menyusun analisis secara sistematis dan analitis",
      "Mengulur-ulur waktu sampai atasan melupakannya"
    ],
    "Opsi D bernilai 5 karena tangguh menghadapi tantangan baru, berorientasi solusi, dan menjunjung orisinalitas karya ilmiah kedinasan."
  ),
  makeTkp(
    "tkp-pro-010", "profesionalisme",
    "Sebuah perusahaan swasta menawarkan honorarium sebagai narasumber internal mereka pada hari kerja dinas. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menerima tawaran tersebut secara diam-diam tanpa izin kantor",
      "Membolos kerja dinas demi mengejar honor pribadi",
      "Menerima undangan hanya bila honorariumnya sangat besar",
      "Mengkonsultasikan dan meminta izin tertulis dari pimpinan instansi terlebih dahulu, memastikan tidak ada konflik kepentingan, serta menyesuaikan agar tidak mengganggu tugas pokok dinas",
      "Meminta perusahaan menyetor uang langsung ke rekening keluarga Anda"
    ],
    "Opsi D bernilai 5 karena taat etika birokrasi, transparan terhadap potensi benturan kepentingan, dan mendahulukan kewajiban tugas utama."
  ),
  makeTkp(
    "tkp-pro-011", "profesionalisme",
    "Anda mengetahui rekan kerja satu meja Anda sering memanipulasi presensi kehadiran fingerprint (titip absen/menitip kartu) melalui staf keamanan. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut menitipkan presensi kehadiran saat Anda bangun terlambat",
      "Membiarkannya saja karena takut dimusuhi rekan kerja",
      "Mendukung tindakannya asalkan Anda diberi imbalan",
      "Mengingatkannya secara tegas dan empatik mengenai risiko pelanggaran disiplin ASN dan integritas kerja, serta melaporkan ke unit pengawas internal bila pelanggaran terus diulang",
      "Menyebarkan kabar tersebut ke media sosial secara anonim"
    ],
    "Opsi D bernilai 5 karena memiliki keberanian moral menegakkan aturan disiplin secara terukur dan bertanggung jawab."
  ),
  makeTkp(
    "tkp-pro-012", "profesionalisme",
    "Dalam proses pengadaan barang dan jasa, rekan satu panitia mengusulkan pemenang lelang yang merupakan perusahaan milik keluarganya dengan harga lebih tinggi dibanding penawar terbaik lainnya. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menyetujui usulan tersebut demi solidaritas pertemanan",
      "Menerima keputusan tersebut jika diberi bagian keuntungan",
      "Pura-pura tidak tahu dan menandatangani berita acara lelang",
      "Menolak tegas usulan tersebut, mengingatkan asas transparansi, akuntabilitas, dan bebas konflik kepentingan dalam pengadaan pemerintah, serta memilih pemenang secara objektif sesuai regulasi",
      "Mengundurkan diri dari panitia tanpa memberikan alasan apa pun"
    ],
    "Opsi D bernilai 5 karena menjunjung tinggi integritas pengadaan publik dan berani menolak praktik korupsi, kolusi, dan nepotisme (KKN)."
  ),
  makeTkp(
    "tkp-pro-013", "profesionalisme",
    "Saat Anda sedang berkonsentrasi menyelesaikan tugas penting yang ditunggu pimpinan hari ini, beberapa rekan kerja mengajak Anda mengobrol santai mengenai isu politik terkini. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Meninggalkan tugas dan ikut berdebat politik hingga sore",
      "Marah-marah dan mengusir rekan-rekan dengan kata kasar",
      "Mengobrol sambil mengerjakan tugas setengah-setengah",
      "Menolak ajakan tersebut secara sopan dan tersenyum, menjelaskan bahwa Anda memiliki tugas urgen yang harus diselesaikan hari ini, dan menawarkan mengobrol nanti saat jam istirahat",
      "Pura-pura sakit agar tidak diganggu"
    ],
    "Opsi D bernilai 5 karena tegas menjaga fokus produktivitas kerja dengan komunikasi sosial yang tetap santun dan hangat."
  ),
  makeTkp(
    "tkp-pro-014", "profesionalisme",
    "Peralatan kantor seperti printer dan kertas dinas sering digunakan sebagian pegawai untuk mencetak tugas kuliah atau urusan pribadi mereka. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut mencetak seluruh keperluan pribadi Anda dalam jumlah banyak",
      "Mendiamkan saja karena menganggap kertas harganya murah",
      "Memanfaatkan printer kantor untuk mencetak dokumen bisnis sampingan Anda",
      "Secara konsisten hanya menggunakan peralatan kantor untuk kepentingan kedinasan resmi dan mengedukasi rekan mengenai tertib pemanfaatan aset negara",
      "Menyembunyikan kabel printer agar tidak ada yang bisa menggunakannya"
    ],
    "Opsi D bernilai 5 karena menjaga amanah aset negara dari pemborosan dan penyalahgunaan kepentingan non-dinas."
  ),
  makeTkp(
    "tkp-pro-015", "profesionalisme",
    "Anda diminta mewakili instansi memberikan pemaparan di hadapan awak media massa terkait kasus dugaan maladministrasi di kantor Anda. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Memberikan pernyataan palsu dan menyalahkan korban",
      "Kabur dan menolak menemui wartawan",
      "Memberikan opini pribadi yang berseberangan dengan data resmi instansi",
      "Berkoordinasi matang dengan bagian Humas dan Pimpinan, menyampaikan klarifikasi berbasis data faktual yang transparan, profesional, dan menenangkan publik sesuai kewenangan",
      "Menyerang wartawan secara verbal"
    ],
    "Opsi D bernilai 5 karena mengedepankan komunikasi publik yang akuntabel, terkoordinasi, dan menjaga reputasi institusi."
  ),
  makeTkp(
    "tkp-pro-016", "profesionalisme",
    "Sebagai seorang abdi negara, prinsip utama yang Anda jadikan pedoman dalam merespons target kinerja tahunan (Sasaran Kinerja Pegawai / SKP) adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menetapkan target serendah mungkin agar pasti tercapai tanpa usaha keras",
      "Menyerahkan penyusunan SKP kepada atasan tanpa memahaminya",
      "Membuat target yang asal jadi dan diisi formalitas belaka di akhir tahun",
      "Menyusun target kinerja yang menantang (SMART: Specific, Measurable, Achievable, Relevant, Time-bound), selaras dengan tujuan organisasi, dan berkomitmen melampaui target tersebut",
      "Menjiplak target kerja rekan lain secara mentah-mentah"
    ],
    "Opsi D bernilai 5 karena berorientasi pada kinerja tinggi, akuntabilitas rencana kerja, dan pencapaian visi lembaga."
  ),
  makeTkp(
    "tkp-pro-017", "profesionalisme",
    "Ketika terjadi mutasi jabatan dan Anda ditempatkan di bidang yang tidak sesuai dengan bidang keahlian ijazah kuliah Anda, sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Protes keras dan menolak melaksanakan tugas di tempat baru",
      "Bekerja ogah-ogahan sebagai bentuk protes kepada bagian kepegawaian",
      "Mengajukan surat pindah ke instansi lain di hari pertama",
      "Menerima penempatan dengan integritas, segera mempelajari regulasi dan proses bisnis di unit baru, cepat beradaptasi, dan mengerahkan kemampuan terbaik untuk berkinerja unggul",
      "Meminta orang lain mengerjakan tugas pokok Anda"
    ],
    "Opsi D bernilai 5 karena menunjukkan loyalitas, daya adaptasi tinggi (agility), dan dedikasi abdi negara di mana pun ditempatkan."
  ),
  makeTkp(
    "tkp-pro-018", "profesionalisme",
    "Anda menemukan bahwa format pelaporan kinerja bulanan di unit Anda menggunakan aplikasi yang sudah usang dan rawan kehilangan data. Sikap Anda adalah...",
    [2, 3, 4, 5, 1],
    [
      "Mendiamkan saja sampai sistem benar-benar rusak total",
      "Mengeluh di media sosial tanpa memberikan usulan",
      "Membuat sistem baru sendiri dan memaksa semua orang memakainya tanpa izin",
      "Menyusun usulan telaah teknis modernisasi sistem pelaporan kepada pimpinan dengan menyajikan alternatif solusi yang lebih aman, efisien, dan mudah digunakan",
      "Menghapus data di aplikasi lama"
    ],
    "Opsi D bernilai 5 karena memiliki inisiatif inovasi yang terstruktur dan santun sesuai alur tata kelola birokrasi."
  ),
  makeTkp(
    "tkp-pro-019", "profesionalisme",
    "Seorang tokoh masyarakat berpengaruh di kota Anda meminta agar anaknya diloloskan dalam seleksi penerimaan tenaga honorer dinas meskipun kualifikasinya tidak memenuhi syarat. Sikap Anda sebagai panitia seleksi adalah...",
    [1, 2, 4, 5, 3],
    [
      "Meloloskannya karena takut dengan pengaruh tokoh tersebut",
      "Meminta imbalan uang pelicin kepada tokoh tersebut",
      "Menolak secara kasar dan mempermalukannya di depan publik",
      "Menolak permintaan tersebut dengan sangat sopan dan tegas, menjelaskan bahwa seleksi didasarkan pada standar kompetensi dan meritokrasi yang adil bagi seluruh pelamar",
      "Menyerahkan keputusan kepada staf lain agar Anda bebas dari tanggung jawab"
    ],
    "Opsi D bernilai 5 karena berani menjaga integritas dan meritokrasi seleksi dengan kesantunan komunikasi yang profesional."
  ),
  makeTkp(
    "tkp-pro-020", "profesionalisme",
    "Dalam melaksanakan tugas, Anda menyadari telah melakukan kesalahan input data yang telah diserahkan kepada atasan dan belum disadari oleh siapa pun. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menyembunyikan kesalahan tersebut dan berharap tidak ada yang tahu",
      "Menyalahkan program komputer jika nanti kesalahan tersebut terungkap",
      "Mengubah data diam-diam tanpa memberitahu atasan",
      "Segera menemui atasan secara kesatria, mengakui kekeliruan data tersebut dengan jujur, membawa data yang sudah diperbaiki, dan bertanggung jawab memperbaiki dampaknya",
      "Meminta rekan lain mengaku sebagai penyebab kesalahan"
    ],
    "Opsi D bernilai 5 karena berintegritas tinggi, jujur, berani bertanggung jawab atas kesalahan sendiri, dan berorientasi perbaikan."
  ),
  makeTkp(
    "tkp-pro-021", "profesionalisme",
    "Anda melihat tumpukan berkas tugas di meja rekan kerja Anda yang sedang sakit rawat inap di rumah sakit, sementara laporan tersebut dibutuhkan oleh kementerian lusa pagi. Sikap Anda adalah...",
    [2, 3, 4, 5, 1],
    [
      "Membiarkan berkas tersebut menumpuk sampai rekan Anda sembuh",
      "Membawa berkas ke rumah sakit dan menyuruh rekan yang sakit mengerjakannya",
      "Mengerjakan sebagian kecil yang mudah saja",
      "Berkoordinasi dengan atasan dan rekan tim lainnya untuk mengambil alih dan menyelesaikan tugas mendesak tersebut demi kelancaran pencapaian target dinas",
      "Menolak membantu karena bukan uraian tugas Anda"
    ],
    "Opsi D bernilai 5 karena memiliki komitmen kinerja kolektif, empati terhadap rekan, dan sigap mengamankan target organisasi."
  ),
  makeTkp(
    "tkp-pro-022", "profesionalisme",
    "Pimpinan instansi menginstruksikan efisiensi anggaran belanja operasional kantor di tengah pengetatan fiskal. Kontribusi yang dapat Anda lakukan adalah...",
    [2, 3, 4, 5, 1],
    [
      "Menolak bekerja jika fasilitas pendingin ruangan dikurangi",
      "Membeli perlengkapan kantor sendiri dengan uang pribadi terus-menerus",
      "Mendiamkan saja karena anggaran bukan urusan staf",
      "Menghemat penggunaan listrik, mematikan perangkat elektronik saat tidak digunakan, memprioritaskan komunikasi digital tanpa cetak kertas berlebihan, dan efisiensi konsumsi rapat",
      "Mengambil inventaris kantor untuk dibawa pulang"
    ],
    "Opsi D bernilai 5 karena memiliki kesadaran efisiensi belanja negara dan berhemat dalam pemanfaatan sumber daya publik."
  ),
  makeTkp(
    "tkp-pro-023", "profesionalisme",
    "Saat Anda sedang cuti tahunan resmi bersama keluarga di luar kota, atasan menelepon meminta Anda memberikan petunjuk letak dokumen arsip penting yang sangat darurat dibutuhkan pimpinan. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mematikan ponsel dan menolak menjawab panggilan atasan",
      "Memarahi atasan karena mengganggu waktu liburan cuti Anda",
      "Menyuruh atasan mencari sendiri di tumpukan gudang",
      "Mengangkat telepon dengan ramah, memberikan petunjuk lokasi dokumen secara jelas dan detail, serta memastikan dokumen tersebut berhasil ditemukan oleh rekan di kantor",
      "Menunda menjawab telepon sampai masa cuti selesai seminggu kemudian"
    ],
    "Opsi D bernilai 5 karena bertanggung jawab, kooperatif, dan membantu kelancaran urusan darurat dinas tanpa mengorbankan liburan keluarga secara berlebihan."
  ),
  makeTkp(
    "tkp-pro-024", "profesionalisme",
    "Di lingkungan kerja Anda, berkembang budaya pulang lebih awal dari jam dinas resmi di hari Jumat siang. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut pulang lebih awal setiap hari Jumat",
      "Mengajak seluruh kantor ikut pulang bersama",
      "Pulang awal tetapi menitip absen fingerprint",
      "Tetap konsisten mematuhi jam kerja dinas resmi hingga waktu pulang yang ditentukan, menyelesaikan kewajiban tugas dinas, dan menjadi teladan kedisiplinan kerja",
      "Memarahi dan meneriaki rekan-rekan yang pulang awal di pintu keluar"
    ],
    "Opsi D bernilai 5 karena memiliki integritas kedisiplinan yang kokoh dan tidak mudah terpengaruh kebiasaan buruk lingkungan sekitar."
  ),
  makeTkp(
    "tkp-pro-025", "profesionalisme",
    "Pandangan Anda mengenai konsep ASN sebagai pelayan masyarakat (public servant) adalah...",
    [1, 2, 4, 5, 3],
    [
      "ASN adalah kelompok priyayi yang harus dihormati dan dilayani oleh warga",
      "ASN bekerja hanya demi mendapatkan gaji bulanan dan tunjangan pensiun",
      "ASN adalah penguasa yang berhak mengatur warga sesuai kehendak pribadi",
      "ASN adalah amanah pengabdian profesi yang bertugas memberikan pelayanan prima, berkeadilan, dan berkualitas kepada masyarakat demi kemajuan bangsa",
      "ASN cukup bekerja sesuai jam kantor tanpa perlu memikirkan dampak sosial"
    ],
    "Opsi D bernilai 5 karena menjiwai nilai hakiki reformasi birokrasi dan core values ASN yang berorientasi pelayanan publik."
  ),

  // --- ANTI-RADIKALISME (20 soal) ---
  makeTkp(
    "tkp-rad-001", "anti-radikalisme",
    "Di grup percakapan WhatsApp internal rekan kerja kantor, seorang pegawai membagikan tautan artikel berita dari situs tidak resmi yang memuat narasi kebencian terhadap kelompok agama tertentu dan mengajak untuk tidak mematuhi hukum negara. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut menyebarkan tautan tersebut ke grup keluarga dan media sosial pribadi",
      "Mendiamkan saja karena menganggap hal tersebut adalah kebebasan berpendapat",
      "Membalas dengan memaki dan menghina rekan tersebut di dalam grup",
      "Mengingatkan rekan tersebut secara santun namun tegas bahwa ASN dilarang menyebarkan konten intoleran dan provokatif, memverifikasi fakta dari sumber resmi, dan bila terus berulang melaporkannya ke pimpinan",
      "Mendukung isi pesan tersebut secara diam-diam"
    ],
    "Opsi D bernilai 5 karena berani bertindak tegas mencegah penyebaran paham intoleransi di lingkungan kerja dengan komunikasi yang terukur dan taat aturan."
  ),
  makeTkp(
    "tkp-rad-002", "anti-radikalisme",
    "Anda mengetahui seorang rekan kerja mulai menunjukkan perubahan perilaku drastis: menarik diri dari pergaulan sosial kantor, sering mengafirkan rekan lain yang berbeda pandangan, dan menyatakan bahwa Pancasila sudah usang dan harus diganti dengan sistem khilafah/teokrasi. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut terpengaruh dan mengikuti pandangan barunya",
      "Memusuhi dan mengucilkan rekan tersebut tanpa berbuat apa-apa",
      "Mendukung pandangannya asalkan tidak melanggar jam kerja kantor",
      "Mengajaknya berdialog santai untuk memahami pemikirannya, memberikan pandangan moderat mengenai keutuhan NKRI dan nilai luhur Pancasila, serta berkoordinasi dengan atasan/tim pencegahan radikalisme instansi",
      "Melaporkan ke media massa agar rekan tersebut viral dan dipecat seketika"
    ],
    "Opsi D bernilai 5 karena mengedepankan pendekatan humanis-persuasif untuk deradikalisasi awal sekaligus mematuhi prosedur pelaporan internal demi keamanan negara."
  ),
  makeTkp(
    "tkp-rad-003", "anti-radikalisme",
    "Dalam sebuah acara keagamaan di kompleks tempat tinggal Anda, penceramah mulai menyelipkan materi ujaran kebencian terhadap lambang negara dan menyerukan pemberontakan terhadap pemerintahan yang sah. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut menyetujui dan membagikan rekaman ceramah provokatif tersebut",
      "Duduk tenang dan menikmati ceramah tersebut",
      "Bertepuk tangan saat penceramah mencela lambang negara",
      "Secara bijaksana tidak terprovokasi, berkoordinasi dengan pengurus DKM/panitia dan tokoh masyarakat setempat untuk menegur penceramah agar mematuhi rambu moderasi beragama, serta melaporkan ke pihak berwenang jika ada indikasi makar",
      "Mengajak jamaah lain langsung baku hantam di lokasi"
    ],
    "Opsi D bernilai 5 karena matang, tidak mudah terprovokasi, dan menggunakan saluran kelembagaan warga yang sah untuk menghentikan narasi radikalisme."
  ),
  makeTkp(
    "tkp-rad-004", "anti-radikalisme",
    "Sebagai seorang aparatur negara, pemahaman Anda mengenai konsep moderasi beragama di Indonesia adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mencampuradukkan ajaran semua agama menjadi satu keyakinan baru",
      "Mengurangi ketaatan menjalankan ibadah agama masing-masing",
      "Menolak ajaran agama dan menganut paham ateisme murni",
      "Menjalankan keyakinan agama sendiri secara teguh dan mendalam, sambil menghargai, menghormati, dan bersikap adil terhadap hak pemeluk agama lain dalam bingkai kesepakatan kebangsaan Pancasila",
      "Menyerahkan seluruh urusan ibadah kepada aparat keamanan"
    ],
    "Opsi D bernilai 5 karena memahami esensi moderasi beragama Kementerian Agama: teguh dalam beriman, toleran dalam kebhinekaan kebangsaan."
  ),
  makeTkp(
    "tkp-rad-005", "anti-radikalisme",
    "Anda menemukan selebaran gelap berisi ajakan bergabung dengan gerakan kelompok ekstremis terlarang diselipkan di sela-sela buku perpustakaan kantor Anda. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Membaca dan mengikuti petunjuk bergabung di selebaran tersebut",
      "Membiarkan selebaran tersebut tetap di tempatnya",
      "Membawa pulang selebaran tersebut untuk dibagikan ke teman",
      "Segera mengamankan selebaran tersebut, melaporkannya kepada kepala perpustakaan dan unit keamanan kantor untuk ditelusuri pelakunya serta diperiksa CCTV",
      "Menyebarkan foto selebaran ke media sosial pribadi"
    ],
    "Opsi D bernilai 5 karena sigap mencegah peredaran propaganda radikalisme di fasilitas umum kedinasan secara prosedural."
  ),
  makeTkp(
    "tkp-rad-006", "anti-radikalisme",
    "Seorang rekan kerja menolak untuk berdiri dan menyanyikan lagu Indonesia Raya serta menolak menghormat bendera Merah Putih saat upacara hari Senin dengan alasan paham keyakinannya melarang hal tersebut. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut menolak menghormat bendera Merah Putih",
      "Mendiamkan saja karena merasa bukan urusan Anda",
      "Memukul rekan tersebut di lapangan upacara",
      "Menjelaskan secara santun bahwa penghormatan bendera adalah simbol konsensus kebangsaan dan cinta tanah air yang tidak bertentangan dengan keimanan, serta melaporkan ke atasan pembina kepegawaian untuk pembinaan ideologi",
      "Mengejek dan menertawakannya di media sosial"
    ],
    "Opsi D bernilai 5 karena menegakkan komitmen kebangsaan ASN dan mendorong pembinaan yang konstruktif melalui pembina kepegawaian."
  ),
  makeTkp(
    "tkp-rad-007", "anti-radikalisme",
    "Media sosial saat ini menjadi sarana utama perekrutan dan penyebaran konten propaganda radikal berbasis algoritma. Peran aktif Anda dalam menangkal hal tersebut di ruang siber adalah...",
    [2, 3, 4, 5, 1],
    [
      "Menutup semua akun media sosial Anda",
      "Menjadi konsumen pasif tanpa pernah bersuara",
      "Membagikan konten radikal untuk mengecek reaksi teman",
      "Aktif memproduksi dan membagikan narasi positif, pesan toleransi, wawasan kebangsaan, serta melaporkan (report/flagging) akun penyebar terorisme dan ujaran kebencian ke portal resmi pemerintah",
      "Membuat akun palsu untuk menyerang akun radikal dengan kata kasar"
    ],
    "Opsi D bernilai 5 karena berperan sebagai agen literasi siber positif dan berkontribusi nyata menekan ruang gerak propaganda ekstremisme."
  ),
  makeTkp(
    "tkp-rad-008", "anti-radikalisme",
    "Anda ditugaskan menyusun program sosialisasi pencegahan radikalisme bagi kalangan remaja di wilayah kerja Anda. Pendekatan materi yang paling efektif adalah...",
    [1, 3, 4, 5, 2],
    [
      "Mengancam remaja dengan hukuman penjara seumur hidup",
      "Memberikan ceramah doktriner yang kaku dan membosankan berjam-jam",
      "Membatasi akses internet seluruh remaja di desa",
      "Menggunakan pendekatan kreatif dan interaktif (diskusi kritis, film edukatif, workshop literasi media digital, pelibatan influencer positif) yang membangun daya nalar kritis anak muda",
      "Menyuruh remaja berbaris militer setiap hari"
    ],
    "Opsi D bernilai 5 karena memahami psikologi generasi muda dan menggunakan instrumen edukasi partisipatif yang efektif membangun ketahanan ideologis."
  ),
  makeTkp(
    "tkp-rad-009", "anti-radikalisme",
    "Seorang anggota keluarga dekat Anda mulai sering mengakses situs web dan kanal Telegram terafiliasi organisasi ekstremis kekerasan internasional. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mendukung ketertarikannya terhadap organisasi tersebut",
      "Mendiamkan saja karena menganggapnya urusan pribadi keluarga",
      "Mengusir anggota keluarga tersebut dari rumah tanpa dialog",
      "Mendekatinya secara penuh kasih sayang keluarga, berdiskusi kritis mengenai bahaya manipulasi ideologi kekerasan, melibatkannya dalam pergaulan positif, dan bila perlu berkonsultasi dengan psikolog / tokoh agama moderat",
      "Menyerahkannya langsung ke kantor polisi tanpa pembinaan awal"
    ],
    "Opsi D bernilai 5 karena mengedepankan kepedulian keluarga sebagai benteng utama pertahanan dari jeratan radikalisme."
  ),
  makeTkp(
    "tkp-rad-010", "anti-radikalisme",
    "Dalam sebuah diskusi di ruang istirahat kantor, timbul perdebatan sengit mengenai apakah Pancasila sesuai dengan nilai-nilai ketuhanan. Pandangan Anda dalam diskusi tersebut adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menyatakan bahwa Pancasila adalah buatan manusia yang haram ditaati",
      "Mendiamkan dan membiarkan perdebatan memecah belah rekan kerja",
      "Menyatakan bahwa agama tidak boleh ada di Indonesia",
      "Menegaskan dengan argumen historis dan filosofis bahwa Pancasila (terutama Sila Pertama) lahir dari intisari nilai-nilai luhur ketuhanan bangsa Indonesia dan merupakan titik temu (kalimatun sawa) yang menyatukan seluruh rakyat",
      "Mencaci maki rekan yang berbeda pendapat"
    ],
    "Opsi D bernilai 5 karena memiliki wawasan kebangsaan yang mendalam dan mampu menjelaskan kedudukan mulia Pancasila secara rasional dan menyejukkan."
  ),
  makeTkp(
    "tkp-rad-011", "anti-radikalisme",
    "Organisasi masyarakat di sekitar rumah dinas Anda menolak izin pendirian rumah ibadah agama lain yang sah dan telah mengantongi izin resmi dari pemerintah daerah. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut berdemonstrasi menolak pendirian rumah ibadah tersebut",
      "Menyalahkan pemerintah daerah yang menerbitkan izin",
      "Mendiamkan saja meskipun terjadi intimidasi terhadap kelompok minoritas",
      "Mendukung tegaknya hukum dan perlindungan hak konstitusional warga negara untuk beribadah, serta mendorong dialog musyawarah antarwarga bersama FKUB untuk merawat kerukunan",
      "Menyerang ormas yang menolak secara fisik"
    ],
    "Opsi D bernilai 5 karena menghormati supremasi hukum, hak asasi konstitusional, dan mengedepankan dialog Forum Kerukunan Umat Beragama (FKUB)."
  ),
  makeTkp(
    "tkp-rad-012", "anti-radikalisme",
    "Anda mendapati akun media sosial salah seorang pegawai negeri di instansi Anda sering menyukai (like) dan membagikan ulang postingan yang memuji aksi terorisme bom bunuh diri. Tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut membagikan postingan terorisme tersebut",
      "Menyukai postingan rekan tersebut untuk menghargai teman",
      "Mendiamkan saja karena menganggap media sosial adalah ranah bebas",
      "Menyimpan bukti tangkapan layar (screenshot) postingan tersebut dan segera melaporkannya kepada pimpinan instansi dan unit kepatuhan internal untuk ditindaklanjuti sesuai PP Disiplin PNS",
      "Mengomentari postingan tersebut dengan ajakan perang"
    ],
    "Opsi D bernilai 5 karena sigap mengumpulkan bukti akuntabel dan melaporkannya melalui mekanisme resmi kedisiplinan ASN guna mencegah bibit terorisme."
  ),
  makeTkp(
    "tkp-rad-013", "anti-radikalisme",
    "Pandangan Anda mengenai sikap fanatisme berlebihan yang menganggap hanya kelompoknya yang berhak masuk surga dan memandang kelompok lain sebagai musuh yang halal diperangi adalah...",
    [1, 2, 4, 5, 3],
    [
      "Sikap yang paling benar dan wajib diikuti oleh seluruh ASN",
      "Sikap yang patut dibiarkan berkembang di kantor",
      "Sikap biasa yang tidak berdampak bagi kehidupan berbangsa",
      "Paham takfiri dan eksklusif yang sangat berbahaya bagi tenun kebangsaan Indonesia dan harus dicegah melalui pemahaman keagamaan yang inklusif, damai, dan rahmat bagi semesta",
      "Paham yang perlu didukung dengan anggaran negara"
    ],
    "Opsi D bernilai 5 karena menolak tegas paham takfiri radikal dan mempromosikan pemahaman keagamaan yang damai serta toleran."
  ),
  makeTkp(
    "tkp-rad-014", "anti-radikalisme",
    "Di sebuah sekolah binaan dinas Anda, guru mengajarkan doktrin anti-NKRI kepada murid-murid di kelas. Langkah tegas yang Anda rekomendasikan adalah...",
    [1, 2, 4, 5, 3],
    [
      "Membiarkan guru tersebut mengajar sesuka hatinya",
      "Mendukung materi anti-NKRI dimasukkan ke dalam kurikulum",
      "Memindahkan murid yang tidak setuju ke sekolah lain",
      "Melaporkan temuan tersebut secara resmi ke Dinas Pendidikan dan aparat pengawas untuk menonaktifkan guru tersebut, melakukan audit materi ajar, dan memberikan pemulihan wawasan kebangsaan kepada para siswa",
      "Membakar gedung sekolah tersebut"
    ],
    "Opsi D bernilai 5 karena melindungi generasi penerus bangsa dari indoktrinasi radikalisme melalui tindakan korektif dan pembinaan menyeluruh."
  ),
  makeTkp(
    "tkp-rad-015", "anti-radikalisme",
    "Badan Nasional Penanggulangan Terorisme (BNPT) menetapkan kesiapsiagaan nasional, kontra-radikalisasi, dan deradikalisasi sebagai strategi pencegahan terorisme. Bentuk dukungan Anda sebagai aparatur adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyerahkan seluruh urusan pertahanan hanya kepada polisi dan tentara",
      "Menolak aturan keselamatan dan keamanan lingkungan dinas",
      "Memperkuat ketahanan pribadi dan keluarga dari pengaruh ideologi ekstremis, menjaga iklim kerja yang toleran, serta aktif berkoordinasi bila mendeteksi potensi ancaman",
      "Mencurigai semua orang yang berpenampilan agamis",
      "Menyebarkan kepanikan isu terorisme di media sosial"
    ],
    "Opsi C bernilai 5 karena mengambil peran pencegahan preventif secara proporsional dan tidak terjebak islamofobia atau prasangka buta."
  ),
  makeTkp(
    "tkp-rad-016", "anti-radikalisme",
    "Ketika Anda melihat tetangga baru di kompleks perumahan bersikap sangat tertutup, menolak bersosialisasi, dan sering mengadakan pertemuan mencurigakan di tengah malam dengan orang-orang asing, tindakan Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung menggerebek rumah tersebut bersama preman",
      "Mendiamkan saja dan pura-pura tidak melihat",
      "Menyebarkan desas-desus liar tanpa bukti di grup arisan",
      "Melaporkan kejanggalan aktivitas tersebut secara bijaksana dan cermat kepada ketua RT/RW dan Bhabinkamtibmas/Babinsa setempat untuk dipantau secara resmi",
      "Ikut bergabung dalam pertemuan malam tersebut tanpa pertimbangan"
    ],
    "Opsi D bernilai 5 karena mengedepankan prinsip kewaspadaan dini masyarakat (early warning system) melalui aparat lingkungan yang sah."
  ),
  makeTkp(
    "tkp-rad-017", "anti-radikalisme",
    "Seorang rekan kerja menolak bekerjasama dalam tim dengan rekan lain yang berbeda suku dan agama, menyatakan bahwa ia tidak mau dipimpin oleh orang yang bukan dari golongannya. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mendukung penolakannya dan memecah belah tim",
      "Mendiamkan dan membiarkan tim tidak bekerja",
      "Menyuruh rekan yang ditolak untuk pindah kantor",
      "Mengingatkan rekan tersebut bahwa ASN bekerja atas dasar sumpah setia kepada Pancasila dan UUD 1945 yang mewajibkan pengabdian profesional tanpa diskriminasi SARA",
      "Melaporkan ke media massa agar rekan tersebut dihujat netizen"
    ],
    "Opsi D bernilai 5 karena tegak lurus pada sumpah jabatan ASN sebagai abdi negara yang mengabdi bagi seluruh tumpah darah Indonesia tanpa sekat primordial."
  ),
  makeTkp(
    "tkp-rad-018", "anti-radikalisme",
    "Di tengah maraknya polarisasi opini politik di tahun pemilu, sikap Anda sebagai ASN dalam menjaga netralitas dan persatuan bangsa adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menjadi tim sukses salah satu pasangan calon secara terang-terangan",
      "Menggunakan fasilitas dinas kantor untuk kampanye politik golongan",
      "Membuat konten hoaks untuk menjatuhkan calon yang tidak Anda sukai",
      "Menjaga netralitas secara mutlak, tidak memihak dalam tindakan maupun unggahan media sosial, serta menjadi penyejuk suasana dan penjaga kohesi sosial di masyarakat",
      "Menolak menggunakan hak pilih dalam pemilu (golput provokatif)"
    ],
    "Opsi D bernilai 5 karena menjalankan amanat UU ASN untuk menjaga netralitas politik demi merawat keutuhan dan stabilitas nasional."
  ),
  makeTkp(
    "tkp-rad-019", "anti-radikalisme",
    "Anda mendapati artikel berita yang memutarbalikkan fakta sejarah perjuangan para pahlawan kemerdekaan dan mendiskreditkan tokoh-tokoh bangsa pendiri republik. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mempercayai artikel tersebut tanpa memeriksa sumber primer",
      "Ikut menyebarkan narasi manipulatif tersebut ke generasi muda",
      "Mengabaikannya dan menganggap sejarah tidak penting",
      "Mempelajari fakta sejarah dari dokumen primer dan sumber sejarawan kredibel, tidak ikut menyebarkan disinformasi tersebut, serta meluruskan narasi secara edukatif dan santun",
      "Membakar buku-buku sejarah di perpustakaan"
    ],
    "Opsi D bernilai 5 karena memiliki literasi sejarah yang kuat dan kritis menjaga memori kolektif kebangsaan dari upaya dekonstruksi radikal."
  ),
  makeTkp(
    "tkp-rad-020", "anti-radikalisme",
    "Komitmen tertinggi seorang Aparatur Sipil Negara (ASN) dalam menjaga keutuhan Negara Kesatuan Republik Indonesia dari ancaman radikalisme adalah...",
    [1, 2, 4, 5, 3],
    [
      "Hanya setia kepada atasan langsung yang memberikan jabatan",
      "Mengutamakan kepentingan partai politik pendukung",
      "Bekerja sekadar menggugurkan kewajiban administratif semata",
      "Menjunjung tinggi sumpah jabatan, setia dan taat sepenuhnya kepada Pancasila, UUD NRI Tahun 1945, NKRI, dan pemerintah yang sah, serta aktif merawat persatuan dalam kemajemukan bangsa",
      "Mencari keuntungan materi sebanyak-banyaknya selama menjabat"
    ],
    "Opsi D bernilai 5 karena merupakan sumpah kesetiaan tertinggi ASN sebagai benteng kedaulatan ideologi negara."
  ),
];
