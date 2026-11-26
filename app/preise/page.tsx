import { social } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { PRICES } from "@/lib/agent";
import { SITE } from "@/lib/site";
import { WEB_ADDONS, WEB_CARE, WEB_CARE_NOTES, WEB_EVERY, WEB_PACKAGES, type WebPackage } from "@/lib/data";

const DESC = "Alle Preise von Pfalz Multiservice auf einen Blick: Websites ab 199 €, Website-Betreuung ab 39 € im Monat, KNX-Änderungen ab 59 €.";

export const metadata: Metadata = {
  title: "Preise für Webdesign & KNX in Worms",
  description: DESC,
  alternates: { canonical: "/preise" },
  ...social({ path: "/preise", title: "Preise für Webdesign & KNX in Worms · Pfalz Multiservice", description: DESC }),
};

const offers = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE}/preise#preise`,
  name: "Preise Pfalz Multiservice",
  url: `${SITE}/preise`,
  itemListElement: PRICES.filter((p) => p.price !== null).map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.note,
    price: p.price,
    priceCurrency: "EUR",
    url: p.url,
    seller: { "@id": `${SITE}/#business` },
    itemOffered: { "@type": "Service", name: p.name },
  })),
};

// Zeilenumbruch-Zeichen aus den Kartentexten (Zeilentrenner U+2028) im Fließtext als Leerzeichen
const flat = (s: string) => s.replace(/\u2028/g, " ");

/** Aufklappbare Preiszeile: oben Name, Kurzbeschreibung und Preis, darunter die Leistungen */
function Row({ title, sub, price, unit, children, open = false }: { title: string; sub?: string; price: string; unit?: React.ReactNode; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="pz" open={open}>
      <summary className="pz__sum" data-cursor>
        <span className="pz__name"><b>{title}</b>{sub && <small>{sub}</small>}</span>
        <span className="pz__price"><strong>{price}</strong>{unit && <small>{unit}</small>}</span>
        <Icon name="chevron-down" size={18} className="pz__chev" />
      </summary>
      <div className="pz__body">{children}</div>
    </details>
  );
}

function Items({ p }: { p: WebPackage }) {
  return (
    <>
      <p className="pz__lead">{flat(p.note)}</p>
      <ul className="pz__list">{p.items.map((it) => <li key={it}><Icon name={p.plus ? "circle-plus" : "check"} size={16} />{flat(it)}</li>)}</ul>
    </>
  );
}

export default function PreisePage() {
  return (
    <section className="section section--legal">
      <JsonLd data={[breadcrumb([{ name: "Preise", path: "/preise" }]), offers]} />
      <div className="container">
        <div className="legal preise">
          <SectionHeading level={1} size="h1" eyebrow="Übersicht" title="" highlight="Preise" />
          <p>Festpreise kennen Sie vor dem Start. Alle Betreuungspakete sind monatlich kündbar, bei Jahreszahlung nutzen Sie 12 Monate und zahlen 10. Als Kleinunternehmer nach § 19 UStG weisen wir keine Umsatzsteuer aus. Klicken Sie auf einen Punkt, um alle Leistungen zu sehen.</p>

          <div>
            <h2>Website (einmalig)</h2>
            {WEB_PACKAGES.map((p, i) => (
              <Row key={p.name} title={`Website ${p.name}`} sub={p.tagline} price={p.price} unit={p.unit} open={i === 0}>
                <Items p={p} />
                {i === 0 && <p className="pz__hint">Dazu in jedem Paket alles unter „In jedem Website-Paket enthalten“.</p>}
              </Row>
            ))}
          </div>

          <div>
            <h2>In jedem Website-Paket enthalten</h2>
            {WEB_EVERY.map((g) => (
              <Row key={g.id} title={g.title} sub={`${g.items.length} Leistungen`} price="inklusive">
                {g.note && <p className="pz__lead">{g.note}</p>}
                <ul className="pz__list">
                  {g.items.map((it) => <li key={it.title}><Icon name="check" size={16} /><span><b>{it.title}</b>{it.text && <>: {it.text}</>}</span></li>)}
                </ul>
              </Row>
            ))}
          </div>

          <div>
            <h2>Zusatzleistungen</h2>
            <p className="pz__intro">Optional zu jedem Paket. Den Preis nennen wir Ihnen im Angebot.</p>
            {WEB_ADDONS.map((a) => (
              <Row key={a.title} title={a.title} price="nach Angebot">
                <p className="pz__lead">{a.text.replace(/\n/g, " ")}</p>
              </Row>
            ))}
          </div>

          <div id="wartung">
            <h2>Website-Betreuung (monatlich kündbar)</h2>
            {WEB_CARE.map((p) => (
              <Row key={p.name} title={p.name} sub={flat(p.note)} price={p.price} unit={<>pro Monat<br />jährlich {p.priceYear}</>}>
                <ul className="pz__list">{p.items.map((it) => <li key={it}><Icon name="check" size={16} />{flat(it)}</li>)}</ul>
              </Row>
            ))}
            <ul className="pz__notes">
              {WEB_CARE_NOTES.map((n) => <li key={n.title}><b>{n.title}:</b> {n.text}</li>)}
            </ul>
          </div>

          <div>
            <h2>Einzelleistungen</h2>
            {PRICES.filter((p) => p.group === "Einzelleistungen").map((p) => (
              <Row key={p.name} title={p.name} price={p.priceText} unit={p.unit}>
                <p className="pz__lead">{p.note}</p>
                <p><a href={p.url.replace(SITE, "")}>Mehr dazu</a></p>
              </Row>
            ))}
          </div>

          <div>
            <h2>Nach Angebot</h2>
            {PRICES.filter((p) => p.group === "Nach Angebot").map((p) => (
              <Row key={p.name} title={p.name} price={p.priceText} unit={p.unit}>
                <p className="pz__lead">{p.note}</p>
              </Row>
            ))}
          </div>

          <p>Fragen zu einem Angebot? <Link href="/kontakt">Schreiben Sie uns</Link>, wir antworten innerhalb von 24 Stunden (werktags). Alle Pakete im Detail finden Sie unter <Link href="/webdesign/leistungen#pakete">Webdesign › Leistungen</Link>.</p>
        </div>
      </div>
    </section>
  );
}
