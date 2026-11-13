import { CORE, SERVICES, serviceHref } from "@/lib/data";
import Link from "next/link";
import { BgImage } from "../BgImage";
import { Eyebrow } from "../Eyebrow";
import { CheckList } from "../CheckList";
import { Button } from "../Button";
import { TileReveal } from "./TileReveal";

/**
 * Die Hauptleistungen als Kacheln (2 × 2): Foto als abgedunkelter Hintergrund wie auf der
 * Partnerseite, darüber Titel, kurzer Text und drei Stichpunkte. Einblenden über TileReveal
 * (unabhängig von GSAP, damit die Kacheln auch auf dem Handy zuverlässig erscheinen).
 */
export function Core() {
  return (
    <div className="container">
      <TileReveal className="core-tiles">
        {CORE.map((c, i) => {
          const s = SERVICES.find((x) => x.id === c.id)!;
          return (
            <article key={c.id} className={`core-tile core-tile--${c.id}`}>
              <BgImage className="core-tile__img" src={c.image ?? s.image} sizes="(max-width: 1200px) 100vw, 1200px" />
              <div className="core-tile__scrim" aria-hidden="true" />
              <span className="core-tile__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="core-tile__body">
                <Eyebrow>{c.kicker}</Eyebrow>
                <h3 className="core-tile__title">{c.title}</h3>
                <p className="core-tile__lead">{c.text}</p>
                <div className="core-tile__points">
                  <CheckList items={c.items.map((t) => ({ title: t }))} />
                </div>
                <div className="core-tile__cta">
                  <Button variant="outline" href={serviceHref(s)} icon="arrow-right">{c.link}</Button>
                </div>
              </div>
              <Link href={serviceHref(s)} className="core-tile__link" aria-hidden="true" tabIndex={-1} data-cursor />
            </article>
          );
        })}
      </TileReveal>
    </div>
  );
}
