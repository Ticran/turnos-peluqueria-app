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
      businessId: 1, // Multi-tenant por defecto
      employeeId: parseInt(selectedBarber.id),
      serviceId: parseInt(selectedService.id),
      clientName: clientName,
      clientPhone: clientPhone,
      date: selectedDate,               // En formato "YYYY-MM-DD"
      time: `${selectedTime}:00`        // Le concatenamos los segundos para que lo procese LocalTime
    };

    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadTurno),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor al procesar la reserva");
        return res.json();
      })
      .then((data) => {
        alert(`¡Turno solicitado con éxito! Tu reserva quedó registrada como PENDIENTE. Nos comunicaremos a la brevedad. 🚀`);
        
        // Limpiamos campos locales del formulario
        setClientName("");
        setClientPhone("");
        // Reseteamos el Wizard de reserva regresando al paso 1
        handleResetBooking();
      })
      .catch((err) => {
        console.error("Error enviando el turno a PostgreSQL:", err);
        alert("No se pudo conectar con el servidor. Revisá que Spring Boot esté activo.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 lg:sticky lg:top-24">
      <BookingSummary
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        handleResetBooking={handleResetBooking}
      />

      {/* Si completó los 3 pasos, le inyectamos los inputs de contacto en la misma barra */}
      {isStepsCompleted && (
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
            {loading ? "Procesando Turno..." : "Confirmar Mi Turno real"}
          </button>
        </form>
      )}
    </div>
  );
}