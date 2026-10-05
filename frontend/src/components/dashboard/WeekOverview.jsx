import React, { useState } from "react";
import StatsGrid from "./StatsGrid";
import CalendarTable from "./CalendarTable";
import SideWidget from "./SideWidget";
import AppointmentModal from "./appointments/AppointmentModal";
import NewAppointmentModal from "./appointments/NewAppointmentModal";
import useAppointments from "@/hooks/useAppointments";
import { addDays, startOfWeek, toISODate } from "@/utils/date";

// Resumen semanal. ADMIN: todo el local + alta de turnos. EMPLOYEE ("Mi Agenda"): solo sus turnos
export default function WeekOverview({ business, isAdmin }) {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const { appointments, loading, error, reload } = useAppointments(
    business.id,
    toISODate(weekStart),
    toISODate(addDays(weekStart, 6))
  );
  const [selected, setSelected] = useState(null);
  const [newSlot, setNewSlot] = useState(null); // { date, time } o {} para un turno sin horario precargado

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-slate-900">{isAdmin ? "Resumen general" : "Mi agenda"}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {isAdmin ? "Turnos, estados e ingresos del local." : "Tus turnos de la semana. Tocá uno para confirmarlo o dejar notas."}
        </p>
      </div>

      {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">{error}</p>}

      <StatsGrid appointments={appointments} isAdmin={isAdmin} />

      <div className={`grid grid-cols-1 gap-8 ${isAdmin ? "xl:grid-cols-4" : ""}`}>
        <div className={isAdmin ? "xl:col-span-3" : ""}>
          <CalendarTable
            weekStart={weekStart}
            onWeekChange={setWeekStart}
            appointments={appointments}
            business={business}
            showEmployee={isAdmin}
            loading={loading}
            onSelect={setSelected}
            onEmptySlot={isAdmin ? (date, time) => setNewSlot({ date, time }) : undefined}
          />
        </div>
        {isAdmin && (
          <SideWidget appointments={appointments} onSelect={setSelected} onNewAppointment={() => setNewSlot({})} />
        )}
      </div>

      {selected && (
        <AppointmentModal appointment={selected} businessId={business.id}
          businessName={business.name} onClose={() => setSelected(null)} onSaved={reload} />
      )}
      {newSlot && (
        <NewAppointmentModal
          business={business}
          initialDate={newSlot.date}
          initialTime={newSlot.time}
          onClose={() => setNewSlot(null)}
          onCreated={reload}
        />
      )}
    </div>
  );
}
