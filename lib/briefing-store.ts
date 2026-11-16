import { createReadStream } from "node:fs";
import { mkdir, open, readdir, rename, rm, rmdir, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";

/**
 * Dateispeicher für Briefing-Uploads auf dem eigenen Server (Hostinger, Frankfurt).
 * Liegt bewusst außerhalb des App-Ordners, damit ein neues Deployment die Dateien nicht löscht.
 * Struktur: <ROOT>/briefing/<id>/<feld>/<dateiname>
 */
const ROOT = path.resolve(
  process.env.BRIEFING_DIR || (process.env.VERCEL ? "/tmp/briefing-uploads" : path.join(os.homedir(), "briefing-uploads")),
);

/** Relativen Speicherpfad in einen absoluten umwandeln, ohne aus ROOT herauszukommen */
function abs(rel: string) {
  const p = path.resolve(ROOT, rel);
  if (!p.startsWith(ROOT + path.sep)) throw new Error("Pfad ungültig");
  return p;
}
const relOf = (p: string) => path.relative(ROOT, p).split(path.sep).join("/");

export type Stored = { pathname: string; size: number; uploadedAt: Date };

async function walk(dir: string, out: Stored[]) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.isFile()) {
      const st = await stat(p).catch(() => null);
      if (st) out.push({ pathname: relOf(p), size: st.size, uploadedAt: st.mtime });
    }
  }
}

/** Alle Dateien unterhalb eines Ordners (z. B. "briefing" oder "briefing/<id>") */
export async function listFiles(prefix: string) {
  const out: Stored[] = [];
  await walk(abs(prefix), out);
  return out;
}

/** Datei aus dem Request-Body speichern; bricht ab, sobald mehr als max Bytes ankommen */
export async function saveStream(rel: string, body: ReadableStream<Uint8Array> | null, max: number) {
  if (!body) throw new Error("leer");
  const file = abs(rel);
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = file + ".part";
  const fh = await open(tmp, "wx");
  let open_ = true, n = 0;
  try {
    const reader = body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      n += value.length;
      if (n > max) { await reader.cancel().catch(() => {}); throw new Error("zu groß"); }
      await fh.write(value);
    }
    await fh.close(); open_ = false;
    if (n === 0) throw new Error("leer");
    await rename(tmp, file);
    return n;
  } catch (err) {
    if (open_) await fh.close().catch(() => {});
    await rm(tmp, { force: true });
    throw err;
  }
}

/** Die ersten Bytes einer Datei (für die Inhaltsprüfung) */
export async function readHead(rel: string, bytes: number) {
  const fh = await open(abs(rel), "r").catch(() => null);
  if (!fh) return null;
  try {
    const buf = Buffer.alloc(bytes);
    const { bytesRead } = await fh.read(buf, 0, bytes, 0);
    return buf.subarray(0, bytesRead);
  } finally {
    await fh.close().catch(() => {});
  }
}

/** Datei als Stream für den Download, null wenn sie nicht (mehr) existiert */
export async function fileStream(rel: string) {
  const p = abs(rel);
  const st = await stat(p).catch(() => null);
  if (!st?.isFile()) return null;
  return { stream: Readable.toWeb(createReadStream(p)) as ReadableStream<Uint8Array>, size: st.size };
}

export async function putText(rel: string, text: string) {
  const p = abs(rel);
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, text);
}

export async function remove(rel: string) {
  await rm(abs(rel), { force: true });
}

/** Leere Ordner unterhalb von prefix entfernen (nach dem Aufräumen) */
export async function pruneEmpty(prefix: string) {
  const dir = abs(prefix);
  const visit = async (d: string): Promise<void> => {
    let entries;
    try { entries = await readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) if (e.isDirectory()) await visit(path.join(d, e.name));
    if (d !== dir) await rmdir(d).catch(() => {}); // klappt nur, wenn der Ordner leer ist
  };
  await visit(dir);
}
