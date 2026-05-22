import React from "react";
import Card from "../ui/Carddashmenu";
import CalendarCell from "./CalendarCell";
import { daysOfWeek, timeSlots } from "../../data/calendar";
import { getAppointmentForSlot } from "../../utils/calendar";

export default function CalendarTable({ appointments, role }) {
  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900">Agenda Semanal</h3>
        <span className="text-xs text-slate-500 font-light">Mayo 2026</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="w-20 p-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-r border-slate-100">
                Hora
              </th>
              {daysOfWeek.map((day) => (
                <th key={day.key} className="p-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-b border-slate-100 last:border-0 h-20">
                <td className="p-2 text-center text-xs font-medium text-slate-500 bg-slate-50/50 border-r border-slate-100 sticky left-0 z-10">
                  {time}
                </td>
                
                {daysOfWeek.map((day) => {
                  const apt = getAppointmentForSlot(appointments, day.key, time);
                  return (
                    <CalendarCell 
                      key={day.key}
                      appointment={apt}
                      role={role}
                    />
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