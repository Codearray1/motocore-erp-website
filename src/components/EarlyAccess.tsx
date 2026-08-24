import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ShieldCheck, Ticket, Phone, ArrowRight } from "lucide-react";

export default function EarlyAccess() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    currentSystem: "",
    expectedUsers: "",
    message: "",
  });

  const openRegisterPage = () => {
    window.open("https://app.motocoreerp.com/register", "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      setErrorMess("Business email is required.");
      setIsSubmitting(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMess("Please enter a valid business email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name || "Beta Access Lead",
          email: formData.email,
          phone: formData.phone || "Not provided",
          companySize: "Beta Access",
          businessName: formData.businessName || "Not provided",
          businessType: formData.businessType || "Not provided",
          formType: "beta_access",
          message: `
Beta Partner Application

Business Name: ${formData.businessName || "Not provided"}
Business Type: ${formData.businessType || "Not provided"}
Current System: ${formData.currentSystem || "Not provided"}
Expected Users: ${formData.expectedUsers || "Not provided"}

Message:
${formData.message || "No additional message provided."}
  `,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Early access API failed:", errorText);
        throw new Error("Failed to submit early access request.");
      }

      localStorage.setItem("motocore_early_access_email", formData.email);

      const randomTicket = Math.floor(Math.random() * 850) + 1240;
      setTicketNum(randomTicket);
      setIsRegistered(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        businessType: "",
        currentSystem: "",
        expectedUsers: "",
        message: "",
      });
    } catch (error) {
      console.error("EARLY ACCESS ERROR:", error);
      setErrorMess(
        "Could not submit your early access request. Please email us directly at motocorenepal@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
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
          {/* Box Grid Background Container */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
            <div className="absolute inset-0 select-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          {/* Top Decorative Graphic */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-brand-red text-white p-3 rounded-2xl shadow-xl shadow-brand-red/20 z-10">
            <Ticket className="h-6 w-6 stroke-[2]" />
          </div>

          <div className="max-w-2xl mx-auto mt-2 space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)] leading-[1.15]">
              Ready to Simplify Your 
              <span className="text-[#E30613]"> Automotive Business?</span>
            </h2>

            <p className="text-sm md:text-base text-[var(--text)] opacity-70 leading-relaxed max-w-lg mx-auto">
              Manage inventory, sales, purchases, workshops
              and more - all in one powerful platform.
            </p>
          </div>

          {/* buttons*/}
          <button
              onClick={openRegisterPage}
              className="flex-1 mx-5 inline-flex items-center justify-center px-6 py-4 bg-brand-red text-white text-base font-bold rounded-2xl cursor-pointer active:scale-95 transition-all outline-none border-none shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300 relative z-10"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
          <a
            href="tel:+9779863473651"
            className="flex-1 mt-9 inline-flex items-center justify-center px-6 py-4 bg-[var(--bg-secondary)] text-[var(--text)] text-base font-bold rounded-2xl cursor-pointer active:scale-95 hover:bg-[var(--border)] border border-[var(--border)] transition-all duration-300 hover:scale-[1.02] relative z-10"
          >
            +977 9863473651
            <Phone className="ml-2.5 h-4.5 w-4.5 fill-current text-[var(--text)] opacity-80" />
          </a>

          {/* Core regulatory footnote */}
          <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold text-[var(--text)] opacity-50 relative z-10">
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
