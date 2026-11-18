import { social } from "@/lib/social";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IMG } from "@/lib/data";
import { ORTE, ortHref } from "@/lib/orte";
import { SITE } from "@/lib/site";
import { breadcrumb, faqPage } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/home/HomeSections";
import { WebExamples, WebPackages, WebTrust } from "@/components/web/WebSections";
import { CityLinks, WebCity } from "@/components/web/WebLocal";

/** Stadtseiten „Webdesign <Ort>“. Inhalte je Stadt stehen in lib/orte.ts, Worms hat die eigene Seite /webdesign-worms. */
export function generateStaticParams() {
  return ORTE.map((o) => ({ ort: o.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ ort: string }> }): Promise<Metadata> {
  const { ort } = await params;
  const o = ORTE.find((x) => x.slug === ort);
  if (!o) return {};
  const title = `Webdesign ${o.name} ab 199 € · Pfalz Multiservice`;
  return {
    // absolute: der Markenname steht schon im Title, die Vorlage aus dem Layout würde ihn doppeln
    title: { absolute: title },
    description: o.description,
    alternates: { canonical: ortHref(o.slug) },
    ...social({ path: ortHref(o.slug), title, description: o.description, image: "/og/webdesign.jpg", alt: `Webdesign für ${o.name} von Pfalz Multiservice` }),
  };
}

export default async function WebdesignOrtPage({ params }: { params: Promise<{ ort: string }> }) {
  const { ort } = await params;
  const o = ORTE.find((x) => x.slug === ort);
  if (!o) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Webdesign für ${o.name}`,
    serviceType: "Webdesign",
    url: `${SITE}${ortHref(o.slug)}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: [
      { "@type": "City", name: o.name },
      ...o.districts.map((name) => ({ "@type": "Place", name: `${name} (${o.name})` })),
      ...o.nearby.map((name) => ({ "@type": "Place", name })),
    ],
    offers: [
      { "@type": "Offer", name: "Start: OnePager, bis 5 Abschnitte", price: "199", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
      { "@type": "Offer", name: "Business: OnePager oder mehrseitige Website, bis 8 Seiten", price: "299", priceCurrency: "EUR", description: "Einmaliger Festpreis" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceLd, faqPage(o.faq), breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: "Leistungen", path: "/webdesign/leistungen" }, { name: `Webdesign ${o.name}`, path: ortHref(o.slug) }])]) }} />
      <PageHero
        fitTitle
        wide
        crumbs={[{ label: "Webdesign", href: "/webdesign" }, { label: "Leistungen", href: "/webdesign/leistungen" }, { label: o.name }]}
        eyebrow={`Pfalz Multiservice · ${o.region}`}
        title={<span className="sh__line">Webdesign für {o.name}</span>}
        highlight="zum Festpreis ab 199 €"
        intro={`Individuelle Websites für Betriebe aus ${o.name} und Umgebung, mobil optimiert und für Google vorbereitet.\nPersönlich betreut von Ihrem Ansprechpartner in Worms.`}
        image={o.image}
      >
        <Button variant="accent" size="lg" icon="arrow-right" href="/kontakt?leistung=web">Kostenloses Angebot</Button>
        <Button variant="outline-light" size="lg" href="#beispiele">Referenzen ansehen</Button>
      </PageHero>
      <WebTrust />
      <WebCity ort={o} />
      <WebExamples />
      <WebPackages />
      <Faq items={o.faq} alt />
      <CityLinks current={o.slug} />
      <CtaBand
        image={IMG + "lagergang.png"}
        intro={<>Erzählen Sie uns kurz von Ihrem Betrieb in {o.name}.<br />Wir melden uns mit einem Vorschlag und einem Festpreis, unverbindlich.</>}
      />
    </>
  );
}
