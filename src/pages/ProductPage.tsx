import { ArrowRight, Check, ChevronDown, Minus, Smartphone } from "lucide-react";
import Contact from "../components/Contact";
import { APP_STORES, SOLUTION_LABELS, SOLUTION_SLUGS, type PageContent } from "../seo/content";
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
          {page.mobileApp && (
            <a href="#mobile-app" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/15">
              <Smartphone className="h-4 w-4" aria-hidden="true" />
              {page.mobileApp.badge}
            </a>
          )}
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

      {page.mobileApp && (
        <section id="mobile-app" className="scroll-mt-28 border-b border-[var(--border)] bg-[var(--bg)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid gap-10">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Smartphone className="h-4 w-4" aria-hidden="true" /> Android · iOS
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold leading-tight">{page.mobileApp.heading}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text)]/75">{page.mobileApp.text}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {page.mobileApp.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {APP_STORES.android && (
                  <a href={APP_STORES.android} target="_blank" rel="noopener" className="rounded-lg bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--bg)] hover:opacity-90">Google Play</a>
                )}
                {APP_STORES.ios && (
                  <a href={APP_STORES.ios} target="_blank" rel="noopener" className="rounded-lg bg-[var(--text)] px-5 py-3 text-sm font-semibold text-[var(--bg)] hover:opacity-90">App Store</a>
                )}
                {!APP_STORES.android && !APP_STORES.ios && <p className="text-sm text-[var(--text)]/70">{page.mobileApp.storesNote}</p>}
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {page.mobileApp.screens.map((s) => (
                <li key={s.src}>
                  <figure>
                    <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-xl shadow-black/10">
                      <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" className="block h-auto w-full" />
                    </div>
                    <figcaption className="mt-3 text-center text-sm text-[var(--text)]/70">{s.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.shots && (
        <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">{page.shots.heading}</h2>
            <div className={`mt-8 grid gap-6 ${page.shots.items.some((s) => s.phone) ? "lg:grid-cols-3" : "md:grid-cols-3"}`}>
              {page.shots.items.map((s, i) => (
                <figure key={s.src} className={s.phone ? "lg:row-span-2 lg:col-start-3 lg:row-start-1" : page.shots!.items.some((x) => x.phone) ? "lg:col-span-2" : i === 0 ? "md:col-span-3" : ""}>
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
