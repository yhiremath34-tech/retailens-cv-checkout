import React, { useState } from 'react';
import { Cpu, Zap, Sun, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Sliders, RefreshCw, Layers } from 'lucide-react';
import { ENGINEERING_CHALLENGES } from '../data/mockData';

export default function EngineeringDeepDive() {
  const [toggleTrackingMemory, setToggleTrackingMemory] = useState(true);
  const [toggleClaheFilter, setToggleClaheFilter] = useState(true);
  const [bandwidthCameraCount, setBandwidthCameraCount] = useState(8);

  // Bandwidth calculation helper
  const rawVideoEgress = (bandwidthCameraCount * 3.8).toFixed(1); // Mbps
  const jsonMetadataEgress = (bandwidthCameraCount * 0.012).toFixed(2); // Mbps
  const costSavings = Math.round(bandwidthCameraCount * 75); // $/mo

  return (
    <section id="engineering" className="py-24 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Deep-Dive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Complex Retail Challenges. Elegant CV Solutions.
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Real-world retail environments present severe edge computer vision hurdles — from hand occlusions and specular glare to massive cloud video upload bottlenecks. Here is how we engineered past them.
          </p>
        </div>

        {/* 3 Challenge Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Occlusion & Fast Hand Motion */}
          <div className="bg-[#0B0F19] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Challenge 01 • Tracking
                </span>
                <span className="text-xs font-mono text-slate-400">Centroid Memory</span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-2">
                Occlusion & Fast Hand Motion
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                When shoppers bag groceries, hands momentarily obscure packaging contours. Standard detectors lose the bounding box, causing cart-removal and re-addition flickering.
              </p>

              {/* Solution Description */}
              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5 mb-5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-400">Our Solution:</strong> Persistent Euclidean centroid tracking with an exponential disappearance buffer (<code className="text-cyan-300">maxDisappeared=25 frames</code>). Preserves object identity even through severe hand passes.
              </div>

              {/* Interactive Demo Within Card */}
              <div className="p-4 rounded-2xl bg-[#06080E] border border-white/10 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Centroid Memory Buffer</span>
                  <button
                    onClick={() => setToggleTrackingMemory(!toggleTrackingMemory)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      toggleTrackingMemory 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {toggleTrackingMemory ? 'ENABLED (RetaiLens)' : 'DISABLED (Standard)'}
                  </button>
                </div>

                <div className="h-28 rounded-xl bg-[#090D16] border border-white/5 relative flex items-center justify-center overflow-hidden">
                  {/* Bounding box simulation */}
                  <div className={`relative px-4 py-2 rounded-lg transition-all ${
                    toggleTrackingMemory 
                      ? 'border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10' 
                      : 'border-2 border-dashed border-rose-500 animate-pulse bg-rose-500/10'
                  }`}>
                    <div className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <span>Cold Brew Coffee</span>
                      <span className="text-[9px] px-1 rounded bg-black/60 text-slate-300">
                        {toggleTrackingMemory ? 'ID: #01 (LOCKED)' : 'ID: ??? (FLICKER)'}
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 mt-1">
                      {toggleTrackingMemory ? 'Disappeared Buffer: 0/25 Frames' : 'Confidence Drop: Tracking Lost!'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">ID Switch Rate:</span>
                  <span className={toggleTrackingMemory ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {toggleTrackingMemory ? '< 1.4% (Stable)' : '42.3% (Severe Glitch)'}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>Benchmark: Bipartite Matching</span>
              <span className="text-emerald-400">Passed Test</span>
            </div>
          </div>

          {/* Card 2: Edge vs. Cloud Latency & Bandwidth */}
          <div className="bg-[#0B0F19] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  Challenge 02 • Latency
                </span>
                <span className="text-xs font-mono text-slate-400">94.2% Egress Drop</span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-2">
                Edge vs. Cloud Video Streaming
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Continuous 4K/1080p RTSP cloud streaming saturates store uplinks and costs upwards of $1,200/mo per retail lane in AWS data transfer and GPU compute.
              </p>

              {/* Solution Description */}
              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5 mb-5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-400">Our Solution:</strong> Execute preprocessing, background subtraction, and SKU identification on local edge hardware. Send only 1.2 KB JSON payloads over AWS IoT Core MQTT.
              </div>

              {/* Interactive Bandwidth Calculator */}
              <div className="p-4 rounded-2xl bg-[#06080E] border border-white/10 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Camera Lanes:</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{bandwidthCameraCount} Active Lanes</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="24"
                  step="2"
                  value={bandwidthCameraCount}
                  onChange={(e) => setBandwidthCameraCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg mb-4 cursor-pointer"
                />

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Raw Cloud Video Stream:</span>
                    <span className="text-rose-400 font-bold">{rawVideoEgress} Mbps</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>RetaiLens Edge MQTT:</span>
                    <span className="text-emerald-400 font-bold">{jsonMetadataEgress} Mbps</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-white">
                    <span>Est. Bandwidth Savings:</span>
                    <span className="text-cyan-400 font-bold font-sans">94.2% (~${costSavings}/mo)</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>Transport: AWS IoT Core MQTT</span>
              <span className="text-cyan-400">Zero Cloud Bottleneck</span>
            </div>
          </div>

          {/* Card 3: Harsh Retail Lighting & Glare */}
          <div className="bg-[#0B0F19] rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  Challenge 03 • Preprocessing
                </span>
                <span className="text-xs font-mono text-slate-400">OpenCV CLAHE</span>
              </div>

              <h3 className="text-xl font-bold text-white font-sans mb-2">
                Harsh Lighting & Packaging Glare
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Overhead neon grocery store lights create severe specular reflections on curved plastic and glossy cartons, washing out barcodes and packaging features.
              </p>

              {/* Solution Description */}
              <div className="p-3.5 rounded-xl bg-[#111827] border border-white/5 mb-5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Our Solution:</strong> Convert frames to LAB space and apply Contrast Limited Adaptive Histogram Equalization (CLAHE) on the luminance channel, paired with Otsu adaptive thresholding.
              </div>

              {/* Interactive Demo Within Card */}
              <div className="p-4 rounded-2xl bg-[#06080E] border border-white/10 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">CLAHE Pipeline</span>
                  <button
                    onClick={() => setToggleClaheFilter(!toggleClaheFilter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      toggleClaheFilter 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {toggleClaheFilter ? 'CLAHE ON' : 'RAW GLARE'}
                  </button>
                </div>

                <div className={`h-28 rounded-xl border relative flex items-center justify-center transition-all overflow-hidden ${
                  toggleClaheFilter
                    ? 'bg-[#0B1526] border-emerald-500/40'
                    : 'bg-gradient-to-tr from-white/30 via-white/10 to-[#111827] border-amber-500/40'
                }`}>
                  <div className="text-center">
                    <span className="text-2xl">🥛</span>
                    <div className="text-xs font-bold text-white font-mono mt-1">
                      {toggleClaheFilter ? 'Organic Whole Milk' : 'WASHED OUT GLAMOUR'}
                    </div>
                    <div className={`text-[10px] font-mono font-bold mt-0.5 ${
                      toggleClaheFilter ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {toggleClaheFilter ? 'Confidence: 99.2%' : 'Confidence: 78.4%'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Contrast Equalization:</span>
                  <span className="text-emerald-400 font-bold">+20.8% Restored</span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>OpenCV: createCLAHE(clip=2.0)</span>
              <span className="text-amber-400">Glare Neutralized</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
