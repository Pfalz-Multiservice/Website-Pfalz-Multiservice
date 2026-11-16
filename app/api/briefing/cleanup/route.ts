import { NextResponse } from "next/server";
import { FILE_TTL_DAYS } from "@/lib/briefing-server";
import { listFiles, pruneEmpty, remove } from "@/lib/briefing-store";

export const runtime = "nodejs";

/**
 * Täglicher Aufräum-Job (Cron auf Hostinger, 03:47 Uhr, mit Bearer CRON_SECRET):
 * löscht Briefing-Dateien nach 30 Tagen und nie abgeschickte Uploads nach 2 Tagen.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Nicht erlaubt" }, { status: 401 });

  const now = Date.now();
  const all = await listFiles("briefing");
  const submitted = new Set(all.filter((b) => b.pathname.endsWith("/_abgeschickt.json")).map((b) => b.pathname.split("/")[1]));
  const old = all.filter((b) => {
    const age = (now - b.uploadedAt.getTime()) / 86400000;
    const id = b.pathname.split("/")[1];
    return age > FILE_TTL_DAYS || (!submitted.has(id) && age > 2);
  });
  for (const b of old) await remove(b.pathname).catch(() => {});
  await pruneEmpty("briefing");
  return NextResponse.json({ deleted: old.length, kept: all.length - old.length });
}
