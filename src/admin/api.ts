/** Calls to the admin API (Vercel functions under /api/admin). */
export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
  }
}

export async function api<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api/admin/${path}`, {
    method: init.method || "GET",
    credentials: "same-origin",
    headers: { "X-MotoCore-Admin": "1", ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}) },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || `Request failed (${res.status})`, res.status, data.code);
  return data as T;
}

export interface Session {
  email: string | null;
  setup: { login: boolean; blog?: boolean; leads?: boolean };
}

export interface Lead {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
  formType: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  message: string;
}

export interface PostSummary {
  slug: string;
  sha: string;
  title: string;
  date: string;
  draft: boolean;
}

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
