import { NextResponse } from "next/server";
import { getAttemptDetail } from "@/lib/exam/lifecycle";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const detail = getAttemptDetail(id);

    if (!detail) {
      return NextResponse.json(
        { success: false, error: "Sesi attempt tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ...detail });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
