import React, { useMemo } from "react";
import TimeSlotGroup from "./TimeSlotGroup";
import EmptyState from "@/components/ui/EmptyState";

// Agregamos 'businessInfo' para saber a qué hora abre y cierra tu peluquería
export default function TimeSlots({ selectedDate, selectedTime, setSelectedTime, businessInfo }) {
  
  // Generador automático de horarios en rangos de 30 minutos
  const dynamicTimeSlots = useMemo(() => {
    if (!businessInfo?.openingTime || !businessInfo?.closingTime) return {};

    const slots = { Mañana: [], Tarde: [], Noche: [] };
    
    // Usamos una fecha cualquiera solo para iterar sobre las horas
    let currentTime = new Date(`2000-01-01T${businessInfo.openingTime}`);
    const endTime = new Date(`2000-01-01T${businessInfo.closingTime}`);

    while (currentTime < endTime) {
      const hours = currentTime.getHours();
      const mins = currentTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours.toString().padStart(2, '0')}:${mins}`;

      // Agrupamos visualmente
      if (hours < 12) slots.Mañana.push({ id: timeString, time: timeString });
      else if (hours < 18) slots.Tarde.push({ id: timeString, time: timeString });
      else slots.Noche.push({ id: timeString, time: timeString });

      // Avanza el reloj 30 minutos
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    // Borra los grupos vacíos (ej: si abre a las 14:00, no muestra el título "Mañana")
    Object.keys(slots).forEach(key => {
      if (slots[key].length === 0) delete slots[key];
    });

    return slots;
  }, [businessInfo]);

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
      {Object.entries(dynamicTimeSlots).map(([zone, slots]) => (
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