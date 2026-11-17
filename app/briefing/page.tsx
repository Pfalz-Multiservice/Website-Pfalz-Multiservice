import type { Metadata } from "next";
import { IMG } from "@/lib/data";
import { BRIEFING_INTRO, BRIEFING_PDF } from "@/lib/briefing";
import { PageHero } from "@/components/PageHero";
import { BriefingForm } from "@/components/briefing/BriefingForm";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { social } from "@/lib/social";

const description = "Website-Briefing von Pfalz Multiservice: in 15–20 Minuten online ausfüllen, Dateien hochladen und ein unverbindliches Festpreis-Angebot erhalten.";

export const metadata: Metadata = {
  title: "Website-Briefing",
  description,
  alternates: { canonical: "/briefing" },
  // Für Kunden gedacht, die von der Webdesign-Seite kommen – nicht als eigenes Suchergebnis
  robots: { index: false, follow: true },
  ...social({ path: "/briefing", title: "Website-Briefing · Pfalz Multiservice", description, image: "/og/webdesign.jpg", alt: "Website-Briefing" }),
};

export default function BriefingPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Webdesign", path: "/webdesign" }, { name: "Website-Briefing", path: "/briefing" }])} />
      <PageHero eyebrow="Webdesign · Schritt 1" title="Website-" highlight="Briefing" intro={BRIEFING_INTRO.subtitle} image={IMG + "briefing-schreibmaschine.jpg"}>
        <ul className="bf-facts">
          {BRIEFING_INTRO.facts.map(([k, v]) => <li key={k}><span>{k}</span><b>{v}</b></li>)}
        </ul>
      </PageHero>
      <section className="section bf-wrap">
        <div className="container">
          <ol className="bf-steps">
            {BRIEFING_INTRO.steps.map(([n, t, x]) => (
              <li key={n}><span className="bf__nr">{n}</span><b>{t}</b><span>{x}</span></li>
            ))}
          </ol>
          <BriefingForm />
          {BRIEFING_PDF && (
            <p className="bf-paper">Lieber auf Papier? <a href={BRIEFING_PDF} download>Hier die PDF zum Herunterladen</a>. Ausdrucken, ausfüllen und per Foto per WhatsApp oder E-Mail schicken.</p>
          )}
        </div>
      </section>
    </>
  );
}
