import { useState, useMemo, useCallback, useEffect } from "react";

export default function useBooking(businessId = 1) {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState(null); // NUEVO
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  const [businessInfo, setBusinessInfo] = useState(null);
  const [branchesList, setBranchesList] = useState([]); // NUEVO
  const [dbServices, setDbServices] = useState([]);
  const [dbBarbers, setDbBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Carga inicial del Negocio y sus Sucursales
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/admin/businesses/${businessId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error en el servidor: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBusinessInfo(data);
        // Si data.branches no existe o es null, le asigna un array vacío para que no rompa
        setBranchesList(data.branches || []);
      })
      .catch(err => {
        console.error("Error cargando negocio:", err);
        // Fallback: si falla la DB, podés setear un array vacío para que el componente no explote
        setBranchesList([]);
      })
      .finally(() => setIsLoading(false));
  }, [businessId]);

  // 2. Carga dinámica de Servicios y Profesionales cuando se selecciona una Sucursal
  useEffect(() => {
    if (!selectedBranch) return;

    setIsLoading(true);
    Promise.all([
      fetch(`http://localhost:8080/api/services/business/${businessId}/branch/${selectedBranch.id}`).then(res => res.json()),
      fetch(`http://localhost:8080/api/users/business/${businessId}/branch/${selectedBranch.id}`).then(res => res.json())
    ])
      .then(([servicesData, barbersData]) => {
        setDbServices(servicesData.filter(svc => svc.active !== false));
        setDbBarbers(barbersData);
      })
      .catch(err => console.error("Error sincronizando sucursal:", err))
      .finally(() => setIsLoading(false));
  }, [selectedBranch, businessId]);

  const filteredServices = useMemo(() => {
    return activeCategory === "todos"
      ? dbServices
      : dbServices.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, dbServices]);

  const handleResetBooking = useCallback(() => {
    setSelectedBranch(null);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  }, []);

  return {
    businessInfo,
    branchesList, // Lista de locales para mostrar en el paso 1
    selectedBranch,
    setSelectedBranch,
    isLoading,
    bookingStep,
    selectedService,
    selectedBarber,
    selectedDate,
    selectedTime,
    activeCategory,
    filteredServices,
    barbersList: dbBarbers,
    setBookingStep,
    setSelectedService,
    setSelectedBarber,
    setSelectedDate,
    setSelectedTime,
    setActiveCategory,
    handleResetBooking
  };
}