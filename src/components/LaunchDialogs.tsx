import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Send, Users, Shield, CalendarDays, Bookmark } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState("");
  const [companyType, setCompanyType] = useState("dealership");
  const [submitted, setSubmitted] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Valued Customer",
        email: email,
        phone: "Not provided",
        companySize: "Get Early Access",
        message: "User submitted the Get Early Access popup form.",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    localStorage.setItem("motocore_launch_email", email);
    setSubmitted(true);
  } catch (error) {
    console.error("GET EARLY ACCESS ERROR:", error);
    alert("Could not submit your request. Please email us directly at motocorenepal@gmail.com");
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/70 backdrop-blur-md"
          ></motion.div>

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-white dark:bg-brand-black border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl z-25 text-left overflow-hidden"
          >
            {/* Top Close button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-xl text-gray-400 hover:text-brand-red dark:hover:text-brand-red hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-brand-red uppercase font-display">
                    RESERVE YOUR LICENSE
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight font-display text-gray-900 dark:text-white">
                    Priority Early Access
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Get grandfathered pricing and priority cloud provisioning before July 1st, 2026.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@automotivegroup.com"
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Primary Sector
                    </label>
                    <select
                      value={companyType}
                      onChange={(e) => setCompanyType(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50 cursor-pointer"
                    >
                      <option value="dealership">New Vehicle Dealership</option>
                      <option value="workshop">Service Workshop</option>
                      <option value="distributor">Spare Parts Distributor</option>
                      <option value="enterprise">Multi-Branch Group</option>
                    </select>
                  </div>
                </div>

                {errorMess && <p className="text-xs text-brand-red font-bold">{errorMess}</p>}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-brand-red hover:bg-[#C20510] text-white text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Submit License Reservation</span>
                  <Bookmark className="ml-2.5 h-4 w-4" />
                </button>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-center space-x-2 text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                  <Shield className="h-4.5 w-4.5 text-brand-red" />
                  <span>Your email is protected by server-side encryption</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="inline-flex p-3 rounded-full bg-brand-red text-white shadow-xl shadow-brand-red/10 animate-pulse">
                  <CheckCircle className="h-8 w-8 stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                    You are checked in!
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                    We've registered <span className="font-bold text-gray-800 dark:text-white">{email}</span>. A provisional activation ticket has been locked under your business profile.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-150 dark:bg-brand-dark/85 text-gray-700 dark:text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider border border-gray-200 dark:border-white/5 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Close Confirmation View
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    branchCount: "1-3"
  });
  const [complete, setComplete] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMess("");

  if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim()) {
    setErrorMess("Please complete all required fields (Name, Email, and Phone).");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email)) {
    setErrorMess("Email address is invalid.");
    return;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        companySize: fields.branchCount,
        message: "Request Demo Submission",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit");
    }

    setComplete(true);
  } catch (error) {
    console.error("DEMO REQUEST ERROR:", error);
    setErrorMess("Could not submit your request. Please contact +9779863473651.");
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/70 backdrop-blur-md"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-white dark:bg-brand-black border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl z-25 text-left overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-xl text-gray-400 hover:text-brand-red dark:hover:text-brand-red hover:bg-gray-100 dark:hover:bg-brand-dark transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!complete ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-brand-red uppercase font-display">
                    MOTOCORE ERP WALKTHROUGH
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight font-display text-gray-900 dark:text-white">
                    Request Product Demo
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Schedule a personalized MotoCore ERP walkthrough with our product specialists.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Contact Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fields.name}
                      onChange={(e) => setFields({ ...fields, name: e.target.value })}
                      placeholder="John Sen"
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white placeholders:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Business Email <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={fields.email}
                      onChange={(e) => setFields({ ...fields, email: e.target.value })}
                      placeholder="jsen@brandshowroom.com"
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white placeholders:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Mobile Number <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={fields.phone}
                      onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                      placeholder="+977 9863473651"
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-white placeholders:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">
                      Estimate Branches Block
                    </label>
                    <select
                      value={fields.branchCount}
                      onChange={(e) => setFields({ ...fields, branchCount: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50 cursor-pointer"
                    >
                      <option value="1-3">1 to 3 Operational Branches</option>
                      <option value="4-10">4 to 10 Branches</option>
                      <option value="10+">10+ Enterprise Hubs</option>
                    </select>
                  </div>
                </div>

                {errorMess && <p className="text-xs text-brand-red font-bold">{errorMess}</p>}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-brand-red hover:bg-[#C20510] text-white text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Request Demo Session</span>
                  <CalendarDays className="ml-2.5 h-4.5 w-4.5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="inline-flex p-3 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/10 animate-bounce">
                  <CheckCircle className="h-8 w-8 stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                    Demo Scheduled!
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Thank you <span className="font-bold text-gray-800 dark:text-white">{fields.name}</span>. A product specialist will call you at <span className="font-bold">{fields.phone}</span> within 12 business hours to set up your screen share.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-150 dark:bg-brand-dark/85 text-gray-700 dark:text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider border border-gray-200 dark:border-white/5 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Understand & Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
