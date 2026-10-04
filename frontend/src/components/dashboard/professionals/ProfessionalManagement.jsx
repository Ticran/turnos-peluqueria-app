import React, { useState } from "react";
import ProfessionalModal from "./ProfessionalModal";
import { api } from "@/lib/api";
import useApi from "@/hooks/useApi";
import Avatar from "@/components/ui/Avatar";
import Modal from "@/components/ui/Modal";
import AvailabilityEditor from "../availability/AvailabilityEditor";

export default function ProfessionalManagement({ business, currentUserId }) {
  const { data, loading, error: loadError, reload: load } = useApi(`/api/users/business/${business.id}`);
  const team = data ?? [];
  const [actionError, setActionError] = useState(null);
  const error = actionError ?? loadError;
  const [editing, setEditing] = useState(undefined); // undefined = cerrado, null = nuevo, objeto = editar
  const [scheduleFor, setScheduleFor] = useState(null);

  const branchName = (id) => business.branches.find((b) => b.id === id)?.name;

  const handleDeactivate = async (pro) => {
    if (!window.confirm(`¿Dar de baja a ${pro.name}? Sus turnos pasados se conservan.`)) return;
    try {
      await api(`/api/users/${pro.id}/business/${business.id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-medium text-slate-900">Equipo</h1>
          <p className="text-sm text-slate-500">Profesionales y administradores del local.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all active:scale-95"
        >
          + Agregar profesional
        </button>
      </div>

      {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">{error}</p>}

      {loading ? (
        <p className="text-center py-12 text-slate-400 animate-pulse">Cargando equipo...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((pro) => (
            <div key={pro.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <Avatar name={pro.name} photoUrl={pro.photoUrl} className="w-14 h-14 text-base" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{pro.name}</h3>
                  <p className="text-xs text-rose-900 uppercase font-medium truncate">{pro.specialty || "Sin especialidad"}</p>
                  <p className="text-xs text-slate-400 truncate">{pro.email}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center gap-2">
                <span className="text-[11px] text-slate-500">
                  {pro.role === "ADMIN" ? "Administrador" : "Empleado"}
                  {business.branches.length > 1 && pro.branchId && ` · ${branchName(pro.branchId)}`}
                </span>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setScheduleFor(pro)} className="text-xs font-medium text-slate-600 hover:text-rose-900">
                    Horarios
                  </button>
                  <button type="button" onClick={() => setEditing(pro)} className="text-xs font-medium text-slate-600 hover:text-rose-900">
                    Editar
                  </button>
                  {pro.id !== currentUserId && (
                    <button type="button" onClick={() => handleDeactivate(pro)} className="text-xs font-medium text-rose-500 hover:text-rose-700">
                      Dar de baja
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== undefined && (
        <ProfessionalModal
          professional={editing}
          business={business}
          onClose={() => setEditing(undefined)}
          onSaved={load}
        />
      )}

      {scheduleFor && (
        <Modal title={`Disponibilidad de ${scheduleFor.name}`} onClose={() => setScheduleFor(null)} maxWidth="max-w-3xl">
          <div className="p-6 bg-[#F8FAFC]">
            <AvailabilityEditor business={business} employee={scheduleFor} />
          </div>
        </Modal>
      )}
    </div>
  );
}
