import { NextResponse } from "next/server";
import { db } from "@/db";
import { questions, options } from "@/db/schema";
import { eq, sql, desc, and, like } from "drizzle-orm";
import { QuestionInputSchema } from "@/lib/questions/validation";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category");
    const subtopic = url.searchParams.get("subtopic");
    const difficulty = url.searchParams.get("difficulty");
    const reviewStatus = url.searchParams.get("reviewStatus");
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
    const limit = Math.max(1, Math.min(100, parseInt(url.searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const conditions = [sql`${questions.deletedAt} IS NULL`];

    if (search.trim()) {
      conditions.push(like(questions.stem, `%${search.trim()}%`));
    }
    if (category && ["TWK", "TIU", "TKP"].includes(category)) {
      conditions.push(eq(questions.category, category));
    }
    if (subtopic) {
      conditions.push(eq(questions.subtopic, subtopic));
    }
    if (difficulty) {
      conditions.push(eq(questions.difficulty, parseInt(difficulty)));
    }
    if (reviewStatus) {
      conditions.push(eq(questions.reviewStatus, reviewStatus));
    }

    const whereClause = and(...conditions);

    const totalCountRes = db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(whereClause)
      .get();
    const total = totalCountRes?.count || 0;

    const items = db
      .select()
      .from(questions)
      .where(whereClause)
      .orderBy(desc(questions.createdAt))
      .limit(limit)
      .offset(offset)
      .all();

    // Fetch options for these items
    const questionIds = items.map((q) => q.id);
    let allOptions: any[] = [];
    if (questionIds.length > 0) {
      allOptions = db.select().from(options).all();
    }

    const optMap = new Map<string, any[]>();
    for (const opt of allOptions) {
      const list = optMap.get(opt.questionId) || [];
      list.push(opt);
      optMap.set(opt.questionId, list);
    }

    const result = items.map((q) => ({
      ...q,
      options: (optMap.get(q.id) || []).sort((a, b) => a.label.localeCompare(b.label)),
    }));

    return NextResponse.json({
      success: true,
      items: result,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = QuestionInputSchema.parse(body);

    const qId = `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    db.insert(questions)
      .values({
        id: qId,
        externalId: validated.externalId || null,
        category: validated.category,
        subtopic: validated.subtopic,
        stem: validated.stem,
        imagePath: validated.imagePath || null,
        explanation: validated.explanation,
        difficulty: validated.difficulty,
        sourceNote: validated.sourceNote,
        sourceReference: validated.sourceReference || null,
        reviewStatus: validated.reviewStatus,
        reviewNote: validated.reviewNote || null,
        createdAt: nowIso,
        updatedAt: nowIso,
      })
      .run();

    for (const opt of validated.options) {
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

    return NextResponse.json({ success: true, id: qId }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors ? err.errors[0]?.message : err.message },
      { status: 400 }
    );
  }
}
