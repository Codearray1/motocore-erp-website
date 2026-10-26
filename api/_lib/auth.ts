import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { redis, storeConfigured } from "./store.js";

// ADMIN_USERS: comma-separated "email:salt:hash" entries made with `node scripts/admin-user.mjs <email>`.
// ADMIN_SESSION_SECRET: a long random string (at least 32 characters) used to sign the session cookie.
const COOKIE = "mc_admin";
const SESSION_SECONDS = 12 * 60 * 60;
const MAX_FAILS = 8; // per IP per 15 minutes

const b64u = (b: Buffer) => b.toString("base64url");

function users(): Map<string, { salt: string; hash: string }> {
  const map = new Map<string, { salt: string; hash: string }>();
  for (const entry of (process.env.ADMIN_USERS || "").split(",")) {
    const [email, salt, hash] = entry.trim().split(":");
    if (email && salt && hash) map.set(email.toLowerCase(), { salt, hash });
  }
  return map;
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || "";
  if (s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  return s;
}

export const adminConfigured = () => users().size > 0 && (process.env.ADMIN_SESSION_SECRET || "").length >= 32;

export function hashPassword(password: string, salt = b64u(randomBytes(16))) {
  return { salt, hash: b64u(scryptSync(password, salt, 64)) };
}

/** Constant-time password check; unknown emails cost the same as known ones. */
export function checkPassword(email: string, password: string): boolean {
  const user = users().get(email.trim().toLowerCase());
  const salt = user?.salt ?? "no-such-user-salt";
  const actual = scryptSync(password, salt, 64);
  const expected = user ? Buffer.from(user.hash, "base64url") : randomBytes(64);
  return Boolean(user) && expected.length === actual.length && timingSafeEqual(expected, actual);
}

const sign = (payload: string) => b64u(createHmac("sha256", secret()).update(payload).digest());

export function sessionCookie(email: string) {
  const payload = b64u(Buffer.from(JSON.stringify({ e: email.toLowerCase(), exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })));
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export const clearCookie = () => `${COOKIE}=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

function readSession(req: VercelRequest): string | null {
  const raw = (req.headers.cookie || "").split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  const [payload, sig] = raw.slice(COOKIE.length + 1).split(".");
  if (!payload || !sig) return null;
  const good = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (good.length !== given.length || !timingSafeEqual(good, given)) return null;
  try {
    const { e, exp } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; exp: number };
    if (exp < Date.now() / 1000 || !users().has(e)) return null; // removed users lose access at once
    return e;
  } catch {
    return null;
  }
}

/**
 * The signed-in admin's email, or null after sending 401/403. Requests that change data must also carry the
 * X-MotoCore-Admin header: other sites cannot add custom headers to a cross-site request (CSRF protection on
 * top of the SameSite=Strict cookie).
 */
export function requireAdmin(req: VercelRequest, res: VercelResponse): string | null {
  res.setHeader("Cache-Control", "no-store");
  if (!adminConfigured()) {
    res.status(503).json({ error: "Admin login is not configured on the server" });
    return null;
  }
  if (req.method !== "GET" && req.headers["x-motocore-admin"] !== "1") {
    res.status(403).json({ error: "Missing admin request header" });
    return null;
  }
  const email = readSession(req);
  if (!email) {
    res.status(401).json({ error: "Please sign in" });
    return null;
  }
  return email;
}

export const sessionEmail = (req: VercelRequest) => (adminConfigured() ? readSession(req) : null);

// Failed-login throttle: in Redis when connected (shared by all function instances), else per instance
const memoryFails = new Map<string, { n: number; until: number }>();
const clientIp = (req: VercelRequest) => String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";

// Redis errors fall back to the per-instance counter (the password check itself never depends on Redis)
async function viaStore<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!storeConfigured()) return fallback();
  try {
    return await fn();
  } catch (err) {
    console.error("LOGIN THROTTLE STORE ERROR:", err);
    return fallback();
  }
}

export function loginBlocked(req: VercelRequest): Promise<boolean> {
  const ip = clientIp(req);
  return viaStore(
    async () => Number((await redis<string | null>(["GET", `login:fail:${ip}`])) || 0) >= MAX_FAILS,
    () => {
      const m = memoryFails.get(ip);
      return Boolean(m && m.until > Date.now() && m.n >= MAX_FAILS);
    },
  );
}

export function recordFailedLogin(req: VercelRequest): Promise<void> {
  const ip = clientIp(req);
  const inMemory = () => {
    const m = memoryFails.get(ip);
    memoryFails.set(ip, m && m.until > Date.now() ? { n: m.n + 1, until: m.until } : { n: 1, until: Date.now() + 900_000 });
  };
  return viaStore(async () => {
    await redis(["INCR", `login:fail:${ip}`]);
    await redis(["EXPIRE", `login:fail:${ip}`, 900]);
  }, inMemory);
}

export function clearFailedLogins(req: VercelRequest): Promise<void> {
  const ip = clientIp(req);
  return viaStore(
    async () => {
      await redis(["DEL", `login:fail:${ip}`]);
    },
    () => {
      memoryFails.delete(ip);
    },
  );
}
