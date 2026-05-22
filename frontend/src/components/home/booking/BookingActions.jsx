import React from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function BookingActions({ isValid, handleResetBooking }) {
  if (!isValid) {
    return (
      <div className="pt-2">
        <PrimaryButton disabled={true}>
          Completá los pasos
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      <PrimaryButton>
        Confirmar Reserva
      </PrimaryButton>
      <SecondaryButton onClick={handleResetBooking}>
        Modificar opciones
      </SecondaryButton>
    </div>
  );
}