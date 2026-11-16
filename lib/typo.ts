import { Children, cloneElement, createElement, isValidElement, type ReactNode, type ReactElement } from "react";

/**
 * Typografie für Fließtext: verhindert unschöne Zeilenumbrüche durch geschützte Leerzeichen.
 * - Nach einem Satzende werden die ersten drei Wörter des neuen Satzes zusammengehalten,
 *   damit kein Satz mit nur ein oder zwei Wörtern am Zeilenende beginnt.
 * - Die letzten zwei Wörter eines Textes bleiben zusammen (kein einzelnes Wort in der letzten Zeile).
 * Lange Wortgruppen werden nicht gebunden, damit auf dem Handy nichts überläuft.
 */
const NB = " ";
// Gebundene Gruppen bleiben kurz, sonst entstehen auf schmalen Bildschirmen davor halbleere Zeilen
const MAX_GROUP = 24;

function bind(words: string[]): string {
  return words.join(" ").length <= MAX_GROUP ? words.join(NB) : words.join(" ");
}

export function tidy(text: string): string {
  if (!text || text.length < 20 || !text.includes(" ")) return text;
  const tokens = text.split(/( +)/); // Wörter und Leerräume abwechselnd
  const words: string[] = [];
  for (let i = 0; i < tokens.length; i += 2) words.push(tokens[i]);
  const glue = new Array(words.length).fill(false); // glue[k]: Leerzeichen nach Wort k schützen

  // Wortgruppe zusammenhalten; ist sie zu lang, wenigstens die ersten zwei Wörter
  const mark = (from: number, count: number) => {
    for (let n = count; n >= 2; n--) {
      const group = words.slice(from, from + n);
      if (group.length === n && group.join(" ").length <= (n === 2 ? 18 : MAX_GROUP)) {
        for (let k = from; k < from + n - 1; k++) glue[k] = true;
        return;
      }
    }
  };

  for (let k = 0; k < words.length - 1; k++) {
    // Satzende (auch nach Doppelpunkt) – Abkürzungen wie „z. B.“ oder „Abs.“ ausnehmen
    if (/[.!?:]["“”)]?$/.test(words[k]) && !/^(z|B|bzw|ca|Nr|Abs|Art|lit|ggf|inkl|zzgl|u|v|d|S|s)\.$/.test(words[k])) mark(k + 1, 3);
  }
  // Textstück nach fettem Vorspann o. Ä. („<b>Titel:</b> Sie kennen …“) beginnt einen neuen Satz
  if (words[0] === "" && words.length > 3) mark(1, 3);
  // Ende des Textes: die letzten zwei Wörter zusammenhalten
  if (words.length >= 3) mark(words.length - 2, 2);

  // Zusammengehörige Angaben nie trennen: „Art. 6“, „Abs. 1“, „lit. b“, „§ 19“, „z. B.“, „19 €“
  for (let k = 0; k < words.length - 1; k++) {
    if (/^(Art|Abs|lit|Nr|S|z)\.$|^§$/.test(words[k]) || /^(Abs\.|lit\.|DSGVO|UStG|DDG|TDDDG)/.test(words[k + 1]) || (/^\d+([.,]\d+)?$/.test(words[k]) && /^(€|%|Std\.|Tage|Seiten)/.test(words[k + 1]))) glue[k] = true;
  }

  let out = "";
  for (let k = 0; k < words.length; k++) {
    out += words[k];
    if (k < words.length - 1) out += glue[k] ? NB : tokens[2 * k + 1];
  }
  return out;
}

/**
 * Gewünschter Zeilenumbruch: „\n“ im Text wird am Desktop zum Umbruch,
 * auf dem Handy fließt der Text normal weiter (CSS-Klasse .br-d).
 * „\u2028“ (Zeilentrenner) bricht immer um, auch auf dem Handy.
 */
export function lines(text: string): ReactNode {
  if (!/[\n\u2028]/.test(text)) return text;
  const parts = text.split(/(\n|\u2028)/);
  const out: ReactNode[] = [parts[0]];
  for (let i = 1; i < parts.length; i += 2) {
    out.push(createElement("br", { key: i, className: parts[i] === "\n" ? "br-d" : undefined }), " ", parts[i + 1].replace(/^\s+/, ""));
  }
  return out;
}

/** Wie tidy(), behandelt den Text aber als Satzanfang (z. B. nach einem fetten Vorspann) */
export const tidyLead = (text: string) => tidy(" " + text).slice(1);

/** Wendet tidy() auf alle Textstellen eines JSX-Baums an (nur direkt geschriebenes JSX, keine Komponenten-Interna) */
export function tidyNode(node: ReactNode): ReactNode {
  if (typeof node === "string") return tidy(node);
  if (Array.isArray(node)) return Children.map(node, tidyNode);
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children === undefined) return el;
    return cloneElement(el, undefined, tidyNode(el.props.children));
  }
  return node;
}

/** Wendet tidy() auf alle Texte in Inhaltsdaten an – technische Felder bleiben unverändert */
const SKIP = new Set(["id", "slug", "href", "image", "icon", "path", "key", "url", "seo", "seoTitle", "email", "phone", "phoneHref", "whatsapp", "city"]);
export function tidyDeep<T>(value: T, key?: string): T {
  if (key && SKIP.has(key)) return value;
  if (typeof value === "string") return tidy(value) as T;
  if (Array.isArray(value)) return value.map((v) => tidyDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, tidyDeep(v, k)])) as T;
  }
  return value;
}
