import { NextResponse, type NextRequest } from "next/server";
import { LLMS_TXT } from "@/lib/llms";

/**
 * Startseite: Wer ausdrücklich Markdown möchte (KI-Agenten, Accept: text/markdown), bekommt die Markdown-Fassung.
 * Antwort ist „private, no-store“, damit kein Zwischenspeicher (LiteSpeed/CDN) sie Browsern unter „/“ ausliefert.
 */
export function proxy(req: NextRequest) {
  const accept = (req.headers.get("accept") || "").toLowerCase();
  const md = accept.indexOf("text/markdown");
  const html = accept.indexOf("text/html");
  if (md === -1 || (html !== -1 && html < md)) return NextResponse.next();

  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "private, no-store",
      "Vary": "Accept",
      "Link": '</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap"',
    },
  });
}

export const config = { matcher: ["/"] };
