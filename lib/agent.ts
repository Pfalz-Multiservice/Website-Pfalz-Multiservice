/** Gemeinsame, maschinenlesbare Fakten für /preise, den MCP-Server (/mcp) und die WebMCP-Werkzeuge */
import { SITE } from "./site";
import { CONTACT, COMPANY, SERVICES, WEB_CARE, WEB_PACKAGES, serviceHref } from "./data";

/** "199 €" / "59 €" → 199 / 59; "individuell" → null */
export const euro = (s: string) => { const m = s.replace(/\s/g, "").match(/^(\d+(?:,\d+)?)€/); return m ? Number(m[1].replace(",", ".")) : null; };
const plain = (s: string) => s.replace(/[\u00a0\u202f\u00ad]/g, (c) => (c === "\u00ad" ? "" : " "));

export type PriceRow = { group: string; name: string; price: number | null; priceText: string; unit: string; note: string; url: string };

export const PRICES: PriceRow[] = [
  ...WEB_PACKAGES.map((p) => ({ group: "Website (einmalig)", name: `Website ${plain(p.name)}`, price: euro(p.price), priceText: plain(p.price), unit: plain(p.unit ?? ""), note: plain(p.note), url: `${SITE}/webdesign/leistungen#pakete` })),
  ...WEB_CARE.map((p) => ({ group: "Website-Betreuung (monatlich kündbar)", name: plain(p.name), price: euro(p.price), priceText: plain(p.price), unit: "pro Monat", note: `${plain(p.note)}. Jährlich ${plain(p.priceYear ?? "")} (12 Monate nutzen, 10 zahlen).`, url: `${SITE}/webdesign/leistungen#wartung` })),
  { group: "Einzelleistungen", name: "Website-Änderung ohne Paket", price: 39, priceText: "39 €", unit: "pro Stunde", note: "Einzelne Änderungen ohne Wartungspaket", url: `${SITE}/webdesign/leistungen#wartung` },
  { group: "Einzelleistungen", name: "Änderung an bestehender KNX-Anlage", price: 59, priceText: "ab 59 €", unit: "Festpreis nach Einschätzung", note: "Lichtszenen, Jalousien, neue Geräte, Fehlersuche. Keine Elektroinstallation.", url: `${SITE}/leistungen/smarthome` },
  { group: "Nach Angebot", name: "Reselling, E-Commerce, Räumungen, Solutions", price: null, priceText: "nach Angebot", unit: "verbindlicher Festpreis vorab", note: "Nach kurzer Bedarfsanalyse erhalten Sie ein verbindliches Angebot.", url: `${SITE}/kontakt` },
];

export const SERVICE_LIST = SERVICES.map((s) => ({ name: plain(s.title), summary: plain(s.short), description: plain(s.text), url: `${SITE}${serviceHref(s)}` }));

export const CONTACT_INFO = {
  name: "Pfalz Multiservice",
  owner: COMPANY.owner,
  city: CONTACT.city,
  phone: CONTACT.phone,
  whatsapp: CONTACT.whatsapp,
  email: CONTACT.email,
  contactPage: `${SITE}/kontakt`,
  responseTime: "Antwort innerhalb von 24 Stunden (werktags)",
  hours: COMPANY.hours,
};

export const pricesText = () =>
  PRICES.map((p) => `- ${p.name}: ${p.priceText}${p.unit ? ` (${p.unit})` : ""}. ${p.note} ${p.url}`).join("\n");
export const servicesText = () => SERVICE_LIST.map((s) => `- ${s.name}: ${s.summary}. ${s.url}`).join("\n");
export const contactText = () =>
  `${CONTACT_INFO.name}, ${CONTACT_INFO.city}. Telefon/WhatsApp ${CONTACT_INFO.phone}, E-Mail ${CONTACT_INFO.email}. ${CONTACT_INFO.responseTime}. ${CONTACT_INFO.hours}. Kontaktformular: ${CONTACT_INFO.contactPage}`;
