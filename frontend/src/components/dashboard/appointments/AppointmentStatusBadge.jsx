import React from "react";

const statusConfig = {
  PENDING: { style: "text-amber-700 bg-amber-50 border-amber-200", label: "Pendiente" },
  CONFIRMED: { style: "text-emerald-700 bg-emerald-50 border-emerald-200", label: "Confirmado" },
  CANCELLED: { style: "text-rose-700 bg-rose-50 border-rose-200", label: "Cancelado" },
  COMPLETED: { style: "text-blue-700 bg-blue-50 border-blue-200", label: "Finalizado" },
};

export default function AppointmentStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide border ${config.style}`}>
      {config.label}
    </span>
  );
}