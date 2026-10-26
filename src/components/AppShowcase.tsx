import { motion } from "motion/react";
import { ArrowRight, Smartphone } from "lucide-react";
import { PRODUCT_PAGES } from "../seo/content";

const app = PRODUCT_PAGES.find((p) => p.slug === "bike-showroom-software" && p.lang === "en")!.mobileApp!;

/** Home page: real screens from the MotoCore Bike iPhone app. */
export default function AppShowcase() {
  return (
    <section id="mobile-app" className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-24 scroll-mt-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            <Smartphone className="h-4 w-4" aria-hidden="true" /> Android · iOS
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">{app.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text)]/75">{app.text}</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
          {app.screens.map((s, i) => (
            <motion.li
              key={s.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 === 1 ? "lg:mt-10" : ""}
            >
              <figure>
                <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-2xl shadow-black/10 transition-transform duration-300 hover:-translate-y-1.5">
                  <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" className="block h-auto w-full" />
                </div>
                <figcaption className="mt-3 text-center text-sm font-medium text-[var(--text)]/70">{s.caption}</figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <a href="/bike-showroom-software#mobile-app" className="group inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 transition hover:opacity-90">
            See the MotoCore Bike app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
