import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb, faqPage } from "@/lib/schema";
import { GUIDES, guideHref } from "@/lib/ratgeber";
import { CONTACT } from "@/lib/data";
import { SITE, SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: g.seoTitle ? { absolute: g.seoTitle } : g.title,
    description: g.teaser,
    alternates: { canonical: guideHref(g.slug) },
    ...social({ path: guideHref(g.slug), title: g.seoTitle ?? `${g.title} · ${SITE_NAME}`, description: g.teaser }),
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();

  const idx = GUIDES.findIndex((x) => x.slug === slug);
  const related = [GUIDES[(idx + 1) % GUIDES.length], GUIDES[(idx + 2) % GUIDES.length]].filter((r) => r.slug !== slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.teaser,
    datePublished: g.date,
    dateModified: g.date,
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}${guideHref(g.slug)}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE },
    publisher: { "@id": `${SITE}/#business` },
  };

  return (
    <section className="section section--legal">
      <JsonLd data={[
        articleLd,
        breadcrumb([{ name: "Ratgeber", path: "/ratgeber" }, { name: g.title, path: guideHref(g.slug) }]),
        ...(g.faq ? [faqPage(g.faq)] : []),
      ]} />
      <div className="container">
        <div className="legal">
          <div className="stack" style={{ gap: 12 }}>
            <SectionHeading level={1} size="h2" eyebrow="Ratgeber" title={g.title} />
            <span className="legal__date">
              <time dateTime={g.date}>{g.dateLabel}</time> · {SITE_NAME}
            </span>
          </div>
          {tidyNode(<>
            {g.sections.map((s) => (
              <div key={s.h} className="legal__block">
                <h2>{s.h}</h2>
                {s.p?.map((t, i) => <p key={i}>{t}</p>)}
                {s.l && <ul>{s.l.map((t, i) => <li key={i}>{t}</li>)}</ul>}
              </div>
            ))}
            {g.faq && (
              <div className="legal__block">
                <h2>Häufige Fragen</h2>
                {g.faq.map(([q, a]) => (
                  <p key={q}><strong>{q}</strong><br />{a}</p>
                ))}
              </div>
            )}
            <div className="legal__block">
              <p>
                Fragen zu Ihrer Website? Schreiben Sie uns über das <Link href="/kontakt">Kontaktformular</Link>, per E-Mail an{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> oder rufen Sie an: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                Wir antworten innerhalb von 24 Stunden (werktags).
              </p>
              <p>
                Mehr dazu: <Link href="/webdesign">Webdesign und Website-Betreuung</Link>
                {related.map((r) => (
                  <span key={r.slug}> · <Link href={guideHref(r.slug)}>{r.title}</Link></span>
                ))}
              </p>
              <p><Link href="/ratgeber">Alle Ratgeber</Link></p>
            </div>
          </>)}
        </div>
      </div>
    </section>
  );
}
