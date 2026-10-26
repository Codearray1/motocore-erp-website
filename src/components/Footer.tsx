import React from "react";
import { Cloud, ShieldAlert, BarChart3, Zap, Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { SOCIAL, SOLUTION_LABELS, SOLUTION_SLUGS } from "../seo/content";
import { solutionHref, type RouteDef } from "../seo/routes";

// lucide has no TikTok mark: the logo glyph as an inline icon with the same sizing API
function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.04-2.82h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.79a5.7 5.7 0 1 0 4.91 5.64V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.26-1.48z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTok },
].filter((l) => l.href);

export default function Footer({ route }: { route: RouteDef }) {
  const isHome = route.kind === "home";
  // Home-page sections are linked as /#section from the landing pages; every page has its own #contact
  const section = (hash: string) => (isHome || hash === "#contact" ? hash : `/${hash}`);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // a page link: let the browser navigate
    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const footerFeatures = [
    { text: "Cloud Based Architecture", icon: Cloud },
    { text: "Secure & Reliable Platform", icon: ShieldAlert },
    { text: "Real-Time Analytics", icon: BarChart3 },
    { text: "Scalable Enterprise Solution", icon: Zap }
  ];

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] transition-colors duration-300">
      
      {/* 1. UPPER FOOTER FEATURES BAR */}
      <div className="border-b border-[var(--border)] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {footerFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.text} 
                className="flex items-center space-x-4 bg-[var(--card)] border border-[var(--border)] px-5 py-4 rounded-2xl shadow-sm hover:border-brand-red/20 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] text-brand-red">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs md:text-sm font-bold tracking-tight text-[var(--text)]">
                  {feat.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. MIDDLE FOOTER LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Col */}
        <div className="md:col-span-5 text-left space-y-6">
          <div className="flex items-center">
            <Logo className="h-14 w-auto object-contain" showSubtitle={false} />
          </div>
          
          <div className="space-y-1 pl-1">
            <p className="text-base font-bold tracking-tight text-[var(--text)]">
              MotoCore ERP
            </p>
            <p className="text-[11px] font-bold font-display tracking-wider text-brand-red uppercase">
              All-in-one automobile management
            </p>
          </div>
          
          <p className="text-xs md:text-sm text-[var(--text)] opacity-70 max-w-sm leading-relaxed">
            MotoCore brings showroom sales, spare parts, workshops and used vehicles into one cloud platform, built in Nepal.
          </p>

          {/* Socials: only official profiles that are configured (seo/content.ts SOCIAL) */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--text)] opacity-70 hover:opacity-100 hover:text-[#E30613] hover:border-brand-red/30 transition-all">
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Links Col 1 (Navigation) */}
        <div className="md:col-span-3 text-left space-y-4">
          <p className="text-xs font-bold tracking-widest text-[var(--text)] opacity-55 uppercase">
            {route.lang === "ne" ? "उत्पादन" : "PRODUCTS"}
          </p>
          <ul className="space-y-2.5">
            {SOLUTION_SLUGS.map((slug) => (
              <li key={slug}>
                <a href={solutionHref(slug, route.lang)} className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">
                  {SOLUTION_LABELS[route.lang][slug]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Col 2 (About & Contact) */}
        <div className="md:col-span-4 text-left space-y-4">
          <p className="text-xs font-bold tracking-widest text-[var(--text)] opacity-55 uppercase">
            ORGANIZATION
          </p>
          <ul className="space-y-2.5">
            <li>
              <a href={route.lang === "ne" ? "/ne/products" : "/products"} className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">
                {route.lang === "ne" ? "सबै उत्पादन" : "All products"}
              </a>
            </li>
            <li>
              <a href="/blog" className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">
                {route.lang === "ne" ? "ब्लग" : "Blog"}
              </a>
            </li>
            <li>
              <a href={section("#contact")} onClick={(e) => handleLinkClick(e, section("#contact"))} className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">
                Contact & support
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">Terms of Service</a>
            </li>
            <li>
              <a href="/support" className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">App Support</a>
            </li>
            <li>
              <a href="/delete-account" className="text-sm text-[var(--text)] opacity-80 hover:opacity-100 hover:text-brand-red transition-all font-semibold">Delete account</a>
            </li>
            <li className="pt-2 border-t border-[var(--border)]">
              <span className="text-[11px] block text-[var(--text)] opacity-70 font-bold uppercase mb-1">PROUDLY DEVELOPED BY</span>
              <span className="text-sm font-extrabold text-[var(--text)]">
                Code One Nepal Pvt. Ltd.
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. LOWER LEGAL COPYRIGHT BANNER */}
      <div className="border-t border-[var(--border)] py-8 bg-[var(--bg)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text)] opacity-75 text-center font-semibold">
            © {new Date().getFullYear()} Code One Nepal Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-[var(--text)] opacity-75 font-bold">
            <a href="/privacy" className="hover:text-brand-red">Privacy Policy</a>
            <span aria-hidden="true">•</span>
            <a href="/terms" className="hover:text-brand-red">Terms of Service</a>
            <span aria-hidden="true">•</span>
            <a href="/support" className="hover:text-brand-red">Support</a>
            <span aria-hidden="true">•</span>
            <span>Sanepa, Lalitpur, Nepal</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
