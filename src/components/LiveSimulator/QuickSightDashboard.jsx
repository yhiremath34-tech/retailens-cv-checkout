import React, { useState } from 'react';
import { Users, Clock, Database, ShieldAlert, Activity, BarChart3, Radio, Copy, Check, Filter, Sparkles } from 'lucide-react';
import { STORE_ZONES, SAMPLE_MQTT_EVENTS } from '../../data/mockData';

export default function QuickSightDashboard({ onToast }) {
  const [selectedZone, setSelectedZone] = useState(STORE_ZONES[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPayload, setSelectedPayload] = useState(SAMPLE_MQTT_EVENTS[0]);

  const handleCopy = (eventId, payload) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(eventId);
    if (onToast) {
      onToast('success', 'JSON Payload Copied', `AWS IoT Core event payload (${eventId}) copied to clipboard.`);
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = activeFilter === 'ALL'
    ? SAMPLE_MQTT_EVENTS
    : SAMPLE_MQTT_EVENTS.filter(evt => evt.eventType === activeFilter);

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      
      {/* Top Banner: AWS QuickSight & IoT Telemetry Integration */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-white via-sky-50 to-white border border-sky-100 shadow-md shadow-sky-500/5 w-full">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 flex-shrink-0 shadow-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans">
                Amazon QuickSight Executive BI Dashboard
              </h3>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                SPICE Engine • Sub-Minute Sync
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
              Aggregated from edge IoT metadata via Amazon Kinesis Data Streams & Amazon S3 Parquet Data Lake
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Kinesis Stream Active (Shard #01)
          </span>
        </div>
      </div>

      {/* 4 Interactive KPI Cards (White Glass Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
        
        {/* KPI 1 */}
        <div className="glass-card p-4 sm:p-5 rounded-3xl hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Active Occupancy</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">42</span>
            <span className="text-xs font-mono text-emerald-600 font-bold">+12% Peak</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Capacity Limit: 85</span>
            <span className="text-emerald-700 font-bold">49% Utilized</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full" style={{ width: '49%' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-4 sm:p-5 rounded-3xl hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Avg Checkout Dwell</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">8.4<span className="text-sky-600 text-base sm:text-lg">s</span></span>
            <span className="text-xs font-mono text-emerald-600 font-bold">-78% vs Barcode</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex justify-between">
            <span>SLA Target: &lt; 15s</span>
            <span className="text-sky-700 font-bold">Exceeding SLA</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-4 sm:p-5 rounded-3xl hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Edge Bandwidth Saved</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">94.2<span className="text-amber-600 text-base sm:text-lg">%</span></span>
            <span className="text-xs font-mono text-amber-700 font-bold">1.4 MB vs 24 GB</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Monthly Savings</span>
            <span className="text-amber-700 font-bold font-mono">~$1,280/Store</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-4 sm:p-5 rounded-3xl hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Shrinkage Prevented</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">$4,820</span>
            <span className="text-xs font-mono text-emerald-600 font-bold">38 Flags</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex justify-between">
            <span>False Positives</span>
            <span className="text-purple-700 font-bold font-mono">&lt; 0.8%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden border border-slate-200">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

      </div>

      {/* Store Heatmap & Zone Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full">
        
        {/* Left Column: Interactive Store Layout Heatmap (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-sky-100 p-5 sm:p-6 shadow-xl shadow-sky-500/5 flex flex-col justify-between w-full overflow-hidden">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  Store Footfall & Shelf Engagement Heatmap
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">Click any zone below to inspect edge computer vision dwell telemetry</p>
              </div>
              <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono">
                <span className="flex items-center gap-1 text-slate-600 font-bold">
                  <span className="w-2 h-2 rounded bg-sky-500"></span> High
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-bold">
                  <span className="w-2 h-2 rounded bg-amber-500"></span> Med
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-bold">
                  <span className="w-2 h-2 rounded bg-purple-500"></span> Lane
                </span>
              </div>
            </div>

            {/* Interactive Floor Plan Diagram */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-sky-50/60 to-slate-50 border border-sky-100 overflow-hidden p-2 sm:p-3 bg-grid-pattern">
              
              {/* Store Entrance / Exit Marks */}
              <div className="absolute top-2 left-3 sm:left-6 px-2.5 sm:px-3 py-1 rounded-lg bg-white/90 text-[8px] sm:text-[9px] font-mono font-bold text-slate-600 uppercase border border-sky-200 shadow-sm">
                Entrance Turnstile ⬇
              </div>
              <div className="absolute top-2 right-3 sm:right-6 px-2.5 sm:px-3 py-1 rounded-lg bg-white/90 text-[8px] sm:text-[9px] font-mono font-bold text-slate-600 uppercase border border-sky-200 shadow-sm">
                Fast Exit Gate ⬆
              </div>

              {/* Render Interactive Zones */}
              {STORE_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      setSelectedZone(zone);
                      if (onToast) {
                        onToast('info', `Zone Selected: ${zone.name}`, `Occupancy: ${zone.occupancy} | Heat Index: ${zone.heatIndex}% | Dwell: ${zone.avgDwell}`);
                      }
                    }}
                    className={`absolute rounded-2xl cursor-pointer p-2.5 sm:p-3 transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-sky-600 shadow-[0_4px_20px_rgba(2,132,199,0.25)] z-20 scale-[1.02] bg-white'
                        : 'border-sky-200/80 hover:border-sky-400 bg-white/80 hover:bg-white z-10 shadow-sm'
                    }`}
                    style={{
                      left: zone.coordinates.x,
                      top: zone.coordinates.y,
                      width: zone.coordinates.w,
                      height: zone.coordinates.h,
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect zone ${zone.name}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 font-sans leading-tight line-clamp-1">
                        {zone.name}
                      </span>
                      <span 
                        className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: `${zone.color}20`, color: zone.color }}
                      >
                        {zone.heatIndex}%
                      </span>
                    </div>

                    <div className="flex items-end justify-between font-mono text-[9px] sm:text-[10px] text-slate-600">
                      <div>
                        <span className="text-slate-400 hidden xs:inline">Shoppers: </span>
                        <strong className="text-slate-900">{zone.occupancy}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 hidden xs:inline">Dwell: </span>
                        <strong className="text-slate-900">{zone.avgDwell}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Selected Zone Details (White Glass) */}
          <div className="mt-4 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">Active Zone Telemetry</span>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900 font-sans">{selectedZone.name}</h5>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[10px]">Top SKU: </span>
                <span className="text-sky-700 font-bold">{selectedZone.popularItem}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">Traffic: </span>
                <span className="text-emerald-700 font-bold">{selectedZone.status}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Real-Time AWS IoT Core & Kinesis Event Stream (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-sky-100 p-5 sm:p-6 shadow-xl shadow-sky-500/5 flex flex-col h-full w-full overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
                <Radio className="w-4 h-4 text-sky-600 animate-pulse flex-shrink-0" />
                AWS IoT Core Event Stream
              </h4>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500">Topic: store/04/lane/01/telemetry</p>
            </div>

            {/* Filter buttons (White Glass Buttons) */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-sky-100 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setActiveFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-colors min-h-[30px] font-bold ${
                  activeFilter === 'ALL' ? 'bg-white text-sky-700 shadow-sm border border-sky-200' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Show all IoT events"
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('ITEM_TRACKED')}
                className={`px-2.5 py-1 rounded-lg transition-colors min-h-[30px] font-bold ${
                  activeFilter === 'ITEM_TRACKED' ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Show tracking events"
              >
                CV
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('OCCLUSION_SHRINKAGE_ALERT')}
                className={`px-2.5 py-1 rounded-lg transition-colors min-h-[30px] font-bold ${
                  activeFilter === 'OCCLUSION_SHRINKAGE_ALERT' ? 'bg-white text-amber-700 shadow-sm border border-amber-200' : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Show shrinkage alerts"
              >
                Alerts
              </button>
            </div>
          </div>

          {/* Event Stream Cards */}
          <div className="space-y-2 max-h-52 overflow-y-auto mb-3 pr-1">
            {filteredEvents.map((evt) => {
              const isSelected = selectedPayload.eventId === evt.eventId;
              return (
                <div
                  key={evt.eventId}
                  onClick={() => setSelectedPayload(evt)}
                  className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-50/80 border-sky-400 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-sky-200 hover:bg-slate-50'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select event ${evt.eventId}`}
                >
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono mb-1">
                    <span className={`font-bold px-2 py-0.5 rounded-full ${
                      evt.eventType.includes('ALERT')
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : evt.eventType.includes('FINALIZED')
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}>
                      {evt.eventType}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {evt.timestamp.split('T')[1].substring(0, 12)}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 truncate">
                    ID: {evt.eventId} • QoS 1 • {evt.payload.device_id}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live JSON Payload Inspector (White Glass Box) */}
          <div className="flex-1 rounded-2xl bg-slate-900 border border-slate-800 p-3.5 font-mono text-[10px] overflow-hidden flex flex-col justify-between w-full shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 truncate">
                <Sparkles className="w-3 h-3 text-sky-400 flex-shrink-0" />
                Raw MQTT ({selectedPayload.eventId})
              </span>
              <button
                type="button"
                onClick={() => handleCopy(selectedPayload.eventId, selectedPayload.payload)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 flex items-center gap-1 transition-colors min-h-[30px]"
                title="Copy JSON Payload"
                aria-label="Copy JSON payload"
              >
                {copiedId === selectedPayload.eventId ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-sky-300 overflow-x-auto max-h-44 leading-relaxed selection:bg-sky-500/30 text-[10px] w-full">
              {JSON.stringify(selectedPayload.payload, null, 2)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
