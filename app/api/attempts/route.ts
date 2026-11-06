import { NextResponse } from "next/server";
import { startNewAttempt } from "@/lib/exam/lifecycle";
import { db } from "@/db";
import { attempts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const StartAttemptRequestSchema = z.object({
  mode: z.enum(["full", "practice"]),
  examProfileId: z.string().optional(),
  categoryFilter: z.enum(["TWK", "TIU", "TKP"]).optional(),
  subtopicsFilter: z.array(z.string()).optional(),
  difficulty: z.number().int().min(1).max(3).optional(),
  questionCount: z.number().int().min(5).max(110).optional(),
  enableTimer: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = StartAttemptRequestSchema.parse(body);

    const result = startNewAttempt(parsed);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Gagal membuat sesi ujian baru." },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    // Check for active in_progress attempt
    const active = db
      .select({
        id: attempts.id,
        mode: attempts.mode,
        startedAt: attempts.startedAt,
        deadlineAt: attempts.deadlineAt,
        questionCount: attempts.questionCountSnapshot,
        status: attempts.status,
      })
      .from(attempts)
      .where(eq(attempts.status, "in_progress"))
      .orderBy(desc(attempts.startedAt))
      .get();

    return NextResponse.json({ success: true, activeAttempt: active || null });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
