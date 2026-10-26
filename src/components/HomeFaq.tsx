import { ChevronDown } from "lucide-react";
import { HOME_FAQ } from "../seo/content";

/** Home page FAQ (also published as FAQPage structured data in the page head). */
export default function HomeFaq() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">FAQ</p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Questions about MotoCore</h2>
        <div className="mt-8 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          {HOME_FAQ.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                <h3 className="text-base">{f.q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-red transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 leading-relaxed text-[var(--text)]/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
