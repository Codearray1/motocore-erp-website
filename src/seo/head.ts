import { PRODUCTS, SITE } from "./content";
import { absolute, solutionHref, type RouteDef } from "./routes";
import { BLOG, POSTS } from "./blog";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON-LD inside <script>: keep "</script>" from closing the tag early
const ld = (o: unknown) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const ORG_ID = `${SITE.origin}/#organization`;
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
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
  const post = r.kind === "post" ? r.post : undefined;
  const image = post?.cover ? absolute(post.cover) : `${SITE.origin}/og-image.png`;
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...(r.alternates
      ? [
          `<link rel="alternate" hreflang="en" href="${absolute(r.alternates.en)}" />`,
          `<link rel="alternate" hreflang="ne" href="${absolute(r.alternates.ne)}" />`,
          `<link rel="alternate" hreflang="x-default" href="${absolute(r.alternates.en)}" />`,
        ]
      : []),
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="${post ? "article" : "website"}" />`,
    ...(post ? [`<meta property="article:published_time" content="${post.date}" />`, ...(post.updated ? [`<meta property="article:modified_time" content="${post.updated}" />`] : [])] : []),
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    ...(post?.cover ? [] : [`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`]),
    `<meta property="og:locale" content="${r.lang === "ne" ? "ne_NP" : "en_US"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ld(ORGANIZATION),
  ];
  const home = absolute(r.lang === "ne" ? "/ne" : "/");
  const crumbs = (name: string) =>
    ld({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.name, item: home },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });

  if (r.kind === "home") {
    tags.push(ld({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: `${SITE.origin}/`, inLanguage: r.lang, publisher: { "@id": ORG_ID } }));
  }
  if (r.kind === "products") {
    tags.push(
      ld({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: r.hub?.h1,
        itemListElement: PRODUCTS.filter((p) => p.slug).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absolute(solutionHref(p.slug as string, r.lang)) })),
      }),
    );
    if (r.path !== "/ne") tags.push(crumbs(r.hub?.h1 ?? "Products"));
  }
  const p = r.page;
  if (r.kind === "product" && p) {
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
        publisher: { "@id": ORG_ID },
      }),
      ld({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: p.lang,
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
      crumbs(p.product),
    );
  }
  if (r.kind === "legal" && r.legal) tags.push(crumbs(r.legal.h1));
  if (r.kind === "blog") {
    tags.push(
      ld({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: BLOG.h1,
        url,
        publisher: { "@id": ORG_ID },
        blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absolute(`/blog/${p.slug}`), datePublished: p.date })),
      }),
      crumbs(BLOG.h1),
    );
  }
  if (post) {
    tags.push(
      ld({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Organization", name: post.author },
        publisher: { "@id": ORG_ID },
        image,
        mainEntityOfPage: url,
        keywords: post.tags.join(", ") || undefined,
        inLanguage: "en",
      }),
      ld({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: home },
          { "@type": "ListItem", position: 2, name: BLOG.h1, item: absolute("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      }),
    );
  }
  if (r.lang === "ne") {
    // Devanagari font for Nepali pages only
    tags.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" />`);
  }
  return tags.join("\n    ");
}
