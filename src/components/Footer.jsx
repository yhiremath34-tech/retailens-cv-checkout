import React from 'react';
import { Camera, ExternalLink, Phone, Mail, HelpCircle, ArrowUp } from 'lucide-react';

export default function Footer({ onNavigateToSimulator, onOpenNotFound }) {
  const currentYear = new Date().getFullYear();

  const techStack = [
    { name: 'OpenCV 4.10', category: 'Vision' },
    { name: 'Python 3.11', category: 'Core' },
    { name: 'AWS IoT Core', category: 'MQTT' },
    { name: 'Amazon Kinesis', category: 'Streaming' },
    { name: 'AWS Lambda', category: 'Compute' },
    { name: 'Amazon DynamoDB', category: 'Database' },
    { name: 'Amazon S3', category: 'Storage' },
    { name: 'Amazon QuickSight', category: 'BI' },
  ];

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#05080F] border-t border-white/10 pt-16 pb-12 text-slate-400 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10 w-full">
          
          {/* Brand & Mission (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="#"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-3 group cursor-pointer"
              title="RetaiLens CV - Return to top"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-emerald-500/10 border border-emerald-500/40 group-hover:border-emerald-400 transition-colors">
                <Camera className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white font-sans group-hover:text-emerald-300 transition-colors">
                RetaiLens<span className="text-emerald-400">.cv</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Autonomous retail checkout and store intelligence platform built for the OpenCV AI Competition 2026. Zero specialized hardware, standard RGB cameras, and serverless AWS scale.
            </p>

            {/* Clickable Direct Contact Info */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-500">Hotline:</span>
                <a 
                  href="tel:+18005557382" 
                  className="text-slate-300 hover:text-emerald-400 transition-colors underline decoration-white/20 hover:decoration-emerald-400"
                >
                  +1 (800) 555-RETAIL
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-500">Engineering:</span>
                <a 
                  href="mailto:architects@retailens.ai?subject=RetaiLens%20Autonomous%20Checkout%20Inquiry" 
                  className="text-slate-300 hover:text-cyan-400 transition-colors underline decoration-white/20 hover:decoration-cyan-400"
                >
                  architects@retailens.ai
                </a>
              </div>
            </div>

            {/* GitHub & Devpost Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="https://github.com/yhiremath34-tech/retailens-cv-checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="GitHub Repository"
                aria-label="View source on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://devpost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors min-h-[44px]"
                title="Devpost Submission"
              >
                <span>Devpost Submission</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={onOpenNotFound}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors min-h-[44px]"
                title="Preview Custom 404 Error State"
              >
                <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate 404</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="#simulator" 
                  onClick={(e) => handleNavClick(e, '#simulator')}
                  className="hover:text-emerald-400 transition-colors block py-0.5"
                >
                  Live Checkout Simulator
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, '#features')}
                  className="hover:text-emerald-400 transition-colors block py-0.5"
                >
                  Core Capabilities
                </a>
              </li>
              <li>
                <a 
                  href="#architecture" 
                  onClick={(e) => handleNavClick(e, '#architecture')}
                  className="hover:text-emerald-400 transition-colors block py-0.5"
                >
                  Edge-to-Cloud Architecture
                </a>
              </li>
              <li>
                <a 
                  href="#engineering" 
                  onClick={(e) => handleNavClick(e, '#engineering')}
                  className="hover:text-emerald-400 transition-colors block py-0.5"
                >
                  Engineering Deep-Dive
                </a>
              </li>
              <li>
                <a 
                  href="#roadmap" 
                  onClick={(e) => handleNavClick(e, '#roadmap')}
                  className="hover:text-emerald-400 transition-colors block py-0.5"
                >
                  Future Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack Badges (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Integrated Tech Stack
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-2.5 py-1 rounded-lg bg-[#111827] border border-white/5 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
            <p className="text-[11px] font-mono text-slate-500 pt-2 leading-relaxed">
              Architecture fully compliant with AWS Well-Architected Framework & OpenCV 4.x specifications.
            </p>
          </div>

        </div>

        {/* Copyright & Disclaimer Bottom Bar with dynamic year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {currentYear} RetaiLens CV • Built for OpenCV AI Competition
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/yhiremath34-tech/retailens-cv-checkout/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Apache 2.0 Open Source
            </a>
            <span>•</span>
            <span className="hover:text-slate-400 transition-colors">AWS Well-Architected</span>
            <span>•</span>
            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
