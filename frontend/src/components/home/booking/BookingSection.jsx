import React from "react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Tag from "@/components/ui/Tag";
import BookingHeader from "./BookingHeader";
import CategoryTabs from "./CategoryTabs";
import ServicesGrid from "./ServicesGrid";
import BarbersGrid from "./BarbersGrid";
import DateSelector from "./DateSelector";
import TimeSlots from "./TimeSlots";
import BookingSidebar from "./BookingSidebar";

export default function BookingSection({ bookingProps }) {
  const {
    businessInfo,
    branchesList,
    selectedBranch,
    selectBranch,
    isBranchLoading,
    bookingStep,
    selectedService,
    selectedBarber,
    selectedDate,
    selectedTime,
    activeCategory,
    services,
    filteredServices,
    barbersList,
    availableSlots,
    slotsLoading,
    setBookingStep,
    setSelectedService,
    setSelectedBarber,
    setSelectedDate,
    setSelectedTime,
    setActiveCategory,
    handleResetBooking,
    confirmBooking,
  } = bookingProps;

  return (
    <main id="reservar" className="py-8 sm:py-12 mx-auto max-w-7xl w-full px-4 sm:px-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <Card className="space-y-8 overflow-hidden">
          {/* Con varias sucursales, el cliente elige primero dónde atenderse */}
          {branchesList.length > 1 && (
            <div className="space-y-3">
              <span className="text-[10px] font-medium text-rose-800 uppercase tracking-widest block">Sucursal</span>
              <div className="flex flex-wrap gap-2">
                {branchesList.map((branch) => (
                  <Tag key={branch.id} active={selectedBranch?.id === branch.id} onClick={() => selectBranch(branch)}>
                    {branch.name}
                    {branch.address && <span className="opacity-60"> · {branch.address}</span>}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {branchesList.length === 0 ? (
            <EmptyState>Este local todavía no tiene sucursales habilitadas para reservar.</EmptyState>
          ) : !selectedBranch ? (
            <EmptyState>Elegí una sucursal para ver servicios y horarios.</EmptyState>
          ) : (
            <>
              <BookingHeader
                bookingStep={bookingStep}
                setBookingStep={setBookingStep}
                selectedService={selectedService}
                selectedBarber={selectedBarber}
              />

              {bookingStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <CategoryTabs
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    services={services}
                  />
                  <ServicesGrid
                    filteredServices={filteredServices}
                    isLoading={isBranchLoading}
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
                  setSelectedTime={setSelectedTime}
                  setBookingStep={setBookingStep}
                  barbersList={barbersList}
                  isLoading={isBranchLoading}
                />
              )}

              {bookingStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <DateSelector
                    closedWeekdays={businessInfo?.closedWeekdays}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setSelectedTime={setSelectedTime}
                  />
                  <TimeSlots
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    slots={availableSlots}
                    isLoading={slotsLoading}
                  />
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      <BookingSidebar
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        handleResetBooking={handleResetBooking}
        confirmBooking={confirmBooking}
      />
    </main>
  );
}
