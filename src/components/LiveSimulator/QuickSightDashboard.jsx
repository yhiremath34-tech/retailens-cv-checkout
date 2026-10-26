import React, { useState } from 'react';
import { Users, Clock, Database, ShieldAlert, Activity, BarChart3, Radio, Copy, Check, Filter, Layers, ExternalLink, Sparkles } from 'lucide-react';
import { STORE_ZONES, SAMPLE_MQTT_EVENTS } from '../../data/mockData';

export default function QuickSightDashboard() {
  const [selectedZone, setSelectedZone] = useState(STORE_ZONES[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPayload, setSelectedPayload] = useState(SAMPLE_MQTT_EVENTS[0]);

  const handleCopy = (eventId, payload) => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedId(eventId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvents = activeFilter === 'ALL'
    ? SAMPLE_MQTT_EVENTS
    : SAMPLE_MQTT_EVENTS.filter(evt => evt.eventType === activeFilter);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: AWS QuickSight & IoT Telemetry Integration */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#111827] via-[#131B2E] to-[#111827] border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-sans">
                Amazon QuickSight Executive BI Dashboard
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                SPICE Engine • Sub-Minute Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Aggregated from edge IoT metadata via Amazon Kinesis Data Streams & Amazon S3 Parquet Data Lake
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Kinesis Stream Active (Shard #01)
          </span>
        </div>
      </div>

      {/* 4 Interactive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 hover:border-emerald-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Store Occupancy</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">42</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">+12% Peak Hr</span>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Capacity Limit: 85</span>
            <span className="text-emerald-400 font-semibold">49% Utilized</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '49%' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Avg Checkout Dwell</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">8.4<span className="text-cyan-400 text-lg">s</span></span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">-78% vs Barcode</span>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>SLA Target: &lt; 15s</span>
            <span className="text-cyan-400 font-semibold">Exceeding SLA</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 hover:border-amber-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Edge Bandwidth Saved</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">94.2<span className="text-amber-400 text-lg">%</span></span>
            <span className="text-xs font-mono text-amber-400 font-semibold">1.4 MB vs 24 GB</span>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>Monthly Savings</span>
            <span className="text-amber-300 font-semibold font-mono">~$1,280/Store</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 hover:border-purple-500/30 transition-all shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Shrinkage Prevented</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">$4,820</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">38 Flags</span>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-400 flex justify-between">
            <span>False Positive Rate</span>
            <span className="text-purple-300 font-semibold font-mono">&lt; 0.8%</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

      </div>

      {/* Store Heatmap & Zone Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Store Layout Heatmap (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0B0F19] rounded-2xl border border-white/10 p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Store Footfall & Shelf Engagement Heatmap
                </h4>
                <p className="text-xs text-slate-400">Click any zone below to inspect edge computer vision dwell telemetry</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500/40"></span> High
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500/40"></span> Med
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded bg-purple-500/40"></span> Lane
                </span>
              </div>
            </div>

            {/* Interactive Floor Plan Diagram */}
            <div className="relative w-full h-80 rounded-xl bg-[#070A12] border border-white/10 overflow-hidden p-3 bg-grid-pattern">
              
              {/* Store Entrance / Exit Marks */}
              <div className="absolute top-2 left-6 px-3 py-1 rounded bg-white/10 text-[9px] font-mono text-slate-400 uppercase border border-white/10">
                Entrance Turnstile ⬇
              </div>
              <div className="absolute top-2 right-6 px-3 py-1 rounded bg-white/10 text-[9px] font-mono text-slate-400 uppercase border border-white/10">
                Fast Exit Gate ⬆
              </div>

              {/* Render Interactive Zones */}
              {STORE_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`absolute rounded-xl cursor-pointer p-3 transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] z-20 scale-[1.02]'
                        : 'border-white/15 hover:border-white/40 hover:scale-[1.01] z-10'
                    }`}
                    style={{
                      left: zone.coordinates.x,
                      top: zone.coordinates.y,
                      width: zone.coordinates.w,
                      height: zone.coordinates.h,
                      backgroundColor: `${zone.color}25`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-bold text-white font-sans leading-tight">
                        {zone.name}
                      </span>
                      <span 
                        className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: zone.color, color: '#000' }}
                      >
                        {zone.heatIndex}% Heat
                      </span>
                    </div>

                    <div className="flex items-end justify-between font-mono text-[10px] text-slate-300">
                      <div>
                        <span className="text-slate-400">Shoppers: </span>
                        <strong className="text-white">{zone.occupancy}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Dwell: </span>
                        <strong className="text-white">{zone.avgDwell}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Selected Zone Deep-Dive Details */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#111827] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Active Zone Telemetry</span>
              <h5 className="text-sm font-bold text-white font-sans">{selectedZone.name}</h5>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px]">Top Picked SKU: </span>
                <span className="text-emerald-400 font-bold">{selectedZone.popularItem}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Traffic Status: </span>
                <span className="text-cyan-400 font-bold">{selectedZone.status}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Real-Time AWS IoT Core & Kinesis Event Stream (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0B0F19] rounded-2xl border border-white/10 p-5 shadow-2xl flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                AWS IoT Core Event Stream
              </h4>
              <p className="text-[11px] font-mono text-slate-400">Topic: store/04/lane/01/telemetry</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-lg border border-white/5 text-[10px] font-mono">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeFilter === 'ALL' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('ITEM_TRACKED')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeFilter === 'ITEM_TRACKED' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                CV
              </button>
              <button
                onClick={() => setActiveFilter('OCCLUSION_SHRINKAGE_ALERT')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeFilter === 'OCCLUSION_SHRINKAGE_ALERT' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Alerts
              </button>
            </div>
          </div>

          {/* Event Stream Cards */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto mb-4">
            {filteredEvents.map((evt) => {
              const isSelected = selectedPayload.eventId === evt.eventId;
              return (
                <div
                  key={evt.eventId}
                  onClick={() => setSelectedPayload(evt)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#151F32] border-cyan-500/50 shadow-lg'
                      : 'bg-[#111827]/70 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={`font-bold px-1.5 py-0.5 rounded ${
                      evt.eventType.includes('ALERT')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : evt.eventType.includes('FINALIZED')
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {evt.eventType}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {evt.timestamp.split('T')[1].substring(0, 12)}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    ID: {evt.eventId} • QoS 1 • Device: {evt.payload.device_id}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live JSON Payload Inspector */}
          <div className="flex-1 rounded-xl bg-[#06080E] border border-white/10 p-3 font-mono text-[10px] overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Raw MQTT Payload ({selectedPayload.eventId})
              </span>
              <button
                onClick={() => handleCopy(selectedPayload.eventId, selectedPayload.payload)}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1 transition-colors"
                title="Copy JSON Payload"
              >
                {copiedId === selectedPayload.eventId ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-slate-300 overflow-y-auto max-h-48 leading-relaxed selection:bg-cyan-500/30">
              {JSON.stringify(selectedPayload.payload, null, 2)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
}
