import Image from "next/image";
import type { CSSProperties } from "react";
import { REFERENCES } from "@/lib/data";
import { EXAMPLES_URL } from "@/lib/site";
import { brancheHref } from "@/lib/branchen";
import { tidy } from "@/lib/typo";
import { InView } from "../motion/InView";
import { Button } from "../Button";
import { Icon } from "../Icon";

/** Das Wichtigste der Handwerk-Seite in Kurzform (Quelle: lib/branchen.ts, Abschnitt „Was Ihre Website leisten muss“ und Rechner) */
const POINTS: [title: string, text: string][] = [
  ["Festpreis ab 199 €", "Kein Abo. Den Preis kennen Sie, bevor wir beginnen."],
  ["Ihre Arbeiten als Beweis", "Projektfotos, auf Wunsch als Vorher-Nachher-Vergleich."],
  ["Anfrage mit Vorauswahl", "Art, Umfang, Ort und Zeitraum. Sie sehen sofort, ob der Auftrag passt."],
  ["Vertrauen vor dem ersten Anruf", "Bewertungen, Meisterbetrieb und Ansprechpartner an einer Stelle."],
  ["Messbar statt gefühlt", "Ihr Statistik-Dashboard zeigt Besucher und Anfragen."],
];

const schaffner = REFERENCES.find((r) => r.slug === "schaffner")!;
const SHOTS = [
  { key: "schaffner", name: schaffner.name, label: "Referenz · live", href: schaffner.url ?? `https://${schaffner.host}`, img: "/images/beispiele/schaffner-scroll.png" },
  { key: "fliesen", name: "Fliesen Reuter", label: "Musterdesign", href: `${EXAMPLES_URL}/fliesenleger`, img: "/images/beispiele/fliesenleger-scroll.png" },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Startseite, Abschnitt Webdesign: Best of der Handwerk-Seite mit zwei Website-Vorschauen, die sich selbst abfahren */
export function WebBestOf() {
  const href = brancheHref("handwerk");
  return (
    <InView className="bestof" threshold={0.25}>
      <div className="bestof__copy">
        <span className="bestof__eyebrow bestof__in" style={i(0)}>Website für Handwerker</span>
        <h3 className="bestof__title bestof__in" style={i(1)}>Das Wichtigste <span>auf einen Blick</span></h3>
        <ul className="bestof__list">
          {POINTS.map(([title, text], n) => (
            <li key={title} className="bestof__item bestof__in" style={i(n + 2)}>
              <span className="checklist__box" aria-hidden="true"><Icon name="check" size={16} /></span>
              <span><b>{title}:</b> {tidy(text)}</span>
            </li>
          ))}
        </ul>
        <p className="bestof__payoff bestof__in" style={i(POINTS.length + 2)}>
          {tidy("Ein einzelner zusätzlicher Auftrag deckt die Kosten")} <b>um ein Vielfaches</b>.
        </p>
        <div className="bestof__actions bestof__in" style={i(POINTS.length + 3)}>
          <Button variant="accent" icon="arrow-right" href={href}>Website für Handwerker</Button>
          <Button variant="outline-light" href={`${href}#rechnung`}>Zum Rechner</Button>
        </div>
      </div>

      <div className="bestof__stage">
        {SHOTS.map((s, n) => (
          <a key={s.key} className={`bestof__shot bestof__shot--${s.key}`} href={s.href} target="_blank" rel="noopener" data-cursor
            aria-label={`${s.name} ansehen (öffnet in neuem Tab)`} style={i(n)}>
            <span className="sc-browser__bar" aria-hidden="true"><span className="sc-browser__dots"><i /><i /><i /></span></span>
            <span className="bestof__view">
              <Image className="bestof__img" src={s.img} alt={`Vorschau ${s.name}`} width={1000} height={3750}
                sizes="(max-width: 900px) 80vw, 480px" />
            </span>
            <span className="bestof__cap"><b>{s.name}</b>{s.label}<Icon name="external-link" size={14} /></span>
          </a>
        ))}
      </div>
    </InView>
  );
}
