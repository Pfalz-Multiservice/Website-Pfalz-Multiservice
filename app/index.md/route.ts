import { LLMS_TXT } from "@/lib/llms";

/** Markdown-Fassung der Startseite für KI-Agenten (gleicher Inhalt wie /llms.txt) */
export const dynamic = "force-static";

export function GET() {
  return new Response(LLMS_TXT, { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
