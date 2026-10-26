import { ArrowRight, BadgeCheck, Bike, CarFront, Package, RefreshCw, Smartphone, Wrench, type LucideIcon } from "lucide-react";
import { PRODUCTS } from "../seo/content";
import { solutionHref } from "../seo/routes";

const ICONS: Record<string, LucideIcon> = { bike: Bike, parts: Package, workshop: Wrench, recon: RefreshCw, car: CarFront };

/** Home: the MotoCore product line, MotoCore Bike featured, each card linking to its page. */
export default function ProductStrip() {
  const bike = PRODUCTS.find((p) => p.key === "bike")!;
  const rest = PRODUCTS.filter((p) => p.key !== "bike");
  return (
    <section id="products" className="py-16 md:py-24 bg-[var(--bg)] text-[var(--text)] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">MotoCore products</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">Automobile management software: one platform, five products</h2>
            <p className="mt-3 max-w-2xl text-[var(--text)]/75">Showroom management, spare parts, workshop and used vehicles. Use one product or several; they share the same customers, stock and reports.</p>
          </div>
          <a href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
            All products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li className="flex lg:row-span-2">
            <a
              href={solutionHref(bike.slug as string, "en")}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-brand-red to-[#8f0310] p-7 text-white shadow-xl shadow-brand-red/20 transition-transform duration-300 hover:-translate-y-1"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Featured
              </span>
              <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Bike className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">{bike.name}</h3>
              <p className="mt-1 text-sm font-semibold text-white/80">{bike.tag.en}</p>
              <p className="mt-3 leading-relaxed text-white/85">{bike.text.en}</p>
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> Android and iOS app included
              </span>
              <span className="mt-auto pt-8 inline-flex items-center gap-1.5 font-bold">
                Explore MotoCore Bike <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          </li>
          {rest.map((p) => {
            const Icon = ICONS[p.key];
            return (
              <li key={p.key} className="flex">
                <a
                  href={solutionHref(p.slug as string, "en")}
                  className={`group flex w-full flex-col rounded-2xl border bg-[var(--card)] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-lg ${p.soon ? "border-dashed border-[var(--border)]" : "border-[var(--border)]"}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text)]/60">{p.tag.en}</span>
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/75">{p.text.en}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
                    {p.soon ? "Register interest" : "View product"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
