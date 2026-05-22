import React from "react";
import Check from "lucide-react/dist/esm/icons/check";

export default function BookingSteps({ bookingStep, setBookingStep, selectedService }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((step) => (
        <button
          key={step}
          disabled={step > bookingStep && !selectedService}
          onClick={() => setBookingStep(step)}
          className={`w-8 h-8 rounded-full font-medium text-xs flex items-center justify-center transition-all ${
            bookingStep === step
              ? "bg-rose-800 text-white shadow-md shadow-rose-800/20"
              : step < bookingStep
              ? "bg-slate-50 text-slate-600 border border-slate-200"
              : "bg-transparent text-slate-300 border border-slate-200 cursor-not-allowed"
          }`}
        >
          {step < bookingStep ? <Check size={14} strokeWidth={2} /> : step}
        </button>
      ))}
    </div>
  );
}