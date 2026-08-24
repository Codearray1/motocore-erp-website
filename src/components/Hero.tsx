import { motion } from "motion/react";
import { Play, Phone, ArrowBigLeft, ArrowRight } from "lucide-react";
import heroPicture from "../assets/pictures/heropicture.png";



export default function Hero() {
    const openRegisterPage = () => {
    window.open("https://app.motocoreerp.com/register", "_blank");
  };


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
            <span className="w-3 h-3 rounded-full bg-brand-red animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase font-display">
              NADA AUTO SHOW • STALL No. K46
            </span>
          </motion.div>

          {/* Primary Typography Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)] leading-[1.1]"
          >
            Run Your Automotive<br/> Business <span className="text-brand-red relative inline-block underline underline-offset-4">
  Smarter
</span> 
          </motion.h1>

          {/* Subheadline description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-md text-[var(--text)] opacity-85 max-w-xl leading-relaxed"
          >
            MotoCore ERP is a complete automotive business management platform designed for dealerships, workshops, service centers, spare parts distributors, used vehicle businesses, and automotive enterprises.
          </motion.p>

          {/* Discount Slots Progress Bar */}
          {/* <motion.div
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
          </motion.div> */}

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-lg"
          >
            <button
              onClick={openRegisterPage}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-brand-red text-white text-base font-bold rounded-2xl cursor-pointer active:scale-95 transition-all outline-none border-none shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
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

          {/* Main Hero Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative w-full z-10"
          >
            <div className="bg-transparent scale-110 sm:scale-125 lg:scale-[1.35] ransition-transform duration-700">
              <img
                src={heroPicture}
                alt="MotoCore ERP"
                className="w-full h-auto object-cover select-none drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
