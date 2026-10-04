import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../ui/Carddashmenu";
import CalendarCell from "./CalendarCell";
import { buildTimeRows, getAppointmentsForSlot } from "@/utils/calendar";
import { addDays, startOfWeek, toISODate, todayISO } from "@/utils/date";

const shortDate = (date) => date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });

// Agenda semanal tipo Google Calendar: filas cada 30 min según el horario del local
export default function CalendarTable({ weekStart, onWeekChange, appointments, business, showEmployee, onSelect, onEmptySlot, loading }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const rows = buildTimeRows(business?.openingTime, business?.closingTime);
  const today = todayISO();

  return (
    <Card className="col-span-full overflow-hidden border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 tracking-tight">Agenda semanal</h3>
          <p className="text-xs text-slate-500">
            {shortDate(days[0])} – {shortDate(days[6])} {loading && <span className="animate-pulse">· actualizando...</span>}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Semana anterior" onClick={() => onWeekChange(addDays(weekStart, -7))}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => onWeekChange(startOfWeek(new Date()))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium">
            Hoy
          </button>
          <button type="button" aria-label="Semana siguiente" onClick={() => onWeekChange(addDays(weekStart, 7))}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse table-fixed bg-white">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="w-16 p-3 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 sticky left-0 z-10">
                Hora
              </th>
              {days.map((day) => {
                const iso = toISODate(day);
                return (
                  <th key={iso} className={`p-3 text-center border-l border-slate-200 ${iso === today ? "bg-rose-50 text-rose-900" : "bg-slate-50 text-slate-700"}`}>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider">
                      {day.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "")}
                    </span>
                    <span className="block text-lg font-light">{day.getDate()}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((time) => (
              <tr key={time} className="border-b border-slate-100 last:border-b-0">
                <td className="p-2 text-center text-xs font-medium text-slate-500 bg-slate-50 sticky left-0 z-10 align-top">
                  {time}
                </td>
                {days.map((day) => {
                  const iso = toISODate(day);
                  return (
                    <td key={iso} className={`p-1 border-l border-slate-100 align-top ${iso === today ? "bg-rose-50/30" : ""}`}>
                      <CalendarCell
                        appointments={getAppointmentsForSlot(appointments, iso, time)}
                        showEmployee={showEmployee}
                        onSelect={onSelect}
                        onEmpty={onEmptySlot && iso >= today ? () => onEmptySlot(iso, time) : undefined}
                      />
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
