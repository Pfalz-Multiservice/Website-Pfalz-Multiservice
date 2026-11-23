"use client";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { BEFORE_AFTER } from "@/lib/data";
import { SectionHeading } from "../SectionHeading";
import { Icon } from "../Icon";

/**
 * Vorher-nachher-Vergleich der Kundenseiten: neue Seite unten, alte Seite darüber, abgeschnitten bis zum Regler.
 * Bedienung über ein unsichtbares Range-Feld (Maus, Touch, Pfeiltasten), Bilder in public/images/vorher-nachher.
 */
export function BeforeAfterSection() {
  return (
    <section className="section section--alt" id="vorher-nachher">
      <div className="container">
        <SectionHeading eyebrow="Vorher · Nachher" title="Was eine neue Website" highlight="ausmacht"
          intro="Die alte und die neue Startseite im gleichen Ausschnitt. Ziehen Sie den Regler zur Seite." />
        <div className="ba-grid">
          {BEFORE_AFTER.map((p) => <BeforeAfter key={p.slug} {...p} />)}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ slug, name, branch, url }: (typeof BEFORE_AFTER)[number]) {
  const [pos, setPos] = useState(50);
  const host = url.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <figure className="ba pm-reveal" data-reveal="up">
      <div className="sc-browser ba__browser">
        <div className="sc-browser__bar" aria-hidden="true"><span className="sc-browser__dots"><i /><i /><i /></span><span className="ba__url">{host}</span></div>
        <div className="ba__view" style={{ "--pos": `${pos}%` } as CSSProperties}>
          <Image className="ba__img" src={`/images/vorher-nachher/${slug}-nachher.jpg`} alt={`Neue Startseite von ${name}`} fill sizes="(max-width: 900px) 100vw, 600px" />
          <div className="ba__before">
            <Image className="ba__img" src={`/images/vorher-nachher/${slug}-vorher.jpg`} alt={`Alte Startseite von ${name}`} fill sizes="(max-width: 900px) 100vw, 600px" />
          </div>
          <span className="ba__tag ba__tag--before" aria-hidden="true">Vorher</span>
          <span className="ba__tag ba__tag--after" aria-hidden="true">Nachher</span>
          <span className="ba__handle" aria-hidden="true"><span className="ba__knob"><Icon name="chevron-right" size={16} /><Icon name="chevron-right" size={16} /></span></span>
          <input className="ba__range" type="range" min={0} max={100} step={1} value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`Vorher-nachher-Vergleich ${name}: Anteil der alten Website`} aria-valuetext={`${pos} % alte Website`} />
        </div>
      </div>
      <figcaption className="ba__cap">
        <span><b>{name}</b>{branch}</span>
        <a href={url} target="_blank" rel="noopener" data-cursor>Live ansehen <Icon name="external-link" size={15} /></a>
      </figcaption>
    </figure>
  );
}
