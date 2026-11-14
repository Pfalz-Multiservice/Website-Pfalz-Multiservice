import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Mitgelieferte Altbrowser-Polyfills weglassen (PageSpeed „Veraltetes JavaScript“, ca. 14 KiB)
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/empty-polyfill.ts",
      "next/dist/build/polyfills/polyfill-module": "./lib/empty-polyfill.ts",
    },
  },

  // CSS direkt im HTML ausliefern: spart die blockierende Stylesheet-Anfrage (PageSpeed „Rendering blockiert“)
  experimental: { inlineCss: true },

  // PNG-Originale bleiben im Repo; ausgeliefert werden passende AVIF/WebP-Größen
  images: { formats: ["image/avif", "image/webp"], qualities: [75], minimumCacheTTL: 2678400 },

  async redirects() {
    return [
      { source: "/beispiele", destination: "https://beispiele.pfalz-multiservice.de/", permanent: true },
      // Lagerfläche ruht vorerst: alte Adresse führt zu den Leistungen auf der Startseite
      { source: "/leistungen/storage", destination: "/#leistungen", permanent: false },
      // Musterdesigns liegen seit 11/2026 im eigenen Projekt (Repo „Beispiele“) auf der Subdomain
      { source: "/beispiele/:path+", destination: "https://beispiele.pfalz-multiservice.de/:path+", permanent: true },
      { source: "/leistungen/web", destination: "/webdesign", permanent: true },
      { source: "/partner/verve-apartments", destination: "/partner#verve-apartments", permanent: true },
      // Alle Nebenadressen dauerhaft auf die Hauptadresse www.pfalz-multiservice.de
      ...["pfalz-multiservice.de", "garage-pfalz.de", "www.garage-pfalz.de"].map((value) => ({
        source: "/:path*", has: [{ type: "host" as const, value }], destination: "https://www.pfalz-multiservice.de/:path*", permanent: true,
      })),
    ];
  },

  async headers() {
    const security = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    ];
    return [{ source: "/:path*", headers: security }];
  },
};

export default nextConfig;
