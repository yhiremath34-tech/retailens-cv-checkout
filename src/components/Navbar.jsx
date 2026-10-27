import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, Activity, Layers, ShieldCheck, Terminal, Phone, Mail, X, Menu, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';

export default function Navbar({ onNavigateToSimulator, onOpenNotFound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Live Terminal', href: '#simulator' },
    { label: 'Capabilities', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Engineering Deep-Dive', href: '#engineering' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/85 backdrop-blur-md border-b border-sky-100 shadow-md shadow-sky-500/5 py-3' 
        : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Platform Name (Clickable to Top) */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
            title="RetaiLens CV - Return to top"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-sky-200/80 shadow-md shadow-sky-500/10 group-hover:border-sky-400 group-hover:scale-105 transition-all">
              <Camera className="w-5 h-5 text-sky-600" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors font-sans">
                  RetaiLens<span className="text-sky-600">.cv</span>
                </span>
                <span className="text-[9px] uppercase font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  AI Edge
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 hidden xs:inline">OpenCV + AWS Serverless</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-sky-100/80 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50/80 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions: White Glass Buttons with Light Blue Color */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Live Edge Telemetry Status */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-sky-200/80 text-sky-700 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold">Edge Node Online</span>
              <span className="text-sky-300">|</span>
              <span className="text-slate-500">18ms</span>
            </div>

            {/* Clickable Email (White Glass Button) */}
            <a
              href="mailto:architects@retailens.ai?subject=RetaiLens%20Autonomous%20Checkout%20Inquiry"
              className="glass-button p-2.5 rounded-xl hover:text-sky-700"
              title="Email Engineering Team: architects@retailens.ai"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Clickable Phone (White Glass Button) */}
            <a
              href="tel:+18005557382"
              className="glass-button p-2.5 rounded-xl hover:text-sky-700"
              title="Call Autonomous Support: +1 (800) 555-7382"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* GitHub Demo Button (White Glass Button) */}
            <a 
              href="https://github.com/yhiremath34-tech/retailens-cv-checkout" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button p-2.5 rounded-xl hover:text-sky-700"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Launch Simulator CTA (White Glass Button with Light Blue Accent) */}
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('#simulator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onNavigateToSimulator) onNavigateToSimulator();
              }}
              className="glass-button-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600" />
              <span>Try Simulator</span>
              <ChevronRight className="w-3 h-3 text-sky-400" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass-button p-2.5 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center text-sky-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-800" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Drawer (White Glass) */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-5 rounded-3xl bg-white/95 border border-sky-100 shadow-2xl backdrop-blur-2xl space-y-4 animate-slide-up">
            
            {/* Live Edge Telemetry Status */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-bold">Edge Node #04 Online</span>
              </div>
              <span className="text-slate-500 font-bold">&lt; 18ms</span>
            </div>

            {/* Navigation links */}
            <div className="space-y-1 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-3 border-t border-sky-100 space-y-2">
              <a
                href="tel:+18005557382"
                className="glass-button flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>+1 (800) 555-RETAIL (Hotline)</span>
              </a>

              <a
                href="mailto:architects@retailens.ai?subject=RetaiLens%20Mobile%20Inquiry"
                className="glass-button flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono font-bold"
              >
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>architects@retailens.ai</span>
              </a>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-sky-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.querySelector('#simulator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  if (onNavigateToSimulator) onNavigateToSimulator();
                }}
                className="glass-button-primary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold"
              >
                <Terminal className="w-4 h-4 text-sky-600" />
                <span>Launch Interactive Terminal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenNotFound) onOpenNotFound();
                }}
                className="glass-button w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono text-slate-500 hover:text-rose-600"
              >
                <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Simulate 404 Missing Route</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </header>
  );
}
