import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import type { Metadata } from "next";

// Markierung für die Besuchsstatistik: Aufrufe dieser Seite zählen als 404
export const metadata: Metadata = { title: "Seite nicht gefunden", other: { "pm-404": "1" } };

export default function NotFound() {
  return (
    <section className="section section--legal" style={{ minHeight: "70vh" }}>
      <div className="container stack" style={{ gap: 32 }}>
        <SectionHeading level={1} size="h1" eyebrow="Fehler 404" title="Seite nicht" highlight="gefunden"
          intro="Die aufgerufene Adresse existiert nicht oder wurde verschoben." />
        <div className="pm-reveal" data-reveal="up"><Button href="/" variant="accent">Zur Startseite</Button></div>
      </div>
    </section>
  );
}
