import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, FileText, Inbox, Loader2, LogOut, Moon, Sun } from "lucide-react";
import logo from "../assets/motocore-logo.png";
import { api, type Session } from "./api";
import Login from "./Login";
import Leads from "./Leads";
import Posts from "./Posts";

type Tab = "leads" | "posts";

/** motocoreerp.com/admin: sign in, then manage website enquiries and blog posts. */
export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>(() => (location.hash === "#blog" ? "posts" : "leads"));
  const [newLeads, setNewLeads] = useState(0);
  const [dark, setDark] = useState(() => document.documentElement.getAttribute("data-theme") === "dark");

  const refresh = () => api<Session>("session").then(setSession).catch(() => setSession({ email: null, setup: { login: false } }));
  useEffect(() => {
    refresh();
  }, []);
  useEffect(() => {
    history.replaceState(null, "", tab === "posts" ? "#blog" : "#enquiries");
  }, [tab]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("motocore_theme", next ? "dark" : "light");
    } catch {}
  };

  const signOut = async () => {
    await api("session", { method: "DELETE" }).catch(() => {});
    setSession({ email: null, setup: session?.setup ?? { login: true } });
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-secondary)]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-red" aria-label="Loading" />
      </div>
    );
  }
  if (!session.email) return <Login configured={session.setup.login} onSignedIn={refresh} />;

  const tabs: { id: Tab; label: string; icon: typeof Inbox; badge?: number }[] = [
    { id: "leads", label: "Enquiries", icon: Inbox, badge: newLeads },
    { id: "posts", label: "Blog", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2" title="View website">
            <img src={logo} alt="MotoCore" className="h-8 w-auto" />
            <span className="hidden rounded-md bg-brand-red/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-red sm:inline">Admin</span>
          </a>
          <nav className="ml-2 flex items-center gap-1" aria-label="Admin sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
                className={`relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${tab === t.id ? "text-brand-red" : "text-[var(--text)]/70 hover:text-[var(--text)]"}`}
              >
                <t.icon className="h-4 w-4" aria-hidden="true" />
                {t.label}
                {!!t.badge && <span className="rounded-full bg-brand-red px-1.5 text-[11px] font-bold leading-5 text-white">{t.badge}</span>}
                {tab === t.id && <motion.span layoutId="tab-underline" className="absolute inset-x-2 -bottom-[13px] h-0.5 rounded-full bg-brand-red" />}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener" className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text)]/70 hover:text-[var(--text)] md:inline-flex">
              View site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button type="button" onClick={toggleTheme} className="rounded-lg p-2 text-[var(--text)]/70 hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <span className="hidden text-xs text-[var(--text)]/60 lg:inline">{session.email}</span>
            <button type="button" onClick={signOut} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold hover:border-brand-red hover:text-brand-red">
              <LogOut className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            {tab === "leads" ? <Leads onNewCount={setNewLeads} onSignedOut={refresh} /> : <Posts onSignedOut={refresh} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
