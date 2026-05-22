import React from "react";
import TimeSlotGroup from "./TimeSlotGroup";
import EmptyState from "@/components/ui/EmptyState";
import { timeSlots } from "@/data/timeSlots";

export default function TimeSlots({ selectedDate, selectedTime, setSelectedTime }) {
  if (!selectedDate) {
    return (
      <EmptyState>
        Selecciona un día del carrusel superior para ver los horarios.
      </EmptyState>
    );
  }

  return (
    <div className="space-y-5 pt-4 border-t border-slate-100">
      <label className="text-xs font-medium text-slate-600 block">Horarios Disponibles</label>
      {Object.entries(timeSlots).map(([zone, slots]) => (
        <TimeSlotGroup
          key={zone}
          zone={zone}
          slots={slots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      ))}
    </div>
  );
}