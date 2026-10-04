import React from "react";
import Scissors from "lucide-react/dist/esm/icons/scissors";
import User from "lucide-react/dist/esm/icons/user";
import Clock from "lucide-react/dist/esm/icons/clock";
import SummaryItem from "./SummaryItem";
import { formatPrice } from "@/utils/currency";
import { formatBookingDate } from "@/utils/date";

export default function BookingSummary({ selectedService, selectedBarber, selectedDate, selectedTime }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-xs font-medium border-b border-slate-800 pb-5">
        <SummaryItem
          icon={Scissors}
          label="Servicio"
          value={selectedService ? `${selectedService.name} · ${selectedService.durationInMinutes} min` : "—"}
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
        <span className="text-sm text-slate-400 font-light">Total:</span>
        <span className="text-3xl font-light text-white">
          {formatPrice(selectedService?.price)}
        </span>
      </div>
    </div>
  );
}
