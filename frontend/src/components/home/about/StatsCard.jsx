import React from "react";

export default function StatsCard() {
  return (
    <div className="bg-slate-900 p-4 rounded-2xl text-white flex-grow flex flex-col justify-center items-center text-center shadow-md">
      <span className="text-2xl font-light text-rose-400">1.2K+</span>
      <span className="text-[9px] uppercase font-medium tracking-widest text-slate-400 mt-1">
        Clientes Fieles
      </span>
    </div>
  );
}