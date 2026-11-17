import { social } from "@/lib/social";
import type { Metadata } from "next";
import { IMG } from "@/lib/data";
import { breadcrumb } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/home/HomeSections";
import { WebExamples } from "@/components/web/WebSections";
import { WebBestOf } from "@/components/web/WebBestOf";

// Webdesign › Referenzen: alle Kundenprojekte und Musterdesigns (auf den anderen Webdesign-Seiten nur die neueste Referenz)
const title = "Referenzen & Musterdesigns";
const description =
  "Referenzen von Pfalz Multiservice: echte Kundenprojekte aus Worms und der Region sowie Musterdesigns für Handwerk, Dienstleister und Unternehmen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/webdesign/referenzen" },
  ...social({ path: "/webdesign/referenzen", title: `${title} · Pfalz Multiservice`, description, image: "/og/webdesign.jpg", alt: "Referenzen von Pfalz Multiservice" }),
};

export default function WebdesignReferenzenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: "Referenzen", path: "/webdesign/referenzen" }])]) }} />
      <PageHero
        fitTitle
        crumbs={[{ label: "Webdesign", href: "/webdesign" }, { label: "Referenzen" }]}
        eyebrow="Referenzen"
        title={<span className="sh__line">Echte Projekte,</span>}
        highlight="echte Betriebe"
        intro={"Kundenprojekte aus der Region und Musterdesigns für viele Branchen.\nJede Website ist einzeln gestaltet, keine kommt aus dem Baukasten."}
        image={IMG + "webdesign-hero.jpg"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="/webdesign/leistungen#pakete">Pakete & Preise</Button>
      </PageHero>
      <WebExamples alt={false} />
      <section className="section section--alt">
        <div className="container"><WebBestOf /></div>
      </section>
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
