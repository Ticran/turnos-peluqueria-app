import React from "react";
import { CalendarClock, Users, Wallet, TrendingUp } from "lucide-react";
import KPICard from "./KPICard";

export default function StatsGrid({ role }) {
  const adminCards = [
    { title: "Turnos Hoy", value: "24", icon: CalendarClock, iconBg: "bg-blue-50 text-blue-600" },
    { title: "Clientes Nuevos", value: "+12", icon: Users, iconBg: "bg-emerald-50 text-emerald-600" },
    { title: "Ingresos (Día)", value: "$320k", icon: Wallet, iconBg: "bg-rose-50 text-rose-800" },
    { title: "Rendimiento", value: "+15%", icon: TrendingUp, iconBg: "bg-purple-50 text-purple-600" },
  ];

  const employeeCards = [
    { title: "Turnos Hoy", value: "8", icon: CalendarClock, iconBg: "bg-blue-50 text-blue-600" },
    { title: "Finalizados", value: "3", icon: Users, iconBg: "bg-emerald-50 text-emerald-600" },
    { title: "Generado Hoy", value: "$68k", icon: Wallet, iconBg: "bg-rose-50 text-rose-800" },
    { title: "Rendimiento", value: "+15%", icon: TrendingUp, iconBg: "bg-purple-50 text-purple-600" },
  ];

  const cards = role === "admin" ? adminCards : employeeCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <KPICard 
          key={idx}
          title={card.title}
          value={card.value}
          icon={card.icon}
          iconBg={card.iconBg}
        />
      ))}
    </div>
  );
}