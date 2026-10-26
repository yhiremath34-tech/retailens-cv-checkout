import React from 'react';
import { Terminal, ArrowRight, Database, CheckCircle2, XCircle, ArrowUpRight, Zap, Sparkles, Shield } from 'lucide-react';

export default function Hero({ onLaunchSimulator, onExploreArchitecture }) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden w-full max-w-full bg-grid-pattern">
      {/* Background radial glow accents with max-w containment */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] lg:w-[700px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-4 sm:right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Competition Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#111827]/90 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 backdrop-blur-md max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono truncate">
              OpenCV AI Competition 2026
            </span>
            <span className="text-slate-500 text-xs hidden xs:inline">•</span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-300 hidden xs:flex items-center gap-1 font-mono">
              Powered by <span className="text-amber-400 font-bold">AWS Cloud</span>
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1] font-sans break-words">
            Autonomous Retail Checkout & Analytics.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200 bg-clip-text text-transparent">
              Zero Specialized Hardware.
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            Eliminating checkout friction and retail shrinkage using real-time computer vision with{' '}
            <span className="text-emerald-400 font-medium">OpenCV</span> and scalable{' '}
            <span className="text-amber-400 font-medium">AWS intelligence</span> for seamless, autonomous retail.
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onLaunchSimulator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
          >
            <Terminal className="w-4 h-4 text-black" />
            <span>Launch Interactive Terminal</span>
            <ArrowRight className="w-4 h-4 text-black/70" />
          </button>

          <button
            onClick={onExploreArchitecture}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-[#111827]/80 hover:bg-[#151F32] border border-white/10 hover:border-emerald-500/30 transition-all duration-200 backdrop-blur-md min-h-[48px]"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Explore Cloud Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Key Value Prop Callout: Legacy vs RetaiLens CV */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14 w-full">
          <div className="p-0.5 sm:p-1 rounded-2xl bg-gradient-to-r from-red-500/20 via-emerald-500/20 to-cyan-500/20 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl bg-[#0B0F19] divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
              
              {/* Legacy Systems Column */}
              <div className="p-5 sm:p-7 relative bg-red-950/10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
                    Legacy Sensor Systems
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-rose-400/80 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    High Capex & Fragile
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-sans">$50,000+ Hardware Overhaul</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Requires ceiling-mounted LiDAR matrices, load-cell shelf scales, manual barcode scanning guns, and dedicated server racks.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span>Continuous shelf scale calibration required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span>Raw 4K video uploads saturate retail ISP bandwidth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span>High failure rate during shopper hand occlusions</span>
                  </li>
                </ul>
              </div>

              {/* RetaiLens CV + AWS Column */}
              <div className="p-5 sm:p-7 relative bg-emerald-950/15">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                    RetaiLens CV + AWS
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                    Off-The-Shelf Hardware
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-sans">Standard RGB + Serverless Cloud</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Uses standard overhead RGB cameras with OpenCV edge centroid tracking and serverless AWS IoT Core + Lambda + DynamoDB.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-300">Zero weight scales</strong> or invasive ceiling rigs needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-300">94.2% bandwidth reduction</strong> via local edge filtering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-300">$0.0003 cloud cost</strong> per customer checkout event</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto w-full">
          
          <div className="p-3 sm:p-4 rounded-xl bg-[#111827]/80 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center group hover:border-emerald-500/30 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              Edge Latency
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-emerald-400 transition-colors">
              &lt; 18<span className="text-emerald-400 text-base sm:text-lg">ms</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">Centroid Tracker</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#111827]/80 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center group hover:border-cyan-500/30 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
              SKU Precision
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
              99.4<span className="text-cyan-400 text-base sm:text-lg">%</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">CLAHE Equalized</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#111827]/80 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center group hover:border-amber-500/30 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              Data Saved
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-amber-400 transition-colors">
              94.2<span className="text-amber-400 text-base sm:text-lg">%</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">IoT MQTT vs 4K</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#111827]/80 border border-white/5 backdrop-blur-sm flex flex-col items-center text-center group hover:border-purple-500/30 transition-colors">
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
              Scale Costs
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-purple-400 transition-colors">
              0 <span className="text-purple-400 text-base sm:text-lg">Sensors</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">100% Vision</span>
          </div>

        </div>

      </div>
    </section>
  );
}
