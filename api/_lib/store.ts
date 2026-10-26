// Upstash Redis over its REST API (no driver needed). Connect it in Vercel: Storage → Upstash for Redis,
// which sets KV_REST_API_URL and KV_REST_API_TOKEN (UPSTASH_REDIS_REST_URL/TOKEN also work).
const env = () => ({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export const storeConfigured = () => {
  const { url, token } = env();
  return Boolean(url && token);
};

export async function redis<T = unknown>(command: (string | number)[]): Promise<T> {
  const { url, token } = env();
  if (!url || !token) throw new Error("Lead storage is not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const json = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || json.error) throw new Error(`Redis ${command[0]} failed: ${json.error || res.status}`);
  return json.result as T;
}

export interface Lead {
  id: string;
  createdAt: string; // ISO
  status: "new" | "contacted" | "closed";
  formType: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  message: string;
}

export const LEAD_STATUSES: Lead["status"][] = ["new", "contacted", "closed"];
const HASH = "leads";
const INDEX = "leads:index"; // sorted set: id scored by creation time (ms)
const RETENTION_MS = 2 * 365 * 24 * 60 * 60 * 1000; // privacy policy: enquiries kept for 2 years

export async function saveLead(lead: Lead) {
  await redis(["HSET", HASH, lead.id, JSON.stringify(lead)]);
  await redis(["ZADD", INDEX, Date.parse(lead.createdAt), lead.id]);
}

export async function listLeads(limit = 500): Promise<Lead[]> {
  // Drop enquiries past the retention period first
  const expired = await redis<string[]>(["ZRANGEBYSCORE", INDEX, 0, Date.now() - RETENTION_MS]);
  if (expired.length) {
    await redis(["HDEL", HASH, ...expired]);
    await redis(["ZREM", INDEX, ...expired]);
  }
  const ids = await redis<string[]>(["ZREVRANGE", INDEX, 0, limit - 1]);
  if (!ids.length) return [];
  const rows = await redis<(string | null)[]>(["HMGET", HASH, ...ids]);
  return rows.filter((r): r is string => !!r).map((r) => JSON.parse(r) as Lead);
}

export async function getLead(id: string): Promise<Lead | null> {
  const row = await redis<string | null>(["HGET", HASH, id]);
  return row ? (JSON.parse(row) as Lead) : null;
}

export async function updateLead(lead: Lead) {
  await redis(["HSET", HASH, lead.id, JSON.stringify(lead)]);
}

export async function deleteLead(id: string) {
  await redis(["HDEL", HASH, id]);
  await redis(["ZREM", INDEX, id]);
}
