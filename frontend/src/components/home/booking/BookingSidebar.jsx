import React from "react";
import BookingSummary from "./BookingSummary";

export default function BookingSidebar({ selectedService, selectedBarber, selectedDate, selectedTime, handleResetBooking }) {
  return (
    <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 lg:sticky lg:top-24">
      <BookingSummary
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        handleResetBooking={handleResetBooking}
      />
    </div>
  );
}