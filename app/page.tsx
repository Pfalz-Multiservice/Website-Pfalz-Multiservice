import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { About, CtaBand, Region, Services } from "@/components/home/HomeSections";
import { Stats } from "@/components/home/Stats";
import { HOME_FAQ, IMG } from "@/lib/data";
import { Faq } from "@/components/Faq";
import { JsonLd, faqPage } from "@/lib/schema";
import { WebTeaser } from "@/components/web/WebSections";
import { PartnerTiles } from "@/components/partner/Partners";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPage(HOME_FAQ)} />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Process />
      <WebTeaser alt />
      <Region />
      <PartnerTiles />
      <Faq items={HOME_FAQ} alt />
      <CtaBand
        image={IMG + "lagerraum-hoch.png"}
        intro={<>Schildern Sie uns kurz Ihr Anliegen.<br />Wir antworten innerhalb von 24 Stunden (werktags) mit einem passenden Lösungsvorschlag.</>}
      />
    </>
  );
}
