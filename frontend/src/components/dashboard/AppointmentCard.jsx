import React from "react";
import { MoreVertical } from "lucide-react";

export default function AppointmentCard({ appointment, role }) {
  const { client, service, barber, status } = appointment;

  const themes = {
    Confirmado: "bg-emerald-50 text-emerald-900 border border-emerald-200/60",
    Pendiente: "bg-amber-50 text-amber-900 border border-amber-200/60",
    Cancelado: "bg-slate-100 text-slate-700 border border-slate-200"
  };

  return (
    <div className={`h-full w-full p-2 rounded-xl flex flex-col justify-between text-left transition-all hover:scale-[1.02] hover:shadow-sm ${themes[status] || themes.Cancelado}`}>
      <div>
        <p className="text-xs font-semibold leading-tight truncate">{client}</p>
        <p className="text-[10px] font-light opacity-80 mt-0.5 truncate">{service}</p>
      </div>
      <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5">
        <span className="text-[9px] uppercase tracking-wider font-medium truncate max-w-[70%]">
          {role === "admin" ? barber.split(' ')[0] : status}
        </span>
        <button className="text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={12} />
        </button>
      </div>
    </div>
  );
}