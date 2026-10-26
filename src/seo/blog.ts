/**
 * Blog posts are Markdown files in src/content/blog/<slug>.md with a YAML front-matter block
 * (see _template.md). They are read at build time and pre-rendered like every other page.
 * Files starting with "_" and posts with `draft: true` are not published.
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string; // meta description and card summary, under ~160 characters
  date: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD
  author: string;
  tags: string[];
  cover?: string; // /images/blog/... (public folder)
  coverAlt?: string;
  html: string;
  minutes: number; // reading time
}

// Parsed at build time by scripts/blog-md.mjs (the "?post" query)
const files = import.meta.glob("../content/blog/*.md", { query: "?post", import: "default", eager: true }) as Record<
  string,
  { frontmatter: Record<string, unknown>; html: string; words: number }
>;

const day = (v: unknown) => (v ? String(v) : "").slice(0, 10);

function toPost(path: string, { frontmatter: fm, html, words }: (typeof files)[string]): (BlogPost & { draft: boolean }) | null {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  if (slug.startsWith("_")) return null;
  return {
    slug,
    title: String(fm.title),
    description: String(fm.description),
    date: day(fm.date),
    updated: fm.updated ? day(fm.updated) : undefined,
    author: fm.author ? String(fm.author) : "MotoCore Team",
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : typeof fm.tags === "string" ? fm.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    cover: fm.cover ? String(fm.cover) : undefined,
    coverAlt: fm.coverAlt ? String(fm.coverAlt) : undefined,
    html,
    minutes: Math.max(1, Math.round(words / 200)),
    draft: fm.draft === true,
  };
}

/** Published posts, newest first. */
export const POSTS: BlogPost[] = Object.entries(files)
  .map(([path, data]) => toPost(path, data))
  .filter((p): p is BlogPost & { draft: boolean } => !!p && !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const BLOG = {
  title: "MotoCore Blog | Automobile Business Guides for Nepal",
  description: "Practical guides for bike showrooms, spare parts businesses, workshops and used vehicle dealers in Nepal, from the MotoCore team.",
  h1: "MotoCore Blog",
  intro: "Practical guides for running bike showrooms, spare parts businesses, workshops and used vehicle dealerships in Nepal.",
};

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
