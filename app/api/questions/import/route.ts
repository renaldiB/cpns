import { NextResponse } from "next/server";
import { db, sqliteDb } from "@/db";
import { questions, options } from "@/db/schema";
import { sql } from "drizzle-orm";
import { QuestionInputSchema, QuestionInput } from "@/lib/questions/validation";
import { checkDuplicate } from "@/lib/questions/dedup";
import { parseCsv } from "@/lib/questions/csv";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let rawText = "";
    let mode: "preview" | "commit" = "preview";
    let isAtomic = true;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      rawText = typeof body.content === "string" ? body.content : JSON.stringify(body.content);
      mode = body.mode === "commit" ? "commit" : "preview";
      isAtomic = body.isAtomic !== false;
    } else {
      rawText = await req.text();
    }

    if (!rawText.trim()) {
      return NextResponse.json({ success: false, error: "Konten import kosong." }, { status: 400 });
    }

    // Determine format: JSON or CSV
    let candidateList: any[] = [];
    if (rawText.trim().startsWith("{") || rawText.trim().startsWith("[")) {
      try {
        const parsedJson = JSON.parse(rawText);
        candidateList = Array.isArray(parsedJson)
          ? parsedJson
          : parsedJson.questions || [];
      } catch (err: any) {
        return NextResponse.json({ success: false, error: "Format JSON tidak valid." }, { status: 400 });
      }
    } else {
      // Parse CSV
      const rows = parseCsv(rawText);
      if (rows.length < 2) {
        return NextResponse.json({ success: false, error: "CSV tidak memiliki baris data." }, { status: 400 });
      }

      const headers = rows[0].map((h) => h.trim().toLowerCase());
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const rowObj: any = {};
        for (let c = 0; c < headers.length; c++) {
          rowObj[headers[c]] = row[c] || "";
        }

        candidateList.push({
          externalId: rowObj["external_id"] || null,
          category: rowObj["category"],
          subtopic: rowObj["subtopic"],
          stem: rowObj["stem"],
          imagePath: rowObj["image_path"] || null,
          options: [
            { label: "A", text: rowObj["option_a_text"], points: parseInt(rowObj["option_a_points"] || "0") },
            { label: "B", text: rowObj["option_b_text"], points: parseInt(rowObj["option_b_points"] || "0") },
            { label: "C", text: rowObj["option_c_text"], points: parseInt(rowObj["option_c_points"] || "0") },
            { label: "D", text: rowObj["option_d_text"], points: parseInt(rowObj["option_d_points"] || "0") },
            { label: "E", text: rowObj["option_e_text"], points: parseInt(rowObj["option_e_points"] || "0") },
          ],
          explanation: rowObj["explanation"],
          difficulty: parseInt(rowObj["difficulty"] || "2"),
          sourceNote: rowObj["source_note"] || "original",
          sourceReference: rowObj["source_reference"] || null,
          reviewStatus: rowObj["review_status"] || "needs_review",
          reviewNote: rowObj["review_note"] || null,
        });
      }
    }

    // Existing questions for duplicate check
    const existingActive = db
      .select({ id: questions.id, stem: questions.stem })
      .from(questions)
      .where(sql`${questions.deletedAt} IS NULL`)
      .all();

    const validItems: QuestionInput[] = [];
    const invalidItems: Array<{ index: number; errors: string[] }> = [];
    const duplicateItems: Array<{ index: number; stem: string; matchedId?: string; similarityScore: number }> = [];

    for (let i = 0; i < candidateList.length; i++) {
      const item = candidateList[i];
      const parsed = QuestionInputSchema.safeParse(item);

      if (!parsed.success) {
        invalidItems.push({
          index: i + 1,
          errors: parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
        });
        continue;
      }

      // Check duplicates against existing database
      const dup = checkDuplicate(parsed.data.stem, existingActive);
      if (dup.isExactDuplicate || dup.similarityScore >= 0.9) {
        duplicateItems.push({
          index: i + 1,
          stem: parsed.data.stem,
          matchedId: dup.matchedId,
          similarityScore: dup.similarityScore,
        });
        continue;
      }

      validItems.push(parsed.data);
    }

    if (mode === "preview") {
      return NextResponse.json({
        success: true,
        preview: {
          total: candidateList.length,
          validCount: validItems.length,
          invalidCount: invalidItems.length,
          duplicateCount: duplicateItems.length,
          invalidItems,
          duplicateItems,
        },
      });
    }

    // Commit mode
    if (isAtomic && (invalidItems.length > 0 || duplicateItems.length > 0)) {
      return NextResponse.json(
        {
          success: false,
          error: "Import mode atomik dibatalkan karena terdapat baris invalid atau duplikat.",
          details: { invalidItems, duplicateItems },
        },
        { status: 400 }
      );
    }

    const nowIso = new Date().toISOString();
    let inserted = 0;

    const commitTx = sqliteDb.transaction(() => {
      for (const q of validItems) {
        const qId = `q_${q.externalId || Math.random().toString(36).substring(2, 9)}`;
        db.insert(questions)
          .values({
            id: qId,
            externalId: q.externalId || null,
            category: q.category,
            subtopic: q.subtopic,
            stem: q.stem,
            imagePath: q.imagePath || null,
            explanation: q.explanation,
            difficulty: q.difficulty,
            sourceNote: q.sourceNote,
            sourceReference: q.sourceReference || null,
            reviewStatus: q.reviewStatus,
            reviewNote: q.reviewNote || null,
            createdAt: nowIso,
            updatedAt: nowIso,
          })
          .run();

        for (const opt of q.options) {
          db.insert(options)
            .values({
              id: `opt_${qId}_${opt.label}`,
              questionId: qId,
              label: opt.label,
              text: opt.text,
              points: opt.points,
              createdAt: nowIso,
              updatedAt: nowIso,
            })
            .run();
        }
        inserted++;
      }
    });

    commitTx();

    return NextResponse.json({
      success: true,
      message: `Berhasil mengimpor ${inserted} soal baru.`,
      inserted,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
