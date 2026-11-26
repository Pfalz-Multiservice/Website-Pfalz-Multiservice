import { SITE } from "@/lib/site";

/** KI-Suchdienste werden ausdrücklich zugelassen (ChatGPT, Claude, Perplexity, Gemini, Copilot u. a.) */
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot",
];

// Als Route statt robots.ts, weil Next.js keine Content-Signal-Zeile kennt (contentsignals.org)
const body = [
  "# Inhalte dürfen für Suche, KI-Antworten und KI-Training genutzt werden",
  "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
  "",
  "User-Agent: *",
  "Allow: /",
  "Disallow: /api/",
  "",
  ...AI_BOTS.map((b) => `User-Agent: ${b}`),
  "Allow: /",
  "Disallow: /api/",
  "",
  `Sitemap: ${SITE}/sitemap.xml`,
  "",
].join("\n");

export const dynamic = "force-static";

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
