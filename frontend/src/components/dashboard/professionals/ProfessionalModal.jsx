import React from "react";

export default function ProfessionalModal({ isOpen, onClose, professional }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-5">
          {professional ? "Editar Profesional" : "Nuevo Profesional"}
        </h2>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre Completo</label>
            <input 
              type="text" 
              defaultValue={professional?.name} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-800 outline-none" 
              required 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Especialidad</label>
            <input 
              type="text" 
              defaultValue={professional?.role} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-800 outline-none" 
              required 
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition-all"
            >
              {professional ? "Guardar Cambios" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}