import React from "react";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import { formatLongDate } from "@/utils/date";
import { formatPrice } from "@/utils/currency";

export default function AppointmentTable({ appointments, onRowClick }) {
  if (appointments.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 font-light">
        No hay turnos con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <th className="p-4 font-medium">Cliente</th>
            <th className="p-4 font-medium">Servicio</th>
            <th className="p-4 font-medium">Profesional</th>
            <th className="p-4 font-medium">Fecha y hora</th>
            <th className="p-4 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {appointments.map((apt) => (
            <tr
              key={apt.id}
              onClick={() => onRowClick(apt)}
              onKeyDown={(e) => e.key === "Enter" && onRowClick(apt)}
              tabIndex={0}
              className="hover:bg-slate-50/80 focus:bg-slate-50 outline-none transition-colors cursor-pointer"
            >
              <td className="p-4">
                <p className="text-sm font-medium text-slate-900">{apt.clientName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{apt.clientPhone}</p>
              </td>
              <td className="p-4">
                <p className="text-sm text-slate-700">{apt.serviceName}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{formatPrice(apt.servicePrice)}</p>
              </td>
              <td className="p-4 text-sm text-slate-700">{apt.employeeName}</td>
              <td className="p-4">
                <p className="text-sm font-medium text-slate-900 first-letter:uppercase">{formatLongDate(apt.date)}</p>
                <p className="text-xs text-slate-500 mt-0.5">{apt.time} hs</p>
              </td>
              <td className="p-4">
                <AppointmentStatusBadge status={apt.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
