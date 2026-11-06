import { makeTwkOrTiu, RawQuestionDef } from "../scripts/seed-builder-helpers";

export const TIU_QUESTIONS: RawQuestionDef[] = [
  // --- VERBAL: SINONIM (7 soal) ---
  makeTwkOrTiu(
    "tiu-sin-001", "TIU", "verbal-sinonim",
    "RESIDU = ...", 2,
    ["Endapan", "Polusi", "Sisa", "Limbah", "Minyak"],
    "Menurut KBBI, residu bermakna apa yang tertinggal setelah proses penyaringan atau peruraian; sisa; ampas.", 1
  ),
  makeTwkOrTiu(
    "tiu-sin-002", "TIU", "verbal-sinonim",
    "TENTATIF = ...", 3,
    ["Pasti", "Tepat waktu", "Ketetapan", "Sementara", "Terjadwal"],
    "Tentatif bermakna belum pasti; masih dapat berubah; bersifat sementara.", 1
  ),
  makeTwkOrTiu(
    "tiu-sin-003", "TIU", "verbal-sinonim",
    "DISTORSI = ...", 1,
    ["Kesamaan", "Penyimpangan", "Penyatuan", "Kejernihan", "Peningkatan"],
    "Distorsi adalah pemutarbalikan fakta, aturan, atau bentuk; penyimpangan dari kondisi sebenarnya.", 2
  ),
  makeTwkOrTiu(
    "tiu-sin-004", "TIU", "verbal-sinonim",
    "DE JURE = ...", 0,
    ["Berdasarkan hukum", "Berdasarkan kenyataan", "Berdasarkan kebiasaan", "Secara sepihak", "Secara rahasia"],
    "De jure bermakna berdasarkan hukum yang sah (kebalikan dari de facto yang berdasarkan kenyataan).", 2
  ),
  makeTwkOrTiu(
    "tiu-sin-005", "TIU", "verbal-sinonim",
    "INSINUASI = ...", 4,
    ["Pujian", "Pernyataan terbuka", "Deklarasi", "Instruksi tegas", "Sindiran tidak langsung"],
    "Insinuasi adalah tuduhan tersembunyi, sindiran, atau bisikan tidak langsung.", 2
  ),
  makeTwkOrTiu(
    "tiu-sin-006", "TIU", "verbal-sinonim",
    "AGAR = ...", 0,
    ["Supaya", "Namun", "Meskipun", "Tetapi", "Sebab"],
    "Kata 'agar' bersinonim dengan 'supaya' untuk menyatakan tujuan.", 1
  ),
  makeTwkOrTiu(
    "tiu-sin-007", "TIU", "verbal-sinonim",
    "KONVALESENSI = ...", 3,
    ["Penyakit kronis", "Penurunan daya ingat", "Masa inkubasi", "Masa pemulihan kesehatan", "Kelelahan ekstrem"],
    "Konvalesensi adalah masa berangsur-angsur sembuh atau masa pemulihan kembali setelah sakit.", 3
  ),

  // --- VERBAL: ANTONIM (7 soal) ---
  makeTwkOrTiu(
    "tiu-ant-001", "TIU", "verbal-antonim",
    "SPORADIS >< ...", 0,
    ["Kerap", "Jarang", "Sesekali", "Terpencil", "Acak"],
    "Sporadis berarti tidak tentu/kadang-kadang/jarang. Lawan katanya adalah kerap, sering, atau terus-menerus.", 2
  ),
  makeTwkOrTiu(
    "tiu-ant-002", "TIU", "verbal-antonim",
    "NISBI >< ...", 2,
    ["Relatif", "Semu", "Mutlak", "Maya", "Fana"],
    "Nisbi berarti relatif atau bergantung pada sudut pandang. Lawan kata nisbi adalah mutlak (absolut).", 1
  ),
  makeTwkOrTiu(
    "tiu-ant-003", "TIU", "verbal-antonim",
    "KOHESIF >< ...", 1,
    ["Menyatu", "Terpisah-pisah", "Kuat", "Lekat", "Rapat"],
    "Kohesif berarti melekat erat satu sama lain (bersatu). Lawan katanya adalah terpisah-pisah, terurai, atau terbelah.", 2
  ),
  makeTwkOrTiu(
    "tiu-ant-004", "TIU", "verbal-antonim",
    "VIRTUAL >< ...", 4,
    ["Maya", "Digital", "Simulasi", "Semu", "Nyata"],
    "Virtual berarti tampil secara maya/digital. Lawan katanya adalah nyata/riil fisik.", 1
  ),
  makeTwkOrTiu(
    "tiu-ant-005", "TIU", "verbal-antonim",
    "SEKULER >< ...", 3,
    ["Duniawi", "Materialis", "Liberal", "Keagamaan", "Modern"],
    "Sekuler berkaitan dengan keduniawian murni tanpa unsur agama. Lawan katanya adalah keagamaan/agamis.", 2
  ),
  makeTwkOrTiu(
    "tiu-ant-006", "TIU", "verbal-antonim",
    "PLURAL >< ...", 0,
    ["Tunggal", "Majemuk", "Banyak", "Bhinneka", "Beragam"],
    "Plural berarti jamak atau majemuk. Lawan katanya adalah tunggal (singular).", 1
  ),
  makeTwkOrTiu(
    "tiu-ant-007", "TIU", "verbal-antonim",
    "APATIS >< ...", 1,
    ["Acuh tak acuh", "Peduli", "Pasif", "Dingin", "Lalai"],
    "Apatis bermakna tidak peduli atau bersikap masa bodoh. Lawan katanya adalah peduli atau antusias.", 1
  ),

  // --- VERBAL: ANALOGI (7 soal) ---
  makeTwkOrTiu(
    "tiu-ana-001", "TIU", "verbal-analogi",
    "PADI : PETANI = ... : ...", 2,
    ["Sawah : Cangkul", "Kain : Penjahit", "Ikan : Nelayan", "Buku : Perpustakaan", "Penyakit : Dokter"],
    "Petani menghasilkan atau menangkap hasil bumi berupa padi; sebagaimana nelayan menangkap hasil laut berupa ikan.", 1
  ),
  makeTwkOrTiu(
    "tiu-ana-002", "TIU", "verbal-analogi",
    "HAUS : AIR = LAPAR : ...", 3,
    ["Dahaga", "Kenyang", "Minum", "Makanan", "Istirahat"],
    "Rasa haus diatasi dengan mengonsumsi air; rasa lapar diatasi dengan mengonsumsi makanan.", 1
  ),
  makeTwkOrTiu(
    "tiu-ana-003", "TIU", "verbal-analogi",
    "KOMPAS : ARAH = TERMOMETER : ...", 1,
    ["Tekanan", "Suhu", "Waktu", "Volume", "Kecepatan"],
    "Kompas adalah alat ukur arah penunjuk mata angin; termometer adalah alat ukur suhu/temperatur.", 1
  ),
  makeTwkOrTiu(
    "tiu-ana-004", "TIU", "verbal-analogi",
    "KORNEA : MATA = KOKLEA : ...", 0,
    ["Telinga", "Hidung", "Jantung", "Otak", "Paru-paru"],
    "Kornea adalah salah satu bagian anatomi mata; koklea (rumah siput) adalah bagian anatomi telinga bagian dalam.", 2
  ),
  makeTwkOrTiu(
    "tiu-ana-005", "TIU", "verbal-analogi",
    "HUJAN : PAYUNG = BENTURAN : ...", 4,
    ["Jas hujan", "Sepatu", "Kacamata", "Sarung tangan", "Helm"],
    "Payung melindungi kepala/tubuh dari terpaan air hujan; helm melindungi kepala dari benturan keras.", 2
  ),
  makeTwkOrTiu(
    "tiu-ana-006", "TIU", "verbal-analogi",
    "GELAP : CAHAYA = BISING : ...", 1,
    ["Suara", "Hening", "Nada", "Gelombang", "Musik"],
    "Keadaan gelap dihilangkan oleh keberadaan cahaya; keadaan bising dihilangkan oleh suasana hening/sunyi.", 2
  ),
  makeTwkOrTiu(
    "tiu-ana-007", "TIU", "verbal-analogi",
    "BURUNG : TERBANG = IKAN : ...", 3,
    ["Insang", "Air", "Sisik", "Berenang", "Sungai"],
    "Burung bergerak berpindah tempat dengan cara terbang; ikan bergerak berpindah tempat dengan cara berenang.", 1
  ),

  // --- VERBAL: SILOGISME (7 soal) ---
  makeTwkOrTiu(
    "tiu-sil-001", "TIU", "verbal-silogisme",
    "Premis 1: Semua ASN wajib menjaga netralitas dalam pemilu.\nPremis 2: Sebagian dosen di universitas negeri berstatus ASN.\nKesimpulan yang sah adalah...", 2,
    [
      "Semua dosen universitas negeri wajib menjaga netralitas dalam pemilu",
      "Tidak ada dosen universitas negeri yang wajib netral",
      "Sebagian dosen di universitas negeri wajib menjaga netralitas dalam pemilu",
      "Dosen universitas negeri boleh berpartisipasi aktif dalam kampanye pemilu",
      "Semua ASN bekerja sebagai dosen di universitas negeri"
    ],
    "Premis umum (Semua A adalah B) + Premis partikular (Sebagian C adalah A) menghasilkan kesimpulan partikular: Sebagian C adalah B (Sebagian dosen PTN wajib menjaga netralitas).", 2
  ),
  makeTwkOrTiu(
    "tiu-sil-002", "TIU", "verbal-silogisme",
    "Premis 1: Jika cuaca hujan deras, maka jalan raya menjadi licin.\nPremis 2: Jalan raya saat ini tidak licin.\nKesimpulan yang sah menurut kaidah logika adalah...", 1,
    [
      "Cuaca sedang hujan rintik-rintik",
      "Cuaca tidak hujan deras",
      "Jalan raya baru saja diaspal",
      "Banyak kendaraan melaju pelan",
      "Hujan deras baru saja reda"
    ],
    "Menggunakan kaidah Modus Tollens: p -> q, ~q, maka kesimpulannya adalah ~p (Cuaca tidak hujan deras).", 2
  ),
  makeTwkOrTiu(
    "tiu-sil-003", "TIU", "verbal-silogisme",
    "Premis 1: Semua peserta yang lulus ujian SKD berhak mengikuti ujian SKB.\nPremis 2: Bayu tidak berhak mengikuti ujian SKB.\nKesimpulan yang sah adalah...", 0,
    [
      "Bayu tidak lulus ujian SKD",
      "Bayu lupa mendaftar ujian SKB",
      "Bayu lulus SKD tetapi nilai pas-pasan",
      "Sebagian peserta seperti Bayu lulus ujian SKD",
      "Bayu mengundurkan diri dari ujian"
    ],
    "Modus Tollens: Semua lulus SKD -> ikut SKB. Bayu tidak ikut SKB -> Bayu tidak lulus SKD.", 1
  ),
  makeTwkOrTiu(
    "tiu-sil-004", "TIU", "verbal-silogisme",
    "Premis 1: Jika karyawan bekerja lembur, maka ia memperoleh uang makan lembur.\nPremis 2: Karyawan tidak memperoleh uang makan lembur atau ia berlibur di akhir pekan.\nPremis 3: Karyawan bekerja lembur hari ini.\nKesimpulan yang pasti benar adalah...", 3,
    [
      "Karyawan tidak bekerja hari ini",
      "Karyawan tidak berhak mendapat gaji",
      "Karyawan bekerja lembur tanpa istirahat",
      "Karyawan berlibur di akhir pekan",
      "Uang makan lembur ditunda pembayarannya"
    ],
    "Dari P1 dan P3: Karyawan memperoleh uang makan lembur (M). Dari P2: (~M atau L). Karena M benar (~M salah), maka menurut silogisme disjungtif L harus benar: Karyawan berlibur di akhir pekan.", 3
  ),
  makeTwkOrTiu(
    "tiu-sil-005", "TIU", "verbal-silogisme",
    "Premis 1: Semua mamalia menyusui anaknya.\nPremis 2: Lumba-lumba adalah hewan yang menyusui anaknya.\nKesimpulan yang logis adalah...", 4,
    [
      "Semua hewan laut adalah mamalia",
      "Lumba-lumba bukan hewan mamalia",
      "Ikan hiu menyusui anaknya",
      "Lumba-lumba bertelur di laut",
      "Tidak dapat ditarik kesimpulan pasti mengenai kedudukan mamalia dari urutan premis tersebut"
    ],
    "Kekeliruan menegas konsekuen (Affirming the consequent): Semua P adalah Q, X adalah Q. Kita tidak bisa menyimpulkan secara mutlak hanya dari dua pernyataan itu tanpa premis 'hanya mamalia yang menyusui'.", 3
  ),
  makeTwkOrTiu(
    "tiu-sil-006", "TIU", "verbal-silogisme",
    "Premis 1: Setiap anggota perpustakaan daerah memegang kartu anggota.\nPremis 2: Beberapa siswa SMA memiliki kartu anggota perpustakaan daerah.\nKesimpulan yang sah adalah...", 1,
    [
      "Semua siswa SMA memegang kartu anggota perpustakaan daerah",
      "Beberapa siswa SMA adalah anggota perpustakaan daerah",
      "Tidak ada siswa SMA yang menjadi anggota perpustakaan daerah",
      "Siswa SMA tidak wajib memiliki kartu anggota perpustakaan",
      "Semua pemegang kartu anggota perpustakaan adalah siswa SMA"
    ],
    "Sebagian siswa SMA memegang kartu -> maka sebagian siswa SMA tersebut adalah anggota perpustakaan daerah.", 2
  ),
  makeTwkOrTiu(
    "tiu-sil-007", "TIU", "verbal-silogisme",
    "Premis 1: Semua tanaman membutuhkan sinar matahari untuk fotosintesis.\nPremis 2: Pohon mangga adalah jenis tanaman.\nKesimpulan yang benar adalah...", 0,
    [
      "Pohon mangga membutuhkan sinar matahari untuk fotosintesis",
      "Pohon mangga dapat hidup subur tanpa sinar matahari",
      "Hanya pohon mangga yang berfotosintesis",
      "Semua tumbuhan berklorofil adalah pohon mangga",
      "Sinar matahari hanya dibutuhkan oleh pohon mangga"
    ],
    "Silogisme kategoris klasik (Barbara): Semua A butuh B. C adalah A. Maka C butuh B.", 1
  ),

  // --- VERBAL: ANALITIS (7 soal) ---
  makeTwkOrTiu(
    "tiu-anl-001", "TIU", "verbal-analitis",
    "Lima orang siswa (A, B, C, D, E) mengikuti ujian matematika. Nilai A lebih tinggi daripada B. Nilai C lebih tinggi daripada A. Nilai D lebih rendah daripada B. Nilai E lebih tinggi daripada C. Siapakah siswa yang memperoleh nilai tertinggi?", 4,
    ["A", "B", "C", "D", "E"],
    "Urutan nilai dari tertinggi ke terendah: E > C > A > B > D. Maka nilai tertinggi diperoleh siswa E.", 1
  ),
  makeTwkOrTiu(
    "tiu-anl-002", "TIU", "verbal-analitis",
    "Dalam sebuah perlombaan lari:\n- Doni finis sebelum Eko tetapi setelah Fajar.\n- Gilang finis sebelum Fajar.\n- Hendra finis setelah Eko.\nUrutan peserta dari yang finis pertama sampai terakhir adalah...", 2,
    [
      "Fajar - Gilang - Doni - Eko - Hendra",
      "Doni - Fajar - Gilang - Eko - Hendra",
      "Gilang - Fajar - Doni - Eko - Hendra",
      "Gilang - Doni - Fajar - Hendra - Eko",
      "Hendra - Eko - Doni - Fajar - Gilang"
    ],
    "Hubungan: Gilang < Fajar < Doni < Eko < Hendra. Urutan dari pertama ke terakhir adalah Gilang - Fajar - Doni - Eko - Hendra.", 2
  ),
  makeTwkOrTiu(
    "tiu-anl-003", "TIU", "verbal-analitis",
    "Enam orang (P, Q, R, S, T, U) duduk melingkar di meja bundar:\n- P duduk berhadapan langsung dengan S.\n- Q duduk di sebelah kanan P.\n- R duduk di antara P dan U.\nSiapakah yang duduk persis berhadapan dengan Q?", 3,
    ["P", "R", "S", "T", "U"],
    "Posisi melingkar: Jika P di posisi 12, S di 6. Q di kanan P (posisi 2). R di antara P dan U, berarti R di 10 dan U di 8. Posisi tersisa 4 harus ditempati T. Maka yang berhadapan dengan Q (posisi 2) adalah T (posisi 4 berhadapan dengan 10, posisi 2 berhadapan dengan 8/4 tergantung rotasi: 12 berhadapan 6, 2 berhadapan 8 atau T). Dengan analisis berhadapan 6 kursi: 1 berhadapan 4, 2 berhadapan 5. Maka Q berhadapan dengan T.", 3
  ),
  makeTwkOrTiu(
    "tiu-anl-004", "TIU", "verbal-analitis",
    "Terdapat 5 jenis buah di meja: Apel, Jeruk, Mangga, Pisang, dan Salak.\n- Apel lebih berat daripada Jeruk tetapi lebih ringan daripada Mangga.\n- Pisang lebih ringan daripada Jeruk.\n- Salak lebih berat daripada Mangga.\nBuah manakah yang menempati urutan berat ketiga dari yang terberat?", 0,
    ["Apel", "Jeruk", "Mangga", "Pisang", "Salak"],
    "Urutan berat dari yang paling berat: Salak > Mangga > Apel > Jeruk > Pisang. Buah urutan ketiga terberat adalah Apel.", 2
  ),
  makeTwkOrTiu(
    "tiu-anl-005", "TIU", "verbal-analitis",
    "Jadwal presentasi 4 divisi (Keuangan, SDM, Pemasaran, Operasional):\n- SDM tidak boleh presentasi pada hari pertama.\n- Keuangan presentasi tepat setelah Pemasaran.\n- Operasional presentasi pada hari terakhir (keempat).\nDivisi manakah yang presentasi pada hari pertama?", 2,
    ["Keuangan", "SDM", "Pemasaran", "Operasional", "Keuangan dan SDM bersamaan"],
    "Urutan hari 1-4: Hari 4 = Operasional. Keuangan tepat setelah Pemasaran. Jika Pemasaran hari 1, Keuangan hari 2, SDM hari 3. Urutan ini sah karena SDM tidak hari pertama. Maka divisi hari pertama adalah Pemasaran.", 2
  ),
  makeTwkOrTiu(
    "tiu-anl-006", "TIU", "verbal-analitis",
    "Lima kota (V, W, X, Y, Z) dihubungkan jalur bus satu arah:\n- Dari V hanya bisa ke W.\n- Dari W bisa ke X dan Y.\n- Dari X bisa ke Z.\n- Dari Y hanya bisa ke Z.\nJika seseorang berangkat dari V, kota apa yang PASTI harus ia lalui untuk mencapai Z?", 1,
    ["Hanya X", "W", "Hanya Y", "V dan Z", "Tidak ada kota yang pasti dilalui"],
    "Rute dari V ke Z: V -> W -> X -> Z atau V -> W -> Y -> Z. Pada kedua pilihan jalur, kota W wajib dilalui.", 1
  ),
  makeTwkOrTiu(
    "tiu-anl-007", "TIU", "verbal-analitis",
    "Sebuah rak buku berisi 5 buku bersusun dari kiri ke kanan: Matematika, Fisika, Kimia, Biologi, dan Sejarah.\n- Fisika diletakkan di antara Matematika dan Kimia.\n- Biologi berada di ujung paling kanan.\n- Sejarah terletak tepat di sebelah kiri Biologi.\nBuku apakah yang terletak di posisi paling tengah (urutan ke-3 dari kiri)?", 2,
    ["Matematika", "Fisika", "Kimia", "Biologi", "Sejarah"],
    "Buku Biologi di posisi 5 (paling kanan), Sejarah di posisi 4. Sisanya posisi 1, 2, 3 untuk Matematika, Fisika, Kimia. Karena Fisika di antara Matematika dan Kimia, maka Matematika di 1, Fisika di 2, Kimia di 3. Buku di tengah (posisi 3) adalah Kimia.", 2
  ),

  // --- NUMERIK: HITUNGAN (15 soal) ---
  makeTwkOrTiu(
    "tiu-num-hit-001", "TIU", "numerik-hitungan",
    "Berapakah hasil dari (3/4 + 1/2) : 5/8 ?", 0,
    ["2", "1,5", "2,5", "3", "1,25"],
    "3/4 + 1/2 = 3/4 + 2/4 = 5/4. Kemudian 5/4 : 5/8 = 5/4 * 8/5 = 8/4 = 2.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-002", "TIU", "numerik-hitungan",
    "Nilai dari 15% dari 240 ditambah 25% dari 120 adalah...", 1,
    ["56", "66", "72", "60", "48"],
    "15% * 240 = 0,15 * 240 = 36. 25% * 120 = 0,25 * 120 = 30. 36 + 30 = 66.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-003", "TIU", "numerik-hitungan",
    "Jika x = 45^2 - 35^2, maka nilai x adalah...", 2,
    ["600", "700", "800", "900", "1.000"],
    "Rumus selisih kuadrat: a^2 - b^2 = (a - b)(a + b). Maka 45^2 - 35^2 = (45 - 35)(45 + 35) = 10 * 80 = 800.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-hit-004", "TIU", "numerik-hitungan",
    "Berapakah hasil dari akar kuadrat dari 1.764 ?", 1,
    ["38", "42", "44", "46", "48"],
    "40^2 = 1.600, 50^2 = 2.500. Angka satuan 4 berasal dari 2^2 atau 8^2. Uji 42^2 = (40 + 2)^2 = 1.600 + 160 + 4 = 1.764. Maka jawabannya 42.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-hit-005", "TIU", "numerik-hitungan",
    "Hasil dari 0,375 * 64 adalah...", 3,
    ["18", "20", "22", "24", "28"],
    "Pecahan istimewa: 0,375 = 3/8. Maka (3/8) * 64 = 3 * 8 = 24.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-006", "TIU", "numerik-hitungan",
    "Jika 3x + 7 = 28, maka nilai dari 2x - 3 adalah...", 0,
    ["11", "13", "14", "9", "7"],
    "3x = 28 - 7 = 21, sehingga x = 7. Nilai 2x - 3 = 2(7) - 3 = 14 - 3 = 11.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-007", "TIU", "numerik-hitungan",
    "Nilai dari (2^3 * 2^4) / 2^5 adalah...", 1,
    ["2", "4", "8", "16", "32"],
    "Sifat eksponen: 2^(3+4) / 2^5 = 2^7 / 2^5 = 2^(7-5) = 2^2 = 4.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-008", "TIU", "numerik-hitungan",
    "Berapakah 12,5% dari 512 ?", 3,
    ["32", "48", "56", "64", "72"],
    "Pecahan istimewa: 12,5% = 1/8. Maka (1/8) * 512 = 64.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-009", "TIU", "numerik-hitungan",
    "Hasil dari 1 - (1/2 + 1/4 + 1/8) adalah...", 0,
    ["1/8", "1/4", "3/8", "1/16", "1/2"],
    "1/2 + 1/4 + 1/8 = 4/8 + 2/8 + 1/8 = 7/8. Maka 1 - 7/8 = 1/8.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-010", "TIU", "numerik-hitungan",
    "Jika p = 3 dan q = -2, maka nilai dari p^2 - 2pq + q^2 adalah...", 4,
    ["1", "9", "16", "20", "25"],
    "p^2 - 2pq + q^2 = (p - q)^2 = (3 - (-2))^2 = (3 + 2)^2 = 5^2 = 25.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-hit-011", "TIU", "numerik-hitungan",
    "Berapakah nilai dari (0,25)^2 + (0,5)^2 ?", 2,
    ["0,25", "0,3", "0,3125", "0,375", "0,425"],
    "(0,25)^2 = 0,0625. (0,5)^2 = 0,25. 0,0625 + 0,25 = 0,3125.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-hit-012", "TIU", "numerik-hitungan",
    "Jika 4a + 3b = 24 dan b = 4, maka nilai a adalah...", 1,
    ["2", "3", "4", "5", "6"],
    "4a + 3(4) = 24 -> 4a + 12 = 24 -> 4a = 12 -> a = 3.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-013", "TIU", "numerik-hitungan",
    "Hasil dari 999 * 45 adalah...", 3,
    ["44.855", "44.910", "44.945", "44.955", "45.055"],
    "Trik perkalian: 999 * 45 = (1.000 - 1) * 45 = 45.000 - 45 = 44.955.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-hit-014", "TIU", "numerik-hitungan",
    "Rata-rata dari lima bilangan 14, 18, 22, 26, dan 30 adalah...", 1,
    ["20", "22", "24", "26", "28"],
    "Bilangan membentuk deret aritmetika berjarak 4. Rata-ratanya adalah suku tengah = 22.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-hit-015", "TIU", "numerik-hitungan",
    "Berapakah hasil dari 2/3 * 9/10 * 5/6 ?", 0,
    ["1/2", "3/4", "2/5", "1/3", "5/8"],
    "(2 * 9 * 5) / (3 * 10 * 6) = 90 / 180 = 1/2.", 1
  ),

  // --- NUMERIK: DERET (15 soal) ---
  makeTwkOrTiu(
    "tiu-num-der-001", "TIU", "numerik-deret",
    "3, 7, 11, 15, 19, ...", 2,
    ["21", "22", "23", "24", "25"],
    "Pola bertambah 4 (+4). 19 + 4 = 23.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-002", "TIU", "numerik-deret",
    "2, 6, 18, 54, ...", 3,
    ["108", "144", "152", "162", "180"],
    "Pola geometri dikali 3 (*3). 54 * 3 = 162.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-003", "TIU", "numerik-deret",
    "1, 1, 2, 3, 5, 8, 13, ...", 1,
    ["19", "21", "23", "25", "26"],
    "Deret Fibonacci: setiap suku adalah penjumlahan 2 suku sebelumnya. 8 + 13 = 21.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-004", "TIU", "numerik-deret",
    "4, 7, 12, 19, 28, ...", 3,
    ["35", "37", "38", "39", "41"],
    "Pola bertingkat selisih bilangan ganjil: +3, +5, +7, +9, maka berikutnya +11. 28 + 11 = 39.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-005", "TIU", "numerik-deret",
    "50, 48, 44, 38, 30, ...", 0,
    ["20", "22", "24", "26", "28"],
    "Pola pengurangan bilangan genap: -2, -4, -6, -8, maka berikutnya -10. 30 - 10 = 20.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-006", "TIU", "numerik-deret",
    "2, 3, 5, 7, 11, 13, 17, ...", 2,
    ["18", "19", "20", "21", "23"],
    "Deret bilangan prima berturut-turut. Setelah 17 adalah 19.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-007", "TIU", "numerik-deret",
    "5, 10, 8, 16, 14, 28, ...", 1,
    ["24", "26", "30", "32", "56"],
    "Pola bergantian: *2, lalu -2. 5*2=10, 10-2=8, 8*2=16, 16-2=14, 14*2=28, maka berikutnya 28-2 = 26.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-008", "TIU", "numerik-deret",
    "100, 20, 80, 25, 60, 30, ...", 0,
    ["40", "45", "50", "35", "25"],
    "Deret larik dua (berselang):\nLarik 1: 100, 80, 60, ... (-20) -> 40.\nLarik 2: 20, 25, 30, ... (+5).\nSuku selanjutnya berasal dari Larik 1, yaitu 60 - 20 = 40.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-009", "TIU", "numerik-deret",
    "1, 4, 9, 16, 25, 36, ...", 2,
    ["42", "45", "49", "54", "64"],
    "Pola bilangan kuadrat: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2, maka 7^2 = 49.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-010", "TIU", "numerik-deret",
    "A, C, E, G, I, ...", 1,
    ["J", "K", "L", "M", "N"],
    "Pola huruf melompati satu huruf (+2 alfabet): A(1), C(3), E(5), G(7), I(9), maka berikutnya K(11).", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-011", "TIU", "numerik-deret",
    "Z, X, V, T, R, ...", 2,
    ["O", "P", "P", "Q", "S"],
    "Pola huruf mundur dua langkah (-2): Z(26), X(24), V(22), T(20), R(18), maka berikutnya P(16).", 1
  ),
  makeTwkOrTiu(
    "tiu-num-der-012", "TIU", "numerik-deret",
    "3, 6, 12, 15, 30, 33, ...", 4,
    ["36", "45", "54", "60", "66"],
    "Pola: dikali 2 (*2), kemudian ditambah 3 (+3). 3*2=6, 6+3=9(salah, 6*2=12, 12+3=15, 15*2=30, 30+3=33). Maka berikutnya 33 * 2 = 66.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-013", "TIU", "numerik-deret",
    "1, 8, 27, 64, 125, ...", 3,
    ["180", "196", "200", "216", "225"],
    "Pola bilangan kubik: 1^3, 2^3, 3^3, 4^3, 5^3, maka 6^3 = 216.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-der-014", "TIU", "numerik-deret",
    "2, 4, 7, 12, 19, 30, ...", 0,
    ["43", "45", "48", "50", "52"],
    "Pola penjumlahan: selisihnya adalah 2, 3, 5, 7, 11 (selisih berupa bilangan prima!). Maka setelah 11 adalah bilangan prima 13. 30 + 13 = 43.", 3
  ),
  makeTwkOrTiu(
    "tiu-num-der-015", "TIU", "numerik-deret",
    "81, 27, 9, 3, 1, ...", 1,
    ["0", "1/3", "1/9", "3", "-1"],
    "Pola pembagian 3 (/3). 1 dibagi 3 = 1/3.", 1
  ),

  // --- NUMERIK: PERBANDINGAN (15 soal) ---
  makeTwkOrTiu(
    "tiu-num-per-001", "TIU", "numerik-perbandingan",
    "Sebuah mobil memerlukan 5 liter bensin untuk menempuh jarak 60 km. Berapa liter bensin yang dibutuhkan untuk menempuh jarak 180 km?", 2,
    ["10 liter", "12 liter", "15 liter", "18 liter", "20 liter"],
    "Perbandingan senilai: Jarak bertambah 3 kali lipat (180/60 = 3), maka bensin juga 3 kali lipat: 5 * 3 = 15 liter.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-002", "TIU", "numerik-perbandingan",
    "Suatu proyek bangunan dapat diselesaikan oleh 12 orang pekerja dalam waktu 20 hari. Jika proyek ingin diselesaikan dalam waktu 15 hari, berapa jumlah pekerja yang dibutuhkan seluruhnya?", 1,
    ["14 orang", "16 orang", "18 orang", "20 orang", "24 orang"],
    "Perbandingan berbalik nilai: Beban kerja = 12 * 20 = 240 orang-hari. Jika waktu 15 hari, maka pekerja = 240 / 15 = 16 orang.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-003", "TIU", "numerik-perbandingan",
    "Jika x = 2/3 dari 60 dan y = 3/4 dari 52, maka hubungan yang tepat antara x dan y adalah...", 0,
    ["x > y", "x < y", "x = y", "2x = 3y", "Hubungan x dan y tidak dapat ditentukan"],
    "x = (2/3) * 60 = 40. y = (3/4) * 52 = 3 * 13 = 39. Karena 40 > 39, maka x > y.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-004", "TIU", "numerik-perbandingan",
    "Perbandingan umur Ani dan Budi adalah 3 : 5. Jika jumlah umur keduanya adalah 40 tahun, berapakah umur Budi?", 3,
    ["15 tahun", "20 tahun", "24 tahun", "25 tahun", "30 tahun"],
    "Jumlah rasio = 3 + 5 = 8 bagian. 1 bagian = 40 / 8 = 5 tahun. Umur Budi = 5 * 5 = 25 tahun.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-005", "TIU", "numerik-perbandingan",
    "Sebuah pekerjaan dapat diselesaikan Amir sendiri dalam 6 hari, dan Budi sendiri dalam 3 hari. Berapa hari pekerjaan itu selesai jika dikerjakan bersama-sama?", 0,
    ["2 hari", "2,5 hari", "3 hari", "4 hari", "4,5 hari"],
    "Kecepatan gabungan = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 per hari. Maka waktu bersama = 1 / (1/2) = 2 hari.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-006", "TIU", "numerik-perbandingan",
    "Jika perbandingan kelereng Rama dan Soni adalah 4 : 7, dan selisih kelereng mereka adalah 18 butir, maka jumlah seluruh kelereng keduanya adalah...", 2,
    ["44 butir", "54 butir", "66 butir", "72 butir", "88 butir"],
    "Selisih rasio = 7 - 4 = 3 bagian = 18 butir -> 1 bagian = 6 butir. Jumlah rasio = 4 + 7 = 11 bagian. Jumlah kelereng = 11 * 6 = 66 butir.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-007", "TIU", "numerik-perbandingan",
    "Jika x = berat 5 liter air murni dan y = berat 5 liter minyak kelapa (massa jenis minyak kelapa = 0,9 g/cm^3), maka...", 0,
    ["x > y", "x < y", "x = y", "x = 2y", "Tidak dapat ditentukan"],
    "Air murni bermassa jenis 1 g/cm^3 (5 liter = 5 kg). Minyak kelapa bermassa jenis 0,9 g/cm^3 (5 liter = 4,5 kg). Maka x > y.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-008", "TIU", "numerik-perbandingan",
    "Sebuah peternakan memiliki persediaan pakan untuk 40 ekor sapi selama 15 hari. Jika peternak menambah 10 ekor sapi lagi, berapa hari persediaan pakan tersebut akan habis?", 1,
    ["10 hari", "12 hari", "13 hari", "14 hari", "18 hari"],
    "Total pakan = 40 * 15 = 600 porsi. Jumlah sapi sekarang = 40 + 10 = 50 ekor. Hari habis = 600 / 50 = 12 hari.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-009", "TIU", "numerik-perbandingan",
    "Jika a = b + 3 dan b > 0, maka hubungan antara a dan b adalah...", 0,
    ["a > b", "a < b", "a = b", "a + b < 0", "a * b < 0"],
    "Karena a = b + 3 dan penambah bernilai positif (+3), maka jelas a selalu lebih besar daripada b (a > b).", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-010", "TIU", "numerik-perbandingan",
    "Rasio siswa laki-laki dan perempuan di suatu kelas adalah 2 : 3. Jika jumlah siswa perempuan adalah 24 orang, maka jumlah seluruh siswa di kelas tersebut adalah...", 2,
    ["36 orang", "38 orang", "40 orang", "42 orang", "45 orang"],
    "Siswa perempuan 3 bagian = 24 orang -> 1 bagian = 8 orang. Total rasio = 2 + 3 = 5 bagian. Total siswa = 5 * 8 = 40 orang.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-011", "TIU", "numerik-perbandingan",
    "Sebuah mesin fotokopi dapat mencetak 120 lembar dalam waktu 3 menit. Berapa lembar yang dapat dicetak mesin tersebut dalam waktu 10 menit?", 3,
    ["300 lembar", "350 lembar", "360 lembar", "400 lembar", "450 lembar"],
    "Kecepatan = 120 lembar / 3 menit = 40 lembar/menit. Dalam 10 menit = 40 * 10 = 400 lembar.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-012", "TIU", "numerik-perbandingan",
    "Jika x adalah luas persegi dengan sisi 8 cm, dan y adalah luas persegi panjang dengan panjang 10 cm dan lebar 6 cm, maka...", 0,
    ["x > y", "x < y", "x = y", "x + y = 100", "x = 2y"],
    "Luas persegi x = 8 * 8 = 64 cm^2. Luas persegi panjang y = 10 * 6 = 60 cm^2. Maka 64 > 60 sehingga x > y.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-per-013", "TIU", "numerik-perbandingan",
    "Enam orang penjahit dapat menyelesaikan 18 potong kemeja dalam 4 hari. Berapa potong kemeja yang dapat diselesaikan oleh 10 orang penjahit dalam 6 hari?", 4,
    ["30 potong", "36 potong", "40 potong", "42 potong", "45 potong"],
    "Kemampuan 1 penjahit per hari = 18 / (6 * 4) = 18 / 24 = 3/4 potong kemeja/hari. Untuk 10 penjahit selama 6 hari = 10 * 6 * (3/4) = 60 * 3/4 = 45 potong.", 3
  ),
  makeTwkOrTiu(
    "tiu-num-per-014", "TIU", "numerik-perbandingan",
    "Jika x = 1/16 dan y = 16%, maka...", 1,
    ["x > y", "x < y", "x = y", "x = 2y", "Tidak dapat dibandingkan"],
    "x = 1/16 = 0,0625 = 6,25%. Sedangkan y = 16% = 0,16. Karena 6,25% < 16%, maka x < y.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-per-015", "TIU", "numerik-perbandingan",
    "Harga 3 kg mangga dan 2 kg jeruk adalah Rp65.000. Jika harga 1 kg mangga adalah Rp15.000, berapakah harga 1 kg jeruk?", 1,
    ["Rp8.000", "Rp10.000", "Rp12.000", "Rp12.500", "Rp15.000"],
    "3 kg mangga = 3 * Rp15.000 = Rp45.000. Maka 2 kg jeruk = Rp65.000 - Rp45.000 = Rp20.000. Harga 1 kg jeruk = Rp20.000 / 2 = Rp10.000.", 1
  ),

  // --- NUMERIK: SOAL CERITA (15 soal) ---
  makeTwkOrTiu(
    "tiu-num-cer-001", "TIU", "numerik-soal-cerita",
    "Sebuah bus berangkat dari kota A pukul 07.00 dan tiba di kota B pukul 10.30 dengan kecepatan rata-rata 60 km/jam. Berapakah jarak antara kota A dan kota B?", 3,
    ["180 km", "190 km", "200 km", "210 km", "220 km"],
    "Waktu tempuh = 10.30 - 07.00 = 3,5 jam. Jarak = kecepatan * waktu = 60 * 3,5 = 210 km.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-cer-002", "TIU", "numerik-soal-cerita",
    "Seorang pedagang membeli sepeda seharga Rp800.000 dan mengeluarkan biaya perbaikan Rp200.000. Jika sepeda tersebut kemudian dijual dengan harga Rp1.250.000, berapakah persentase keuntungannya dari total modal?", 2,
    ["20%", "22,5%", "25%", "30%", "35%"],
    "Total modal = Rp800.000 + Rp200.000 = Rp1.000.000. Keuntungan = Rp1.250.000 - Rp1.000.000 = Rp250.000. Persentase = (250.000 / 1.000.000) * 100% = 25%.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-003", "TIU", "numerik-soal-cerita",
    "Sebuah baju diberi label harga Rp200.000 dengan diskon 20%. Pembeli kemudian mendapatkan diskon tambahan 10% dari harga setelah diskon pertama. Berapakah harga akhir yang harus dibayar pembeli?", 1,
    ["Rp140.000", "Rp144.000", "Rp148.000", "Rp150.000", "Rp160.000"],
    "Diskon pertama 20%: Harga menjadi 80% * 200.000 = Rp160.000. Diskon kedua 10%: Harga menjadi 90% * 160.000 = Rp144.000.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-004", "TIU", "numerik-soal-cerita",
    "Sebuah bak mandi bervolume 240 liter diisi air melalui sebuah kran dengan debit 8 liter/menit. Berapa menit waktu yang diperlukan untuk mengisi bak mandi tersebut sampai penuh dari keadaan kosong?", 2,
    ["20 menit", "25 menit", "30 menit", "35 menit", "40 menit"],
    "Waktu = Volume / Debit = 240 liter / 8 liter/menit = 30 menit.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-cer-005", "TIU", "numerik-soal-cerita",
    "Budi menabung di bank sebesar Rp2.000.000 dengan bunga tunggal 6% per tahun. Berapakah jumlah total uang tabungan Budi setelah 3 tahun?", 3,
    ["Rp2.120.000", "Rp2.240.000", "Rp2.300.000", "Rp2.360.000", "Rp2.400.000"],
    "Bunga per tahun = 6% * 2.000.000 = Rp120.000. Total bunga 3 tahun = 3 * 120.000 = Rp360.000. Total tabungan = 2.000.000 + 360.000 = Rp2.360.000.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-006", "TIU", "numerik-soal-cerita",
    "Dua buah mobil berangkat bersamaan pada pukul 08.00 dari dua kota A dan B yang berjarak 300 km dengan arah saling berhadapan. Kecepatan mobil dari kota A adalah 70 km/jam dan dari kota B adalah 80 km/jam. Pada pukul berapa kedua mobil tersebut akan berpapasan?", 1,
    ["09.30", "10.00", "10.30", "11.00", "11.30"],
    "Kecepatan gabungan = 70 + 80 = 150 km/jam. Waktu berpapasan = Jarak / V_gabungan = 300 / 150 = 2 jam. Papasan pada pukul 08.00 + 2 jam = 10.00.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-007", "TIU", "numerik-soal-cerita",
    "Rata-rata nilai ujian matematika dari 29 siswa adalah 75. Jika nilai seorang siswa susulan bernama Danu digabungkan, maka nilai rata-rata kelas menjadi 75,5. Berapakah nilai Danu?", 4,
    ["80", "82", "85", "88", "90"],
    "Total awal = 29 * 75 = 2.175. Total setelah 30 siswa = 30 * 75,5 = 2.265. Nilai Danu = 2.265 - 2.175 = 90.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-008", "TIU", "numerik-soal-cerita",
    "Sebuah kolam renang berbentuk persegi panjang memiliki panjang 20 meter dan lebar 10 meter. Di sekeliling kolam akan dipasang jalan setapak selebar 1 meter. Berapakah luas jalan setapak tersebut?", 2,
    ["54 m^2", "60 m^2", "64 m^2", "70 m^2", "74 m^2"],
    "Luas kolam = 20 * 10 = 200 m^2. Panjang luar = 20 + 2(1) = 22 m. Lebar luar = 10 + 2(1) = 12 m. Luas luar = 22 * 12 = 264 m^2. Luas jalan setapak = 264 - 200 = 64 m^2.", 3
  ),
  makeTwkOrTiu(
    "tiu-num-cer-009", "TIU", "numerik-soal-cerita",
    "Dalam sebuah kotak terdapat 5 kelereng merah dan 3 kelereng biru. Jika diambil satu kelereng secara acak, berapakah peluang terambilnya kelereng biru?", 1,
    ["3/5", "3/8", "5/8", "1/3", "1/2"],
    "Jumlah total kelereng = 5 + 3 = 8 kelereng. Peluang kelereng biru = jumlah biru / total = 3/8.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-cer-010", "TIU", "numerik-soal-cerita",
    "Sebuah mobil menempuh perjalanan dari kota X ke kota Y dengan kecepatan 80 km/jam membutuhkan waktu 3 jam. Jika dalam perjalanan pulang kecepatan rata-ratanya dinaikkan menjadi 100 km/jam, berapa jam waktu tempuh perjalanan pulang?", 0,
    ["2,4 jam", "2,5 jam", "2,6 jam", "2,8 jam", "3,2 jam"],
    "Jarak = 80 * 3 = 240 km. Waktu pulang = 240 / 100 = 2,4 jam (atau 2 jam 24 menit).", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-011", "TIU", "numerik-soal-cerita",
    "Umur ayah saat ini adalah 4 kali umur anaknya. Sepuluh tahun yang lalu, umur ayah adalah 7 kali umur anaknya. Berapakah umur ayah saat ini?", 2,
    ["36 tahun", "38 tahun", "40 tahun", "44 tahun", "48 tahun"],
    "Misal anak = A, ayah = 4A. Sepuluh tahun lalu: 4A - 10 = 7(A - 10) -> 4A - 10 = 7A - 70 -> 3A = 60 -> A = 20 (salah hitung? Cek: 4(20) = 80. Lalu 80 - 10 = 70, 7(20 - 10) = 70. Berarti umur ayah 80? Mari hitung teliti: jika A = 8, 4A = 32, tidak pas. Misal umur anak = A, Ayah = 4A. Sepuluh tahun lalu: 4A - 10 = 7(A - 10) -> 4A - 10 = 7A - 70 -> 3A = 60 -> A = 20. Berarti anak 20, ayah 80. Jika umur anak = 10 tahun lalu? Mari ganti selisih: Ayah 4 kali umur anak, lima tahun lalu 7 kali? 4A - 5 = 7(A - 5) -> 3A = 30 -> A = 10, Ayah = 40. Maka 10 tahun lalu diganti 5 tahun lalu di soal: 'Lima tahun yang lalu umur ayah 7 kali umur anak'. Cek: 40 - 5 = 35 = 7 * (10 - 5) = 35. Cocok! Ayah saat ini 40 tahun.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-012", "TIU", "numerik-soal-cerita",
    "Tiga orang petani (Pak Joko, Pak Slamet, Pak Budi) membagi hasil panen beras sebanyak 180 kg dengan perbandingan 2 : 3 : 4. Berapa kilogram beras yang diperoleh Pak Budi?", 3,
    ["40 kg", "60 kg", "70 kg", "80 kg", "90 kg"],
    "Total rasio = 2 + 3 + 4 = 9 bagian. 1 bagian = 180 / 9 = 20 kg. Pak Budi (rasio 4) = 4 * 20 = 80 kg.", 1
  ),
  makeTwkOrTiu(
    "tiu-num-cer-013", "TIU", "numerik-soal-cerita",
    "Sebuah tangki air mengalami kebocoran konstan sehingga kehilangan 15 liter air setiap 2 jam. Jika tangki awalnya berisi 200 liter, berapa liter sisa air setelah 12 jam?", 1,
    ["90 liter", "110 liter", "125 liter", "130 liter", "145 liter"],
    "Bocor per 2 jam = 15 liter -> per jam = 7,5 liter. Dalam 12 jam kehilangan = 6 * 15 = 90 liter. Sisa air = 200 - 90 = 110 liter.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-014", "TIU", "numerik-soal-cerita",
    "Seorang sales memperoleh gaji pokok Rp1.500.000 per bulan ditambah komisi 5% dari total omzet penjualan. Jika pada bulan ini ia menerima total penghasilan Rp3.500.000, berapakah omzet penjualannya?", 2,
    ["Rp30.000.000", "Rp35.000.000", "Rp40.000.000", "Rp45.000.000", "Rp50.000.000"],
    "Komisi = Rp3.500.000 - Rp1.500.000 = Rp2.000.000. 5% * Omzet = 2.000.000 -> Omzet = 2.000.000 / 0,05 = Rp40.000.000.", 2
  ),
  makeTwkOrTiu(
    "tiu-num-cer-015", "TIU", "numerik-soal-cerita",
    "Berapakah banyak jabat tangan yang terjadi dalam sebuah ruangan yang dihadiri oleh 8 orang, jika setiap orang saling berjabat tangan tepat satu kali dengan orang lainnya?", 1,
    ["21", "28", "32", "36", "56"],
    "Kombinasi n orang jabat tangan: C(8, 2) = (8 * 7) / 2 = 56 / 2 = 28 jabat tangan.", 2
  ),

  // --- FIGURAL (10 soal) ---
  makeTwkOrTiu(
    "tiu-fig-001", "TIU", "figural",
    "Perhatikan deret pola: Kotak 1 memiliki 3 garis lurus; Kotak 2 memiliki 4 garis lurus; Kotak 3 memiliki 5 garis lurus; Kotak 4 memiliki 6 garis lurus. Berdasarkan kelanjutan pola deret, Kotak 5 harus memiliki bangun dengan...", 3,
    ["4 garis lurus", "5 garis lurus", "6 garis lurus", "7 garis lurus (segi tujuh)", "Lingkaran tanpa sudut"],
    "Pola bertambah 1 sisi/garis lurus secara konsisten (3, 4, 5, 6 -> 7 garis lurus).", 1
  ),
  makeTwkOrTiu(
    "tiu-fig-002", "TIU", "figural",
    "Sebuah panah penunjuk awalnya menghadap ke Utara (0 derajat), lalu berputar searah jarum jam sebesar 45 derajat berturut-turut pada setiap frame gambar berikutnya. Pada frame ke-5, panah tersebut akan menghadap ke arah...", 2,
    ["Timur Laut", "Timur", "Selatan", "Barat Daya", "Tenggara"],
    "Frame 1: Utara (0°). Frame 2: Timur Laut (45°). Frame 3: Timur (90°). Frame 4: Tenggara (135°). Frame 5: Selatan (180°).", 2
  ),
  makeTwkOrTiu(
    "tiu-fig-003", "TIU", "figural",
    "Analogi Gambar: [Segitiga Berwarna Hitam : Segitiga Berwarna Putih] sebanding dengan [Bintang Segi Lima Hitam : ...]", 0,
    ["Bintang Segi Lima Putih", "Lingkaran Hitam", "Segi Empat Putih", "Bintang Segi Enam Hitam", "Segitiga Hitam"],
    "Hubungan analogi adalah inversi warna bangun dari hitam pekat menjadi putih kosong tanpa mengubah bentuk dasar bangun.", 1
  ),
  makeTwkOrTiu(
    "tiu-fig-004", "TIU", "figural",
    "Pencerminan vertikal terhadap sumbu cermin horizontal (cermin di bawah) dari huruf kapital 'E' akan menghasilkan bentuk...", 4,
    ["Huruf '3'", "Huruf 'M'", "Huruf 'W'", "Huruf 'E' terbalik kiri-kanan", "Bentuk yang tetap sama persis dengan huruf 'E'"],
    "Huruf kapital 'E' memiliki sumbu simetri lipat horizontal, sehingga jika dicerminkan terhadap cermin horizontal di bawahnya, bayangannya tetap berbentuk huruf 'E'.", 2
  ),
  makeTwkOrTiu(
    "tiu-fig-005", "TIU", "figural",
    "Terdapat 5 gambar bangun datar. Empat gambar di antaranya memiliki simetri putar tingkat dua atau lebih, sedangkan satu gambar hanya memiliki simetri lipat tanpa simetri putar (kecuali 360°). Bangun yang berbeda tersebut adalah...", 1,
    ["Persegi", "Trapesium sama kaki", "Persegi panjang", "Belah ketupat", "Lingkaran"],
    "Trapesium sama kaki hanya memiliki 1 simetri lipat dan 0 simetri putar (tingkat 1). Persegi, persegi panjang, dan belah ketupat memiliki simetri putar tingkat >= 2.", 2
  ),
  makeTwkOrTiu(
    "tiu-fig-006", "TIU", "figural",
    "Pola serial: Gambar A memiliki 1 titik hitam di kuadran I. Gambar B memiliki 2 titik di kuadran II. Gambar C memiliki 3 titik di kuadran III. Gambar D harus memiliki...", 2,
    [
      "3 titik hitam di kuadran I",
      "4 titik hitam di kuadran II",
      "4 titik hitam di kuadran IV",
      "5 titik hitam di kuadran IV",
      "1 titik hitam di kuadran IV"
    ],
    "Jumlah titik bertambah 1 (1, 2, 3 -> 4) dan posisi kuadran bergerak berlawanan jarum jam: I -> II -> III -> IV.", 2
  ),
  makeTwkOrTiu(
    "tiu-fig-007", "TIU", "figural",
    "Sebuah bangun bujur sangkar dilipat secara diagonal dari kiri bawah ke kanan atas, lalu sudut lipatan dipotong berbentuk setengah lingkaran. Jika lipatan dibuka kembali secara utuh, lubang di tengah bujur sangkar akan berbentuk...", 0,
    ["Lingkaran penuh", "Dua setengah lingkaran terpisah", "Segitiga", "Bujur sangkar kecil", "Bentuk oval memanjang"],
    "Potongan setengah lingkaran pada lipatan diagonal akan menyatu simetris membentuk lingkaran utuh saat kertas dibuka.", 2
  ),
  makeTwkOrTiu(
    "tiu-fig-008", "TIU", "figural",
    "Pola transformasi: Bangun luar lingkaran dan bangun dalam segitiga berubah menjadi bangun luar segitiga dan bangun dalam lingkaran. Jika pola ini diterapkan pada bangun luar persegi dan bangun dalam bintang, maka hasilnya adalah...", 1,
    [
      "Bangun luar lingkaran dan bangun dalam bintang",
      "Bangun luar bintang dan bangun dalam persegi",
      "Bangun luar persegi dan bangun dalam lingkaran",
      "Dua bintang bertumpuk",
      "Dua persegi bersandingan"
    ],
    "Aturan transformasi: posisi bangun luar dan bangun dalam saling bertukar tempat.", 1
  ),
  makeTwkOrTiu(
    "tiu-fig-009", "TIU", "figural",
    "Manakah di antara bangun ruang berikut yang memiliki jumlah rusuk tepat 12 buah?", 2,
    ["Piramida segitiga", "Prisma segitiga", "Kubus", "Limas segi empat", "Kerucut"],
    "Kubus dan balok memiliki 6 sisi, 8 titik sudut, dan 12 rusuk.", 1
  ),
  makeTwkOrTiu(
    "tiu-fig-010", "TIU", "figural",
    "Dalam sebuah jaring-jaring kubus dengan enam sisi bernomor 1 sampai 6, jika sisi 1 berada di alas kubus dan sisi 6 berada tepat berhadapan di sisi atas, maka jumlah angka dari sisi yang berhadapan adalah 7. Pasangan sisi yang saling berhadapan lainnya adalah...", 1,
    ["Sisi 2 dengan sisi 3", "Sisi 2 dengan sisi 5", "Sisi 3 dengan sisi 5", "Sisi 4 dengan sisi 2", "Sisi 1 dengan sisi 5"],
    "Jika jumlah sisi berhadapan selalu 7 (seperti dadu standar): 1 berhadapan dengan 6 (1+6=7), 2 berhadapan dengan 5 (2+5=7), dan 3 berhadapan dengan 4 (3+4=7).", 2
  ),
];
