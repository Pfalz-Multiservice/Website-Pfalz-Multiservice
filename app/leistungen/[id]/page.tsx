import { social } from "@/lib/social";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IMG, SERVICES, USPS, serviceHref } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { CtaBand } from "@/components/home/HomeSections";
import { JsonLd, breadcrumb, faqPage } from "@/lib/schema";
import { Faq } from "@/components/Faq";
import { SITE } from "@/lib/site";
import { PartnerStayTip } from "@/components/partner/Partners";
import { KnxSections } from "@/components/knx/KnxSections";
import Link from "next/link";
import { GUIDES, guideHref } from "@/lib/ratgeber";

export function generateStaticParams() {
  return SERVICES.filter((s) => !s.href).map((s) => ({ id: s.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return {};
  const description = s.seo ?? s.short;
  const url = `/leistungen/${s.id}`;
  return {
    title: s.seoTitle ?? s.title,
    description,
    alternates: { canonical: url },
    ...social({ path: url, title: `${s.seoTitle ?? s.title} · Pfalz Multiservice`, description, image: `/og/${s.id}.jpg`, alt: s.title }),
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  if (!s) notFound();
  const words = s.title.split(" ");
  const others = SERVICES.filter((x) => x.id !== s.id);
  const guides = GUIDES.filter((g) => g.topic === s.id);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.seo ?? s.short,
    serviceType: s.title,
    url: `${SITE}/leistungen/${s.id}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: ["Worms", "Pfalz"],
  };

  return (
    <>
      <JsonLd data={[serviceLd, breadcrumb([{ name: s.title, path: `/leistungen/${s.id}` }]), ...(s.faq ? [faqPage(s.faq)] : [])]} />
      <PageHero
        eyebrow="Unsere Leistungen"
        title={words.length > 1 ? words.slice(0, -1).join(" ") : ""}
        highlight={words.slice(-1)[0]}
        intro={s.short}
        image={s.image}
        crumbs={[{ label: "Leistungen", href: "/#leistungen" }, { label: s.title }]}
      />
      {s.id === "smarthome" ? <KnxSections text={s.text} legal={s.legal} /> : (
      <section className="section">
        <div className="container split split--detail" style={{ gridTemplateColumns: "1.3fr 1fr", alignItems: "start" }}>
          <div className="stack" style={{ gap: 28 }}>
            <SectionHeading eyebrow={s.short} title={s.title} />
            <p className="pm-reveal" data-reveal="up" style={{ margin: 0, font: "var(--type-body)", color: "var(--text-body)" }}>{s.text}</p>
            <div className="pm-reveal" data-reveal="checks"><CheckList items={USPS} /></div>
            <div className="pm-reveal" data-reveal="up">
              <Button href={`/kontakt?leistung=${s.id}`} icon="arrow-right">Anfrage zu {s.title}</Button>
            </div>
            {s.legal && <p className="svc-legal">{s.legal}</p>}
          </div>
          {s.points && (
            <aside className="pk-box svc-points pm-reveal" data-reveal="up">
              <span className="pk-box__eyebrow">Was wir für Sie tun</span>
              <h2 className="pk-box__title">{s.points.title}</h2>
              <ul className="svc-points__list">
                {s.points.items.map((it) => <li key={it}><Icon name="check" size={16} />{it}</li>)}
              </ul>
              {s.points.note && <p className="pk-box__foot">{s.points.note}</p>}
            </aside>
          )}
        </div>
      </section>
      )}
      {["facility", "storage", "clearance"].includes(s.id) && <PartnerStayTip />}
      {s.faq && <Faq items={s.faq} alt />}
      {guides.length > 0 && (
        <section className="section section--tight">
          <div className="container stack" style={{ gap: 16 }}>
            {guides.map((g) => (
              <Link key={g.slug} href={guideHref(g.slug)} className="bstrip web-local__teaser pm-reveal" data-reveal="up" data-cursor>
                <span className="bstrip__icon"><Icon name="file-check" size={24} /></span>
                <span className="bstrip__txt">
                  <b>Ratgeber: {g.seoTitle ?? g.title}</b>
                  <span>{g.teaser}</span>
                </span>
                <Icon name="arrow-right" size={20} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Kombinierbar" title="Weitere" highlight="Leistungen" style={{ marginBottom: 48 }} />
          <div className="grid-3 pm-reveal" data-reveal="cards" style={{ gap: 20 }}>
            {others.map((o) => (
              <ServiceCard key={o.id} variant="overlay" href={serviceHref(o)} image={o.image} title={o.title} text={o.short} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand image={IMG + "lagergang.png"} />
    </>
  );
}
