import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import { api, uploadImage } from "@/lib/api";
import Avatar from "@/components/ui/Avatar";

// professional === null -> crear; con datos -> editar
export default function ProfessionalModal({ professional, business, onClose, onSaved }) {
  const isNew = !professional;
  const [form, setForm] = useState({
    name: professional?.name ?? "",
    email: professional?.email ?? "",
    specialty: professional?.specialty ?? "",
    role: professional?.role ?? "EMPLOYEE",
    branchId: professional?.branchId ?? business.branches[0]?.id ?? "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(professional?.photoUrl ?? null);

  // La foto se sube apenas se elige (solo al editar: el profesional tiene que existir)
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    try {
      const updated = await uploadImage(`/api/users/${professional.id}/business/${business.id}/photo`, file);
      setPhotoUrl(updated.photoUrl);
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = { ...form, branchId: Number(form.branchId), password: form.password || null };
      await api(isNew ? "/api/users" : `/api/users/${professional.id}/business/${business.id}`, {
        method: isNew ? "POST" : "PUT",
        body,
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
    <Modal title={isNew ? "Nuevo profesional" : "Editar profesional"} onClose={onClose} maxWidth="max-w-md">
      <form className="p-6 space-y-4" onSubmit={handleSubmit}>
        {!isNew && (
          <div className="flex items-center gap-4">
            <Avatar name={form.name} photoUrl={photoUrl} className="w-16 h-16 text-lg" />
            <label className="text-sm font-medium text-[#800020] hover:underline cursor-pointer">
              Cambiar foto
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handlePhoto} />
            </label>
          </div>
        )}
        <Field label="Nombre completo">
          <input required className={inputClass} value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Email (para iniciar sesión)">
          <input required type="email" className={inputClass} value={form.email} onChange={set("email")} />
        </Field>
        <Field label="Especialidad">
          <input className={inputClass} placeholder="Ej: Colorista" value={form.specialty} onChange={set("specialty")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rol">
            <select className={inputClass} value={form.role} onChange={set("role")}>
              <option value="EMPLOYEE">Empleado</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </Field>
          <Field label="Sucursal">
            <select className={inputClass} value={form.branchId} onChange={set("branchId")}>
              {business.branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
        </div>
        <Field label={isNew ? "Contraseña" : "Nueva contraseña (opcional)"}>
          <input
            type="password"
            autoComplete="new-password"
            required={isNew}
            minLength={6}
            className={inputClass}
            placeholder={isNew ? "Mínimo 6 caracteres" : "Dejar vacío para no cambiarla"}
            value={form.password}
            onChange={set("password")}
          />
        </Field>

        <FormError>{error}</FormError>

        <div className="pt-2 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50">
            {saving ? "Guardando..." : isNew ? "Agregar" : "Guardar cambios"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
