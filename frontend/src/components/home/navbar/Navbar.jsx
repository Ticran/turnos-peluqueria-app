import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ businessName = "" }) {
  const [first, ...rest] = businessName.split(" ");

  return (
    <header className="w-full bg-white/95 border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {first?.charAt(0) || "·"}
          </div>
          <span className="text-xl font-medium tracking-tight text-slate-900 truncate">
            {first} <span className="text-rose-800 font-normal">{rest.join(" ")}</span>
          </span>
        </div>
        <div className="flex gap-6 text-sm font-medium items-center text-slate-600 shrink-0">
          <a href="#inicio" className="hover:text-rose-800 transition-colors hidden md:block">Inicio</a>
          <a href="#local" className="hover:text-rose-800 transition-colors hidden md:block">Quiénes somos</a>
          <Link to="/login" className="hover:text-rose-800 transition-colors hidden sm:block">Acceso equipo</Link>
          <a href="#reservar" className="text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">Reservar Turno</a>
        </div>
      </div>
    </header>
  );
}
