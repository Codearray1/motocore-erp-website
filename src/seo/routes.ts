import { PRODUCT_PAGES, SITE, type Lang, type PageContent } from "./content";

export interface RouteDef {
  path: string; // "/", "/bike-showroom-software", "/ne", "/ne/bike-showroom-software" (no trailing slash)
  lang: Lang;
  kind: "home" | "product";
  page?: PageContent;
  title: string;
  description: string;
  alternates: { en: string; ne: string };
}

const pathFor = (slug: string, lang: Lang) => (lang === "en" ? (slug ? `/${slug}` : "/") : slug ? `/ne/${slug}` : "/ne");

const HOME_EN: RouteDef = {
  path: "/",
  lang: "en",
  kind: "home",
  title: "MotoCore ERP | Automotive & Bike Showroom Software in Nepal",
  description:
    "Cloud ERP built in Nepal for bike showrooms, vehicle dealerships, workshops, spare parts distributors and used vehicle businesses. Book a free demo.",
  alternates: { en: "/", ne: "/ne" },
};

export const ROUTES: RouteDef[] = [
  HOME_EN,
  ...PRODUCT_PAGES.map<RouteDef>((page) => ({
    path: pathFor(page.slug, page.lang),
    lang: page.lang,
    kind: "product",
    page,
    title: page.title,
    description: page.description,
    alternates: { en: pathFor(page.slug, "en"), ne: pathFor(page.slug, "ne") },
  })),
];

/** The route for a browser path ("/x/" and "/x" are the same page; unknown paths fall back to the English home). */
export function findRoute(pathname: string): RouteDef {
  const p = (pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname).replace(/\.html$/, "");
  return ROUTES.find((r) => r.path === p) ?? HOME_EN;
}

export const solutionHref = (slug: string, lang: Lang) => pathFor(slug, lang);
export const absolute = (path: string) => `${SITE.origin}${path}`;
