import React from "react";
import { STATUS_OPTIONS } from "@/utils/appointmentHelpers";

const controlClass =
  "bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-transparent block w-full p-2.5 outline-none min-w-[150px]";

export default function AppointmentFilters({ filters, setFilters, professionals }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    { name: "from", label: "Desde", input: <input type="date" name="from" value={filters.from} max={filters.to} onChange={handleChange} className={controlClass} /> },
    { name: "to", label: "Hasta", input: <input type="date" name="to" value={filters.to} min={filters.from} onChange={handleChange} className={controlClass} /> },
    {
      name: "status",
      label: "Estado",
      input: (
        <select name="status" value={filters.status} onChange={handleChange} className={controlClass}>
          <option value="all">Todos los estados</option>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      ),
    },
    {
      name: "professional",
      label: "Profesional",
      input: (
        <select name="professional" value={filters.professional} onChange={handleChange} className={controlClass}>
          <option value="all">Todos los profesionales</option>
          {professionals.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-wrap items-end gap-4 p-5 bg-white border-b border-slate-200">
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{f.label}</span>
          {f.input}
        </label>
      ))}
    </div>
  );
}
