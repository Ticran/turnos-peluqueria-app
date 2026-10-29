import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  Settings,
  CalendarClock,
  CalendarOff,
} from "lucide-react";

export const adminMenu = [
  { id: "dashboard", name: "Panel Principal", icon: LayoutDashboard },
  { id: "turnos", name: "Gestión de Turnos", icon: CalendarDays },
  { id: "profesionales", name: "Profesionales", icon: Users },
  { id: "servicios", name: "Servicios", icon: ClipboardList },
  { id: "configuracion", name: "Configuración", icon: Settings },
];

export const employeeMenu = [
  { id: "agenda", name: "Mi Agenda", icon: CalendarClock },
  { id: "disponibilidad", name: "Mi Perfil y Horarios", icon: CalendarOff },
];
