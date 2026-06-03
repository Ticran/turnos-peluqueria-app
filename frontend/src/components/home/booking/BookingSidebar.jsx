import React, { useState } from "react";
import BookingSummary from "./BookingSummary";

export default function BookingSidebar({ selectedService, selectedBarber, selectedDate, selectedTime, handleResetBooking }) {
  // Estados locales para los datos obligatorios del cliente sin login
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Verificamos si completó todo el proceso por pasos
  const isStepsCompleted = selectedService && selectedBarber && selectedDate && selectedTime;

  const handleConfirmarReserva = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert("Por favor, ingresá tu nombre y teléfono para agendar el turno.");
      return;
    }

    setLoading(true);

    // Mapeo perfecto compatible con las entidades e Hibernate de Spring Boot
    const payloadTurno = {
      businessId: 1, // Multi-tenant por defecto (Tenant 1 de pruebas)
      employeeId: parseInt(selectedBarber.id),
      serviceId: parseInt(selectedService.id),
      clientName: clientName,
      clientPhone: clientPhone,
      date: selectedDate,               // En formato "YYYY-MM-DD"
      time: `${selectedTime}:00`        // Le concatenamos los segundos para que lo procese LocalTime en Java
    };

    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadTurno),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al procesar la reserva en el servidor.");
        return res.json();
      })
      .then((data) => {
        alert(`¡Turno reservado con éxito para ${data.clientName}! Ya figura en la agenda.`);
        // Limpiamos los campos del formulario de contacto
        setClientName("");
        setClientPhone("");
        // Reseteamos el hook global para que la landing vuelva al Paso 1 (Servicios)
        handleResetBooking();
      })
      .catch((err) => {
        console.error("Error al guardar el turno:", err);
        alert("Hubo un problema al conectar con el servidor. Intentá de nuevo.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white sticky top-6 shadow-xl space-y-6">
      <h3 className="text-lg font-bold font-poppins tracking-tight border-b border-slate-800 pb-4 text-slate-100">
        Resumen de tu Reserva
      </h3>

      {/* Tarjeta dinámica con los datos seleccionados por el cliente */}
      <BookingSummary
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {/* Si ya seleccionó todo el flujo de pasos, habilitamos el formulario de contacto directo */}
      {isStepsCompleted ? (
        <form onSubmit={handleConfirmarReserva} className="pt-4 border-t border-slate-800 space-y-3 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#800020]">
            Datos de contacto
          </p>
          
          <div>
            <input
              required
              type="text"
              placeholder="Tu nombre completo"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-[#800020]"
            />
          </div>

          <div>
            <input
              required
              type="tel"
              placeholder="Número de teléfono (WhatsApp)"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-[#800020]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs font-medium tracking-wider text-white bg-[#800020] hover:bg-[#5e0017] rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50 uppercase font-poppins"
          >
            {loading ? "Reservando..." : "Confirmar Reserva"}
          </button>
        </form>
      ) : (
        <div className="text-center py-4 bg-slate-950/40 rounded-xl border border-slate-800/60">
          <p className="text-xs text-slate-400">
            Completá todos los pasos anteriores para confirmar tu reserva.
          </p>
        </div>
      )}
    </div>
  );
}