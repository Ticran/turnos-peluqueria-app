import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import { api } from "@/lib/api";
import { addDays, parseISODate, toISODate, todayISO } from "@/utils/date";
import Field, { FormError, inputClass } from "@/components/ui/Field";

const shortDate = (date) => date.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });

// "lun 12 oct, 10:00 – 11:00" o "lun 19 oct (todo el día)"
const describe = (block) => {
  const start = new Date(block.startAt);
  const end = new Date(block.endAt);
  const time = (d) => d.toTimeString().slice(0, 5);
  if (time(start) === "00:00" && time(end) === "00:00") {
    const lastDay = addDays(end, -1);
    return toISODate(start) === toISODate(lastDay)
      ? `${shortDate(start)} (todo el día)`
      : `${shortDate(start)} al ${shortDate(lastDay)} (todo el día)`;
  }
  return toISODate(start) === toISODate(end)
    ? `${shortDate(start)}, ${time(start)} – ${time(end)}`
    : `${shortDate(start)} ${time(start)} al ${shortDate(end)} ${time(end)}`;
};

const emptyForm = () => ({ fromDate: todayISO(), toDate: todayISO(), allDay: true, fromTime: "13:00", toTime: "14:00", reason: "" });

// employeeId null = feriados y cierres de todo el local; con empleado = sus vacaciones/descansos
export default function BlocksEditor({ business, employeeId = null, title, description }) {
  const path = `/api/schedules/business/${business.id}/blocks${employeeId ? `?employeeId=${employeeId}` : ""}`;
  const { data, loading, error, reload } = useApi(path);
  const blocks = data ?? [];
  const [form, setForm] = useState(null);
  const [actionError, setActionError] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setActionError(null);
    const startAt = `${form.fromDate}T${form.allDay ? "00:00" : form.fromTime}:00`;
    const endAt = form.allDay
      ? `${toISODate(addDays(parseISODate(form.toDate), 1))}T00:00:00`
      : `${form.toDate}T${form.toTime}:00`;
    try {
      await api(`/api/schedules/business/${business.id}/blocks`, {
        method: "POST",
        body: { employeeId, startAt, endAt, reason: form.reason || null },
      });
      setForm(null);
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDelete = async (block) => {
    if (!window.confirm("¿Borrar este bloqueo?")) return;
    try {
      await api(`/api/schedules/business/${business.id}/blocks/${block.id}`, { method: "DELETE" });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="font-medium text-slate-900">{title}</h2>
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
        {!form && (
          <button type="button" onClick={() => setForm(emptyForm())} className="text-sm font-medium text-[#800020] hover:text-[#5e0017] whitespace-nowrap">
            + Agregar
          </button>
        )}
      </div>

      {loading && !data ? (
        <p className="text-sm text-slate-400 animate-pulse">Cargando...</p>
      ) : blocks.length === 0 ? (
        <p className="text-sm text-slate-400">No hay bloqueos próximos.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {blocks.map((b) => (
            <li key={b.id} className="py-3 flex justify-between items-center gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900 first-letter:uppercase">{describe(b)}</p>
                <p className="text-xs text-slate-500">
                  {b.reason || "Sin motivo"}
                  {employeeId && b.employeeId === null && " · Cierre de todo el local"}
                </p>
              </div>
              {/* Un profesional ve los cierres del local pero no los puede borrar desde acá */}
              {b.employeeId === employeeId && (
                <button type="button" onClick={() => handleDelete(b)} className="text-xs font-medium text-rose-500 hover:text-rose-700">
                  Borrar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <FormError>{actionError || error}</FormError>

      {form && (
        <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Field label="Desde">
            <input required type="date" min={todayISO()} className={inputClass} value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value, toDate: e.target.value > form.toDate ? e.target.value : form.toDate })} />
          </Field>
          <Field label="Hasta">
            <input required type="date" min={form.fromDate} className={inputClass} value={form.toDate} onChange={set("toDate")} />
          </Field>
          {!form.allDay && (
            <>
              <Field label="Hora desde">
                <input required type="time" className={inputClass} value={form.fromTime} onChange={set("fromTime")} />
              </Field>
              <Field label="Hora hasta">
                <input required type="time" className={inputClass} value={form.toTime} onChange={set("toTime")} />
              </Field>
            </>
          )}
          <label className="col-span-2 md:col-span-4 flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={form.allDay} onChange={set("allDay")} className="accent-[#800020]" />
            Todo el día
          </label>
          <Field label="Motivo (opcional)" className="col-span-2 md:col-span-4">
            <input className={inputClass} placeholder={employeeId ? "Ej: Vacaciones, médico" : "Ej: Feriado, inventario"}
              value={form.reason} onChange={set("reason")} />
          </Field>
          <div className="col-span-2 md:col-span-4 flex justify-end gap-3">
            <button type="button" onClick={() => setForm(null)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
            <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">Guardar</button>
          </div>
        </form>
      )}
    </div>
  );
}
