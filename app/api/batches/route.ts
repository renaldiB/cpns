import { NextResponse } from "next/server";
import { getAllBatches, createBatch } from "@/lib/batches";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const batches = getAllBatches();
    return NextResponse.json({ success: true, batches });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama batch wajib diisi." },
        { status: 400 }
      );
    }

    const batch = createBatch({
      name: body.name,
      batchNumber: body.batchNumber ? Number(body.batchNumber) : undefined,
      description: body.description,
      targetYear: body.targetYear ? Number(body.targetYear) : undefined,
    });

    return NextResponse.json({ success: true, batch });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
