import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { api } from "@/lib/api";
import { formatBookingDate } from "@/utils/date";
import { formatPrice } from "@/utils/currency";
import AppointmentStatusBadge from "@/components/dashboard/appointments/AppointmentStatusBadge";

// Página del turno para el cliente (/turno/{token}): ver detalle y cancelar sin cuenta
export default function CancelAppointment() {
  const { token } = useParams();
  const { data, loading, error, reload } = useApi(`/api/appointments/public/${token}`);
  const [cancelling, setCancelling] = useState(false);
  const [actionError, setActionError] = useState(null);

  const cancel = async () => {
    if (!window.confirm("¿Seguro que querés cancelar el turno?")) return;
    setCancelling(true);
    setActionError(null);
    try {
      await api(`/api/appointments/public/${token}/cancel`, { method: "POST" });
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = data && (data.status === "PENDING" || data.status === "CONFIRMED");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm w-full max-w-md p-6 space-y-6">
        {loading && !data ? (
          <p className="text-center text-slate-400 animate-pulse">Buscando tu turno...</p>
        ) : error && !data ? (
          <div className="text-center space-y-3">
            <p className="text-slate-600">{error}</p>
            <Link to="/" className="text-sm font-medium text-rose-800 hover:underline">Ir al inicio</Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[10px] font-medium text-rose-800 uppercase tracking-widest">Tu turno en</p>
                <h1 className="text-xl font-semibold text-slate-900">{data.businessName}</h1>
              </div>
              <AppointmentStatusBadge status={data.status} />
            </div>

            <dl className="space-y-3 text-sm">
              {[
                ["Servicio", `${data.serviceName} · ${data.serviceDuration} min · ${formatPrice(data.servicePrice)}`],
                ["Profesional", data.employeeName],
                ["Fecha y hora", formatBookingDate(data.date, data.time)],
                ["Dirección", data.address],
                ["Teléfono del local", data.businessPhone],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</dt>
                    <dd className="text-slate-800 first-letter:uppercase">{value}</dd>
                  </div>
                ))}
            </dl>

            {actionError && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-lg p-3">{actionError}</p>}

            <div className="flex flex-col gap-2">
              {canCancel && (
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={cancel}
                  className="w-full py-3 rounded-xl text-sm font-medium text-white bg-rose-800 hover:bg-rose-900 disabled:opacity-50"
                >
                  {cancelling ? "Cancelando..." : "Cancelar turno"}
                </button>
              )}
              <Link to={`/${data.businessSlug}`} className="w-full py-3 rounded-xl text-sm font-medium text-center text-slate-700 border border-slate-200 hover:bg-slate-50">
                {data.status === "CANCELLED" ? "Reservar otro turno" : "Ir a la página del local"}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
