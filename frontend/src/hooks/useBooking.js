import { useState, useMemo, useCallback, useEffect } from "react";

export default function useBooking() {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  // Estados para almacenar lo que viene real del Backend
  const [dbServices, setDbServices] = useState([]);
  const [dbBarbers, setDbBarbers] = useState([]);

  // 1. Petición HTTP al montar la landing para traer los servicios reales de la DB
  useEffect(() => {
    fetch("http://localhost:8080/api/services/business/1") // Tenant de pruebas ID 1
      .then((res) => {
        if (!res.ok) throw new Error("Error obteniendo servicios");
        return res.json();
      })
      .then((data) => {
        // CORREGIDO: Filtro de seguridad para que la Home oculte los dados de baja lógica
        const activos = data.filter(svc => svc.active !== false);
        setDbServices(activos);
      })
      .catch((err) => console.error("Error en servicios del backend:", err));
  }, []);

  // 2. Petición HTTP al backend para traer el equipo real de profesionales
  useEffect(() => {
    fetch("http://localhost:8080/api/employees/business/1") 
      .then((res) => {
        if (!res.ok) throw new Error("Error obteniendo empleados");
        return res.json();
      })
      .then((data) => setDbBarbers(data))
      .catch((err) => {
        console.error("Error en empleados del backend (usando fallback local):", err);
        setDbBarbers([{ id: 1, name: "Lucas Gómez", role: "BARBER", rating: 4.9, reviews: 120 }]);
      });
  }, []);

  // Filtramos las categorías de los servicios reales traídos de PostgreSQL
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