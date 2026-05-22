import React from "react";
import AppointmentCard from "./AppointmentCard";

export default function CalendarCell({ appointment, role }) {
  return (
    <td className="p-1.5 vertical-align-top border-r border-slate-50 last:border-r-0 relative group">
      {appointment ? (
        <AppointmentCard appointment={appointment} role={role} />
      ) : (
        <div className="h-full w-full rounded-xl hover:bg-slate-50 border border-transparent hover:border-dashed hover:border-slate-200 transition-all cursor-pointer flex items-center justify-center group/cell">
          <span className="text-xs text-slate-400 opacity-0 group-hover/cell:opacity-100 transition-opacity">+</span>
        </div>
      )}
    </td>
  );
}