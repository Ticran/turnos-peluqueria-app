import React from "react";
import AppointmentCard from "./AppointmentCard";

// Celda de 30 min: puede tener varios turnos (distintos profesionales) o estar libre
export default function CalendarCell({ appointments, showEmployee, onSelect, onEmpty }) {
  if (appointments.length === 0) {
    if (!onEmpty) return <div className="min-h-10" />;
    return (
      <button
        type="button"
        onClick={onEmpty}
        aria-label="Agregar turno en este horario"
        className="w-full min-h-10 rounded-lg text-slate-400 text-sm opacity-0 hover:opacity-100 focus:opacity-100 hover:bg-slate-50 border border-dashed border-slate-200 transition-opacity"
      >
        +
      </button>
    );
  }

  return (
    <div className="space-y-1">
      {appointments.map((apt) => (
        <AppointmentCard key={apt.id} appointment={apt} showEmployee={showEmployee} onClick={() => onSelect(apt)} />
      ))}
    </div>
  );
}
