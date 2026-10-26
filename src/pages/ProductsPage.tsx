import { ArrowRight } from "lucide-react";
import Contact from "../components/Contact";
import { PRODUCTS, SITE, type Lang } from "../seo/content";
import { solutionHref } from "../seo/routes";

const UI = {
  en: { cta: "Book a free demo", trial: "Start free trial", view: "View product", soon: "Coming soon", why: "Why one platform", whyText: "Showroom, parts, workshop and used-vehicle teams work on the same customers, stock and reports, so nothing is entered twice and owners see the whole business in one place." },
  ne: { cta: "निःशुल्क डेमो बुक गर्नुहोस्", trial: "निःशुल्क ट्रायल सुरु गर्नुहोस्", view: "उत्पादन हेर्नुहोस्", soon: "छिट्टै आउँदैछ", why: "किन एउटै प्लेटफर्म", whyText: "शोरूम, पार्टपुर्जा, वर्कसप र पुराना सवारी टोलीले एउटै ग्राहक, स्टक र रिपोर्टमा काम गर्छन्, त्यसैले केही पनि दोहोरो दर्ता हुँदैन र सञ्चालकले पूरा व्यवसाय एकै ठाउँमा देख्छन्।" },
};

/** /products, /ne/products and the Nepali home (/ne): the MotoCore product line. */
export default function ProductsPage({ lang, hub }: { lang: Lang; hub: { eyebrow: string; h1: string; intro: string } }) {
  const t = UI[lang];
  return (
    <div lang={lang}>
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pt-32 sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">{hub.eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight max-w-4xl">{hub.h1}</h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text)]/75 max-w-3xl">{hub.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
              {t.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={SITE.register} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold hover:border-[var(--accent)]">
              {t.trial}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => {
              const body = (
                <>
                  <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.soon ? "bg-[var(--border)] text-[var(--text)]/70" : "bg-[var(--accent)]/10 text-[var(--accent)]"}`}>{p.tag[lang]}</span>
                  <h2 className="mt-3 font-display text-xl font-bold">{p.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/70">{p.text[lang]}</p>
                  {!p.soon && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                      {t.view} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </>
              );
              return (
                <li key={p.key} className="flex">
                  {p.slug ? (
                    <a href={solutionHref(p.slug, lang)} className="flex w-full flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex w-full flex-col rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-6 opacity-80" aria-label={`${p.name}: ${t.soon}`}>
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-bold">{t.why}</h2>
          <p className="mt-3 leading-relaxed text-[var(--text)]/75">{t.whyText}</p>
        </div>
      </section>

      <Contact />
    </div>
  );
}
