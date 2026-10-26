import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, EyeOff, Sun, Sliders, AlertTriangle, RefreshCw, Plus, Trash2, Crosshair, Terminal, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CATALOG_ITEMS } from '../../data/mockData';

export default function CameraFeed({
  counterItems,
  onAddItem,
  onRemoveItem,
  onClearItems,
  onResetDemo,
  handOcclusion,
  setHandOcclusion,
  claheEnabled,
  setClaheEnabled,
}) {
  const [fps, setFps] = useState(58.8);
  const [latency, setLatency] = useState(17.4);
  const [showLogs, setShowLogs] = useState(true);
  const [cvLogs, setCvLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedItemForInspect, setSelectedItemForInspect] = useState(null);

  // Dynamic FPS and Latency fluctuation to feel ultra-alive
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(+(58.2 + Math.random() * 1.6).toFixed(1));
      setLatency(+(16.8 + Math.random() * 1.8).toFixed(1));
      
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 22));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Generate real-time CV pipeline console logs
  useEffect(() => {
    const logs = [];
    const ts = new Date().toISOString().substring(11, 23);

    if (counterItems.length === 0) {
      logs.push(`[${ts}] [CV_CORE] Frame #4192: Background subtraction active. Counter clear.`);
    } else {
      logs.push(`[${ts}] [CV_DETECTOR] Found ${counterItems.length} candidate contour(s) with confidence > 0.85.`);
      counterItems.forEach((item, idx) => {
        const conf = claheEnabled ? item.confidence : Math.max(0.72, item.confidence - 0.16);
        logs.push(`[${ts}] [CENTROID_TRACKER] Object ID #${idx + 1} (${item.name}): Centroid (${item.position.x + Math.round(item.dimensions.w/2)}, ${item.position.y + Math.round(item.dimensions.h/2)}) | Conf: ${(conf * 100).toFixed(1)}%`);
      });
      if (handOcclusion) {
        logs.push(`[${ts}] [LOSS_PREVENTION] ⚠️ ALERT: Hand contour overlap detected with Object ID #1. Occlusion Index: 88.4%. Flagging potential shrinkage.`);
      }
      if (claheEnabled) {
        logs.push(`[${ts}] [PREPROCESS] CLAHE filter applied. ClipLimit=2.0, tileGrid=(8,8). Luminance equalization confirmed.`);
      } else {
        logs.push(`[${ts}] [WARNING] Specular glare detected on counter surface. Confidence scores degraded.`);
      }
      logs.push(`[${ts}] [IOT_TELEMETRY] Emitted MQTT payload to 'store/04/lane/01/telemetry' (QoS 1, ${120 + counterItems.length * 35} bytes)`);
    }

    setCvLogs(logs.slice(-5));
  }, [counterItems, handOcclusion, claheEnabled]);

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      
      {/* Top Camera Status & Controls Bar */}
      <div className="px-4 py-3 bg-[#111827] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              CAM_01_OVERHEAD_COUNTER
            </span>
          </div>
          <span className="text-white/20 text-xs hidden sm:inline">|</span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            1080p @ 60 FPS • RTSP / OpenCV 4.10
          </span>
        </div>

        {/* Quick Simulator Preset Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetDemo}
            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
            title="Load default 3 items"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Preset (3 Items)</span>
          </button>
          {counterItems.length > 0 && (
            <button
              onClick={onClearItems}
              className="px-2 py-1 text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors flex items-center gap-1"
              title="Clear all items"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Simulated Top-Down Counter Canvas Viewport */}
      <div className="relative flex-1 min-h-[420px] bg-[#070A11] overflow-hidden select-none">
        
        {/* Background Coordinate Grid & Target Crosshairs */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
        
        {/* Center Target Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-32 h-32 border border-emerald-500/30 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          <div className="absolute w-48 h-px bg-emerald-500/30"></div>
          <div className="absolute h-48 w-px bg-emerald-500/30"></div>
        </div>

        {/* Overhead Camera Lens Corner Reticles */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-500/60 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-500/60 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-500/60 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-500/60 pointer-events-none"></div>

        {/* Live HUD Telemetry Overlay (Top-Left) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-3 py-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] space-y-1 text-slate-300 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">FPS:</span>
              <span className="text-emerald-400 font-bold">{fps}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Latency:</span>
              <span className="text-cyan-400 font-bold">{latency}ms</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span>Mode: <strong className="text-emerald-300">CentroidTracker</strong></span>
              <span>•</span>
              <span>Objects: <strong className="text-white">{counterItems.length}</strong></span>
            </div>
            <div className="text-[9px] text-slate-500">
              {currentTime || '2026-10-26 16:35:12.482 UTC'}
            </div>
          </div>
        </div>

        {/* Glare & Illumination Simulation Overlay */}
        {!claheEnabled && (
          <div className="absolute inset-0 glare-effect pointer-events-none z-10 animate-pulse-subtle">
            <div className="absolute top-1/4 right-1/4 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] backdrop-blur-md flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Harsh Specular Glare Active (Confidence Degraded)</span>
            </div>
          </div>
        )}

        {/* CLAHE Active Status Pill */}
        {claheEnabled && (
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>CLAHE Equalized (Luminance Normalized)</span>
            </div>
          </div>
        )}

        {/* Render Items on Counter Canvas */}
        {counterItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-slate-400">
              <Crosshair className="w-8 h-8 text-emerald-400/60 animate-pulse" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1 font-sans">Checkout Counter Viewport Empty</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Add items from the library below to simulate top-down OpenCV object proposal, centroid coordinates, and instant cart synchronization.
            </p>
            <button
              onClick={onResetDemo}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Populate Counter (3 Sample Items)</span>
            </button>
          </div>
        ) : (
          counterItems.map((item, idx) => {
            const isOccluded = handOcclusion && idx === 0;
            const confidenceScore = claheEnabled ? item.confidence : Math.max(0.74, item.confidence - 0.17);
            const centroidX = item.position.x + Math.round(item.dimensions.w / 2);
            const centroidY = item.position.y + Math.round(item.dimensions.h / 2);

            return (
              <div
                key={item.id}
                onClick={() => onRemoveItem(item.id)}
                className={`absolute cursor-pointer transition-all duration-300 group ${
                  isOccluded ? 'z-30' : 'z-20'
                }`}
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  width: `${item.dimensions.w}px`,
                  height: `${item.dimensions.h}px`,
                }}
                title={`Click to remove ${item.name} from counter`}
              >
                {/* Physical Item Representation */}
                <div 
                  className={`relative w-full h-full rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-transform group-hover:scale-105 ${
                    claheEnabled ? 'clahe-active' : ''
                  }`}
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}40`,
                  }}
                >
                  {/* Item Icon Placeholder */}
                  <span className="text-2xl mb-1 filter drop-shadow">
                    {item.icon === 'coffee' && '☕'}
                    {item.icon === 'bread' && '🥖'}
                    {item.icon === 'milk' && '🥛'}
                    {item.icon === 'cereal' && '🥣'}
                    {item.icon === 'avocado' && '🥑'}
                    {item.icon === 'yogurt' && '🫐'}
                  </span>
                  <span className="text-[11px] font-semibold text-white leading-tight font-sans line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* OpenCV Active Bounding Box Overlay */}
                <div 
                  className={`absolute -inset-1 rounded-xl pointer-events-none transition-colors ${
                    isOccluded 
                      ? 'border-2 border-dashed border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                      : 'border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                >
                  {/* 4 Corner Bracket Accents (CV Style) */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></div>

                  {/* Top Bounding Box Label with ID & Confidence */}
                  <div className={`absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap shadow flex items-center gap-1 ${
                    isOccluded
                      ? 'bg-amber-500 text-black'
                      : 'bg-emerald-500 text-black'
                  }`}>
                    <span>ID: #{idx + 1}</span>
                    <span>•</span>
                    <span>{item.name.split(' ')[0]}</span>
                    <span>{(confidenceScore * 100).toFixed(1)}%</span>
                  </div>

                  {/* Centroid Tracker Dot (Pulsing Center) */}
                  <div 
                    className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      backgroundColor: isOccluded ? '#F59E0B' : '#06B6D4',
                      boxShadow: isOccluded ? '0 0 10px #F59E0B' : '0 0 10px #06B6D4'
                    }}
                  >
                    <div className="absolute -top-3.5 left-2 text-[8px] font-mono text-cyan-300 whitespace-nowrap">
                      ({centroidX}, {centroidY})
                    </div>
                  </div>

                  {/* Remove hover hint */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-rose-400 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ✕ Click to remove
                  </div>
                </div>

                {/* Hand Occlusion Silhouette Overlay if triggered on first item */}
                {isOccluded && (
                  <div className="absolute -top-8 -left-8 w-36 h-36 pointer-events-none z-40 animate-pulse">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Stylized hand outline */}
                      <div className="text-4xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] opacity-90 transform -rotate-12">
                        ✋
                      </div>
                      <div className="absolute -bottom-2 bg-amber-500 text-black text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border border-black shadow">
                        OCCLUSION 88.4%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

      </div>

      {/* Simulator Control Toggles & Interactive Filters */}
      <div className="p-3 bg-[#0E1424] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Toggle 1: Hand Occlusion / Shrinkage Simulation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHandOcclusion(!handOcclusion)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 border ${
              handOcclusion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${handOcclusion ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
            <span>Simulate Hand Occlusion / Unscanned Item</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              handOcclusion ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-300'
            }`}>
              {handOcclusion ? 'ACTIVE' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Toggle 2: Store Glare Correction (OpenCV CLAHE) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setClaheEnabled(!claheEnabled)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 border ${
              claheEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <Sliders className={`w-3.5 h-3.5 ${claheEnabled ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Store Glare Correction (CLAHE)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              claheEnabled ? 'bg-emerald-500 text-black' : 'bg-slate-700 text-slate-300'
            }`}>
              {claheEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

      </div>

      {/* Item Library Palette (Click to Add to Counter) */}
      <div className="p-3 bg-[#0B0F19] border-t border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-3 h-3 text-emerald-400" />
            Add Items to Counter
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {counterItems.length}/6 On Counter
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {CATALOG_ITEMS.map((item) => {
            const alreadyOnCounter = counterItems.some(i => i.id === item.id);
            return (
              <button
                key={item.id}
                onClick={() => onAddItem(item)}
                disabled={alreadyOnCounter}
                className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between h-20 relative ${
                  alreadyOnCounter
                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                    : 'bg-[#111827] hover:bg-[#151F32] border-white/10 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">
                    {item.icon === 'coffee' && '☕'}
                    {item.icon === 'bread' && '🥖'}
                    {item.icon === 'milk' && '🥛'}
                    {item.icon === 'cereal' && '🥣'}
                    {item.icon === 'avocado' && '🥑'}
                    {item.icon === 'yogurt' && '🫐'}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white truncate font-sans">
                    {item.name}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    {item.sku}
                  </div>
                </div>
                {alreadyOnCounter && (
                  <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Added
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-Time OpenCV Telemetry Terminal Log Drawer */}
      <div className="bg-black/90 border-t border-white/10">
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="w-full px-4 py-1.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">
              OpenCV Edge Ingestion Stream (Live Console)
            </span>
          </div>
          {showLogs ? (
            <ChevronDown className="w-3 h-3 text-slate-400" />
          ) : (
            <ChevronUp className="w-3 h-3 text-slate-400" />
          )}
        </button>

        {showLogs && (
          <div className="p-3 font-mono text-[10px] text-slate-300 space-y-1 max-h-24 overflow-y-auto border-t border-white/5 select-text bg-[#06080E]">
            {cvLogs.map((log, i) => (
              <div 
                key={i} 
                className={`truncate ${
                  log.includes('ALERT') 
                    ? 'text-amber-400 font-bold' 
                    : log.includes('CLAHE') 
                    ? 'text-emerald-300' 
                    : log.includes('IOT_TELEMETRY')
                    ? 'text-cyan-300'
                    : 'text-slate-400'
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
