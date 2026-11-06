import { NextResponse } from "next/server";
import { toggleFlag } from "@/lib/exam/lifecycle";
import { z } from "zod";

const FlagSchema = z.object({
  position: z.number().int().min(1).max(110),
  flagged: z.boolean(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { position, flagged } = FlagSchema.parse(body);

    const result = toggleFlag(id, position, flagged);
    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
