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
    <div className="flex flex-col h-full bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-xl shadow-sky-500/5 w-full max-w-full">
      
      {/* Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#F8FAFC] border-b border-sky-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-sans flex items-center gap-2">
              Instant Digital Cart
              <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                Live Sync
              </span>
            </h3>
            <p className="text-[9px] sm:text-[10px] font-mono text-slate-500">Amazon DynamoDB Atomic State</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">Items: </span>
          <span className="text-xs sm:text-sm font-bold font-mono text-slate-900">{counterItems.length}</span>
        </div>
      </div>

      {/* Shrinkage & Loss Prevention Alert Banner */}
      {handOcclusion ? (
        <div className="p-3 sm:p-4 bg-amber-50 border-b border-amber-200 text-amber-900">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="p-1.5 rounded-xl bg-amber-100 text-amber-600 flex-shrink-0 animate-bounce">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider text-amber-800">
                  ⚠️ Shrinkage Alert: Unverified Interaction
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                  CHECKOUT PAUSED
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-900/90 mt-1 leading-relaxed">
                Hand-to-item occlusion detected over <strong>Object ID #1</strong> without verified barometric/geometric lift profile. Potential sweethearting or unscanned item concealment.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResolveAlert}
                  className="glass-button px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-amber-800 bg-white hover:bg-amber-50 border-amber-300 shadow flex items-center gap-1.5 min-h-[36px]"
                  aria-label="Resolve shrinkage alert and verify cart"
                >
                  <RefreshCw className="w-3 h-3 text-amber-600" />
                  <span>Resolve & Clear Alert</span>
                </button>
                <span className="text-[10px] font-mono text-amber-700">
                  Rule #CV-LP-88
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 sm:px-4 py-2 bg-emerald-50/80 border-b border-emerald-100 flex items-center justify-between text-[11px] sm:text-xs font-mono text-emerald-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate font-semibold">Loss Prevention: Counter Verified</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold whitespace-nowrap">0 Discrepancies</span>
        </div>
      )}

      {/* Cart Items List */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 min-h-[180px] sm:min-h-[220px] bg-slate-50/50">
        {counterItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <ShoppingBag className="w-8 sm:w-10 h-8 sm:h-10 mb-2 opacity-30 text-sky-600" />
            <p className="text-xs font-mono font-bold text-slate-500">No items detected on counter.</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
              Click items in the library palette to place them on the counter.
            </p>
          </div>
        ) : (
          counterItems.map((item, idx) => {
            const conf = claheEnabled ? item.confidence : Math.max(0.74, item.confidence - 0.17);
            const isAlertItem = handOcclusion && idx === 0;

            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isAlertItem
                    ? 'bg-amber-50 border-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-white border-sky-100 hover:border-sky-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-sky-100"
                      style={{ backgroundColor: `${item.color}15` }}
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
                        <span className="text-xs font-bold text-slate-900 font-sans truncate">
                          {item.name}
                        </span>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 flex-shrink-0">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[9px] sm:text-[10px] font-mono text-slate-500 truncate">
                        <span>{item.sku}</span>
                        <span>•</span>
                        <span className={conf > 0.95 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                          {(conf * 100).toFixed(1)}% Conf
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold font-mono text-sky-700">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="text-[8px] sm:text-[9px] font-mono text-emerald-600 font-bold flex items-center justify-end gap-0.5">
                      <Check className="w-2.5 h-2.5" /> CV Synced
                    </div>
                  </div>
                </div>

                {isAlertItem && (
                  <div className="mt-2 pt-2 border-t border-amber-200 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-amber-800 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
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
      <div className="p-4 bg-white border-t border-sky-100 space-y-3">
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-slate-600 text-[11px] sm:text-xs">
            <span>Subtotal</span>
            <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 text-[11px] sm:text-xs">
            <span>Estimated Sales Tax (8.25%)</span>
            <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-sky-100 flex justify-between text-sm sm:text-base font-bold text-slate-900">
            <span className="font-sans">Total Amount</span>
            <span className="text-sky-600 text-lg sm:text-xl font-mono">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Autonomous Checkout Button (White Glass Button with Light Blue Color) */}
        <button
          type="button"
          onClick={handleCheckoutClick}
          className={`glass-button-primary w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 min-h-[48px] ${
            counterItems.length === 0
              ? 'opacity-60 cursor-not-allowed'
              : handOcclusion
              ? 'border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100'
              : ''
          }`}
          aria-label="Simulate autonomous walk-out checkout"
        >
          {handOcclusion ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Checkout Paused: Resolve Alert</span>
            </>
          ) : counterItems.length === 0 ? (
            <span>Counter Empty (Add Items)</span>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-sky-600" />
              <span>Simulate Autonomous Checkout</span>
              <ArrowRight className="w-4 h-4 text-sky-500" />
            </>
          )}
        </button>

        {/* Real-Time Cloud Telemetry Footer */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 pt-1">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            AWS DynamoDB &lt; 4.8ms
          </span>
          <span>Event: MQTT QoS 1</span>
        </div>
      </div>

    </div>
  );
}
