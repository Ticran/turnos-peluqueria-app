import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsGrid from "../components/dashboard/StatsGrid";
import CalendarTable from "../components/dashboard/CalendarTable";
import SideWidget from "../components/dashboard/SideWidget";
import { appointmentsData } from "../data/appointments";

export default function Dashboard() {
  const [role, setRole] = useState("admin"); 
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [appointments] = useState(appointmentsData);

  return (
    <DashboardLayout
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      role={role}
      setRole={setRole}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
    >
      {/* Encabezado Dinámico de la Página */}
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-slate-900">
          {role === "admin" ? "Resumen General" : "Tu Agenda de Hoy"}
        </h1>
        <p className="text-sm font-light text-slate-500 mt-1">
          {role === "admin" ? "Estadísticas y control del salón en tiempo real." : "Gestioná tus turnos, horarios y disponibilidad."}
        </p>
      </div>

      {/* Grid de KPIs Atómicos */}
      <StatsGrid role={role} />

      {/* Espacio de trabajo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CalendarTable appointments={appointments} role={role} />
        <SideWidget role={role} appointments={appointments} />
      </div>
    </DashboardLayout>
  );
}