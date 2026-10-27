import React, { useState } from 'react';
import { Camera, BarChart3, Sparkles } from 'lucide-react';
import CameraFeed from './CameraFeed';
import DigitalCart from './DigitalCart';
import QuickSightDashboard from './QuickSightDashboard';
import CheckoutModal from './CheckoutModal';
import { CATALOG_ITEMS } from '../../data/mockData';

export default function LiveSimulator({ onToast }) {
  const [activeTab, setActiveTab] = useState('EDGE_CHECKOUT'); // 'EDGE_CHECKOUT' or 'QUICKSIGHT_BI'
  
  // Default 3 items on the counter with non-overlapping slot assignments
  const [counterItems, setCounterItems] = useState([
    {
      ...CATALOG_ITEMS[0],
      slot: 0,
      position: { x: 50, y: 70 },
    },
    {
      ...CATALOG_ITEMS[1],
      slot: 1,
      position: { x: 260, y: 70 },
    },
    {
      ...CATALOG_ITEMS[2],
      slot: 2,
      position: { x: 50, y: 220 },
    }
  ]);

  const [handOcclusion, setHandOcclusion] = useState(false);
  const [claheEnabled, setClaheEnabled] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Add an item to the counter with guaranteed unique slot
  const handleAddItem = (item) => {
    if (counterItems.some(i => i.id === item.id)) {
      if (onToast) {
        onToast('warning', 'Item Already on Counter', `${item.name} is already under active OpenCV tracking.`);
      }
      return;
    }
    
    if (counterItems.length >= 6) {
      if (onToast) {
        onToast('error', 'Counter Capacity Full', 'Maximum 6 concurrent items allowed on standard checkout lane counter.');
      }
      return;
    }
    
    // Find first available slot (0-5)
    const usedSlots = new Set(counterItems.map(i => i.slot));
    let nextSlot = 0;
    for (let s = 0; s < 6; s++) {
      if (!usedSlots.has(s)) {
        nextSlot = s;
        break;
      }
    }
    
    const slotPositions = [
      { x: 50, y: 70 },
      { x: 260, y: 70 },
      { x: 470, y: 70 },
      { x: 50, y: 220 },
      { x: 260, y: 220 },
      { x: 470, y: 220 },
    ];
    
    setCounterItems([...counterItems, { 
      ...item, 
      slot: nextSlot,
      position: slotPositions[nextSlot] || { x: 50, y: 70 }
    }]);

    if (onToast) {
      onToast('success', 'Item Placed on Counter', `${item.name} detected with ${(item.confidence * 100).toFixed(1)}% OpenCV confidence.`);
    }
  };

  const handleRemoveItem = (itemId) => {
    const removedItem = counterItems.find(i => i.id === itemId);
    setCounterItems(counterItems.filter(item => item.id !== itemId));
    if (onToast && removedItem) {
      onToast('info', 'Item Removed', `${removedItem.name} de-registered from counter tracking.`);
    }
  };

  const handleClearItems = () => {
    setCounterItems([]);
    setHandOcclusion(false);
    if (onToast) {
      onToast('info', 'Counter Cleared', 'Background subtraction recalibrated to empty counter state.');
    }
  };

  const handleResetDemo = () => {
    setCounterItems([
      { ...CATALOG_ITEMS[0], slot: 0, position: { x: 50, y: 70 } },
      { ...CATALOG_ITEMS[1], slot: 1, position: { x: 260, y: 70 } },
      { ...CATALOG_ITEMS[2], slot: 2, position: { x: 50, y: 220 } },
    ]);
    setHandOcclusion(false);
    setClaheEnabled(true);
    if (onToast) {
      onToast('success', 'Demo Preset Loaded', '3 benchmark SKUs populated with persistent centroids.');
    }
  };

  return (
    <section id="simulator" className="py-16 sm:py-20 relative bg-[#F0F7FF] w-full max-w-full overflow-hidden">
      {/* Anchor for store analytics navigation link */}
      <div id="store-analytics" className="absolute -top-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-700 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Interactive Edge-to-Cloud Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Live Retail Checkout & Store Intelligence Simulator
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-600 text-xs sm:text-base leading-relaxed">
            Test real-time OpenCV centroid tracking, specular glare correction, and hand-occlusion loss prevention, or switch to executive AWS QuickSight BI analytics.
          </p>
        </div>

        {/* Tab Switcher (White Glass Container & White Glass Buttons) */}
        <div className="flex justify-center mb-6 sm:mb-8 w-full">
          <div className="p-1 sm:p-1.5 rounded-2xl bg-white/80 border border-sky-200/90 shadow-md backdrop-blur-md flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('EDGE_CHECKOUT')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 min-h-[44px] whitespace-nowrap ${
                activeTab === 'EDGE_CHECKOUT'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold border border-sky-600'
                  : 'glass-button font-semibold'
              }`}
              aria-label="Switch to Tab A: Live Edge Checkout Terminal"
            >
              <Camera className="w-4 h-4 flex-shrink-0" />
              <span>Tab A: Live Edge Checkout Terminal</span>
              {handOcclusion && (
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('QUICKSIGHT_BI')}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 min-h-[44px] whitespace-nowrap ${
                activeTab === 'QUICKSIGHT_BI'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 font-bold border border-amber-600'
                  : 'glass-button font-semibold'
              }`}
              aria-label="Switch to Tab B: AWS QuickSight Store Analytics"
            >
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              <span>Tab B: AWS QuickSight BI</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'EDGE_CHECKOUT' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start w-full">
            
            {/* Left 7 Columns: Simulated Camera Viewport */}
            <div className="lg:col-span-7 h-full w-full">
              <CameraFeed
                counterItems={counterItems}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onClearItems={handleClearItems}
                onResetDemo={handleResetDemo}
                handOcclusion={handOcclusion}
                setHandOcclusion={setHandOcclusion}
                claheEnabled={claheEnabled}
                setClaheEnabled={setClaheEnabled}
                onToast={onToast}
              />
            </div>

            {/* Right 5 Columns: Instant Digital Cart & Loss Prevention */}
            <div className="lg:col-span-5 h-full w-full">
              <DigitalCart
                counterItems={counterItems}
                handOcclusion={handOcclusion}
                setHandOcclusion={setHandOcclusion}
                claheEnabled={claheEnabled}
                onCheckout={() => {
                  setCheckoutModalOpen(true);
                  if (onToast) {
                    onToast('success', 'Autonomous Payment Authenticated', 'DynamoDB cart token finalized via AWS EventBridge.');
                  }
                }}
                onToast={onToast}
              />
            </div>

          </div>
        ) : (
          <div className="w-full">
            <QuickSightDashboard onToast={onToast} />
          </div>
        )}

      </div>

      {/* Checkout Receipt Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => {
          setCheckoutModalOpen(false);
          handleResetDemo();
        }}
        items={counterItems}
      />
    </section>
  );
}
