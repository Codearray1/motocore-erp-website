import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../seo/content";
import { solutionHref } from "../seo/routes";

/** Home: the MotoCore product line, each linking to its page (MotoCore Car is listed as coming soon). */
export default function ProductStrip() {
  return (
    <section id="products" className="py-16 md:py-20 bg-[var(--bg)] text-[var(--text)] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">MotoCore products</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">One platform, five products</h2>
            <p className="mt-3 max-w-2xl text-[var(--text)]/75">Use one product or several. They share the same customers, stock and reports.</p>
          </div>
          <a href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
            All products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTS.map((p) => {
            const inner = (
              <>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text)]/70">{p.tag.en}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/75">{p.text.en}</p>
              </>
            );
            return (
              <li key={p.key} className="flex">
                {p.slug ? (
                  <a href={solutionHref(p.slug, "en")} className="flex w-full flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-brand-red">{inner}</a>
                ) : (
                  <div className="flex w-full flex-col rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-5">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
