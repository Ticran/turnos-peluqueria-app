import React from "react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative w-full h-[260px] bg-slate-900 flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover opacity-30" 
          alt="Interior del local" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left">
        <h1 className="text-3xl sm:text-4xl font-light text-white mb-2 tracking-tight">
          Lumen <span className="font-semibold text-rose-400">Studio</span>
        </h1>
        <p className="max-w-lg text-slate-300 text-sm leading-relaxed font-light">
          Un espacio profesional dedicado a potenciar tu imagen. Combinamos técnica, precisión y un ambiente diseñado para tu comodidad.
        </p>
      </div>
    </section>
  );
}