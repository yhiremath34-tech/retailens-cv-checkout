import React, { useState } from 'react';
import { Camera, BarChart3, Cpu, Sparkles, Terminal, ShieldAlert } from 'lucide-react';
import CameraFeed from './CameraFeed';
import DigitalCart from './DigitalCart';
import QuickSightDashboard from './QuickSightDashboard';
import CheckoutModal from './CheckoutModal';
import { CATALOG_ITEMS } from '../../data/mockData';

export default function LiveSimulator() {
  const [activeTab, setActiveTab] = useState('EDGE_CHECKOUT'); // 'EDGE_CHECKOUT' or 'QUICKSIGHT_BI'
  
  // Initial default 3 items placed on the simulated counter
  const [counterItems, setCounterItems] = useState([
    {
      ...CATALOG_ITEMS[0], // Cold brew
      position: { x: 75, y: 75 },
    },
    {
      ...CATALOG_ITEMS[1], // Bread
      position: { x: 220, y: 70 },
    },
    {
      ...CATALOG_ITEMS[2], // Milk
      position: { x: 130, y: 220 },
    }
  ]);

  const [handOcclusion, setHandOcclusion] = useState(false);
  const [claheEnabled, setClaheEnabled] = useState(true);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Add an item to the counter with a smart non-overlapping position
  const handleAddItem = (item) => {
    if (counterItems.some(i => i.id === item.id)) return;
    
    // Choose coordinates based on current count
    const positions = [
      { x: 75, y: 75 },
      { x: 220, y: 70 },
      { x: 130, y: 220 },
      { x: 280, y: 195 },
      { x: 380, y: 85 },
      { x: 375, y: 225 },
    ];
    
    const nextPos = positions[counterItems.length % positions.length];
    setCounterItems([...counterItems, { ...item, position: nextPos }]);
  };

  const handleRemoveItem = (itemId) => {
    setCounterItems(counterItems.filter(item => item.id !== itemId));
  };

  const handleClearItems = () => {
    setCounterItems([]);
    setHandOcclusion(false);
  };

  const handleResetDemo = () => {
    setCounterItems([
      { ...CATALOG_ITEMS[0], position: { x: 75, y: 75 } },
      { ...CATALOG_ITEMS[1], position: { x: 220, y: 70 } },
      { ...CATALOG_ITEMS[2], position: { x: 130, y: 220 } },
    ]);
    setHandOcclusion(false);
    setClaheEnabled(true);
  };

  return (
    <section id="simulator" className="py-20 relative bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Edge-to-Cloud Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Live Retail Checkout & Store Intelligence Simulator
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Test real-time OpenCV centroid tracking, specular glare correction, and hand-occlusion loss prevention, or switch to executive AWS QuickSight BI analytics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl bg-[#111827] border border-white/10 flex items-center gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab('EDGE_CHECKOUT')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'EDGE_CHECKOUT'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Tab A: Live Edge Checkout Terminal (OpenCV)</span>
              {handOcclusion && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('QUICKSIGHT_BI')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'QUICKSIGHT_BI'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-500/20 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Tab B: AWS QuickSight Store Analytics</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'EDGE_CHECKOUT' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 7 Columns: Simulated Camera Viewport */}
            <div className="lg:col-span-7 h-full">
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
              />
            </div>

            {/* Right 5 Columns: Instant Digital Cart & Loss Prevention */}
            <div className="lg:col-span-5 h-full">
              <DigitalCart
                counterItems={counterItems}
                handOcclusion={handOcclusion}
                setHandOcclusion={setHandOcclusion}
                claheEnabled={claheEnabled}
                onCheckout={() => setCheckoutModalOpen(true)}
              />
            </div>

          </div>
        ) : (
          <div>
            <QuickSightDashboard />
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
