import React, { useState } from "react";
import CalendarTable from "../CalendarTable";
import { appointmentsData } from "../../../data/appointments";

export default function MyAgenda({ role }) {
  // Simulamos el ID del empleado logueado (Mateo Palacios)
  const LOGGED_EMPLOYEE_ID = "EMP-01";

  // Filtramos los turnos: Solo los que pertenecen a este peluquero
  const [myAppointments] = useState(
    appointmentsData.filter((apt) => apt.barberId === LOGGED_EMPLOYEE_ID)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-slate-900 font-poppins">
            Mi Agenda Semanal
          </h1>
          <p className="text-sm font-light text-slate-500 mt-1">
            Visualización de turnos asignados a tu perfil.
          </p>
        </div>
        
        {/* Badge identificador del empleado */}
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Sesión: Mateo Palacios
          </span>
        </div>
      </div>

      {/* Reutilizamos tu CalendarTable enviándole solo los turnos filtrados */}
      <CalendarTable appointments={myAppointments} role={role} />
    </div>
  );
}