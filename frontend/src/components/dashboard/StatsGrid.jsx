import React from "react";
import { CalendarClock, Hourglass, Wallet, TrendingUp, CheckCircle2 } from "lucide-react";
import KPICard from "./KPICard";
import { todayISO } from "@/utils/date";
import { formatPrice } from "@/utils/currency";
import { sumPrices } from "@/utils/appointmentHelpers";

// KPIs calculados con los turnos de la semana visible
export default function StatsGrid({ appointments, isAdmin }) {
  const today = todayISO();
  const active = appointments.filter((a) => a.status !== "CANCELLED" && a.status !== "NO_SHOW");
  const todayCount = active.filter((a) => a.date === today).length;
  const pending = appointments.filter((a) => a.status === "PENDING").length;
  const completed = appointments.filter((a) => a.status === "COMPLETED");

  const cards = [
    { title: "Turnos hoy", value: todayCount, icon: CalendarClock, iconBg: "bg-blue-50 text-blue-600" },
    { title: "A confirmar (semana)", value: pending, icon: Hourglass, iconBg: "bg-amber-50 text-amber-600" },
    // Ingresos solo para ADMIN: el empleado no accede a facturación
    ...(isAdmin
      ? [
          { title: "Ingresos semana", value: formatPrice(sumPrices(completed)), icon: Wallet, iconBg: "bg-rose-50 text-rose-800" },
          { title: "Proyectado semana", value: formatPrice(sumPrices(active)), icon: TrendingUp, iconBg: "bg-purple-50 text-purple-600" },
        ]
      : [{ title: "Completados (semana)", value: completed.length, icon: CheckCircle2, iconBg: "bg-emerald-50 text-emerald-600" }]),
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4`}>
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
