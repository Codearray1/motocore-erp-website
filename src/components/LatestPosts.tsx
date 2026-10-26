import { ArrowRight } from "lucide-react";
import { POSTS, formatDate } from "../seo/blog";

/** Home page: the three newest blog posts (hidden until there is one). */
export default function LatestPosts() {
  if (POSTS.length === 0) return null;
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">MotoCore blog</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Guides for automobile businesses</h2>
          </div>
          <a href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline">
            All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {POSTS.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <a href={`/blog/${p.slug}`} className="block h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)]">
                <p className="text-xs text-[var(--text)]/70"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.minutes} min read</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/75">{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
