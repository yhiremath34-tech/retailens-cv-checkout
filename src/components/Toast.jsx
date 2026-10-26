import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0 animate-slide-up ${
              isSuccess
                ? 'bg-[#0B1713]/95 border-emerald-500/40 text-emerald-200 shadow-emerald-500/10'
                : isError
                ? 'bg-[#1F0C0F]/95 border-rose-500/40 text-rose-200 shadow-rose-500/10'
                : isWarning
                ? 'bg-[#1A1407]/95 border-amber-500/40 text-amber-200 shadow-amber-500/10'
                : 'bg-[#111827]/95 border-white/20 text-slate-200'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <XCircle className="w-4 h-4 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 text-cyan-400" />}
            </div>

            <div className="flex-1">
              {toast.title && (
                <div className="text-xs font-bold font-sans tracking-tight">
                  {toast.title}
                </div>
              )}
              <div className="text-[11px] font-mono opacity-90 leading-relaxed mt-0.5">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
