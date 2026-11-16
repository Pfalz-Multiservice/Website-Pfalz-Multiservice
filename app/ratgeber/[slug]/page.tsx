import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { social } from "@/lib/social";
import { tidyNode } from "@/lib/typo";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd, breadcrumb, faqPage } from "@/lib/schema";
import { GUIDES, GUIDE_TOPICS, guideHref, guideTopic } from "@/lib/ratgeber";
import { COMPANY, CONTACT } from "@/lib/data";
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
    authors: [{ name: COMPANY.owner, url: `${SITE}/ueber-uns` }],
    ...social({ path: guideHref(g.slug), title: g.seoTitle ?? `${g.title} · ${SITE_NAME}`, description: g.teaser }),
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();

  // Weiterlesen: zuerst Artikel zum selben Thema, dann die übrigen
  const topic = GUIDE_TOPICS[guideTopic(g)];
  const others = GUIDES.filter((x) => x.slug !== slug);
  const related = [...others.filter((x) => guideTopic(x) === guideTopic(g)), ...others.filter((x) => guideTopic(x) !== guideTopic(g))].slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.teaser,
    datePublished: g.date,
    dateModified: g.updated ?? g.date,
    inLanguage: "de-DE",
    mainEntityOfPage: `${SITE}${guideHref(g.slug)}`,
    // Verantwortliche Person statt nur Firmenname: so ordnen Suchmaschinen und KI-Dienste den Text einer Person zu
    author: { "@type": "Person", "@id": `${SITE}/#inhaber`, name: COMPANY.owner, jobTitle: COMPANY.role, url: `${SITE}/ueber-uns`, worksFor: { "@id": `${SITE}/#business` } },
    publisher: { "@id": `${SITE}/#business` },
    about: { "@type": "Service", name: topic.label, url: `${SITE}${topic.href}` },
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
              <time dateTime={g.date}>{g.dateLabel}</time> · <Link href="/ueber-uns" rel="author">{COMPANY.owner}</Link>, {COMPANY.role} {SITE_NAME}
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
                {topic.question} Schreiben Sie uns über das <Link href="/kontakt">Kontaktformular</Link>, per E-Mail an{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> oder rufen Sie an: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                Wir antworten innerhalb von 24 Stunden (werktags).
              </p>
              <p>
                Mehr dazu: <Link href={topic.href}>{topic.label}</Link>
                {related.map((r) => (
                  <span key={r.slug}> · <Link href={guideHref(r.slug)}>{r.title}</Link></span>
                ))}
              </p>
              <p><Link href="/ratgeber">Alle Ratgeber</Link> · <Link href="/preise">Preise</Link> · <Link href="/fakten">Fakten zum Unternehmen</Link></p>
            </div>
          </>)}
        </div>
      </div>
    </section>
  );
}
