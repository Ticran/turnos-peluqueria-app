import React from "react";
import StatsCard from "./StatsCard";

export default function AboutGallery() {
  return (
    <div className="lg:col-span-6 grid grid-cols-12 gap-4">
      <div className="col-span-8 rounded-2xl overflow-hidden shadow-sm h-64 sm:h-80 relative group">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" 
          alt="Estaciones del Salón" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="col-span-4 space-y-4 flex flex-col justify-between">
        <StatsCard />
        <div className="rounded-2xl overflow-hidden h-40 shadow-sm border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400" 
            alt="Detalle de Barbería Real" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}