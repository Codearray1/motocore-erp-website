import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import seecarLogo from "../assets/pictures/seecarlogo.png";
import tapaikobazarLogo from "../assets/pictures/tapaikobazarlogo.png";

export default function TrustedBy() {
    const openRegisterPage = () => {
    window.open("https://app.motocoreerp.com/register", "_blank");
  };
  
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
              <img src={seecarLogo} alt="See Car" className="h-20 md:h-28 object-contain" />
              <img src={tapaikobazarLogo} alt="Tapaiko Bazar" className="h-20 md:h-28 object-contain" />
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
                <div className="text-xs md:text-sm font-bold font-display tracking-widest text-[var(--text)] uppercase">
                  50% Discount (First 10 Users)
                </div>
                <div className="text-xs font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  7 Slots Remaining
                </div>
              </div>

              <div className="flex gap-1.5 md:gap-2 mb-3">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-3 md:h-4 rounded-full transition-all duration-500 ${i < 3 ? 'bg-brand-red shadow-[0_0_10px_rgba(255,51,51,0.5)]' : 'bg-[var(--border)]/60'}`}
                  />
                ))}
              </div>
              <div className="text-[11px] font-bold text-right text-[var(--text)] opacity-60 uppercase tracking-wider mb-6">
                3/10 Slots Claimed
              </div>

              <div className="flex justify-center">
                <button
                  onClick={openRegisterPage}
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white text-sm font-bold rounded-xl cursor-pointer active:scale-95 transition-all outline-none border-none shadow-lg shadow-brand-red/30 hover:shadow-brand-red/45 hover:scale-[1.02] duration-300"
                >
                  Claim offer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}