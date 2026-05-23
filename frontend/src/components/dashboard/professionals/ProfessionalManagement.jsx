import React, { useState } from "react";
import { barbers } from "../../../data/barbers"; // Tu archivo de datos
import ProfessionalModal from "./ProfessionalModal";

export default function ProfessionalManagement({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPro, setSelectedPro] = useState(null);

  // Abrir modal para crear
  const handleAdd = () => {
    setSelectedPro(null);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (pro) => {
    setSelectedPro(pro);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-slate-900">Equipo</h1>
          <p className="text-sm text-slate-500">Gestión de profesionales.</p>
        </div>
        {role === "admin" && (
          <button 
            onClick={handleAdd}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all active:scale-95"
          >
            + Agregar Profesional
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((pro) => (
          <div key={pro.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <img src={pro.img} alt={pro.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-slate-900">{pro.name}</h3>
                <p className="text-xs text-rose-900 uppercase font-medium">{pro.role}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-bold">{pro.rating} ★</span>
              <button 
                onClick={() => handleEdit(pro)}
                className="text-xs font-medium text-slate-600 hover:text-rose-900"
              >
                Editar perfil
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProfessionalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        professional={selectedPro} 
      />
    </div>
  );
}