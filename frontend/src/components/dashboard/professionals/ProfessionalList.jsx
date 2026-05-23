import React from "react";
import { barbers } from "@/data/barbers"; // Importamos tus datos

export default function ProfessionalList({ onEdit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {barbers.map((pro) => (
        <div key={pro.id} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
          <div className="flex items-center gap-4">
            <img 
              src={pro.img} 
              alt={pro.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-50"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{pro.name}</h3>
              <p className="text-xs text-[#800020] font-medium tracking-wide uppercase">{pro.role}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-slate-900">{pro.rating}</span>
              <span className="text-xs text-slate-400">({pro.reviews} reseñas)</span>
            </div>
            <button 
              onClick={() => onEdit(pro)}
              className="text-xs font-medium text-slate-600 hover:text-[#800020] transition-colors"
            >
              Ver agenda
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}