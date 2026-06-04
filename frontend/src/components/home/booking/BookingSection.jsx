import React from "react";
import Card from "@/components/ui/Card";
import BookingHeader from "./BookingHeader";
import CategoryTabs from "./CategoryTabs";
import ServicesGrid from "./ServicesGrid";
import BarbersGrid from "./BarbersGrid";
import DateSelector from "./DateSelector";
import TimeSlots from "./TimeSlots";
import BookingSidebar from "./BookingSidebar";

export default function BookingSection({ bookingProps }) {
  const {
    bookingStep,
    selectedService,
    selectedBarber,
    selectedDate,
    selectedTime,
    activeCategory,
    filteredServices,
    setBookingStep,
    setSelectedService,
    setSelectedBarber,
    setSelectedDate,
    setSelectedTime,
    setActiveCategory,
    handleResetBooking,
    businessInfo, // <-- Extraemos la info del local para los horarios
    barbersList   // <-- Extraemos los peluqueros reales
  } = bookingProps;

  return (
    <main id="reservar" className="py-8 sm:py-12 mx-auto max-w-7xl w-full px-4 sm:px-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <Card className="space-y-8 overflow-hidden">
          <BookingHeader
            bookingStep={bookingStep}
            setBookingStep={setBookingStep}
            selectedService={selectedService}
          />

          {bookingStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                services={filteredServices} // <-- ACÁ PASAMOS LA DATA PARA GENERAR CATEGORÍAS
              />
              <ServicesGrid
                filteredServices={filteredServices}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                setBookingStep={setBookingStep}
              />
            </div>
          )}

          {bookingStep === 2 && (
            <BarbersGrid
              selectedBarber={selectedBarber}
              setSelectedBarber={setSelectedBarber}
              setBookingStep={setBookingStep}
              barbersList={barbersList} // <-- ACÁ VAN LOS PELUQUEROS DE LA BASE DE DATOS
            />
          )}

          {bookingStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
              />
              <TimeSlots
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                businessInfo={businessInfo} // <-- ACÁ PASAMOS LA INFO PARA LOS HORARIOS REALES
              />
            </div>
          )}
        </Card>
      </div>

      <BookingSidebar
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        handleResetBooking={handleResetBooking}
      />
    </main>
  );
}