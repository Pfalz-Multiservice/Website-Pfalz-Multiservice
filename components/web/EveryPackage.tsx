"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToHash } from "@/lib/lenis";
import { WEB_EVERY } from "@/lib/data";
import { tidy } from "@/lib/typo";
import { Icon } from "../Icon";

const SHOWN = 4; // am Handy zugeklappt nur 2 je Gruppe (CSS)
const SHOWN_M = 2;
const TOTAL = WEB_EVERY.reduce((n, g) => n + g.items.length, 0);

/**
 * „In jedem Paket enthalten“: Leistungsumfang, Inklusivleistungen und Übergabe-Paket in vier Gruppen.
 * Zugeklappt je Gruppe die wichtigsten Punkte, aufgeklappt alle Punkte mit Erklärung.
 * Alles steht immer im HTML (für Google und Screenreader), zugeklappt nur ausgeblendet.
 */
export function EveryPackage() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    ScrollTrigger.refresh();
    if (!open && ref.current && ref.current.getBoundingClientRect().top < 0) scrollToHash("#inklusive", true);
  }, [open]);

  return (
    <div ref={ref} className={`every pm-reveal ${open ? "is-open" : ""}`} data-reveal="up" id="inklusive">
      <div className="every__head">
        <span className="pk-box__eyebrow">In jedem Paket enthalten</span>
        <h3 className="pk-box__title">Ohne Aufpreis, egal welches Paket</h3>
      </div>
      <div className="every__grid" id="every-list">
        {WEB_EVERY.map((g) => (
          <section key={g.id} className="every__grp" id={g.id} aria-labelledby={`${g.id}-t`}>
            <h4 className="every__title" id={`${g.id}-t`}>
              <span className="every__icon"><Icon name={g.icon} size={18} /></span>
              {g.title}
              <span className="every__count">{g.items.length}</span>
            </h4>
            <ul className="every__list">
              {g.items.map((it, i) => (
                <li key={it.title} className={i >= SHOWN ? "every__more" : undefined}>
                  <Icon name="check" size={14} />
                  <span>
                    <b>{it.title}</b>
                    {it.text && <span className="every__text">{tidy(it.text)}</span>}
                  </span>
                </li>
              ))}
            </ul>
            {g.items.length > SHOWN && <span className="every__rest every__rest--d" aria-hidden="true">+ {g.items.length - SHOWN} weitere</span>}
            <span className="every__rest every__rest--m" aria-hidden="true">+ {g.items.length - SHOWN_M} weitere</span>
            {g.note && <p className="every__note">{tidy(g.note)}</p>}
          </section>
        ))}
      </div>
      <button type="button" className="every__toggle" aria-expanded={open} aria-controls="every-list" onClick={() => setOpen((o) => !o)} data-cursor>
        {open ? "Weniger anzeigen" : `Alle ${TOTAL} Leistungen mit Erklärung anzeigen`}
        <Icon name="chevron-down" size={16} />
      </button>
    </div>
  );
}
