import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { UPLOAD_MAX_FILES, UPLOAD_MAX_MB } from "@/lib/briefing";
import { filesOf, ipOf, limited, parsePath, safeName, sameOrigin } from "@/lib/briefing-server";
import { saveStream } from "@/lib/briefing-store";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Nimmt eine einzelne Briefing-Datei entgegen und speichert sie auf unserem Server (Hostinger, Frankfurt).
 * Erlaubt nur: richtigen Ordner, bekanntes Feld, erlaubte Endung, max. 25 MB, max. 20 Dateien je Briefing.
 * Der Dateiname bekommt einen Zufallsteil, damit die Adresse nicht erratbar ist.
 * Den Inhalt prüft das Absenden des Briefings (Dateityp passt zur Endung).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Nicht erlaubt" }, { status: 403 });
  if (limited("up:" + ipOf(req), 40, 60 * 60 * 1000)) return NextResponse.json({ error: "Zu viele Uploads. Bitte später erneut versuchen." }, { status: 429 });

  const p = parsePath(new URL(req.url).searchParams.get("p") || "");
  if (!p) return NextResponse.json({ error: "Dateiname oder Format nicht erlaubt." }, { status: 400 });

  const max = UPLOAD_MAX_MB * 1024 * 1024;
  if (Number(req.headers.get("content-length") || 0) > max) return NextResponse.json({ error: `Höchstens ${UPLOAD_MAX_MB} MB je Datei.` }, { status: 413 });

  const existing = await filesOf(p.id);
  if (existing.length >= UPLOAD_MAX_FILES) return NextResponse.json({ error: `Höchstens ${UPLOAD_MAX_FILES} Dateien je Briefing.` }, { status: 400 });

  const { base, ext } = safeName(p.file);
  const pathname = `briefing/${p.id}/${p.field}/${base}-${randomBytes(6).toString("hex")}.${ext}`;
  try {
    await saveStream(pathname, req.body, max);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "zu groß") return NextResponse.json({ error: `Höchstens ${UPLOAD_MAX_MB} MB je Datei.` }, { status: 413 });
    if (msg === "leer") return NextResponse.json({ error: "Die Datei ist leer." }, { status: 400 });
    console.error("[briefing] Upload fehlgeschlagen:", msg);
    return NextResponse.json({ error: "Upload fehlgeschlagen" }, { status: 500 });
  }
  return NextResponse.json({ pathname });
}
