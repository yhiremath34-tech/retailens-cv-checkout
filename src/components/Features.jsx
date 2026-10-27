import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, MapPin, CheckCircle2, Zap } from 'lucide-react';

export default function Features() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Frictionless Autonomous Checkout',
      subtitle: 'Zero Manual Barcode Scanning',
      badge: 'OpenCV Centroid Tracking',
      badgeColor: 'border-emerald-200 text-emerald-700 bg-emerald-50',
      description: 'Real-time SKU detection and multi-object classification directly on top-down or front-facing counter views. Automatically synthesizes an itemized digital receipt in under 850 milliseconds.',
      highlights: [
        'Multi-SKU concurrent detection proposals with 99.4% precision',
        'Eliminates barcode scanning gun wear, torn labels, and queue lines',
        'Instant sub-second cart synchronization with Amazon DynamoDB'
      ],
      icon: ShoppingCart,
      accentColor: 'from-sky-300/30 to-cyan-300/10',
      borderColor: 'border-sky-300',
      terminalSnippet: `[CV_EDGE] Detected: "Nitro Cold Brew" (SKU: BEV-4421)
[CENTROID] Object ID #1 locked at (184, 142) | conf: 98.7%
[DYNAMODB] PutItem -> Session Cart: cart_88391 (+ $3.79)`
    },
    {
      id: 'pillar-2',
      title: 'Loss Prevention & Anti-Sweethearting',
      subtitle: 'Geometric & Hand-to-Item Verification',
      badge: 'Shrinkage Prevention Heuristics',
      badgeColor: 'border-amber-200 text-amber-700 bg-amber-50',
      description: 'Continuously monitors hand trajectories and item displacement vectors. Flags occluded items, unauthorized pass-arounds, or unverified item pickups before customer egress.',
      highlights: [
        'Persistent centroid history retains tracking across momentary hand occlusions',
        'Flags unpaid items disguised inside personal bags or under arms',
        'Reduces retail shrinkage by up to 34% without awkward security bag searches'
      ],
      icon: ShieldCheck,
      accentColor: 'from-amber-300/30 to-orange-300/10',
      borderColor: 'border-amber-300',
      terminalSnippet: `[LP_RULE_88] Hand contour overlapping object bounds.
[OCCLUSION] Occlusion Index: 88.4% -> PAUSE_CHECKOUT
[AUDIT] Clip snippet tagged & stored in S3 for clerk verification`
    },
    {
      id: 'pillar-3',
      title: 'Real-Time Store & Shopper Analytics',
      subtitle: 'Shelf Dwell Heatmaps & Restocking',
      badge: 'AWS QuickSight Intelligence',
      badgeColor: 'border-cyan-200 text-cyan-700 bg-cyan-50',
      description: 'Turns standard security cameras into intelligent retail telemetry sensors. Measures shopper dwell times, peak queue bottlenecks, and heatmaps to optimize planograms.',
      highlights: [
        'Real-time store occupancy counts without facial recognition / privacy risks',
        'Shelf engagement analytics reveal highest product consideration-to-purchase ratios',
        'Automated low-inventory triggers dispatched directly to store replenishment staff'
      ],
      icon: MapPin,
      accentColor: 'from-blue-300/30 to-indigo-300/10',
      borderColor: 'border-cyan-300',
      terminalSnippet: `[KINESIS] Streamed dwell event: Zone "Dairy" (Dwell: 51s)
[S3_ATHENA] Columnar Parquet batch indexed for QuickSight
[RESTOCK] Trigger alert: "Organic Whole Milk" < 3 units remaining`
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-24 relative bg-[#F0F7FF] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-700 text-xs font-mono mb-3 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-sky-500" />
            <span>Core Architectural Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Three Pillars of Autonomous Retail Intelligence
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-base leading-relaxed">
            Standardizing retail intelligence with edge computer vision and serverless cloud computing. No weight scales, no LiDAR rigs, zero friction.
          </p>
        </div>

        {/* 3 Pillars Grid (White Glass Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                onMouseEnter={() => setActivePillar(idx)}
                className={`relative rounded-3xl p-6 sm:p-8 bg-white border transition-all duration-300 flex flex-col justify-between group cursor-pointer w-full overflow-hidden shadow-xl shadow-sky-500/5 ${
                  activePillar === idx
                    ? `${pillar.borderColor} shadow-sky-500/15 scale-[1.01] border-2`
                    : 'border-sky-100 hover:border-sky-200'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${pillar.title}`}
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-gradient-to-br ${pillar.accentColor} blur-2xl pointer-events-none -z-10`}></div>

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-mono px-3 py-1 rounded-full border uppercase tracking-wider font-bold ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-mono font-bold text-sky-600 uppercase tracking-widest">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mt-1 mb-1 group-hover:text-sky-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-sky-600 mb-3 sm:mb-4">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6">
                    {pillar.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 text-xs text-slate-700">
                    {pillar.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Terminal Snippet (White Glass Box) */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-sky-100 font-mono text-[9px] sm:text-[10px] text-slate-700 overflow-x-auto w-full shadow-inner">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1 border-b border-sky-100 pb-1 flex items-center justify-between">
                    <span>Edge Telemetry Trace</span>
                    <span className="text-emerald-600 font-bold">Active</span>
                  </div>
                  <pre className="text-slate-800 whitespace-pre-wrap leading-relaxed font-semibold">
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
