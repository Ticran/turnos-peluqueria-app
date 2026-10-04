import React from "react";
import { Search, Plus } from "lucide-react";

export default function AppointmentToolbar({ searchTerm, setSearchTerm, onNewAppointment }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-medium text-slate-900">Gestión de turnos</h1>
        <p className="text-sm text-slate-500">Confirmá, cancelá o registrá turnos del local.</p>
      </div>

      <div className="flex w-full md:w-auto gap-3">
        <div className="relative flex-1 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente, teléfono o servicio"
            aria-label="Buscar turnos"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]"
          />
        </div>
        <button
          type="button"
          onClick={onNewAppointment}
          className="whitespace-nowrap bg-[#800020] hover:bg-[#5e0017] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Nuevo turno
        </button>
      </div>
    </div>
  );
}
