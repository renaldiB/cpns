import { NextResponse } from "next/server";
import { db, sqliteDb } from "@/db";
import { attempts } from "@/db/schema";
import { desc, eq, and, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode");
    const status = url.searchParams.get("status");
    const format = url.searchParams.get("format"); // "csv" or "json"

    const conditions = [];
    if (mode && (mode === "full" || mode === "practice")) {
      conditions.push(eq(attempts.mode, mode));
    }
    if (status) {
      conditions.push(eq(attempts.status, status));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const list = db
      .select()
      .from(attempts)
      .where(whereClause)
      .orderBy(desc(attempts.startedAt))
      .all();

    const formatted = list.map((att) => ({
      id: att.id,
      mode: att.mode,
      examProfileId: att.examProfileId,
      startedAt: att.startedAt,
      finishedAt: att.finishedAt,
      status: att.status,
      questionCount: att.questionCountSnapshot,
      scoreTwk: att.scoreTwk,
      scoreTiu: att.scoreTiu,
      scoreTkp: att.scoreTkp,
      scoreTotal: att.scoreTotal,
      isPassed: att.isPassed,
      categoryFilter: att.categoryFilter,
    }));

    if (format === "csv") {
      const headers = [
        "attempt_id",
        "mode",
        "category_filter",
        "started_at",
        "finished_at",
        "status",
        "question_count",
        "score_twk",
        "score_tiu",
        "score_tkp",
        "score_total",
        "is_passed",
      ];
      const rows = [headers.join(",")];
      for (const a of formatted) {
        rows.push([
          `"${a.id}"`,
          `"${a.mode}"`,
          `"${a.categoryFilter || ""}"`,
          `"${a.startedAt}"`,
          `"${a.finishedAt || ""}"`,
          `"${a.status}"`,
          a.questionCount,
          a.scoreTwk ?? "",
          a.scoreTiu ?? "",
          a.scoreTkp ?? "",
          a.scoreTotal ?? "",
          a.isPassed !== null ? (a.isPassed ? "LULUS" : "TIDAK LULUS") : "",
        ].join(","));
      }

      return new NextResponse(rows.join("\r\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="riwayat_ujian_${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, attempts: formatted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    sqliteDb.exec(`
      DELETE FROM attempt_questions;
      DELETE FROM attempts;
    `);
    return NextResponse.json({
      success: true,
      message: "Seluruh riwayat sesi ujian dan data progres berhasil dikosongkan.",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
