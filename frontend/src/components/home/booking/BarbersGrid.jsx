import React from "react";
import BarberCard from "./BarberCard";
import { barbers } from "@/data/barbers";

export default function BarbersGrid({ selectedBarber, setSelectedBarber, setBookingStep }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-slate-500 font-light mb-2">
        Cada profesional posee técnicas especializadas. Elige quién moldeará tu estilo:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            isSelected={selectedBarber?.id === barber.id}
            onSelect={() => {
              setSelectedBarber(barber);
              setBookingStep(3);
            }}
          />
        ))}
      </div>
    </div>
  );
}