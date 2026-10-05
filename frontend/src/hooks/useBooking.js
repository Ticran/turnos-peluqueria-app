import { useState, useMemo, useCallback } from "react";
import { api } from "@/lib/api";
import useApi from "./useApi";

// slug: parte de la URL pública del local (/mi-peluqueria)
export default function useBooking(slug) {
  const [bookingStep, setBookingStep] = useState(1);
  const [chosenBranch, setChosenBranch] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  // 1. Negocio y sucursales. Con una sola sucursal se elige sola
  const business = useApi(`/api/public/businesses/${slug}`);
  const businessId = business.data?.id;
  const branchesList = useMemo(() => business.data?.branches ?? [], [business.data]);
  const selectedBranch = chosenBranch ?? (branchesList.length === 1 ? branchesList[0] : null);

  // 2. Servicios y profesionales de la sucursal elegida
  const branchPath = selectedBranch && businessId ? `business/${businessId}/branch/${selectedBranch.id}` : null;
  const services = useApi(branchPath && `/api/services/${branchPath}`);
  const barbers = useApi(branchPath && `/api/users/${branchPath}`);

  // 3. Horarios libres del profesional para ese servicio y día
  const slots = useApi(
    selectedService && selectedBarber && selectedDate
      ? `/api/appointments/availability?businessId=${businessId}&employeeId=${selectedBarber.id}` +
          `&serviceId=${selectedService.id}&date=${selectedDate}`
      : null
  );

  const dbServices = useMemo(() => services.data ?? [], [services.data]);
  const filteredServices = useMemo(() => {
    return activeCategory === "todos"
      ? dbServices
      : dbServices.filter((s) => s.category?.toLowerCase() === activeCategory);
  }, [activeCategory, dbServices]);

  const selectBranch = useCallback((branch) => {
    setChosenBranch(branch);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedTime(null);
    setBookingStep(1);
  }, []);

  const handleResetBooking = useCallback(() => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setActiveCategory("todos");
    setBookingStep(1);
  }, []);

  // Envía la reserva. Si el horario se ocupó mientras tanto, refresca los horarios y propaga el error
  const reloadSlots = slots.reload;
  const confirmBooking = useCallback(
    async ({ clientName, clientPhone, clientEmail }) => {
      try {
        return await api("/api/appointments", {
          method: "POST",
          body: {
            businessId,
            branchId: selectedBranch.id,
            employeeId: selectedBarber.id,
            serviceId: selectedService.id,
            date: selectedDate,
            time: selectedTime,
            clientName,
            clientPhone,
            clientEmail,
          },
        });
      } catch (err) {
        setSelectedTime(null);
        reloadSlots();
        throw err;
      }
    },
    [businessId, selectedBranch, selectedBarber, selectedService, selectedDate, selectedTime, reloadSlots]
  );

  return {
    businessInfo: business.data,
    loadError: business.error ?? services.error ?? barbers.error,
    isLoading: business.loading,
    branchesList,
    selectedBranch,
    selectBranch,
    isBranchLoading: services.loading || barbers.loading,
    bookingStep,
    selectedService,
    selectedBarber,
    selectedDate,
    selectedTime,
    activeCategory,
    services: dbServices,
    filteredServices,
    barbersList: barbers.data ?? [],
    availableSlots: slots.data ?? [],
    slotsLoading: slots.loading,
    setBookingStep,
    setSelectedService,
    setSelectedBarber,
    setSelectedDate,
    setSelectedTime,
    setActiveCategory,
    handleResetBooking,
    confirmBooking,
  };
}
