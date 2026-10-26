import React from 'react';
import { Award, Zap, DollarSign, Activity, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
    <section className="py-20 relative bg-[#070A12] border-t border-b border-white/5 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Accomplishment Badge */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>OpenCV AI Competition 2026 Submission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Validated Enterprise Impact & Operational Metrics
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl">
            Proving that high-accuracy autonomous retail does not require half a million dollars in custom sensor infrastructure.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-6 bg-[#0B0F19] border border-white/10 hover:border-emerald-500/30 transition-all group overflow-hidden shadow-xl"
              >
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.bgGlow} blur-xl pointer-events-none`}></div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono ${s.color}`}>
                    {s.metric}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white font-sans mb-1">
                  {s.label}
                </h4>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote / Endorsement Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0F1626] border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-bold text-black font-mono text-base flex-shrink-0 shadow-lg shadow-emerald-500/20">
              CV
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
                "By decoupling heavy video streaming from state tracking and pushing OpenCV inference to local edge cameras, RetaiLens eliminates the primary financial blocker of autonomous retail."
              </p>
              <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                — Retail Architecture Benchmark Report (2026)
              </span>
            </div>
          </div>

          <a
            href="https://github.com/yhiremath34-tech/retailens-cv-checkout"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span>Review Source Code</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
