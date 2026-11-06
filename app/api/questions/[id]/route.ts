import { NextResponse } from "next/server";
import { db, sqliteDb } from "@/db";
import { questions, options } from "@/db/schema";
import { eq } from "drizzle-orm";
import { QuestionInputSchema } from "@/lib/questions/validation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const q = db.select().from(questions).where(eq(questions.id, id)).get();
    if (!q) {
      return NextResponse.json({ success: false, error: "Soal tidak ditemukan" }, { status: 404 });
    }

    const opts = db.select().from(options).where(eq(options.questionId, id)).all();
    return NextResponse.json({
      success: true,
      question: {
        ...q,
        options: opts.sort((a, b) => a.label.localeCompare(b.label)),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = QuestionInputSchema.parse(body);

    const nowIso = new Date().toISOString();

    const tx = sqliteDb.transaction(() => {
      db.update(questions)
        .set({
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
          updatedAt: nowIso,
        })
        .where(eq(questions.id, id))
        .run();

      // Replace options
      db.delete(options).where(eq(options.questionId, id)).run();

      for (const opt of validated.options) {
        db.insert(options)
          .values({
            id: `opt_${id}_${opt.label}`,
            questionId: id,
            label: opt.label,
            text: opt.text,
            points: opt.points,
            createdAt: nowIso,
            updatedAt: nowIso,
          })
          .run();
      }
    });

    tx();
    return NextResponse.json({ success: true, message: "Soal berhasil diperbarui" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.errors ? err.errors[0]?.message : err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const nowIso = new Date().toISOString();

    // Soft delete to protect history
    db.update(questions)
      .set({
        deletedAt: nowIso,
        updatedAt: nowIso,
      })
      .where(eq(questions.id, id))
      .run();

    return NextResponse.json({ success: true, message: "Soal berhasil diarsipkan (soft delete)" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
