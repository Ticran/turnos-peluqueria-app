import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-center text-xs text-slate-500 mt-auto">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <p className="text-base font-medium text-white tracking-wider">
          Lumen <span className="text-rose-800 font-light">Studio</span>
        </p>
        <div className="h-px bg-slate-900 w-16 mx-auto" />
        <p className="text-[10px] font-light text-slate-600 max-w-sm mx-auto leading-relaxed">
          © {new Date().getFullYear()} Lumen Studio. Plataforma optimizada de autogestión de reservas con protección y transparencia de datos comerciales.
        </p>
      </div>
    </footer>
  );
}