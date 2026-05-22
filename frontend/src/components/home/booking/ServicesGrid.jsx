import React from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ filteredServices, selectedService, setSelectedService, setBookingStep }) {
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