import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Scissors, 
  Clock, 
  Settings,
  CalendarClock,
  User
} from "lucide-react";

export const adminMenu = [
  { id: "dashboard", name: "Panel Principal", icon: LayoutDashboard },
  { id: "turnos", name: "Gestión de Turnos", icon: CalendarDays },
  { id: "profesionales", name: "Profesionales", icon: Users },
  { id: "servicios", name: "Servicios", icon: Scissors },
  { id: "horarios", name: "Horarios", icon: Clock },
  { id: "configuracion", name: "Configuración", icon: Settings },
];

export const employeeMenu = [
  { id: "agenda", name: "Mi Agenda", icon: CalendarClock },
  { id: "mis-turnos", name: "Mis Turnos", icon: CalendarDays },
  { id: "mis-servicios", name: "Mis Servicios", icon: Scissors },
  { id: "perfil", name: "Mi Perfil", icon: User },
];