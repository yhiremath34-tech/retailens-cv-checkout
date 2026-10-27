import React, { useState } from 'react';
import EntryLoader from './components/EntryLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveSimulator from './components/LiveSimulator/LiveSimulator';
import Features from './components/Features';
import Architecture from './components/Architecture';
import EngineeringDeepDive from './components/EngineeringDeepDive';
import ImpactBanner from './components/ImpactBanner';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import Toast from './components/Toast';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [show404, setShow404] = useState(false);

  // Toast trigger helper
  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev.slice(-3), newToast]); // keep last 4 max

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSimulator = () => {
    setShow404(false);
    setTimeout(() => {
      const el = document.querySelector('#simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToArchitecture = () => {
    setShow404(false);
    setTimeout(() => {
      const el = document.querySelector('#architecture');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // If 404 view is active, render custom 404 view
  if (show404) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] text-slate-900 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900 w-full max-w-full overflow-x-hidden">
        <NotFoundPage onReturnHome={() => setShow404(false)} />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-900 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900 w-full max-w-full overflow-x-hidden">
      {/* High-Tech Edge Camera Entry Load Animation */}
      {isLoading && (
        <EntryLoader onFinish={() => {
          setIsLoading(false);
          addToast('success', 'Terminal Online', 'OpenCV 4.10 Centroid Tracker calibrated & ready.');
        }} />
      )}

      {/* Sticky Navigation */}
      <Navbar 
        onNavigateToSimulator={scrollToSimulator} 
        onOpenNotFound={() => {
          setShow404(true);
          addToast('warning', '404 Simulation Activated', 'Displaying custom computer vision 404 error page.');
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Section 1: Hero */}
        <Hero 
          onLaunchSimulator={scrollToSimulator}
          onExploreArchitecture={scrollToArchitecture}
        />

        {/* Section 2: Core Interactive Feature ("Live Checkout & Analytics" Simulator) */}
        <LiveSimulator onToast={addToast} />

        {/* Section 3: What It Does (3-Pillar Feature Grid) */}
        <Features />

        {/* Section 4: Interactive Edge-to-Cloud Architecture Diagram */}
        <Architecture onToast={addToast} />

        {/* Section 5: Engineering Deep-Dive (Challenges & Solutions) */}
        <EngineeringDeepDive onToast={addToast} />

        {/* Section 6: Validated Impact & Accomplishments */}
        <ImpactBanner />

        {/* Section 7: Future Product Roadmap */}
        <Roadmap />
      </main>

      {/* Section 8: Footer */}
      <Footer 
        onNavigateToSimulator={scrollToSimulator}
        onOpenNotFound={() => {
          setShow404(true);
          addToast('warning', '404 Simulation Activated', 'Displaying custom computer vision 404 error page.');
        }}
      />

      {/* Global Toast Notifications (Success & Error Messages) */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
