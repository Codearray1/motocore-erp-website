import type { LegalDoc } from "../seo/legal";

/** Privacy Policy, Terms of Service and Support: plain, readable text. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32">
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--text)]/70 mb-5">
          <a href="/" className="hover:text-[var(--accent)]">Home</a> <span aria-hidden="true">/</span> <span>{doc.h1}</span>
        </nav>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">{doc.h1}</h1>
        <p className="mt-2 text-sm text-[var(--text)]/70">{doc.slug === "support" ? "Last updated" : "Effective date"}: {doc.effective}</p>
        <p className="mt-6 leading-relaxed text-[var(--text)]/85">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-xl font-bold">{s.heading}</h2>
            {s.body.map((b, i) =>
              Array.isArray(b) ? (
                <ul key={i} className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-[var(--text)]/85">
                  {b.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mt-3 leading-relaxed text-[var(--text)]/85">{b}</p>
              ),
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
