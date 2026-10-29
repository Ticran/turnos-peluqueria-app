import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../ui/Carddashmenu";
import CalendarCell from "./CalendarCell";
import AppointmentCard from "./AppointmentCard";
import { buildTimeRows, getAppointmentsForSlot } from "@/utils/calendar";
import { addDays, startOfWeek, toISODate, todayISO } from "@/utils/date";

const shortDate = (date) => date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });

// Agenda semanal tipo Google Calendar: filas cada 30 min según el horario del local
export default function CalendarTable({ weekStart, onWeekChange, appointments, business, showEmployee, onSelect, onEmptySlot, loading }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const rows = buildTimeRows(business?.openingTime, business?.closingTime);
  const today = todayISO();
  // Celular: se ve un día por vez (hoy si cae en la semana mostrada)
  const [pickedDay, setPickedDay] = useState(null);
  const isoDays = days.map(toISODate);
  const mobileDay = isoDays.includes(pickedDay) ? pickedDay : isoDays.includes(today) ? today : isoDays[0];
  const dayAppointments = appointments
    .filter((a) => a.date === mobileDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Card className="col-span-full overflow-hidden border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-950 tracking-tight">Agenda semanal</h3>
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

      {/* Celular: selector de día + lista de turnos */}
      <div className="md:hidden">
        <div className="grid grid-cols-7 gap-1 p-2 border-b border-slate-100 bg-slate-50">
          {days.map((day) => {
            const iso = toISODate(day);
            const count = appointments.filter((a) => a.date === iso && a.status !== "CANCELLED").length;
            const active = iso === mobileDay;
            return (
              <button key={iso} type="button" onClick={() => setPickedDay(iso)} aria-pressed={active}
                className={`py-1.5 rounded-lg text-center transition-colors ${active ? "bg-slate-900 text-white" : iso === today ? "bg-rose-50 text-rose-900" : "text-slate-600"}`}>
                <span className="block text-[10px] uppercase font-semibold">
                  {day.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "").slice(0, 3)}
                </span>
                <span className="block text-sm font-medium">{day.getDate()}</span>
                <span className={`block h-1.5 w-1.5 mx-auto mt-0.5 rounded-full ${count ? (active ? "bg-white" : "bg-rose-700") : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>
        <div className="p-3 space-y-2">
          {dayAppointments.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Sin turnos este día.</p>
          ) : (
            dayAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} showEmployee={showEmployee} onClick={() => onSelect(apt)} />
            ))
          )}
          {onEmptySlot && mobileDay >= today && (
            <button type="button" onClick={() => onEmptySlot(mobileDay)}
              className="w-full py-2.5 rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 hover:bg-slate-50">
              + Agregar turno este día
            </button>
          )}
        </div>
      </div>

      {/* Tablet y escritorio: grilla semanal */}
      <div className="hidden md:block overflow-auto max-h-[460px]">
        <table className="w-full min-w-[640px] border-collapse table-fixed bg-white">
          <thead className="sticky top-0 z-20">
            <tr className="border-b border-slate-200">
              <th className="w-14 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 sticky left-0 z-10">
                Hora
              </th>
              {days.map((day) => {
                const iso = toISODate(day);
                return (
                  <th key={iso} className={`py-1.5 text-center border-l border-slate-200 ${iso === today ? "bg-rose-50 text-rose-900" : "bg-slate-50 text-slate-700"}`}>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider">
                      {day.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "")}
                    </span>
                    <span className="block text-sm font-medium">{day.getDate()}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((time) => (
              <tr key={time} className="border-b border-slate-100 last:border-b-0">
                <td className="px-1 py-0.5 text-center text-[11px] font-medium text-slate-500 bg-slate-50 sticky left-0 z-10 align-top">
                  {time}
                </td>
                {days.map((day) => {
                  const iso = toISODate(day);
                  return (
                    <td key={iso} className={`p-0.5 border-l border-slate-100 align-top ${iso === today ? "bg-rose-50/30" : ""}`}>
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
