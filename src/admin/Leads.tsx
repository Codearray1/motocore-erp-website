import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ChevronDown, Download, Loader2, Mail, MessageCircle, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import { ApiError, api, type Lead } from "./api";

const STATUS: Record<Lead["status"], { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-brand-red/10 text-brand-red" },
  contacted: { label: "Contacted", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  closed: { label: "Closed", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
};

const FORM_LABEL: Record<string, string> = { contact: "Contact form", request_demo: "Demo request", early_access: "Early access", beta_access: "Beta access" };

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const digits = (phone: string) => phone.replace(/[^\d+]/g, "");
const whatsapp = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `https://wa.me/${d.length === 10 ? `977${d}` : d}`;
};

function exportCsv(rows: Lead[]) {
  const cols: (keyof Lead)[] = ["createdAt", "status", "formType", "name", "email", "phone", "businessName", "businessType", "message"];
  // Prefix cells that a spreadsheet would treat as formulas
  const cell = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell(String(r[c] ?? ""))).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = `motocore-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Leads({ onNewCount, onSignedOut }: { onNewCount: (n: number) => void; onSignedOut: () => void }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);
  const [filter, setFilter] = useState<"all" | Lead["status"]>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { leads } = await api<{ leads: Lead[] }>("leads");
      setLeads(leads);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return onSignedOut();
      setError({ message: (err as Error).message, code: (err as ApiError).code });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    onNewCount(leads?.filter((l) => l.status === "new").length ?? 0);
  }, [leads]);

  const setStatus = async (lead: Lead, status: Lead["status"]) => {
    setLeads((ls) => ls?.map((l) => (l.id === lead.id ? { ...l, status } : l)) ?? null);
    try {
      await api("leads", { method: "PATCH", body: { id: lead.id, status } });
    } catch (err) {
      setLeads((ls) => ls?.map((l) => (l.id === lead.id ? lead : l)) ?? null);
      setError({ message: (err as Error).message });
    }
  };

  const remove = async (lead: Lead) => {
    try {
      await api(`leads?id=${encodeURIComponent(lead.id)}`, { method: "DELETE" });
      setLeads((ls) => ls?.filter((l) => l.id !== lead.id) ?? null);
    } catch (err) {
      setError({ message: (err as Error).message });
    }
    setConfirmDelete(null);
  };

  const counts = useMemo(() => {
    const c = { all: leads?.length ?? 0, new: 0, contacted: 0, closed: 0 };
    leads?.forEach((l) => c[l.status]++);
    return c;
  }, [leads]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (leads ?? []).filter(
      (l) => (filter === "all" || l.status === filter) && (!q || [l.name, l.email, l.phone, l.businessName, l.businessType, l.message].some((v) => v?.toLowerCase().includes(q))),
    );
  }, [leads, filter, query]);

  if (error?.code === "store_not_configured") {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <h1 className="font-display text-2xl font-bold">Connect enquiry storage</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text)]/75">
          Website enquiries are emailed to you and sent to the MotoCore platform. To also see them here, connect a free Upstash Redis database
          in Vercel: <strong>Project → Storage → Create Database → Upstash for Redis</strong>, connect it to this project, then redeploy.
          New enquiries appear here from then on.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Enquiries</h1>
          <p className="mt-1 text-sm text-[var(--text)]/65">Contact, demo and early-access forms from the website. Kept for 2 years.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" /> Refresh
          </button>
          <button type="button" onClick={() => exportCsv(shown)} disabled={!shown.length} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red disabled:opacity-50">
            <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {(["all", "new", "contacted", "closed"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            aria-pressed={filter === k}
            className={`rounded-2xl border p-4 text-left transition ${filter === k ? "border-brand-red bg-[var(--card)] shadow-lg shadow-brand-red/10" : "border-[var(--border)] bg-[var(--card)] hover:border-brand-red/50"}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/60">{k === "all" ? "All" : STATUS[k].label}</span>
            <span className="mt-1 block font-display text-3xl font-bold">{counts[k]}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text)]/50" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, business, phone, email or message"
          aria-label="Search enquiries"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 flex items-center gap-2 rounded-lg bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
          <AlertCircle className="h-4 w-4" aria-hidden="true" /> {error.message}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {!leads && !error && (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-brand-red" aria-label="Loading" />
          </div>
        )}
        {leads && shown.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center text-sm text-[var(--text)]/60">
            {leads.length ? "No enquiries match." : "No enquiries yet. They appear here as soon as someone fills in a form on the website."}
          </p>
        )}
        <AnimatePresence initial={false}>
          {shown.map((l) => {
            const isOpen = open === l.id;
            return (
              <motion.div
                key={l.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`overflow-hidden rounded-2xl border bg-[var(--card)] transition-colors ${isOpen ? "border-brand-red/50" : "border-[var(--border)]"}`}
              >
                <button type="button" onClick={() => setOpen(isOpen ? null : l.id)} aria-expanded={isOpen} className="flex w-full items-center gap-4 p-4 text-left">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${l.status === "new" ? "bg-brand-red" : "bg-transparent"}`} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold">{l.name}</span>
                      {l.businessName && l.businessName !== "Not provided" && <span className="text-sm text-[var(--text)]/65">{l.businessName}</span>}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-[var(--text)]/60">{l.message || l.email}</span>
                  </span>
                  <span className="hidden text-right text-xs text-[var(--text)]/60 sm:block">
                    {FORM_LABEL[l.formType] ?? l.formType}
                    <span className="block">{when(l.createdAt)}</span>
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS[l.status].cls}`}>{STATUS[l.status].label}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="grid gap-6 border-t border-[var(--border)] p-5 md:grid-cols-[1fr_260px]">
                        <div>
                          <dl className="grid gap-3 text-sm sm:grid-cols-2">
                            {[
                              ["Email", l.email],
                              ["Phone", l.phone],
                              ["Business", l.businessName],
                              ["Business type", l.businessType],
                              ["Form", FORM_LABEL[l.formType] ?? l.formType],
                              ["Received", when(l.createdAt)],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/55">{k}</dt>
                                <dd className="mt-0.5 break-words">{v || "—"}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--text)]/55">Message</p>
                          <p className="mt-1 whitespace-pre-wrap rounded-xl bg-[var(--bg-secondary)] p-4 text-sm leading-relaxed">{l.message || "No message"}</p>
                        </div>
                        <div className="space-y-2">
                          <a href={`mailto:${l.email}`} className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red">
                            <Mail className="h-4 w-4 text-brand-red" aria-hidden="true" /> Email
                          </a>
                          <a href={`tel:${digits(l.phone)}`} className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red">
                            <Phone className="h-4 w-4 text-brand-red" aria-hidden="true" /> Call
                          </a>
                          <a href={whatsapp(l.phone)} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold hover:border-brand-red">
                            <MessageCircle className="h-4 w-4 text-brand-red" aria-hidden="true" /> WhatsApp
                          </a>
                          <label className="block pt-2 text-xs font-bold uppercase tracking-wider text-[var(--text)]/55" htmlFor={`status-${l.id}`}>Status</label>
                          <select
                            id={`status-${l.id}`}
                            value={l.status}
                            onChange={(e) => setStatus(l, e.target.value as Lead["status"])}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm font-semibold"
                          >
                            {(Object.keys(STATUS) as Lead["status"][]).map((s) => (
                              <option key={s} value={s}>{STATUS[s].label}</option>
                            ))}
                          </select>
                          {confirmDelete === l.id ? (
                            <div className="flex gap-2 pt-2">
                              <button type="button" onClick={() => remove(l)} className="flex-1 rounded-xl bg-brand-red px-3 py-2.5 text-sm font-bold text-white">Delete</button>
                              <button type="button" onClick={() => setConfirmDelete(null)} className="flex-1 rounded-xl border border-[var(--border)] px-3 py-2.5 text-sm font-semibold">Keep</button>
                            </div>
                          ) : (
                            <button type="button" onClick={() => setConfirmDelete(l.id)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text)]/60 hover:text-brand-red">
                              <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete enquiry
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
