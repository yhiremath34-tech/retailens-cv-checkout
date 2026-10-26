import React from 'react';
import { ShoppingBag, ShieldAlert, ShieldCheck, CreditCard, AlertTriangle, ArrowRight, Check, RefreshCw } from 'lucide-react';

export default function DigitalCart({
  counterItems,
  handOcclusion,
  setHandOcclusion,
  claheEnabled,
  onCheckout,
  onToast,
}) {
  const subtotal = counterItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const handleResolveAlert = () => {
    setHandOcclusion(false);
    if (onToast) {
      onToast('success', 'Shrinkage Alert Resolved', 'Cart registry re-verified with OpenCV counter state.');
    }
  };

  const handleCheckoutClick = () => {
    if (handOcclusion) {
      if (onToast) {
        onToast('error', 'Checkout Blocked', 'Cannot complete transaction while hand occlusion shrinkage alert is active.');
      }
      return;
    }
    if (counterItems.length === 0) {
      if (onToast) {
        onToast('warning', 'Counter Empty', 'Please place at least one item on the counter to simulate checkout.');
      }
      return;
    }
    onCheckout();
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] rounded-2xl border border-white/10 overflow-hidden shadow-2xl w-full max-w-full">
      
      {/* Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#111827] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white font-sans flex items-center gap-2">
              Instant Digital Cart
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Sync
              </span>
            </h3>
            <p className="text-[9px] sm:text-[10px] font-mono text-slate-400">Amazon DynamoDB Atomic State</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">Items: </span>
          <span className="text-xs sm:text-sm font-bold font-mono text-white">{counterItems.length}</span>
        </div>
      </div>

      {/* Shrinkage & Loss Prevention Alert Banner */}
      {handOcclusion ? (
        <div className="p-3 sm:p-4 bg-amber-950/40 border-b border-amber-500/40 text-amber-200">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0 animate-bounce">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider text-amber-300">
                  ⚠️ Shrinkage Alert: Unverified Interaction
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold">
                  CHECKOUT PAUSED
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200/90 mt-1 leading-relaxed">
                Hand-to-item occlusion detected over <strong>Object ID #1</strong> without verified barometric/geometric lift profile. Potential sweethearting or unscanned item concealment.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResolveAlert}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow flex items-center gap-1.5 min-h-[36px]"
                  aria-label="Resolve shrinkage alert and verify cart"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resolve & Clear Alert</span>
                </button>
                <span className="text-[10px] font-mono text-amber-400/80">
                  Rule #CV-LP-88
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 sm:px-4 py-2 bg-emerald-950/20 border-b border-emerald-500/20 flex items-center justify-between text-[11px] sm:text-xs font-mono text-emerald-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">Loss Prevention: Counter Verified</span>
          </div>
          <span className="text-[10px] text-emerald-500/80 whitespace-nowrap">0 Discrepancies</span>
        </div>
      )}

      {/* Cart Items List */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 min-h-[180px] sm:min-h-[220px]">
        {counterItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <ShoppingBag className="w-8 sm:w-10 h-8 sm:h-10 mb-2 opacity-40 text-slate-400" />
            <p className="text-xs font-mono">No items detected on counter.</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
              Place items on the simulated OpenCV viewport to auto-populate the receipt.
            </p>
          </div>
        ) : (
          counterItems.map((item, idx) => {
            const conf = claheEnabled ? item.confidence : Math.max(0.74, item.confidence - 0.17);
            const isAlertItem = handOcclusion && idx === 0;

            return (
              <div
                key={item.id}
                className={`p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isAlertItem
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-[#111827]/70 border-white/5 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      {item.icon === 'coffee' && '☕'}
                      {item.icon === 'bread' && '🥖'}
                      {item.icon === 'milk' && '🥛'}
                      {item.icon === 'cereal' && '🥣'}
                      {item.icon === 'avocado' && '🥑'}
                      {item.icon === 'yogurt' && '🫐'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white font-sans truncate">
                          {item.name}
                        </span>
                        <span className="text-[8px] font-mono px-1 rounded bg-white/5 text-slate-400 flex-shrink-0">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[9px] sm:text-[10px] font-mono text-slate-400 truncate">
                        <span>{item.sku}</span>
                        <span>•</span>
                        <span className={conf > 0.95 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                          {(conf * 100).toFixed(1)}% Conf
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold font-mono text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="text-[8px] sm:text-[9px] font-mono text-emerald-400 flex items-center justify-end gap-0.5">
                      <Check className="w-2.5 h-2.5" /> CV Synced
                    </div>
                  </div>
                </div>

                {isAlertItem && (
                  <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-amber-300">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Occlusion Flagged
                    </span>
                    <span>Verify with Clerk</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bill Breakdown & Checkout Action */}
      <div className="p-3.5 sm:p-4 bg-[#111827] border-t border-white/10 space-y-3">
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-slate-400 text-[11px] sm:text-xs">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[11px] sm:text-xs">
            <span>Estimated Sales Tax (8.25%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-sm sm:text-base font-bold text-white">
            <span className="font-sans">Total Amount</span>
            <span className="text-emerald-400">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Autonomous Checkout Button */}
        <button
          type="button"
          onClick={handleCheckoutClick}
          className={`w-full py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-200 min-h-[48px] ${
            counterItems.length === 0
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
              : handOcclusion
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0'
          }`}
          aria-label="Simulate autonomous walk-out checkout"
        >
          {handOcclusion ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Checkout Paused: Resolve Alert</span>
            </>
          ) : counterItems.length === 0 ? (
            <span>Counter Empty (Add Items)</span>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-black" />
              <span>Simulate Autonomous Checkout</span>
              <ArrowRight className="w-4 h-4 text-black/70" />
            </>
          )}
        </button>

        {/* Real-Time Cloud Telemetry Footer */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            AWS DynamoDB &lt; 4.8ms
          </span>
          <span>Event: MQTT QoS 1</span>
        </div>
      </div>

    </div>
  );
}
