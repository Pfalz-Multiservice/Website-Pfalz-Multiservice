import Link from "next/link";
import { CONTACT, IMG } from "@/lib/data";
import { LinkTileImg } from "./WebBranchen";
import { SITE_NAME } from "@/lib/site";
import { ORTE, ortHref, type Ort } from "@/lib/orte";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { CheckList } from "../CheckList";
import { Icon } from "../Icon";

/** Stadtteile und Nachbarorte, die im Text und im Schema (areaServed) genannt werden */
export const WORMS_DISTRICTS = ["Horchheim", "Pfeddersheim", "Herrnsheim", "Hochheim", "Rheindürkheim"];
export const WORMS_NEARBY = ["Osthofen", "Alzey"];

/**
 * Lokaler Abschnitt der Webdesign-Seite: Worms im Fließtext, dazu Name, Ort und Telefon
 * exakt wie im Google-Unternehmensprofil (Einzugsgebiet, daher ohne Straße).
 */
export function WebLocal({ alt = true }: { alt?: boolean }) {
  const points = [
    { title: "Ansprechpartner in Worms", text: "Sie sprechen direkt mit uns, nicht mit einer Hotline oder einer Agentur am anderen Ende des Landes." },
    { title: "Für Kunden aus der Region", text: "Texte und Seitenaufbau so, dass Ihre Kunden in Worms und Umgebung Sie bei Google finden." },
    { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Sie kennen den Preis, bevor wir beginnen." },
  ];
  return (
    <section className={`section${alt ? " section--alt" : ""}`} id="worms">
      <div className="container split web-local">
        <div>
          <SectionHeading eyebrow="Webdesign aus Worms" title="Ihr Webdesigner" highlight="in Worms" />
          <p className="web-local__text pm-reveal" data-reveal="up">
            {tidy(`${SITE_NAME} ist in Worms zu Hause. Wir gestalten Websites für Betriebe, Selbstständige und Vereine aus der Innenstadt und allen Stadtteilen, von ${WORMS_DISTRICTS.slice(0, -1).join(", ")} bis ${WORMS_DISTRICTS.at(-1)}.`)}
          </p>
          <p className="web-local__text pm-reveal" data-reveal="up">
            {tidy(`Auch aus ${WORMS_NEARBY.join(" und ")}, aus ganz Rheinhessen, der Pfalz und aus Mannheim kommen Kunden zu uns. Absprachen laufen per Telefon, WhatsApp oder E-Mail, Termine nach Vereinbarung.`)}
          </p>
          <div className="pm-reveal" data-reveal="up"><CheckList items={points} /></div>
        </div>
        <address className="web-local__card pm-reveal" data-reveal="up">
          <span className="web-local__name">{SITE_NAME}</span>
          <span className="web-local__row"><Icon name="map-pin" size={18} />{CONTACT.city}</span>
          <a className="web-local__row" href={CONTACT.phoneHref}><Icon name="phone" size={18} />{CONTACT.phone}</a>
          <a className="web-local__row" href={CONTACT.whatsapp}><Icon name="message-circle" size={18} />WhatsApp schreiben</a>
          <a className="web-local__row" href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} />{CONTACT.email}</a>
          <span className="web-local__note">Termine nach Vereinbarung</span>
        </address>
      </div>
    </section>
  );
}

/** Hinweis auf /webdesign: führt Besucher (und Google) zur eigenen Worms-Seite */
export function WormsTeaser() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Link href="/webdesign-worms" className="bstrip web-local__teaser pm-reveal" data-reveal="up" data-cursor>
          <span className="bstrip__icon"><Icon name="map-pin" size={24} /></span>
          <span className="bstrip__txt">
            <b>Webdesign in Worms</b>
            <span>{tidy("Sie kommen aus Worms oder der Umgebung? Ihr Ansprechpartner in Worms, Stadtteile und Preise auf einen Blick.")}</span>
          </span>
          <Icon name="arrow-right" size={20} />
        </Link>
      </div>
    </section>
  );
}

/** Lokaler Abschnitt einer Stadtseite (/webdesign/<ort>): eigene Texte je Stadt, Kontaktkarte mit dem Sitz in Worms */
export function WebCity({ ort }: { ort: Ort }) {
  return (
    <section className="section" id="ort">
      <div className="container split web-local">
        <div>
          <SectionHeading eyebrow={`Webdesign für ${ort.name}`} title="Ihr Webdesigner" highlight={`für ${ort.name}`} />
          {ort.text.map((t) => <p key={t} className="web-local__text pm-reveal" data-reveal="up">{t}</p>)}
          <div className="pm-reveal" data-reveal="up"><CheckList items={ort.points} /></div>
        </div>
        <address className="web-local__card pm-reveal" data-reveal="up">
          <span className="web-local__name">{SITE_NAME}</span>
          <span className="web-local__row"><Icon name="map-pin" size={18} />{CONTACT.city}</span>
          <a className="web-local__row" href={CONTACT.phoneHref}><Icon name="phone" size={18} />{CONTACT.phone}</a>
          <a className="web-local__row" href={CONTACT.whatsapp}><Icon name="message-circle" size={18} />WhatsApp schreiben</a>
          <a className="web-local__row" href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} />{CONTACT.email}</a>
          <span className="web-local__note">{tidy(`Sitz in Worms. Termine in ${ort.name} nach Vereinbarung.`)}</span>
        </address>
      </div>
    </section>
  );
}

/** Verweise auf alle Stadtseiten – verbindet /webdesign, /webdesign-worms und die Stadtseiten untereinander */
export function CityLinks({ current, tiles = false, bare = false }: { current?: string; tiles?: boolean; bare?: boolean }) {
  const links = [{ href: "/webdesign-worms", name: "Worms", slug: "worms", image: IMG + "dom-worms-gold.jpg" }, ...ORTE.map((o) => ({ href: ortHref(o.slug), name: o.name, slug: o.slug, image: o.image }))].filter((l) => l.slug !== current);
  const nav = (
        <nav className={`city-links${tiles ? " city-links--tiles" : ""} pm-reveal`} data-reveal="up" aria-label="Webdesign in der Region">
          <span className="city-links__label">Webdesign in der Region</span>
          <ul className="city-links__list">
            {links.map((l) => <li key={l.slug}><Link href={l.href} data-cursor>{tiles && <LinkTileImg src={l.image} />}<span>Webdesign {l.name}</span>{tiles && <Icon name="arrow-right" size={18} className="lt-arrow" />}</Link></li>)}
          </ul>
        </nav>
  );
  if (bare) return nav;
  return (
    <section className="section section--tight">
      <div className="container">{nav}</div>
    </section>
  );
}

/** Stadtseiten: Wirtschaft vor Ort mit Kennzahlen und dem, was eine Website dort leisten sollte (Inhalte je Stadt, keine Vorlage) */
export function WebEconomy({ ort }: { ort: Ort }) {
  return (
    <section className="section section--alt" id="wirtschaft">
      <div className="container">
        <div className="split web-eco">
          <div>
            <SectionHeading eyebrow={`Wirtschaft in ${ort.name}`} title="Was Betriebe" highlight={`in ${ort.name} prägt`} />
            {ort.economy.text.map((t) => <p key={t} className="web-local__text pm-reveal" data-reveal="up">{tidy(t)}</p>)}
          </div>
          <dl className="web-eco__facts pm-reveal" data-reveal="stagger">
            {ort.economy.facts.map((f) => (
              <div key={f.label} className="web-eco__fact"><dt>{f.value}</dt><dd>{tidy(f.label)}</dd></div>
            ))}
          </dl>
        </div>
        <h3 className="web-eco__sub">Was Ihre Website in {ort.name} leisten sollte</h3>
        <ul className="web-eco__needs pm-reveal" data-reveal="stagger">
          {ort.economy.needs.map((n) => (
            <li key={n.title}><Icon name="check" size={18} /><span><b>{n.title}</b>{tidy(n.text)}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Kurze Preisleiste statt der vollen Paketkarten (Stadtseiten): weniger doppelter Text, Details auf /preise */
export function PriceStrip() {
  const items: [string, string][] = [["Start", "199 €"], ["Business", "299 €"], ["Shop / Premium", "nach Angebot"], ["Wartung", "ab 39 € / Monat"]];
  return (
    <section className="section section--tight" id="pakete">
      <div className="container">
        <div className="price-strip pm-reveal" data-reveal="up">
          <span className="price-strip__label">Festpreise</span>
          <ul>{items.map(([n, p]) => <li key={n}><span>{n}</span><b>{p}</b></li>)}</ul>
          <Link href="/preise" className="price-strip__link" data-cursor>Alle Preise und Leistungen <Icon name="arrow-right" size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
