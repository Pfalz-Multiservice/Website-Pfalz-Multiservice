import { readFile } from "node:fs/promises";
import path from "node:path";

/** Markdown-Fassung der Startseite für KI-Agenten: Inhalt von /llms.txt als text/markdown (wird beim Build erzeugt) */
export const dynamic = "force-static";

export async function GET() {
  const text = await readFile(path.join(process.cwd(), "public", "llms.txt"), "utf-8");
  return new Response(text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Vary": "Accept", "X-Robots-Tag": "noindex" },
  });
}
