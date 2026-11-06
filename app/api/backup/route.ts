import { NextResponse } from "next/server";
import { createSafeBackup, listBackups } from "@/lib/backup";

export async function GET() {
  try {
    const backups = listBackups();
    return NextResponse.json({ success: true, backups });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const record = await createSafeBackup("manual");
    return NextResponse.json({ success: true, backup: record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
