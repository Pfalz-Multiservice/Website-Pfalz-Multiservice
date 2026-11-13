"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CLASSIC_EXAMPLES, type ClassicExample } from "@/lib/data";
import { EXAMPLES_URL, EXAMPLES_HOST } from "@/lib/site";

const AUTOPLAY_MS = 2400; // muss zur Dauer von .cl-tab__prog in globals.css passen

/** Klassische Websites mit Menü: Browser-Mockup mit Seiten-Umschalter */
export function ClassicList({ grid = false, items = CLASSIC_EXAMPLES }: { grid?: boolean; items?: ClassicExample[] }) {
  return (
    <div className={`showcase${grid ? " showcase--grid" : ""}`}>
      {items.map((e, i) => (
        <ClassicItem key={e.slug} ex={e} index={i} />
      ))}
    </div>
  );
}

function ClassicItem({ ex, index }: { ex: ClassicExample; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(false);
  const [visible, setVisible] = useState(false);
  const page = ex.pages[cur];
  // Kundenprojekte laufen auf eigener Domain, Musterdesigns auf dem Beispiel-Server
  const base = ex.host ? (ex.url ?? null) : `${EXAMPLES_URL}/${ex.slug}`;
  const shown = ex.host ? `${ex.host}${page.path === "/" ? "" : page.path}` : `${EXAMPLES_HOST}/${ex.slug}${page.path}`;
  const href = base ? base + (ex.host && page.path === "/" ? "" : page.path) : null;
  const playing = auto && visible;

  // Automatisch durch die Unterseiten blättern, solange sichtbar und noch nicht angeklickt.
  // Der Timer startet bei jedem Seitenwechsel neu – synchron zum Fortschrittsbalken im Tab.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setCur((c) => (c + 1) % ex.pages.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, cur, ex.pages.length]);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });
      // Statisch: kein Einflug mehr, nur Seiten-Autoplay und Hover-Effekte
      const st = ScrollTrigger.create({
        trigger: root, start: "top 70%", end: "bottom 30%",
        onToggle: (self) => setVisible(self.isActive),
      });
      setAuto(true);
      return () => { st.kill(); setAuto(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <article ref={ref} className={`sc-item ${index % 2 ? "sc-item--rev" : ""}`}>
      <div className="cl-stage">
        <div className="sc-browser pm-reveal">
          <div className="sc-browser__bar" aria-hidden="true">
            <span className="sc-browser__dots"><i /><i /><i /></span>
            <span className="sc-browser__url">{shown}</span>
          </div>
          {href ? (
            <a className="cl-view" href={href} target="_blank" rel="noopener" data-cursor
              aria-label={`${ex.name}, Seite ${page.label} live ansehen (öffnet in neuem Tab)`}>
              {ex.pages.map((p, i) => (
              <Image key={p.key} className={`cl-shot ${i === cur ? "is-on" : ""}`} src={`/images/beispiele/${ex.slug}-${p.key}.png`}
                alt={i === cur ? `Vorschau ${ex.name}, Seite ${p.label}` : ""} fill sizes="(max-width: 900px) 100vw, 800px" />
            ))}
            </a>
          ) : (
            <div className="cl-view">
              {ex.pages.map((p, i) => (
              <Image key={p.key} className={`cl-shot ${i === cur ? "is-on" : ""}`} src={`/images/beispiele/${ex.slug}-${p.key}.png`}
                alt={i === cur ? `Vorschau ${ex.name}, Seite ${p.label}` : ""} fill sizes="(max-width: 900px) 100vw, 800px" />
            ))}
            </div>
          )}
        </div>
      </div>

      <div className="sc-copy">
        <span className="sc-branch pm-reveal">{ex.branch}</span>
        <h3 className="sc-title pm-reveal">{ex.name}</h3>
      </div>
    </article>
  );
}
