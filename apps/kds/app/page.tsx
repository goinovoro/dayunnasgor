"use client";

import { useTicketStore, OrderStatus, Ticket } from "../store/useTicketStore";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTicketSubscription } from "../hooks/useTicketSubscription";

export default function KDSStream() {
  const { tickets, bumpTicket, toggleItemComplete } = useTicketStore();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [newTicketIds, setNewTicketIds] = useState<Set<string>>(new Set());
  const prevTicketIdsRef = useRef<Set<string>>(new Set());

  useTicketSubscription();

  // Force re-render every second for real-time timers
  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Detect newly arrived tickets and mark them as new
  useEffect(() => {
    const currentIds = new Set(tickets.map(t => t.id));
    const incoming: string[] = [];
    currentIds.forEach(id => {
      if (!prevTicketIdsRef.current.has(id)) incoming.push(id);
    });
    if (incoming.length > 0) {
      setNewTicketIds(prev => {
        const next = new Set(prev);
        incoming.forEach(id => next.add(id));
        return next;
      });
    }
    prevTicketIdsRef.current = currentIds;
  }, [tickets]);

  // Sort newest-first so new orders appear at the top
  const pendingTickets = [...tickets]
    .filter(t => t.status !== "SELESAI")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const overdueCount = tickets.filter(t => t.status === "DITERIMA").length; // All active tickets are DITERIMA

  const getNextStatus = (current: OrderStatus): OrderStatus => {
    return "SELESAI";
  };

  const categoryColors = ['bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-rose-400', 'bg-amber-400'];

  return (
    <div
      className="flex h-[100dvh] overflow-hidden bg-[#0B0F19] text-black selection:bg-yellow-400 font-mono"
      style={{ fontFamily: 'var(--font-jetbrains)' }}
      onClick={() => setNewTicketIds(new Set())}
    >
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72 border-r-[4px]' : 'w-0 border-r-0'} bg-white border-black flex flex-col shrink-0 z-20 overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="w-72 h-full flex flex-col">
          <div className="p-5 border-b-[4px] border-black flex items-center justify-between shrink-0 h-[80px]">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-400 rounded-none border-2 border-black p-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
                <img src="/logo.png" alt="Dayun Nasgor Logo" className="w-7 h-7 object-contain mix-blend-multiply" />
              </div>
              <h1 className="text-xl font-black text-black tracking-widest uppercase">SIDEBAR</h1>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-gray-100">
            <a 
              href="http://localhost:3002"
              className="block w-full text-left p-4 font-black transition-transform border-[3px] border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-white text-black hover:bg-yellow-400"
            >
               <div className="text-xs uppercase tracking-widest mb-1 opacity-80">Kembali ke</div>
               <div className="text-lg uppercase">Home</div>
            </a>
            <a 
              href="http://localhost:3000/reports"
              className="block w-full text-left p-4 font-black transition-transform border-[3px] border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-yellow-400 text-black hover:bg-yellow-500"
            >
               <div className="text-xs uppercase tracking-widest mb-1 opacity-80">Laporan</div>
               <div className="text-lg uppercase">Sales Reports</div>
            </a>
            <a 
              href="http://localhost:3000/inventory"
              className="block w-full text-left p-4 font-black transition-transform border-[3px] border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-emerald-400 text-black hover:bg-emerald-500"
            >
               <div className="text-xs uppercase tracking-widest mb-1 opacity-80">Data Barang</div>
               <div className="text-lg uppercase">Inventaris</div>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white px-4 md:px-6 py-4 border-b-[4px] border-black flex flex-wrap gap-4 justify-between items-center shrink-0 z-10 min-h-[80px]">
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-black hover:bg-yellow-400 border-[3px] border-transparent hover:border-black hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] rounded-none transition-all active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-baseline gap-4 md:gap-6">
               <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] text-black">AKTIF</span>
                  <span className="text-2xl md:text-4xl font-black text-black leading-none">{pendingTickets.length}</span>
               </div>
               <div className="flex flex-col relative pl-2">
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] text-black">LEWAT WAKTU</span>
                  <span 
                    className="text-2xl md:text-4xl font-black text-white leading-none tracking-tight" 
                    style={{ WebkitTextStroke: '2px black', filter: 'drop-shadow(2px 2px 0 #FACC15)' }}
                  >
                     {overdueCount}
                  </span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <div className="flex flex-col items-end md:pr-4 w-16 md:w-24">
               <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] text-black">JAM</span>
               <span className="text-2xl md:text-4xl font-black text-black leading-none tracking-tight">
                  {isMounted ? new Date(currentTime).toLocaleTimeString('en-US', { hour12: false }) : "--:--"}
               </span>
            </div>
            <button className="border-[3px] border-black bg-white px-3 md:px-4 py-2 font-black uppercase text-xs md:text-sm tracking-widest hover:bg-gray-100 shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
              LOGOUT
            </button>
          </div>
        </header>

        {pendingTickets.length === 0 ? (
          <div 
            className="flex-1 flex items-center justify-center relative"
            style={{ 
              backgroundImage: 'url(/idle.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'left center' 
            }}
          >
            {/* Dark dim overlay so text stays in high contrast */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
            
            <div className="bg-white p-6 shadow-[10px_10px_0_0_rgba(0,0,0,1)] border-4 border-black relative z-10">
               <h2 className="text-5xl font-black tracking-widest text-black uppercase">DAPUR BERSIH</h2>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
              {pendingTickets.map((ticket: Ticket, idx: number) => {
                const diffInSeconds = Math.floor((currentTime - new Date(ticket.createdAt).getTime()) / 1000);
                const m = Math.floor(diffInSeconds / 60).toString().padStart(2, '0');
                const s = (diffInSeconds % 60).toString().padStart(2, '0');

                const isNew = newTicketIds.has(ticket.id);

                return (
                  <div
                    key={ticket.id}
                    className="h-[600px] border-[4px] border-black flex flex-col overflow-hidden rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative transition-all duration-500"
                    style={{ backgroundColor: isNew ? '#e0f2fe' : '#ffffff' }}
                  >
                    <div className="p-4 border-b-[4px] border-black bg-white flex justify-between items-start">
                      <div>
                        <span className="text-black font-black uppercase text-lg tracking-wider block leading-none mb-1 truncate" title={ticket.customerName || ticket.id}>
                          # {ticket.customerName ? `${ticket.customerName} (${ticket.id})` : ticket.id}
                        </span>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2 mt-1">
                          <span>{ticket.orderType}</span>
                          <span className="w-1.5 h-1.5 bg-black"></span>
                          <span className={`px-1.5 py-0.5 text-white bg-blue-500`}>
                            {ticket.status}
                          </span>
                        </span>
                      </div>
                      
                      <div className="border-[3px] border-black px-3 py-1 bg-white">
                         <span className="text-2xl font-black tracking-tight">{isMounted ? `${m}:${s}` : "--:--"}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto py-2">
                      {ticket.items.map((item: any, i: number) => (
                        <div 
                          key={item.id} 
                          className={`relative flex items-start px-4 py-3 border-b-2 border-gray-100 last:border-b-0 cursor-pointer transition-all hover:bg-gray-50 ${item.completed ? 'bg-gray-100' : ''}`}
                          onClick={() => toggleItemComplete(ticket.id, item.id)}
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-2 ${categoryColors[(i + idx) % categoryColors.length]}`}></div>
                          
                          <div 
                            className="w-8 h-8 border-[3px] border-black flex-shrink-0 mr-4 ml-2 flex items-center justify-center transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-px active:translate-x-px active:shadow-none"
                            style={{ backgroundColor: item.completed ? '#000' : '#fff' }}
                          >
                            {item.completed && (
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>

                          <div className="pt-0.5 flex-1">
                            <div className="flex items-baseline gap-2">
                               {item.quantity > 1 && <span className="font-black text-lg">x{item.quantity}</span>}
                               <h3 className={`font-black uppercase text-lg leading-tight tracking-tight text-black ${item.completed ? 'line-through decoration-2' : ''}`}>{item.name}</h3>
                            </div>
                            
                            {item.variation && (
                              <div className={`mt-2 inline-block px-2 py-0.5 ${item.completed ? 'bg-gray-400' : 'bg-black'} text-white`}>
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  [CATATAN: {item.variation}]
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t-[4px] border-black bg-white shrink-0 z-10 flex gap-4">
                      <button 
                        className="flex-1 py-4 bg-yellow-400 text-black border-[3px] border-black rounded-none font-black uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-lg"
                        onClick={() => bumpTicket(ticket.id, getNextStatus(ticket.status))}
                      >
                        SELESAI &rarr;
                      </button>
                      <button 
                        className="w-16 bg-white text-black border-[3px] border-black rounded-none font-black flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
