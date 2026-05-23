import React, { useState } from "react";
import AppointmentToolbar from "./AppointmentToolbar";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentTable from "./AppointmentTable";
import AppointmentModal from "./AppointmentModal";
import NewAppointmentModal from "./NewAppointmentModal"; // <-- IMPORTAR

export default function AppointmentManagement({ role, appointments }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "all", professional: "all" });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false); // <-- ESTADO PARA NUEVO TURNO
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Pasamos la función para abrir el modal al Toolbar */}
      <AppointmentToolbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onNewAppointment={() => setIsNewModalOpen(true)} 
      />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <AppointmentFilters filters={filters} setFilters={setFilters} />
        <AppointmentTable 
          appointments={appointments} 
          role={role} 
          onRowClick={(apt) => { setSelectedAppointment(apt); setIsModalOpen(true); }} 
        />
      </div>

      {/* Modal de Detalle */}
      <AppointmentModal 
        appointment={selectedAppointment} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        role={role}
      />

      {/* Modal de Nuevo Turno */}
      <NewAppointmentModal 
        isOpen={isNewModalOpen} 
        onClose={() => setIsNewModalOpen(false)} 
      />

    </div>
  );
}