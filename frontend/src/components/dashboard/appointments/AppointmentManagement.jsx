import React, { useMemo, useState } from "react";
import AppointmentToolbar from "./AppointmentToolbar";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentTable from "./AppointmentTable";
import AppointmentModal from "./AppointmentModal";
import NewAppointmentModal from "./NewAppointmentModal";
import useAppointments from "@/hooks/useAppointments";
import { addDays, toISODate, todayISO } from "@/utils/date";

export default function AppointmentManagement({ business }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    professional: "all",
    from: todayISO(),
    to: toISODate(addDays(new Date(), 30)),
  });
  const { appointments, loading, error, reload } = useAppointments(business.id, filters.from, filters.to);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Profesionales que aparecen en el rango, para el filtro
  const professionals = useMemo(() => {
    const byId = new Map(appointments.map((a) => [a.employeeId, a.employeeName]));
    return [...byId].map(([id, name]) => ({ id, name }));
  }, [appointments]);

  const visible = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return appointments.filter(
      (a) =>
        (filters.status === "all" || a.status === filters.status) &&
        (filters.professional === "all" || String(a.employeeId) === filters.professional) &&
        (!term || [a.clientName, a.clientPhone, a.serviceName].some((v) => v?.toLowerCase().includes(term)))
    );
  }, [appointments, filters, searchTerm]);

  return (
    <div className="space-y-6">
      <AppointmentToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onNewAppointment={() => setIsNewModalOpen(true)}
      />

      {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">{error}</p>}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <AppointmentFilters filters={filters} setFilters={setFilters} professionals={professionals} />
        {loading ? (
          <p className="p-12 text-center text-slate-400 animate-pulse">Cargando turnos...</p>
        ) : (
          <AppointmentTable appointments={visible} onRowClick={setSelectedAppointment} />
        )}
      </div>

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          businessId={business.id}
          businessName={business.name}
          onClose={() => setSelectedAppointment(null)}
          onSaved={reload}
        />
      )}
      {isNewModalOpen && (
        <NewAppointmentModal business={business} onClose={() => setIsNewModalOpen(false)} onCreated={reload} />
      )}
    </div>
  );
}
