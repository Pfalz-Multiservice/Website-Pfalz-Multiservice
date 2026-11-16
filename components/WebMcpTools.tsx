"use client";
import { useEffect } from "react";
import { contactText, pricesText, servicesText } from "@/lib/agent";

type Tool = {
  name: string; description: string; inputSchema: object;
  annotations?: { readOnlyHint?: boolean };
  execute: () => Promise<{ content: { type: "text"; text: string }[] }>;
};
type ModelContext = { registerTool: (tool: Tool, opts?: { signal?: AbortSignal }) => unknown };

const text = (t: string) => async () => ({ content: [{ type: "text" as const, text: t }] });

/** WebMCP: meldet beim Laden schreibgeschützte Werkzeuge für Browser-Agenten an (Leistungen, Preise, Kontakt) */
export function WebMcpTools() {
  useEffect(() => {
    const ctx = ((navigator as unknown as { modelContext?: ModelContext }).modelContext
      ?? (document as unknown as { modelContext?: ModelContext }).modelContext);
    if (!ctx?.registerTool) return;
    const ac = new AbortController();
    const empty = { type: "object", properties: {} };
    const tools: Tool[] = [
      { name: "leistungen", description: "Alle Leistungen von Pfalz Multiservice (Worms) mit Kurzbeschreibung und Link.", inputSchema: empty, annotations: { readOnlyHint: true }, execute: text(servicesText()) },
      { name: "preise", description: "Aktuelle Preise in Euro: Website-Pakete, Website-Betreuung, Einzelleistungen.", inputSchema: empty, annotations: { readOnlyHint: true }, execute: text(pricesText()) },
      { name: "kontakt", description: "Kontaktdaten (Telefon, WhatsApp, E-Mail), Reaktionszeit und Link zum Kontaktformular.", inputSchema: empty, annotations: { readOnlyHint: true }, execute: text(contactText()) },
    ];
    for (const t of tools) { try { ctx.registerTool(t, { signal: ac.signal }); } catch { /* bereits angemeldet oder nicht unterstützt */ } }
    return () => ac.abort();
  }, []);
  return null;
}
