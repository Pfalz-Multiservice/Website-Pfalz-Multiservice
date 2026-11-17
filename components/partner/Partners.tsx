import Image from "next/image";
import Link from "next/link";
import { PARTNERS, PARTNER_STAY, type Partner } from "@/lib/data";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";

export const partnerHref = (p: Partner) => `/partner#${p.slug}`;

/** Logo auf heller Platte: Partnerlogos sind oft dunkel und brauchen auf der dunklen Seite einen Grund */
export function PartnerLogo({ p, width = 170 }: { p: Partner; width?: number }) {
  return (
    <span className="pt-logo">
      <Image src={p.logo} alt={p.name} width={width} height={Math.round(width * 0.2)} />
    </span>
  );
}

/** Startseite: Partner als Kacheln (Desktop 3 nebeneinander, Handy 2 × 2) */
export function PartnerTiles() {
  return (
    <section className="section pt-tiles-wrap" id="partner">
      <div className="container">
        <SectionHeading eyebrow="Partner aus der Region" title="Echt statt" highlight="Muster"
          intro="Betriebe aus Worms, mit denen wir zusammenarbeiten." style={{ marginBottom: 48 }} />
        <div className="pt-tiles pm-reveal" data-reveal="cards">
          {PARTNERS.map((p) => (
            <Link key={p.slug} href={partnerHref(p)} className="pt-tile pm-card" data-cursor aria-label={`${p.name}: mehr zur Partnerschaft`}>
              <span className="pt-tile__img"><Image src={p.photo} alt={`${p.name}, ${p.branch}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 560px" /></span>
              <span className="pt-tile__body">
                <PartnerLogo p={p} width={130} />
                <span className="pt-tile__name">{p.name}</span>
                <span className="pt-tile__branch">{p.branch}</span>
                <span className="pt-tile__more">Mehr erfahren <Icon name="arrow-right" size={14} /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Partnerseite: je Partner ein Kopfbild, der Inhalt steht direkt auf dem Bild (ohne Kasten).
 * Am Desktop steht der Text von Partner zu Partner abwechselnd links und rechts, mobil immer gleich.
 */
export function PartnerSection({ p, index }: { p: Partner; index: number }) {
  return (
    <section className={`pt-hero ${index === 0 ? "pt-hero--first" : ""} ${index % 2 ? "pt-hero--rev" : ""}`} id={p.slug} aria-labelledby={`${p.slug}-name`}>
      <Image className="pt-hero__img" src={p.header} alt="" fill sizes="100vw" priority={index === 0} />
      <div className="pt-hero__scrim" />
      <div className="container pt-hero__in">
        <div className="pt-hero__copy">
          <div className="pm-reveal" data-reveal="up"><PartnerLogo p={p} width={200} /></div>
          <span className="pt-hero__eyebrow pm-reveal" data-reveal="up">{p.branch} · {p.since}</span>
          <h2 className="pt-hero__name pm-reveal" data-reveal="up" id={`${p.slug}-name`}>{p.name}</h2>
          <p className="pt-hero__text pm-reveal" data-reveal="up">{tidy(p.text)}</p>
          <dl className="pt-facts pm-reveal" data-reveal="stagger">
            {p.facts.map(([v, k]) => <div key={k}><dt>{v}</dt><dd>{k}</dd></div>)}
          </dl>
          <ul className="pt-awards pm-reveal" data-reveal="pop">
            {p.awards.map((a, i) => (
              <li key={a} style={{ ["--i" as string]: i }}><span className="pt-star"><Icon name="star" size={15} /></span>{a}</li>
            ))}
          </ul>
          <div className="pm-reveal" data-reveal="up">
            <Button variant="accent" icon="external-link" href={p.url}>{p.host} besuchen</Button>
          </div>
        </div>
      </div>
    </section>
  );
}


/** Empfehlung auf Leistungsseiten: Unterkunft für Teams, die in Worms im Einsatz sind */
export function PartnerStayTip() {
  const p = PARTNER_STAY.partner;
  return (
    <section className="section pt-tip-wrap">
      <div className="container">
        <aside className="pt-tip pm-reveal" data-reveal="up">
          <div className="pt-tip__img"><Image src={p.photo} alt={`Unterkunft von ${p.name} in Worms`} fill sizes="(max-width: 900px) 100vw, 360px" /></div>
          <div className="pt-tip__copy">
            <span className="pt-tip__eyebrow">Tipp von unserem Partner</span>
            <h2 className="pt-tip__title">Ihr Team ist in Worms im Einsatz?</h2>
            <p>{tidy(`Unser Partner ${p.name} bringt Monteure, Projektteams und Geschäftsreisende unter: vier Wohnungen für bis zu 9 Personen, kontaktloser Check-in auch nachts, schnelles WLAN. Direkt gebucht ist der Aufenthalt immer günstiger als über Buchungsportale.`)}</p>
            <div className="pt-tip__actions">
              <Button variant="accent" icon="external-link" href={PARTNER_STAY.href}>Unterkunft ansehen</Button>
              <Button variant="outline-light" href={partnerHref(p)}>Mehr zur Partnerschaft</Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
