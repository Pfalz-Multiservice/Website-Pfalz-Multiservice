/**
 * Öffentlicher, schreibgeschützter MCP-Server (Streamable HTTP, zustandslos, JSON-Antworten).
 * Werkzeuge liefern nur öffentliche Angaben der Website: Leistungen, Preise, Kontakt. Nichts wird gespeichert oder versendet.
 */
import { contactText, pricesText, servicesText, PRICES, SERVICE_LIST, CONTACT_INFO } from "@/lib/agent";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const PROTOCOL = "2025-06-18";
const SUPPORTED = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER_INFO = { name: "pfalz-multiservice", title: "Pfalz Multiservice", version: "1.0.0" };

const TOOLS = [
  { name: "leistungen", title: "Leistungen", description: "Listet alle Leistungen von Pfalz Multiservice (Worms) mit Kurzbeschreibung und Link.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true, openWorldHint: false } },
  { name: "preise", title: "Preise", description: "Aktuelle Preise: Website-Pakete, Website-Betreuung, Einzelleistungen. Alle Preise in Euro.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true, openWorldHint: false } },
  { name: "kontakt", title: "Kontakt", description: "Kontaktdaten (Telefon, WhatsApp, E-Mail), Reaktionszeit und Link zum Kontaktformular.", inputSchema: { type: "object", properties: {} }, annotations: { readOnlyHint: true, openWorldHint: false } },
];

const results: Record<string, () => { text: string; data: unknown }> = {
  leistungen: () => ({ text: servicesText(), data: { leistungen: SERVICE_LIST } }),
  preise: () => ({ text: pricesText(), data: { waehrung: "EUR", preise: PRICES } }),
  kontakt: () => ({ text: contactText(), data: CONTACT_INFO }),
};

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version" };

type Rpc = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

function handle(msg: Rpc) {
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id: msg.id ?? null, result });
  const err = (code: number, message: string) => ({ jsonrpc: "2.0", id: msg.id ?? null, error: { code, message } });
  switch (msg.method) {
    case "initialize": {
      const asked = String(msg.params?.protocolVersion ?? PROTOCOL);
      return ok({
        protocolVersion: SUPPORTED.includes(asked) ? asked : PROTOCOL,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: `Öffentliche Auskünfte über Pfalz Multiservice (${SITE}). Nur lesen; Anfragen bitte über ${SITE}/kontakt.`,
      });
    }
    case "ping": return ok({});
    case "tools/list": return ok({ tools: TOOLS });
    case "tools/call": {
      const name = String(msg.params?.name ?? "");
      const fn = results[name];
      if (!fn) return err(-32602, `Unbekanntes Werkzeug: ${name}`);
      const r = fn();
      return ok({ content: [{ type: "text", text: r.text }], structuredContent: r.data, isError: false });
    }
    default:
      return msg.id === undefined ? null : err(-32601, `Methode nicht unterstützt: ${msg.method}`);
  }
}

export async function POST(req: Request) {
  let body: Rpc | Rpc[];
  try { body = await req.json(); } catch { return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400, headers: CORS }); }
  const list = Array.isArray(body) ? body : [body];
  const out = list.map(handle).filter((x) => x !== null);
  if (out.length === 0) return new Response(null, { status: 202, headers: CORS });
  return Response.json(Array.isArray(body) ? out : out[0], { headers: { ...CORS, "Cache-Control": "no-store" } });
}

export function GET() {
  // Kein Server-Sent-Events-Stream: zustandsloser Server
  return new Response("Method Not Allowed", { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
