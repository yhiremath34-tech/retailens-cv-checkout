import React, { useState, useEffect } from 'react';
import { Camera, Cpu, Cloud, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function EntryLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const steps = [
    'Initializing OpenCV 4.10 Centroid Matrix...',
    'Calibrating CLAHE Specular Glare Filters...',
    'Establishing AWS IoT Core MQTT TLS 1.3 Tunnel...',
    'Syncing DynamoDB Cart State & QuickSight BI...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setFadingOut(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 450);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 5;
        if (next > 25 && next <= 55) setCurrentStep(1);
        else if (next > 55 && next <= 85) setCurrentStep(2);
        else if (next > 85) setCurrentStep(3);
        return Math.min(next, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 200);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#EBF5FF] via-[#F0F7FF] to-[#E0F2FE] backdrop-blur-2xl transition-opacity duration-500 ${
      fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background ambient light blue glow */}
      <div className="absolute w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="relative z-10 max-w-md w-full mx-4 p-8 rounded-3xl bg-white/90 border border-sky-200/80 shadow-2xl shadow-sky-500/15 backdrop-blur-2xl text-center">
        
        {/* Pulsing AI Camera Iris */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-sky-400/40 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-sky-500 animate-spin" style={{ animationDuration: '6s' }}></div>
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-sky-400 flex items-center justify-center text-sky-600 shadow-lg shadow-sky-400/20">
            <Camera className="w-8 h-8 text-sky-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
        </div>

        {/* Brand Headline */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>RetaiLens AI • OpenCV & AWS Edge</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight mb-2">
          Autonomous Retail Vision
        </h2>
        <p className="text-xs text-slate-500 font-sans mb-6">
          Booting edge centroid tracking pipeline & serverless checkout lane...
        </p>

        {/* Progress bar */}
        <div className="w-full bg-sky-100/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-sky-200/60 mb-3 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 rounded-full transition-all duration-100 shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Current Telemetry Step */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-6 px-1">
          <span className="text-sky-700 font-bold truncate pr-2">
            {steps[currentStep]}
          </span>
          <span className="text-sky-600 font-bold flex-shrink-0">
            {progress}%
          </span>
        </div>

        {/* Skip button (white glass with light blue accent) */}
        <button
          type="button"
          onClick={handleSkip}
          className="glass-button w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-sky-50 transition-colors"
        >
          <span>Launch Terminal Instantly</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
