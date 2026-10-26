import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import Contact from "../components/Contact";
import { SOLUTION_LABELS, SOLUTION_SLUGS, type PageContent } from "../seo/content";
import { homeHref as homeOf, solutionHref } from "../seo/routes";

const UI = {
  en: { home: "Home", steps: "How it works", faq: "Frequently asked questions", related: "More MotoCore solutions", solutions: "Solutions" },
  ne: { home: "गृहपृष्ठ", steps: "यसरी काम गर्छ", faq: "बारम्बार सोधिने प्रश्न", related: "MotoCore का अन्य समाधान", solutions: "समाधान" },
};

/** A search landing page: plain, fully pre-rendered HTML (no entrance animations hiding text from crawlers). */
export default function ProductPage({ page }: { page: PageContent }) {
  const t = UI[page.lang];
  const homeHref = homeOf(page.lang);
  const related = SOLUTION_SLUGS.filter((s) => s !== page.slug);

  return (
    <div lang={page.lang}>
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-14 sm:pt-32 sm:pb-20">
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--text)]/60 mb-5">
            <a href={homeHref} className="hover:text-[var(--accent)]">{t.home}</a>
            {page.slug && <span aria-hidden="true"> / </span>}
            {page.slug && <span>{page.product}</span>}
          </nav>
          <p className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">{page.eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight max-w-4xl">{page.h1}</h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text)]/75 max-w-3xl">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {page.ctas.map((c, i) => (
              <a
                key={c.href}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                className={
                  i === 0
                    ? "inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                    : "inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:border-[var(--accent)]"
                }
              >
                {c.label}
                {i === 0 && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </a>
            ))}
          </div>
        </div>
      </section>

      {page.shots && (
        <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{page.shots.heading}</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {page.shots.items.map((s, i) => (
                <figure key={s.src} className={s.phone ? "lg:row-span-2 lg:col-start-3 lg:row-start-1" : i === 0 ? "lg:col-span-2" : "lg:col-span-2"}>
                  <div className={`overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm ${s.phone ? "mx-auto max-w-[300px] rounded-[2rem] border-4" : ""}`}>
                    <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="block h-auto w-full" />
                  </div>
                  <figcaption className="mt-2 text-sm text-[var(--text)]/70">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.tiers && (
        <section className="border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{page.tiers.heading}</h2>
            <p className="mt-3 text-[var(--text)]/70">{page.tiers.intro}</p>
            <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th scope="col" className="p-4 text-left font-semibold"><span className="sr-only">Feature</span></th>
                    {page.tiers.columns.map((c) => (
                      <th key={c.name} scope="col" className="p-4 text-center">
                        <span className="block font-bold">{c.name}</span>
                        <span className="block text-xs font-normal text-[var(--text)]/60">{c.text}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.tiers.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-[var(--border)] last:border-0">
                      <th scope="row" className="p-4 text-left font-medium">{row.feature}</th>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 text-center">
                          {v ? <Check className="mx-auto h-5 w-5 text-[var(--accent)]" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-[var(--text)]/40" aria-label="Not included" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {page.groups.map((g) => (
        <section key={g.heading} className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{g.heading}</h2>
            {g.intro && <p className="mt-3 text-[var(--text)]/70 max-w-3xl">{g.intro}</p>}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <li key={it.title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
                  <h3 className="font-semibold flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/70">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {page.steps && (
        <section className="border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{page.steps.heading || t.steps}</h2>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.steps.items.map((s, i) => (
                <li key={s} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">{i + 1}</span>
                  <span className="text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">{t.faq}</h2>
          <div className="mt-6 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--card)]">
            {page.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-xl sm:text-2xl font-bold">{page.slug ? t.related : t.solutions}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(page.slug ? related : SOLUTION_SLUGS).map((s) => (
              <li key={s}>
                <a href={solutionHref(s, page.lang)} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm font-semibold hover:border-[var(--accent)]">
                  {SOLUTION_LABELS[page.lang][s]}
                  <ArrowRight className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </div>
  );
}
