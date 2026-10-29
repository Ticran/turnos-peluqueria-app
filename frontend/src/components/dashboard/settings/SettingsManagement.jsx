import React, { useEffect, useState } from "react";
import Check from "lucide-react/dist/esm/icons/check";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import { api, uploadImage } from "@/lib/api";
import BlocksEditor from "../availability/BlocksEditor";
import { formatTime } from "@/utils/date";

const EMPTY_BRANCH = { name: "", address: "", phone: "" };
const WEEKDAYS = [[1, "Lun"], [2, "Mar"], [3, "Mié"], [4, "Jue"], [5, "Vie"], [6, "Sáb"], [7, "Dom"]];
const IMAGE_TYPES = "image/jpeg,image/png,image/webp";

// Guardar es casi instantáneo: una espera mínima deja ver que algo pasó
const atLeast = (promise, ms = 700) =>
  Promise.all([promise, new Promise((r) => setTimeout(r, ms))]).then(([value]) => value);

function Spinner() {
  return <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" aria-hidden="true" />;
}

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
  const [uploading, setUploading] = useState(null); // "cover" | "logo" | null
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // El aviso de guardado se va solo a los 3 segundos
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

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

  // kind: "cover" (portada) o "logo"
  const handleImage = (kind) => async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!file) return;
    setError(null);
    setUploading(kind);
    try {
      const path = kind === "logo" ? "upload-logo" : "upload-image";
      onSaved(await atLeast(uploadImage(`/api/admin/businesses/${business.id}/${path}`, file)));
      setMessage(kind === "logo" ? "Logo actualizado" : "Portada actualizada");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(null);
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
      await atLeast(api(`/api/admin/businesses/${business.id}`, { method: "PUT", body: settings }));
      await refresh("Cambios guardados");
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

      {/* Aviso flotante: se ve aunque el botón de guardar esté al final de la página */}
      <div role="status" aria-live="polite" className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 flex justify-end">
        {message && (
          <p className="flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
            <Check size={16} /> {message}
          </p>
        )}
      </div>
      <FormError>{error}</FormError>

      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 justify-between">
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
        <div className="divide-y divide-slate-100">
          <ImageRow
            title="Portada"
            hint="Recomendado: 1920 × 600 px (horizontal). JPG, PNG o WEBP, hasta 5 MB."
            label="Cambiar portada"
            busy={uploading === "cover"}
            disabled={uploading !== null}
            onChange={handleImage("cover")}
          />
          <ImageRow
            title="Logo"
            hint="Recomendado: 512 × 512 px (cuadrado). Se ve redondo en la barra de tu página."
            label={business.logoUrl ? "Cambiar logo" : "Subir logo"}
            busy={uploading === "logo"}
            disabled={uploading !== null}
            onChange={handleImage("logo")}
            preview={
              business.logoUrl
                ? <img src={business.logoUrl} alt="Logo actual" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                : <div className="w-12 h-12 rounded-full bg-slate-100 border border-dashed border-slate-300" aria-hidden="true" />
            }
          />
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Nombre del local">
            <input required name="name" value={settings.name} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Email de contacto">
            <input required type="email" name="email" value={settings.email} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Dirección web" className="md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="text-sm text-slate-400 break-all sm:whitespace-nowrap">{window.location.host}/</span>
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
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-slate-800 disabled:opacity-70">
            {saving && <Spinner />}
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>

      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
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

function ImageRow({ title, hint, label, busy, disabled, onChange, preview }) {
  return (
    <div className="p-4 flex items-center gap-4">
      {preview}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
      <label className={`inline-flex items-center gap-2 text-sm font-medium text-[#800020] whitespace-nowrap ${disabled ? "opacity-60" : "hover:underline cursor-pointer"}`}>
        {busy && <Spinner />}
        {busy ? "Subiendo..." : label}
        <input type="file" accept={IMAGE_TYPES} className="sr-only" onChange={onChange} disabled={disabled} />
      </label>
    </div>
  );
}
