import { useState, useMemo, useCallback } from "react";
import { services } from "@/data/services";

export default function useBooking() {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredServices = useMemo(() => {
    return activeCategory === "todos"
      ? services
      : services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleResetBooking = useCallback(() => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  }, []);

  return {
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
    handleResetBooking
  };
}