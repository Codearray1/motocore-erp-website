import React, { useState } from "react";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenEarlyAccess: () => void;
}

export default function Navbar({ isDarkMode, onToggleTheme, onOpenEarlyAccess }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openRegisterPage = () => {
    window.open("https://app.motocoreerp.com/register", "_blank");
  };

  const navLinks = [
    { label: "Offer", href: "#nada-exclusive" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#solutions" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Launch Offer Banner */}
      <div className="w-full bg-[var(--bg)] text-[var(--text)] border-b border-[var(--border)] py-1.5 px-4 text-center text-[10px] md:text-xs font-medium tracking-wide flex items-center justify-center gap-2 z-50 relative overflow-hidden whitespace-nowrap">
        <span className="font-bold uppercase text-brand-red border border-brand-red/30 px-1.5 py-0.5 rounded-sm shrink-0">Launch Offer</span>
        <span className="truncate">
          Up to 50% lifetime discount
          <span className="hidden sm:inline">
            <span className="opacity-40 px-2">•</span> Free installation & setup
            <span className="opacity-40 px-2">•</span> 15 days free trial for all
          </span>
        </span>
      </div>
      <div className="w-full bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 h-19 flex items-center justify-between">
          {/* LOGO: Pure high-precision vector SVG replacing broken external image URL */}
          <div className="flex items-center">
            <a href="#" className="flex items-center" onClick={(e) => handleLinkClick(e, "#top")} aria-label="MotoCore ERP Homepage">
              <div className="transition-transform hover:scale-102 flex items-center">
                <Logo className="h-20 md:h-24 w-auto object-contain" />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-[var(--text)] opacity-85 hover:opacity-100 hover:text-brand-red dark:hover:text-brand-red transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Utility Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center h-11 px-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text)] transition-all duration-300 border border-[var(--border)] cursor-pointer shadow-sm text-sm"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <span className="flex items-center gap-1.5 font-semibold text-xs tracking-wider">
                  <span>☀</span> <span>Light Mode</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-semibold text-xs tracking-wider">
                  <span>🌙</span> <span>Dark Mode</span>
                </span>
              )}
            </button>

            <button
              onClick={() => { window.location.href = 'https://app.motocoreerp.com/'; }}
              className="inline-flex items-center text-[var(--text)] hover:text-brand-red text-sm font-bold tracking-wide px-3 py-2 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={openRegisterPage}
              className="inline-flex items-center bg-brand-red hover:bg-brand-red/90 text-white text-sm font-bold tracking-wide px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-brand-red/20 hover:shadow-lg cursor-pointer"
            >
              Register
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="inline-flex items-center justify-center h-10 px-3.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border)] text-[var(--text)] transition-all duration-300 border border-[var(--border)]"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <span className="flex items-center gap-1 font-semibold text-xs tracking-wide">
                  <span>☀</span> <span>Light</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 font-semibold text-xs tracking-wide">
                  <span>🌙</span> <span>Dark</span>
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--border)] transition-colors border border-[var(--border)]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-28 left-0 w-full bg-[var(--bg)] border-b border-[var(--border)] py-6 px-6 shadow-xl transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-semibold text-[var(--text)] hover:text-brand-red py-2 transition-colors border-b border-[var(--border)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/login';
                  }}
                  className="flex-1 text-center bg-[var(--bg-secondary)] text-[var(--text)] border border-[var(--border)] py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[var(--border)] active:scale-95 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/register';
                  }}
                  className="flex-1 text-center bg-brand-red text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-red/20 active:scale-95 transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
