import React from "react";
import { STATUS } from "@/utils/appointmentHelpers";

export default function AppointmentStatusBadge({ status }) {
  const config = STATUS[status] || STATUS.PENDING;

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide border whitespace-nowrap ${config.badge}`}>
      {config.label}
    </span>
  );
}
