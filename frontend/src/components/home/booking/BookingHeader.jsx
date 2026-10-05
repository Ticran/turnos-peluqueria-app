import React from "react";
import BookingSteps from "./BookingSteps";
import { getStepTitle } from "@/utils/booking";

export default function BookingHeader({ bookingStep, setBookingStep, selectedService, selectedBarber }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-4">
      <div>
        <span className="text-[10px] font-medium text-rose-800 uppercase tracking-widest block mb-1">
          Módulo de Reservas
        </span>
        <h2 className="text-xl sm:text-2xl font-light text-slate-900">
          {getStepTitle(bookingStep)}
        </h2>
      </div>
      <BookingSteps
        bookingStep={bookingStep}
        setBookingStep={setBookingStep}
        selectedService={selectedService}
        selectedBarber={selectedBarber}
      />
    </div>
  );
}
