import { NextResponse, type NextRequest } from "next/server";

/** Startseite: Wer ausdrücklich Markdown möchte (KI-Agenten, Accept: text/markdown), bekommt die Markdown-Fassung */
export function proxy(req: NextRequest) {
  const accept = (req.headers.get("accept") || "").toLowerCase();
  const md = accept.indexOf("text/markdown");
  const html = accept.indexOf("text/html");
  if (md !== -1 && (html === -1 || md < html)) {
    return NextResponse.rewrite(new URL("/index.md", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
