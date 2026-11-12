"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { WebProblem } from "@/lib/data";
import { Icon } from "../Icon";

/**
 * Problem-Karten als Stapel: Jede Karte bleibt beim Scrollen kurz stehen, die nächste schiebt sich darüber.
 * Normales Scrollen bleibt erhalten (kein Scroll-Hijacking), Text ist sofort lesbar.
 * Darunterliegende Karten treten leicht zurück (kleiner, abgedunkelt) – nur Desktop und ohne reduzierte Bewegung.
 * Auf dem Handy eine einfache Liste.
 */
export function ProblemStack({ items }: { items: WebProblem[] }) {
  const root = useRef<HTMLOListElement>(null);
  const total = String(items.length).padStart(2, "0");

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 901px)`, () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pst-card", el);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const shade = card.querySelector(".pst-card__shade");
        gsap.timeline({
          scrollTrigger: { trigger: next, start: "top bottom-=10%", end: () => `top ${parseFloat(getComputedStyle(next).top) || 120}px`, scrub: 0.4 },
        })
          .to(card, { scale: 0.94, ease: "none" }, 0)
          .to(shade, { opacity: 0.55, ease: "none" }, 0);
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <ol ref={root} className="pst__cards">
      {items.map((p, i) => {
        const n = String(i + 1).padStart(2, "0");
        return (
          <li key={p.title} className="pst-card" style={{ ["--i" as string]: i }}>
            <span className="pst-card__num" aria-hidden="true">{n}</span>
            <div className="pst-card__head">
              <span className="pst-card__icon"><Icon name={p.icon} size={24} /></span>
              <span className="pst-card__count" aria-hidden="true">{n} / {total}</span>
            </div>
            <h3 className="pst-card__title">{p.title}</h3>
            <p className="pst-card__text">{p.text}</p>
            <ul className="pst-card__tags" aria-label="Typische Anzeichen">
              {p.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className="pst-card__fix">
              <span className="pst-card__check"><Icon name="check" size={14} /></span>
              <span><b>So lösen wir das:</b> {p.fix}</span>
            </p>
            <span className="pst-card__shade" aria-hidden="true" />
          </li>
        );
      })}
    </ol>
  );
}
