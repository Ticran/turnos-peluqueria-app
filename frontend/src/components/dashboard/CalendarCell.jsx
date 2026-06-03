import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./appointments/AppointmentModal"; 

export default function CalendarCell({ appointment, role }) {
  // Estado local para abrir el modal de gestión
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // CAMBIADO: Ahora es un div neutro. Conservamos clases de posicionamiento necesarias.
    <div className="w-full h-full relative group">
      {appointment ? (
        <>
          {/* Envolvemos el AppointmentCard en un div clickeable */}
          <div 
            onClick={() => setIsModalOpen(true)} 
            className="cursor-pointer h-full transition-transform hover:scale-[1.02] active:scale-95"
          >
            <AppointmentCard appointment={appointment} role={role} />
          </div>

          {/* Renderizamos el Modal que el peluquero usará para hacer el ABM */}
          <AppointmentModal 
            appointment={appointment}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            role={role}
          />
        </>
      ) : (
        <div className="h-full w-full rounded-xl hover:bg-slate-50 border border-transparent hover:border-dashed hover:border-slate-200 transition-all cursor-pointer flex items-center justify-center group/cell">
          <span className="text-xs text-slate-400 opacity-0 group-hover/cell:opacity-100 transition-opacity">+</span>
        </div>
      )}
    </div>
  );
}