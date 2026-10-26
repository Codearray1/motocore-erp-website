import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import seecarLogo from "../assets/pictures/seecarlogo.png";
import tapaikobazarLogo from "../assets/pictures/tapaikobazarlogo.png";

export default function TrustedBy() {
  return (
    <section className="py-7 border-y border-[var(--border)] bg-[var(--bg-secondary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left Side: Logos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="w-full max-w-lg p-6 md:p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-sm relative">
            <p className="text-xs text-center font-display tracking-widest text-[var(--text)] opacity-60 uppercase mb-8">
              <span className="font-extrabold">Trusted by</span> Automotive Leaders

            </p>
            <div className="flex flex-row items-center justify-center gap-10 md:gap-16 w-full">
              <img src={seecarLogo} alt="See Car" width={160} height={112} loading="lazy" className="h-20 md:h-28 object-contain" />
              <img src={tapaikobazarLogo} alt="Tapaiko Bazar" width={160} height={112} loading="lazy" className="h-20 md:h-28 object-contain" />
            </div>
          </motion.div>

          {/* Divider */}
          {/* <div className="hidden lg:block w-px h-40 bg-[var(--border)] opacity-60"></div> */}

          {/* Right Side: Promo / Progress Bar */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg p-6 md:p-8 rounded-3xl bg-(--bg) border border-(--border) shadow-sm relative"
            >
              <p className="text-xs md:text-sm font-bold font-display tracking-widest text-brand-red uppercase">Early launch offer</p>
              <p className="mt-3 text-2xl font-bold font-display text-[var(--text)]">Up to 50% off for early customers</p>
              <p className="mt-2 text-sm text-[var(--text)]/75">On MotoCore Parts, Workshop and Recon-Lite, plus free setup and installation.</p>
              <div className="mt-6 flex justify-center sm:justify-start">
                <a
                  href="#early-launch-offer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white text-sm font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300"
                >
                  See the offer
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}