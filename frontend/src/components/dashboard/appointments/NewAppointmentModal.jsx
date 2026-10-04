import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import { api } from "@/lib/api";
import { todayISO } from "@/utils/date";

// Alta manual de un turno desde el panel (ej: cliente que llama por teléfono). El backend lo crea confirmado
export default function NewAppointmentModal({ business, initialDate, initialTime, onClose, onCreated }) {
  const branches = useMemo(() => business?.branches ?? [], [business]);
  const [form, setForm] = useState({
    branchId: branches[0]?.id ?? "",
    serviceId: "",
    employeeId: "",
    date: initialDate ?? todayISO(),
    time: initialTime ?? "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    observations: "",
  });
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [slots, setSlots] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  // Catálogo y equipo del negocio (una vez)
  useEffect(() => {
    Promise.all([api(`/api/services/business/${business.id}`), api(`/api/users/business/${business.id}`)])
      .then(([servicesData, teamData]) => {
        setServices(servicesData);
        setTeam(teamData);
      })
      .catch((err) => setError(err.message));
  }, [business.id]);

  // Filtrados por la sucursal elegida (sin sucursal asignada = disponibles en todas)
  const branchId = Number(form.branchId);
  const branchServices = services.filter((s) => !s.branchId || s.branchId === branchId);
  const branchTeam = team.filter((u) => !u.branchId || u.branchId === branchId);

  // Horarios libres para la combinación elegida
  useEffect(() => {
    if (!form.serviceId || !form.employeeId || !form.date) return;
    api(`/api/appointments/availability?businessId=${business.id}&employeeId=${form.employeeId}&serviceId=${form.serviceId}&date=${form.date}`)
      .then(setSlots)
      .catch(() => setSlots([]));
  }, [business.id, form.serviceId, form.employeeId, form.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api("/api/appointments", {
        method: "POST",
        body: {
          ...form,
          businessId: business.id,
          branchId: Number(form.branchId),
          serviceId: Number(form.serviceId),
          employeeId: Number(form.employeeId),
        },
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // El horario precargado (clic en la agenda) se muestra aunque todavía no llegó la disponibilidad
  const timeOptions = form.time && !slots.includes(form.time) ? [form.time, ...slots] : slots;
  const ready = form.serviceId && form.employeeId && form.date;

  return (
    <Modal title="Nuevo turno" onClose={onClose} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Cliente">
            <input required className={inputClass} placeholder="Nombre completo"
              value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
          </Field>
          <Field label="Teléfono">
            <input required type="tel" className={inputClass} placeholder="+54 9..."
              value={form.clientPhone} onChange={(e) => set("clientPhone", e.target.value)} />
          </Field>
        </div>

        {branches.length > 1 && (
          <Field label="Sucursal">
            <select required className={inputClass} value={form.branchId}
              onChange={(e) => setForm((prev) => ({ ...prev, branchId: e.target.value, serviceId: "", employeeId: "", time: "" }))}>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Servicio">
            <select required className={inputClass} value={form.serviceId} onChange={(e) => set("serviceId", e.target.value)}>
              <option value="">Seleccionar servicio</option>
              {branchServices.map((s) => (
                <option key={s.id} value={s.id}>{s.name} · {s.durationInMinutes} min</option>
              ))}
            </select>
          </Field>
          <Field label="Profesional">
            <select required className={inputClass} value={form.employeeId} onChange={(e) => set("employeeId", e.target.value)}>
              <option value="">Seleccionar profesional</option>
              {branchTeam.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Fecha">
            <input required type="date" min={todayISO()} className={inputClass}
              value={form.date} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Hora">
            <select required disabled={!ready} className={inputClass} value={form.time} onChange={(e) => set("time", e.target.value)}>
              <option value="">{ready ? (timeOptions.length ? "Elegir horario" : "Sin horarios libres") : "Elegí servicio y profesional"}</option>
              {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Email (opcional)">
          <input type="email" className={inputClass} value={form.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} />
        </Field>
        <Field label="Observaciones">
          <textarea className={`${inputClass} min-h-[70px]`} value={form.observations} onChange={(e) => set("observations", e.target.value)} />
        </Field>

        <FormError>{error}</FormError>

        <div className="pt-2 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            className="px-5 py-2 text-sm font-medium text-white bg-[#800020] hover:bg-[#5e0017] rounded-lg shadow-md active:scale-95 disabled:opacity-50">
            {saving ? "Guardando..." : "Agendar turno"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
