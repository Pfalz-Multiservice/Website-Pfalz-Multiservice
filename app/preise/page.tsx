import { social } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { PRICES } from "@/lib/agent";
import { SITE } from "@/lib/site";

const DESC = "Alle Preise von Pfalz Multiservice auf einen Blick: Websites ab 199 €, Website-Betreuung ab 39 € im Monat, KNX-Änderungen ab 59 €.";

export const metadata: Metadata = {
  title: "Preise",
  description: DESC,
  alternates: { canonical: "/preise" },
  ...social({ path: "/preise", title: "Preise · Pfalz Multiservice", description: DESC }),
};

const groups = [...new Set(PRICES.map((p) => p.group))];

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

export default function PreisePage() {
  return (
    <section className="section section--legal">
      <JsonLd data={[breadcrumb([{ name: "Preise", path: "/preise" }]), offers]} />
      <div className="container">
        <div className="legal">
          <SectionHeading level={1} size="h1" eyebrow="Übersicht" title="" highlight="Preise" />
          <p>Festpreise kennen Sie vor dem Start. Alle Betreuungspakete sind monatlich kündbar. Als Kleinunternehmer nach § 19 UStG weisen wir keine Umsatzsteuer aus.</p>
          {groups.map((g) => (
            <div key={g}>
              <h2>{g}</h2>
              <table className="price-table">
                <tbody>
                  {PRICES.filter((p) => p.group === g).map((p) => (
                    <tr key={p.name}>
                      <th scope="row"><a href={p.url.replace(SITE, "")}>{p.name}</a><br /><small>{p.note}</small></th>
                      <td><strong>{p.priceText}</strong><br /><small>{p.unit}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <p>Fragen zu einem Angebot? <Link href="/kontakt">Schreiben Sie uns</Link>, wir antworten innerhalb von 24 Stunden (werktags).</p>
        </div>
      </div>
    </section>
  );
}
