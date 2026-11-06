import { NextResponse } from "next/server";
import { db } from "@/db";
import { examProfiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { BASELINE_EXAM_PROFILE } from "@/config/exam-profiles";

export async function GET() {
  try {
    const list = db.select().from(examProfiles).orderBy(desc(examProfiles.isDefault)).all();
    const profiles = list.map((p) => ({
      ...JSON.parse(p.rulesJson),
      id: p.id,
      name: p.name,
      year: p.year,
      examType: p.examType,
      description: p.description,
      referenceStatus: p.referenceStatus,
      durationSeconds: p.durationSeconds,
      isDefault: Boolean(p.isDefault),
    }));

    return NextResponse.json({ success: true, profiles });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profileId = `profile_${Date.now()}`;
    const nowIso = new Date().toISOString();

    db.insert(examProfiles)
      .values({
        id: profileId,
        name: body.name || "Profil Kustom",
        year: body.year || 2026,
        examType: "cpns",
        description: body.description || "Profil latihan kustom",
        referenceStatus: body.referenceStatus || "unverified",
        sourceTitle: body.sourceTitle || "Kustomisasi Pengguna",
        sourceUrl: body.sourceUrl || null,
        durationSeconds: body.durationSeconds || 6000,
        rulesJson: JSON.stringify(body),
        isDefault: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      })
      .run();

    return NextResponse.json({ success: true, id: profileId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const nowIso = new Date().toISOString();

    db.update(examProfiles)
      .set({
        name: body.name,
        year: body.year,
        description: body.description,
        durationSeconds: body.durationSeconds,
        rulesJson: JSON.stringify(body),
        updatedAt: nowIso,
      })
      .where(eq(examProfiles.id, body.id))
      .run();

    return NextResponse.json({ success: true, message: "Profil berhasil diperbarui." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
