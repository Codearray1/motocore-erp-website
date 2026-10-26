import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../_lib/auth.js";
import { LEAD_STATUSES, deleteLead, getLead, listLeads, storeConfigured, updateLead, type Lead } from "../_lib/store.js";

/** GET: enquiries, newest first · PATCH {id, status}: mark progress · DELETE ?id=: remove one enquiry */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!storeConfigured()) return res.status(503).json({ error: "Enquiry storage is not connected", code: "store_not_configured" });
  try {
    if (req.method === "GET") return res.status(200).json({ leads: await listLeads() });
    if (req.method === "PATCH") {
      const { id, status } = (req.body || {}) as { id?: string; status?: Lead["status"] };
      if (typeof id !== "string" || !LEAD_STATUSES.includes(status as Lead["status"])) return res.status(400).json({ error: "Invalid request" });
      const lead = await getLead(id);
      if (!lead) return res.status(404).json({ error: "Enquiry not found" });
      await updateLead({ ...lead, status: status as Lead["status"] });
      return res.status(200).json({ ok: true });
    }
    if (req.method === "DELETE") {
      const id = typeof req.query.id === "string" ? req.query.id : "";
      if (!id) return res.status(400).json({ error: "Invalid request" });
      await deleteLead(id);
      return res.status(200).json({ ok: true });
    }
    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("ADMIN LEADS ERROR:", err);
    return res.status(502).json({ error: "Could not reach enquiry storage. Try again." });
  }
}
