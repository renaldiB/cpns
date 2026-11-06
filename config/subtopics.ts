export type CategoryId = "TWK" | "TIU" | "TKP";

export interface SubtopicConfig {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
}

export const CATEGORIES: Record<CategoryId, { id: CategoryId; name: string; questionCount: number; maxScore: number }> = {
  TWK: {
    id: "TWK",
    name: "Tes Wawasan Kebangsaan",
    questionCount: 30,
    maxScore: 150,
  },
  TIU: {
    id: "TIU",
    name: "Tes Inteligensi Umum",
    questionCount: 35,
    maxScore: 175,
  },
  TKP: {
    id: "TKP",
    name: "Tes Karakteristik Pribadi",
    questionCount: 45,
    maxScore: 225,
  },
};

export const SUBTOPICS: SubtopicConfig[] = [
  // TWK
  { id: "pancasila", name: "Pancasila", category: "TWK", description: "Pengamalan sila, sejarah pembentukan, dan nilai-nilai luhur Pancasila" },
  { id: "uud-1945", name: "UUD 1945", category: "TWK", description: "Pasal-pasal UUD 1945, amandemen I-IV, tata urutan peraturan perundangan" },
  { id: "nkri", name: "NKRI", category: "TWK", description: "Bentuk negara, otonomi daerah, sistem pemerintahan, dan batas wilayah" },
  { id: "bhinneka-tunggal-ika", name: "Bhinneka Tunggal Ika", category: "TWK", description: "Keberagaman suku, budaya, agama, dan prinsip toleransi kebangsaan" },
  { id: "nasionalisme", name: "Nasionalisme", category: "TWK", description: "Kepentingan nasional, identitas bangsa, dan patriotisme konstruktif" },
  { id: "integritas", name: "Integritas", category: "TWK", description: "Kejujuran, etika ASN, antikorupsi, dan akuntabilitas publik" },
  { id: "bela-negara", name: "Bela Negara", category: "TWK", description: "Nilai dasar bela negara, pertahanan negara, dan ancaman hibrida" },
  { id: "bahasa-indonesia", name: "Bahasa Indonesia", category: "TWK", description: "EYD/EBI, kalimat efektif, struktur paragraf, dan kosa kata baku" },

  // TIU
  { id: "verbal-sinonim", name: "Verbal: Sinonim", category: "TIU", description: "Persamaan kata dan perbendaharaan kosa kata formal" },
  { id: "verbal-antonim", name: "Verbal: Antonim", category: "TIU", description: "Lawan kata dan makna berlawanan" },
  { id: "verbal-analogi", name: "Verbal: Analogi", category: "TIU", description: "Hubungan ekuivalensi makna antar pasangan kata" },
  { id: "verbal-silogisme", name: "Verbal: Silogisme", category: "TIU", description: "Penarikan kesimpulan logis dari premis mayor dan minor" },
  { id: "verbal-analitis", name: "Verbal: Analitis", category: "TIU", description: "Penalaran analitis urutan posisi, jadwal, dan relasi kondisi" },
  { id: "numerik-hitungan", name: "Numerik: Hitungan", category: "TIU", description: "Aritmetika pecahan, desimal, persentase, dan aljabar dasar" },
  { id: "numerik-deret", name: "Numerik: Deret", category: "TIU", description: "Pola bilangan aritmetika, geometri, bertingkat, dan huruf" },
  { id: "numerik-perbandingan", name: "Numerik: Perbandingan", category: "TIU", description: "Perbandingan senilai, berbalik nilai, dan variabel x vs y" },
  { id: "numerik-soal-cerita", name: "Numerik: Soal Cerita", category: "TIU", description: "Penerapan matematika pada kecepatan, debit, kerja sama, dan laba-rugi" },
  { id: "figural", name: "Figural", category: "TIU", description: "Kelanjutan pola gambar, rotasi 2D/3D, analogi gambar, dan ketidaksamaan" },

  // TKP
  { id: "pelayanan-publik", name: "Pelayanan Publik", category: "TKP", description: "Keramahan, empati, kecekatan, dan pemenuhan kebutuhan masyarakat" },
  { id: "jejaring-kerja", name: "Jejaring Kerja", category: "TKP", description: "Kolaborasi tim, sinergi lintas bidang, dan negosiasi produktif" },
  { id: "sosial-budaya", name: "Sosial Budaya", category: "TKP", description: "Adaptasi di lingkungan majemuk dan penghargaan keragaman" },
  { id: "tik", name: "Teknologi Informasi & Komunikasi", category: "TKP", description: "Pemanfaatan teknologi digital untuk percepatan dan efisiensi kerja" },
  { id: "profesionalisme", name: "Profesionalisme", category: "TKP", description: "Tanggung jawab kerja, fokus pada target, dan pemisahan urusan pribadi" },
  { id: "anti-radikalisme", name: "Anti-Radikalisme", category: "TKP", description: "Sikap moderat, pencegahan ideologi ekstremis, dan loyalitas pada Pancasila" },
];

export function getSubtopicsByCategory(category: CategoryId): SubtopicConfig[] {
  return SUBTOPICS.filter((sub) => sub.category === category);
}

export function isValidSubtopic(category: CategoryId, subtopicId: string): boolean {
  return SUBTOPICS.some((sub) => sub.category === category && sub.id === subtopicId);
}
