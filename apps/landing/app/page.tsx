"use client";

const POS_URL = process.env.NEXT_PUBLIC_POS_URL || "http://localhost:3000";
const KDS_URL = process.env.NEXT_PUBLIC_KDS_URL || "http://localhost:3001";

export default function RoleSelection() {
  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: "url('/idle.webp')" }}
    >
      <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
      
      <div className="z-10 w-full max-w-sm flex flex-col items-center">
        <div className="mb-10 text-center flex flex-col items-center space-y-4">
          <img src="/logo.png" alt="Dayun Nasgor Logo" className="w-32 h-32 rounded-full shadow-2xl border-4 border-white object-contain bg-white" />
          <div className="bg-white/95 backdrop-blur-md px-8 py-3 rounded-2xl shadow-xl mt-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Dayun Nasgor
            </h1>
            <p className="text-sm text-slate-600 font-bold mt-1">
              Pilih Workspace
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          {/* POS Card */}
          <a href={POS_URL} className="block w-full group">
            <div className="bg-white rounded-3xl p-6 flex items-center space-x-6 transition-all duration-300 active:scale-95 hover:shadow-xl hover:border-orange-200 border border-transparent shadow-sm relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold text-slate-800 leading-tight">Kasir</h2>
                <p className="text-sm text-slate-500 mt-1">Mesin Kasir</p>
              </div>
            </div>
          </a>

          {/* KDS Card */}
          <a href={KDS_URL} className="block w-full group">
            <div className="bg-white rounded-3xl p-6 flex items-center space-x-6 transition-all duration-300 active:scale-95 hover:shadow-xl hover:border-slate-300 border border-transparent shadow-sm relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-md shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-2xl font-bold text-slate-800 leading-tight">Chef</h2>
                <p className="text-sm text-slate-500 mt-1">Sistem Dapur</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
