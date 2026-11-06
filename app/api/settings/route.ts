import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = db.select().from(settings).all();
    const map: Record<string, any> = {};
    for (const s of all) {
      map[s.key] = JSON.parse(s.valueJson);
    }
    return NextResponse.json({ success: true, settings: map });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // e.g. { theme: "dark" }
    const nowIso = new Date().toISOString();

    for (const [key, val] of Object.entries(body)) {
      const existing = db.select().from(settings).where(eq(settings.key, key)).get();
      if (existing) {
        db.update(settings)
          .set({ valueJson: JSON.stringify(val), updatedAt: nowIso })
          .where(eq(settings.key, key))
          .run();
      } else {
        db.insert(settings)
          .values({ key, valueJson: JSON.stringify(val), updatedAt: nowIso })
          .run();
      }
    }

    return NextResponse.json({ success: true, message: "Pengaturan berhasil disimpan." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
