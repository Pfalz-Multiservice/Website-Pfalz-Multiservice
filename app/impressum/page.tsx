import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Pfalz Multiservice, einem Angebot von Pfalz Loadout, Inhaberin Jasmin Beer, Wormser Landstraße 117, 67551 Worms.",
  alternates: { canonical: "/impressum" },
  ...social({ path: "/impressum", title: "Impressum · Pfalz Multiservice", description: "Impressum von Pfalz Multiservice, einem Angebot von Pfalz Loadout, Inhaberin Jasmin Beer, Wormser Landstraße 117, 67551 Worms." }),
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="section section--legal">
      <JsonLd data={breadcrumb([{ name: "Impressum", path: "/impressum" }])} />
      <div className="container">
        <div className="legal">
          <SectionHeading level={1} size="h1" eyebrow="Rechtliches" title="" highlight="Impressum" />
          {tidyNode(<div className="legal__stack stack pm-reveal" data-reveal="stagger" style={{ gap: 48 }}>
            <div>
              <h2>Angaben gemäß § 5 DDG</h2>
              <p>Pfalz Multiservice ist ein Angebot von:<br />Pfalz Loadout<br />Wormser Landstraße 117, 67551 Worms, Deutschland</p>
            </div>
            <div>
              <h2>Inhaberin:</h2>
              <p>Jasmin Beer</p>
            </div>
            <div>
              <h2>Kontakt:</h2>
              <p>Telefon: <a href="tel:+491605086983">+49 160 5086983</a><br />E-Mail: <a href="mailto:kontakt@pfalz-multiservice.de">kontakt@pfalz-multiservice.de</a></p>
            </div>
            <div>
              <h2>Umsatzsteuer:</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE444410908</p>
              <p>Kleinunternehmer gemäß § 19 UStG, daher wird keine Umsatzsteuer ausgewiesen.</p>
            </div>
            <div>
              <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h2>
              <p>Jasmin Beer<br />Wormser Landstraße 117, 67551 Worms</p>
            </div>
            <div><p>Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.</p></div>
          </div>)}
        </div>
      </div>
    </section>
  );
}
