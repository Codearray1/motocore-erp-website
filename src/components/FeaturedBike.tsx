import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Bike, ClipboardList, FileCheck2, Smartphone, Wallet } from "lucide-react";
import bikeDashboard from "../assets/products/bike-dashboard.webp";
import bikeMobile from "../assets/products/bike-mobile-dashboard.webp";

const POINTS = [
  { icon: ClipboardList, title: "Inquiry to booking", text: "Hot / warm / cold inquiries, daily follow-ups and bookings with numbered receipts." },
  { icon: Bike, title: "VIN-wise stock", text: "Purchases by VIN and engine number; allocate only matching stock to paid bookings." },
  { icon: FileCheck2, title: "Delivery and namsari", text: "Documents, challan, delivery and ownership transfer tracked to the bill book." },
  { icon: Wallet, title: "Money under control", text: "Collections, financier receivables, approved discounts and refunds that never exceed what was paid." },
];

const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

/** Home page: MotoCore Bike, the featured product. */
export default function FeaturedBike() {
  return (
    <section id="motocore-bike" className="relative overflow-hidden bg-[var(--bg-secondary)] py-20 md:py-28 scroll-mt-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-brand-red/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.15fr]">
        <motion.div {...rise} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Featured product
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
            MotoCore Bike: showroom management software for bike and EV dealers
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text)]/75">
            Run a motorcycle, scooter or EV showroom from the first walk-in to the bill book, on the web and on your team's phones.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <motion.li key={p.title} {...rise} transition={{ duration: 0.45, delay: 0.08 * i }} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-lg shadow-brand-red/25">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{p.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--text)]/70">{p.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="/bike-showroom-software" className="group inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 transition hover:opacity-90">
              Explore MotoCore Bike <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-bold transition hover:border-brand-red">
              Book a free demo
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text)]/70">
              <Smartphone className="h-4 w-4 text-brand-red" aria-hidden="true" /> Android and iOS app included
            </span>
          </div>
        </motion.div>

        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="relative pb-10 lg:pb-0">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl shadow-black/15">
            <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f4f4f5] px-4 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-black/50">bike.motocoreerp.com</span>
            </div>
            <img src={bikeDashboard} alt="MotoCore Bike owner dashboard with inquiries, bookings, stock and collections" width={1600} height={844} loading="lazy" decoding="async" className="block h-auto w-full" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-2 right-2 w-[26%] min-w-[110px] overflow-hidden rounded-[1.6rem] border-[5px] border-[#111] bg-white shadow-2xl sm:right-6 lg:-bottom-10 lg:-right-4"
          >
            <img src={bikeMobile} alt="MotoCore Bike mobile app dashboard" width={600} height={1230} loading="lazy" decoding="async" className="block h-auto w-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
