import React from "react";

export default function AppointmentFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-5 bg-white border-b border-slate-200">
      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Estado
        </label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent block w-full p-2.5 outline-none transition-all cursor-pointer min-w-[160px]"
        >
          <option value="all">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="CONFIRMED">Confirmado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 w-full sm:w-auto">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Profesional
        </label>
        <select
          name="professional"
          value={filters.professional}
          onChange={handleChange}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent block w-full p-2.5 outline-none transition-all cursor-pointer min-w-[160px]"
        >
          <option value="all">Todos los profesionales</option>
          <option value="EMP-01">Mateo Palacios</option>
          <option value="EMP-02">Santiago López</option>
        </select>
      </div>
    </div>
  );
}