import { SERVICES } from "./data";

/** Abschnitt dieser Seite (nur id) oder Link auf eine andere Seite, auch mit Sprungziel (href, z. B. "/webdesign#faq") */
/** activeOn: weitere Seiten, auf denen der Menüpunkt als aktuell markiert wird (z. B. Stadtseiten unter „Leistungen“) */
export type PageSection = { id?: string; href?: string; label: string; activeOn?: RegExp };

/** Webdesign-Bereich: dasselbe Menü auf Übersicht, Leistungen, Branchenseiten und Referenzen */
export const WEB_NAV: PageSection[] = [
  // Stadtseiten (/webdesign-worms, /webdesign/<ort>) gehören zu den Leistungen, behalten aber ihre Adresse (Google)
  { href: "/webdesign/leistungen", label: "Leistungen", activeOn: /^\/webdesign(-worms|\/(?!referenzen$)[^/]+)$/ },
  { href: "/webdesign/referenzen", label: "Referenzen" },
  { href: "/webdesign/leistungen#pakete", label: "Pakete" },
  { href: "/webdesign#faq", label: "Fragen" },
];
export const isWebArea = (pathname: string) =>
  pathname === "/webdesign" || pathname === "/webdesign-worms" || pathname.startsWith("/webdesign/");

/**
 * Abschnittsmenü je Leistungsseite: Auf diesen Seiten zeigt der Header statt des Hauptmenüs
 * „← Alle Leistungen“ und die Abschnitte genau dieser Seite. Die IDs müssen auf der Seite existieren.
 */
export function pageSections(pathname: string): PageSection[] | null {
  if (isWebArea(pathname)) return WEB_NAV;
  const m = pathname.match(/^\/leistungen\/([^/]+)$/);
  const s = m && SERVICES.find((x) => x.id === m[1]);
  if (!s) return null;
  const faq = s.faq ? [{ id: "faq", label: "Fragen" }] : [];
  if (s.id === "smarthome")
    return [
      { id: "ausprobieren", label: "Ausprobieren" },
      { id: "anliegen", label: "Anliegen" },
      { id: "ablauf", label: "Ablauf" },
      ...faq,
    ];
  return [{ id: "ueberblick", label: "Überblick" }, ...faq, { id: "weitere", label: "Weitere Leistungen" }];
}
