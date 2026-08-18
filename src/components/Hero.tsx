import { motion } from "motion/react";
import { Play , Phone } from "lucide-react";

interface HeroProps {
  onOpenEarlyAccess: () => void;
  onOpenDemoRequest: () => void;
}

export default function Hero({ onOpenEarlyAccess, onOpenDemoRequest }: HeroProps) {


  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-36 flex items-center justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Dynamic Background Mesh Grid (Tesla & Stripe style) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Decorative Blur Orbs */}
      <div className="absolute -top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-brand-red opacity-[0.06] dark:opacity-[0.14] blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-brand-red opacity-[0.04] dark:opacity-[0.1] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">

        {/* Columns 1 to 7: Launch Copy */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">

          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start inline-flex items-center space-x-2 bg-brand-red/[0.08] border border-brand-red/30 px-4 py-2 rounded-full shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase font-display">
              NEXT-GEN AUTOMOTIVE ERP
            </span>
          </motion.div>

          {/* Primary Typography Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-[var(--text)] leading-[1.1]"
          >
            The Future of <br className="hidden md:inline" />
            Automotive Business <br />
            <span className="text-brand-red relative inline-block">
              Management
              <span className="absolute left-0 bottom-1 w-full h-[3px] bg-brand-red/20 rounded"></span>
            </span>{" "}
            is Coming
          </motion.h1>

          {/* Subheadline description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[var(--text)] opacity-85 max-w-2xl leading-relaxed"
          >
            MotoCore ERP is a complete automotive business management platform designed for dealerships, workshops, service centers, spare parts distributors, used vehicle businesses, and automotive enterprises.
          </motion.p>

          {/* Discount Slots Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-6 md:p-8 rounded-3xl bg-[var(--bg-secondary)]/90 border border-[var(--border)] shadow-xl dark:shadow-none backdrop-blur-md max-w-lg"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
              <div className="text-xs md:text-sm font-bold font-display tracking-widest text-[var(--text)] uppercase">
                50% Discount (First 10 Customers)
              </div>
              <div className="text-xs font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 px-3 py-1.5 rounded-lg whitespace-nowrap">
                3 Slots Remaining
              </div>
            </div>

            <div className="flex gap-1.5 md:gap-2 mb-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-3 md:h-4 rounded-full transition-all duration-500 ${i < 7 ? 'bg-brand-red shadow-[0_0_10px_rgba(255,51,51,0.5)]' : 'bg-[var(--border)]/60'}`}
                />
              ))}
            </div>
            <div className="text-[11px] font-bold text-right text-[var(--text)] opacity-60 uppercase tracking-wider">
              7/10 Slots Claimed
            </div>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-lg"
          >
            <button
              onClick={onOpenEarlyAccess}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-brand-red text-white text-base font-bold rounded-2xl cursor-pointer active:scale-95 transition-all outline-none border-none shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300"
            >
              Start Free Trial
              <Play className="ml-2 h-5 w-5" />
            </button>

            <a
              href="tel:+9779863473651"
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-[var(--bg-secondary)] text-[var(--text)] text-base font-bold rounded-2xl cursor-pointer active:scale-95 hover:bg-[var(--border)] border border-[var(--border)] transition-all duration-300 hover:scale-[1.02]"
             >
              +977 9863473651
              <Phone className="ml-2.5 h-4.5 w-4.5 fill-current text-[var(--text)] opacity-80" />
            </a>
          </motion.div>

        </div>

        {/* Columns 8 to 12: Hero Mockup Visuals with layered parallax & animations */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:items-end mt-12 lg:mt-0">

          {/* Ambient Glow backing */}
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-brand-red/10 to-transparent blur-3xl pointer-events-none"></div>

          {/* Main Laptop Mockup displaying actual high-fidelity ERP dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative w-full z-10"
          >
            <div className="border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl bg-[var(--bg)] p-1">
              <div className="flex items-center space-x-1.5 px-3 py-2 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider ml-4">motocore.app/dashboard</span>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPdYp2JbMSl9fArRkcxAQI1UCZteVlzqWDhr0h4ggv6A8Av_LWvyZlpeISrhD0IJ2Oou0pnFnDQn1N_eAC5F77Hsq5X-EdUPKp2Ai9oBdhbBs4O-t86UnsDbnXH1HVX21wvA0Xi6-yvLb9JW84dY9iq2XxxD3ha-JRPqusDQug8al6pd9Idxf9kTa-FK0VWU3NWZoKnOsW1vqxqhTt3-uDq3XtmxPgJXtOz60On5vPAS9Bvx2_LHW1Wo4g9kCqf0VUH3NBn3f1ErA"
                alt="MotoCore ERP Luxury Automotive Dashboard Preview"
                className="w-full aspect-video object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Floating Mobile Smartphone visual layer for rich responsive product presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.4,
              type: "spring",
              stiffness: 80
            }}
            className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-12 w-32 md:w-44 z-20 hidden sm:block animate-float"
          >
            <div className="rounded-[2.5rem] p-1.5 bg-gray-900 border-4 border-gray-800 dark:border-brand-dark shadow-2xl overflow-hidden">
              <div className="relative rounded-[2.1rem] overflow-hidden aspect-[9/18.5] bg-brand-black">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLoEAocfvlH6AWwxQm7AUVORamTLSCHv2E_XEgPrkYwxaDy77UVh5l15SgNR_yuOE_arQn85JM33en5pQkhajzZaCyfdSHI7HkgUfDO3V6vleO_6Hv1US1UagBE1H9enRTzMwgtY5GhZfmxBsdPZ0LC3m_Xhj-3I6xUa8wNSU34m_ZnDqjkMajJfnBPHpg7NYG9TxAXSBAE1-tT5YpGoHPoCefU-tye4gmP7za8FqFCp9UT2hV54rITRcVyXXqQe7OIUji7XzQ4PU"
                  alt="MotoCore ERP Mobile Control App Preview"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
