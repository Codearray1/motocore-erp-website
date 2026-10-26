import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminConfigured, checkPassword, clearCookie, clearFailedLogins, loginBlocked, recordFailedLogin, sessionCookie, sessionEmail } from "../_lib/auth.js";
import { githubConfigured } from "../_lib/github.js";
import { storeConfigured } from "../_lib/store.js";

/** GET: who is signed in (and what is set up) · POST: sign in · DELETE: sign out */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") {
    const email = sessionEmail(req);
    return res.status(200).json({
      email,
      setup: { login: adminConfigured(), blog: email ? githubConfigured() : undefined, leads: email ? storeConfigured() : undefined },
    });
  }
  if (req.method === "POST") {
    if (!adminConfigured()) return res.status(503).json({ error: "Admin login is not configured on the server" });
    if (req.headers["x-motocore-admin"] !== "1") return res.status(403).json({ error: "Missing admin request header" });
    if (await loginBlocked(req)) return res.status(429).json({ error: "Too many failed sign-in attempts. Try again in 15 minutes." });
    const { email, password } = (req.body || {}) as { email?: string; password?: string };
    if (typeof email !== "string" || typeof password !== "string" || !email || !password || password.length > 200) {
      return res.status(400).json({ error: "Enter your email and password" });
    }
    if (!checkPassword(email, password)) {
      await recordFailedLogin(req);
      return res.status(401).json({ error: "Wrong email or password" });
    }
    await clearFailedLogins(req);
    res.setHeader("Set-Cookie", sessionCookie(email));
    return res.status(200).json({ email: email.trim().toLowerCase() });
  }
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearCookie());
    return res.status(200).json({ ok: true });
  }
  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
