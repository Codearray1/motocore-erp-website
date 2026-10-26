// Blog posts and images are files in the website's GitHub repository. Saving one commits it, and the commit
// triggers a new Vercel deployment, so posts stay pre-rendered static pages (best for search engines).
// GITHUB_TOKEN: fine-grained token limited to this repository with "Contents: read and write".
const cfg = () => ({
  api: (process.env.GITHUB_API_URL || "https://api.github.com").replace(/\/$/, ""),
  repo: process.env.GITHUB_REPO || "Codearray1/motocore-erp-website",
  branch: process.env.GITHUB_BRANCH || "main",
  token: process.env.GITHUB_TOKEN || "",
});

export const githubConfigured = () => Boolean(cfg().token);

async function gh<T>(method: string, path: string, body?: unknown): Promise<{ status: number; data: T }> {
  const { api, repo, token } = cfg();
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  const res = await fetch(`${api}/repos/${repo}/contents/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json().catch(() => null)) as T;
  if (res.status >= 400 && res.status !== 404) {
    const msg = (data as { message?: string } | null)?.message || res.statusText;
    const err = new Error(`GitHub ${method} ${path}: ${res.status} ${msg}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return { status: res.status, data };
}

export interface RepoFile {
  path: string;
  sha: string;
  content: string; // decoded UTF-8
}

export async function readFile(path: string): Promise<RepoFile | null> {
  const { status, data } = await gh<{ sha: string; content: string; type: string }>("GET", `${path}?ref=${encodeURIComponent(cfg().branch)}`);
  if (status === 404 || data.type !== "file") return null;
  return { path, sha: data.sha, content: Buffer.from(data.content, "base64").toString("utf8") };
}

export async function listDir(path: string): Promise<{ name: string; path: string; sha: string }[]> {
  const { status, data } = await gh<{ name: string; path: string; sha: string; type: string }[]>("GET", `${path}?ref=${encodeURIComponent(cfg().branch)}`);
  if (status === 404 || !Array.isArray(data)) return [];
  return data.filter((f) => f.type === "file");
}

/** Create (no sha) or update (sha of the version being replaced) one file in a single commit. */
export async function writeFile(path: string, content: Buffer | string, message: string, sha?: string) {
  const { data } = await gh<{ content: { sha: string } }>("PUT", path, {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: cfg().branch,
    ...(sha ? { sha } : {}),
  });
  return { sha: data.content.sha };
}

export async function deleteFile(path: string, sha: string, message: string) {
  await gh("DELETE", path, { message, sha, branch: cfg().branch });
}
