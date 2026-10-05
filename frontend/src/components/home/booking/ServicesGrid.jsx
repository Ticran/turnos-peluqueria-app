import React from "react";
import ServiceCard from "./ServiceCard";
import EmptyState from "@/components/ui/EmptyState";

export default function ServicesGrid({ filteredServices, isLoading, selectedService, setSelectedService, setBookingStep }) {
  if (isLoading) {
    return <p className="text-xs text-slate-400 py-4 text-center animate-pulse">Cargando servicios...</p>;
  }
  if (filteredServices.length === 0) {
    return <EmptyState>No hay servicios disponibles en esta sucursal.</EmptyState>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isSelected={selectedService?.id === service.id}
          onSelect={() => {
            setSelectedService(service);
            setBookingStep(2);
          }}
        />
      ))}
    </div>
  );
}
