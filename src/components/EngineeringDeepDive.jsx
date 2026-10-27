import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { ENGINEERING_CHALLENGES } from '../data/mockData';

export default function EngineeringDeepDive({ onToast }) {
  const [toggleTrackingMemory, setToggleTrackingMemory] = useState(true);
  const [toggleClaheFilter, setToggleClaheFilter] = useState(true);
  const [bandwidthCameraCount, setBandwidthCameraCount] = useState(8);

  const rawVideoEgress = (bandwidthCameraCount * 3.8).toFixed(1);
  const jsonMetadataEgress = (bandwidthCameraCount * 0.012).toFixed(2);
  const costSavings = Math.round(bandwidthCameraCount * 75);

  const handleToggleMemory = () => {
    const next = !toggleTrackingMemory;
    setToggleTrackingMemory(next);
    if (onToast) {
      if (next) {
        onToast('success', 'Centroid Memory Enabled', 'Preserves tracking ID through 25 dropped frames during hand occlusion.');
      } else {
        onToast('warning', 'Centroid Memory Disabled', 'Tracking lost on brief occlusion. ID switches jump to 42.3%.');
      }
    }
  };

  const handleToggleClahe = () => {
    const next = !toggleClaheFilter;
    setToggleClaheFilter(next);
    if (onToast) {
      if (next) {
        onToast('success', 'CLAHE Equalization On', 'Luminance normalized. Classification confidence restored to 99.2%.');
      } else {
        onToast('warning', 'Raw Neon Glare Mode', 'Specular glare washes out packaging details. Confidence drops to 78.4%.');
      }
    }
  };

  return (
    <section id="engineering" className="py-20 sm:py-24 relative bg-[#F0F7FF] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-amber-800 text-xs font-mono mb-3 shadow-sm font-bold">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            <span>Engineering Deep-Dive</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Complex Retail Challenges. Elegant CV Solutions.
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-base leading-relaxed">
            Real-world retail environments present severe edge computer vision hurdles — from hand occlusions and specular glare to massive cloud video upload bottlenecks. Here is how we engineered past them.
          </p>
        </div>

        {/* 3 Challenge Interactive Cards (White Glass Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          
          {/* Card 1: Occlusion & Fast Hand Motion */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-7 flex flex-col justify-between hover:border-sky-300 transition-all shadow-xl shadow-sky-500/5 w-full">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Challenge 01 • Tracking
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-slate-500 font-semibold">Centroid Memory</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-2">
                Occlusion & Fast Hand Motion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                When shoppers bag groceries, hands momentarily obscure packaging contours. Standard detectors lose the bounding box, causing cart-removal and re-addition flickering.
              </p>

              {/* Solution Description */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-sky-100 mb-4 sm:mb-5 text-xs text-slate-700 leading-relaxed">
                <strong className="text-sky-700">Our Solution:</strong> Persistent Euclidean centroid tracking with an exponential disappearance buffer (<code className="text-sky-800 font-bold">maxDisappeared=25 frames</code>). Preserves object identity even through severe hand passes.
              </div>

              {/* Interactive Demo Within Card (White Glass) */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/60 border border-sky-100 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase font-bold">Centroid Memory Buffer</span>
                  <button
                    type="button"
                    onClick={handleToggleMemory}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all min-h-[32px] ${
                      toggleTrackingMemory 
                        ? 'bg-sky-500 text-white shadow-sm' 
                        : 'glass-button'
                    }`}
                    aria-label="Toggle centroid memory buffer"
                  >
                    {toggleTrackingMemory ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="h-24 sm:h-28 rounded-2xl bg-white border border-sky-200/80 relative flex items-center justify-center overflow-hidden shadow-inner">
                  <div className={`relative px-4 py-2 rounded-xl transition-all ${
                    toggleTrackingMemory 
                      ? 'border-2 border-emerald-500 shadow-md shadow-emerald-500/20 bg-emerald-50/80' 
                      : 'border-2 border-dashed border-rose-500 animate-pulse bg-rose-50/80'
                  }`}>
                    <div className="text-xs font-bold font-mono text-slate-900 flex items-center gap-1.5">
                      <span>Cold Brew Coffee</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white text-slate-700 font-bold shadow-sm">
                        {toggleTrackingMemory ? 'ID: #01 (LOCKED)' : 'ID: ??? (LOST)'}
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1">
                      {toggleTrackingMemory ? 'Disappeared Buffer: 0/25 Frames' : 'Confidence Drop: Tracking Lost!'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[10px] sm:text-[11px] font-mono">
                  <span className="text-slate-500">ID Switch Rate:</span>
                  <span className={toggleTrackingMemory ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {toggleTrackingMemory ? '< 1.4% (Stable)' : '42.3% (Severe Glitch)'}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-sky-100 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>Bipartite Matching Heuristic</span>
              <span className="text-emerald-600 font-bold">Verified Stable</span>
            </div>
          </div>

          {/* Card 2: Edge vs. Cloud Latency & Bandwidth */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-7 flex flex-col justify-between hover:border-sky-300 transition-all shadow-xl shadow-sky-500/5 w-full">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                  Challenge 02 • Latency
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-slate-500 font-semibold">94.2% Egress Drop</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-2">
                Edge vs. Cloud Video Streaming
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Continuous 4K/1080p RTSP cloud streaming saturates store uplinks and costs upwards of $1,200/mo per retail lane in AWS data transfer and GPU compute.
              </p>

              {/* Solution Description */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-sky-100 mb-4 sm:mb-5 text-xs text-slate-700 leading-relaxed">
                <strong className="text-sky-700">Our Solution:</strong> Execute preprocessing, background subtraction, and SKU identification on local edge hardware. Send only 1.2 KB JSON payloads over AWS IoT Core MQTT.
              </div>

              {/* Interactive Bandwidth Calculator */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/60 border border-sky-100 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase font-bold">Camera Lanes:</span>
                  <span className="text-xs font-mono font-bold text-sky-700">{bandwidthCameraCount} Active Lanes</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="24"
                  step="2"
                  value={bandwidthCameraCount}
                  onChange={(e) => setBandwidthCameraCount(Number(e.target.value))}
                  className="w-full accent-sky-500 bg-sky-200 h-2 rounded-lg mb-4 cursor-pointer"
                  aria-label="Adjust camera count to calculate bandwidth"
                />

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-600 text-[11px] sm:text-xs">
                    <span>Raw Cloud Video Stream:</span>
                    <span className="text-rose-600 font-bold">{rawVideoEgress} Mbps</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-[11px] sm:text-xs">
                    <span>RetaiLens Edge MQTT:</span>
                    <span className="text-emerald-600 font-bold">{jsonMetadataEgress} Mbps</span>
                  </div>
                  <div className="pt-2 border-t border-sky-200 flex justify-between items-center text-slate-900 text-[11px] sm:text-xs">
                    <span>Est. Bandwidth Savings:</span>
                    <span className="text-sky-700 font-bold font-sans">94.2% (~${costSavings}/mo)</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-sky-100 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>AWS IoT Core MQTT QoS 1</span>
              <span className="text-sky-600 font-bold">Zero Cloud Bottleneck</span>
            </div>
          </div>

          {/* Card 3: Harsh Retail Lighting & Glare */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-7 flex flex-col justify-between hover:border-sky-300 transition-all shadow-xl shadow-sky-500/5 w-full">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                  Challenge 03 • Preprocessing
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-slate-500 font-semibold">OpenCV CLAHE</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans mb-2">
                Harsh Lighting & Packaging Glare
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Overhead neon grocery store lights create severe specular reflections on curved plastic and glossy cartons, washing out barcodes and packaging features.
              </p>

              {/* Solution Description */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F8FAFC] border border-sky-100 mb-4 sm:mb-5 text-xs text-slate-700 leading-relaxed">
                <strong className="text-amber-700">Our Solution:</strong> Convert frames to LAB space and apply Contrast Limited Adaptive Histogram Equalization (CLAHE) on the luminance channel, paired with Otsu adaptive thresholding.
              </div>

              {/* Interactive Demo Within Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/60 border border-sky-100 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase font-bold">CLAHE Pipeline</span>
                  <button
                    type="button"
                    onClick={handleToggleClahe}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all min-h-[32px] ${
                      toggleClaheFilter 
                        ? 'bg-amber-500 text-white shadow-sm' 
                        : 'glass-button'
                    }`}
                    aria-label="Toggle CLAHE filter in engineering card"
                  >
                    {toggleClaheFilter ? 'CLAHE ON' : 'RAW GLARE'}
                  </button>
                </div>

                <div className={`h-24 sm:h-28 rounded-2xl border relative flex items-center justify-center transition-all overflow-hidden shadow-inner ${
                  toggleClaheFilter
                    ? 'bg-white border-sky-300'
                    : 'bg-gradient-to-tr from-amber-100 via-white to-amber-50 border-amber-300'
                }`}>
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl">🥛</span>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-900 font-mono mt-1">
                      {toggleClaheFilter ? 'Organic Whole Milk' : 'SPECULAR REFLECTION'}
                    </div>
                    <div className={`text-[9px] sm:text-[10px] font-mono font-bold mt-0.5 ${
                      toggleClaheFilter ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {toggleClaheFilter ? 'Confidence: 99.2%' : 'Confidence: 78.4%'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[10px] sm:text-[11px] font-mono">
                  <span className="text-slate-500">Contrast Restored:</span>
                  <span className="text-emerald-700 font-bold">+20.8% Restored</span>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-sky-100 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>OpenCV: createCLAHE(clip=2.0)</span>
              <span className="text-amber-600 font-bold">Equalization Locked</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
