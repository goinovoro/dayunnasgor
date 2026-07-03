"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SalesReport() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
              href={process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3002"}
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border bg-[#1C1C1E] text-gray-300 border-transparent hover:bg-[#2A2A2D] hover:text-white"
            >
               Home
            </a>
            <Link 
              href="/sales"
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border border-[#E58B6D] bg-[#E58B6D]/10 text-[#E58B6D]"
            >
               Laporan Penjualan
            </Link>
            <Link 
              href="/inventory"
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border bg-[#1C1C1E] text-gray-300 border-transparent hover:bg-[#2A2A2D] hover:text-white"
            >
               Inventaris
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-y-auto scroll-smooth">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#121213]/90 backdrop-blur-md border-b border-[#2A2A2D] p-4 flex items-center shrink-0 h-[73px]">
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
            <h1 className="text-2xl font-black text-white tracking-tight">Sales <span className="text-[#E58B6D]">Overview</span></h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#E58B6D]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Total Revenue</h3>
              <p className="text-4xl font-black text-white">Rp 2.450.000</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[#4A7C59] font-bold flex items-center bg-[#4A7C59]/10 px-2 py-1 rounded-md">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  12.5%
                </span>
                <span className="text-gray-500 ml-2">vs yesterday</span>
              </div>
            </div>

            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#6BA3BE]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Total Orders</h3>
              <p className="text-4xl font-black text-white">124</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[#4A7C59] font-bold flex items-center bg-[#4A7C59]/10 px-2 py-1 rounded-md">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  8.2%
                </span>
                <span className="text-gray-500 ml-2">vs yesterday</span>
              </div>
            </div>

            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#E58B6D]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Average Order Value</h3>
              <p className="text-4xl font-black text-white">Rp 19.758</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-400 font-bold flex items-center bg-red-400/10 px-2 py-1 rounded-md">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  2.1%
                </span>
                <span className="text-gray-500 ml-2">vs yesterday</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart (CSS Mockup) */}
            <div className="lg:col-span-2 bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-white">Revenue Trend</h3>
                <select className="bg-[#121213] border border-[#2A2A2D] text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#E58B6D]">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              
              {/* Fake Chart Area */}
              <div className="flex-1 flex items-end justify-between space-x-2 relative group pt-8">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-8 bottom-8 flex flex-col justify-between text-xs text-gray-600 font-bold -ml-2">
                  <span>3M</span>
                  <span>2M</span>
                  <span>1M</span>
                  <span>0</span>
                </div>
                
                {/* Chart bars */}
                <div className="w-full flex justify-around items-end h-full pl-6 border-l border-b border-[#2A2A2D] pb-1">
                  {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                    <div key={i} className="w-[8%] flex flex-col items-center group/bar relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-xl">
                        Rp {h * 30}.000
                      </div>
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-500 hover:bg-[#E58B6D] ${i === 7 ? 'bg-[#E58B6D]' : 'bg-[#E58B6D]/40'}`} 
                        style={{ height: `${h}%` }}
                      ></div>
                      <span className="text-[10px] text-gray-500 font-bold mt-2">{['10am','12pm','2pm','4pm','6pm','8pm','10pm','12am'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Selling Items */}
            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col h-[400px]">
              <h3 className="font-bold text-xl text-white mb-6">Top Menu Items</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {[
                  { name: 'Nasi Otokowok Ati Ampela', qty: 45, rev: 'Rp 675.000' },
                  { name: 'Kwetiau Chicken Katsu', qty: 32, rev: 'Rp 800.000' },
                  { name: 'Bihun Ati Ampela + Ayam', qty: 28, rev: 'Rp 560.000' },
                  { name: 'Nasi Goreng Ayam Suwir', qty: 24, rev: 'Rp 360.000' },
                  { name: 'Kwetiau Ati Ampela', qty: 15, rev: 'Rp 225.000' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-[#121213] border border-[#2A2A2D] flex items-center justify-center font-bold text-xs text-gray-400 shrink-0">
                        #{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-200 text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.qty} orders</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#E58B6D] text-sm shrink-0 pl-2">{item.rev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
