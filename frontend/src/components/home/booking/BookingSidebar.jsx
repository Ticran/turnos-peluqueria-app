import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookingSummary from "./BookingSummary";
import { formatBookingDate } from "@/utils/date";

const inputClass =
  "w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-[#800020]";

export default function BookingSidebar({ selectedService, selectedBarber, selectedDate, selectedTime, handleResetBooking, confirmBooking }) {
  // Datos del cliente: no tiene cuenta, solo deja nombre y teléfono (email opcional)
  const [client, setClient] = useState({ clientName: "", clientPhone: "", clientEmail: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [booked, setBooked] = useState(null);

  const isStepsCompleted = selectedService && selectedBarber && selectedDate && selectedTime;

  const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const appointment = await confirmBooking(client);
      setBooked(appointment);
      setClient({ clientName: "", clientPhone: "", clientEmail: "" });
      handleResetBooking();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white lg:sticky lg:top-24 shadow-xl space-y-6">
      <h3 className="text-lg font-light tracking-tight border-b border-slate-800 pb-4 text-slate-100">
        Resumen de tu Reserva
      </h3>

      {booked ? (
        <div className="space-y-4 animate-fade-in" role="status">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">¡Turno solicitado!</p>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {booked.clientName}, reservaste <strong className="text-white font-medium">{booked.serviceName}</strong> con{" "}
            {booked.employeeName} el {formatBookingDate(booked.date, booked.time)}.
          </p>
          <p className="text-xs text-slate-400 font-light">
            El local lo va a confirmar a la brevedad{booked.clientEmail ? " y te avisamos por email" : ""}.
          </p>
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <p className="text-[11px] text-slate-400">Guardá este link para ver o cancelar tu turno:</p>
            <Link to={`/turno/${booked.cancelToken}`} className="text-xs text-rose-300 hover:text-rose-200 break-all underline">
              {`${window.location.origin}/turno/${booked.cancelToken}`}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setBooked(null)}
            className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Reservar otro turno
          </button>
        </div>
      ) : (
        <>
          <BookingSummary
            selectedService={selectedService}
            selectedBarber={selectedBarber}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />

          {isStepsCompleted ? (
            <form onSubmit={handleConfirmarReserva} className="pt-4 border-t border-slate-800 space-y-3 animate-fade-in">
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">Datos de contacto</p>

              <input required name="clientName" type="text" autoComplete="name" placeholder="Tu nombre completo"
                value={client.clientName} onChange={handleChange} className={inputClass} />
              <input required name="clientPhone" type="tel" autoComplete="tel" placeholder="Teléfono (WhatsApp)"
                value={client.clientPhone} onChange={handleChange} className={inputClass} />
              <input name="clientEmail" type="email" autoComplete="email" placeholder="Email (opcional)"
                value={client.clientEmail} onChange={handleChange} className={inputClass} />

              {error && <p className="text-xs text-rose-300 bg-rose-950/40 border border-rose-900 rounded-xl p-2.5">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-medium tracking-wider text-white bg-[#800020] hover:bg-[#5e0017] rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50 uppercase"
              >
                {loading ? "Reservando..." : "Confirmar Reserva"}
              </button>
              <button type="button" onClick={handleResetBooking} className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors">
                Modificar opciones
              </button>
            </form>
          ) : (
            <div className="text-center py-4 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <p className="text-xs text-slate-400">Completá los pasos para confirmar tu reserva.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
