import { NextResponse } from "next/server";
import { getBatchById, updateBatch, deleteBatch } from "@/lib/batches";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const batch = getBatchById(id);
    if (!batch) {
      return NextResponse.json({ success: false, error: "Batch tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true, batch });
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
    const batch = updateBatch(id, body);
    return NextResponse.json({ success: true, batch });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = deleteBatch(id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
