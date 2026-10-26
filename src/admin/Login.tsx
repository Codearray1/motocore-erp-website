import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import logo from "../assets/motocore-logo.png";
import { api } from "./api";

export default function Login({ configured, onSignedIn }: { configured: boolean; onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("session", { method: "POST", body: { email, password } });
      onSignedIn();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-secondary)] px-4 text-[var(--text)]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-red/15 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-2xl shadow-black/10"
      >
        <img src={logo} alt="MotoCore" className="mx-auto h-12 w-auto" />
        <h1 className="mt-6 text-center font-display text-2xl font-bold">Website admin</h1>
        <p className="mt-1 text-center text-sm text-[var(--text)]/65">Enquiries and blog for motocoreerp.com</p>

        {!configured ? (
          <div className="mt-6 flex gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <span>Admin sign-in is not set up yet. Add ADMIN_USERS and ADMIN_SESSION_SECRET in the Vercel project settings.</span>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/70">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-xs font-bold uppercase tracking-wider text-[var(--text)]/70">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none transition focus:border-brand-red focus:ring-4 focus:ring-brand-red/10"
              />
            </div>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="flex items-center gap-2 rounded-lg bg-brand-red/10 px-3 py-2 text-sm font-medium text-brand-red">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
              </motion.p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-sm font-bold text-white shadow-lg shadow-brand-red/25 transition hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Lock className="h-4 w-4" aria-hidden="true" />}
              Sign in
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
