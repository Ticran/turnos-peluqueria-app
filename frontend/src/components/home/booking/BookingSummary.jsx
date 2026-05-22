import React from "react";
import Scissors from "lucide-react/dist/esm/icons/scissors";
import User from "lucide-react/dist/esm/icons/user";
import Clock from "lucide-react/dist/esm/icons/clock";
import SummaryItem from "./SummaryItem";
import BookingActions from "./BookingActions";
import { formatPrice } from "@/utils/currency";
import { formatBookingDate } from "@/utils/date";

export default function BookingSummary({ selectedService, selectedBarber, selectedDate, selectedTime, handleResetBooking }) {
  const isValid = !!(selectedService && selectedBarber && selectedDate && selectedTime);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-medium text-rose-400 uppercase tracking-widest block">Resumen</span>
        <h3 className="text-lg font-light tracking-tight">Detalle de tu Turno</h3>
      </div>

      <div className="space-y-4 text-xs font-medium border-y border-slate-800 py-5">
        <SummaryItem 
          icon={Scissors} 
          label="Servicio" 
          value={selectedService ? selectedService.name : "—"} 
        />
        <SummaryItem 
          icon={User} 
          label="Profesional" 
          value={selectedBarber ? selectedBarber.name : "—"} 
        />
        <SummaryItem 
          icon={Clock} 
          label="Fecha y Hora" 
          value={formatBookingDate(selectedDate, selectedTime)} 
        />
      </div>

      <div className="flex justify-between items-end">
        <span className="text-sm text-slate-400 font-light">Total Neto:</span>
        <span className="text-3xl font-light text-white">
          {formatPrice(selectedService ? selectedService.price : 0)}
        </span>
      </div>

      <BookingActions isValid={isValid} handleResetBooking={handleResetBooking} />
    </div>
  );
}