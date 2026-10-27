import React, { useState, useEffect } from 'react';
import { Camera, Sun, Sliders, AlertTriangle, RefreshCw, Plus, Trash2, Crosshair, Terminal, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
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
  onToast,
}) {
  const [fps, setFps] = useState(58.8);
  const [latency, setLatency] = useState(17.4);
  const [showLogs, setShowLogs] = useState(true);
  const [cvLogs, setCvLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Responsive mobile screen check for slot spacing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic FPS and Latency fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(+(58.2 + Math.random() * 1.6).toFixed(1));
      setLatency(+(16.8 + Math.random() * 1.8).toFixed(1));
      
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 22));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // 6 distinct non-overlapping slots on the counter canvas
  // Desktop has 3 columns x 2 rows with wide spacing
  // Mobile has 2 columns x 3 rows with wide spacing
  const getSlotCoordinates = (slotIdx) => {
    const safeSlot = slotIdx % 6;
    if (isMobile) {
      const mobileSlots = [
        { left: '6%', top: '56px' },    // Slot 0: Top Left
        { left: '53%', top: '56px' },   // Slot 1: Top Right
        { left: '6%', top: '180px' },   // Slot 2: Mid Left
        { left: '53%', top: '180px' },  // Slot 3: Mid Right
        { left: '6%', top: '304px' },   // Slot 4: Bottom Left
        { left: '53%', top: '304px' },  // Slot 5: Bottom Right
      ];
      return mobileSlots[safeSlot];
    }
    const desktopSlots = [
      { left: '7%', top: '64px' },     // Slot 0: Top Left
      { left: '39%', top: '64px' },    // Slot 1: Top Center
      { left: '71%', top: '64px' },    // Slot 2: Top Right
      { left: '7%', top: '220px' },    // Slot 3: Bottom Left
      { left: '39%', top: '220px' },   // Slot 4: Bottom Center
      { left: '71%', top: '220px' },   // Slot 5: Bottom Right
    ];
    return desktopSlots[safeSlot];
  };

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
        const posX = item.position?.x ?? (idx * 120 + 80);
        const posY = item.position?.y ?? (idx % 2 === 0 ? 80 : 220);
        const dimW = item.dimensions?.w ?? 90;
        const dimH = item.dimensions?.h ?? 110;
        logs.push(`[${ts}] [CENTROID_TRACKER] Object ID #${idx + 1} (${item.name}): Centroid (${posX + Math.round(dimW/2)}, ${posY + Math.round(dimH/2)}) | Conf: ${(conf * 100).toFixed(1)}%`);
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

  const handleToggleHandOcclusion = () => {
    const nextState = !handOcclusion;
    setHandOcclusion(nextState);
    if (onToast) {
      if (nextState) {
        onToast('warning', 'Shrinkage Alert Triggered', 'Unverified hand occlusion detected over counter item. Checkout is paused.');
      } else {
        onToast('success', 'Alert Resolved', 'Cart registry re-verified with OpenCV counter state.');
      }
    }
  };

  const handleToggleClahe = () => {
    const nextState = !claheEnabled;
    setClaheEnabled(nextState);
    if (onToast) {
      if (nextState) {
        onToast('success', 'OpenCV CLAHE Active', 'Adaptive luminance equalization enabled. Glare neutralized.');
      } else {
        onToast('warning', 'Raw Lighting Mode', 'Specular glare active. Detector confidence reduced.');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xl shadow-sky-500/5 w-full max-w-full">
      
      {/* Top Camera Status & Controls Bar */}
      <div className="px-3 sm:px-4 py-3 bg-[#F8FAFC] border-b border-sky-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider flex items-center gap-1.5 truncate">
              <Camera className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              CAM_01_OVERHEAD
            </span>
          </div>
          <span className="text-slate-300 text-xs hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 hidden md:inline">
            1080p @ 60 FPS • OpenCV 4.10
          </span>
        </div>

        {/* Quick Simulator Preset Actions (White Glass Buttons) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onResetDemo}
            className="glass-button px-2.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 min-h-[36px]"
            title="Load default 3 items"
            aria-label="Load preset items"
          >
            <RefreshCw className="w-3 h-3 text-sky-500" />
            <span>Preset (3)</span>
          </button>
          {counterItems.length > 0 && (
            <button
              type="button"
              onClick={onClearItems}
              className="px-2.5 py-1.5 text-[11px] sm:text-xs font-mono font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1 min-h-[36px]"
              title="Clear all items"
              aria-label="Clear all items from counter"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Simulated Top-Down Counter Canvas Viewport */}
      <div className="relative flex-1 min-h-[440px] sm:min-h-[460px] bg-[#070A11] overflow-hidden select-none w-full">
        
        {/* Background Coordinate Grid & Target Crosshairs */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
        
        {/* Center Target Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-24 sm:w-32 h-24 sm:h-32 border border-sky-400/40 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-sky-400"></div>
          </div>
          <div className="absolute w-36 sm:w-48 h-px bg-sky-400/40"></div>
          <div className="absolute h-36 sm:h-48 w-px bg-sky-400/40"></div>
        </div>

        {/* Overhead Camera Lens Corner Reticles */}
        <div className="absolute top-11 left-3 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-sky-400/70 pointer-events-none"></div>
        <div className="absolute top-11 right-3 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 border-sky-400/70 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 border-sky-400/70 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-sky-400/70 pointer-events-none"></div>

        {/* Top CCTV / OpenCV Live OSD Telemetry Banner (Guaranteed Zero Overlap) */}
        <div className="absolute top-0 left-0 right-0 z-20 px-3 sm:px-4 py-2 bg-black/85 backdrop-blur-md border-b border-sky-500/20 flex items-center justify-between pointer-events-none font-mono text-[10px] sm:text-[11px] text-slate-200 shadow-md">
          {/* Left: Real-time Camera Stream Telemetry */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">FPS:</span>
              <span className="text-emerald-400 font-bold">{fps}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Lat:</span>
              <span className="text-cyan-400 font-bold">{latency}ms</span>
            </div>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <div className="hidden xs:flex items-center gap-1 text-[10px]">
              <span className="text-slate-400">Mode:</span>
              <span className="text-sky-300 font-bold">CentroidTracker</span>
            </div>
          </div>

          {/* Right: Detected Objects Count & Filter Status */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex items-center gap-1 text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
              <span className="text-slate-400">Objs:</span>
              <strong className="text-white font-bold">{counterItems.length}</strong>
            </div>

            {claheEnabled ? (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                <span>CLAHE</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                <Sun className="w-2.5 h-2.5 text-amber-400" />
                <span>Glare</span>
              </div>
            )}
          </div>
        </div>

        {/* Glare Lighting Simulation Canvas Tint */}
        {!claheEnabled && (
          <div className="absolute inset-0 glare-effect pointer-events-none z-10 animate-pulse-subtle"></div>
        )}

        {/* Render Items on Counter Canvas */}
        {counterItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white/10 border border-sky-400/30 flex items-center justify-center mb-3 text-sky-300">
              <Crosshair className="w-6 sm:w-8 h-6 sm:h-8 text-sky-400/70 animate-pulse" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1 font-sans">Checkout Counter Viewport Empty</h4>
            <p className="text-[11px] sm:text-xs text-slate-300 max-w-sm mb-4">
              Click items below to simulate top-down OpenCV object proposal, centroid coordinates, and instant cart synchronization.
            </p>
            <button
              type="button"
              onClick={onResetDemo}
              className="glass-button px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 min-h-[40px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Populate Counter (3 Sample Items)</span>
            </button>
          </div>
        ) : (
          counterItems.map((item, idx) => {
            const isOccluded = handOcclusion && idx === 0;
            const confidenceScore = claheEnabled ? item.confidence : Math.max(0.74, item.confidence - 0.17);
            
            // Safe non-overlapping slot coordinates
            const slotPos = getSlotCoordinates(typeof item.slot === 'number' ? item.slot : idx);

            return (
              <div
                key={item.id}
                onClick={() => onRemoveItem(item.id)}
                className={`absolute cursor-pointer transition-all duration-300 group ${
                  isOccluded ? 'z-30' : 'z-20'
                }`}
                style={{
                  left: slotPos.left,
                  top: slotPos.top,
                  width: isMobile ? '135px' : '135px',
                  height: isMobile ? '102px' : '108px',
                }}
                title={`Click to remove ${item.name} from counter`}
                role="button"
                tabIndex={0}
                aria-label={`Remove ${item.name} from counter`}
              >
                {/* Physical Item Representation */}
                <div 
                  className={`relative w-full h-full rounded-2xl border flex flex-col items-center justify-center p-2 text-center transition-transform group-hover:scale-105 shadow-md ${
                    claheEnabled ? 'clahe-active' : ''
                  }`}
                  style={{
                    backgroundColor: `${item.color}25`,
                    borderColor: `${item.color}60`,
                  }}
                >
                  <span className="text-xl sm:text-2xl mb-0.5 filter drop-shadow">
                    {item.icon === 'coffee' && '☕'}
                    {item.icon === 'bread' && '🥖'}
                    {item.icon === 'milk' && '🥛'}
                    {item.icon === 'cereal' && '🥣'}
                    {item.icon === 'avocado' && '🥑'}
                    {item.icon === 'yogurt' && '🫐'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white leading-tight font-sans text-center line-clamp-1 px-1">
                    {item.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-sky-300 font-bold">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* OpenCV Active Bounding Box Overlay */}
                <div 
                  className={`absolute -inset-1 rounded-2xl pointer-events-none transition-colors ${
                    isOccluded 
                      ? 'border-2 border-dashed border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                      : 'border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  }`}
                >
                  {/* 4 Corner Bracket Accents */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></div>

                  {/* Top Bounding Box Label with ID & Confidence */}
                  <div className={`absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold whitespace-nowrap shadow flex items-center gap-1 z-30 ${
                    isOccluded
                      ? 'bg-amber-400 text-black'
                      : 'bg-emerald-400 text-black'
                  }`}>
                    <span>#{idx + 1}</span>
                    <span>•</span>
                    <span>{(confidenceScore * 100).toFixed(0)}%</span>
                  </div>

                  {/* Centroid Tracker Dot & Reticle Cross */}
                  <div 
                    className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                    style={{
                      left: '50%',
                      top: '50%',
                      backgroundColor: isOccluded ? '#F59E0B' : '#38BDF8',
                      boxShadow: isOccluded ? '0 0 8px #F59E0B' : '0 0 10px #38BDF8'
                    }}
                  ></div>

                  {/* Remove hover hint */}
                  <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 text-rose-400 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ✕ Click to remove
                  </div>
                </div>

                {/* Hand Occlusion Overlay */}
                {isOccluded && (
                  <div className="absolute inset-0 pointer-events-none z-40 animate-pulse flex flex-col items-center justify-center">
                    <div className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] opacity-90 transform -rotate-12">
                      ✋
                    </div>
                    <div className="bg-amber-400 text-black text-[8px] sm:text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded border border-black shadow mt-0.5 whitespace-nowrap">
                      OCCLUSION 88%
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

      </div>

      {/* Simulator Control Toggles (White Glass Buttons) */}
      <div className="p-3 bg-[#F8FAFC] border-t border-sky-100 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Toggle 1: Hand Occlusion / Shrinkage Simulation */}
        <button
          type="button"
          onClick={handleToggleHandOcclusion}
          className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all flex items-center justify-center sm:justify-start gap-2 border min-h-[42px] ${
            handOcclusion
              ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
              : 'glass-button'
          }`}
          aria-label="Toggle hand occlusion simulation"
        >
          <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 ${handOcclusion ? 'text-white animate-bounce' : 'text-amber-500'}`} />
          <span>Simulate Occlusion</span>
          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
            handOcclusion ? 'bg-white text-amber-700' : 'bg-sky-100 text-sky-700'
          }`}>
            {handOcclusion ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Toggle 2: Store Glare Correction (OpenCV CLAHE) */}
        <button
          type="button"
          onClick={handleToggleClahe}
          className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all flex items-center justify-center sm:justify-start gap-2 border min-h-[42px] ${
            claheEnabled
              ? 'bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/20'
              : 'glass-button'
          }`}
          aria-label="Toggle OpenCV CLAHE Glare Correction"
        >
          <Sliders className={`w-3.5 h-3.5 flex-shrink-0 ${claheEnabled ? 'text-white' : 'text-sky-600'}`} />
          <span>Glare Filter (CLAHE)</span>
          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
            claheEnabled ? 'bg-white text-sky-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {claheEnabled ? 'ON' : 'OFF'}
          </span>
        </button>

      </div>

      {/* Item Library Palette (White Glass Item Cards) */}
      <div className="p-3.5 bg-white border-t border-sky-100 w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-3 h-3 text-sky-600 flex-shrink-0" />
            Add Items to Counter
          </span>
          <span className="text-[10px] font-mono text-slate-500 font-bold">
            {counterItems.length}/6 Active
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {CATALOG_ITEMS.map((item) => {
            const alreadyOnCounter = counterItems.some(i => i.id === item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onAddItem(item)}
                disabled={alreadyOnCounter}
                className={`p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between h-20 relative min-h-[44px] ${
                  alreadyOnCounter
                    ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                    : 'bg-white hover:bg-sky-50/80 border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md'
                }`}
                aria-label={`Add ${item.name} to checkout counter`}
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
                  <span className="text-[10px] font-mono font-bold text-sky-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 truncate font-sans">
                    {item.name}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 font-medium">
                    {item.sku}
                  </div>
                </div>
                {alreadyOnCounter && (
                  <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-sky-600 flex items-center gap-1">
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
      <div className="bg-[#F8FAFC] border-t border-sky-100">
        <button
          type="button"
          onClick={() => setShowLogs(!showLogs)}
          className="w-full px-3 sm:px-4 py-2 flex items-center justify-between text-left hover:bg-sky-50/80 transition-colors min-h-[36px]"
          aria-label="Toggle terminal logs drawer"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-sky-600 flex-shrink-0" />
            <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider truncate">
              OpenCV Edge Ingestion Stream (Live Console)
            </span>
          </div>
          {showLogs ? (
            <ChevronDown className="w-3 h-3 text-slate-500 flex-shrink-0" />
          ) : (
            <ChevronUp className="w-3 h-3 text-slate-500 flex-shrink-0" />
          )}
        </button>

        {showLogs && (
          <div className="p-3 font-mono text-[9px] sm:text-[10px] text-slate-700 space-y-1 max-h-24 overflow-y-auto border-t border-sky-100 select-text bg-white">
            {cvLogs.map((log, i) => (
              <div 
                key={i} 
                className={`truncate ${
                  log.includes('ALERT') 
                    ? 'text-amber-600 font-bold' 
                    : log.includes('CLAHE') 
                    ? 'text-sky-700 font-semibold' 
                    : log.includes('IOT_TELEMETRY')
                    ? 'text-cyan-700 font-semibold' 
                    : 'text-slate-600'
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
