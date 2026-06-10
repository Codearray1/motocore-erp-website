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

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Solutions", href: "#solutions" },
    { label: "Industries", href: "#industries" },
    { label: "About", href: "#about" },
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
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
     <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        {/* LOGO: Pure high-precision vector SVG replacing broken external image URL */}
        <div className="flex items-center">
          <a href="#" className="flex items-center" onClick={(e) => handleLinkClick(e, "#top")} aria-label="MotoCore ERP Homepage">
            <div className="transition-transform hover:scale-102 flex items-center">
              <Logo className="h-24 md:h-28 w-auto object-contain" />
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
            onClick={onOpenEarlyAccess}
            className="inline-flex items-center bg-brand-red hover:bg-brand-red/90 text-white text-sm font-bold tracking-wide px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-brand-red/20 hover:shadow-lg cursor-pointer"
          >
            Get Early Access
            <ArrowRight className="ml-2 h-4.5 w-4.5" />
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
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              className="w-full text-center bg-brand-red text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-brand-red/20 active:scale-95 transition-all"
            >
              Get Early Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
