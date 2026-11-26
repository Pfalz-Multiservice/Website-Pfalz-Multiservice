import Link from "next/link";
import type { Metadata } from "next";
import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { GUIDES, guideHref } from "@/lib/ratgeber";

const DESC = "Kurze Ratgeber von Pfalz Multiservice aus Worms: Website, Wartung und Hosting, Restposten verkaufen, Räumungen und KNX-Anlagen.";

export const metadata: Metadata = {
  title: "Ratgeber: Website, Räumung & KNX",
  description: DESC,
  alternates: { canonical: "/ratgeber" },
  ...social({ path: "/ratgeber", title: "Ratgeber: Website, Räumung & KNX · Pfalz Multiservice", description: DESC }),
  robots: { index: true, follow: true },
};

export default function RatgeberPage() {
  return (
    <section className="section section--legal">
      <JsonLd data={breadcrumb([{ name: "Ratgeber", path: "/ratgeber" }])} />
      <div className="container">
        <div className="legal">
          <SectionHeading level={1} size="h1" eyebrow="Wissen" title="" highlight="Ratgeber" />
          {tidyNode(<div className="legal__stack stack" style={{ gap: 36 }}>
            {[...GUIDES].sort((a, b) => b.date.localeCompare(a.date)).map((g) => (
              <div key={g.slug} className="legal__block">
                <h2><Link href={guideHref(g.slug)}>{g.title}</Link></h2>
                <span className="legal__date"><time dateTime={g.date}>{g.dateLabel}</time></span>
                <p>{g.teaser}</p>
                <p><Link href={guideHref(g.slug)} aria-label={`Artikel lesen: ${g.title}`}>Artikel lesen →</Link></p>
              </div>
            ))}
          </div>)}
        </div>
      </div>
    </section>
  );
}
