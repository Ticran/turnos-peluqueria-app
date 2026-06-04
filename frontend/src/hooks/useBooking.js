import { useState, useMemo, useCallback, useEffect } from "react";

// Le pasamos el businessId por parámetro (por defecto 1 para tu local de prueba)
export default function useBooking(businessId = 1) { 
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  // NUEVO: Estados para manejar la información del negocio y la carga
  const [businessInfo, setBusinessInfo] = useState(null);
  const [dbServices, setDbServices] = useState([]);
  const [dbBarbers, setDbBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Única llamada consolidada al Backend
  useEffect(() => {
    setIsLoading(true);
    
    Promise.all([
      fetch(`http://localhost:8080/api/admin/businesses/${businessId}`).then(res => res.json()),
      fetch(`http://localhost:8080/api/services/business/${businessId}`).then(res => res.json()),
      fetch(`http://localhost:8080/api/users/business/${businessId}`).then(res => res.json())
    ])
    .then(([businessData, servicesData, barbersData]) => {
      setBusinessInfo(businessData); // Acá viene el nombre real de la peluquería
      setDbServices(servicesData.filter(svc => svc.active !== false)); 
      setDbBarbers(barbersData); // 100% real, sin datos de prueba
    })
    .catch(err => console.error("Error crítico sincronizando con el backend:", err))
    .finally(() => setIsLoading(false));

  }, [businessId]);

  const filteredServices = useMemo(() => {
    return activeCategory === "todos"
      ? dbServices
      : dbServices.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, dbServices]);

  const handleResetBooking = useCallback(() => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  }, []);

  return {
    businessInfo, // Exportamos los datos del local para el HeroSection y el Header
    isLoading,    // Exportamos el estado de carga para mostrar un Spinner si hace falta
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