import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsGrid from "../components/dashboard/StatsGrid";
import CalendarTable from "../components/dashboard/CalendarTable";
import SideWidget from "../components/dashboard/SideWidget";
import AppointmentManagement from "../components/dashboard/appointments/AppointmentManagement";
import ProfessionalManagement from "../components/dashboard/professionals/ProfessionalManagement";
import ServiceManagement from "../components/dashboard/services/ServiceManagement";
import { appointmentsData } from "../data/appointments";
import SettingsManagement from "../components/dashboard/settings/SettingsManagement";
import MyAgenda from "../components/dashboard/agenda/MyAgenda";

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
      {/* 1. Dashboard General (ESTO ES LO QUE FALTABA) */}
      {activeMenu === "dashboard" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">Resumen General</h1>
            <p className="text-sm text-slate-500 mt-1">Estadísticas y control del salón en tiempo real.</p>
          </div>
          <StatsGrid role={role} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CalendarTable appointments={appointments} role={role} />
            <SideWidget role={role} appointments={appointments} />
          </div>
        </div>
      )}

      {/* 2. Gestión de Servicios */}
      {activeMenu === "servicios" && (
        <ServiceManagement role={role} />
      )}

      {/* 3. Gestión de Turnos */}
      {activeMenu === "turnos" && (
        <AppointmentManagement role={role} appointments={appointments} />
      )}

      {/* 4. Gestión de Profesionales */}
      {activeMenu === "profesionales" && (
        <ProfessionalManagement role={role} />
      )}
      
      {activeMenu === "configuracion" && <SettingsManagement role={role} />}

      {activeMenu === "agenda" && (
        <MyAgenda role={role} />
      )}
    </DashboardLayout>
  );
}