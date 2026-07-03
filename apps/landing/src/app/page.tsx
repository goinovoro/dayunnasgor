"use client";

import { useState } from "react";

const POS_URL = process.env.NEXT_PUBLIC_POS_URL || "http://localhost:3000";
const KDS_URL = process.env.NEXT_PUBLIC_KDS_URL || "http://localhost:3001";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<"pos" | "kds" | null>(null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0F19] px-6">

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,204,21,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Logo + header */}
      <div className="relative z-10 mb-12 flex flex-col items-center gap-4 text-center">
        <div
          className="flex h-20 w-20 items-center justify-center border-4 border-yellow-400 bg-yellow-400 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          <img
            src="/logo.png"
            alt="Dayun Nasgor"
            className="h-14 w-14 object-contain mix-blend-multiply"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-white md:text-5xl">
            DAYUN NASGOR
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Sistem Kasir & Manajemen Dapur
          </p>
        </div>
      </div>

      {/* Role selection cards */}
      <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">

        {/* Cashier card */}
        <a
          href={POS_URL}
          className="card-float group block"
          onMouseEnter={() => setHoveredCard("pos")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`relative flex flex-col items-center gap-5 border-4 p-8 transition-all duration-200
              ${hoveredCard === "pos"
                ? "translate-x-1 translate-y-1 border-yellow-400 bg-yellow-400 shadow-none"
                : "border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              }`}
          >
            {/* Icon */}
            <div
              className={`flex h-20 w-20 items-center justify-center border-4 border-black text-5xl transition-colors duration-200 ${
                hoveredCard === "pos" ? "bg-black text-yellow-400" : "bg-yellow-400 text-black"
              }`}
            >
              🧾
            </div>

            <div className="text-center">
              <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">
                MODE
              </div>
              <h2 className="mt-1 text-3xl font-black uppercase tracking-wider text-black">
                KASIR
              </h2>
              <p className="mt-3 text-sm font-bold text-gray-600">
                Terima pesanan, kelola transaksi, dan kirim order ke dapur secara real-time.
              </p>
            </div>

            <div
              className={`mt-2 w-full border-4 border-black py-3 text-center text-sm font-black uppercase tracking-widest transition-colors duration-200 ${
                hoveredCard === "pos" ? "bg-black text-yellow-400" : "bg-black text-yellow-400"
              }`}
            >
              MASUK SEBAGAI KASIR →
            </div>
          </div>
        </a>

        {/* Chef / KDS card */}
        <a
          href={KDS_URL}
          className="card-float-delay group block"
          onMouseEnter={() => setHoveredCard("kds")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`relative flex flex-col items-center gap-5 border-4 p-8 transition-all duration-200
              ${hoveredCard === "kds"
                ? "translate-x-1 translate-y-1 border-yellow-400 bg-yellow-400 shadow-none"
                : "border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              }`}
          >
            {/* Icon */}
            <div
              className={`flex h-20 w-20 items-center justify-center border-4 border-black text-5xl transition-colors duration-200 ${
                hoveredCard === "kds" ? "bg-black text-yellow-400" : "bg-black text-yellow-400"
              }`}
            >
              👨‍🍳
            </div>

            <div className="text-center">
              <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">
                MODE
              </div>
              <h2 className="mt-1 text-3xl font-black uppercase tracking-wider text-black">
                DAPUR
              </h2>
              <p className="mt-3 text-sm font-bold text-gray-600">
                Pantau pesanan masuk, update status memasak, dan kelola antrian dapur.
              </p>
            </div>

            <div
              className={`mt-2 w-full border-4 border-black py-3 text-center text-sm font-black uppercase tracking-widest ${
                hoveredCard === "kds" ? "bg-yellow-400 text-black" : "bg-black text-yellow-400"
              } transition-colors duration-200`}
            >
              MASUK SEBAGAI CHEF →
            </div>
          </div>
        </a>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 text-center text-xs font-bold uppercase tracking-widest text-white/30">
        © {new Date().getFullYear()} Dayun Nasgor — All rights reserved
      </div>
    </main>
  );
}
