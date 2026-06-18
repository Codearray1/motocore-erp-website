import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companySize: "dealership",
    message: ""
  });
  
  const [isSent, setIsSent] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMess("");
  setIsLoading(true);

  if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
    setErrorMess("Please fill out all required fields (Name, Email, and Phone).");
    setIsLoading(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setErrorMess("Please provide a valid business email address.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        businessName: "Not provided",
        businessType: formData.companySize,
        formType: "contact",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send inquiry.");
    }

    setIsSent(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      companySize: "dealership",
      message: "",
    });
  } catch (error) {
    setErrorMess("Your inquiry could not be submitted. Please email us directly at motocorenepal@gmail.com.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section id="contact" className="py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Column Left: Contact Info and Visual Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold font-display tracking-widest text-brand-red uppercase">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)]">
                Contact MotoCore ERP
              </h2>
              <div className="h-1 w-16 bg-brand-red rounded"></div>
              
              <p className="text-sm md:text-base text-[var(--text)] opacity-70 leading-relaxed max-w-sm">
                Have questions about custom integrations or deployment speeds? Reach out directly to our Lalitpur support team.
              </p>
            </div>

            {/* Direct Lines */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[var(--bg-secondary)] rounded-xl text-brand-red border border-[var(--border)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-[var(--text)] opacity-50">EMAIL SUPPORT</p>
                  <a href="mailto:motocorenepal@gmail.com" className="text-sm md:text-base font-bold text-[var(--text)] hover:text-brand-red transition-colors">
                    motocorenepal@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[var(--bg-secondary)] rounded-xl text-brand-red border border-[var(--border)]">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-[var(--text)] opacity-50">DIRECT LINE</p>
                  <a href="tel:+9779863473651" className="text-sm md:text-base font-bold text-[var(--text)] hover:text-brand-red transition-colors">
                    +977 9863473651
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[var(--bg-secondary)] rounded-xl text-brand-red border border-[var(--border)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-[var(--text)] opacity-50">HEADQUARTERS</p>
                  <p className="text-sm md:text-base font-bold text-[var(--text)]">
                    Sanepa, Lalitpur, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Headquarter City Image */}
            <div className="relative rounded-2xl overflow-hidden h-40 border border-[var(--border)] shadow-md">
               <img
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbHAr377R53Lo2yx_xVsV-SyCYbjVLtHQAdwa2RllJiP-FDt1TtpKQOTkKEr4bhYqSaFnmtlBeZk_VfMexyuL0C3p90CPqCvKxZbjFdHnRCv3GaZvE9So_PCTv9DoTWYsbN-iuO1GZB1EH4s7XZBSSIXx4ZQYbAJVmre_9JsLgbwtCOt53iKxkZ0MLwyw4l3StvoDcUY7zYT_vNb_1YL06sJY4aFMcBOHuLLuMtOy27oowjgSoWo_cWHt2VJfFhAH7KFjbMhM6rT4"
                 alt="Corporate Lalitpur Headquarters Office"
                 className="w-full h-full object-cover grayscale opacity-90 dark:opacity-85 select-none"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-transparent transition-all"></div>
             </div>

          </div>

          {/* Column Right: Interactive Contact Form Cards */}
          <div className="lg:col-span-7 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[var(--text)] opacity-60 uppercase">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-bold text-[var(--text)] placeholder:text-[var(--text)]/45 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[var(--text)] opacity-60 uppercase">
                        Business Email <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-bold text-[var(--text)] placeholder:text-[var(--text)]/45 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[var(--text)] opacity-60 uppercase">
                        Phone Number <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+977 9863473651"
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-bold text-[var(--text)] placeholder:text-[var(--text)]/45 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[var(--text)] opacity-60 uppercase">
                        Primary Business Type
                      </label>
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-bold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-brand-red/50 cursor-pointer"
                      >
                        <option value="dealership">Vehicle Dealership</option>
                        <option value="workshop">Service Workshop</option>
                        <option value="distributor">Parts Distributor</option>
                        <option value="enterprise">Automotive Group</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-[var(--text)] opacity-60 uppercase">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your multi-branch operations..."
                      className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm font-bold text-[var(--text)] placeholder:text-[var(--text)]/45 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    ></textarea>
                  </div>

                  {errorMess && (
                    <p className="text-xs text-brand-red font-bold">{errorMess}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center bg-brand-red hover:bg-[#C20510] text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-brand-red/25 active:scale-95 cursor-pointer"
                  >
                    <span>{isLoading ? "Submitting..." : "Send Inquiry Message"}</span>
                    <Send className="ml-2.5 h-4 w-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-8 space-y-6"
                >
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/15 text-emerald-500 shadow-inner">
                    <CheckCircle2 className="h-10 w-10 stroke-[2]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--text)]">
                      Your Inquiry Has Been Submitted Successfully
                    </h3>
                    <p className="text-sm text-[var(--text)] opacity-70 max-w-sm mx-auto leading-relaxed">
                      Thank you for your message and interest in MotoCore ERP. Our team has received your inquiry and will get back to you within 12 business hours.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSent(false)}
                    className="bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text)] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors border border-[var(--border)]"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
