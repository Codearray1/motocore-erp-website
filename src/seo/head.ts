import { SITE } from "./content";
import { absolute, type RouteDef } from "./routes";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON-LD inside <script>: keep "</script>" from closing the tag early
const ld = (o: unknown) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.origin}/#organization`,
  name: SITE.name,
  legalName: SITE.company,
  url: `${SITE.origin}/`,
  logo: `${SITE.origin}/motocore-logo.png`,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", streetAddress: "Sanepa", addressLocality: "Lalitpur", addressCountry: SITE.country },
  areaServed: ["NP", "IN", "BD"],
};

/** Everything that goes in <head> for one route (title, description, canonical, hreflang, Open Graph, JSON-LD). */
export function headHtml(r: RouteDef): string {
  const url = absolute(r.path);
  const image = `${SITE.origin}/og-image.png`;
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${absolute(r.alternates.en)}" />`,
    `<link rel="alternate" hreflang="ne" href="${absolute(r.alternates.ne)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${absolute(r.alternates.en)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${r.lang === "ne" ? "ne_NP" : "en_US"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ld(ORGANIZATION),
  ];
  if (r.kind === "home") {
    tags.push(ld({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: `${SITE.origin}/`, inLanguage: r.lang, publisher: { "@id": ORGANIZATION["@id"] } }));
  }
  const p = r.page;
  if (p) {
    tags.push(
      ld({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: p.app.name,
        applicationCategory: p.app.category,
        operatingSystem: p.app.os,
        description: p.description,
        url,
        inLanguage: p.lang,
        publisher: { "@id": ORGANIZATION["@id"] },
      }),
      ld({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: p.lang,
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
      ld({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: absolute(r.lang === "ne" ? "/ne" : "/") },
          ...(p.slug ? [{ "@type": "ListItem", position: 2, name: p.h1, item: url }] : []),
        ],
      }),
    );
  }
  return tags.join("\n    ");
}
