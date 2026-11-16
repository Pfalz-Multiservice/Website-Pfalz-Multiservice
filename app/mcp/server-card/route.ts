/** MCP Server Card (SEP-1649 / SEP-2127): auch unter /.well-known/mcp/server-card.json erreichbar */
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const card = {
  $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  version: "1.0",
  protocolVersion: "2025-06-18",
  supportedProtocolVersions: ["2025-06-18", "2025-03-26", "2024-11-05"],
  name: "pfalz-multiservice",
  title: "Pfalz Multiservice",
  description: "Öffentliche, schreibgeschützte Auskünfte über Pfalz Multiservice aus Worms: Leistungen, Preise und Kontakt.",
  websiteUrl: SITE,
  documentationUrl: `${SITE}/llms.txt`,
  iconUrl: `${SITE}/icon.png`,
  serverInfo: { name: "pfalz-multiservice", title: "Pfalz Multiservice", version: "1.0.0" },
  transport: { type: "streamable-http", endpoint: `${SITE}/mcp` },
  remotes: [{ type: "streamable-http", url: `${SITE}/mcp` }],
  capabilities: { tools: { listChanged: false } },
  authentication: { required: false },
  tools: [
    { name: "leistungen", description: "Alle Leistungen mit Kurzbeschreibung und Link" },
    { name: "preise", description: "Aktuelle Preise in Euro" },
    { name: "kontakt", description: "Kontaktdaten und Reaktionszeit" },
  ],
  resources: [],
  prompts: [],
};

export function GET() {
  return Response.json(card, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } });
}
