import React from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

export default function AppointmentTable({ appointments, role }) {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 font-light">
        No hay turnos registrados con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
            <th className="p-5 font-medium">Cliente</th>
            <th className="p-5 font-medium">Servicio</th>
            <th className="p-5 font-medium">Profesional</th>
            <th className="p-5 font-medium">Fecha y Hora</th>
            <th className="p-5 font-medium">Estado</th>
            <th className="p-5 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {appointments.map((apt) => (
            <tr 
              key={apt.id} 
              className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
            >
              {/* Cliente */}
              <td className="p-5">
                <p className="text-sm font-medium text-slate-900">{apt.client}</p>
                <p className="text-xs text-slate-500 mt-0.5">{apt.phone}</p>
              </td>
              
              {/* Servicio y Pago */}
              <td className="p-5">
                <p className="text-sm text-slate-700">{apt.service}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{apt.paymentMethod}</p>
              </td>

              {/* Profesional */}
              <td className="p-5">
                <p className="text-sm text-slate-700">{apt.barber}</p>
              </td>

              {/* Fecha y Hora */}
              <td className="p-5">
                <p className="text-sm font-medium text-slate-900">{apt.date}</p>
                <p className="text-xs text-slate-500 mt-0.5">{apt.time}</p>
              </td>

              {/* Estado */}
              <td className="p-5">
                <AppointmentStatusBadge status={apt.status} />
              </td>

              {/* Acciones */}
              <td className="p-5 text-right">
                <button className="text-sm font-medium text-[#800020] hover:text-[#5e0017] opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}