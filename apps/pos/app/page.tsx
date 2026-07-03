"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menu';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';

export default function POSStream() {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItemForVariation, setSelectedItemForVariation] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderType, setOrderType] = useState<'Makan ditempat' | 'Bawa Pulang'>('Makan ditempat');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'QRIS'>('CASH');
  const [tenderedAmount, setTenderedAmount] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { items, addItem, updateQuantity, updateNote, getTotal, clearCart } = useCartStore();

  const handleItemClick = (item: MenuItem, hasVariations: boolean) => {
    if (hasVariations) {
      setSelectedItemForVariation(item);
    } else {
      addItem(item);
    }
  };

  const handleVariationSelect = (variation: 'Goreng' | 'Rebus') => {
    if (selectedItemForVariation) {
      addItem(selectedItemForVariation, variation);
      setSelectedItemForVariation(null);
    }
  };

  const formatRp = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatRpShort = (amount: number) => {
    return `Rp ${amount.toLocaleString('en-US')}`;
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let currentId = CATEGORIES[0].id;
      for (const cat of CATEGORIES) {
        const el = document.getElementById(`category-${cat.id}`);
        if (el) {
          const containerTop = container.getBoundingClientRect().top;
          const elTop = el.getBoundingClientRect().top;
          
          if (elTop - containerTop <= 150) {
            currentId = cat.id;
          }
        }
      }
      setActiveCategoryId(currentId);
    };

    container.addEventListener('scroll', handleScroll);
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#18181A] text-white font-sans">
      
      {/* Sidebar Navigation */}
      <aside className={`${isSidebarOpen ? 'w-64 border-r' : 'w-0 border-r-0'} bg-[#121213] border-[#2A2A2D] flex flex-col shrink-0 shadow-2xl z-50 overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="w-64 h-full flex flex-col">
          <div className="p-4 border-b border-[#2A2A2D] flex items-center space-x-3 shrink-0 h-[73px]">
            <div className="bg-white rounded-full p-1 shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Dayun Nasgor Logo" className="w-7 h-7 rounded-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-white uppercase tracking-widest text-[#E58B6D]">Menu</h1>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            <a 
              href="http://localhost:3002"
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border bg-[#1C1C1E] text-gray-300 border-transparent hover:bg-[#2A2A2D] hover:text-white"
            >
               Home
            </a>
            <Link 
              href="/sales"
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border bg-[#1C1C1E] text-gray-300 border-transparent hover:bg-[#2A2A2D] hover:text-white"
            >
               Laporan Penjualan
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main ref={scrollContainerRef} className="flex-1 flex flex-col min-w-0 relative overflow-y-auto scroll-smooth">
        {/* Header */}
        <header className="p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-400 hover:text-white rounded-lg transition-colors mr-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-[#E58B6D] uppercase">
              Dayun Nasgor
            </h1>
          </div>
          <button className="h-10 w-10 rounded-xl border border-[#3A3A3D] flex items-center justify-center text-[#E58B6D] hover:bg-[#2A2A2D] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </header>

        {/* Categories Tabs */}
        <div className="sticky top-0 z-30 bg-[#18181A] pt-2 px-4 pb-3 shrink-0 border-b border-[#2A2A2D]">
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide space-x-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors active:scale-[0.98] ${
                  activeCategoryId === category.id 
                    ? 'bg-[#E58B6D] text-[#3B1207] shadow-lg shadow-[#E58B6D]/20' 
                    : 'bg-[#1C1C1E] text-gray-400 border border-[#2A2A2D] hover:bg-[#2A2A2D]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid - Scrollable with all items */}
        <div className="px-4 pt-4 pb-24">
          {CATEGORIES.map((category) => {
            const categoryItems = MENU_ITEMS.filter(m => m.categoryId === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id} id={`category-${category.id}`} className="mb-10 pt-2 scroll-mt-24">
                <div className="mb-6 flex items-center bg-gradient-to-r from-[#E58B6D]/20 to-transparent p-3 rounded-xl border-l-4 border-[#E58B6D]">
                  <h2 className="text-2xl font-black text-white tracking-wide shadow-sm">{category.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {categoryItems.map((item, idx) => (
                    <div key={item.id} className="bg-[#1F1F22] rounded-2xl border border-[#2A2A2D] overflow-hidden flex flex-col active:scale-[0.98] transition-transform">
                      <div className="relative h-36 bg-[#2A2A2D]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F22] to-transparent"></div>
                        
                        {/* Badges for aesthetics */}
                        {idx % 3 === 0 && (
                          <div className="absolute top-2 right-2 bg-[#D4A373] text-[#4C190D] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">BESTSELLER</div>
                        )}
                        {idx % 4 === 1 && (
                          <div className="absolute top-2 right-2 bg-[#4A7C59] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">CLASSIC</div>
                        )}
                      </div>
                      <div className="p-3 flex flex-col flex-1 relative -mt-6 z-10">
                        <h3 className="font-bold text-gray-100 text-[17px] leading-tight mb-4 flex-1 drop-shadow-md">{item.name}</h3>
                        <div className="flex justify-between items-center mt-auto w-full">
                          <span className="font-bold text-[#E58B6D] shrink-0">{formatRpShort(item.price)}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleItemClick(item, category.hasVariations); }}
                            className="flex-1 ml-4 h-9 rounded-full border border-[#4A4A4D] flex items-center justify-center text-[#E58B6D] bg-[#2A2A2D] hover:bg-[#3A3A3D] transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Cart Button */}
        <div className="sticky bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#18181A] via-[#18181A]/90 to-transparent z-40 pointer-events-none pb-6 flex justify-center">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full max-w-[360px] bg-white text-[#18181A] rounded-2xl p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-transform pointer-events-auto border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-[#E58B6D] text-white px-3 py-1 rounded-lg font-bold text-sm">
                {totalItemsCount} items
              </div>
              <span className="font-extrabold text-lg">Pesanan</span>
            </div>
            <span className="font-black text-xl">{formatRp(getTotal())} &rarr;</span>
          </button>
        </div>

        {/* Cart Drawer (Dark Mode) */}
        <div className={`fixed inset-0 z-[60] transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          
          <div className="relative mt-auto bg-[#18181A] h-[85dvh] rounded-t-3xl shadow-2xl flex flex-col border-t border-[#2A2A2D]">
            
            <div className="w-full flex justify-center pt-3 pb-2" onClick={() => setIsCartOpen(false)}>
              <div className="w-12 h-1.5 bg-[#3A3A3D] rounded-full" />
            </div>

            <header className="px-6 pb-4 border-b border-[#2A2A2D] flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-extrabold text-white">Pesanan</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 font-bold p-2 bg-[#2A2A2D] rounded-full hover:bg-[#3A3A3D]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p className="font-medium">Cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.cartItemId} className="flex flex-col p-3 bg-[#1F1F22] rounded-xl border border-[#2A2A2D]">
                    <div className="flex items-center justify-between">
                      {/* Plus Minus Controls */}
                      <div className="flex items-center space-x-1 bg-[#121213] border border-[#2A2A2D] rounded-lg p-1 shrink-0 mr-3">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-300 bg-[#2A2A2D] rounded-md active:bg-[#3A3A3D] font-bold text-lg leading-none"
                        >-</button>
                        <span className="w-5 text-center font-bold text-white text-sm leading-none">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-300 bg-[#2A2A2D] rounded-md active:bg-[#3A3A3D] font-bold text-lg leading-none"
                        >+</button>
                      </div>

                      {/* Name and Variation */}
                      <div className="flex-1 min-w-0 pr-2 flex flex-col">
                        <h4 className="font-bold text-gray-100 leading-tight text-base truncate">{item.name}</h4>
                        {item.variation && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#2A2A2D] text-[#E58B6D] rounded mt-1 self-start">
                            {item.variation}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <span className="font-extrabold text-white shrink-0 text-base">{formatRp(item.price * item.quantity)}</span>
                    </div>

                    {/* Note Input */}
                    <div className="mt-3">
                      <input 
                        type="text" 
                        placeholder="Catatan (opsional)..." 
                        value={item.note || ''}
                        onChange={(e) => updateNote(item.cartItemId, e.target.value)}
                        className="w-full bg-[#121213] text-gray-300 text-xs px-3 py-2 rounded-lg border border-[#2A2A2D] focus:outline-none focus:border-[#E58B6D] transition-colors"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 pb-10 bg-[#18181A] border-t border-[#2A2A2D] space-y-4 shrink-0">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400 font-semibold">Total</span>
                <span className="font-black text-[#E58B6D] text-3xl">{formatRp(getTotal())}</span>
              </div>
              <button 
                onClick={() => {
                  if (items.length > 0) {
                    setIsCheckoutOpen(true);
                    setTenderedAmount(getTotal()); // Default to exact amount
                  }
                }}
                className={`w-full py-4 rounded-2xl font-bold text-xl shadow-lg transition-all active:scale-[0.98] ${
                  items.length > 0 
                    ? 'bg-[#E58B6D] text-[#3B1207]' 
                    : 'bg-[#2A2A2D] text-gray-500 cursor-not-allowed'
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Variation Popup Modal (Dark Mode) */}
        {selectedItemForVariation && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-[#1F1F22] rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-[#2A2A2D]">
              <h3 className="text-2xl font-extrabold text-center text-white mb-2">Select Style</h3>
              <p className="text-center text-gray-400 font-medium mb-6 text-sm">{selectedItemForVariation.name}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleVariationSelect('Goreng')}
                  className="py-4 text-center rounded-2xl font-bold bg-[#E58B6D]/20 text-[#E58B6D] hover:bg-[#E58B6D]/30 active:scale-95 transition-all border border-[#E58B6D]/30 shadow-sm"
                >
                  Goreng
                </button>
                <button 
                  onClick={() => handleVariationSelect('Rebus')}
                  className="py-4 text-center rounded-2xl font-bold bg-[#3b82f6]/20 text-[#60a5fa] hover:bg-[#3b82f6]/30 active:scale-95 transition-all border border-[#3b82f6]/30 shadow-sm"
                >
                  Rebus
                </button>
              </div>
              
              <button 
                onClick={() => setSelectedItemForVariation(null)}
                className="mt-4 w-full py-3 text-gray-400 bg-[#121213] rounded-xl font-bold active:bg-[#18181A] border border-[#2A2A2D]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-end sm:items-center justify-center sm:p-4">
            <div className="bg-[#18181A] rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl border border-[#2A2A2D] flex flex-col max-h-[90dvh]">
              
              <div className="p-6 border-b border-[#2A2A2D] flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-extrabold text-white">Checkout</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 p-2 bg-[#2A2A2D] rounded-full hover:bg-[#3A3A3D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="flex justify-between items-center bg-[#1F1F22] p-4 rounded-2xl border border-[#2A2A2D] mb-6">
                  <span className="text-gray-400 font-semibold text-lg">Total Due</span>
                  <span className="font-black text-[#E58B6D] text-3xl">{formatRp(getTotal())}</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">Order Type</h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setOrderType('Makan ditempat')}
                      className={`flex-1 py-3 rounded-xl font-bold border transition-all ${orderType === 'Makan ditempat' ? 'bg-[#E58B6D]/20 text-[#E58B6D] border-[#E58B6D]/30' : 'bg-[#1F1F22] text-gray-400 border-[#2A2A2D]'}`}
                    >Dine In</button>
                    <button 
                      onClick={() => setOrderType('Bawa Pulang')}
                      className={`flex-1 py-3 rounded-xl font-bold border transition-all ${orderType === 'Bawa Pulang' ? 'bg-[#E58B6D]/20 text-[#E58B6D] border-[#E58B6D]/30' : 'bg-[#1F1F22] text-gray-400 border-[#2A2A2D]'}`}
                    >Takeaway</button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">Payment Method</h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setPaymentMethod('CASH')}
                      className={`flex-1 py-3 rounded-xl font-bold border transition-all ${paymentMethod === 'CASH' ? 'bg-[#E58B6D]/20 text-[#E58B6D] border-[#E58B6D]/30' : 'bg-[#1F1F22] text-gray-400 border-[#2A2A2D]'}`}
                    >Cash</button>
                    <button 
                      onClick={() => setPaymentMethod('QRIS')}
                      className={`flex-1 py-3 rounded-xl font-bold border transition-all ${paymentMethod === 'QRIS' ? 'bg-[#E58B6D]/20 text-[#E58B6D] border-[#E58B6D]/30' : 'bg-[#1F1F22] text-gray-400 border-[#2A2A2D]'}`}
                    >QRIS</button>
                  </div>
                </div>

                {paymentMethod === 'CASH' && (
                  <div className="mb-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">Quick Cash</h3>
                      <div className="grid grid-cols-5 gap-2">
                        <button onClick={() => setTenderedAmount(getTotal())} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">Exact</button>
                        <button onClick={() => setTenderedAmount(15000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">15k</button>
                        <button onClick={() => setTenderedAmount(20000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">20k</button>
                        <button onClick={() => setTenderedAmount(25000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">25k</button>
                        <button onClick={() => setTenderedAmount(50000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">50k</button>
                        <button onClick={() => setTenderedAmount(100000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">100k</button>
                        <button onClick={() => setTenderedAmount(120000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">120k</button>
                        <button onClick={() => setTenderedAmount(150000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">150k</button>
                        <button onClick={() => setTenderedAmount(200000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">200k</button>
                        <button onClick={() => setTenderedAmount(250000)} className="py-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-lg text-xs font-bold text-gray-300 hover:bg-[#2A2A2D]">250k</button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">Tendered</h3>
                      <div className="flex bg-[#1F1F22] border border-[#2A2A2D] rounded-xl overflow-hidden focus-within:border-[#E58B6D] transition-colors">
                        <span className="bg-[#2A2A2D] px-4 flex items-center text-gray-400 font-bold">Rp</span>
                        <input 
                          type="number"
                          value={tenderedAmount || ''}
                          onChange={(e) => setTenderedAmount(parseInt(e.target.value) || 0)}
                          className="flex-1 bg-transparent py-3 px-4 text-white font-bold text-xl focus:outline-none"
                        />
                      </div>
                    </div>
                    {tenderedAmount >= getTotal() && (
                      <div className="flex justify-between items-center bg-[#4A7C59]/10 p-4 rounded-xl border border-[#4A7C59]/20">
                        <span className="text-[#4A7C59] font-bold">Change Due</span>
                        <span className="font-black text-[#4A7C59] text-xl">{formatRp(tenderedAmount - getTotal())}</span>
                      </div>
                    )}
                    {tenderedAmount < getTotal() && tenderedAmount > 0 && (
                      <div className="flex justify-between items-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <span className="text-red-400 font-bold">Short</span>
                        <span className="font-black text-red-400 text-xl">{formatRp(getTotal() - tenderedAmount)}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {paymentMethod === 'QRIS' && (
                  <div className="mb-6 flex flex-col items-center justify-center p-8 bg-[#1F1F22] rounded-2xl border border-[#2A2A2D] animate-in fade-in duration-300">
                    <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg p-2">
                      <div className="w-full h-full border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 font-bold text-center">QRIS Code<br/>(Simulated)</span>
                      </div>
                    </div>
                    <p className="text-gray-400 font-medium text-center">Awaiting payment from customer...</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-[#2A2A2D] shrink-0">
                <button 
                  onClick={async () => {
                    if (paymentMethod === 'CASH' && tenderedAmount < getTotal()) {
                      alert('Tendered amount is less than total due!');
                      return;
                    }
                    
                    try {
                      // Generate a unique ticket ID (TKT-XXXX)
                      const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
                      
                      const { error } = await supabase.from('tickets').insert([{
                        id: ticketId,
                        order_type: orderType,
                        status: 'RECEIVED',
                        items: items.map(item => ({
                          id: item.cartItemId,
                          name: item.name,
                          quantity: item.quantity,
                          variation: item.variation,
                          note: item.note,
                          completed: false
                        }))
                      }]);

                      if (error) {
                        console.error("Supabase insert error", error);
                        throw error;
                      }

                      setShowSuccessModal(true);
                      clearCart();
                      setIsCheckoutOpen(false);
                      setIsCartOpen(false);
                    } catch (error) {
                      console.error("Failed to send order to KDS", error);
                      alert("Failed to send order to Kitchen!");
                    }
                  }}
                  disabled={paymentMethod === 'CASH' && tenderedAmount < getTotal()}
                  className="w-full py-4 rounded-2xl font-bold text-xl shadow-lg transition-all active:scale-[0.98] bg-[#E58B6D] text-[#3B1207] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Transaction
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-[#18181A] rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-[#2A2A2D] flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-[#4A7C59]/20 rounded-full flex items-center justify-center mb-6 border-4 border-[#4A7C59]/30">
                <svg className="w-10 h-10 text-[#4A7C59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Transaction Complete!</h2>
              <p className="text-gray-400 mb-8 font-medium">Order has been sent to the kitchen.</p>
              
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 bg-[#E58B6D] text-[#3B1207] rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
              >
                New Order
              </button>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
