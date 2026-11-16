import { parsePath, verify } from "@/lib/briefing-server";
import { fileStream } from "@/lib/briefing-store";

export const runtime = "nodejs";

/** Übergang: Briefings von vor dem Umzug liegen noch im alten Speicher (bis spätestens Mitte Dezember 2026, danach entfernen) */
async function legacy(p: string): Promise<ReadableStream<Uint8Array> | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { get } = await import("@vercel/blob");
    const r = (await get(p, { access: "private" }).catch(() => null)) || (await get(p, { access: "public" }).catch(() => null));
    return r?.stream ?? null;
  } catch {
    return null;
  }
}

/**
 * Download-Link aus der Briefing-E-Mail. Nur mit gültiger Signatur, immer als Download
 * (nie im Browser geöffnet), damit keine Datei auf dieser Website Code ausführen kann.
 */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const p = u.searchParams.get("p") || "";
  const s = u.searchParams.get("s") || "";
  const info = parsePath(p);
  if (!info || !verify(p, s)) return new Response("Link ungültig.", { status: 403 });
  const stream = (await fileStream(p))?.stream ?? (await legacy(p));
  if (!stream) return new Response("Datei nicht mehr vorhanden (Dateien werden nach 30 Tagen gelöscht).", { status: 404 });
  const name = p.split("/").pop() || "datei";
  return new Response(stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name.replace(/"/g, "")}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
