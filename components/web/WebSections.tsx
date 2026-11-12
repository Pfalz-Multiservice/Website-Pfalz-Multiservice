import { lines, tidy, tidyNode } from "@/lib/typo";
import { PackageCard } from "./PackageCard";
import { BriefingPreview } from "./BriefingPreview";
import { CarePricing } from "./CarePricing";
import Link from "next/link";
import Image from "next/image";
import { CLASSIC_EXAMPLES, CONTACT, EXAMPLES, SHOP_EXAMPLE, WEB_ADDONS, WEB_BASE_ITEMS, WEB_FAQ, WEB_CARE_NOTES, WEB_INCLUDED, WEB_PACKAGES, WEB_PROBLEMS, type WebPackage } from "@/lib/data";
import { EXAMPLES_URL } from "@/lib/site";
import { ExpandText } from "../ExpandText";
import { SectionHeading } from "../SectionHeading";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { ClassicList } from "../ClassicShowcase";
import { ShowcaseList } from "../Showcase";
import { DeliverHandover } from "./DeliverHandover";
import { ProblemStack } from "./ProblemStack";

const CHECK_TEXT = "Hallo, bitte prüfen Sie kostenlos meine Website: ";
export const WHATSAPP_CHECK = `${CONTACT.whatsapp}?text=${encodeURIComponent(CHECK_TEXT)}`;

export function WebTrust() {
  const items: [string, string][] = [
    ["Festpreis ab 99 €", "Sie kennen den Preis,\nbevor wir beginnen."],
    ["Kein Abo, kein Zwang", "Die Website gehört Ihnen."],
    ["Freigabe vor Livegang", "Nichts geht ohne Ihr OK online."],
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
          <div className="pst__cta pm-reveal" data-reveal="up">
            <Button variant="accent" icon="arrow-right" href="#website-check">Kostenloser Website-Check</Button>
            <span>Wir sehen uns Ihre Seite an und sagen ehrlich, was fehlt.</span>
          </div>
          <p className="pst__promise pm-reveal" data-reveal="up">
            <Icon name="shield-check" size={20} />
            <span><b>100 % transparent:</b> Bei uns erhalten Sie alle Projektdaten. Quellcode, Zugänge, Domain, Bilder und Texte. Nichts wird verschwiegen.</span>
          </p>
        </div>
        <ProblemStack items={WEB_PROBLEMS} />
      </div>
    </section>
  );
}

export function WebExamples() {
  return (
    <section className="section section--alt" id="beispiele">
      <div className="container">
        <SectionHeading eyebrow="Designs" title="Unsere" highlight="Beispiele"
          intro="Klassisch mit Menü oder als One-Pager mit Animation." />

        <div className="sc-group">
          <h3 className="sc-group__title">Klassische Websites <span>mit Menü und Unterseiten</span></h3>
        </div>
        <ClassicList grid />

        <div className="sc-group sc-group--later">
          <h3 className="sc-group__title">One-Pager <span>alles auf einer Seite, mit Animationen</span></h3>
        </div>
        <ShowcaseList offset={CLASSIC_EXAMPLES.length} grid />

        <div style={{ marginTop: 64, textAlign: "center" }}>
          <Button variant="outline-light" size="lg" href={EXAMPLES_URL}>Alle Musterdesigns in der Übersicht</Button>
        </div>

        {tidyNode(<p className="showcase-note" style={{ margin: "40px auto 0", textAlign: "center" }}>
          <span className="line">Alle gezeigten Betriebe, Personen und Angebote sind frei erfunden.</span>
          <span className="line">Die Seiten sind Musterdesigns von Pfalz Multiservice.</span>
        </p>)}
      </div>
    </section>
  );
}

/** Ohne Aufpreis: zwei gegenläufige Laufbänder statt langer Liste (bei reduzierter Bewegung statisch umbrechend) */
function IncludedMarquee() {
  const n = Math.ceil(WEB_INCLUDED.length / 3);
  const rows = [0, 1, 2].map((r) => WEB_INCLUDED.slice(r * n, r * n + n));
  return (
    <div className="marq">
      <ul className="sr-only">{WEB_INCLUDED.map((x) => <li key={x}>{x.replace(/\n/g, " ")}</li>)}</ul>
      {rows.map((row, r) => (
        <div key={r} className={`marq__row ${r % 2 ? "marq__row--rev" : ""}`} aria-hidden="true">
          <div className="marq__track">
            {[0, 1].map((dup) => row.map((x) => (
              <span key={`${dup}-${x}`} className={`marq__chip ${dup ? "marq__chip--dup" : ""}`}>
                <Icon name="check" size={14} />{x.replace(/\n/g, " ")}
              </span>
            )))}
          </div>
        </div>
      ))}
    </div>
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
        <SectionHeading align="center" eyebrow="Pakete & Preise" title="Was kostet" highlight="eine Website?"
          intro={"Einmaliger Festpreis, von der kompakten Visitenkarte bis zum Online-Shop.\nSie wissen von Anfang an, woran Sie sind."} style={{ marginBottom: 48 }} />
        <div className="pk-grid pm-reveal" data-reveal="stagger">
          {WEB_PACKAGES.map((p) => <PackageCard key={p.name} p={p} />)}
        </div>
        <p className="care__swipe" aria-hidden="true">← wischen für weitere Pakete →</p>

        <div className="pk-incl">
          <div className="pk-box pk-box--incl pm-reveal" data-reveal="up" id="inklusive">
            <span className="pk-box__eyebrow">In allen Paketen inklusive</span>
            <h3 className="pk-box__title">Ohne Aufpreis</h3>
            <p className="pk-box__intro">Damit Ihre Website von Anfang an gefunden wird und Anfragen bringt.</p>
            <IncludedMarquee />
          </div>
          <div className="pk-box pk-box--sm pm-reveal" data-reveal="up" id="zusatzleistungen">
            <span className="pk-box__eyebrow">Optional zu jedem Paket</span>
            <h3 className="pk-box__title">Zusatzleistungen</h3>
            <ul className="addons addons--sm">{WEB_ADDONS.map((a) => <Addon key={a.title} a={a} />)}</ul>
            <p className="pk-box__foot">Preise nennen wir Ihnen im Angebot.</p>
          </div>
        </div>

        <div className="pk-free pm-reveal" data-reveal="up">
          <Icon name="file-check" size={26} />
          <p><strong>Kein Abo, kein Zwang.</strong> Einmaliger Festpreis, keine versteckten Kosten, die Website gehört Ihnen. Laufende Kosten entstehen nur für Hosting und Domain: Die zahlen Sie direkt beim Anbieter Ihrer Wahl, den Betrag weisen wir im Angebot getrennt aus. Die Einrichtung übernehmen wir in Wartung Pro und Premium; in Premium ist das Hosting bei uns enthalten.</p>
        </div>

        <DeliverHandover />

        <div className="care" id="wartung">
          <SectionHeading align="center" eyebrow="Betreuung nach dem Livegang" title="Ihre Website bleibt" highlight="aktuell"
            intro="Freiwillig: Sie melden Ihre Änderungen, wir setzen sie um. Monatlich kündbar." style={{ marginBottom: 40 }} />
          <CarePricing />
          <p className="care__swipe" aria-hidden="true">← wischen für weitere Pakete →</p>
          <ul className="care__notes pm-reveal" data-reveal="stagger">
            {WEB_CARE_NOTES.map((n) => (
              <li key={n.title} className="care__note"><b>{n.title}</b><span>{n.text}</span></li>
            ))}
          </ul>
          <div className="care__single pm-reveal" data-reveal="up">
            <span><b>Änderungen ohne Paket</b> einmalig 1 Std., reicht in der Regel für die meisten Änderungen</span>
            <strong>29 €</strong>
          </div>
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
export function WebBriefingTeaser() {
  return tidyNode(
    <section className="section section--alt" id="briefing">
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
export function WebFaqCheck() {
  const points: [string, string][] = [
    ["Darstellung auf dem Smartphone", "Ist alles lesbar, passen Bilder und Tasten, muss man seitlich scrollen?"],
    ["Ladezeit", "Wie schnell lädt die Seite am Handy, und was bremst sie?"],
    ["Auffindbarkeit bei Google", "Titel, Beschreibungen, Überschriften und Indexierung."],
    ["Impressum & Datenschutz", "Sind beide vorhanden, erreichbar und eingebunden?"],
    ["Kontaktwege für Anfragen", "Finden Kunden schnell Telefon, Formular oder WhatsApp?"],
  ];
  return tidyNode(
    <section className="section section--alt" id="faq">
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

/** Kompakter Teaser für Startseite und Leistungsseite: Referenz-Wand mit allen Beispielen */
export function WebTeaser({ alt = false }: { alt?: boolean }) {
  const all: { slug: string; name: string; branch: string; href: string; img: string }[] = [
    ...CLASSIC_EXAMPLES.map((e) => ({ slug: e.slug, name: e.name, branch: e.branch, href: `${EXAMPLES_URL}/${e.slug}${e.pages[0].path}`, img: `/images/beispiele/${e.slug}-${e.pages[0].key}.png` })),
    ...EXAMPLES.map((e) => ({ slug: e.slug, name: e.name, branch: e.branch, href: `${EXAMPLES_URL}/${e.slug}`, img: `/images/beispiele/${e.slug}-scroll.png` })),
  ];
  // Feste Reihenfolge auf der Startseite: Fliesenleger, Elektriker, Weingut, Umraum, Restaurant, Honigstück
  const order = ["fliesenleger", "elektriker", "weingut", "beratungsbuero", "restaurant", "seifenmanufaktur"];
  const rank = (slug: string) => { const i = order.indexOf(slug); return i < 0 ? order.length : i; };
  const shots = [...all].sort((a, b) => rank(a.slug) - rank(b.slug));
  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id="webdesign">
      <div className="container">
        <div className="teaser-head">
          <SectionHeading eyebrow="Webdesign · ab 99 €" title="Websites, die" highlight="wirken"
            intro="Individuell gestaltet, zum Festpreis, persönlich betreut. Kein Abo, kein Zwang. Hier eine Auswahl unserer Musterdesigns." />
          <div className="pm-reveal" data-reveal="up">
            <Button variant="accent" icon="arrow-right" href="/webdesign">Zur Webdesign-Seite</Button>
          </div>
        </div>
        <div className="wall-feature pm-reveal" data-reveal="up">
          <a className="wall-feature__img" href={`${EXAMPLES_URL}/${SHOP_EXAMPLE.slug}`} target="_blank" rel="noopener" data-cursor aria-label={`${SHOP_EXAMPLE.name} live ansehen (öffnet in neuem Tab)`}>
            <div className="sc-browser__bar" aria-hidden="true"><span className="sc-browser__dots"><i /><i /><i /></span></div>
            <div className="wall-feature__view"><Image src={`/images/beispiele/${SHOP_EXAMPLE.slug}-start.png`} alt={`Vorschau ${SHOP_EXAMPLE.name}`} fill sizes="(max-width: 900px) 100vw, 620px" /></div>
          </a>
          <div className="wall-feature__copy">
            <span className="wall-feature__badge">Neu · Shop-Design</span>
            <h3 className="wall-feature__title">{SHOP_EXAMPLE.name}</h3>
            <span className="sc-branch">{SHOP_EXAMPLE.branch}</span>
            <ExpandText text={tidy("Ein Erlebnis-Shop mit Holo-Karten, Booster zum Aufreißen und 3D-Gacha. Dazu alles, was ein Shop braucht: Filter, Live-Suche, Warenkorb, Vorbestellungen und Ankauf.")} />
            <div className="wall-feature__actions">
              <Button variant="accent" icon="arrow-right" href="/webdesign#shop-design">Was ein Shop kann</Button>
              <a className="btn btn--outline-light" href={`${EXAMPLES_URL}/${SHOP_EXAMPLE.slug}`} target="_blank" rel="noopener" data-cursor>
                <span className="btn__fill" aria-hidden="true" />
                <span className="btn__label">Live ansehen <Icon name="external-link" size={17} className="btn__icon btn__icon--right" /></span>
              </a>
            </div>
          </div>
        </div>
        <div className="wall pm-reveal" data-reveal="cards">
          {shots.map((s) => (
            <a key={s.href} className="wall__item pm-card" href={s.href} target="_blank" rel="noopener" data-cursor aria-label={`${s.name} live ansehen (öffnet in neuem Tab)`}>
              <div className="wall__frame">
                <div className="sc-browser__bar" aria-hidden="true"><span className="sc-browser__dots"><i /><i /><i /></span></div>
                <div className="wall__view"><div className="card__parallax"><Image src={s.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 560px" /></div></div>
              </div>
              <span className="wall__meta"><b>{s.name}</b>{s.branch}<Icon name="external-link" size={15} /></span>
            </a>
          ))}
        </div>
        <p className="showcase-note" style={{ marginTop: 28 }}>Musterdesigns für erfundene Betriebe. <Link href="/webdesign#beispiele" style={{ color: "var(--brand-accent)" }}>Alle{"\u00A0"}Beispiele im{"\u00A0"}Detail</Link></p>
      </div>
    </section>
  );
}
