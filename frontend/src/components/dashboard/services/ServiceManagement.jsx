import React, { useState } from "react";
import { services } from "../../../data/services";
import ServiceModal from "./ServiceModal";

export default function ServiceManagement({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAction = (service = null) => {
    if (role !== "admin") return; // Protección simple por rol
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-slate-900">Servicios</h1>
          <p className="text-sm text-slate-500">Gestión del catálogo de servicios del salón.</p>
        </div>
        {role === "admin" && (
          <button 
            onClick={() => handleAction()}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all"
          >
            + Agregar Servicio
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900">{svc.name}</h3>
                <span className="text-xs font-bold text-[#800020] bg-rose-50 px-2 py-1 rounded-full">{svc.duration}</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{svc.desc}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-lg font-bold text-slate-900">${svc.price.toLocaleString()}</span>
              {role === "admin" && (
                <button onClick={() => handleAction(svc)} className="text-sm text-slate-600 hover:text-[#800020]">Editar</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
}