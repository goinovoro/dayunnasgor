"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Inventory() {
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
            <Link 
              href="/inventory"
              className="block w-full text-left p-4 rounded-xl font-bold transition-colors border border-[#E58B6D] bg-[#E58B6D]/10 text-[#E58B6D]"
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
            <h1 className="text-2xl font-black text-white tracking-tight">Stok <span className="text-[#E58B6D]">Inventaris</span></h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#6BA3BE]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H14a1 1 0 100-2H8.414l1.293-1.293z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Total Items</h3>
              <p className="text-4xl font-black text-white">45</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-500 font-bold flex items-center">
                  Active in storage
                </span>
              </div>
            </div>

            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Low Stock Alerts</h3>
              <p className="text-4xl font-black text-white">3</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-400 font-bold flex items-center bg-red-400/10 px-2 py-1 rounded-md">
                  Action Required
                </span>
              </div>
            </div>

            <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#4A7C59]">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Est. Value</h3>
              <p className="text-4xl font-black text-white">Rp 4.250.000</p>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[#4A7C59] font-bold flex items-center bg-[#4A7C59]/10 px-2 py-1 rounded-md">
                  Healthy
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-white">Stock Overview</h3>
              <button className="bg-[#E58B6D] text-[#3B1207] px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#E58B6D]/90 transition-colors">
                + Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2A2A2D] text-gray-500 text-sm tracking-wider uppercase">
                    <th className="pb-4 font-bold">Item Name</th>
                    <th className="pb-4 font-bold">Category</th>
                    <th className="pb-4 font-bold">In Stock</th>
                    <th className="pb-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-300">
                  <tr className="border-b border-[#2A2A2D] group hover:bg-[#2A2A2D]/50 transition-colors">
                    <td className="py-4 font-bold text-white">Beras Putih</td>
                    <td className="py-4 text-gray-400">Bahan Baku</td>
                    <td className="py-4 font-medium text-white">25 kg</td>
                    <td className="py-4">
                      <span className="bg-[#4A7C59]/20 text-[#4A7C59] px-3 py-1 rounded-full font-bold text-xs">Sufficient</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2A2A2D] group hover:bg-[#2A2A2D]/50 transition-colors">
                    <td className="py-4 font-bold text-white">Telur Ayam</td>
                    <td className="py-4 text-gray-400">Bahan Baku</td>
                    <td className="py-4 font-medium text-white">30 pcs</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold text-xs">Low Stock</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2A2A2D] group hover:bg-[#2A2A2D]/50 transition-colors">
                    <td className="py-4 font-bold text-white">Daging Ayam Fillet</td>
                    <td className="py-4 text-gray-400">Daging</td>
                    <td className="py-4 font-medium text-white">12 kg</td>
                    <td className="py-4">
                      <span className="bg-[#4A7C59]/20 text-[#4A7C59] px-3 py-1 rounded-full font-bold text-xs">Sufficient</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#2A2A2D] group hover:bg-[#2A2A2D]/50 transition-colors">
                    <td className="py-4 font-bold text-white">Minyak Goreng</td>
                    <td className="py-4 text-gray-400">Bahan Baku</td>
                    <td className="py-4 font-medium text-white">2 Liter</td>
                    <td className="py-4">
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold text-xs">Low Stock</span>
                    </td>
                  </tr>
                  <tr className="group hover:bg-[#2A2A2D]/50 transition-colors">
                    <td className="py-4 font-bold text-white">Kecap Manis Bango</td>
                    <td className="py-4 text-gray-400">Bumbu</td>
                    <td className="py-4 font-medium text-white">8 Botol</td>
                    <td className="py-4">
                      <span className="bg-[#4A7C59]/20 text-[#4A7C59] px-3 py-1 rounded-full font-bold text-xs">Sufficient</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
