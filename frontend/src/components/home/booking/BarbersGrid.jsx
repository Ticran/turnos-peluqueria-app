import React from "react";
import BarberCard from "./BarberCard";
import EmptyState from "@/components/ui/EmptyState";

export default function BarbersGrid({ selectedBarber, setSelectedBarber, setSelectedTime, setBookingStep, barbersList = [], isLoading }) {
  if (isLoading) {
    return <p className="text-xs text-slate-400 py-4 text-center animate-pulse">Cargando profesionales...</p>;
  }
  if (barbersList.length === 0) {
    return <EmptyState>No hay profesionales disponibles en esta sucursal.</EmptyState>;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-slate-500 font-light mb-2">
        Cada profesional posee técnicas especializadas. Elige quién moldeará tu estilo:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {barbersList.map((barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            isSelected={selectedBarber?.id === barber.id}
            onSelect={() => {
              setSelectedBarber(barber);
              setSelectedTime(null);
              setBookingStep(3);
            }}
          />
        ))}
      </div>
    </div>
  );
}
