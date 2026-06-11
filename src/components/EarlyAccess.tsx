import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Ticket } from "lucide-react";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [ticketNum, setTicketNum] = useState<number>(0);

  // Check if user is already registered locally
  useEffect(() => {
    const storedEmail = localStorage.getItem("motocore_early_access_email");
    if (storedEmail) {
      setIsRegistered(true);
      // Generate a deterministic ticket number based on stored email
      setTicketNum(Math.abs(storedEmail.split("").reduce((acc, char) => acc + char.charCodeAt(0), 1000)));
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMess("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    setErrorMess("Business email is required.");
    return;
  }

  if (!emailRegex.test(email)) {
    setErrorMess("Please enter a valid business email address.");
    return;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Early Access Lead",
        email: email,
        phone: "Not provided",
        companySize: "Early Access",
        message:
          "User requested early access from the MotoCore ERP priority launch section.",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed");
    }

    localStorage.setItem("motocore_early_access_email", email);

    const randomTicket = Math.floor(Math.random() * 850) + 1240;
    setTicketNum(randomTicket);
    setIsRegistered(true);
    setEmail("");
  } catch (error) {
    setErrorMess(
      "Could not submit your request. Please try again."
    );
  }
};

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-[var(--bg-secondary)] text-[var(--text)]">
      
      {/* Visual background details */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative"
        >
          {/* Top Decorative Graphic */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-brand-red text-white p-3 rounded-2xl shadow-xl shadow-brand-red/20">
            <Ticket className="h-6 w-6 stroke-[2]" />
          </div>

          <div className="max-w-2xl mx-auto mt-2 space-y-6">
            <span className="text-xs font-bold font-display tracking-widest text-[#E30613] uppercase">
              PRIORITY QUEUE
            </span>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)] leading-[1.15]">
              Be The First To Experience MotoCore ERP
            </h2>
            
            <p className="text-sm md:text-base text-[var(--text)] opacity-70 leading-relaxed max-w-lg mx-auto">
              Join our priority launch list and get early access to the future of automotive business management.
            </p>
          </div>

          {/* Form states with transitions */}
          <div className="mt-10 max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!isRegistered ? (
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleRegister}
                  className="space-y-3"
                >
                  <div className="relative">
                    <Mail className="absolute left-4.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-red transition-colors h-5 w-5 pointer-events-none" />
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email"
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl pl-12 pr-32 py-4.5 text-sm font-bold text-[var(--text)] placeholder:text-[var(--text)]/40 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red/50 transition-all shadow-inner"
                    />

                    {/* Desktop Float Button */}
                    <button
                      type="submit"
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-brand-red hover:bg-[#C20510] text-white text-xs font-extrabold uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow active:scale-95 cursor-pointer hidden sm:block"
                    >
                      Notify Me
                    </button>
                  </div>

                  {/* Mobile Single Button (appears as block on narrow viewport) */}
                  <button
                    type="submit"
                    className="w-full sm:hidden bg-brand-red hover:bg-[#C20510] text-white text-xs font-bold uppercase tracking-wider py-4 mt-2 rounded-2xl transition-all shadow-lg shadow-brand-red/20"
                  >
                    Notify Me
                  </button>

                  {errorMess && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-brand-red font-bold text-left pl-2 mt-1"
                    >
                      {errorMess}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#E30613]/5 border border-[#E30613]/20 rounded-3xl p-6 text-center space-y-4"
                >
                  <div className="inline-flex p-3 rounded-full bg-brand-red text-white mb-1 shadow-md shadow-brand-red/10 animate-bounce">
                    <CheckCircle2 className="h-6 w-6 stroke-[3]" />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold font-display text-[var(--text)]">
                    You're on the priority list!
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[var(--text)] opacity-70">
                    Your spot is confirmed! You are priority ticket holder{" "}
                    <span className="text-brand-red font-extrabold pr-0.5">#{ticketNum}</span>. We will contact you immediately upon launch.
                  </p>

                  <div className="flex items-center justify-center space-x-2 text-[11px] font-bold text-[#E30613] uppercase tracking-wider bg-[#E30613]/10 py-2.5 px-4 rounded-xl max-w-fit mx-auto">
                    <ShieldCheck className="h-4 w-4" />
                    <span>GUARANTEED LAUNCH TICKET PREVIEW</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Core regulatory footnote */}
          <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold text-[var(--text)] opacity-50">
            <span>✓ No credit card required</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Enterprise-Grade compliance</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Cancel membership alert list anytime</span>
          </div>

        </motion.div>
        
      </div>

    </section>
  );
}
