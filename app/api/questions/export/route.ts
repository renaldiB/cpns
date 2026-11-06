import { NextResponse } from "next/server";
import { db } from "@/db";
import { questions, options } from "@/db/schema";
import { sql } from "drizzle-orm";
import { exportQuestionsToCsv } from "@/lib/questions/csv";
import { QuestionInput } from "@/lib/questions/validation";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const format = url.searchParams.get("format") || "json";
    const batch = url.searchParams.get("batch");

    const conditions = [sql`${questions.deletedAt} IS NULL`];
    if (batch) {
      conditions.push(sql`${questions.batchNumber} = ${parseInt(batch)}`);
    }

    const allQ = db
      .select()
      .from(questions)
      .where(sql.join(conditions, sql` AND `))
      .all();

    const allOpt = db.select().from(options).all();
    const optMap = new Map<string, typeof allOpt>();
    for (const opt of allOpt) {
      const list = optMap.get(opt.questionId) || [];
      list.push(opt);
      optMap.set(opt.questionId, list);
    }

    const payload: QuestionInput[] = allQ.map((q) => {
      const opts = (optMap.get(q.id) || []).sort((a, b) => a.label.localeCompare(b.label));
      return {
        id: q.id,
        externalId: q.externalId || null,
        batchNumber: q.batchNumber,
        batchId: q.batchId || undefined,
        category: q.category as any,
        subtopic: q.subtopic,
        stem: q.stem,
        imagePath: q.imagePath || null,
        explanation: q.explanation,
        difficulty: q.difficulty as any,
        sourceNote: q.sourceNote,
        sourceReference: q.sourceReference || null,
        reviewStatus: q.reviewStatus as any,
        reviewNote: q.reviewNote || null,
        options: opts.map((o) => ({
          label: o.label as any,
          text: o.text,
          points: o.points,
        })),
      };
    });

    const timestamp = new Date().toISOString().split("T")[0];

    if (format.toLowerCase() === "csv") {
      const csvContent = exportQuestionsToCsv(payload);
      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="bank_soal_cpns_${timestamp}.csv"`,
        },
      });
    }

    return new NextResponse(JSON.stringify({ schemaVersion: 1, questions: payload }, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="bank_soal_cpns_${timestamp}.json"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
