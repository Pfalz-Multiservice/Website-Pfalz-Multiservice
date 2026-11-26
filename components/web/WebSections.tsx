import { lines, tidy, tidyNode } from "@/lib/typo";
import { PackageCard } from "./PackageCard";
import { BriefingPreview } from "./BriefingPreview";
import { CarePricing } from "./CarePricing";
import Link from "next/link";
import Image from "next/image";
import { CONTACT, LIVE_REFERENCES, WIP_REFERENCES, WEB_ADDONS, WEB_FAQ, WEB_CARE_NOTES, WEB_PACKAGES, WEB_PROBLEMS, type WebPackage } from "@/lib/data";
import { EXAMPLES_URL } from "@/lib/site";
import { BRANCHEN, brancheHref } from "@/lib/branchen";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ShowcaseList } from "../Showcase";
import { ExampleReel } from "./ExampleReel";
import { EveryPackage } from "./EveryPackage";
import { ProblemStack } from "./ProblemStack";
import { WebBestOf } from "./WebBestOf";

const CHECK_TEXT = "Hallo, bitte prüfen Sie kostenlos meine Website: ";
export const WHATSAPP_CHECK = `${CONTACT.whatsapp}?text=${encodeURIComponent(CHECK_TEXT)}`;

export function WebTrust() {
  const items: [string, string][] = [
    ["Festpreis ab 199 €", "Sie kennen den Preis,\nbevor wir beginnen."],
    ["Kein Abo, kein Zwang", "Domain, Zugänge und Quellcode gehören Ihnen."],
    ["Messbar statt gefühlt", "Auf Wunsch zählen wir Besucher und Anfragen, ohne Cookies."],
    ["Persönlich aus Worms", "Ein fester Ansprechpartner\nstatt Hotline."],
  ];
  return (
    <div className="trust">
      <div className="container trust__grid trust__grid--4 pm-reveal" data-reveal="stagger">
        {items.map(([t, x]) => (
          <div key={t} className="trust__item">
            <Icon name="check" size={24} className="trust__icon" />
            <div>
              <span className="trust__title">{t}</span>
              <span className="trust__text">{lines(x)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebProblem() {
  return (
    <section className="section pst-sec">
      <div className="container pst">
        <div className="pst__intro">
          <SectionHeading eyebrow="Die Realität" title="Warum Websites" highlight="keine Kunden bringen"
            intro="Fast jeder Betrieb hat längst eine Website. Nur bringt sie oft nichts. Meist liegt es an einem dieser vier Punkte." />
        </div>
        <ProblemStack items={WEB_PROBLEMS} />
      </div>
    </section>
  );
}

/** Referenzen: komplett auf /webdesign/referenzen, sonst kurz (neueste Referenz und Link zur Referenzen-Seite) */
export function WebExamples({ compact = false, alt = true }: { compact?: boolean; alt?: boolean }) {
  return (
    <section className={`section${alt ? " section--alt" : ""}`} id="beispiele">
      <div className="container">
        <SectionHeading eyebrow="Designs" title="Unsere" highlight="Referenzen"
          intro="Aktuelle Kundenprojekte und Referenzen." />

        <div className="sc-group">
          <h3 className="sc-group__title">Neueste Referenzen <span>fertig und online</span></h3>
        </div>
        {/* Zwei nebeneinander spart Platz; Kurzform zeigt die zwei neuesten, /webdesign/referenzen alle fertigen */}
        <ShowcaseList grid items={compact ? LIVE_REFERENCES.slice(0, 2) : LIVE_REFERENCES} />

        {compact ? (
          <div style={{ marginTop: 40 }}>
            <Button variant="accent" size="lg" icon="arrow-right" href="/webdesign/referenzen">Alle Referenzen</Button>
          </div>
        ) : <>

        <div className="sc-group sc-group--later">
          <h3 className="sc-group__title">Aktuelle Projekte <span>in Arbeit</span></h3>
        </div>
        <div className="sc-three"><ShowcaseList grid items={WIP_REFERENCES} /></div>

        <div style={{ marginTop: "clamp(72px, 9vw, 112px)" }}><ExampleReel /></div>

        <div style={{ marginTop: 40 }}>
          <Button variant="outline-light" size="lg" href={EXAMPLES_URL}>Alle Designs in der Übersicht</Button>
        </div>
        </>}
      </div>
    </section>
  );
}

function Addon({ a }: { a: { icon: Parameters<typeof Icon>[0]["name"]; title: string; text: string } }) {
  return (
    <li className="addon">
      <span className="addon__icon"><Icon name={a.icon} size={20} /></span>
      <span><b className="addon__title">{a.title}</b><span className="addon__text">{lines(tidy(a.text))}</span></span>
    </li>
  );
}

export function WebPackages() {
  return tidyNode(
    <section className="section" id="pakete">
      <div className="container">
        <SectionHeading eyebrow="Pakete & Preise" title="Was kostet" highlight="eine Website?"
          intro={"Einmaliger Festpreis, von der kompakten Visitenkarte bis zum Online-Shop.\nSie wissen von Anfang an, woran Sie sind."} style={{ marginBottom: 48 }} />
        <div className="pk-grid pm-reveal" data-reveal="stagger">
          {WEB_PACKAGES.map((p) => <PackageCard key={p.name} p={p} />)}
        </div>
        <p className="care__swipe" aria-hidden="true">← wischen für weitere Pakete →</p>

        <EveryPackage />

        <div className="pk-addons pm-reveal" data-reveal="up" id="zusatzleistungen">
          <div className="pk-addons__head">
            <span className="pk-box__eyebrow">Optional zu jedem Paket</span>
            <span className="pk-addons__foot">Preise nennen wir Ihnen im Angebot.</span>
          </div>
          <ul className="addons pk-addons__list">{WEB_ADDONS.map((a) => <Addon key={a.title} a={a} />)}</ul>
        </div>

        <p className="pk-plain pm-reveal" data-reveal="up"><strong>Kein Abo, kein Zwang.</strong> Einmaliger Festpreis ohne versteckte Kosten, die Website gehört Ihnen. Laufend zahlen Sie nur Hosting und Domain, direkt beim Anbieter Ihrer Wahl; den Betrag weisen wir im Angebot getrennt aus.</p>

        <div className="care" id="wartung">
          <SectionHeading eyebrow="Betreuung nach dem Livegang" title="Ihre Website bleibt" highlight="aktuell"
            intro="Freiwillig: Sie melden Ihre Änderungen, wir setzen sie um. Monatlich kündbar." style={{ marginBottom: 40 }} />
          <CarePricing />
          <p className="care__swipe" aria-hidden="true">← wischen für weitere Pakete →</p>
          <div className="platin pm-reveal" data-reveal="up">
            <div className="platin__head">
              <span className="platin__eyebrow">Wartung Platin · Die Rundum-Lösung</span>
              <h3 className="platin__title">Platin</h3>
              <p className="platin__text">Für Portale, Blogs und Plattformen mit laufend neuen Inhalten. Alle Premium-Leistungen, dazu Extras, die wir genau auf Ihr Projekt zuschneiden.</p>
            </div>
            <ul className="platin__list">
              <li>Alle Premium-Leistungen</li>
              <li>Stunden &amp; Umfang nach Bedarf</li>
              <li>Extras individuell zugeschnitten</li>
              <li>Vorrangige Bearbeitung</li>
            </ul>
            <div className="platin__price">
              <strong>Auf Anfrage</strong>
              <span>Individuelles Angebot</span>
              <Link href="/kontakt?leistung=web" className="platin__btn" data-cursor>Platin anfragen</Link>
            </div>
          </div>
          <div className="care__single pm-reveal" data-reveal="up">
            <span><b>Änderungen ohne Paket</b> einmalig 1 Std., reicht in der Regel für die meisten Änderungen</span>
            <strong>39 €</strong>
          </div>
          <p className="care__fine">{WEB_CARE_NOTES.map((n) => <span key={n.title}><b>{n.title}:</b> {n.text}</span>)}</p>
        </div>

        <div className="cta__btns pm-reveal" data-reveal="stagger" style={{ marginTop: 48 }}>
          <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot anfordern</Button>
        </div>
      </div>
    </section>
  );
}

/** Kompakter Hinweis aufs Website-Briefing (unter dem Website-Check, auf der Kontaktseite) */
export function BriefingStrip({ title = "Website geplant?", text = "Füllen Sie unser Website-Briefing aus, in 15 bis 20 Minuten, ohne Zeitdruck und mit Upload für Logo und Fotos. Danach erhalten Sie ein unverbindliches Festpreis-Angebot." }: { title?: string; text?: string }) {
  return tidyNode(
    <div className="bstrip pm-reveal" data-reveal="up">
      <span className="bstrip__icon" aria-hidden="true"><Icon name="clipboard-list" size={26} /></span>
      <div className="bstrip__txt">
        <b>{title}</b>
        <span>{text}</span>
      </div>
      <Button variant="accent" icon="arrow-right" href="/briefing">Briefing starten</Button>
    </div>
  );
}

/** Hinführung zum Online-Briefing: Text links, kleine Formular-Vorschau rechts */
export function WebBriefingTeaser({ alt = true }: { alt?: boolean }) {
  return tidyNode(
    <section className={`section${alt ? " section--alt" : ""}`} id="briefing">
      <div className="container split bft">
        <div className="stack" style={{ gap: 24 }}>
          <SectionHeading eyebrow="Schon entschieden?" title="Starten Sie mit dem" highlight="Website-Briefing"
            intro="Elf kurze Abschnitte zu Ihrem Betrieb, Ihren Zielen und Ihrem Wunsch-Design. Daraus erstellen wir Ihr unverbindliches Festpreis-Angebot." />
          <ul className="bft__facts pm-reveal" data-reveal="stagger">
            <li><Icon name="check" size={16} />ca. 15–20 Minuten, am Handy oder PC</li>
            <li><Icon name="check" size={16} />Kein Zeitlimit: Eingaben bleiben auf Ihrem Gerät gespeichert</li>
            <li><Icon name="check" size={16} />Logo, Fotos und Unterlagen direkt hochladen</li>
            <li><Icon name="check" size={16} />Nur Firma, Ansprechpartner und Kontakt sind Pflicht</li>
          </ul>
          <div className="pm-reveal" data-reveal="up" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button variant="accent" icon="arrow-right" href="/briefing">Briefing ausfüllen</Button>
            <Button variant="outline" href="/kontakt?leistung=web">Lieber erst sprechen</Button>
          </div>
        </div>
        <BriefingPreview />
      </div>
    </section>
  );
}

/** FAQ und kompakter Website-Check nebeneinander, darunter der Briefing-Streifen */
export function WebFaqCheck({ alt = true }: { alt?: boolean }) {
  const points: [string, string][] = [
    ["Darstellung auf dem Smartphone", "Ist alles lesbar, passen Bilder und Tasten, muss man seitlich scrollen?"],
    ["Ladezeit", "Wie schnell lädt die Seite am Handy, und was bremst sie?"],
    ["Auffindbarkeit bei Google", "Titel, Beschreibungen, Überschriften und Indexierung."],
    ["Impressum & Datenschutz", "Sind beide vorhanden, erreichbar und eingebunden?"],
    ["Kontaktwege für Anfragen", "Finden Kunden schnell Telefon, Formular oder WhatsApp?"],
  ];
  return tidyNode(
    <section className={`section${alt ? " section--alt" : ""}`} id="faq">
      <div className="container faqcheck">
        <div className="faqcheck__faq">
          <SectionHeading eyebrow="Häufige Fragen" title="Kurz" highlight="beantwortet" style={{ marginBottom: 28 }} />
          <div className="faq pm-reveal" data-reveal="stagger">
            {WEB_FAQ.map(([q, a]) => (
              <details key={q} className="faq__item">
                <summary className="faq__q" data-cursor>{q}<span className="faq__icon" aria-hidden="true" /></summary>
                <p className="faq__a">{a}</p>
              </details>
            ))}
          </div>
          <p className="faqcheck__more">Ihre Frage ist nicht dabei? Rufen Sie an unter <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> oder schreiben Sie uns per <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.</p>
        </div>
        <aside className="check-card check-card--compact pm-reveal" data-reveal="up" id="website-check" aria-labelledby="wc-title">
          <span className="check-card__eyebrow">Kostenlos & unverbindlich</span>
          <h2 className="check-card__title" id="wc-title">Kostenloser Website-Check</h2>
          <p className="check-card__lead">Sie haben schon eine Website? Schicken Sie uns den Link. Wir sagen Ihnen ehrlich, was wir verbessern würden.</p>
          <div className="check-card__points">
            <span className="check-card__sub">Das prüfen wir</span>
            {points.map(([t, x]) => (
              <details key={t} className="ccp">
                <summary data-cursor><Icon name="check" size={15} /><span>{t}</span><span className="faq__icon" aria-hidden="true" /></summary>
                <p>{x}</p>
              </details>
            ))}
          </div>
          <div className="check-card__btns">
            <Button variant="accent" iconLeft="message-circle" href={WHATSAPP_CHECK} fullWidth>Link per WhatsApp senden</Button>
            <Button variant="outline" iconLeft="mail" href="/kontakt?leistung=web" fullWidth>Per Formular senden</Button>
          </div>
          <p className="check-card__note">Ohne Verpflichtung. Sie entscheiden danach in Ruhe.</p>
        </aside>
      </div>
      <div className="container" style={{ marginTop: 40 }}>
        <BriefingStrip title="Noch keine Website? Oder sollen WIR alles neu gestalten?" text="Dann ist das Website-Briefing der richtige Einstieg: in 15 bis 20 Minuten ausfüllen, Logo und Fotos hochladen, danach erhalten Sie ein unverbindliches Festpreis-Angebot." />
      </div>
    </section>
  );
}

/** Kompakter Teaser für die Startseite: Branchen-Links und das Wichtigste der Handwerk-Seite mit zwei Vorschauen */
export function WebTeaser({ alt = false }: { alt?: boolean }) {
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id="webdesign">
      <div className="container">
        <div className="teaser-head">
          <SectionHeading eyebrow="Webdesign · ab 199 €" title="Websites, die" highlight="wirken"
            intro="Individuell gestaltet, zum Festpreis, persönlich betreut. Kein Abo, kein Zwang." />
          <div className="pm-reveal" data-reveal="up">
            <Button variant="accent" icon="arrow-right" href="/webdesign">Zur Webdesign-Seite</Button>
          </div>
        </div>
        <nav className="city-links teaser-ziel pm-reveal" data-reveal="up" aria-label="Websites nach Zielgruppe">
          <span className="city-links__label">Websites für Ihre Branche</span>
          <ul className="city-links__list">
            {BRANCHEN.map((b) => <li key={b.slug}><Link href={brancheHref(b.slug)} data-cursor>Für {b.tile}</Link></li>)}
          </ul>
        </nav>
        <WebBestOf />
        <p className="showcase-note" style={{ marginTop: 28 }}>Weitere Referenzen und Musterdesigns: <Link href="/webdesign/referenzen" style={{ color: "var(--brand-accent)" }}>Alle{"\u00A0"}Beispiele im{"\u00A0"}Detail</Link></p>
      </div>
    </section>
  );
}
