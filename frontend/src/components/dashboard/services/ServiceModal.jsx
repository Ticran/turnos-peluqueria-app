import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import { api } from "@/lib/api";

const CATEGORIES = ["General", "Corte", "Barba", "Color", "Tratamiento", "Uñas", "Tatuaje"];

// service === null -> crear; con datos -> editar
export default function ServiceModal({ service, business, onClose, onServiceSaved }) {
  const [form, setForm] = useState({
    name: service?.name ?? "",
    price: service?.price ?? "",
    durationInMinutes: service?.durationInMinutes ?? "",
    description: service?.description ?? "",
    category: service?.category ?? "General",
    branchId: service?.branchId ?? business.branches[0]?.id ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api(service ? `/api/services/${service.id}/business/${business.id}` : "/api/services", {
        method: service ? "PUT" : "POST",
        body: {
          ...form,
          price: Number(form.price),
          durationInMinutes: Number(form.durationInMinutes),
          branchId: Number(form.branchId),
        },
      });
      onServiceSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Mantiene una categoría que no esté en la lista (ej: cargada antes desde otro lado)
  const categories = CATEGORIES.includes(form.category) ? CATEGORIES : [form.category, ...CATEGORIES];

  return (
    <Modal title={service ? "Editar servicio" : "Nuevo servicio"} onClose={onClose} maxWidth="max-w-md">
      <form className="p-6 space-y-4" onSubmit={handleSubmit}>
        <Field label="Nombre del servicio">
          <input required className={inputClass} placeholder="Ej. Corte de Autor + Perfilado" value={form.name} onChange={set("name")} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Precio ($)">
            <input required type="number" min="0" step="any" className={inputClass} placeholder="Ej. 4500" value={form.price} onChange={set("price")} />
          </Field>
          <Field label="Duración (min)">
            <input required type="number" min="5" step="5" className={inputClass} placeholder="Ej. 30" value={form.durationInMinutes} onChange={set("durationInMinutes")} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Categoría">
            <select className={inputClass} value={form.category} onChange={set("category")}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Sucursal">
            <select className={inputClass} value={form.branchId} onChange={set("branchId")}>
              {business.branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Descripción">
          <textarea className={`${inputClass} h-24 resize-none`} placeholder="Qué incluye el servicio..." value={form.description} onChange={set("description")} />
        </Field>

        <FormError>{error}</FormError>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700">
            Cancelar
          </button>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm shadow-sm disabled:opacity-50">
            {submitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
