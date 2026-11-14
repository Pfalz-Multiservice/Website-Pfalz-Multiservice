import Link from "next/link";
import { tidyNode } from "@/lib/typo";
import { COMPANY, CTA, CONTACT, IMG, USPS, homeSubServices, serviceHref } from "@/lib/data";
import { Core } from "./Core";
import { RegionMap } from "./RegionMap";
import { BgImage } from "../BgImage";
import { SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../ServiceCard";
import { CheckList } from "../CheckList";
import { Button } from "../Button";
import { Eyebrow } from "../Eyebrow";
import { Icon } from "../Icon";

export function TrustStrip() {
  const ic = ["layers", "file-check", "map-pin"] as const;
  return (
    <div className="trust">
      <div className="container trust__grid pm-reveal" data-reveal="stagger">
        {USPS.map((u, i) => (
          <div key={u.title} className="trust__item">
            <Icon name={ic[i]} size={28} className="trust__icon" />
            <div>
              <span className="trust__title">{u.title}</span>
              <span className="trust__text">{u.lines ? <>{u.lines[0]}<br />{u.lines[1]}</> : u.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="section" id="leistungen">
      <div className="container">
        <SectionHeading
          align="center" eyebrow="Kompetenzbereiche" title="Unsere" highlight="Leistungen"
          style={{ marginBottom: 56 }}
        />
      </div>
      <Core />
      <div className="container services__sub">
        <Eyebrow>Weitere Leistungen</Eyebrow>
        <div className="pm-reveal" data-reveal="cards" style={{ marginTop: 28 }}>
          <div className={homeSubServices().length % 3 === 0 ? "grid-3" : "grid-2"}>
            {homeSubServices().map((s) => (
              <ServiceCard key={s.id} href={serviceHref(s)} image={s.image} title={s.title} text={s.short} linkLabel="Details" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section section--alt" id="ueber">
      <div className="container split">
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow={`Inhabergeführt seit ${COMPANY.founded} · Worms`} title="Wer" highlight="dahintersteht" />
          {tidyNode(<div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 24 }}>
            <p className="about__owner">{COMPANY.owner}<span>, Inhaberin</span></p>
            <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
              Pfalz Multiservice ist ein inhabergeführtes Dienstleistungsunternehmen mit Sitz in Worms, gegründet {COMPANY.founded} von
              {" "}{COMPANY.owner} und gewachsen aus dem E-Commerce. Die Erfahrung aus Handel, Logistik und digitalen Prozessen bildet heute
              die Grundlage für ein breites Dienstleistungsportfolio.
            </p>
            <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>
              Wir denken lösungsorientiert, arbeiten strukturiert und<br className="br-d" /> legen Wert auf langfristige Geschäftsbeziehungen.
            </p>
          </div>)}
          <div className="pm-reveal" data-reveal="checks"><CheckList items={USPS} /></div>
          <div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 24 }}>
            <span style={{ font: "400 15px var(--font-body)", color: "var(--text-body)" }}>Mehrere Bereiche kombinieren? Sprechen Sie uns an.</span>
            <div className="about__btns">
              <Button variant="accent" href="/kontakt">Unverbindlich anfragen</Button>
              <Button variant="outline-light" iconLeft="message-circle" href={CONTACT.whatsapp}>Per WhatsApp schreiben</Button>
            </div>
          </div>
        </div>
        <div className="media-frame pm-reveal" data-reveal="clip" style={{ aspectRatio: "4/5" }}>
          <BgImage className="media-frame__img" data-clip-img="" data-parallax="8" src={IMG + "bruecken-turm-gold.jpg"} sizes="(max-width: 900px) 100vw, 50vw" />
          <span className="media-frame__corner media-frame__corner--tl" />
          <span className="media-frame__corner media-frame__corner--br" />
        </div>
      </div>
    </section>
  );
}

export function Region() {
  return (
    <section className="section" id="region">
      <div className="container">
        <RegionMap
          heading={
            <SectionHeading
              eyebrow="Region Worms" title="Unser" highlight="Einzugsgebiet"
              intro={<>Regional vor Ort in Worms und rund 30 Kilometern Umkreis, zum Beispiel mit <Link href="/webdesign-worms">Webdesign in Worms</Link>. Bundesweit online verfügbar: <Link href="/webdesign">Webdesign</Link>, Website-Betreuung und E-Commerce erledigen wir standortunabhängig.</>}
            />
          }
        />
      </div>
    </section>
  );
}

export function CtaBand({ image, intro }: { image?: string; intro?: React.ReactNode }) {
  return (
    <section className="cta">
      {image && (
        <div className="cta__bg" data-parallax="8">
          <BgImage className="cta__img" src={image} />
        </div>
      )}
      <div className="cta__scrim" style={image ? undefined : { background: "transparent" }} />
      <div className="cta__inner">
        <SectionHeading dark align="center" eyebrow="Jetzt starten" title={CTA.title} highlight={CTA.highlight} intro={intro ?? CTA.intro} />
        <div className="cta__btns pm-reveal" data-reveal="stagger">
          <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt">Unverbindlich anfragen</Button>
          <Button variant="outline-light" size="lg" iconLeft="phone" href={CONTACT.phoneHref}>{CONTACT.phone}</Button>
        </div>
      </div>
    </section>
  );
}
