import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../_lib/auth.js";
import { githubConfigured, readFile, writeFile } from "../_lib/github.js";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

const MAX_BYTES = 2.5 * 1024 * 1024;
const TYPES: [string, (b: Buffer) => boolean][] = [
  ["webp", (b) => b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP"],
  ["png", (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))],
  ["jpg", (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff],
];

/** POST {name, data (base64)}: add an image to public/images/blog and return its site URL. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!githubConfigured()) return res.status(503).json({ error: "Blog publishing is not configured (GITHUB_TOKEN)", code: "github_not_configured" });
  const { name, data } = (req.body || {}) as { name?: string; data?: string };
  if (typeof name !== "string" || typeof data !== "string") return res.status(400).json({ error: "Missing image" });
  const bytes = Buffer.from(data, "base64");
  if (!bytes.length || bytes.length > MAX_BYTES) return res.status(400).json({ error: "Images must be under 2.5 MB (WebP or JPEG at 1200x630 is ideal)" });
  const type = TYPES.find(([, test]) => test(bytes))?.[0];
  if (!type) return res.status(400).json({ error: "Use a WebP, PNG or JPEG image" });
  const base = name.replace(/\.[^.]*$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
  try {
    let file = `${base}.${type}`;
    for (let i = 2; await readFile(`public/images/blog/${file}`); i++) file = `${base}-${i}.${type}`;
    await writeFile(`public/images/blog/${file}`, bytes, `blog: Add image ${file}\n\nVia website admin by ${admin}`);
    return res.status(200).json({ url: `/images/blog/${file}` });
  } catch (err) {
    console.error("ADMIN UPLOAD ERROR:", err);
    return res.status(502).json({ error: "Could not upload the image. Try again." });
  }
}
