import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import { api } from "@/lib/api";
import { STATUS_OPTIONS, whatsappLink } from "@/utils/appointmentHelpers";
import { formatBookingDate } from "@/utils/date";
import { formatPrice } from "@/utils/currency";

// Detalle y gestión de un turno (ADMIN y EMPLOYEE; el backend limita al empleado a sus turnos)
export default function AppointmentModal({ appointment, businessId, businessName, onClose, onSaved }) {
  const [status, setStatus] = useState(appointment.status);
  const [observations, setObservations] = useState(appointment.observations ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const whatsappText =
    `¡Hola ${appointment.clientName}! Te confirmamos tu turno en ${businessName}: ` +
    `${appointment.serviceName} con ${appointment.employeeName} el ${formatBookingDate(appointment.date, appointment.time)}. ¡Te esperamos!`;

  const save = async (newStatus = status) => {
    setSaving(true);
    setError(null);
    try {
      await api(`/api/appointments/${appointment.id}/business/${businessId}`, {
        method: "PATCH",
        body: { status: newStatus, observations },
      });
      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Detalle del turno" onClose={onClose}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{appointment.clientName}</h3>
            <p className="text-sm text-slate-500">{appointment.clientPhone}</p>
            <a href={whatsappLink(appointment.clientPhone, whatsappText)} target="_blank" rel="noreferrer"
              className="inline-block mt-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 hover:bg-emerald-100">
              Avisar por WhatsApp
            </a>
            {appointment.clientEmail && <p className="text-sm text-slate-500">{appointment.clientEmail}</p>}
          </div>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        <dl className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
          <div>
            <dt className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Servicio</dt>
            <dd className="font-medium text-slate-800">{appointment.serviceName} · {appointment.serviceDuration} min</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Profesional</dt>
            <dd className="font-medium text-slate-800">{appointment.employeeName}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Fecha y hora</dt>
            <dd className="font-medium text-slate-800 first-letter:uppercase">{formatBookingDate(appointment.date, appointment.time)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Precio</dt>
            <dd className="font-medium text-slate-800">{formatPrice(appointment.servicePrice)}</dd>
          </div>
        </dl>

        <div className="space-y-4">
          <Field label="Estado">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Observaciones">
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Ej: Prefiere degradado con la 0.5..."
              className={`${inputClass} min-h-[90px]`}
            />
          </Field>
          <FormError>{error}</FormError>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 flex flex-wrap justify-end gap-3 bg-slate-50">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800">
          Cerrar
        </button>
        {appointment.status === "PENDING" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => save("CONFIRMED")}
            className="px-5 py-2 text-sm font-medium text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 disabled:opacity-50"
          >
            Confirmar turno
          </button>
        )}
        <button
          type="button"
          disabled={saving}
          onClick={() => save()}
          className="px-5 py-2 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </Modal>
  );
}
