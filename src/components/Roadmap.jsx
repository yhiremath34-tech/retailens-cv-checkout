import React from 'react';
import { Compass, Cpu, Smartphone, BrainCircuit } from 'lucide-react';
import { ROADMAP_STEPS } from '../data/mockData';

export default function Roadmap() {
  const stepIcons = [Cpu, Smartphone, BrainCircuit];

  return (
    <section id="roadmap" className="py-20 sm:py-24 relative bg-[#090D16] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Product Roadmap & Vision</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            What's Next for RetaiLens AI
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-400 text-xs sm:text-base leading-relaxed">
            Our multi-phase vision for scaling autonomous edge computer vision to national retail chains with OAK silicon, biometrics, and SageMaker forecasting.
          </p>
        </div>

        {/* 3-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative w-full">
          
          {ROADMAP_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Cpu;
            return (
              <div
                key={step.phase}
                className="relative rounded-3xl p-6 sm:p-7 bg-[#0B0F19] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between group shadow-xl w-full overflow-hidden"
              >
                <div>
                  {/* Top Status & Phase */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] sm:text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${step.statusColor}`}>
                      {step.status}
                    </span>
                  </div>

                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-sans mb-2 sm:mb-3 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 sm:mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Key Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#111827] text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
