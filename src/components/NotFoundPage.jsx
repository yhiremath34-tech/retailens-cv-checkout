import React from 'react';
import { Camera, AlertTriangle, ArrowLeft, Home, RefreshCw, Crosshair, Terminal } from 'lucide-react';

export default function NotFoundPage({ onReturnHome }) {
  return (
    <div className="min-h-screen bg-[#090D16] text-white flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden bg-grid-pattern">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl w-full bg-[#0D131F] border border-rose-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center">
        
        {/* CV Camera Reticle Header */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-rose-500/50 rounded-2xl animate-pulse"></div>
          {/* 4 Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-rose-400"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-rose-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-rose-400"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-rose-400"></div>
          
          <div className="text-3xl font-mono font-extrabold text-rose-400">
            404
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Contour Disconnected • Zero Centroids Identified</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight mb-3">
          SKU Not Found in Vision Catalog
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6 font-sans">
          The requested aisle route, planogram coordinates, or camera feed do not correspond to any registered edge sensor or database table.
        </p>

        {/* Telemetry Debug Box */}
        <div className="bg-[#06080E] border border-white/10 rounded-xl p-4 font-mono text-left text-[11px] text-slate-400 mb-8 space-y-1">
          <div className="text-rose-400 font-bold">[OPENCV_ERROR] ErrorCode: ERR_BOUNDING_BOX_UNDEFINED</div>
          <div>Location: store://austin-04/unknown_aisle_route</div>
          <div>Detector Confidence: 0.00% • Optical Flow: Dormant</div>
          <div>AWS DynamoDB Session: NullPointerException on partitionKey</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onReturnHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Return to Checkout Counter</span>
          </button>

          <a
            href="tel:+18005557382"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span>Call Edge Support</span>
          </a>
        </div>

      </div>

      {/* Footer hint */}
      <p className="text-xs font-mono text-slate-500 mt-6 relative z-10">
        RetaiLens Autonomous Retail Vision System • Code #404-CV
      </p>
    </div>
  );
}
