import { ComponentType } from "react";
import { motion } from "motion/react";
import { CarFront, History, Boxes, Wrench, Users, ShoppingCart, TrendingUp, Network } from "lucide-react";

const iconsMap: Record<string, ComponentType<{ className?: string }>> = {
  CarFront,
  History,
  Boxes,
  Wrench,
  Users,
  ShoppingCart,
  TrendingUp,
  Network
};

const FEATURES = [
  {
    icon: "CarFront",
    title: "Vehicle Dealership Management",
    description: "Inventory management, financing, CRM, bookings, deliveries and sales performance.",
    badge: "Dealerships"
  },
  {
    icon: "History",
    title: "Used Vehicle Management",
    description: "Valuation, acquisition tracking, stock management, reconditioning and profitability analysis.",
    badge: "Pre-Owned"
  },
  {
    icon: "Boxes",
    title: "Inventory & Parts Management",
    description: "Multi-warehouse inventory, stock tracking, reorder levels and procurement visibility.",
    badge: "Spares"
  },
  {
    icon: "Wrench",
    title: "Workshop Management",
    description: "Job cards, technician scheduling, labor management and service tracking.",
    badge: "Servicing"
  },
  {
    icon: "Users",
    title: "CRM & Customer Management",
    description: "Lead lifecycle management, customer history, follow-up automation and loyalty management.",
    badge: "Engagement"
  },
  {
    icon: "ShoppingCart",
    title: "Procurement Management",
    description: "Purchase requests, purchase orders, vendor management and GRN processing.",
    badge: "Procure"
  },
  {
    icon: "TrendingUp",
    title: "Finance & KPIs",
    description: "Real-time dashboards, profitability analysis, business intelligence and management reporting.",
    badge: "Analytics"
  },
  {
    icon: "Network",
    title: "Multi-Branch Operations",
    description: "Centralized control of multiple dealerships, workshops and warehouses.",
    badge: "Enterprise"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[var(--bg-secondary)] text-[var(--text)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header content section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center space-y-4">
          <span className="text-xs font-bold font-display tracking-widest text-brand-red uppercase">
            POWERFUL ECOSYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-[var(--text)]">
            Comprehensive Feature Suite
          </h2>
          <div className="h-1 w-16 bg-brand-red rounded mt-2"></div>
          <p className="text-sm md:text-base text-[var(--text)] opacity-75 max-w-xl leading-relaxed mt-1">
            Re-engineered workflows from showroom floor to mechanics bay. A fully integrated database that eliminates spreadsheets forever.
          </p>
        </div>

        {/* Feature Cards Grid (8 premium cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feat, idx) => {
            const IconComponent = iconsMap[feat.icon] || CarFront;

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-lg dark:shadow-none hover:shadow-2xl hover:border-brand-red/30 dark:hover:border-brand-red/40 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur"
              >
                {/* Visual Accent Glow */}
                <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-red/[0.015] to-transparent pointer-events-none"></div>

                <div>
                  {/* Category Pill Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E30613]/80 bg-[#E30613]/5 dark:bg-[#E30613]/15 px-3 py-1 rounded-full">
                      {feat.badge}
                    </span>
                    <div className="text-[10px] text-[var(--text)] opacity-40 font-mono">0{idx + 1}</div>
                  </div>

                  {/* Icon Module */}
                  <div className="mb-6 inline-flex p-3.5 rounded-2xl bg-[#E30613] text-white transition-all duration-300 shadow-sm border border-[#E30613]/20">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-[var(--text)] mb-3 group-hover:text-brand-red transition-colors duration-200 font-display">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text)] opacity-70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Subtle Interactive Arrow indicator */}
                <div className="flex items-center text-[11px] font-bold tracking-widest uppercase text-[var(--text)] opacity-55 group-hover:opacity-100 group-hover:text-brand-red transition-all mt-6 space-x-1">
                  <span>Learn more</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
