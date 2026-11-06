import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { restoreFromBackup } from "@/lib/backup";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename } = body;

    if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json({ success: false, error: "Nama file tidak valid." }, { status: 400 });
    }

    const backupFilePath = path.join(process.cwd(), "data", "backups", filename);
    if (!fs.existsSync(backupFilePath)) {
      return NextResponse.json({ success: false, error: "File backup tidak ditemukan." }, { status: 404 });
    }

    const res = await restoreFromBackup(backupFilePath);
    return NextResponse.json({
      success: true,
      message: "Database berhasil dipulihkan.",
      preBackupId: res.preBackupId,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
