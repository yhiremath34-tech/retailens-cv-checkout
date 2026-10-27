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
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-xl backdrop-blur-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0 animate-slide-up bg-white/95 ${
              isSuccess
                ? 'border-emerald-500/50 text-emerald-950 shadow-emerald-500/10'
                : isError
                ? 'border-rose-500/50 text-rose-950 shadow-rose-500/10'
                : isWarning
                ? 'border-amber-500/50 text-amber-950 shadow-amber-500/10'
                : 'border-sky-300 text-slate-900 shadow-sky-500/10'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {isError && <XCircle className="w-4 h-4 text-rose-600" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 text-sky-600" />}
            </div>

            <div className="flex-1">
              {toast.title && (
                <div className="text-xs font-bold font-sans tracking-tight text-slate-900">
                  {toast.title}
                </div>
              )}
              <div className="text-[11px] font-mono leading-relaxed mt-0.5 text-slate-700">
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
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
