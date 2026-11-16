import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { AREA, COMPANY, CONTACT } from "@/lib/data";
import { SERVICE_LIST } from "@/lib/agent";
import { SITE } from "@/lib/site";

const DESC = `Pfalz Multiservice aus Worms: inhabergeführt seit ${COMPANY.founded}, ein Ansprechpartner für Webdesign, Reselling, E-Commerce, Räumungen und KNX.`;

export const metadata: Metadata = {
  title: "Über uns",
  description: DESC,
  alternates: { canonical: "/ueber-uns" },
  ...social({ path: "/ueber-uns", title: "Über uns · Pfalz Multiservice", description: DESC }),
};

const about = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/ueber-uns`,
  name: "Über Pfalz Multiservice",
  about: { "@id": `${SITE}/#business` },
};

export default function UeberUnsPage() {
  return (
    <section className="section section--legal">
      <JsonLd data={[breadcrumb([{ name: "Über uns", path: "/ueber-uns" }]), about]} />
      <div className="container">
        <div className="legal">
          <SectionHeading level={1} size="h1" eyebrow="Unternehmen" title="Über" highlight="uns" />
          {tidyNode(<div className="legal__stack stack" style={{ gap: 48 }}>
            <div>
              <h2>Wer wir sind</h2>
              <p>Pfalz Multiservice ist ein inhabergeführtes Dienstleistungsunternehmen aus Worms. {COMPANY.owner} hat es {COMPANY.founded} gegründet und ist bis heute Ihre direkte Ansprechpartnerin. Wir arbeiten für Unternehmen und Privatkunden in Worms und Umgebung, Webdesign und Website-Betreuung auch bundesweit.</p>
            </div>
            <div>
              <h2>Was wir machen</h2>
              <ul>
                {SERVICE_LIST.map((s) => <li key={s.url}><a href={s.url.replace(SITE, "")}>{s.name}</a>: {s.summary}</li>)}
              </ul>
            </div>
            <div>
              <h2>Wie wir arbeiten</h2>
              <p>Sie bekommen vor dem Start ein verbindliches Angebot und kennen den Preis, bevor wir beginnen. Auf Anfragen antworten wir innerhalb von 24 Stunden an Werktagen. Termine nach Vereinbarung. Alle aktuellen Preise stehen auf der Seite <Link href="/preise">Preise</Link>.</p>
            </div>
            <div>
              <h2>Einsatzgebiet</h2>
              <p>{AREA.join(", ")} und rund 30 Kilometer Umkreis um Worms.</p>
            </div>
            <div>
              <h2>Kontakt</h2>
              <p>Telefon und WhatsApp: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />E-Mail: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br /><Link href="/kontakt">Zum Kontaktformular</Link> · <Link href="/impressum">Impressum</Link></p>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  );
}
