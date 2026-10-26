import { motion } from "motion/react";
import { Check } from "lucide-react";
import { INDUSTRY_BENEFITS } from "../data";
import bikeDashboard from "../assets/products/bike-dashboard.webp";

export default function IndustrySection() {
  return (
    <section id="solutions" className="py-24 md:py-32 bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column Left: High quality workshop glass showroom visual container */}
          <div className="lg:col-span-6 relative order-last lg:order-first">
            {/* Visual Backdrops */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red/10 to-transparent blur-xl pointer-events-none rounded-[2rem]"></div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8 }}
              className="relative border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img
                src={bikeDashboard}
                alt="MotoCore Bike owner dashboard with inquiries, bookings, stock and collections"
                width={1600}
                height={844}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain bg-white select-none"
              />
              
              {/* Premium overlay badge representing modern cloud infrastructure */}
              <div className="absolute bottom-6 left-6 right-6 bg-brand-black/80 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#E30613] mb-1">
                    DEPLOYMENT
                  </p>
                  <p className="text-sm font-bold text-white tracking-tight">
                    Cloud-based · runs in the browser
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[11px] font-mono text-gray-300 font-bold uppercase">LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column Right: Copy and list */}
          <div id="industries" className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8 text-left scroll-mt-24">
            
            <div className="space-y-4">
              <span className="text-xs font-bold font-display tracking-widest text-brand-red uppercase">
                TAILORED ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)]">
                Built Specifically for the Automotive Industry
              </h2>
              <div className="h-1 w-16 bg-brand-red rounded mt-2"></div>
            </div>

            <p className="text-sm md:text-base text-[var(--text)] opacity-80 leading-relaxed md:max-w-xl">
              Unlike generic ERP systems, MotoCore ERP is purpose-built for the automotive industry. From new vehicle dealerships and used car showrooms to workshops, service centers and spare parts businesses, MotoCore ERP streamlines every operation from one intelligent platform.
            </p>

            {/* Checkmark Benefits layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {INDUSTRY_BENEFITS.map((benefit, idx) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex items-center space-x-3.5 group cursor-default"
                >
                  <div className="p-1 rounded-lg bg-[#E30613]/10 dark:bg-[#E30613]/20 text-[#E30613] group-hover:bg-[#E30613] group-hover:text-white transition-all duration-300 scale-95 group-hover:scale-105">
                     <Check className="h-4.5 w-4.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-[var(--text)] opacity-85 group-hover:opacity-100 transition-colors duration-200">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
