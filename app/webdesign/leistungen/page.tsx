import { social } from "@/lib/social";
import type { Metadata } from "next";
import { IMG, WEB_STEPS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumb } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/HomeSections";
import { WebBriefingTeaser, WebFaqCheck, WebPackages, WebProblem, WebTrust } from "@/components/web/WebSections";
import { LayerBuild } from "@/components/web/LayerBuild";
import { BranchenLinks, WebStufen } from "@/components/web/WebBranchen";
import { CityLinks } from "@/components/web/WebLocal";

// Webdesign › Leistungen: alles zur Website-Erstellung mit Paketen, Betreuung und Ablauf.
// Die Branchenseiten liegen darunter (/webdesign/leistungen/handwerker, …/unternehmen).
const title = "Webdesign-Leistungen & Pakete ab 199 €";
const description =
  "Was wir für Ihre Website tun: Gestaltung, Texte, Pakete ab 199 €, Betreuung ab 39 € im Monat und der Ablauf in fünf Schritten. Persönlich aus Worms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/webdesign/leistungen" },
  ...social({ path: "/webdesign/leistungen", title: `${title} · Pfalz Multiservice`, description, image: "/og/webdesign.jpg", alt: "Webdesign-Leistungen von Pfalz Multiservice" }),
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  url: `${SITE}/webdesign/leistungen`,
  name: "Webdesign & Website-Erstellung",
  serviceType: "Webdesign",
  provider: { "@id": `${SITE}/#business` },
  areaServed: ["Worms", "Rheinhessen", "Pfalz", "Mannheim"],
  offers: [
    { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "199", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "299", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    ...[["Wartung", "39", "Bis 1 Std. Änderungen pro Monat"], ["Wartung Pro", "59", "Bis 2 Std. Änderungen pro Monat"], ["Wartung Premium", "99", "Bis 3 Std. pro Monat für Google-Unternehmensprofil, Anfrageformular, Bewertungen und monatliche Auswertung"]].map(([name, price, description]) => ({
      "@type": "Offer", name, priceCurrency: "EUR", description: `${description}, monatlich kündbar`,
      priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", unitText: "Monat" },
    })),
  ],
};

export default function WebdesignLeistungenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: "Leistungen", path: "/webdesign/leistungen" }])]) }} />
      <PageHero
        fitTitle
        crumbs={[{ label: "Webdesign", href: "/webdesign" }, { label: "Leistungen" }]}
        eyebrow="Leistungen & Pakete"
        title={<span className="sh__line">Ihre Website,</span>}
        highlight="von A bis Z"
        intro={"Gestaltung, Texte, Technik und Betreuung aus einer Hand.\nMit Festpreis, klaren Paketen und einem festen Ansprechpartner in Worms."}
        image={IMG + "webdesign-buero.jpg"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#pakete">Zu den Paketen</Button>
      </PageHero>
      <WebTrust />
      <BranchenLinks label="Websites für Ihre Branche" />
      <CityLinks />
      <WebProblem />
      <WebStufen />
      <LayerBuild />
      <WebPackages />
      <WebBriefingTeaser />
      <Process steps={WEB_STEPS} eyebrow="So läuft’s ab" title="In 5 Schritten zur" highlight="Website" id="ablauf" />
      <WebFaqCheck />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
