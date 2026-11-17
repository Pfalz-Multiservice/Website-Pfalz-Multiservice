import { social } from "@/lib/social";
import { tidy } from "@/lib/typo";
import type { Metadata } from "next";
import { COMPANY, CONTACT, CTA, IMG, SERVICES } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { BriefingStrip } from "@/components/web/WebSections";
import type { IconName } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontakt in Worms",
  description: "Kontakt zu Pfalz Multiservice in Worms: Anfrage per Formular, Telefon oder WhatsApp. Antwort innerhalb von 24 Stunden (werktags).",
  alternates: { canonical: "/kontakt" },
  ...social({ path: "/kontakt", title: "Kontakt in Worms · Pfalz Multiservice", description: "Kontakt zu Pfalz Multiservice in Worms: Anfrage per Formular, Telefon oder WhatsApp. Antwort innerhalb von 24 Stunden (werktags).", image: "/og/kontakt.jpg" }),
};

function Row({ icon, label, value, href }: { icon: IconName; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="contact-row__icon"><Icon name={icon} size={20} /></span>
      <div>
        <div className="contact-row__label">{label}</div>
        <div className="contact-row__value">{tidy(value)}</div>
      </div>
    </>
  );
  return href
    ? <a className="contact-row" href={href} data-cursor {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
    : <div className="contact-row">{inner}</div>;
}

export default async function KontaktPage({ searchParams }: { searchParams: Promise<{ leistung?: string }> }) {
  const { leistung } = await searchParams;
  const initial = SERVICES.find((s) => s.id === leistung)?.title;

  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Kontakt", path: "/kontakt" }])} />
      <PageHero eyebrow="Kontakt" title={CTA.title} highlight={CTA.highlight} intro={CTA.intro} image={IMG + "kontakt-briefkasten.jpg"} crumbs={[{ label: "Kontakt" }]} />
      <section className="section">
        <div className="container split split--contact" style={{ gridTemplateColumns: "1fr 1.5fr", alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <SectionHeading eyebrow="Schnell erreichbar" title="Direkter" highlight="Kontakt" />
            <div className="stack pm-reveal" data-reveal="stagger" style={{ gap: 28 }}>
              <Row icon="phone" label="Telefon" value={CONTACT.phone} href={CONTACT.phoneHref} />
              <Row icon="message-circle" label="WhatsApp" value="Nachricht schreiben" href={CONTACT.whatsapp} />
              <Row icon="mail" label="E-Mail" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <Row icon="map-pin" label="Standort" value={`${CONTACT.city} · Einsätze in Worms und Umgebung`} />
              <Row icon="file-check" label="Erreichbarkeit" value={`Telefon und WhatsApp · ${COMPANY.hours}`} />
              <div><Button variant="outline-light" iconLeft="message-circle" href={CONTACT.whatsapp}>WhatsApp-Chat starten</Button></div>
            </div>
          </div>
          <ContactForm initial={initial} />
        </div>
        <div className="container" style={{ marginTop: 48 }}>
          <BriefingStrip title="Noch keine Website? Oder sollen WIR alles neu gestalten?" text="Dann ist das Website-Briefing der richtige Einstieg: Schritt für Schritt ausfüllen, Logo und Fotos hochladen und ein unverbindliches Festpreis-Angebot erhalten." />
        </div>
      </section>
    </>
  );
}
