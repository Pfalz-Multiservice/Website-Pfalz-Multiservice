import { SERVICES } from "./data";

export type PageSection = { id: string; label: string };

/**
 * Abschnittsmenü je Leistungsseite: Auf diesen Seiten zeigt der Header statt des Hauptmenüs
 * „← Alle Leistungen“ und die Abschnitte genau dieser Seite. Die IDs müssen auf der Seite existieren.
 */
export function pageSections(pathname: string): PageSection[] | null {
  if (pathname === "/webdesign")
    return [
      { id: "beispiele", label: "Referenzen" },
      { id: "pakete", label: "Pakete" },
      { id: "ablauf", label: "Ablauf" },
      { id: "faq", label: "Fragen" },
    ];
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
