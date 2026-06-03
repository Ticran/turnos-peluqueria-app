import React from "react";
import BarberCard from "./BarberCard";

export default function BarbersGrid({ selectedBarber, setSelectedBarber, setBookingStep, barbersList = [] }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-slate-500 font-light mb-2">
        Cada profesional posee técnicas especializadas. Elige quién moldeará tu estilo:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbersList.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 col-span-3 text-center">Cargando profesionales...</p>
        ) : (
          barbersList.map((barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              isSelected={selectedBarber?.id === barber.id}
              onSelect={() => {
                setSelectedBarber(barber);
                setBookingStep(3);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}