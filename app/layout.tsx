import { social } from "@/lib/social";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBar } from "@/components/ContactBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CopyGuard } from "@/components/CopyGuard";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Cursor } from "@/components/motion/Cursor";
import { SITE, SITE_NAME, TITLE, DESC, OG_IMAGE } from "@/lib/site";
import { AREA, COMPANY, CONTACT, SERVICES, WEB_CARE, WEB_PACKAGES, serviceHref } from "@/lib/data";

/** "199 €" / "59 €" → 199 / 59; "individuell" → null */
const euro = (s: string) => { const m = s.replace(/\s/g, "").match(/^(\d+(?:,\d+)?)€/); return m ? Number(m[1].replace(",", ".")) : null; };

// Schrift über next/font: wird mitgeliefert, vorab geladen, und die Ersatzschrift hat passende Maße (kein Layout-Sprung)
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-poppins" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: DESC,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...social({ path: "/", title: TITLE, description: DESC }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: SITE_NAME,
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE}/#business` },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE}/#business`,
      priceRange: "ab 199 €",
      name: SITE_NAME,
      url: SITE,
      logo: `${SITE}/logo-white.png`,
      image: `${SITE}${OG_IMAGE.url}`,
      description: DESC,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", postalCode: "67551", addressLocality: "Worms", addressRegion: "Rheinland-Pfalz", addressCountry: "DE" },
      geo: { "@type": "GeoCoordinates", ...COMPANY.geo },
      areaServed: AREA.map((name) => ({ "@type": "City", name })),
      foundingDate: COMPANY.founded,
      vatID: "DE444410908",
      founder: { "@type": "Person", name: COMPANY.owner },
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: CONTACT.phone, email: CONTACT.email, availableLanguage: "de", areaServed: "DE" },
      knowsAbout: SERVICES.map((s) => s.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: [
          ...SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.short, url: `${SITE}${serviceHref(s)}` },
          })),
          // Feste Preise aus der Preisliste: Website-Pakete (einmalig) und Wartung (monatlich)
          ...WEB_PACKAGES.filter((p) => euro(p.price) !== null).map((p) => ({
            "@type": "Offer",
            name: `Website ${p.name}`,
            price: euro(p.price), priceCurrency: "EUR",
            url: `${SITE}/webdesign#preise`,
            itemOffered: { "@type": "Service", name: `Website-Paket ${p.name}`, description: p.note },
          })),
          ...WEB_CARE.filter((p) => euro(p.price) !== null).map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: euro(p.price), priceCurrency: "EUR",
            priceSpecification: { "@type": "UnitPriceSpecification", price: euro(p.price), priceCurrency: "EUR", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
            url: `${SITE}/webdesign#preise`,
            itemOffered: { "@type": "Service", name: `Website-Betreuung ${p.name}`, description: p.note },
          })),
        ],
      },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

// Vor dem ersten Paint: Motion-Klasse setzen, damit Intro-Elemente nicht aufblitzen
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('pm-motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        {/* Eigene Besuchsstatistik ohne Cookies und ohne IP-Speicherung (Dashboard auf Hostinger) */}
        <script defer src="https://dashboard.pfalz-multiservice.de/t.js" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <CopyGuard />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ContactBar />
        <Cursor />
      </body>
    </html>
  );
}
