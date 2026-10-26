import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bike, CarFront, Check, ChevronDown, Package, RefreshCw, Smartphone, Wrench, type LucideIcon } from "lucide-react";
import { PRODUCTS, type Lang } from "../seo/content";
import { solutionHref } from "../seo/routes";

const ICONS: Record<string, LucideIcon> = { bike: Bike, parts: Package, workshop: Wrench, recon: RefreshCw, car: CarFront };

const UI = {
  en: {
    products: "Products",
    featured: "Featured",
    bikeText: "Showroom management for motorcycle, scooter and EV dealers.",
    bikePoints: ["Inquiries, bookings and receipts", "VIN stock, allocation and delivery", "Namsari, collections and refunds"],
    app: "Android and iOS app included",
    explore: "Explore MotoCore Bike",
    soon: "Soon",
    all: "All products",
    demo: "Book a free demo",
  },
  ne: {
    products: "उत्पादन",
    featured: "विशेष",
    bikeText: "मोटरसाइकल, स्कुटर र EV डिलरका लागि शोरूम व्यवस्थापन।",
    bikePoints: ["सोधपुछ, बुकिङ र रसिद", "VIN स्टक, एलोकेसन र डेलिभरी", "नामसारी, सङ्कलन र फिर्ता"],
    app: "Android र iOS एप समावेश",
    explore: "MotoCore Bike हेर्नुहोस्",
    soon: "छिट्टै",
    all: "सबै उत्पादन",
    demo: "निःशुल्क डेमो बुक गर्नुहोस्",
  },
};

const others = PRODUCTS.filter((p) => p.key !== "bike" && p.slug);

/** Desktop "Products" mega-menu: MotoCore Bike featured, then the rest of the product line. */
export function ProductsMenu({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={wrap} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${open ? "text-brand-red" : "text-[var(--text)] opacity-85 hover:opacity-100 hover:text-brand-red"}`}
      >
        {t.products}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="products-menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-4 w-[760px] -translate-x-1/2 origin-top"
          >
            <div className="grid grid-cols-[300px_1fr] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/10">
              {/* Featured: MotoCore Bike */}
              <a
                href={solutionHref("bike-showroom-software", lang)}
                className="group relative flex flex-col bg-gradient-to-br from-brand-red to-[#9e0410] p-6 text-white"
                onClick={() => setOpen(false)}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/75">{t.featured}</span>
                <span className="mt-3 flex items-center gap-2 font-display text-xl font-bold">
                  <Bike className="h-6 w-6" aria-hidden="true" /> MotoCore Bike
                </span>
                <span className="mt-2 text-sm leading-relaxed text-white/85">{t.bikeText}</span>
                <ul className="mt-4 space-y-2 text-sm">
                  {t.bikePoints.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> {t.app}
                </span>
                <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-bold">
                  {t.explore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>

              {/* The rest of the product line */}
              <div className="flex flex-col p-3">
                <ul className="grid gap-1">
                  {others.map((p) => {
                    const Icon = ICONS[p.key];
                    return (
                      <li key={p.key}>
                        <a
                          href={solutionHref(p.slug as string, lang)}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--bg-secondary)]"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 text-sm font-bold text-[var(--text)]">
                              {p.name}
                              {p.soon && <span className="rounded-full bg-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">{t.soon}</span>}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-[var(--text)]/70">{p.text[lang]}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] px-3 pt-3">
                  <a href={lang === "ne" ? "/ne/products" : "/products"} onClick={() => setOpen(false)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
                    {t.all} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#contact" onClick={() => setOpen(false)} className="text-sm font-semibold text-[var(--text)]/75 hover:text-brand-red">
                    {t.demo}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile drawer: the product line as a list (MotoCore Bike first, with its app badge). */
export function ProductsMenuList({ lang, onNavigate }: { lang: Lang; onNavigate: () => void }) {
  const t = UI[lang];
  return (
    <div className="border-b border-[var(--border)] pb-3">
      <p className="py-2 text-xs font-bold uppercase tracking-widest text-[var(--text)]/60">{t.products}</p>
      <ul className="grid gap-1">
        {PRODUCTS.filter((p) => p.slug).map((p) => {
          const Icon = ICONS[p.key];
          return (
            <li key={p.key}>
              <a href={solutionHref(p.slug as string, lang)} onClick={onNavigate} className="flex items-center gap-3 rounded-xl py-2.5 pr-2 hover:bg-[var(--bg-secondary)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="flex items-center gap-2 text-base font-semibold">
                    {p.name}
                    {p.soon && <span className="rounded-full bg-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase">{t.soon}</span>}
                  </span>
                  {p.key === "bike" && (
                    <span className="inline-flex items-center gap-1 text-xs text-brand-red">
                      <Smartphone className="h-3 w-3" aria-hidden="true" /> {t.app}
                    </span>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <a href={lang === "ne" ? "/ne/products" : "/products"} onClick={onNavigate} className="mt-1 inline-flex items-center gap-1 py-2 text-sm font-semibold text-brand-red">
        {t.all} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
