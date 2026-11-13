import { social } from "@/lib/social";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { IMG, WEB_FAQ, WEB_STEPS } from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumb, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/HomeSections";
import { WebBriefingTeaser, WebExamples, WebFaqCheck, WebPackages, WebProblem, WebTrust } from "@/components/web/WebSections";
import { ShopShowcase } from "@/components/web/ShopShowcase";
import { LayerBuild } from "@/components/web/LayerBuild";
import { WormsTeaser } from "@/components/web/WebLocal";

// Allgemeine Übersicht – „Webdesign Worms“ hat eine eigene Seite (/webdesign-worms), damit sich beide nicht Konkurrenz machen
const title = "Website erstellen lassen ab 199 €";
const description =
  "Website erstellen lassen: individuelles Webdesign zum Festpreis ab 199 €, ohne Abo. Musterdesigns, Pakete, Ablauf und Wartung im Überblick.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/webdesign" },
  ...social({ path: "/webdesign", title: `${title} · Pfalz Multiservice`, description, image: "/og/webdesign.jpg", alt: "Webdesign von Pfalz Multiservice" }),
};

const faqLd = faqPage(WEB_FAQ);
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Webdesign & Website-Erstellung",
  serviceType: "Webdesign",
  provider: { "@id": `${SITE}/#business` },
  areaServed: ["Worms", "Rheinhessen", "Pfalz", "Mannheim"],
  offers: [
    { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "199", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "299", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    ...[["Wartung", "39", "Bis 1 Std. Änderungen pro Monat"], ["Wartung Pro", "59", "Bis 2 Std. Änderungen pro Monat"], ["Wartung Premium", "99", "Bis 3 Std. Änderungen pro Monat"]].map(([name, price, description]) => ({
      "@type": "Offer", name, priceCurrency: "EUR", description: `${description}, monatlich kündbar`,
      priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "EUR", unitText: "Monat" },
    })),
  ],
};

export default function WebdesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, serviceLd, breadcrumb([{ name: "Webdesign", path: "/webdesign" }])]) }} />
      <PageHero
        fitTitle
        eyebrow="Webdesign aus Worms"
        title={<span className="sh__line">Websites,</span>}
        highlight="die Anfragen bringen"
        intro={"Individuell gestaltet, zum fairen Festpreis und persönlich betreut.\nFür Betriebe, Selbstständige und Vereine in Worms und der Pfalz."}
        image={IMG + "webdesign-hero.jpg"}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#beispiele">Referenzen ansehen</Button>
        <Link href="/briefing" className="hero-brief" data-cursor>
          <Icon name="clipboard-list" size={18} />
          <span>Schon entschieden? <b>Direkt zum Website-Briefing</b></span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </PageHero>
      <WebTrust />
      <WebProblem />
      <LayerBuild />
      <ShopShowcase />
      <WebExamples />
      <WebPackages />
      <WebBriefingTeaser />
      <Process steps={WEB_STEPS} eyebrow="So läuft’s ab" title="In 5 Schritten zur" highlight="Website" />
      <WebFaqCheck />
      <WormsTeaser />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
