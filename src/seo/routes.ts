import { NE_HOME, PRODUCT_PAGES, PRODUCTS_PAGE, SITE, type Lang, type PageContent } from "./content";
import { PRIVACY, TERMS, type LegalDoc } from "./legal";

export interface RouteDef {
  path: string; // "/", "/bike-showroom-software", "/ne", "/ne/bike-showroom-software" (no trailing slash)
  lang: Lang;
  kind: "home" | "product" | "products" | "legal";
  page?: PageContent; // kind "product"
  hub?: { eyebrow: string; h1: string; intro: string }; // kind "products" (/products, /ne/products, /ne)
  legal?: LegalDoc; // kind "legal" (English only)
  title: string;
  description: string;
  alternates: { en: string; ne: string } | null; // null: no translation (legal pages)
}

const pathFor = (slug: string, lang: Lang) => (lang === "en" ? (slug ? `/${slug}` : "/") : slug ? `/ne/${slug}` : "/ne");

export const ROUTES: RouteDef[] = [
  {
    path: "/",
    lang: "en",
    kind: "home",
    title: "MotoCore ERP | Automobile Management Software in Nepal",
    description:
      "All-in-one automobile management software built in Nepal: MotoCore Bike for showrooms, Parts, Workshop and Recon-Lite for used vehicles. Book a free demo.",
    alternates: { en: "/", ne: "/ne" },
  },
  {
    path: "/ne",
    lang: "ne",
    kind: "products",
    hub: NE_HOME,
    title: NE_HOME.title,
    description: NE_HOME.description,
    alternates: { en: "/", ne: "/ne" },
  },
  ...(["en", "ne"] as Lang[]).map<RouteDef>((lang) => ({
    path: pathFor("products", lang),
    lang,
    kind: "products",
    hub: PRODUCTS_PAGE[lang],
    title: PRODUCTS_PAGE[lang].title,
    description: PRODUCTS_PAGE[lang].description,
    alternates: { en: "/products", ne: "/ne/products" },
  })),
  ...PRODUCT_PAGES.map<RouteDef>((page) => ({
    path: pathFor(page.slug, page.lang),
    lang: page.lang,
    kind: "product",
    page,
    title: page.title,
    description: page.description,
    alternates: { en: pathFor(page.slug, "en"), ne: pathFor(page.slug, "ne") },
  })),
  ...[PRIVACY, TERMS].map<RouteDef>((doc) => ({
    path: `/${doc.slug}`,
    lang: "en",
    kind: "legal",
    legal: doc,
    title: doc.title,
    description: doc.description,
    alternates: null,
  })),
];

/** The route for a browser path ("/x/" and "/x" are the same page; unknown paths fall back to the English home). */
export function findRoute(pathname: string): RouteDef {
  const p = (pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname).replace(/\.html$/, "");
  return ROUTES.find((r) => r.path === p) ?? ROUTES[0];
}

export const solutionHref = (slug: string, lang: Lang) => pathFor(slug, lang);
export const homeHref = (lang: Lang) => pathFor("", lang);
export const absolute = (path: string) => `${SITE.origin}${path}`;
