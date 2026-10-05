import React, { useMemo } from "react";
import TimeSlotGroup from "./TimeSlotGroup";
import EmptyState from "@/components/ui/EmptyState";

// slots: horarios libres que calcula el backend, ej. ["09:00", "09:30", ...]
export default function TimeSlots({ selectedDate, selectedTime, setSelectedTime, slots = [], isLoading }) {
  const groups = useMemo(() => {
    const result = { Mañana: [], Tarde: [], Noche: [] };
    for (const time of slots) {
      const hour = Number(time.slice(0, 2));
      if (hour < 12) result.Mañana.push(time);
      else if (hour < 18) result.Tarde.push(time);
      else result.Noche.push(time);
    }
    return Object.entries(result).filter(([, list]) => list.length > 0);
  }, [slots]);

  if (!selectedDate) {
    return <EmptyState>Selecciona un día del carrusel superior para ver los horarios.</EmptyState>;
  }
  if (isLoading) {
    return <p className="text-xs text-slate-400 py-4 text-center animate-pulse">Buscando horarios libres...</p>;
  }
  if (groups.length === 0) {
    return <EmptyState>No quedan horarios libres ese día. Probá con otra fecha o profesional.</EmptyState>;
  }

  return (
    <div className="space-y-5 pt-4 border-t border-slate-100">
      <label className="text-xs font-medium text-slate-600 block">Horarios Disponibles</label>
      {groups.map(([zone, times]) => (
        <TimeSlotGroup
          key={zone}
          zone={zone}
          slots={times}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      ))}
    </div>
  );
}
