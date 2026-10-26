import { ArrowRight } from "lucide-react";
import Contact from "../components/Contact";
import { BLOG, POSTS, formatDate, type BlogPost } from "../seo/blog";
import { PRODUCTS, SITE } from "../seo/content";
import { solutionHref } from "../seo/routes";

const Meta = ({ post }: { post: BlogPost }) => (
  <p className="text-xs text-[var(--text)]/70">
    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
  </p>
);

/** /blog: every published post, newest first. */
export function BlogIndex() {
  return (
    <div>
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-10 sm:pt-32">
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--text)]/70 mb-5">
            <a href="/" className="hover:text-[var(--accent)]">Home</a> <span aria-hidden="true">/</span> <span>Blog</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-5xl font-bold">{BLOG.h1}</h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-[var(--text)]/75">{BLOG.intro}</p>
        </div>
      </section>
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {POSTS.length === 0 ? (
            <p className="text-[var(--text)]/70">New articles are on the way.</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {POSTS.map((p) => (
                <li key={p.slug} className="flex">
                  <a href={`/blog/${p.slug}`} className="flex w-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]">
                    {p.cover && <img src={p.cover} alt={p.coverAlt ?? ""} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover" />}
                    <div className="flex flex-1 flex-col p-6">
                      <Meta post={p} />
                      <h2 className="mt-2 font-display text-xl font-bold leading-snug">{p.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text)]/75">{p.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                        Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Contact />
    </div>
  );
}

/** /blog/<slug>: one article, then links into the product pages. */
export function BlogArticle({ post }: { post: BlogPost }) {
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <div>
      <article className="bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-14 sm:pt-32">
          <nav aria-label="Breadcrumb" className="text-xs text-[var(--text)]/70 mb-5">
            <a href="/" className="hover:text-[var(--accent)]">Home</a> <span aria-hidden="true">/</span>{" "}
            <a href="/blog" className="hover:text-[var(--accent)]">Blog</a>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2">
            <Meta post={post} />
            <span className="text-xs text-[var(--text)]/70">· {post.author}</span>
            {post.updated && <span className="text-xs text-[var(--text)]/70">· Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
          </div>
          {post.cover && <img src={post.cover} alt={post.coverAlt ?? ""} className="mt-8 w-full rounded-xl border border-[var(--border)]" />}
          {/* Trusted content: Markdown from this repository, rendered at build time */}
          <div className="blog-prose mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text)]/75">{t}</li>
              ))}
            </ul>
          )}
          <aside className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
            <p className="font-display text-lg font-bold">See MotoCore in action</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text)]/75">
              All-in-one automobile management for Nepal: {PRODUCTS.filter((p) => p.slug).map((p, i, all) => (
                <span key={p.key}>
                  <a href={solutionHref(p.slug as string, "en")} className="font-semibold text-[var(--accent)] hover:underline">{p.name}</a>
                  {i < all.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Book a free demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={SITE.phoneHref} className="inline-flex items-center rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)]">
                Call {SITE.phone}
              </a>
            </div>
          </aside>
        </div>
      </article>
      {more.length > 0 && (
        <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="font-display text-2xl font-bold">More from the blog</h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="block h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--accent)]">
                    <Meta post={p} />
                    <h3 className="mt-2 font-semibold leading-snug">{p.title}</h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <Contact />
    </div>
  );
}
