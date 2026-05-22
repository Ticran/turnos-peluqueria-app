import React from "react";
import { CheckCircle2, Scissors } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { getStatusCount } from "../../utils/calendar";

export default function SideWidget({ role, appointments }) {
  const counts = getStatusCount(appointments, role);

  return (
    <Card className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-6">
          {role === "admin" ? "Resumen de Estados" : "Gestión Rápida"}
        </h3>
        
        {role === "admin" && counts ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-medium text-emerald-800">Confirmados</span>
              <span className="text-xs font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md">{counts.confirmados}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-100">
              <span className="text-xs font-medium text-amber-800">Pendientes</span>
              <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded-md">{counts.pendientes}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-rose-50/50 rounded-xl border border-rose-100">
              <span className="text-xs font-medium text-rose-800">Cancelados</span>
              <span className="text-xs font-bold bg-rose-500 text-white px-2 py-0.5 rounded-md">{counts.cancelados}</span>
            </div>
          </div>
        ) : (
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
      </div>
      
      <Button className="w-full mt-6 py-3">
        {role === "admin" ? "+ Nuevo Turno" : "Actualizar Disponibilidad"}
      </Button>
    </Card>
  );
}