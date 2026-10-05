import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import { api } from "@/lib/api";
import useApi from "@/hooks/useApi";
import { formatPrice } from "@/utils/currency";

export default function ServiceManagement({ business }) {
  const { data, loading, error: loadError, reload: fetchServices } = useApi(`/api/services/business/${business.id}`);
  const servicesList = data ?? [];
  const [actionError, setActionError] = useState(null);
  const error = actionError ?? loadError;
  const [editing, setEditing] = useState(undefined); // undefined = cerrado, null = nuevo, objeto = editar

  const branchName = (id) => business.branches.find((b) => b.id === id)?.name ?? "Todas las sucursales";

  // Borrado lógico: el servicio deja de ofrecerse pero los turnos pasados lo conservan
  const handleDeleteService = async (service) => {
    if (!window.confirm(`¿Dar de baja "${service.name}"?`)) return;
    try {
      await api(`/api/services/${service.id}/business/${business.id}`, { method: "DELETE" });
      fetchServices();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-medium text-slate-900">Servicios</h1>
          <p className="text-sm text-slate-500">Catálogo que ven tus clientes al reservar.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all font-medium shadow-sm"
        >
          + Agregar servicio
        </button>
      </div>

      {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl p-3">{error}</p>}

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm animate-pulse">Cargando catálogo...</div>
      ) : servicesList.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl">
          Todavía no cargaste servicios.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((svc) => (
            <div key={svc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900">{svc.name}</h3>
                  <span className="text-xs font-bold text-[#800020] bg-rose-50 px-2 py-1 rounded-full whitespace-nowrap">
                    {svc.durationInMinutes} min
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">
                  {svc.category || "General"}
                  {business.branches.length > 1 && ` · ${branchName(svc.branchId)}`}
                </p>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">{svc.description || "Sin descripción."}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">{formatPrice(svc.price)}</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setEditing(svc)} className="text-sm font-medium text-slate-600 hover:text-[#800020]">
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDeleteService(svc)} className="text-sm font-medium text-rose-500 hover:text-rose-700">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== undefined && (
        <ServiceModal service={editing} business={business} onClose={() => setEditing(undefined)} onServiceSaved={fetchServices} />
      )}
    </div>
  );
}
