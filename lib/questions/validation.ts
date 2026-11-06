import { z } from "zod";
import { CATEGORIES, SUBTOPICS, CategoryId } from "@/config/subtopics";

export const ValidLabels = ["A", "B", "C", "D", "E"] as const;
export type OptionLabel = (typeof ValidLabels)[number];

export const OptionInputSchema = z.object({
  label: z.enum(ValidLabels),
  text: z.string().trim().min(1, "Teks opsi tidak boleh kosong").max(2000, "Teks opsi terlalu panjang"),
  points: z.number().int().min(0).max(5),
});

export const QuestionInputSchema = z
  .object({
    id: z.string().optional(),
    externalId: z.string().trim().max(100).optional().nullable(),
    category: z.enum(["TWK", "TIU", "TKP"]),
    subtopic: z.string().trim().min(1, "Sub-materi wajib diisi"),
    stem: z.string().trim().min(3, "Teks soal minimal 3 karakter").max(10000, "Teks soal terlalu panjang"),
    imagePath: z
      .string()
      .trim()
      .max(500)
      .nullable()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          // Reject traversal and remote protocols
          if (val.includes("..") || val.startsWith("/") || val.includes(":\\")) return false;
          if (/^https?:\/\//i.test(val)) return false;
          return true;
        },
        { message: "Path gambar tidak valid atau tidak aman" }
      ),
    options: z.array(OptionInputSchema).length(5, "Harus terdapat tepat 5 opsi (A–E)"),
    explanation: z.string().trim().min(3, "Pembahasan wajib diisi"),
    difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    sourceNote: z.string().trim().max(200).default("original"),
    sourceReference: z.string().trim().max(500).nullable().optional(),
    reviewStatus: z.enum(["draft", "needs_review", "verified"]).default("needs_review"),
    reviewNote: z.string().trim().max(1000).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    // 1. Verify option labels are unique and contain A, B, C, D, E
    const labels = data.options.map((o) => o.label);
    const uniqueLabels = new Set(labels);
    if (uniqueLabels.size !== 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["options"],
        message: "Label opsi harus unik dan terdiri dari A, B, C, D, E",
      });
    }

    // 2. Validate scoring rules based on category
    const pointsList = data.options.map((o) => o.points);
    if (data.category === "TWK" || data.category === "TIU") {
      const fivePointsCount = pointsList.filter((p) => p === 5).length;
      const zeroPointsCount = pointsList.filter((p) => p === 0).length;
      if (fivePointsCount !== 1 || zeroPointsCount !== 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options"],
          message: `Untuk kategori ${data.category}, tepat satu opsi harus bernilai 5 dan empat opsi lainnya bernilai 0`,
        });
      }
    } else if (data.category === "TKP") {
      const sortedPoints = [...pointsList].sort((a, b) => a - b);
      const isUnique1To5 =
        sortedPoints.length === 5 &&
        sortedPoints[0] === 1 &&
        sortedPoints[1] === 2 &&
        sortedPoints[2] === 3 &&
        sortedPoints[3] === 4 &&
        sortedPoints[4] === 5;

      if (!isUnique1To5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options"],
          message: "Untuk kategori TKP, kelima opsi harus memiliki poin unik bernilai 1, 2, 3, 4, dan 5",
        });
      }
    }

    // 3. Validate subtopic exists for category
    const validSubtopics = SUBTOPICS.filter((s) => s.category === data.category).map((s) => s.id);
    if (!validSubtopics.includes(data.subtopic)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["subtopic"],
        message: `Sub-materi '${data.subtopic}' tidak valid untuk kategori ${data.category}`,
      });
    }
  });

export type QuestionInput = z.infer<typeof QuestionInputSchema>;

export const QuestionImportJsonSchema = z.object({
  schemaVersion: z.number().default(1),
  questions: z.array(QuestionInputSchema),
});
