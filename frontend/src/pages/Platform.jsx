import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Field, { FormError, inputClass } from "@/components/ui/Field";
import useApi from "@/hooks/useApi";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const EMPTY = { name: "", email: "", phone: "", address: "", branchName: "Sucursal Central", adminName: "", adminEmail: "", adminPassword: "" };

// Panel del dueño de la plataforma (SUPER_ADMIN): alta, listado y suspensión de locales
export default function Platform() {
  const { user, logout } = useAuth();
  const { data, loading, error, reload } = useApi("/api/admin/businesses");
  const businesses = data ?? [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const { branchName, adminName, adminEmail, adminPassword, ...business } = form;
      await api("/api/admin/businesses", {
        method: "POST",
        body: { business, branchName, adminName, adminEmail, adminPassword },
      });
      setForm(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (b) => {
    const next = b.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    if (next === "SUSPENDED" && !window.confirm(`¿Suspender "${b.name}"? Su página y su panel dejan de funcionar.`)) return;
    try {
      await api(`/api/admin/businesses/${b.id}/status`, { method: "PATCH", body: { status: next } });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <span className="text-lg font-medium">Plataforma <span className="text-rose-400">de turnos</span></span>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-300 hidden sm:inline">{user.name}</span>
            <button type="button" onClick={logout} className="flex items-center gap-2 text-slate-300 hover:text-white">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-medium text-slate-900">Locales</h1>
            <p className="text-sm text-slate-500">{businesses.length} locales en la plataforma.</p>
          </div>
          <button type="button" onClick={() => setForm(EMPTY)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800">
            + Nuevo local
          </button>
        </div>

        {(error || actionError) && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">{error || actionError}</p>}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          {loading && !data ? (
            <p className="p-12 text-center text-slate-400 animate-pulse">Cargando...</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="p-4 font-medium">Local</th>
                  <th className="p-4 font-medium">Página pública</th>
                  <th className="p-4 font-medium">Contacto</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {businesses.map((b) => (
                  <tr key={b.id}>
                    <td className="p-4 font-medium text-slate-900">{b.name}</td>
                    <td className="p-4">
                      <Link to={`/${b.slug}`} target="_blank" className="text-rose-800 hover:underline">/{b.slug}</Link>
                    </td>
                    <td className="p-4 text-slate-500">{b.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${b.status === "ACTIVE" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-600 bg-slate-100 border-slate-300"}`}>
                        {b.status === "ACTIVE" ? "Activo" : "Suspendido"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button type="button" onClick={() => toggleStatus(b)} className="text-xs font-medium text-slate-600 hover:text-rose-800">
                        {b.status === "ACTIVE" ? "Suspender" : "Reactivar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {form && (
        <Modal title="Nuevo local" onClose={() => setForm(null)} maxWidth="max-w-xl">
          <form onSubmit={handleCreate} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Nombre del local">
                <input required className={inputClass} value={form.name} onChange={set("name")} />
              </Field>
              <Field label="Email del local">
                <input required type="email" className={inputClass} value={form.email} onChange={set("email")} />
              </Field>
              <Field label="Teléfono">
                <input className={inputClass} value={form.phone} onChange={set("phone")} />
              </Field>
              <Field label="Dirección">
                <input className={inputClass} value={form.address} onChange={set("address")} />
              </Field>
              <Field label="Primera sucursal" className="md:col-span-2">
                <input className={inputClass} value={form.branchName} onChange={set("branchName")} />
              </Field>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pt-2 border-t border-slate-100">Administrador del local</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Nombre">
                <input required className={inputClass} value={form.adminName} onChange={set("adminName")} />
              </Field>
              <Field label="Email">
                <input required type="email" className={inputClass} value={form.adminEmail} onChange={set("adminEmail")} />
              </Field>
              <Field label="Contraseña">
                <input required type="password" minLength={6} autoComplete="new-password" className={inputClass} value={form.adminPassword} onChange={set("adminPassword")} />
              </Field>
            </div>
            <FormError>{formError}</FormError>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setForm(null)} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
              <button type="submit" disabled={saving} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 disabled:opacity-50">
                {saving ? "Creando..." : "Crear local"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
