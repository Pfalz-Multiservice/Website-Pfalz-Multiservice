import { social } from "@/lib/social";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IMG } from "@/lib/data";
import { BRANCHEN, brancheHref } from "@/lib/branchen";
import { SITE } from "@/lib/site";
import { breadcrumb, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/home/HomeSections";
import { WebExamples, WebPackages, WebTrust } from "@/components/web/WebSections";
import { BrancheGewerke, BrancheIntro, BrancheRechnung, BranchenLinks, WebStufen } from "@/components/web/WebBranchen";

/** Zielgruppenseiten „Website für <Zielgruppe>“ (Handwerker, Dienstleister mit Firmenkunden). Inhalte stehen in lib/branchen.ts. */
export function generateStaticParams() {
  return BRANCHEN.map((b) => ({ slug: b.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = BRANCHEN.find((x) => x.slug === slug);
  if (!b) return {};
  const title = `Website für ${b.name} | ab 199 € – Pfalz Multiservice`;
  return {
    // absolute: der Markenname steht schon im Title, die Vorlage aus dem Layout würde ihn doppeln
    title: { absolute: title },
    description: b.description,
    alternates: { canonical: brancheHref(b.slug) },
    ...social({ path: brancheHref(b.slug), title, description: b.description, image: "/og/webdesign.jpg", alt: `Webdesign für ${b.name} von Pfalz Multiservice` }),
  };
}

export default async function WebdesignBranchePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = BRANCHEN.find((x) => x.slug === slug);
  if (!b) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Webdesign für ${b.name}`,
    serviceType: "Webdesign",
    url: `${SITE}${brancheHref(b.slug)}`,
    provider: { "@id": `${SITE}/#business` },
    audience: { "@type": "BusinessAudience", name: b.name },
    areaServed: ["Worms", "Rheinhessen", "Pfalz", "Mannheim"],
    offers: [
      { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "199", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
      { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "299", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, faqPage(b.faq), breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: `Website für ${b.name}`, path: brancheHref(b.slug) }])]) }} />
      <PageHero
        fitTitle
        wide
        eyebrow={`Webdesign für ${b.name}`}
        title={<span className="sh__line">Ihre Website,</span>}
        highlight="die Anfragen bringt"
        intro={`Individuell gestaltet für ${b.name}, zum Festpreis ab 199 € und ohne Abo.\nPersönlich betreut von Ihrem Ansprechpartner in Worms.`}
        image={b.image}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#beispiele">Referenzen ansehen</Button>
      </PageHero>
      <WebTrust />
      <BrancheIntro b={b} />
      <BrancheGewerke b={b} />
      <WebStufen alt={false} />
      <BrancheRechnung />
      <WebExamples />
      <WebPackages />
      <Faq items={b.faq} alt />
      <BranchenLinks current={b.slug} />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
