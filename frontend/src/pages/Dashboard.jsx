import React, { useState } from "react";
import LayoutDashboard from "lucide-react/dist/esm/icons/layout-dashboard";
import CalendarDays from "lucide-react/dist/esm/icons/calendar-days";
import Users from "lucide-react/dist/esm/icons/users";
import Scissors from "lucide-react/dist/esm/icons/scissors";
import Clock from "lucide-react/dist/esm/icons/clock";
import Settings from "lucide-react/dist/esm/icons/settings";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import Bell from "lucide-react/dist/esm/icons/bell";
import Search from "lucide-react/dist/esm/icons/search";
import User from "lucide-react/dist/esm/icons/user";
import TrendingUp from "lucide-react/dist/esm/icons/trending-up";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import CalendarClock from "lucide-react/dist/esm/icons/calendar-clock";
import Wallet from "lucide-react/dist/esm/icons/wallet";
import MoreVertical from "lucide-react/dist/esm/icons/more-vertical";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Estado para simular los roles (admin o empleado) y poder probar la vista
  const [role, setRole] = useState("admin"); 
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // --- MENÚS SEGÚN ROL ---
  const adminMenu = [
    { id: "dashboard", name: "Panel Principal", icon: LayoutDashboard },
    { id: "turnos", name: "Gestión de Turnos", icon: CalendarDays },
    { id: "profesionales", name: "Profesionales", icon: Users },
    { id: "servicios", name: "Servicios", icon: Scissors },
    { id: "horarios", name: "Horarios", icon: Clock },
    { id: "configuracion", name: "Configuración", icon: Settings },
  ];

  const employeeMenu = [
    { id: "agenda", name: "Mi Agenda", icon: CalendarClock },
    { id: "mis-turnos", name: "Mis Turnos", icon: CalendarDays },
    { id: "mis-servicios", name: "Mis Servicios", icon: Scissors },
    { id: "perfil", name: "Mi Perfil", icon: User },
  ];

  const currentMenu = role === "admin" ? adminMenu : employeeMenu;

  // --- DATOS DE MUESTRA ---
  const recentAppointments = [
    { id: 1, client: "Lucas Ferrari", service: "Corte de Autor", barber: "Mateo Palacios", time: "10:30", status: "Confirmado", price: "$14.000" },
    { id: 2, client: "Martín Gómez", service: "Perfilado de Barba", barber: "Santiago López", time: "11:15", status: "Pendiente", price: "$10.000" },
    { id: 3, client: "Tomás Ruiz", service: "Combo Lumen", barber: "Mateo Palacios", time: "14:00", status: "Confirmado", price: "$21.000" },
    { id: 4, client: "Andrés Silva", service: "Colorimetría", barber: "Valentina Rossi", time: "16:30", status: "Cancelado", price: "$25.000" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden selection:bg-rose-900 selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* SIDEBAR (Izquierda) - Azul Marino Oscuro */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=100&q=80" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-slate-700 mr-3" />
          <span className="text-xl font-medium tracking-tight text-white">
            Lumen <span className="text-rose-400 font-normal">Studio</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 pl-3 block mb-3">
            {role === "admin" ? "Administración" : "Panel Personal"}
          </span>
          
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-rose-800 text-white shadow-md shadow-rose-900/20" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <LogOut size={18} />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER SUPERIOR */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          
          {/* Buscador */}
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar clientes, turnos o servicios..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm font-light outline-none focus:border-rose-800 focus:ring-1 focus:ring-rose-800 transition-all"
            />
          </div>

          {/* Acciones de usuario y Toggle de Rol */}
          <div className="flex items-center gap-6 ml-auto">
            {/* BOTÓN PARA PROBAR ROLES (Solo para desarrollo) */}
            <button 
              onClick={() => {
                setRole(role === "admin" ? "employee" : "admin");
                setActiveMenu(role === "admin" ? "agenda" : "dashboard");
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-800 text-rose-800 bg-rose-50 hover:bg-rose-800 hover:text-white transition-colors"
            >
              Cambiar a Vista {role === "admin" ? "Empleado" : "Admin"}
            </button>

            <button className="relative text-slate-400 hover:text-slate-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-800 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-rose-800 transition-colors">
                  {role === "admin" ? "Facundo" : "Mateo Palacios"}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {role === "admin" ? "Dueño / Admin" : "Barbero Principal"}
                </p>
              </div>
              <img 
                src={role === "admin" ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" : "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80"} 
                alt="Perfil" 
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" 
              />
            </div>
          </div>
        </header>

        {/* ÁREA DINÁMICA (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8">
          
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            {/* Título de la vista */}
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-slate-900">
                {role === "admin" ? "Resumen General" : "Tu Agenda de Hoy"}
              </h1>
              <p className="text-sm font-light text-slate-500 mt-1">
                {role === "admin" ? "Estadísticas y control del salón en tiempo real." : "Gestioná tus turnos, horarios y disponibilidad."}
              </p>
            </div>

            {/* TARJETAS DE ESTADÍSTICAS (Kpis) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CalendarClock size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">Turnos Hoy</p>
                  <p className="text-2xl font-semibold text-slate-900">{role === "admin" ? "24" : "8"}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">{role === "admin" ? "Clientes Nuevos" : "Finalizados"}</p>
                  <p className="text-2xl font-semibold text-slate-900">{role === "admin" ? "+12" : "3"}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center shrink-0">
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">{role === "admin" ? "Ingresos (Día)" : "Generado Hoy"}</p>
                  <p className="text-2xl font-semibold text-slate-900">{role === "admin" ? "$320k" : "$68k"}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">Rendimiento</p>
                  <p className="text-2xl font-semibold text-slate-900">+15%</p>
                </div>
              </div>
            </div>

            {/* SECCIÓN PRINCIPAL: LISTA DE TURNOS Y GRÁFICO/CALENDARIO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* TABLA DE TURNOS (Ocupa 2 columnas) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900">Próximos Turnos</h3>
                  <button className="text-xs font-semibold text-rose-800 hover:text-rose-700 transition-colors">Ver todos</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] uppercase tracking-widest text-slate-500">
                        <th className="p-4 font-medium">Cliente</th>
                        <th className="p-4 font-medium">Servicio</th>
                        {role === "admin" && <th className="p-4 font-medium">Profesional</th>}
                        <th className="p-4 font-medium">Horario</th>
                        <th className="p-4 font-medium">Estado</th>
                        <th className="p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-light text-slate-700">
                      {recentAppointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">{apt.client}</td>
                          <td className="p-4">{apt.service}</td>
                          {role === "admin" && <td className="p-4 text-xs">{apt.barber}</td>}
                          <td className="p-4 font-medium">{apt.time} hs</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              apt.status === "Confirmado" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                              apt.status === "Pendiente" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                              "bg-rose-50 text-rose-800 border border-rose-100"
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WIDGET LATERAL (Calendario o Quick Actions) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-medium text-slate-900 mb-6">
                  {role === "admin" ? "Actividad Semanal" : "Gestión Rápida"}
                </h3>
                
                {role === "admin" ? (
                  // Mockup de un gráfico de barras minimalista
                  <div className="flex items-end justify-between h-40 gap-2">
                    {["L", "M", "M", "J", "V", "S"].map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 w-full">
                        <div 
                          className="w-full bg-slate-100 rounded-t-md relative overflow-hidden group" 
                          style={{ height: "100%" }}
                        >
                          <div 
                            className="absolute bottom-0 w-full bg-slate-900 group-hover:bg-rose-800 transition-colors duration-300" 
                            style={{ height: `${Math.random() * 60 + 30}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">{day}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Quick actions para empleado
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-rose-800 hover:bg-rose-50/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-slate-400 group-hover:text-rose-800" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-rose-900">Bloquear Horario</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-rose-800 hover:bg-rose-50/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <Scissors size={18} className="text-slate-400 group-hover:text-rose-800" />
                        <span className="text-sm font-medium text-slate-700 group-hover:text-rose-900">Editar Mis Servicios</span>
                      </div>
                    </button>
                  </div>
                )}
                
                {/* Botón de acción global */}
                <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10">
                  {role === "admin" ? "+ Nuevo Turno" : "Actualizar Disponibilidad"}
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}