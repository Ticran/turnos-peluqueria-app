import React from "react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/95 border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=100&q=80" 
            alt="Logo" 
            className="w-10 h-10 rounded-full object-cover border border-slate-200" 
          />
          <span className="text-xl font-medium tracking-tight text-slate-900">
            Lumen <span className="text-rose-800 font-normal">Studio</span>
          </span>
        </div>
        <div className="flex gap-6 text-sm font-medium items-center text-slate-600">
          <a href="#inicio" className="hover:text-rose-800 transition-colors hidden sm:block">Inicio</a>
          <a href="#local" className="hover:text-rose-800 transition-colors hidden sm:block">Quiénes somos</a>
          <a href="#reservar" className="text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">Reservar Turno</a>
        </div>
      </div>
    </header>
  );
}