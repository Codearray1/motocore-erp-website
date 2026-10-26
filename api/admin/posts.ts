import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parse as parseYaml, stringify as toYaml } from "yaml";
import { requireAdmin } from "../_lib/auth.js";
import { deleteFile, githubConfigured, listDir, readFile, writeFile } from "../_lib/github.js";

const DIR = "src/content/blog";
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export interface PostFields {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  draft?: boolean;
}

function split(raw: string): { fields: PostFields; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const fm = (m ? parseYaml(m[1]) : {}) ?? {};
  const day = (v: unknown) => (v instanceof Date ? v.toISOString() : v ? String(v) : "").slice(0, 10);
  return {
    fields: {
      title: String(fm.title ?? ""),
      description: String(fm.description ?? ""),
      date: day(fm.date),
      updated: fm.updated ? day(fm.updated) : undefined,
      author: fm.author ? String(fm.author) : undefined,
      tags: Array.isArray(fm.tags) ? fm.tags.map(String) : typeof fm.tags === "string" ? fm.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      cover: fm.cover ? String(fm.cover) : undefined,
      coverAlt: fm.coverAlt ? String(fm.coverAlt) : undefined,
      draft: fm.draft === true,
    },
    body: m ? m[2] : raw,
  };
}

function validate(f: PostFields, body: string): string | null {
  if (!f.title?.trim() || f.title.length > 120) return "Title is required (up to 120 characters)";
  if (!f.description?.trim() || f.description.length > 300) return "Description is required (up to 300 characters)";
  if (!DAY.test(f.date || "")) return "Publish date must be YYYY-MM-DD";
  if (f.updated && !DAY.test(f.updated)) return "Updated date must be YYYY-MM-DD";
  if (f.cover && !/^\/images\/blog\/[\w.-]+$/.test(f.cover)) return "Cover must be an uploaded image";
  if (!body.trim()) return "The article is empty";
  if (body.length > 200_000) return "The article is too long";
  return null;
}

function toMarkdown(f: PostFields, body: string): string {
  const fm: Record<string, unknown> = {
    title: f.title.trim(),
    description: f.description.trim(),
    date: f.date,
    ...(f.updated ? { updated: f.updated } : {}),
    author: f.author?.trim() || "MotoCore Team",
    tags: (f.tags || []).map((t) => t.trim()).filter(Boolean).slice(0, 10),
    ...(f.cover ? { cover: f.cover, coverAlt: f.coverAlt?.trim() || "" } : {}),
    ...(f.draft ? { draft: true } : {}),
  };
  return `---\n${toYaml(fm, { lineWidth: 0 })}---\n\n${body.trim()}\n`;
}

/**
 * GET              list posts (title, date, draft) · GET ?slug=  one post for editing
 * PUT  {slug, sha?, fields, body}  create (no sha) or update a post · DELETE ?slug=&sha=  delete a post
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!githubConfigured()) return res.status(503).json({ error: "Blog publishing is not configured (GITHUB_TOKEN)", code: "github_not_configured" });

  try {
    if (req.method === "GET") {
      const slug = typeof req.query.slug === "string" ? req.query.slug : "";
      if (slug) {
        if (!SLUG.test(slug)) return res.status(400).json({ error: "Invalid slug" });
        const file = await readFile(`${DIR}/${slug}.md`);
        if (!file) return res.status(404).json({ error: "Post not found" });
        return res.status(200).json({ slug, sha: file.sha, ...split(file.content) });
      }
      const files = (await listDir(DIR)).filter((f) => f.name.endsWith(".md") && !f.name.startsWith("_"));
      const posts = await Promise.all(
        files.map(async (f) => {
          const file = await readFile(f.path);
          const { fields } = split(file?.content || "");
          return { slug: f.name.replace(/\.md$/, ""), sha: file?.sha, title: fields.title, date: fields.date, draft: fields.draft };
        }),
      );
      posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      return res.status(200).json({ posts });
    }

    if (req.method === "PUT") {
      const { slug, sha, fields, body } = (req.body || {}) as { slug?: string; sha?: string; fields?: PostFields; body?: string };
      if (typeof slug !== "string" || !SLUG.test(slug) || slug.length > 90) return res.status(400).json({ error: "URL must be lowercase words joined by hyphens" });
      if (!fields || typeof body !== "string") return res.status(400).json({ error: "Missing post content" });
      const problem = validate(fields, body);
      if (problem) return res.status(400).json({ error: problem });
      const path = `${DIR}/${slug}.md`;
      if (!sha && (await readFile(path))) return res.status(409).json({ error: "A post with this URL already exists" });
      const verb = sha ? "Update" : "Add";
      const result = await writeFile(path, toMarkdown(fields, body), `blog: ${verb} "${fields.title.trim()}"${fields.draft ? " (draft)" : ""}\n\nVia website admin by ${admin}`, sha);
      return res.status(200).json({ slug, sha: result.sha });
    }

    if (req.method === "DELETE") {
      const slug = typeof req.query.slug === "string" ? req.query.slug : "";
      const sha = typeof req.query.sha === "string" ? req.query.sha : "";
      if (!SLUG.test(slug) || !sha) return res.status(400).json({ error: "Invalid request" });
      await deleteFile(`${DIR}/${slug}.md`, sha, `blog: Delete "${slug}"\n\nVia website admin by ${admin}`);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    const status = (err as { status?: number }).status;
    console.error("ADMIN POSTS ERROR:", err);
    if (status === 409 || status === 422) return res.status(409).json({ error: "This post was changed elsewhere. Reload it and try again." });
    return res.status(502).json({ error: "Could not reach GitHub. Try again." });
  }
}
