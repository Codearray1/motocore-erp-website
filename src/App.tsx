import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Features from "./components/Features";
import IndustrySection from "./components/IndustrySection";
import EarlyAccess from "./components/EarlyAccess";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { EarlyAccessModal, DemoRequestModal } from "./components/LaunchDialogs";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState<boolean>(false);
  const [isDemoRequestOpen, setIsDemoRequestOpen] = useState<boolean>(false);

  // Sync theme with local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("motocore_theme");
    let prefersDark = true;
    if (savedTheme) {
      prefersDark = savedTheme === "dark";
    } else {
      // Detect system preference on first visit
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Theme Toggle Trigger Handler
  const handleToggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("motocore_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("motocore_theme", "light");
    }
  };

  const handleOpenEarlyAccess = () => setIsEarlyAccessOpen(true);
  const handleOpenDemoRequest = () => setIsDemoRequestOpen(true);
  const handleCloseAllModals = () => {
    setIsEarlyAccessOpen(false);
    setIsDemoRequestOpen(false);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col font-sans bg-[var(--bg)] text-[var(--text)]">
      {/* 1. Global Navigation Bar */}
      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleToggleTheme} 
        onOpenEarlyAccess={handleOpenEarlyAccess} 
      />

      {/* 2. Main content modules */}
      <main className="flex-grow">
        {/* Launch Intro Block with Ticking HUD Countdown */}
        <Hero 
          onOpenEarlyAccess={handleOpenEarlyAccess} 
          onOpenDemoRequest={handleOpenDemoRequest} 
        />
        
        {/* Sector validation caps */}
        <TrustedBy />

        {/* 8-Card Business Management Feature Suite */}
        <Features />

        {/* Industry Focus Showcase & Core Benefits checks */}
        <IndustrySection />

        {/* Priority registration block */}
        <EarlyAccess />

        {/* Multi-Branch inquiries form and contacts details */}
        <Contact />
      </main>

      {/* 3. Global Footer & upper Features Bar alignment */}
      <Footer />

      {/* Interactive overlays & forms */}
      <EarlyAccessModal isOpen={isEarlyAccessOpen} onClose={handleCloseAllModals} />
      <DemoRequestModal isOpen={isDemoRequestOpen} onClose={handleCloseAllModals} />
    </div>
  );
}
