import React, { useState, useEffect } from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

export default function AppointmentModal({ appointment, isOpen, onClose, role }) {
  const [currentStatus, setCurrentStatus] = useState("");
  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (appointment) {
      setCurrentStatus(appointment.status);
      setObservation(appointment.observation || "");
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleSave = () => {
    // Simulación de guardado
    console.log("Actualizando turno:", { 
      id: appointment.id, 
      status: currentStatus, 
      observation 
    });
    alert("Turno actualizado correctamente");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="font-semibold text-slate-900">Gestión de Corte</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información del Cliente */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{appointment.client}</h3>
              <p className="text-sm text-slate-500">{appointment.phone}</p>
            </div>
            <AppointmentStatusBadge status={currentStatus} />
          </div>

          {/* Detalles del Servicio */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Servicio</p>
              <p className="text-sm font-bold text-slate-800">{appointment.service}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Horario</p>
              <p className="text-sm font-bold text-slate-800">{appointment.time} hs</p>
            </div>
          </div>

          {/* ABM - Solo si es empleado o admin */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cambiar Estado</label>
              <select 
                value={currentStatus} 
                onChange={(e) => setCurrentStatus(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-rose-800 outline-none"
              >
                <option value="PENDING">Pendiente</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="COMPLETED">Completado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notas sobre el corte</label>
              <textarea 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ej: Prefiere degradado con la 0.5..."
                className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-800 outline-none min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-500">Cancelar</button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}