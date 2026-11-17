import { SERVICES } from "./data";

/** Abschnitt dieser Seite (nur id) oder Link auf eine andere Seite, auch mit Sprungziel (href, z. B. "/webdesign#faq") */
export type PageSection = { id?: string; href?: string; label: string };

/** Webdesign-Bereich: dasselbe Menü auf Übersicht, Leistungen, Branchenseiten und Referenzen */
export const WEB_NAV: PageSection[] = [
  { href: "/webdesign/leistungen", label: "Leistungen" },
  { href: "/webdesign/referenzen", label: "Referenzen" },
  { href: "/webdesign/leistungen#pakete", label: "Pakete" },
  { href: "/webdesign#faq", label: "Fragen" },
];
export const isWebArea = (pathname: string) =>
  pathname === "/webdesign" || pathname === "/webdesign/referenzen" || pathname === "/webdesign/leistungen" || pathname.startsWith("/webdesign/leistungen/");

/**
 * Abschnittsmenü je Leistungsseite: Auf diesen Seiten zeigt der Header statt des Hauptmenüs
 * „← Alle Leistungen“ und die Abschnitte genau dieser Seite. Die IDs müssen auf der Seite existieren.
 */
export function pageSections(pathname: string): PageSection[] | null {
  if (isWebArea(pathname)) return WEB_NAV;
  if (pathname === "/webdesign-worms")
    return [
      { id: "worms", label: "In Worms" },
      { id: "beispiele", label: "Referenzen" },
      { id: "pakete", label: "Pakete" },
      { id: "faq", label: "Fragen" },
    ];
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
