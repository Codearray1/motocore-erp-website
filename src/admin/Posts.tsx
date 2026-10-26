import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowLeft, Bold, CheckCircle2, ExternalLink, Heading2, ImagePlus, Italic, Link2, List, ListOrdered, Loader2, Plus, Quote, Trash2, X } from "lucide-react";
import { renderMarkdown } from "../../scripts/markdown.mjs";
import { ApiError, api, type PostFields, type PostSummary } from "./api";

const today = () => new Date().toISOString().slice(0, 10);
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const fmtDate = (d: string) => (d ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "");

type Editing = { slug: string; sha?: string; fields: PostFields; body: string; isNew: boolean };

export default function Posts({ onSignedOut }: { onSignedOut: () => void }) {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [notice, setNotice] = useState("");

  const fail = (err: unknown) => {
    if (err instanceof ApiError && err.status === 401) return onSignedOut();
    setError({ message: (err as Error).message, code: (err as ApiError).code });
  };

  const load = () =>
    api<{ posts: PostSummary[] }>("posts")
      .then(({ posts }) => {
        setPosts(posts);
        setError(null);
      })
      .catch(fail);
  useEffect(() => {
    load();
  }, []);

  const open = async (slug: string) => {
    try {
      const p = await api<{ slug: string; sha: string; fields: PostFields; body: string }>(`posts?slug=${encodeURIComponent(slug)}`);
      setEditing({ ...p, isNew: false });
    } catch (err) {
      fail(err);
    }
  };

  const startNew = () =>
    setEditing({ slug: "", isNew: true, body: "", fields: { title: "", description: "", date: today(), author: "MotoCore Team", tags: [], draft: true } });

  if (error?.code === "github_not_configured") {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <h1 className="font-display text-2xl font-bold">Connect blog publishing</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/75">
          Posts are saved to the website's GitHub repository, which rebuilds the site automatically. Create a fine-grained GitHub token for the
          motocore-erp-website repository with <strong>Contents: Read and write</strong>, add it in Vercel as <code>GITHUB_TOKEN</code>, then redeploy.
        </p>
      </div>
    );
  }

  if (editing) {
    return (
      <Editor
        initial={editing}
        onClose={(saved) => {
          setEditing(null);
          if (saved) {
            setNotice(saved);
            load();
          }
        }}
        onError={fail}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Blog</h1>
          <p className="mt-1 text-sm text-[var(--text)]/65">Articles at motocoreerp.com/blog. Publishing rebuilds the website; changes are live in about 1–2 minutes.</p>
        </div>
        <button type="button" onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 hover:opacity-90">
          <Plus className="h-4 w-4" aria-hidden="true" /> New post
        </button>
      </div>

      <AnimatePresence>
        {notice && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" /> {notice}
            <button type="button" onClick={() => setNotice("")} className="ml-auto" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </motion.p>
        )}
      </AnimatePresence>
      {error && (
        <p role="alert" className="mt-4 flex items-center gap-2 rounded-lg bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
          <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error.message}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        {!posts && !error && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-brand-red" aria-label="Loading" />
          </div>
        )}
        {posts?.length === 0 && <p className="py-16 text-center text-sm text-[var(--text)]/60">No posts yet. Write the first one.</p>}
        <ul className="divide-y divide-[var(--border)]">
          {posts?.map((p) => (
            <li key={p.slug} className="flex items-center gap-4 p-4 transition-colors hover:bg-[var(--bg-secondary)]">
              <button type="button" onClick={() => open(p.slug)} className="min-w-0 flex-1 text-left">
                <span className="block truncate font-semibold">{p.title || p.slug}</span>
                <span className="mt-0.5 block text-xs text-[var(--text)]/60">/blog/{p.slug} · {fmtDate(p.date)}</span>
              </button>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.draft ? "bg-[var(--border)] text-[var(--text)]/70" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"}`}>
                {p.draft ? "Draft" : "Published"}
              </span>
              {!p.draft && (
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="rounded-lg p-2 text-[var(--text)]/60 hover:text-brand-red" aria-label={`View ${p.title}`}>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <button type="button" onClick={() => open(p.slug)} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-semibold hover:border-brand-red">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Field({ label, hint, children, htmlFor }: { label: string; hint?: ReactNode; children: ReactNode; htmlFor: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/70">{label}</label>
        {hint && <span className="text-xs text-[var(--text)]/55">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const input = "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10";

const counter = (n: number, good: [number, number]) => <span className={n >= good[0] && n <= good[1] ? "text-emerald-600" : n > good[1] ? "text-brand-red" : ""}>{n} characters (best {good[0]}–{good[1]})</span>;

function Editor({ initial, onClose, onError }: { initial: Editing; onClose: (savedMessage?: string) => void; onError: (e: unknown) => void }) {
  const [f, setF] = useState<PostFields>(initial.fields);
  const [body, setBody] = useState(initial.body);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!initial.isNew);
  const [tagText, setTagText] = useState((initial.fields.tags || []).join(", "));
  const [view, setView] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState<"" | "draft" | "publish" | "delete" | "upload">("");
  const [problem, setProblem] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [coverPreview, setCoverPreview] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const dirty = useRef(false);

  const set = (patch: Partial<PostFields>) => {
    dirty.current = true;
    setF((x) => ({ ...x, ...patch }));
  };

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const html = useMemo(() => (view === "preview" ? renderMarkdown(body) : ""), [view, body]);
  const words = body.split(/\s+/).filter(Boolean).length;

  // Wrap the selection (or insert at the cursor) in the Markdown editor
  const wrap = (before: string, after = "", placeholder = "") => {
    const el = area.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = body.slice(s, e) || placeholder;
    const next = body.slice(0, s) + before + sel + after + body.slice(e);
    dirty.current = true;
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  };
  const linePrefix = (prefix: string) => {
    const el = area.current;
    if (!el) return;
    const s = body.lastIndexOf("\n", el.selectionStart - 1) + 1;
    dirty.current = true;
    setBody(body.slice(0, s) + prefix + body.slice(s));
    requestAnimationFrame(() => el.focus());
  };

  const upload = async (file: File, target: "cover" | "inline") => {
    if (file.size > 2.5 * 1024 * 1024) return setProblem("Images must be under 2.5 MB. Export as WebP or JPEG at about 1200x630.");
    setBusy("upload");
    setProblem("");
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(",")[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
      const { url } = await api<{ url: string }>("upload", { method: "POST", body: { name: file.name, data } });
      if (target === "cover") {
        set({ cover: url });
        setCoverPreview(URL.createObjectURL(file));
      } else {
        wrap(`![`, `](${url})`, "Describe the image");
      }
    } catch (err) {
      setProblem((err as Error).message);
      onError(err instanceof ApiError && err.status === 401 ? err : undefined);
    } finally {
      setBusy("");
    }
  };

  const save = async (draft: boolean) => {
    setProblem("");
    if (!slug) return setProblem("Add a title (the URL is made from it).");
    setBusy(draft ? "draft" : "publish");
    const fields: PostFields = {
      ...f,
      draft,
      tags: tagText.split(",").map((t) => t.trim()).filter(Boolean),
      // Mark a real edit to an already-published post as an update
      updated: !initial.isNew && !initial.fields.draft && !draft ? today() : f.updated,
    };
    try {
      await api("posts", { method: "PUT", body: { slug, sha: initial.sha, fields, body } });
      dirty.current = false;
      onClose(draft ? `Draft "${fields.title}" saved.` : `"${fields.title}" published. It will be live at /blog/${slug} in about 1–2 minutes.`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return onError(err);
      setProblem((err as Error).message);
      setBusy("");
    }
  };

  const remove = async () => {
    setBusy("delete");
    try {
      await api(`posts?slug=${encodeURIComponent(slug)}&sha=${encodeURIComponent(initial.sha || "")}`, { method: "DELETE" });
      dirty.current = false;
      onClose(`"${f.title}" deleted. The site updates in about 1–2 minutes.`);
    } catch (err) {
      setProblem((err as Error).message);
      setBusy("");
    }
  };

  const tools: [typeof Bold, string, () => void][] = [
    [Heading2, "Heading", () => linePrefix("## ")],
    [Bold, "Bold", () => wrap("**", "**", "bold text")],
    [Italic, "Italic", () => wrap("*", "*", "italic text")],
    [Link2, "Link", () => wrap("[", "](https://)", "link text")],
    [List, "Bullet list", () => linePrefix("- ")],
    [ListOrdered, "Numbered list", () => linePrefix("1. ")],
    [Quote, "Quote", () => linePrefix("> ")],
  ];

  const desc = f.description || "";
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => (!dirty.current || confirm("Leave without saving your changes?") ? onClose() : undefined)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-[var(--text)]/70 hover:text-[var(--text)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
        </button>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${initial.isNew || initial.fields.draft ? "bg-[var(--border)] text-[var(--text)]/70" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"}`}>
          {initial.isNew ? "New post" : initial.fields.draft ? "Draft" : "Published"}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button type="button" disabled={!!busy} onClick={() => save(true)} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red disabled:opacity-60">
            {busy === "draft" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} Save draft
          </button>
          <button type="button" disabled={!!busy} onClick={() => save(false)} className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 hover:opacity-90 disabled:opacity-60">
            {busy === "publish" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} {initial.isNew || initial.fields.draft ? "Publish" : "Update"}
          </button>
        </div>
      </div>

      {problem && (
        <p role="alert" className="mt-4 flex items-center gap-2 rounded-lg bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {problem}
        </p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Article */}
        <div className="min-w-0 space-y-4">
          <input
            aria-label="Title"
            value={f.title}
            onChange={(e) => {
              set({ title: e.target.value });
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="Post title"
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 font-display text-2xl font-bold outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
          />
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="flex flex-wrap items-center gap-1 border-b border-[var(--border)] px-2 py-1.5">
              {(["write", "preview"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold capitalize ${view === v ? "bg-[var(--bg-secondary)] text-[var(--text)]" : "text-[var(--text)]/60 hover:text-[var(--text)]"}`}
                >
                  {v}
                </button>
              ))}
              {view === "write" && (
                <div className="ml-2 flex flex-wrap items-center gap-0.5 border-l border-[var(--border)] pl-2">
                  {tools.map(([Icon, label, run]) => (
                    <button key={label} type="button" onClick={run} title={label} aria-label={label} className="rounded-lg p-2 text-[var(--text)]/65 hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                  <label title="Insert image" className="cursor-pointer rounded-lg p-2 text-[var(--text)]/65 hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
                    <ImagePlus className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Insert image</span>
                    <input type="file" accept="image/webp,image/png,image/jpeg" className="sr-only" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "inline")} />
                  </label>
                </div>
              )}
              <span className="ml-auto pr-2 text-xs text-[var(--text)]/55">{words} words · {Math.max(1, Math.round(words / 200))} min read</span>
            </div>
            {view === "write" ? (
              <textarea
                ref={area}
                aria-label="Article (Markdown)"
                value={body}
                onChange={(e) => {
                  dirty.current = true;
                  setBody(e.target.value);
                }}
                placeholder={"Start with a short paragraph that answers the reader's question.\n\n## Use headings for sections\n\n- Lists, **bold** and [links](/bike-showroom-software) work"}
                className="block min-h-[520px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 outline-none"
              />
            ) : (
              <div className="min-h-[520px] p-6">
                {body.trim() ? <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} /> : <p className="text-sm text-[var(--text)]/55">Nothing to preview yet.</p>}
              </div>
            )}
          </div>
        </div>

        {/* Settings and SEO */}
        <aside className="space-y-4">
          <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="font-display text-base font-bold">Search and sharing</h2>
            <Field label="URL" htmlFor="post-slug" hint={initial.isNew ? "Can't change after saving" : undefined}>
              <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm">
                <span className="pl-3 text-[var(--text)]/50">/blog/</span>
                <input
                  id="post-slug"
                  value={slug}
                  disabled={!initial.isNew}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className="w-full bg-transparent px-1 py-2.5 outline-none disabled:opacity-60"
                />
              </div>
            </Field>
            <Field label="Description" htmlFor="post-desc" hint={counter(desc.length, [120, 160])}>
              <textarea id="post-desc" rows={3} value={desc} onChange={(e) => set({ description: e.target.value })} className={`${input} resize-none`} placeholder="Shown on Google and on the blog card" />
            </Field>
            {/* Google result preview */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text)]/50">Google preview</p>
              <p className="mt-2 truncate text-xs text-[var(--text)]/60">motocoreerp.com › blog › {slug || "your-post"}</p>
              <p className="mt-0.5 line-clamp-2 text-[15px] font-medium leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">{(f.title || "Post title") + " | MotoCore Blog"}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--text)]/70">{desc || "Your description appears here."}</p>
            </div>
            <p className="text-xs text-[var(--text)]/55">Title: {counter(f.title.length, [40, 65])}</p>
          </section>

          <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="font-display text-base font-bold">Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Publish date" htmlFor="post-date">
                <input id="post-date" type="date" value={f.date} onChange={(e) => set({ date: e.target.value })} className={input} />
              </Field>
              <Field label="Author" htmlFor="post-author">
                <input id="post-author" value={f.author || ""} onChange={(e) => set({ author: e.target.value })} className={input} />
              </Field>
            </div>
            <Field label="Tags" htmlFor="post-tags" hint="Comma separated">
              <input id="post-tags" value={tagText} onChange={(e) => { dirty.current = true; setTagText(e.target.value); }} placeholder="Bike showroom, Nepal" className={input} />
            </Field>
            <Field label="Cover image" htmlFor="post-cover" hint="1200x630 ideal">
              {f.cover ? (
                <div className="space-y-2">
                  <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <img src={coverPreview || f.cover} alt="" className="aspect-[1200/630] w-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.2")} />
                    <button type="button" onClick={() => set({ cover: undefined, coverAlt: undefined })} className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white" aria-label="Remove cover image">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <input aria-label="Cover image description" value={f.coverAlt || ""} onChange={(e) => set({ coverAlt: e.target.value })} placeholder="Describe the image (for Google and screen readers)" className={input} />
                </div>
              ) : (
                <button
                  id="post-cover"
                  type="button"
                  disabled={busy === "upload"}
                  onClick={() => fileInput.current?.click()}
                  className="flex aspect-[1200/630] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] text-sm font-semibold text-[var(--text)]/60 hover:border-brand-red hover:text-brand-red"
                >
                  {busy === "upload" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <ImagePlus className="h-5 w-5" aria-hidden="true" />}
                  Upload cover
                </button>
              )}
              <input ref={fileInput} type="file" accept="image/webp,image/png,image/jpeg" className="sr-only" tabIndex={-1} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "cover")} />
            </Field>
          </section>

          {!initial.isNew && (
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              {confirmDelete ? (
                <div className="space-y-3">
                  <p className="text-sm">Delete this post? Its page will be removed from the website.</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={remove} disabled={!!busy} className="flex-1 rounded-xl bg-brand-red px-3 py-2.5 text-sm font-bold text-white">
                      {busy === "delete" ? "Deleting…" : "Delete post"}
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="flex-1 rounded-xl border border-[var(--border)] px-3 py-2.5 text-sm font-semibold">Keep</button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmDelete(true)} className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-[var(--text)]/60 hover:text-brand-red">
                  <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete post
                </button>
              )}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
