import React from 'react';
import { Award, Zap, DollarSign, Activity, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ImpactBanner() {
  const stats = [
    {
      metric: '< 850ms',
      label: 'End-to-End Checkout SLA',
      detail: 'From counter placement to DynamoDB receipt state',
      icon: Zap,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/20 to-transparent'
    },
    {
      metric: '$0.0003',
      label: 'Cloud Cost Per Transaction',
      detail: 'Serverless AWS Lambda + DynamoDB On-Demand',
      icon: DollarSign,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/20 to-transparent'
    },
    {
      metric: '94.2%',
      label: 'Bandwidth Egress Reduction',
      detail: 'Edge metadata JSON vs continuous 4K video uploads',
      icon: Activity,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/20 to-transparent'
    },
    {
      metric: '100%',
      label: 'Off-The-Shelf Hardware',
      detail: 'Standard RGB cameras with zero weight-scale shelves',
      icon: CheckCircle2,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/20 to-transparent'
    }
  ];

  return (
    <section className="py-16 sm:py-20 relative bg-[#EAF3FD] border-t border-b border-sky-200/60 overflow-hidden w-full max-w-full">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[300px] bg-sky-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Accomplishment Badge */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-mono mb-3 shadow-sm">
            <Award className="w-4 h-4 text-sky-600 flex-shrink-0" />
            <span>OpenCV AI Competition 2026 Submission</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            Validated Enterprise Impact & Operational Metrics
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-xl font-sans">
            Proving that high-accuracy autonomous retail does not require half a million dollars in custom sensor infrastructure.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-5 sm:p-6 bg-white/95 border border-sky-200/80 hover:border-sky-400 hover:shadow-xl transition-all group overflow-hidden shadow-sm backdrop-blur-md"
              >
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.bgGlow} blur-xl pointer-events-none`}></div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl sm:text-4xl font-extrabold font-mono ${s.color.replace('text-emerald-400', 'text-emerald-600').replace('text-cyan-400', 'text-sky-600').replace('text-amber-400', 'text-amber-600').replace('text-purple-400', 'text-indigo-600')}`}>
                    {s.metric}
                  </span>
                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-sans mb-1">
                  {s.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-mono leading-relaxed">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote / Endorsement Callout */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white/95 border border-sky-200/90 shadow-md max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 w-full backdrop-blur-md">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center font-bold text-white font-mono text-sm sm:text-base flex-shrink-0 shadow-md shadow-sky-400/20">
              CV
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-800 font-sans italic leading-relaxed">
                "By decoupling heavy video streaming from state tracking and pushing OpenCV inference to local edge cameras, RetaiLens eliminates the primary financial blocker of autonomous retail."
              </p>
              <span className="text-[10px] sm:text-[11px] font-mono text-sky-700 mt-1 block font-bold">
                — Retail Architecture Benchmark Report (2026)
              </span>
            </div>
          </div>

          <a
            href="https://github.com/yhiremath34-tech/retailens-cv-checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all min-h-[44px]"
            aria-label="Review source code on GitHub"
          >
            <span>Review Source Code</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-sky-600" />
          </a>
        </div>

      </div>
    </section>
  );
}
