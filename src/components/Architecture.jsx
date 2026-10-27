import React, { useState } from 'react';
import { Layers, Copy, Check, Sparkles } from 'lucide-react';
import { ARCHITECTURE_STAGES } from '../data/mockData';

export default function Architecture({ onToast }) {
  const [activeStageId, setActiveStageId] = useState(ARCHITECTURE_STAGES[0].id);
  const [copied, setCopied] = useState(false);

  const activeStage = ARCHITECTURE_STAGES.find(s => s.id === activeStageId) || ARCHITECTURE_STAGES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeStage.codeSnippet);
    setCopied(true);
    if (onToast) {
      onToast('success', 'Production Code Copied', `Stage ${activeStage.stepNumber} snippet copied to clipboard.`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-20 sm:py-24 relative bg-gradient-to-b from-[#F0F7FF] via-[#EBF5FF] to-[#F0F7FF] border-t border-b border-sky-100 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-700 text-xs font-mono mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>How We Built It</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Interactive Edge-to-Cloud Architecture
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-base leading-relaxed">
            Click any stage in the 4-tier pipeline to inspect its runtime architecture, latency budget, and actual production code implementation.
          </p>
        </div>

        {/* 4-Stage Horizontal Pipeline Navigation Bar (White Glass Buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
          {ARCHITECTURE_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setActiveStageId(stage.id);
                  if (onToast) {
                    onToast('info', `Architecture Stage ${stage.stepNumber}`, stage.title);
                  }
                }}
                className={`p-4 sm:p-5 rounded-3xl border text-left transition-all duration-200 relative group flex flex-col justify-between h-32 sm:h-36 min-h-[44px] ${
                  isActive
                    ? 'bg-white border-2 border-sky-500 shadow-xl shadow-sky-500/15 scale-[1.02]'
                    : 'glass-button hover:bg-white text-slate-800'
                }`}
                aria-label={`Select stage ${stage.stepNumber}: ${stage.title}`}
              >
                {/* Stage number & status indicator */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    isActive ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}>
                    Stage {stage.stepNumber}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 font-bold">
                    {idx === 0 && 'Local Edge'}
                    {idx === 1 && 'Ingestion'}
                    {idx === 2 && 'Serverless'}
                    {idx === 3 && 'BI & Lake'}
                  </span>
                </div>

                <div>
                  <h4 className={`text-xs sm:text-sm font-bold font-sans line-clamp-1 transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-sky-600'
                  }`}>
                    {stage.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 truncate mt-0.5">
                    {stage.subtitle}
                  </p>
                </div>

                {/* Bottom Active Indicator Line */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-r from-sky-400 to-cyan-500 w-full' : 'w-0'
                  }`}></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Implementation Card (White Glass) */}
        <div className="bg-white rounded-3xl border border-sky-100 p-5 sm:p-8 shadow-xl shadow-sky-500/5 w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
            
            {/* Left 6 Columns: Description, Key Points, Telemetry Metrics */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 w-full">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${activeStage.badgeColor}`}>
                    {activeStage.badge}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-500">
                    Stage {activeStage.stepNumber} of 04
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                  {activeStage.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono font-bold text-sky-600 mt-1">
                  {activeStage.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeStage.summary}
              </p>

              {/* Technical Key Points */}
              <div className="space-y-2.5 sm:space-y-3">
                <h5 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Core Implementation Details:
                </h5>
                <ul className="space-y-2">
                  {activeStage.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-1.5"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Telemetry Metrics Grid (White Glass Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-sky-100 w-full">
                {Object.entries(activeStage.telemetryMetrics).map(([key, val]) => (
                  <div key={key} className="p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] border border-sky-100">
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold font-mono text-sky-700 mt-0.5 truncate">
                      {val}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right 6 Columns: Executable Code / Query Viewer */}
            <div className="lg:col-span-6 flex flex-col h-full w-full overflow-hidden">
              <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl flex flex-col h-full w-full">
                
                {/* Code Window Header */}
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 ml-1 sm:ml-2">
                      production_implementation.py
                    </span>
                  </div>

                  {/* Copy Button (White Glass Button with Light Blue Color) */}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="glass-button flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold min-h-[32px]"
                    aria-label="Copy production code snippet"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-600" />
                        <span className="text-sky-600 font-bold">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <div className="p-3 sm:p-4 overflow-x-auto flex-1 font-mono text-xs text-slate-200 bg-slate-900 leading-relaxed max-w-full">
                  <pre className="selection:bg-sky-500/30 text-[11px] sm:text-xs">
                    <code className="text-sky-300">{activeStage.codeSnippet}</code>
                  </pre>
                </div>

                {/* Footer Note */}
                <div className="px-3 sm:px-4 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
                  <span>Python 3.11 • OpenCV 4.10 • Boto3</span>
                  <span className="text-emerald-400 font-bold">Verified Compatible</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
