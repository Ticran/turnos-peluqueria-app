import React, { useState } from "react";
import { initialSettings } from "../../../data/settings";

export default function SettingsManagement({ role }) {
  const [settings, setSettings] = useState(initialSettings);

  if (role !== "admin") {
    return <div className="p-8 text-slate-500">No tienes permisos para acceder a esta sección.</div>;
  }

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Configuración guardada exitosamente");
    // Aquí iría la llamada a tu API
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-medium text-slate-900">Configuración</h1>
        <p className="text-sm text-slate-500">Gestiona los parámetros generales de tu negocio.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Nombre del Local</label>
            <input name="businessName" value={settings.businessName} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Email de contacto</label>
            <input name="email" value={settings.email} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Descripción</label>
            <textarea name="description" value={settings.description} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm h-20" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Apertura</label>
            <input type="time" name="openingTime" value={settings.openingTime} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Cierre</label>
            <input type="time" name="closingTime" value={settings.closingTime} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button onClick={handleSave} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}