import React from "react";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Clock from "lucide-react/dist/esm/icons/clock";
import Phone from "lucide-react/dist/esm/icons/phone";
import InfoCard from "./InfoCard";

export default function InfoSection() {
  return (
    <section className="bg-white py-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <InfoCard icon={MapPin} label="Ubicación" value="Avenida Siempre Viva 123, Córdoba" />
        <InfoCard icon={Clock} label="Horarios" value="Martes a Sábados: 09:00 a 20:00 hs" />
        <InfoCard icon={Phone} label="Teléfono" value="+54 9 351 123-4567" />
      </div>
    </section>
  );
}