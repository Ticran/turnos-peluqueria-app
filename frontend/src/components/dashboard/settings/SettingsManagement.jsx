import React, { useState } from "react";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import { api, uploadImage } from "@/lib/api";
import BlocksEditor from "../availability/BlocksEditor";
import { formatTime } from "@/utils/date";

const EMPTY_BRANCH = { name: "", address: "", phone: "" };
const WEEKDAYS = [[1, "Lun"], [2, "Mar"], [3, "Mié"], [4, "Jue"], [5, "Vie"], [6, "Sáb"], [7, "Dom"]];

// Datos del local y sucursales (solo ADMIN). onSaved actualiza el negocio en todo el panel
export default function SettingsManagement({ business, onSaved }) {
  const [settings, setSettings] = useState({
    name: business.name ?? "",
    slug: business.slug ?? "",
    closedWeekdays: business.closedWeekdays ?? [],
    description: business.description ?? "",
    email: business.email ?? "",
    phone: business.phone ?? "",
    address: business.address ?? "",
    openingTime: formatTime(business.openingTime),
    closingTime: formatTime(business.closingTime),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [branchForm, setBranchForm] = useState(null); // null = cerrado; { id?, name, address, phone }

  const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
  const toggleDay = (day) =>
    setSettings({
      ...settings,
      closedWeekdays: settings.closedWeekdays.includes(day)
        ? settings.closedWeekdays.filter((d) => d !== day)
        : [...settings.closedWeekdays, day],
    });

  const publicUrl = `${window.location.origin}/${business.slug}`;

  const handleCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    try {
      onSaved(await uploadImage(`/api/admin/businesses/${business.id}/upload-image`, file));
      setMessage("Portada actualizada.");
    } catch (err) {
      setError(err.message);
    }
  };

  // Después de guardar, recargamos el negocio completo (incluye sucursales actualizadas)
  const refresh = async (text) => {
    onSaved(await api(`/api/admin/businesses/${business.id}`));
    setMessage(text);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await api(`/api/admin/businesses/${business.id}`, { method: "PUT", body: settings });
      await refresh("Configuración guardada.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBranchSave = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const { id, ...body } = branchForm;
      await api(`/api/admin/businesses/${business.id}/branches${id ? `/${id}` : ""}`, { method: id ? "PUT" : "POST", body });
      setBranchForm(null);
      await refresh(id ? "Sucursal actualizada." : "Sucursal creada.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-900">Configuración</h1>
        <p className="text-sm text-slate-500">Datos que ven tus clientes en la página de reservas.</p>
      </div>

      {message && <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg p-3" role="status">{message}</p>}
      <FormError>{error}</FormError>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tu página de reservas</p>
          <a href={publicUrl} target="_blank" rel="noreferrer" className="text-rose-800 font-medium hover:underline break-all">{publicUrl}</a>
        </div>
        <button type="button" onClick={() => navigator.clipboard.writeText(publicUrl).then(() => setMessage("Link copiado."))}
          className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">
          Copiar link
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-slate-800">
          {business.imageUrl && <img src={business.imageUrl} alt="Portada actual" className="w-full h-full object-cover opacity-80" />}
        </div>
        <div className="p-4 flex justify-between items-center gap-4">
          <p className="text-xs text-slate-500">Imagen de portada de tu página (JPG, PNG o WEBP, hasta 5 MB).</p>
          <label className="text-sm font-medium text-[#800020] hover:underline cursor-pointer whitespace-nowrap">
            Cambiar portada
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleCover} />
          </label>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Nombre del local">
            <input required name="name" value={settings.name} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Email de contacto">
            <input required type="email" name="email" value={settings.email} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Dirección web" className="md:col-span-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-slate-400 whitespace-nowrap">{window.location.host}/</span>
              <input required name="slug" value={settings.slug} pattern="[a-z0-9]+(-[a-z0-9]+)*"
                title="Solo minúsculas, números y guiones" onChange={handleChange} className={inputClass} />
            </div>
          </Field>
          <Field label="Teléfono">
            <input name="phone" value={settings.phone} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Dirección">
            <input name="address" value={settings.address} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Descripción" className="md:col-span-2">
            <textarea name="description" value={settings.description} onChange={handleChange} className={`${inputClass} h-20`} />
          </Field>
          <Field label="Apertura">
            <input required type="time" name="openingTime" value={settings.openingTime} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Cierre">
            <input required type="time" name="closingTime" value={settings.closingTime} onChange={handleChange} className={inputClass} />
          </Field>
          <fieldset className="md:col-span-2 space-y-2">
            <legend className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Días cerrados</legend>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map(([day, label]) => {
                const closed = settings.closedWeekdays.includes(day);
                return (
                  <button key={day} type="button" aria-pressed={closed} onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${closed ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400">Marcados = el local no abre ese día de la semana.</p>
          </fieldset>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button type="submit" disabled={saving} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50">
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-slate-900">Sucursales</h2>
          {!branchForm && (
            <button type="button" onClick={() => setBranchForm(EMPTY_BRANCH)} className="text-sm font-medium text-[#800020] hover:text-[#5e0017]">
              + Agregar sucursal
            </button>
          )}
        </div>

        <ul className="divide-y divide-slate-100">
          {business.branches.map((b) => (
            <li key={b.id} className="py-3 flex justify-between items-center gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">{b.name}</p>
                <p className="text-xs text-slate-500">{[b.address, b.phone].filter(Boolean).join(" · ") || "Sin dirección"}</p>
              </div>
              <button type="button" onClick={() => setBranchForm(b)} className="text-xs font-medium text-slate-600 hover:text-[#800020]">
                Editar
              </button>
            </li>
          ))}
        </ul>

        {branchForm && (
          <form onSubmit={handleBranchSave} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <Field label="Nombre">
              <input required className={inputClass} value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} />
            </Field>
            <Field label="Dirección">
              <input className={inputClass} value={branchForm.address ?? ""} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} />
            </Field>
            <Field label="Teléfono">
              <input className={inputClass} value={branchForm.phone ?? ""} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} />
            </Field>
            <div className="md:col-span-3 flex justify-end gap-3">
              <button type="button" onClick={() => setBranchForm(null)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
              <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">Guardar sucursal</button>
            </div>
          </form>
        )}
      </div>

      <BlocksEditor
        business={business}
        title="Feriados y cierres"
        description="Días u horarios en que cierra todo el local. No se ofrecen turnos con ningún profesional."
      />
    </div>
  );
}
