import { social } from "@/lib/social";
import type { Metadata } from "next";
import { IMG, type Faq as FaqItem } from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumb, faqPage } from "@/lib/schema";
import { tidyDeep } from "@/lib/typo";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/home/HomeSections";
import { WebPackages, WebTrust } from "@/components/web/WebSections";
import { WebLocal, WORMS_DISTRICTS, WORMS_NEARBY } from "@/components/web/WebLocal";

/** Lokale Landingpage für „Webdesign Worms“. Die allgemeine Übersicht mit Beispielen und Ablauf liegt unter /webdesign. */
const title = "Webdesign Worms | Website ab 199 € – Pfalz Multiservice";
const description =
  "Webdesigner in Worms: individuelle Websites zum Festpreis ab 199 €, mobil optimiert und für Google vorbereitet. Für Worms, Rheinhessen, Pfalz und Mannheim.";

export const metadata: Metadata = {
  // absolute: der Markenname steht schon im Title, die Vorlage aus dem Layout würde ihn doppeln
  title: { absolute: title },
  description,
  alternates: { canonical: "/webdesign-worms" },
  ...social({ path: "/webdesign-worms", title, description, image: "/og/webdesign.jpg", alt: "Webdesign in Worms von Pfalz Multiservice" }),
};

const FAQ: FaqItem[] = tidyDeep([
  ["Was kostet eine Website in Worms?", "Sie zahlen einen einmaligen Festpreis: Start (OnePager, bis 5 Abschnitte) kostet 199 €, Business (OnePager oder bis 8 Seiten) 299 €. Online-Shops und größere Projekte bieten wir nach Angebot an. Als Kleinunternehmer nach § 19 UStG berechnen wir keine Umsatzsteuer, die Preise sind Endpreise."],
  ["Kann ich Sie in Worms persönlich sprechen?", "Ja. Pfalz Multiservice sitzt in Worms, Termine vereinbaren wir individuell. Vieles lässt sich auch schnell per Telefon, WhatsApp oder E-Mail klären."],
  ["Arbeiten Sie nur für Betriebe aus Worms?", "Nein. Neben der Innenstadt und Stadtteilen wie Horchheim, Pfeddersheim oder Herrnsheim betreuen wir Kunden aus Osthofen, Alzey und ganz Rheinhessen, aus der Pfalz und aus Mannheim."],
  ["Werde ich mit der neuen Website in Worms bei Google gefunden?", "Wir bauen Ihre Seite schnell, mobil optimiert und technisch sauber, mit Ihrem Ort in Titeln, Texten und strukturierten Daten. Eine bestimmte Platzierung kann niemand seriös versprechen. Ein gepflegtes Google-Unternehmensprofil, das auf die Website verlinkt, hilft zusätzlich."],
  ["Für wen ist das Angebot gedacht?", "Für Gewerbetreibende, Selbstständige und Betriebe aus Worms und der Region, die einen eigenen Auftritt zum Festpreis möchten, ohne Abo und mit allen Zugangsdaten in eigener Hand."],
]);

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign in Worms",
  serviceType: "Webdesign",
  url: `${SITE}/webdesign-worms`,
  provider: { "@id": `${SITE}/#business` },
  areaServed: [
    { "@type": "City", name: "Worms" },
    ...WORMS_DISTRICTS.map((name) => ({ "@type": "Place", name: `${name} (Worms)` })),
    ...WORMS_NEARBY.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: "Rheinhessen" },
  ],
  offers: [
    { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "199", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "299", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
  ],
};

export default function WebdesignWormsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, faqPage(FAQ), breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: "Webdesign Worms", path: "/webdesign-worms" }])]) }} />
      <PageHero
        fitTitle
        eyebrow="Pfalz Multiservice · Worms"
        title={<span className="sh__line">Webdesign in Worms</span>}
        highlight="für Betriebe aus der Region"
        intro={"Individuelle Websites zum Festpreis ab 199 €, mobil optimiert und für Google vorbereitet.\nPersönlich betreut von Ihrem Ansprechpartner in Worms."}
        image={IMG + "dom-worms-gold.jpg"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="/webdesign#beispiele">Beispiele ansehen</Button>
      </PageHero>
      <WebTrust />
      <WebLocal />
      <WebPackages />
      <Faq items={FAQ} />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb in Worms.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
