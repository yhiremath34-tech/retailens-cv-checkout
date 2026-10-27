import React from 'react';
import { Camera, AlertTriangle, ArrowLeft, Home, RefreshCw, Crosshair, Terminal } from 'lucide-react';

export default function NotFoundPage({ onReturnHome }) {
  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-900 flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden bg-grid-pattern">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-xl w-full bg-white/95 border border-rose-200 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center backdrop-blur-xl">
        
        {/* CV Camera Reticle Header */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-rose-400/50 rounded-2xl animate-pulse"></div>
          {/* 4 Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-rose-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-rose-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-rose-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-rose-500"></div>
          
          <div className="text-3xl font-mono font-extrabold text-rose-500">
            404
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono mb-4">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          <span>Contour Disconnected • Zero Centroids Identified</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight mb-3">
          SKU Not Found in Vision Catalog
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6 font-sans">
          The requested aisle route, planogram coordinates, or camera feed do not correspond to any registered edge sensor or database table.
        </p>

        {/* Telemetry Debug Box */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-left text-[11px] text-slate-300 mb-8 space-y-1 shadow-inner">
          <div className="text-rose-400 font-bold">[OPENCV_ERROR] ErrorCode: ERR_BOUNDING_BOX_UNDEFINED</div>
          <div>Location: store://austin-04/unknown_aisle_route</div>
          <div>Detector Confidence: 0.00% • Optical Flow: Dormant</div>
          <div>AWS DynamoDB Session: NullPointerException on partitionKey</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onReturnHome}
            className="glass-button-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md min-h-[44px]"
          >
            <Home className="w-4 h-4 text-[#0284C7]" />
            <span>Return to Checkout Counter</span>
          </button>

          <a
            href="tel:+18005557382"
            className="glass-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all min-h-[44px]"
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
