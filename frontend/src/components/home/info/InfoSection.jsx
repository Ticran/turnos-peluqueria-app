import React from "react";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Clock from "lucide-react/dist/esm/icons/clock";
import Phone from "lucide-react/dist/esm/icons/phone";
import InfoCard from "./InfoCard";

export default function InfoSection({ businessInfo }) {
  // Formateamos las horas para quitar segundos
  const formatTime = (timeStr) => (timeStr ? timeStr.substring(0, 5) : "--:--");

  return (
    <section className="bg-white py-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <InfoCard 
          icon={MapPin} 
          label="Ubicación" 
          value={businessInfo?.address || "Dirección no registrada"} 
        />
        <InfoCard 
          icon={Clock} 
          label="Horarios" 
          value={businessInfo ? `De ${formatTime(businessInfo.openingTime)} a ${formatTime(businessInfo.closingTime)} hs` : "Cargando..."} 
        />
        <InfoCard 
          icon={Phone} 
          label="Teléfono" 
          value={businessInfo?.phone || "Sin teléfono"} 
        />
      </div>
    </section>
  );
}