import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Zap, Eye, Database, ArrowRight } from 'lucide-react';

export default function Features() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Frictionless Autonomous Checkout',
      subtitle: 'Zero Manual Barcode Scanning',
      badge: 'OpenCV Centroid Tracking',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description: 'Real-time SKU detection and multi-object classification directly on top-down or front-facing counter views. Automatically synthesizes an itemized digital receipt in under 850 milliseconds.',
      highlights: [
        'Multi-SKU concurrent detection proposals with 99.4% precision',
        'Eliminates barcode scanning gun wear, torn labels, and queue lines',
        'Instant sub-second cart synchronization with Amazon DynamoDB'
      ],
      icon: ShoppingCart,
      accentColor: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'border-emerald-500/30',
      terminalSnippet: `[CV_EDGE] Detected: "Nitro Cold Brew" (SKU: BEV-4421)
[CENTROID] Object ID #1 locked at (184, 142) | conf: 98.7%
[DYNAMODB] PutItem -> Session Cart: cart_88391 (+ $3.79)`
    },
    {
      id: 'pillar-2',
      title: 'Loss Prevention & Anti-Sweethearting',
      subtitle: 'Geometric & Hand-to-Item Verification',
      badge: 'Shrinkage Prevention Heuristics',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description: 'Continuously monitors hand trajectories and item displacement vectors. Flags occluded items, unauthorized pass-arounds, or unverified item pickups before customer egress.',
      highlights: [
        'Persistent centroid history retains tracking across momentary hand occlusions',
        'Flags unpaid items disguised inside personal bags or under arms',
        'Reduces retail shrinkage by up to 34% without awkward security bag searches'
      ],
      icon: ShieldCheck,
      accentColor: 'from-amber-500/20 to-orange-500/5',
      borderColor: 'border-amber-500/30',
      terminalSnippet: `[LP_RULE_88] Hand contour overlapping object bounds.
[OCCLUSION] Occlusion Index: 88.4% -> PAUSE_CHECKOUT
[AUDIT] Clip snippet tagged & stored in S3 for clerk verification`
    },
    {
      id: 'pillar-3',
      title: 'Real-Time Store & Shopper Analytics',
      subtitle: 'Shelf Dwell Heatmaps & Restocking',
      badge: 'AWS QuickSight Intelligence',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
      description: 'Turns standard security cameras into intelligent retail telemetry sensors. Measures shopper dwell times, peak queue bottlenecks, and heatmaps to optimize planograms.',
      highlights: [
        'Real-time store occupancy counts without facial recognition / privacy risks',
        'Shelf engagement analytics reveal highest product consideration-to-purchase ratios',
        'Automated low-inventory triggers dispatched directly to store replenishment staff'
      ],
      icon: MapPin,
      accentColor: 'from-cyan-500/20 to-blue-500/5',
      borderColor: 'border-cyan-500/30',
      terminalSnippet: `[KINESIS] Streamed dwell event: Zone "Dairy" (Dwell: 51s)
[S3_ATHENA] Columnar Parquet batch indexed for QuickSight
[RESTOCK] Trigger alert: "Organic Whole Milk" < 3 units remaining`
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Architectural Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Three Pillars of Autonomous Retail Intelligence
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Standardizing retail intelligence with edge computer vision and serverless cloud computing. No weight scales, no LiDAR rigs, zero friction.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(idx)}
                className={`relative rounded-3xl p-7 bg-[#0B0F19] border transition-all duration-300 flex flex-col justify-between group ${
                  activePillar === idx
                    ? `${pillar.borderColor} shadow-2xl shadow-emerald-500/5 scale-[1.01]`
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-44 h-44 rounded-full bg-gradient-to-br ${pillar.accentColor} blur-2xl pointer-events-none -z-10`}></div>

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-[#111827] border border-white/10 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase tracking-wider font-semibold ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white font-sans mt-1 mb-1 group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-emerald-400 mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {pillar.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Terminal Snippet */}
                <div className="p-3 rounded-xl bg-[#06080E] border border-white/5 font-mono text-[10px] text-slate-400 overflow-x-auto">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1 border-b border-white/5 pb-1 flex items-center justify-between">
                    <span>Edge Telemetry Trace</span>
                    <span className="text-emerald-500/80">Active</span>
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {pillar.terminalSnippet}
                  </pre>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
