import { NextResponse } from "next/server";
import { autosaveAnswer } from "@/lib/exam/lifecycle";
import { z } from "zod";

const AnswerSchema = z.object({
  position: z.number().int().min(1).max(110),
  selectedOptionSnapshotId: z.string().nullable(),
  clientVersion: z.number().int().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { position, selectedOptionSnapshotId, clientVersion } = AnswerSchema.parse(body);

    const result = autosaveAnswer(id, position, selectedOptionSnapshotId, clientVersion);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Gagal menyimpan jawaban." },
      { status: 400 }
    );
  }
}
