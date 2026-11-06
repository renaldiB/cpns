import { NextResponse } from "next/server";
import { getSubtopicAnalytics, getScoreTrend } from "@/lib/analytics";
import { db } from "@/db";
import { attempts, questions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") as "full" | "practice" | undefined;

    const subtopicStats = getSubtopicAnalytics(mode || undefined);
    const scoreTrends = getScoreTrend(30);

    // Summary counts
    const totalAttempts = db
      .select({ count: sql<number>`count(*)` })
      .from(attempts)
      .where(eq(attempts.status, "finished"))
      .get()?.count || 0;

    const fullPassedCount = db
      .select({ count: sql<number>`count(*)` })
      .from(attempts)
      .where(sql`${attempts.status} = 'finished' AND ${attempts.mode} = 'full' AND ${attempts.isPassed} = 1`)
      .get()?.count || 0;

    const totalBankQuestions = db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(sql`${questions.deletedAt} IS NULL`)
      .get()?.count || 0;

    return NextResponse.json({
      success: true,
      summary: {
        totalFinishedAttempts: totalAttempts,
        fullPassedCount,
        totalBankQuestions,
      },
      subtopicStats,
      scoreTrends,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
