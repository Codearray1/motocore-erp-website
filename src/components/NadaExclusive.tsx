import { ArrowRight, Settings } from "lucide-react";
import { motion } from "motion/react";

export default function NadaExclusive() {
  return (
    <section id="nada-exclusive" className="relative overflow-hidden py-12 md:py-16 bg-white [.dark_&]:bg-[#0B0D12] border-y border-[var(--border)] [.dark_&]:border-white/5 transition-colors duration-300">
      {/* Optional faint background gradients to simulate the red lighting from the image */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center xl:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-brand-red text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider mb-6">
                NADA EXCLUSIVE
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] [.dark_&]:text-white mb-4 tracking-tight">
                Secure your Slot Now.
              </h2>
              
              <p className="text-lg md:text-xl text-[var(--text)]/80 [.dark_&]:text-gray-300 mb-10">
                Start your free trial at NADA Auto Show 2026.
              </p>
              
              <a href="https://app.motocoreerp.com/register" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-4 bg-brand-red text-white text-base font-bold rounded-2xl cursor-pointer active:scale-95 transition-all outline-none border-none shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300">
                Claim My NADA Offer
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              
              <p className="text-xs text-[var(--text)]/60 [.dark_&]:text-gray-500 mt-6">
                Limited NADA campaign. Terms apply.
              </p>
            </motion.div>
          </div>

          {/* Right Content - Offer Cards */}
          <div className="w-full xl:w-auto z-10">
            <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-end gap-4 md:gap-5 py-6">
              
              {/* Card 1 - Red (First 10) */}
              <motion.a 
                href="https://app.motocoreerp.com/register"
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-48 md:w-56 bg-gradient-to-b from-[#b30000] to-[#660000] border border-red-500/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(204,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(204,0,0,0.4)] cursor-pointer"
              >
                <div className="text-[10px] font-bold text-white/90 uppercase tracking-wider mb-6">
                  FIRST 10 CUSTOMERS
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  50% <span className="text-2xl md:text-3xl">OFF</span>
                </div>
                <div className="text-sm text-white/80 mb-6">
                  Lifetime renewal
                </div>
                <div className="text-white/60 mb-6 font-light">+</div>
                <div className="text-3xl font-bold text-white mb-2">
                  FREE
                </div>
                <div className="text-xs text-white/80 font-medium">
                  Setup & Installation
                </div>
              </motion.a>

              {/* Card 2 - Dark (Next 10 - 35%) */}
              <motion.a 
                href="https://app.motocoreerp.com/register"
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-48 md:w-56 bg-[var(--bg)] [.dark_&]:bg-[#161922] border border-[var(--border)] [.dark_&]:border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm [.dark_&]:shadow-none hover:shadow-xl [.dark_&]:hover:border-white/20 cursor-pointer"
              >
                <div className="text-[10px] font-bold text-[var(--text)]/60 [.dark_&]:text-gray-400 uppercase tracking-wider mb-6">
                  NEXT 10 CUSTOMERS
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[var(--text)] [.dark_&]:text-white mb-2">
                  35% <span className="text-2xl md:text-3xl">OFF</span>
                </div>
                <div className="text-sm text-[var(--text)]/60 [.dark_&]:text-gray-400 mb-6">
                  Lifetime renewal
                </div>
                <div className="text-[var(--text)]/40 [.dark_&]:text-gray-600 mb-6 font-light">+</div>
                <div className="text-3xl font-bold text-[var(--text)] [.dark_&]:text-white mb-2">
                  FREE
                </div>
                <div className="text-xs text-[var(--text)]/60 [.dark_&]:text-gray-400 font-medium">
                  Setup & Installation
                </div>
              </motion.a>

              {/* Card 3 - Dark (Next 10 - 20%) */}
              <motion.a 
                href="https://app.motocoreerp.com/register"
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-48 md:w-56 bg-[var(--bg)] [.dark_&]:bg-[#161922] border border-[var(--border)] [.dark_&]:border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm [.dark_&]:shadow-none hover:shadow-xl [.dark_&]:hover:border-white/20 cursor-pointer"
              >
                <div className="text-[10px] font-bold text-[var(--text)]/60 [.dark_&]:text-gray-400 uppercase tracking-wider mb-6">
                  NEXT 10 CUSTOMERS
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[var(--text)] [.dark_&]:text-white mb-2">
                  20% <span className="text-2xl md:text-3xl">OFF</span>
                </div>
                <div className="text-sm text-[var(--text)]/60 [.dark_&]:text-gray-400 mb-6">
                  Lifetime renewal
                </div>
                <div className="text-[var(--text)]/40 [.dark_&]:text-gray-600 mb-6 font-light">+</div>
                <div className="text-3xl font-bold text-[var(--text)] [.dark_&]:text-white mb-2">
                  FREE
                </div>
                <div className="text-xs text-[var(--text)]/60 [.dark_&]:text-gray-400 font-medium">
                  Setup & Installation
                </div>
              </motion.a>

              {/* Card 4 - Glass (Others) */}
              <motion.a 
                href="https://app.motocoreerp.com/register"
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-48 md:w-56 bg-[var(--bg)]/50 [.dark_&]:bg-white/[0.03] border border-[var(--border)] [.dark_&]:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center backdrop-blur-sm shadow-sm [.dark_&]:shadow-none hover:shadow-xl [.dark_&]:hover:border-white/30 cursor-pointer"
              >
                <div className="text-[10px] font-bold text-[var(--text)]/60 [.dark_&]:text-gray-400 uppercase tracking-wider mb-10">
                  OTHERS (WITHIN 3 MONTHS)
                </div>
                <div className="flex-1 flex items-center justify-center mb-8">
                  <Settings className="w-14 h-14 text-[var(--text)]/50 [.dark_&]:text-gray-500" strokeWidth={1.5} />
                </div>
                <div className="text-3xl font-bold text-[var(--text)] [.dark_&]:text-white mb-2">
                  FREE
                </div>
                <div className="text-xs text-[var(--text)]/60 [.dark_&]:text-gray-400 font-medium">
                  Setup & Installation
                </div>
              </motion.a>

            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
