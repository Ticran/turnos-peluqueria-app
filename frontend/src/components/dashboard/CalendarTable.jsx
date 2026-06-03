import React from "react";
import Card from "../ui/Carddashmenu";
import CalendarCell from "./CalendarCell";
import { daysOfWeek, timeSlots } from "../../data/calendar";
import { getAppointmentForSlot } from "../../utils/calendar";

export default function CalendarTable({ appointments, role }) {
  return (
    <Card className="col-span-full overflow-hidden border border-slate-300 shadow-sm">
      {/* Header con un borde inferior más marcado */}
      <div className="p-6 border-b border-slate-300 bg-white">
        <h3 className="text-lg font-bold text-slate-950 tracking-tight">Agenda Semanal</h3>
      </div>

      <div className="overflow-x-auto">
        {/* Tabla con líneas visibles y claras */}
        <table className="w-full border-collapse border border-slate-300 bg-white">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="w-24 p-5 text-center text-xs font-black uppercase tracking-wider text-slate-600 border-r-2 border-slate-300 bg-slate-100">
                Hora
              </th>
              {daysOfWeek.map((day) => (
                <th key={day.key} className="p-5 text-center text-xs font-black uppercase tracking-wider text-slate-800 border-r border-slate-300 last:border-r-0 bg-slate-50">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <tr key={time} className={`border-b border-slate-300 ${index === timeSlots.length - 1 ? 'border-b-0' : ''} h-28`}>
                <td className="p-4 text-center text-sm font-bold text-slate-700 border-r-2 border-slate-300 bg-slate-100 sticky left-0 z-10">
                  {time}
                </td>

                {daysOfWeek.map((day) => {
                  const apt = getAppointmentForSlot(appointments, day.key, time);
                  return (
                    // Mantenemos la estructura intacta, pero sumamos los estilos de borde que necesita la celda
                    <td
                      key={day.key}
                      className="p-1 border-r border-slate-300 last:border-r-0 align-top border-b border-slate-150"
                    >
                      <div className="h-full min-h-[100px] w-full">
                        <CalendarCell
                          appointment={apt}
                          role={role}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}