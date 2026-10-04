import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import WeekOverview from "../components/dashboard/WeekOverview";
import AppointmentManagement from "../components/dashboard/appointments/AppointmentManagement";
import ProfessionalManagement from "../components/dashboard/professionals/ProfessionalManagement";
import ServiceManagement from "../components/dashboard/services/ServiceManagement";
import SettingsManagement from "../components/dashboard/settings/SettingsManagement";
import AvailabilityEditor from "../components/dashboard/availability/AvailabilityEditor";
import MyPhoto from "../components/dashboard/availability/MyPhoto";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function Dashboard() {
  const { user, isAdmin, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(isAdmin ? "dashboard" : "agenda");
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [business, setBusiness] = useState(null);
  const [error, setError] = useState(null);

  // Datos del negocio del usuario logueado (horarios, sucursales): los usan casi todas las secciones
  useEffect(() => {
    api(`/api/admin/businesses/${user.businessId}`)
      .then(setBusiness)
      .catch((err) => setError(err.message));
  }, [user.businessId]);

  if (!business) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500 p-6 text-center">
        {error ? `No se pudo cargar el panel: ${error}` : <span className="animate-pulse">Cargando panel...</span>}
      </div>
    );
  }

  return (
    <DashboardLayout
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isAdmin={isAdmin}
      user={user}
      businessName={business.name}
      businessSlug={business.slug}
      onLogout={logout}
      activeMenu={activeMenu}
      setActiveMenu={setActiveMenu}
    >
      {activeMenu === "dashboard" && isAdmin && <WeekOverview business={business} isAdmin />}
      {activeMenu === "agenda" && <WeekOverview business={business} isAdmin={false} />}
      {activeMenu === "disponibilidad" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">Mi perfil y disponibilidad</h1>
            <p className="text-sm text-slate-500">Tus horarios de atención y los días u horas que no vas a estar.</p>
          </div>
          <MyPhoto businessId={business.id} />
          <AvailabilityEditor business={business} employee={user} />
        </div>
      )}
      {activeMenu === "turnos" && isAdmin && <AppointmentManagement business={business} />}
      {activeMenu === "profesionales" && isAdmin && <ProfessionalManagement business={business} currentUserId={user.id} />}
      {activeMenu === "servicios" && isAdmin && <ServiceManagement business={business} />}
      {activeMenu === "configuracion" && isAdmin && <SettingsManagement business={business} onSaved={setBusiness} />}
    </DashboardLayout>
  );
}
