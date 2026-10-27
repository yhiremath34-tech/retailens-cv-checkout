import React, { useEffect } from 'react';
import { CheckCircle2, QrCode, X, Sparkles, ShieldCheck, ArrowRight, Download, Receipt } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, items }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284C7', '#38BDF8', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, i) => acc + i.price, 0);
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;
  const txId = 'TX-AWS-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sky-200/90 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-900">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close checkout modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mb-3 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-200 font-bold mb-1">
            Autonomous Walk-Out Confirmed
          </span>
          <h3 className="text-xl font-bold font-sans text-slate-900">Payment Authenticated</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Lane #01 • {txId} • {timestamp}
          </p>
        </div>

        {/* Receipt Body (White Glass Surface) */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-sky-100 space-y-3 font-mono text-xs mb-6 shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-sky-100 text-slate-500 font-bold">
            <span>Verified SKU ({items.length})</span>
            <span>Price</span>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-slate-800 font-medium truncate pr-2">
                  {item.name}
                </span>
                <span className="text-slate-900 font-bold">
                  ₹{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-sky-100 space-y-1 text-slate-500 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="font-bold text-slate-800">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
              <span>Total Paid</span>
              <span className="text-sky-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Simulated QR Code for Shopper App */}
        <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center flex-shrink-0 border border-sky-200 shadow-sm">
            <QrCode className="w-9 h-9 text-slate-900" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold font-sans text-slate-900">Digital Pass Stored</div>
            <p className="text-[10px] text-slate-500 font-mono">
              DynamoDB Session Token verified via AWS Cognito
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200">
            &lt; 78ms SLA
          </span>
        </div>

        {/* Action Button (White Glass Primary Button) */}
        <button
          type="button"
          onClick={onClose}
          className="glass-button-primary w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm"
        >
          Close & Reset Terminal
        </button>

      </div>
    </div>
  );
}
