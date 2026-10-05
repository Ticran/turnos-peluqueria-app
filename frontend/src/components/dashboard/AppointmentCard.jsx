import React from "react";
import { STATUS } from "@/utils/appointmentHelpers";

export default function AppointmentCard({ appointment, showEmployee, onClick }) {
  const { clientName, serviceName, employeeName, time, status } = appointment;

  return (
    <button
      type="button"
      onClick={onClick}
      title={`${time} · ${clientName} · ${serviceName} · ${STATUS[status]?.label}`}
      className={`w-full p-1.5 rounded-lg border text-left transition-all hover:shadow-sm hover:scale-[1.02] active:scale-95 ${STATUS[status]?.card ?? STATUS.PENDING.card}`}
    >
      <p className="text-[11px] font-semibold leading-tight truncate">
        {time} {clientName}
      </p>
      <p className="text-[10px] font-light opacity-80 truncate">{serviceName}</p>
      {showEmployee && (
        <p className="text-[9px] uppercase tracking-wider font-medium opacity-70 truncate">{employeeName?.split(" ")[0]}</p>
      )}
    </button>
  );
}
