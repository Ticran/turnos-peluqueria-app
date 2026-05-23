import React, { useState } from "react";

export default function NewAppointmentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    service: "",
    barber: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo turno creado (Simulado):", formData);
    // Aquí luego conectaremos con el backend
    alert("Turno agendado con éxito (Simulación)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden m-4">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="font-semibold text-slate-900 font-poppins">Agendar Nuevo Turno</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Cliente</label>
              <input 
                required
                type="text" 
                placeholder="Nombre completo"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#800020] outline-none"
                onChange={(e) => setFormData({...formData, client: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Teléfono</label>
              <input 
                required
                type="tel" 
                placeholder="+54 9..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#800020] outline-none"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Servicio</label>
              <select 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Seleccionar servicio</option>
                <option value="Corte">Corte de Autor</option>
                <option value="Barba">Perfilado de Barba</option>
                <option value="Combo">Combo Lumen</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Barbero</label>
              <select 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({...formData, barber: e.target.value})}
              >
                <option value="">Cualquier barbero</option>
                <option value="Mateo">Mateo Palacios</option>
                <option value="Santiago">Santiago López</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Fecha</label>
              <input 
                type="date" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Hora</label>
              <input 
                type="time" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[#800020] hover:bg-[#5e0017] rounded-lg shadow-md transition-all active:scale-95"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}