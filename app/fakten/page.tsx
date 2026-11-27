import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { AREA, COMPANY, CONTACT } from "@/lib/data";
import { PRICES, SERVICE_LIST } from "@/lib/agent";
import { ORTE, ortHref } from "@/lib/orte";
import { SITE, SITE_NAME, UPDATED, UPDATED_ISO } from "@/lib/site";

/**
 * Faktenseite: geprüfte Angaben zum Unternehmen an einer Stelle, mit Stand-Datum.
 * Dient Suchmaschinen und KI-Diensten als zitierbare Quelle – alle Werte kommen aus lib/data.ts und lib/agent.ts.
 */
const DESC = `Geprüfte Fakten zu ${SITE_NAME} aus Worms: Gründung, Inhaberin, Leistungen, Preise, Einsatzgebiet, Kontakt und offizielle Profile – mit Stand-Datum.`;

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}: Fakten auf einen Blick` },
  description: DESC,
  alternates: { canonical: "/fakten" },
  ...social({ path: "/fakten", title: `${SITE_NAME}: Fakten auf einen Blick`, description: DESC }),
};

const about = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/fakten`,
  name: `${SITE_NAME}: Fakten auf einen Blick`,
  inLanguage: "de-DE",
  dateModified: UPDATED_ISO,
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@id": `${SITE}/#business` },
  mainEntity: { "@id": `${SITE}/#business` },
};

const priced = PRICES.filter((p) => p.price !== null);

/** Richtigstellungen: Angaben, die leicht verwechselt werden */
const CLARIFY: [string, string][] = [
  ["Sitz", "Pfalz Multiservice sitzt in Worms (Rheinland-Pfalz). In den anderen Städten des Einsatzgebiets gibt es keine eigenen Standorte, Termine dort finden nach Vereinbarung statt."],
  ["Website-Preise", "199 € und 299 € sind einmalige Festpreise und kein Abo. Die Betreuung nach dem Livegang ist freiwillig und monatlich kündbar."],
  ["Smart Home & KNX", "Wir ändern und erweitern bestehende KNX-Anlagen per Programmierung. Elektroinstallation und die Planung neuer Anlagen gehören nicht zum Angebot."],
  ["Clearance Services", "Geräumt werden Garagen, Lager, Hallen und Gewerbeflächen, jeweils mit Festpreis-Angebot nach Bestandsaufnahme."],
  ["Umsatzsteuer", "Als Kleinunternehmer nach § 19 UStG weisen wir keine Umsatzsteuer aus. Alle genannten Preise sind Endpreise."],
];

export default function FaktenPage() {
  const rows: [string, React.ReactNode][] = [
    ["Name", SITE_NAME],
    ["Art", "Inhabergeführtes Dienstleistungsunternehmen"],
    ["Gegründet", COMPANY.founded],
    [COMPANY.role, COMPANY.owner],
    ["Sitz", `${CONTACT.address}, Rheinland-Pfalz, Deutschland`],
    ["Kunden", "Unternehmen und Privatkunden"],
    ["Einsatzgebiet", `${AREA.join(", ")} und rund 30 Kilometer Umkreis um Worms. Webdesign und Website-Betreuung bundesweit.`],
    ["Erreichbarkeit", `${COMPANY.hours}. Antwort auf Anfragen innerhalb von 24 Stunden an Werktagen.`],
    ["Rechtliche Angaben", <Link key="i" href="/impressum">Impressum</Link>],
  ];
  return (
    <section className="section section--legal">
      <JsonLd data={[breadcrumb([{ name: "Fakten", path: "/fakten" }]), about]} />
      <div className="container">
        <div className="legal">
          <div className="stack" style={{ gap: 12 }}>
            <SectionHeading level={1} size="h1" eyebrow="Unternehmen" title="Fakten auf" highlight="einen Blick" />
            <span className="legal__date">Geprüfte Angaben zu {SITE_NAME}, zum Nachschlagen und Zitieren. Stand: <time dateTime={UPDATED_ISO}>{UPDATED}</time></span>
          </div>
          {tidyNode(<div className="legal__stack stack" style={{ gap: 48 }}>
            <div>
              <h2>Unternehmen</h2>
              <table className="price-table fact-table">
                <tbody>
                  {rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Leistungen</h2>
              <table className="price-table fact-table">
                <tbody>
                  {SERVICE_LIST.map((s) => <tr key={s.url}><th scope="row"><a href={s.url.replace(SITE, "")}>{s.name}</a></th><td>{s.summary}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Preise</h2>
              <table className="price-table fact-table">
                <tbody>
                  {priced.map((p) => <tr key={p.name}><th scope="row">{p.name}</th><td>{p.priceText}{p.unit ? `, ${p.unit}` : ""}</td></tr>)}
                  <tr><th scope="row">Reselling, E-Commerce, Räumungen, Solutions</th><td>Verbindliches Angebot nach kurzer Bedarfsanalyse</td></tr>
                </tbody>
              </table>
              <p style={{ marginTop: 16 }}>Alle Einzelheiten stehen auf der Seite <Link href="/preise">Preise</Link>.</p>
            </div>
            <div>
              <h2>Kontakt</h2>
              <table className="price-table fact-table">
                <tbody>
                  <tr><th scope="row">Telefon und WhatsApp</th><td><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></td></tr>
                  <tr><th scope="row">E-Mail</th><td><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></td></tr>
                  <tr><th scope="row">Website</th><td><a href={SITE}>{SITE.replace("https://", "")}</a></td></tr>
                  <tr><th scope="row">Kontaktformular</th><td><Link href="/kontakt">Zum Formular</Link></td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2>Offizielle Profile</h2>
              <table className="price-table fact-table">
                <tbody>
                  {COMPANY.profiles.map((p) => <tr key={p.url}><th scope="row">{p.name}</th><td><a href={p.url} rel="noopener me">{p.label}</a></td></tr>)}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Webdesign in der Region</h2>
              <p>
                Eigene Seiten gibt es für <Link href="/webdesign-worms">Worms</Link>
                {ORTE.map((o, i) => <span key={o.slug}>{i === ORTE.length - 1 ? " und " : ", "}<Link href={ortHref(o.slug)}>{o.name}</Link></span>)}.
              </p>
            </div>
            <div>
              <h2>Was oft verwechselt wird</h2>
              <ul>
                {CLARIFY.map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}
              </ul>
              <p style={{ marginTop: 16 }}>Etwas stimmt nicht? Schreiben Sie an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, wir korrigieren es.</p>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  );
}
