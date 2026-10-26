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
          colors: ['#10B981', '#06B6D4', '#F59E0B']
        });
      } catch (e) {
        // Fallback gracefully if confetti fails
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, i) => acc + i.price, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;
  const txId = 'TX-AWS-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0D131F] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mb-1">
            Autonomous Walk-Out Confirmed
          </span>
          <h3 className="text-xl font-bold font-sans">Payment Authenticated</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Lane #01 • {txId} • {timestamp}
          </p>
        </div>

        {/* Receipt Body */}
        <div className="bg-[#111827] rounded-2xl p-4 border border-white/5 space-y-3 font-mono text-xs mb-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
            <span>Verified SKU ({items.length})</span>
            <span>Price</span>
          </div>

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-slate-200 truncate pr-2">
                  {item.name}
                </span>
                <span className="text-white font-bold">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1 text-slate-400 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-1">
              <span>Total Paid</span>
              <span className="text-emerald-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Simulated QR Code for Shopper App */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center flex-shrink-0">
            <QrCode className="w-10 h-10 text-black" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold font-sans text-white">Digital Pass Stored</div>
            <p className="text-[10px] text-slate-400 font-mono">
              DynamoDB Session Token verified via AWS Cognito
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">
            &lt; 78ms SLA
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black transition-all shadow-lg shadow-emerald-500/20"
        >
          Close & Reset Terminal
        </button>

      </div>
    </div>
  );
}
