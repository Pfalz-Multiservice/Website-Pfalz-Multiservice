import { social } from "@/lib/social";
import type { Metadata } from "next";
import { IMG, WEB_FAQ } from "@/lib/data";
import { breadcrumb, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/home/HomeSections";
import { WebBriefingTeaser, WebExamples, WebFaqCheck, WebTrust } from "@/components/web/WebSections";
import { CityLinks, WormsTeaser } from "@/components/web/WebLocal";
import { WebBranchen, WebStufen } from "@/components/web/WebBranchen";

// Übersicht des Webdesign-Bereichs (Branchen, Referenzen, Weg, Briefing, Fragen); Details und Preise stehen auf /webdesign/leistungen.
// Allgemeine Übersicht – „Webdesign Worms“ hat eine eigene Seite (/webdesign-worms), damit sich beide nicht Konkurrenz machen
const title = "Website erstellen lassen ab 199 €";
const description =
  "Website erstellen lassen: individuelles Webdesign zum Festpreis ab 199 €, ohne Abo. Branchen, Referenzen und häufige Fragen im Überblick.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/webdesign" },
  ...social({ path: "/webdesign", title: `${title} · Pfalz Multiservice`, description, image: "/og/webdesign.jpg", alt: "Webdesign von Pfalz Multiservice" }),
};

const faqLd = faqPage(WEB_FAQ);

export default function WebdesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, breadcrumb([{ name: "Webdesign", path: "/webdesign" }])]) }} />
      <PageHero
        reviews
        fitTitle
        crumbs={[{ label: "Webdesign" }]}
        eyebrow="Webdesign aus Worms"
        title={<span className="sh__line">Websites,</span>}
        highlight="die Anfragen bringen"
        intro={"Individuell gestaltet, zum fairen Festpreis und persönlich betreut.\nFür Betriebe, Selbstständige und Vereine in Worms und der Pfalz."}
        image={IMG + "webdesign-hero.jpg"}
        imageFocus="100% 50%"
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="/webdesign/leistungen">Leistungen & Pakete</Button>
      </PageHero>
      <WebTrust />
      <WebBranchen alt />
      <WebExamples compact alt={false} />
      <WebStufen />
      <WebBriefingTeaser alt={false} />
      <WebFaqCheck />
      <WormsTeaser />
      <CityLinks current="worms" tiles />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
