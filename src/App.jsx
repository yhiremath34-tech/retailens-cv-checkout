import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveSimulator from './components/LiveSimulator/LiveSimulator';
import Features from './components/Features';
import Architecture from './components/Architecture';
import EngineeringDeepDive from './components/EngineeringDeepDive';
import ImpactBanner from './components/ImpactBanner';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';

export default function App() {
  const scrollToSimulator = () => {
    const el = document.querySelector('#simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToArchitecture = () => {
    const el = document.querySelector('#architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Sticky Navigation */}
      <Navbar onNavigateToSimulator={scrollToSimulator} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero 
          onLaunchSimulator={scrollToSimulator}
          onExploreArchitecture={scrollToArchitecture}
        />

        {/* Section 2: Core Interactive Feature ("Live Checkout & Analytics" Simulator) */}
        <LiveSimulator />

        {/* Section 3: What It Does (3-Pillar Feature Grid) */}
        <Features />

        {/* Section 4: Interactive Edge-to-Cloud Architecture Diagram */}
        <Architecture />

        {/* Section 5: Engineering Deep-Dive (Challenges & Solutions) */}
        <EngineeringDeepDive />

        {/* Section 6: Validated Impact & Accomplishments */}
        <ImpactBanner />

        {/* Section 7: Future Product Roadmap */}
        <Roadmap />
      </main>

      {/* Section 8: Footer */}
      <Footer onNavigateToSimulator={scrollToSimulator} />
    </div>
  );
}
