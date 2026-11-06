import { makeTkp, RawQuestionDef } from "../scripts/seed-builder-helpers";

export const TKP_PART1_QUESTIONS: RawQuestionDef[] = [
  // --- PELAYANAN PUBLIK (25 soal) ---
  makeTkp(
    "tkp-pel-001", "pelayanan-publik",
    "Saat Anda bertugas di loket pelayanan publik, seorang warga lanjut usia tampak bingung dan kesulitan mengisi formulir permohonan digital di layar sentuh anjungan mandiri. Antrean di belakangnya mulai memanjang. Sikap Anda adalah...",
    [2, 3, 4, 5, 1],
    [
      "Menyuruh warga lain di antrean untuk membantu kakek tersebut",
      "Meminta kakek tersebut menepi dan menunggu sampai jam loket sepi",
      "Memberikan instruksi lisan dari balik loket agar kakek tersebut mengerti",
      "Mendekati kakek tersebut secara ramah, memandunya mengisi formulir dengan sabar, sambil memohon pengertian warga yang mengantre",
      "Membiarkan kakek tersebut mencoba sendiri agar terbiasa dengan teknologi digital"
    ],
    "Opsi D bernilai 5 karena mengedepankan empati, kesigapan membantu kelompok rentan/lansia tanpa mengabaikan komunikasi yang ramah dengan antrean lain."
  ),
  makeTkp(
    "tkp-pel-002", "pelayanan-publik",
    "Seorang warga datang dengan nada marah dan suara keras karena berkas permohonan izin usahanya belum selesai melampaui estimasi waktu standar pelayanan (SOP). Sikap Anda dalam menghadapi situasi tersebut adalah...",
    [1, 3, 2, 5, 4],
    [
      "Membalas dengan nada keras agar warga tersebut menjaga ketertiban kantor",
      "Meminta petugas keamanan (satpam) untuk mengusir warga tersebut keluar ruangan",
      "Mendiamkan warga tersebut sampai emosinya reda dengan sendirinya",
      "Menyambut warga dengan tenang dan sopan, mendengarkan keluhannya, mengecek status berkas di sistem, lalu menjelaskan penyebab kendala serta memberikan kepastian solusi",
      "Meminta warga menemui pimpinan langsung karena keterlambatan bukan kesalahan Anda pribadi"
    ],
    "Opsi D bernilai 5 karena memperlihatkan kematangan emosi, keterbukaan menerima komplain warga, dan berorientasi pada pencarian solusi konkret."
  ),
  makeTkp(
    "tkp-pel-003", "pelayanan-publik",
    "Menjelang jam istirahat kantor siang hari, datang seorang warga dari desa terpencil yang menempuh perjalanan berjam-jam untuk mengurus dokumen kependudukan mendesak. Sikap Anda adalah...",
    [3, 2, 5, 4, 1],
    [
      "Menyuruhnya menunggu di luar kantor sampai jam istirahat selesai tepat pukul 13.00",
      "Menolak berkasnya dan menyuruhnya datang kembali besok pagi",
      "Menunda istirahat sejenak untuk melayani permohonan warga tersebut hingga tuntas sebelum istirahat",
      "Menerima berkasnya, menyuruhnya makan siang, dan berjanji mengerjakannya pertama kali saat loket buka kembali",
      "Menutup loket tepat waktu tanpa menghiraukan kondisi warga"
    ],
    "Opsi C bernilai 5 karena mengedepankan orientasi pelayanan dan kepedulian tulus terhadap warga yang membutuhkan bantuan mendesak."
  ),
  makeTkp(
    "tkp-pel-004", "pelayanan-publik",
    "Seorang pemohon izin memberikan amplop berisi uang tanda terima kasih setelah urusan dokumennya Anda selesaikan dengan cepat dan gratis sesuai SOP. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menerima amplop tersebut karena diberikan secara sukarela tanpa diminta",
      "Menerima amplop lalu memasukkannya ke kas sosial kantor secara diam-diam",
      "Menolak amplop dengan tegas disertai teguran keras di depan umum",
      "Menolak amplop secara santun dan ramah sambil menjelaskan bahwa pelayanan tersebut memang hak masyarakat dan sudah menjadi kewajiban dinas tanpa pungutan biaya apa pun",
      "Menolak amplop tersebut hanya jika ada kamera pengawas CCTV di ruangan"
    ],
    "Opsi D bernilai 5 karena menjaga integritas aparatur tanpa melukai perasaan warga dengan penjelasan edukatif yang santun."
  ),
  makeTkp(
    "tkp-pel-005", "pelayanan-publik",
    "Instansi Anda baru saja meluncurkan aplikasi layanan perizinan daring. Sebagian besar warga masyarakat masih terbiasa datang manual ke kantor dan mengeluh kesulitan mengakses aplikasi. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menolak seluruh berkas manual dan memaksa warga memakai aplikasi tanpa bantuan",
      "Menghapus aplikasi daring dan kembali sepenuhnya ke berkas kertas manual",
      "Menyiapkan meja pendampingan (helpdesk) khusus untuk membimbing warga memakai aplikasi sambil membagikan panduan visual ringkas",
      "Menerima berkas manual seperti biasa tanpa mendorong penggunaan aplikasi baru",
      "Membiarkan warga mencari bantuan jasa calo internet di luar kantor"
    ],
    "Opsi C bernilai 5 karena mengombinasikan transformasi digital dengan edukasi ramah publik secara bertahap."
  ),
  makeTkp(
    "tkp-pel-006", "pelayanan-publik",
    "Seorang warga penyandang disabilitas tuna rungu datang ke loket Anda untuk berkonsultasi mengenai persyaratan bantuan sosial. Anda belum menguasai bahasa isyarat secara fasih. Tindakan Anda adalah...",
    [4, 2, 5, 3, 1],
    [
      "Berkomunikasi dengan gerakan tangan semampunya dan mimik wajah ramah",
      "Menyuruh pemohon mengajak pendamping yang bisa berbicara lancar",
      "Menyediakan kertas dan alat tulis atau media ketik gawai untuk berkomunikasi secara tertulis dengan jelas, ramah, dan teliti",
      "Meminta rekan kerja lain yang ada di ruangan untuk menanganinya",
      "Menolak melayani karena kendala komunikasi fisik"
    ],
    "Opsi C bernilai 5 karena responsif mencari media alternatif komunikasi yang efektif guna menjamin hak layanan inklusif."
  ),
  makeTkp(
    "tkp-pel-007", "pelayanan-publik",
    "Sistem server pelayanan dokumen di kantor Anda tiba-tiba mengalami gangguan jaringan (down) saat puluhan warga sedang mengantre. Tindakan yang paling tepat adalah...",
    [1, 3, 5, 4, 2],
    [
      "Pergi meninggalkan loket tanpa memberi tahu warga yang mengantre",
      "Menyuruh warga pulang dan datang kembali minggu depan",
      "Mengumumkan secara terbuka permohonan maaf atas gangguan teknis, memberikan estimasi perbaikan dari tim IT, serta menawarkan opsi pencatatan manual sementara",
      "Melanjutkan santai sambil menunggu perbaikan server tanpa berkomunikasi dengan antrean",
      "Menyalahkan tim IT kantor di depan warga yang mengeluh"
    ],
    "Opsi C bernilai 5 karena transparan, akuntabel, dan menjaga ketenangan publik dalam situasi darurat pelayanan."
  ),
  makeTkp(
    "tkp-pel-008", "pelayanan-publik",
    "Anda menemukan bahwa alur pengurusan surat keterangan di unit Anda memiliki tiga tahapan birokrasi verifikasi berulang yang sebenarnya dapat disederhanakan tanpa mengurangi validitas hukum. Sikap Anda adalah...",
    [2, 3, 4, 5, 1],
    [
      "Mendiamkan saja karena alur tersebut sudah berjalan bertahun-tahun",
      "Mengabaikan tahapan tersebut secara sepihak tanpa izin pimpinan",
      "Membicarakan kelemahan sistem tersebut kepada pemohon layanan",
      "Menyusun usulan kajian penyederhanaan alur (debottlenecking) berbasis data efisiensi waktu untuk dipresentasikan kepada pimpinan",
      "Mengeluh kepada sesama rekan kerja di jam istirahat"
    ],
    "Opsi D bernilai 5 karena menunjukkan inisiatif perbaikan berkelanjutan (continuous improvement) demi kepuasan publik."
  ),
  makeTkp(
    "tkp-pel-009", "pelayanan-publik",
    "Warga pemohon layanan mengeluhkan ruangan tunggu pelayanan kantor yang terasa pengap dan AC yang tidak berfungsi optimal. Tindakan Anda adalah...",
    [3, 4, 5, 2, 1],
    [
      "Menyampaikan bahwa anggaran kantor terbatas",
      "Membuka jendela ruangan tunggu seadanya",
      "Mencatat keluhan, membuka ventilasi/menyalakan kipas darurat, dan segera berkoordinasi dengan bagian umum perlengkapan untuk perbaikan teknis",
      "Menyarankan warga menunggu di luar ruangan saja",
      "Mengabaikan komplain karena tugas Anda hanya memeriksa berkas"
    ],
    "Opsi C bernilai 5 karena tanggap memberikan kenyamanan langsung sekaligus koordinasi perbaikan fasilitas."
  ),
  makeTkp(
    "tkp-pel-010", "pelayanan-publik",
    "Seorang kerabat dekat Anda meminta bantuan agar berkas permohonannya diproses terlebih dahulu tanpa perlu mengambil nomor antrean loket. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung melayaninya terlebih dahulu karena ia kerabat dekat",
      "Menyuruhnya menunggu di mobil dan Anda mengerjakan berkasnya sembunyi-sembunyi",
      "Menolak dengan ketus agar ia tidak berani meminta tolong lagi",
      "Memberikan pemahaman dengan santun bahwa semua pemohon dilayani secara adil sesuai nomor urut antrean demi ketertiban bersama",
      "Mengambilkan nomor antrean paling belakang untuknya secara terpaksa"
    ],
    "Opsi D bernilai 5 karena memegang teguh prinsip keadilan pelayanan publik dan integritas anti-nepotisme."
  ),
  makeTkp(
    "tkp-pel-011", "pelayanan-publik",
    "Dalam proses pelayanan tatap muka, Anda mendapati pemohon yang berbicara dengan bahasa daerah yang kurang Anda pahami. Tindakan Anda adalah...",
    [2, 5, 3, 4, 1],
    [
      "Meminta warga tersebut berbicara dengan bahasa Indonesia baku yang cepat",
      "Mendengarkan dengan penuh perhatian, berbicara perlahan menggunakan bahasa Indonesia sederhana, atau meminta bantuan rekan sedaerah untuk menerjemahkan secara ramah",
      "Mengabaikan perkataannya dan hanya membaca berkas yang dibawanya",
      "Meminta warga tersebut mencari penerjemah sendiri sebelum datang ke loket",
      "Menertawakan logat bahasanya di hadapan rekan kerja"
    ],
    "Opsi B bernilai 5 karena inklusif, menghormati keragaman kultural, dan berorientasi menuntaskan kebutuhan warga."
  ),
  makeTkp(
    "tkp-pel-012", "pelayanan-publik",
    "Kotak saran dan kritik di kantor Anda sering kosong karena warga enggan menulis manual di kertas. Inovasi yang dapat Anda usulkan adalah...",
    [3, 5, 4, 2, 1],
    [
      "Menghilangkan kotak saran karena dianggap tidak berguna",
      "Menyediakan survei kepuasan masyarakat digital via QR code di setiap loket dan nomor WhatsApp pengaduan resmi terintegrasi",
      "Mewajibkan setiap pemohon menulis kritik sebelum berkasnya diambil",
      "Meminta satpam menanyai kepuasan pemohon di pintu keluar",
      "Menulis saran palsu agar kotak saran tampak terisi"
    ],
    "Opsi B bernilai 5 karena adaptif terhadap kebiasaan masyarakat digital dan mempermudah partisipasi publik."
  ),
  makeTkp(
    "tkp-pel-013", "pelayanan-publik",
    "Ketika Anda sedang melayani seorang warga, telepon kantor di meja Anda berdering beberapa kali. Tindakan terbaik Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Langsung mengangkat telepon dan membiarkan warga di depan loket menunggu lama",
      "Mematikan dering telepon agar tidak mengganggu",
      "Memohon izin sejenak kepada warga yang sedang dilayani, mengangkat telepon dengan cepat untuk mencatat pesan urgen atau mengarahkan ke nomor ext lain, lalu kembali fokus melayani warga",
      "Menyuruh warga di depan Anda untuk mengangkat telepon tersebut",
      "Membiarkan telepon terus berdering sampai pemanggil menyerah"
    ],
    "Opsi C bernilai 5 karena menghargai orang di depan loket sekaligus tidak mengabaikan komunikasi penting kedinasan."
  ),
  makeTkp(
    "tkp-pel-014", "pelayanan-publik",
    "Seorang warga pemohon merasa tidak puas dengan keputusan penolakan berkasnya karena tidak memenuhi syarat perundang-undangan. Tindakan Anda adalah...",
    [1, 3, 5, 4, 2],
    [
      "Mengejek pemohon karena tidak membaca aturan sebelum datang",
      "Menyerahkan masalah kepada petugas satpam",
      "Menjelaskan dasar hukum penolakan secara jelas dan sabar, menunjukkan poin kekurangan, serta memberikan panduan langkah yang perlu dilengkapi",
      "Meminta pemohon mencari surat rekomendasi pejabat agar bisa dibantu",
      "Mengubah status berkas menjadi lolos demi menghindari keributan"
    ],
    "Opsi C bernilai 5 karena akuntabel sesuai aturan hukum namun tetap solutif dan komunikatif mendidik pemohon."
  ),
  makeTkp(
    "tkp-pel-015", "pelayanan-publik",
    "Standar pelayanan di instansi Anda menetapkan penerbitan surat izin memakan waktu 3 hari kerja. Anda memiliki kapasitas teknis untuk menyelesaikannya dalam waktu 1 hari. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menahan berkas sampai hari ke-3 agar tidak dicap sok rajin oleh rekan",
      "Mengerjakan santai karena batas waktu masih 3 hari",
      "Menyelesaikannya secepat mungkin dalam 1 hari dan segera menginformasikan kepada pemohon bahwa dokumen sudah siap diambil",
      "Menyelesaikan dalam 1 hari tetapi meminta imbalan biaya percepatan",
      "Membiarkan berkas menumpuk sampai ditegur atasan"
    ],
    "Opsi C bernilai 5 karena menunjukkan etos kerja prima melampaui ekspektasi standar demi kepuasan publik."
  ),
  makeTkp(
    "tkp-pel-016", "pelayanan-publik",
    "Saat bertugas di unit pelayanan kesehatan terpadu, Anda melihat seorang ibu menggendong bayi yang demam tinggi mengantre bersama pasien dewasa biasa. Sikap Anda adalah...",
    [2, 4, 5, 3, 1],
    [
      "Membiarkannya menunggu sesuai nomor urut biasa tanpa perkecualian",
      "Menyuruh ibu tersebut meminumkan obat penurun panas sendiri",
      "Berkoordinasi dengan perawat triase untuk memberikan penanganan prioritas kedaruratan medis anak sesuai protokol kegawatdaruratan",
      "Meminta antrean lain sukarela mengalah jika berkenan",
      "Menyuruh ibu tersebut mencari klinik lain yang lebih sepi"
    ],
    "Opsi C bernilai 5 karena mengutamakan keselamatan nyawa melalui mekanisme triase medis yang sah dan profesional."
  ),
  makeTkp(
    "tkp-pel-017", "pelayanan-publik",
    "Warga menyampaikan apresiasi tertulis atas pelayanan prima dan keramahan Anda di media sosial resmi instansi. Sikap Anda terhadap apresiasi tersebut adalah...",
    [2, 4, 5, 3, 1],
    [
      "Menjadi sombong dan merasa paling berjasa di kantor",
      "Meminta atasan memberikan kenaikan gaji istimewa",
      "Menjadikannya motivasi untuk terus konsisten menjaga mutu pelayanan bersama seluruh rekan kerja tim",
      "Mengabaikan begitu saja karena menganggapnya hal biasa",
      "Membagikan postingan tersebut berkali-kali untuk pamer kepada teman"
    ],
    "Opsi C bernilai 5 karena rendah hati, bersyukur, dan menjadikannya pemicu peningkatan mutu tim berkelanjutan."
  ),
  makeTkp(
    "tkp-pel-018", "pelayanan-publik",
    "Anda mendapati bahwa brosur informasi tarif dan persyaratan layanan di papan pengumuman kantor memuat informasi lama yang belum diperbarui. Tindakan Anda adalah...",
    [3, 4, 5, 2, 1],
    [
      "Menunggu bagian humas memperbarui brosur tersebut",
      "Menutup papan pengumuman dengan kain hitam",
      "Segera melaporkan dan berinisiatif mencetak lembar pembaharuan informasi resmi terkini untuk dipasang agar warga tidak tersesat informasi",
      "Menjelaskan manual satu per satu kepada setiap warga yang bertanya",
      "Mendiamkan saja karena bukan tugas pokok Anda"
    ],
    "Opsi C bernilai 5 karena proaktif menjamin keterbukaan informasi publik yang akurat dan mutakhir."
  ),
  makeTkp(
    "tkp-pel-019", "pelayanan-publik",
    "Pada hari Senin pagi, antrean pelayanan sangat padat melebihi kapasitas tempat duduk yang tersedia. Sikap Anda adalah...",
    [1, 3, 5, 4, 2],
    [
      "Menutup pintu gerbang kantor agar antrean tidak bertambah",
      "Bekerja seperti biasa tanpa menghiraukan kondisi pemohon yang berdiri",
      "Membuka loket cadangan tambahan, berkoordinasi menambah kursi tunggu darurat, dan membagikan nomor antrean dengan estimasi waktu yang jelas",
      "Menyuruh warga duduk di lantai teras luar",
      "Meminta pemohon datang sore hari"
    ],
    "Opsi C bernilai 5 karena responsif mengatasi lonjakan antrean secara solutif dan humanis."
  ),
  makeTkp(
    "tkp-pel-020", "pelayanan-publik",
    "Seorang warga tidak sengaja menumpahkan air minum di atas meja loket saat sedang menyerahkan dokumen. Sikap Anda adalah...",
    [2, 4, 5, 3, 1],
    [
      "Memarahi warga karena bertindak ceroboh",
      "Menyuruh warga membersihkan meja sendiri sampai bersih",
      "Menenangkan warga bahwa hal itu tidak apa-apa, segera mengambil lap/tisu untuk mengeringkan dokumen dan meja, lalu melanjutkan pelayanan dengan ramah",
      "Menolak berkas yang sedikit basah dan menyuruhnya membuat ulang berkas baru",
      "Mengomel sambil membersihkan meja dengan wajah masam"
    ],
    "Opsi C bernilai 5 karena menjaga kenyamanan emosional warga, tanggap mengatasi insiden kecil, dan tetap berkepala dingin."
  ),
  makeTkp(
    "tkp-pel-021", "pelayanan-publik",
    "Masyarakat di wilayah kerja Anda sebagian besar adalah petani yang baru bisa mengurus administrasi setelah selesai bekerja di sawah pada sore hari. Solusi yang dapat Anda usulkan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengharuskan petani meninggalkan sawahnya di pagi hari",
      "Menutup layanan kantor lebih awal di hari kerja",
      "Mengusulkan program pelayanan jemput bola (mobile service) di balai desa pada hari libur atau penyesuaian loket layanan sore hari",
      "Menyerahkan pengurusan berkas ke pihak ketiga bertarif mahal",
      "Menolak melayani di luar jam dinas normal kantor"
    ],
    "Opsi C bernilai 5 karena menunjukkan kepekaan sosial dan inovasi pelayanan publik berbasis kebutuhan riil masyarakat."
  ),
  makeTkp(
    "tkp-pel-022", "pelayanan-publik",
    "Seorang pemohon menanyakan status dokumennya yang diajukan minggu lalu. Ketika dicek, staf lain salah menaruh berkas tersebut sehingga belum diproses. Sikap Anda adalah...",
    [1, 3, 5, 4, 2],
    [
      "Menyalahkan staf yang bersangkutan secara terbuka di depan pemohon",
      "Menyuruh pemohon mencari sendiri berkasnya di ruang arsip",
      "Memohon maaf dengan tulus atas kelalaian teknis internal, segera memproses berkas tersebut secara prioritas saat itu juga, dan memastikan selesai hari itu",
      "Meminta pemohon memasukkan berkas baru dari awal",
      "Mengatakan bahwa berkas hilang dan menyuruhnya sabar"
    ],
    "Opsi C bernilai 5 karena berani memikul tanggung jawab korps, berorientasi solusi cepat, dan menjaga martabat instansi."
  ),
  makeTkp(
    "tkp-pel-023", "pelayanan-publik",
    "Dalam rangka mewujudkan Wilayah Bebas dari Korupsi (WBK), langkah nyata yang dapat Anda lakukan di meja layanan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Memasang spanduk besar saja tanpa mengubah perilaku",
      "Menerima pemberian kecil berupa kue dari warga",
      "Memastikan transparansi alur, menolak segala bentuk gratifikasi sekecil apa pun, dan memberikan pelayanan tulus tanpa pamrih",
      "Menghindari kontak mata dengan pemohon agar tidak timbul fitnah",
      "Bekerja hanya bila diawasi tim saber pungli"
    ],
    "Opsi C bernilai 5 karena integritas terinternalisasi dalam tindakan nyata sehari-hari."
  ),
  makeTkp(
    "tkp-pel-024", "pelayanan-publik",
    "Warga lansia yang buta huruf datang meminta dibuatkan surat permohonan. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyuruhnya pulang mencari orang yang bisa membaca dan menulis",
      "Menyuruhnya menandatangani kertas kosong",
      "Membacakan setiap poin formulir secara perlahan, membantunya mengisi sesuai keterangan yang ia berikan, dan mengonfirmasi ulang sebelum meminta cap jempolnya",
      "Mengisi formulir seadanya tanpa mengonfirmasi isinya",
      "Menolak melayani karena dianggap merepotkan staf"
    ],
    "Opsi C bernilai 5 karena menghormati hak hukum warga rentan dengan pendampingan akuntabel dan penuh empati."
  ),
  makeTkp(
    "tkp-pel-025", "pelayanan-publik",
    "Anda ditugaskan di bagian penanganan pengaduan masyarakat (SP4N-LAPOR!). Prinsip kerja utama yang Anda pegang adalah...",
    [3, 4, 5, 2, 1],
    [
      "Menutup laporan pengaduan secepatnya agar statistik terlihat hijau",
      "Membalas laporan dengan jawaban normatif otomatis tanpa tindak lanjut",
      "Merespons aduan secara cepat, memverifikasi fakta lapangan, mengoordinasikan perbaikan dengan unit teknis, dan menginformasikan hasil penyelesaian kepada pelapor secara transparan",
      "Hanya menindaklanjuti pengaduan yang viral di media sosial",
      "Menghapus laporan pengaduan yang berisi kritik tajam pada pimpinan"
    ],
    "Opsi C bernilai 5 karena menjalankan fungsi akuntabilitas pengaduan publik secara substantif dan tuntas."
  ),

  // --- JEJARING KERJA (25 soal) ---
  makeTkp(
    "tkp-jej-001", "jejaring-kerja",
    "Dalam tim kerja penyusunan laporan tahunan instansi, dua rekan kerja Anda berselisih paham mengenai desain dan format laporan sehingga rapat tim mengalami kebuntuan (deadlock). Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Meninggalkan ruang rapat karena suasana menjadi tidak menyenangkan",
      "Membela salah satu rekan yang merupakan teman dekat Anda",
      "Mengajak kedua rekan berdiskusi tenang, mencari titik temu keunggulan dari ide masing-masing, dan mengintegrasikannya demi tujuan bersama",
      "Menyerahkan perselisihan tersebut kepada atasan untuk diputuskan sepihak",
      "Membiarkan mereka berdebat sampai salah satunya mengalah sendiri"
    ],
    "Opsi C bernilai 5 karena menunjukkan keterampilan mediasi, kepemimpinan kolaboratif, dan fokus pada tujuan tim."
  ),
  makeTkp(
    "tkp-jej-002", "jejaring-kerja",
    "Instansi Anda harus bekerja sama dengan instansi lain yang memiliki budaya kerja dan sistem birokrasi yang berbeda jauh untuk menyelenggarakan pameran pelayanan publik bersama. Sikap Anda adalah...",
    [2, 4, 5, 3, 1],
    [
      "Memaksakan budaya kerja kantor Anda kepada instansi rekanan",
      "Bekerja sendiri-sendiri tanpa perlu banyak berkoordinasi",
      "Membuka komunikasi intensif, menghargai perbedaan budaya kerja, dan menyepakati protokol koordinasi kerja yang saling menguntungkan (win-win solution)",
      "Menolak kerja sama karena dianggap merepotkan",
      "Menyerahkan seluruh beban teknis pameran kepada instansi rekanan"
    ],
    "Opsi C bernilai 5 karena adaptif, kolaboratif, dan mampu membangun kemitraan strategis lintas sektor."
  ),
  makeTkp(
    "tkp-jej-003", "jejaring-kerja",
    "Anda ditunjuk sebagai ketua tim proyek yang beranggotakan rekan-rekan senior yang memiliki pengalaman lebih lama dibanding Anda. Sikap Anda dalam memimpin tim adalah...",
    [1, 3, 4, 5, 2],
    [
      "Memerintah para senior dengan otoriter untuk menunjukkan wewenang Anda sebagai ketua",
      "Merasa rendah diri dan menyerahkan seluruh kendali proyek kepada senior",
      "Bekerja sendiri mengerjakan tugas agar tidak merepotkan senior",
      "Menghormati pengalaman senior, aktif meminta masukan dan saran konstruktif, namun tetap tegas dan terarah dalam mengambil keputusan tim secara objektif",
      "Membagi tugas hanya kepada rekan-rekan yang seusia dengan Anda"
    ],
    "Opsi D bernilai 5 karena mengombinasikan etika penghormatan terhadap senioritas dengan kepemimpinan profesional berbasis tujuan tim."
  ),
  makeTkp(
    "tkp-jej-004", "jejaring-kerja",
    "Seorang rekan kerja dalam tim Anda terlihat sering terlambat menyerahkan bagian tugasnya karena sedang mengalami musibah keluarga. Sikap Anda sebagai rekan tim adalah...",
    [2, 3, 5, 4, 1],
    [
      "Memarahi dan mengeluarkannya dari grup tim proyek",
      "Melaporkannya langsung ke bagian kepegawaian agar dikenai sanksi pemotongan tunjangan",
      "Mengajaknya berbicara empat mata dengan empati, menanyakan kendala yang dihadapi, dan bersama rekan tim lain berbagi beban tugas sementara agar target tim tetap tercapai",
      "Mengerjakan seluruh tugasnya tanpa pernah membahasnya",
      "Menggunjingkan masalah keluarganya kepada rekan di divisi lain"
    ],
    "Opsi C bernilai 5 karena menunjukkan solidaritas tim yang sehat, empati kemanusiaan, sekaligus tanggung jawab menjaga output kerja kelompok."
  ),
  makeTkp(
    "tkp-jej-005", "jejaring-kerja",
    "Saat menghadiri forum seminar kepegawaian antar-instansi pemerintah, sikap Anda dalam membangun jejaring profesional adalah...",
    [2, 3, 4, 5, 1],
    [
      "Hanya duduk diam di baris belakang mendengarkan materi",
      "Hanya berkumpul dan mengobrol dengan rekan dari instansi sendiri",
      "Membagikan kartu nama kepada semua orang tanpa membangun percakapan bermakna",
      "Aktif berkenalan dengan peserta dari berbagai instansi, bertukar pengalaman inovasi kerja, dan menjajaki potensi kolaborasi program antar-lembaga",
      "Meninggalkan seminar lebih awal setelah absensi"
    ],
    "Opsi D bernilai 5 karena proaktif membangun koneksi profesional yang bernilai tambah bagi organisasi."
  ),
  makeTkp(
    "tkp-jej-006", "jejaring-kerja",
    "Dalam pembagian tugas tim, Anda merasa mendapatkan porsi tugas yang lebih berat dan rumit dibandingkan rekan lainnya. Sikap Anda adalah...",
    [1, 3, 4, 5, 2],
    [
      "Langsung mogok kerja dan menolak pembagian tugas tersebut",
      "Mengeluh di media sosial mengenai ketidakadilan pimpinan",
      "Mengerjakannya dengan asal-asalan agar cepat selesai",
      "Menerima tugas tersebut sebagai tantangan peningkatan kapasitas diri, menyelesaikannya sebaik mungkin, dan berdiskusi sehat dengan ketua tim bila memerlukan sumber daya pendukung",
      "Menyerahkan tugas tersebut kepada staf honorer kantor"
    ],
    "Opsi D bernilai 5 karena bermental pembelajar, berorientasi kinerja tinggi, dan berkomunikasi secara konstruktif."
  ),
  makeTkp(
    "tkp-jej-007", "jejaring-kerja",
    "Ketika gagasan yang Anda usulkan dalam rapat koordinasi tim ditolak oleh mayoritas anggota tim karena dinilai kurang aplikatif di lapangan, sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Marah dan memilih bersikap pasif sepanjang sisa proyek",
      "Memaksa anggota tim untuk tetap menerima usulan Anda",
      "Menerima penolakan dengan setengah hati dan tidak mau memberi masukan lagi",
      "Menerima keputusan rapat dengan lapang dada, mempelajari alasan kekurangan ide tersebut, dan berkomitmen penuh mendukung ide terbaik yang telah disepakati bersama",
      "Menjelek-jelekkan ide yang terpilih kepada pihak luar"
    ],
    "Opsi D bernilai 5 karena menjunjung tinggi kedewasaan berorganisasi, loyalitas pada kesepakatan mufakat, dan keterbukaan menerima kritik."
  ),
  makeTkp(
    "tkp-jej-008", "jejaring-kerja",
    "Tim Anda berhasil meraih penghargaan inovasi pelayanan terbaik tingkat kementerian. Dalam sesi wawancara, sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengklaim bahwa keberhasilan itu adalah murni berkat kerja keras Anda pribadi",
      "Menyerahkan seluruh apresiasi kepada ketua tim saja",
      "Menyampaikan rasa syukur dan menegaskan bahwa pencapaian ini adalah buah dari kerja keras, kolaborasi, dan kontribusi seluruh anggota tim serta dukungan pimpinan",
      "Mengatakan bahwa kompetisi tersebut sebenarnya sangat mudah",
      "Meminta bagian hadiah uang terbesar untuk diri sendiri"
    ],
    "Opsi C bernilai 5 karena mengapresiasi kerja kolektif tim dan menjauhkan diri dari sikap egois."
  ),
  makeTkp(
    "tkp-jej-009", "jejaring-kerja",
    "Instansi Anda berencana mengadakan survei kepuasan pelanggan dengan melibatkan organisasi kemasyarakatan (LSM) setempat. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mencurigai LSM tersebut akan mencari-cari kesalahan kantor Anda",
      "Menolak pelibatan pihak luar agar aib kantor tidak tersebar",
      "Menyambut baik kemitraan tersebut secara terbuka, transparan, dan profesional sebagai sarana checks and balances independen untuk memajukan instansi",
      "Membatasi akses data survei agar hasilnya pasti baik",
      "Mengabaikan hasil survei yang diberikan oleh LSM"
    ],
    "Opsi C bernilai 5 karena terbuka terhadap pengawasan publik yang konstruktif demi transparansi tata kelola."
  ),
  makeTkp(
    "tkp-jej-010", "jejaring-kerja",
    "Salah satu anggota tim kerja Anda adalah pegawai baru yang pendiam dan jarang bersuara saat rapat tim. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Membiarkannya saja karena menganggapnya tidak memiliki ide",
      "Memarahinya di depan umum agar ia berani berbicara",
      "Menciptakan suasana diskusi yang hangat, menyapanya secara ramah, dan memberikannya ruang serta dorongan untuk menyampaikan perspektif barunya",
      "Mengerjakan seluruh bagian tugas yang seharusnya menjadi jatahnya",
      "Menganggapnya beban bagi tim kerja"
    ],
    "Opsi C bernilai 5 karena inklusif, merangkul potensi rekan baru, dan membangun iklim psikologis kerja yang aman (psychological safety)."
  ),
  makeTkp(
    "tkp-jej-011", "jejaring-kerja",
    "Ketika terjadi pergantian ketua tim secara mendadak di tengah proyek berjalan, sikap Anda terhadap ketua tim yang baru adalah...",
    [2, 4, 5, 3, 1],
    [
      "Menolak kepemimpinannya dan menuntut ketua tim lama dikembalikan",
      "Bekerja seadanya menunggu arahan tanpa inisiatif",
      "Segera menyambut ketua baru, memberikan pemaparan progres proyek secara komprehensif, dan siap beradaptasi dengan gaya kepemimpinan barunya demi kesuksesan target",
      "Menceritakan kelemahan anggota tim lain kepada ketua baru",
      "Membuat kelompok tandingan di internal proyek"
    ],
    "Opsi C bernilai 5 karena profesional, adaptif terhadap perubahan dinamika organisasi, dan berorientasi pada kesinambungan kinerja."
  ),
  makeTkp(
    "tkp-jej-012", "jejaring-kerja",
    "Anda mengetahui rekan dari divisi lain sedang mengalami kesulitan teknis dalam mengoperasikan aplikasi laporan terpadu yang sangat Anda kuasai. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mendiamkan saja karena hal itu bukan urusan divisi Anda",
      "Bersedia membantu hanya jika ia mentraktir makan siang",
      "Dengan senang hati meluangkan waktu sejenak untuk membimbingnya memahami aplikasi tersebut demi kelancaran integrasi data antar-divisi",
      "Menertawakan ketidaktahuannya kepada teman divisi Anda",
      "Mengerjakan pekerjaannya agar ia berutang budi kepada Anda"
    ],
    "Opsi C bernilai 5 karena memiliki semangat sinergi lintas fungsi (cross-functional collaboration) demi kemajuan institusi."
  ),
  makeTkp(
    "tkp-jej-013", "jejaring-kerja",
    "Dalam negosiasi anggaran program bersama antara tim Anda dan tim perencana, terjadi perbedaan estimasi biaya. Sikap Anda adalah...",
    [1, 3, 5, 4, 2],
    [
      "Memaksakan angka tim Anda tanpa mau membuka rincian rill",
      "Mengalah total dan membatalkan program penting tersebut",
      "Menyajikan data riil kebutuhan lapangan, mendengarkan pertimbangan kapasitas fiskal perencana, dan bersama mencari rasionalisasi pos biaya yang paling efektif",
      "Mengancam akan melaporkan tim perencana ke pimpinan tertinggi",
      "Menghentikan proses negosiasi"
    ],
    "Opsi C bernilai 5 karena mengedepankan negosiasi berbasis data, rasional, dan berorientasi pada solusi terbaik."
  ),
  makeTkp(
    "tkp-jej-014", "jejaring-kerja",
    "Media komunikasi grup perpesanan resmi (WhatsApp Group) proyek tim Anda mulai dipenuhi percakapan guyonan dan meme yang mengaburkan instruksi penting pekerjaan. Tindakan Anda adalah...",
    [1, 3, 5, 4, 2],
    [
      "Keluar dari grup tanpa pamit",
      "Ikut meramaikan guyonan agar dianggap asyik",
      "Mengingatkan rekan-rekan secara santun mengenai fungsi utama grup untuk koordinasi kerja, menyematkan kembali pesan penting pekerjaan, dan mengusulkan grup terpisah untuk obrolan santai",
      "Memaki rekan yang mengirimkan meme",
      "Membisukan grup selama-lamanya"
    ],
    "Opsi C bernilai 5 karena menjaga etika komunikasi kerja tetap profesional tanpa merusak keakraban sosial."
  ),
  makeTkp(
    "tkp-jej-015", "jejaring-kerja",
    "Pimpinan memberikan tugas baru yang membutuhkan keahlian yang belum pernah dimiliki oleh tim Anda sebelumnya. Sikap tim yang Anda dorong adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menolak tugas tersebut karena di luar uraian jabatan",
      "Menyerahkan kembali tugas ke atasan sambil mengeluh",
      "Mencari pihak ketiga untuk mengerjakan secara diam-diam",
      "Menerima tugas tersebut sebagai momentum belajar, aktif berjejaring dan berkonsultasi dengan ahli/instansi percontohan (benchmarking), lalu belajar cepat bersama anggota tim",
      "Mengerjakan secara asal-asalan yang penting selesai"
    ],
    "Opsi D bernilai 5 karena adaptif, memiliki growth mindset, dan pandai memanfaatkan jejaring eksternal untuk transfer knowledge."
  ),
  makeTkp(
    "tkp-jej-016", "jejaring-kerja",
    "Hubungan personal Anda dengan salah seorang rekan kerja sedang kurang baik karena masalah pribadi di luar kantor. Saat harus bekerja sama dalam satu kepanitiaan, sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menolak masuk ke dalam kepanitiaan tersebut",
      "Membawa konflik pribadi ke dalam forum rapat kerja",
      "Bekerja sama secara dingin tanpa mau saling memandang",
      "Memisahkan secara tegas urusan pribadi dan tanggung jawab kedinasan, tetap berkomunikasi profesional, santun, dan fokus penuh pada kesuksesan tugas kepanitiaan",
      "Menyindir rekan tersebut secara halus saat presentasi"
    ],
    "Opsi D bernilai 5 karena matang emosional, menjunjung profesionalisme di atas sentimen pribadi."
  ),
  makeTkp(
    "tkp-jej-017", "jejaring-kerja",
    "Untuk memperkuat sinergi dan keakraban internal tim kerja yang baru dibentuk, kegiatan yang paling tepat Anda usulkan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mengadakan acara mewah yang membebani iuran anggota",
      "Mewajibkan semua anggota menceritakan rahasia pribadinya",
      "Mengadakan sesi santai berbagi cerita harapan kerja (team building) di sela jam istirahat atau makan siang bersama yang inklusif dan terjangkau",
      "Membiarkan keakraban tumbuh sendiri tanpa ada inisiatif",
      "Membuat kompetisi individu yang saling menjatuhkan"
    ],
    "Opsi C bernilai 5 karena membangun bonding tim yang sehat, wajar, dan menyenangkan tanpa tekanan sosial."
  ),
  makeTkp(
    "tkp-jej-018", "jejaring-kerja",
    "Anda diminta mewakili kantor menghadiri rapat gugus tugas penanganan inflasi daerah bersama lintas instansi (BI, Pemda, BPS, Kepolisian). Tindakan Anda dalam forum tersebut adalah...",
    [2, 3, 5, 4, 1],
    [
      "Hadir sebagai pelengkap absensi dan hanya menyimak pasif",
      "Bicara mendominasi forum tanpa memperhatikan agenda rapat",
      "Menyiapkan data relevan dari instansi Anda, berkontribusi aktif dalam perumusan langkah bersama, dan membangun kontak kemitraan yang erat dengan perwakilan instansi lain",
      "Mempermasalahkan kewenangan instansi lain",
      "Meninggalkan rapat saat giliran instansi Anda belum tiba"
    ],
    "Opsi C bernilai 5 karena bertanggung jawab sebagai representasi lembaga dan berkontribusi proaktif dalam forum multi-stakeholder."
  ),
  makeTkp(
    "tkp-jej-019", "jejaring-kerja",
    "Rekan kerja Anda mempresentasikan hasil inovasi kerja tim Anda di hadapan pimpinan tanpa menyebutkan nama Anda sebagai kontributor utama konsep tersebut. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung menyela presentasinya dan memaki di hadapan pimpinan",
      "Menyebarkan rumor buruk tentang rekan tersebut di kantor",
      "Mendiamkan dengan rasa dendam yang berkepanjangan",
      "Mengajaknya berbicara baik-baik setelah rapat selesai, mengklarifikasi alasannya secara dewasa, dan menyepakati etika saling menghargai kontribusi rekan di masa mendatang",
      "Melaporkan ke polisi atas tuduhan pencurian hak cipta"
    ],
    "Opsi D bernilai 5 karena mengedepankan resolusi konflik secara asertif, bijaksana, dan tidak reaktif mempermalukan tim."
  ),
  makeTkp(
    "tkp-jej-020", "jejaring-kerja",
    "Dalam tim kerja, terjadi situasi di mana seorang anggota tim sering menjadi bahan lelucon fisik (body shaming) oleh anggota lainnya saat jam istirahat. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut menertawakan agar suasana semakin akrab",
      "Pura-pura tidak mendengar agar tidak ikut campur",
      "Menertawakan di depan lalu kasihan di belakang",
      "Menegur rekan yang bercanda secara santun dan tegas bahwa candaan fisik tidak pantas, serta mendukung rekan yang menjadi korban agar merasa aman di tim",
      "Merekam candaan tersebut untuk diviralkan"
    ],
    "Opsi D bernilai 5 karena berani bersikap adil, menjaga norma kesopanan, dan melindungi keutuhan moral lingkungan kerja."
  ),
  makeTkp(
    "tkp-jej-021", "jejaring-kerja",
    "Ketika pimpinan meminta rekomendasi anggota tim untuk mewakili pelatihan ke luar daerah, Anda melihat rekan kerja Anda memiliki keahlian yang jauh lebih relevan dibanding Anda sendiri. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Mempromosikan diri sendiri demi mendapatkan uang saku dinas",
      "Mendiamkan saja dan membiarkan atasan memilih sembarang orang",
      "Dengan jujur dan objektif merekomendasikan rekan tersebut kepada pimpinan dengan memaparkan keahliannya yang sangat cocok bagi kemajuan lembaga",
      "Menjelekkan kemampuan rekan tersebut agar terpilih Anda",
      "Mengundurkan diri dari proses pertimbangan"
    ],
    "Opsi C bernilai 5 karena berjiwa besar, objektif, dan mengutamakan kepentingan kemajuan organisasi."
  ),
  makeTkp(
    "tkp-jej-022", "jejaring-kerja",
    "Tim Anda mendapat tugas mendampingi studi banding dari instansi daerah lain. Sikap Anda sebagai tuan rumah dalam membangun jejaring adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyambut mereka dengan seadanya tanpa persiapan",
      "Menyembunyikan informasi praktik baik agar instansi mereka tidak menyaingi Anda",
      "Menyambut delegasi secara ramah dan profesional, membagikan best practice secara transparan, serta membuka peluang kerja sama lanjutan yang saling menguntungkan",
      "Menyerahkan seluruh pendampingan kepada staf magang",
      "Meminta bayaran khusus untuk materi paparan"
    ],
    "Opsi C bernilai 5 karena ramah, murah hati dalam berbagi pengetahuan (knowledge sharing), dan memperluas relasi kelembagaan."
  ),
  makeTkp(
    "tkp-jej-023", "jejaring-kerja",
    "Saat melakukan survei lapangan bersama tim terpadu, kendaraan dinas tim mengalami ban kempis di area yang jauh dari bengkel. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mengeluh dan menyalahkan pengemudi mobil dinas",
      "Duduk manis di dalam mobil sambil bermain media sosial",
      "Menunggu bala bantuan tanpa berbuat apa-apa",
      "Turun bersama rekan-rekan membantu mengganti ban cadangan, saling bergotong royong agar perjalanan dinas dapat segera dilanjutkan",
      "Menyuruh rekan termuda mengganti ban sendirian"
    ],
    "Opsi D bernilai 5 karena memiliki jiwa gotong royong dan kesetiakawanan dalam menghadapi kendala operasional."
  ),
  makeTkp(
    "tkp-jej-024", "jejaring-kerja",
    "Dalam sebuah rapat evaluasi akhir tahun, kinerja tim Anda dinilai gagal mencapai target oleh pimpinan akibat kelalaian data teknis. Sikap Anda sebagai bagian dari tim adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menyalahkan satu rekan yang bertugas menginput data di depan pimpinan",
      "Menghindari kontak mata dan pura-pura tidak terlibat dalam proyek",
      "Membantah evaluasi pimpinan dengan emosional",
      "Bersama ketua dan anggota tim menerima evaluasi tersebut secara sportif, melakukan refleksi akar masalah bersama, dan menyusun perbaikan sistematis untuk tahun depan",
      "Mengancam akan pindah ke divisi lain"
    ],
    "Opsi D bernilai 5 karena bertanggung jawab secara kolektif, matang dalam menerima kritik, dan berorientasi pada perbaikan performa."
  ),
  makeTkp(
    "tkp-jej-025", "jejaring-kerja",
    "Anda baru saja dipindahkan ke unit kerja baru yang memiliki tradisi makan siang bersama di pantry kantor setiap hari. Sikap Anda adalah...",
    [1, 3, 4, 5, 2],
    [
      "Menolak bergabung dan memilih makan sendirian di luar kantor selamanya",
      "Makan di meja kerja sambil memasang headphone",
      "Bergabung sesekali hanya bila diajak atasan",
      "Dengan senang hati ikut bergabung, berinteraksi akrab, dan memanfaatkan momen tersebut untuk saling mengenal kultur kerja rekan-rekan baru",
      "Mencela makanan yang dibawa oleh rekan-rekan kerja baru"
    ],
    "Opsi D bernilai 5 karena luwes beradaptasi, ramah sosial, dan menghargai kearifan lokal lingkungan kerja baru."
  ),

  // --- SOSIAL BUDAYA (20 soal) ---
  makeTkp(
    "tkp-sos-001", "sosial-budaya",
    "Anda ditugaskan sebagai abdi negara di daerah pelosok luar Pulau Jawa yang masyarakatnya memegang teguh adat istiadat leluhur yang berbeda dari budaya asal Anda. Sikap Anda saat mulai tinggal di sana adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyendiri di rumah dinas agar tidak terjadi gesekan adat",
      "Mengajarkan kebiasaan daerah asal Anda kepada warga setempat secara agresif",
      "Menghormati adat istiadat setempat, berinisiatif sowan kepada tokoh masyarakat/tetua adat, dan mempelajari norma sopan santun lokal agar dapat berbaur harmonis",
      "Memandang adat istiadat mereka sebagai tradisi kuno yang menghambat kemajuan",
      "Meminta pimpinan segera memutasikan Anda kembali ke kota besar"
    ],
    "Opsi C bernilai 5 karena menunjukkan kecerdasan kultural, respek pada kearifan lokal, dan kemampuan integrasi sosial yang tinggi."
  ),
  makeTkp(
    "tkp-sos-002", "sosial-budaya",
    "Di lingkungan tempat tinggal dinas Anda, warga mengadakan kerja bakti membersihkan saluran air dan perbaikan jalan desa pada hari Minggu. Di saat yang sama, Anda berencana istirahat santai di rumah. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menutup pintu rumah rapat-rapat dan tidur seharian",
      "Membayar orang lain untuk menggantikan kehadiran Anda tanpa menyapa tetangga",
      "Antusias ikut serta kerja bakti bersama warga, berbaur dan bergotong royong sebagai wujud nyata kerukunan bertetangga",
      "Hanya datang sebentar untuk absensi foto lalu pulang",
      "Menolak ikut karena menganggap hari Minggu adalah hak istirahat pribadi Anda"
    ],
    "Opsi C bernilai 5 karena aktif hidup bermasyarakat, peduli lingkungan sosial, dan merawat semangat gotong royong."
  ),
  makeTkp(
    "tkp-sos-003", "sosial-budaya",
    "Rekan kerja satu ruangan Anda merayakan hari besar keagamaan mereka yang berbeda dengan keyakinan Anda. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Mengejek upacara perayaannya di media sosial",
      "Menghindari komunikasi dengan rekan tersebut selama ia merayakan hari rayanya",
      "Bersikap acuh tak acuh dan menganggapnya tidak penting",
      "Menyampaikan ucapan selamat secara tulus, menghormati hak ibadahnya, dan bersedia saling membantu penyesuaian jadwal piket kantor",
      "Meminta pimpinan melarang perayaan di lingkungan instansi"
    ],
    "Opsi D bernilai 5 karena mengedepankan toleransi beragama yang tulus dan semangat persaudaraan kebangsaan."
  ),
  makeTkp(
    "tkp-sos-004", "sosial-budaya",
    "Saat menghadiri jamuan adat di daerah penempatan kerja, Anda disajikan makanan khas tradisional yang belum pernah Anda cicipi dan aromanya sangat asing bagi Anda. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Langsung memuntahkan makanan tersebut di hadapan tuan rumah",
      "Menolak mentah-mentah hidangan tersebut dengan ekspresi jijik",
      "Tidak menyentuh makanan sama sekali dan memesan makanan online ke rumah adat",
      "Mencicipi hidangan tersebut dengan sopan dan menghargai sambutan hangat tuan rumah, atau bila ada pantangan medis/keagamaan, menyampaikannya secara sangat santun",
      "Menertawakan bentuk makanan tersebut bersama teman"
    ],
    "Opsi D bernilai 5 karena menjunjung tinggi kesantunan adat dan kepekaan sosial dalam menghargai keramahtamahan warga lokal."
  ),
  makeTkp(
    "tkp-sos-005", "sosial-budaya",
    "Di divisi kerja Anda terdapat pegawai yang berasal dari berbagai suku bangsa di Indonesia. Terkadang muncul candaan yang mengarah pada stereotip suku tertentu. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Ikut memperkuat stereotip tersebut agar ruangan riuh",
      "Mendiamkan saja karena menganggap stereotip adalah hal wajar",
      "Tertawa terpaksa demi menjaga pertemanan",
      "Mengingatkan dengan bijak dan santun bahwa stereotip suku dapat menyinggung perasaan rekan dan merusak keharmonisan tim, serta mengalihkan pada topik kerja positif",
      "Membalas dengan menjelekkan suku dari orang yang bercanda"
    ],
    "Opsi D bernilai 5 karena berperan sebagai agen perekat persatuan bangsa dan menolak diskriminasi bernuansa SARA."
  ),
  makeTkp(
    "tkp-sos-006", "sosial-budaya",
    "Ketika Anda sedang berjalan di pasar tradisional tempat penempatan dinas baru, seorang warga menegur Anda dengan sapaan dan gestur khas daerah tersebut yang belum Anda pahami maknanya. Tindakan Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menatap curiga dan langsung menjauh dengan terburu-buru",
      "Pura-pura tidak melihat dan tidak mendengar",
      "Membalas dengan senyuman ramah dan sapaan sopan, lalu dengan santun menanyakan makna sapaan tersebut untuk memperluas pemahaman budaya",
      "Menertawakan bunyi bahasa daerah yang diucapkannya",
      "Meminta warga tersebut berbicara hanya dengan bahasa asing"
    ],
    "Opsi C bernilai 5 karena hangat, terbuka terhadap interaksi antarbudaya, dan menjalin relasi sosial yang positif."
  ),
  makeTkp(
    "tkp-sos-007", "sosial-budaya",
    "Instansi Anda mengadakan peringatan Hari Kartini dengan mengenakan pakaian adat Nusantara. Anda berasal dari suku Jawa, namun panitia mengundi Anda untuk mengenakan pakaian adat khas Papua. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Menolak keras dan menuntut memakai pakaian adat suku sendiri",
      "Memilih tidak masuk kerja pada hari peringatan tersebut",
      "Mengenakan pakaian adat tersebut dengan setengah hati dan muka masam",
      "Mengenakan pakaian adat Papua dengan rasa bangga dan antusias sebagai simbol kekayaan dan keindahan kebudayaan Nusantara",
      "Membayar denda asalkan tidak memakai pakaian daerah lain"
    ],
    "Opsi D bernilai 5 karena memiliki wawasan kebangsaan yang utuh dan bangga terhadap seluruh khazanah budaya bangsa."
  ),
  makeTkp(
    "tkp-sos-008", "sosial-budaya",
    "Terjadi kesalahpahaman antarkelompok pemuda beda suku di lingkungan tempat tinggal Anda yang berpotensi memicu ketegangan horizontal. Tindakan Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Membela kelompok pemuda yang satu suku dengan Anda",
      "Menonton pertikaian tersebut dari kejauhan",
      "Segera berkoordinasi dengan pengurus RT/RW, tokoh masyarakat, dan bhabinkamtibmas untuk mengadakan dialog mediasi damai secara kekeluargaan sebelum masalah meluas",
      "Memanas-manasi suasana di grup media sosial warga",
      "Mengunci pintu rumah dan acuh tak acuh"
    ],
    "Opsi C bernilai 5 karena bertindak aktif sebagai peredam konflik sosial (cooling system) dan penjaga perdamaian warga."
  ),
  makeTkp(
    "tkp-sos-009", "sosial-budaya",
    "Anda ditugaskan mendampingi program pemberdayaan ekonomi perempuan di sebuah desa terpencil yang masih memegang nilai patriarki kuat di mana perempuan tabu keluar rumah. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Memaksa warga desa mengubah tradisi mereka seketika secara agresif",
      "Membatalkan program pemberdayaan dan pulang ke kota",
      "Melakukan pendekatan kultural kepada para tokoh adat dan kepala keluarga laki-laki, menjelaskan manfaat program bagi kesejahteraan keluarga tanpa melanggar etika adat setempat",
      "Mengkritik adat desa tersebut di depan umum",
      "Melaksanakan program secara sembunyi-sembunyi di malam hari"
    ],
    "Opsi C bernilai 5 karena mengedepankan komunikasi persuasif berbasis kearifan lokal guna mencapai transformasi sosial yang berkelanjutan."
  ),
  makeTkp(
    "tkp-sos-010", "sosial-budaya",
    "Tetangga di sebelah rumah dinas Anda sedang mengadakan upacara kematian menurut tradisi agamanya yang menggunakan tabuhan musik tradisional hingga larut malam. Sikap Anda adalah...",
    [1, 2, 4, 5, 3],
    [
      "Melabrak tetangga tersebut dan mematikan musiknya secara paksa",
      "Melaporkan ke kantor polisi atas tuduhan gangguan ketertiban umum",
      "Mengomel sepanjang malam dan memusuhi tetangga tersebut keesokan harinya",
      "Memahami bahwa hal tersebut merupakan bagian sakral dari upacara duka cita adat/agamanya, bersikap toleran, dan menyampaikan ucapan belasungkawa",
      "Membalas dengan menyalakan musik keras-keras dari rumah Anda"
    ],
    "Opsi D bernilai 5 karena memiliki toleransi tinggi, empati terhadap kedukaan sesama manusia, dan menjaga kerukunan bertetangga."
  ),
  makeTkp(
    "tkp-sos-011", "sosial-budaya",
    "Di sebuah instansi pelayanan, seorang rekan kerja sering menggunakan bahasa daerahnya sendiri saat berdiskusi tentang pekerjaan dinas di depan pegawai lain yang tidak mengerti bahasa tersebut. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Memarahi rekan tersebut dengan kata-kata kasar",
      "Membalas berbicara dengan bahasa asing agar dia bingung",
      "Mengingatkan rekan tersebut secara santun di waktu luang agar menggunakan bahasa persatuan (Bahasa Indonesia) dalam forum kerja dinas agar semua rekan dapat memahami secara setara",
      "Menjauhi dan mengucilkan rekan tersebut dari pergaulan kantor",
      "Mendiamkan saja meskipun pekerjaan menjadi terhambat"
    ],
    "Opsi C bernilai 5 karena asertif, santun, dan menjunjung tinggi Bahasa Indonesia sebagai sarana integrasi komunikasi resmi kenegaraan."
  ),
  makeTkp(
    "tkp-sos-012", "sosial-budaya",
    "Ketika bertugas di pos perbatasan negara, Anda menyaksikan warga lokal perbatasan sering melakukan tradisi barter lintas batas dengan warga negara tetangga yang masih satu rumpun suku leluhur. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menangkap seluruh warga dan menyita barang-barang mereka secara membabi buta",
      "Membiarkan perbatasan terbuka lebar tanpa pengawasan sama sekali",
      "Menghormati kearifan lokal ikatan kekerabatan tradisional perbatasan, namun tetap menjalankan pengawasan lalu lintas perbatasan secara humanis sesuai ketentuan hukum batas negara",
      "Meminta suap uang jalan kepada warga pelintas batas",
      "Mengusir warga lokal menjauh dari batas perbatasan"
    ],
    "Opsi C bernilai 5 karena menyeimbangkan kepatuhan terhadap kedaulatan hukum negara dengan pendekatan sosiologis humanis."
  ),
  makeTkp(
    "tkp-sos-013", "sosial-budaya",
    "Seorang rekan kerja Anda memiliki gaya komunikasi yang sangat lugas, tegas, dan bernada tinggi karena latar belakang budayanya, yang awalnya sering membuat kaget rekan kerja lainnya. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menilai rekan tersebut sebagai orang yang jahat dan pemarah",
      "Meminta pimpinan memecat rekan tersebut karena dianggap mengancam",
      "Memahami bahwa variasi intonasi dan gaya komunikasi dipengaruhi latar kultural, fokus pada substansi pesan pekerjaannya yang positif, dan saling membangun adaptasi komunikasi yang sehat",
      "Membalas membentaknya setiap kali ia berbicara",
      "Menghindari berbicara dengannya selamanya"
    ],
    "Opsi C bernilai 5 karena memiliki empati lintas budaya dan mampu melihat esensi kerja tanpa terjebak prasangka primordial."
  ),
  makeTkp(
    "tkp-sos-014", "sosial-budaya",
    "Dalam perayaan Hari Kemerdekaan RI di kompleks perumahan dinas, diadakan pentas seni budaya. Kontribusi terbaik yang dapat Anda berikan adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menolak hadir karena menganggapnya membuang waktu",
      "Hanya hadir jika ada jamuan makan gratis",
      "Antusias berpartisipasi, baik dalam kepanitiaan, menyumbangkan pertunjukan kesenian, maupun meramaikan acara sebagai wujud merawat persaudaraan warga",
      "Mengkritik jalannya acara tanpa memberikan solusi bantuan",
      "Memasang musik luar negeri dengan pengeras suara sendiri di rumah"
    ],
    "Opsi C bernilai 5 karena menunjukkan partisipasi sosial aktif dan kecintaan pada momentum persatuan bangsa."
  ),
  makeTkp(
    "tkp-sos-015", "sosial-budaya",
    "Anda mendapati siswa magang di kantor Anda yang berasal dari universitas di daerah merasa canggung dan rendah diri di hadapan pegawai tetap kota besar. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menyuruhnya melakukan pekerjaan bawahan terus-menerus",
      "Mengabaikan keberadaannya karena hanya siswa magang",
      "Merangkulnya dengan ramah, mengapresiasi kemampuannya, memberikan bimbingan tugas nyata yang membangun rasa percaya dirinya, dan memperlakukannya setara",
      "Mengejek aksen bicaranya di depan staf lain",
      "Memintanya mengundurkan diri dari tempat magang"
    ],
    "Opsi C bernilai 5 karena mengayomi generasi muda tanpa diskriminasi asal daerah dan menumbuhkan lingkungan yang suportif."
  ),
  makeTkp(
    "tkp-sos-016", "sosial-budaya",
    "Saat musim libur hari raya keagamaan minoritas di kantor, banyak pegawai yang beragama tersebut mengambil cuti sah. Hal ini menyebabkan beberapa pos layanan kekurangan personel. Sikap Anda sebagai rekan kerja adalah...",
    [2, 3, 5, 4, 1],
    [
      "Menolak membantu pos layanan tersebut karena bukan uraian tugas harian Anda",
      "Meminta uang lembur tambahan yang sangat mahal",
      "Dengan sukarela dan tulus bersedia menggantikan jadwal piket jaga layanan publik agar rekan yang merayakan hari raya dapat beribadah bersama keluarga dengan tenang",
      "Mengeluh kepada atasan mengenai banyaknya pegawai yang cuti",
      "Menutup layanan tersebut dan membiarkan warga terlantar"
    ],
    "Opsi C bernilai 5 karena menunjukkan keikhlasan bertoleransi dalam aksi nyata pengorbanan demi kebahagiaan sesama anak bangsa."
  ),
  makeTkp(
    "tkp-sos-017", "sosial-budaya",
    "Di sebuah desa tempat Anda dinas, terdapat peninggalan situs cagar budaya yang sering dikunjungi masyarakat untuk ritual tradisional. Sikap Anda sebagai aparatur pemerintah adalah...",
    [2, 3, 5, 4, 1],
    [
      "Merusak situs tersebut karena dinilai tidak sesuai selera pribadi Anda",
      "Membiarkan situs tersebut rusak tergerus cuaca tanpa perhatian",
      "Mendukung perlindungan dan pelestarian cagar budaya tersebut bersama instansi terkait, menghargai nilai sejarah leluhur, serta mengembangkannya sebagai potensi wisata budaya edukatif",
      "Menjual artefak situs tersebut kepada kolektor barang antik",
      "Melarang masyarakat mengunjungi situs warisan leluhur mereka"
    ],
    "Opsi C bernilai 5 karena menjaga warisan budaya bangsa (cultural heritage) sebagai identitas peradaban Nusantara."
  ),
  makeTkp(
    "tkp-sos-018", "sosial-budaya",
    "Pimpinan instansi Anda menginstruksikan kebijakan pemakaian seragam batik bermotif kearifan lokal setiap hari Kamis. Rekan Anda mengeluh karena merasa motif batik tersebut kuno. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Ikut mengeluh dan memprovokasi rekan lain agar tidak memakai batik",
      "Memakai pakaian bebas tanpa mempedulikan aturan dinas",
      "Bangga mengenakan batik lokal tersebut dan menjelaskan kepada rekan bahwa batik adalah warisan luhur dunia yang mendukung pemberdayaan pengrajin lokal daerah",
      "Memakai batik hanya jika ada sidak pemeriksaan kedisiplinan",
      "Membeli batik palsu dari luar negeri"
    ],
    "Opsi C bernilai 5 karena bangga terhadap identitas budaya lokal dan mengedukasi rekan kerja secara persuasif."
  ),
  makeTkp(
    "tkp-sos-019", "sosial-budaya",
    "Ketika Anda bertugas melakukan pendataan penduduk miskin di wilayah terpencil, sebagian warga bersikap tertutup karena trauma terhadap oknum luar di masa lalu. Sikap Anda adalah...",
    [2, 3, 5, 4, 1],
    [
      "Memarahi warga dan mencoret mereka dari daftar bantuan sosial",
      "Meninggalkan desa tersebut dan mengisi data palsu di kantor",
      "Menggandeng tokoh agama dan kepala desa setempat untuk mendampingi, menjelaskan maksud baik kedatangan Anda secara transparan, serta membangun kepercayaan warga dengan penuh kesabaran",
      "Mengancam warga dengan aparat keamanan",
      "Mengambil foto warga tanpa izin dari kejauhan"
    ],
    "Opsi C bernilai 5 karena memiliki pendekatan sosiologis yang bijak, sabar, dan menghormati kondisi psikologis warga."
  ),
  makeTkp(
    "tkp-sos-020", "sosial-budaya",
    "Sebagai ASN yang bertindak sebagai perekat dan pemersatu bangsa, pandangan Anda mengenai keberagaman Indonesia adalah...",
    [1, 2, 4, 5, 3],
    [
      "Keberagaman adalah sumber konflik yang harus diseragamkan secara paksa",
      "Keberagaman adalah beban anggaran negara yang memperlambat pembangunan",
      "Keberagaman cukup diakui di atas kertas tanpa perlu diimplementasikan",
      "Keberagaman adalah takdir anugerah Tuhan Yang Maha Esa dan kekayaan fundamental bangsa yang harus senantiasa dirawat melalui persatuan yang berkeadilan",
      "Keberagaman hanya menjadi tanggung jawab kementerian kebudayaan semata"
    ],
    "Opsi D bernilai 5 karena mencerminkan komitmen filosofis dan etis ASN sebagai perekat persatuan dan kesatuan bangsa."
  ),
];
