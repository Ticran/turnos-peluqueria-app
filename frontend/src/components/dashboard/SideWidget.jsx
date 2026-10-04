import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { getStatusCount } from "@/utils/calendar";
import { STATUS } from "@/utils/appointmentHelpers";
import { todayISO } from "@/utils/date";

// Panel lateral del resumen: estados de la semana y próximos turnos de hoy
export default function SideWidget({ appointments, onNewAppointment, onSelect }) {
  const counts = getStatusCount(appointments);
  const now = new Date().toTimeString().slice(0, 5);
  const upcoming = appointments
    .filter((a) => a.date === todayISO() && a.time >= now && (a.status === "PENDING" || a.status === "CONFIRMED"))
    .slice(0, 5);

  return (
    <Card className="p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-4">Estados de la semana</h3>
        <div className="space-y-2">
          {["CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"].map((status) => (
            <div key={status} className={`flex items-center justify-between p-3 rounded-xl border ${STATUS[status].badge}`}>
              <span className="text-xs font-medium">{STATUS[status].label}</span>
              <span className="text-xs font-bold">{counts[status.toLowerCase()]}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-900 mb-3">Próximos de hoy</h3>
        {upcoming.length === 0 ? (
          <p className="text-xs text-slate-400">No quedan turnos para hoy.</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((apt) => (
              <li key={apt.id}>
                <button type="button" onClick={() => onSelect(apt)}
                  className="w-full text-left text-xs p-2 rounded-lg hover:bg-slate-50 border border-slate-100">
                  <span className="font-semibold">{apt.time}</span> · {apt.clientName}
                  <span className="block text-slate-400">{apt.serviceName} · {apt.employeeName}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button className="w-full py-3 rounded-xl mt-auto" onClick={onNewAppointment}>
        + Nuevo turno
      </Button>
    </Card>
  );
}
