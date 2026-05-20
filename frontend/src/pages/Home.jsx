import React, { useState } from "react";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Clock from "lucide-react/dist/esm/icons/clock";
import User from "lucide-react/dist/esm/icons/user";
import Scissors from "lucide-react/dist/esm/icons/scissors";
import Check from "lucide-react/dist/esm/icons/check";
import Star from "lucide-react/dist/esm/icons/star";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Phone from "lucide-react/dist/esm/icons/phone";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Award from "lucide-react/dist/esm/icons/award";
import Coffee from "lucide-react/dist/esm/icons/coffee";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function Home() {
  // Estados para el flujo de reserva unificado (Single-Page Booking)
  const [bookingStep, setBookingStep] = useState(1); // 1: Servicio, 2: Barbero, 3: Agenda
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeCategory, setActiveCategory] = useState("todos");

  // Datos Estructurados de la Aplicación
  const categories = [
    { id: "todos", name: "Todos" },
    { id: "corte", name: "Cortes" },
    { id: "barba", name: "Barba" },
    { id: "tratamiento", name: "Tratamientos" }
  ];

  const services = [
    { id: 1, name: "Corte de Autor + Lavado", category: "corte", price: 14000, duration: "45 min", desc: "Asesoramiento de imagen, corte adaptado a tu facción y lavado premium con masajes capilares." },
    { id: 2, name: "Perfilado de Barba & Toalla Caliente", category: "barba", price: 10000, duration: "30 min", desc: "Diseño y perfilado con navaja, hidratación con aceites esenciales y tratamiento térmico tradicional." },
    { id: 3, name: "Combo Lumen (Corte + Barba)", category: "corte", price: 21000, duration: "75 min", desc: "Nuestro servicio insignia de cuidado completo. Incluye ritual de toalla caliente y café de especialidad." },
    { id: 4, name: "Exfoliación & Camuflaje de Canas", category: "tratamiento", price: 12000, duration: "40 min", desc: "Tratamiento purificante para el cuero cabelludo junto a una atenuación natural de canas." }
  ];

  const barbers = [
    { id: 1, name: "Mateo Palacios", role: "Especialista en Degradados", rating: "4.9", reviews: 142, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80" },
    { id: 2, name: "Valentina Rossi", role: "Colorista & Tijera Clásica", rating: "5.0", reviews: 98, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
    { id: 3, name: "Santiago López", role: "Experto en Barbas & Visajismo", rating: "4.8", reviews: 215, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" }
  ];

  // Simulación de los próximos 5 días disponibles (Carrusel Móvil Eficiente)
  const availableDates = [
    { id: "2026-05-21", weekday: "Jue", day: "21" },
    { id: "2026-05-22", weekday: "Vie", day: "22" },
    { id: "2026-05-23", weekday: "Sáb", day: "23" },
    { id: "2026-05-26", weekday: "Mar", day: "26" },
    { id: "2026-05-27", weekday: "Mié", day: "27" }
  ];

  // Bloques horarios categorizados por franja horaria para escaneo visual rápido
  const timeSlots = {
    mañana: [
      { time: "09:00", available: true },
      { time: "09:45", available: false },
      { time: "10:30", available: true },
      { time: "11:15", available: true }
    ],
    tarde: [
      { time: "14:15", available: true },
      { time: "15:00", available: false },
      { time: "15:45", available: true },
      { time: "16:30", available: true }
    ],
    noche: [
      { time: "18:00", available: true },
      { time: "18:45", available: true },
      { time: "19:30", available: false }
    ]
  };

  const filteredServices = activeCategory === "todos" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  // Reiniciar selección para volver a empezar el flujo de forma clara
  const handleResetBooking = () => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased flex flex-col relative selection:bg-blue-600 selection:text-white">
      
      {/* BACKGROUND ELEMENTS METICULOSOS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* NAVBAR GLOBAL DE ALTA GAMA */}
      <header className="w-full bg-white/80 border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-slate-900 rounded-xl flex items-center justify-center text-white font-serif font-black text-base shadow-md shadow-blue-600/10">
              L
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 font-serif">
              LUMEN <span className="text-blue-600 font-sans font-light tracking-normal text-lg">SALON</span>
            </span>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider items-center">
            <a href="#reservar" className="text-white bg-blue-600 px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm">Reservar Turno</a>
            <a href="#local" className="text-slate-500 hover:text-slate-900 hidden sm:block">El Local</a>
          </div>
        </div>
      </header>

      {/* COMPONENTE PRINCIPAL: PLATAFORMA DE RESERVAS CON HISTORIAL DINÁMICO */}
      <main id="reservar" className="py-8 sm:py-12 mx-auto max-w-7xl w-full px-4 sm:px-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA (8 COLUMNAS): INTERFAZ INTERACTIVA PASO A PASO */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-5 sm:p-8 space-y-8">
          
          {/* ENCABEZADO DE CONTROL DE PASOS INTERACTIVO */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest block">Módulo de Reservas</span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 uppercase">
                {bookingStep === 1 && "1. Selecciona un Servicio"}
                {bookingStep === 2 && "2. Elige tu Profesional"}
                {bookingStep === 3 && "3. Configura tu Horario"}
              </h2>
            </div>
            {/* Indicadores de Progreso Visual */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  disabled={step > bookingStep && !selectedService}
                  onClick={() => setBookingStep(step)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                    bookingStep === step
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : step < bookingStep
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-slate-50 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {step < bookingStep ? <Check size={14} strokeWidth={3} /> : step}
                </button>
              ))}
            </div>
          </div>

          {/* PASO 1: SELECCIÓN DE SERVICIOS CON FILTROS CÓMODOS */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              {/* Tabs de Categorías */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                      activeCategory === cat.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Contenedor de ServiceCards Transparentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServices.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setBookingStep(2); // Salto directo fluido al siguiente paso
                      }}
                      className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer group relative ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 ring-2 ring-blue-600/10 shadow-sm"
                          : "border-slate-200/80 hover:border-slate-300 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{service.name}</h4>
                          <span className="text-lg font-serif font-black text-slate-900 shrink-0">${service.price.toLocaleString("es-AR")}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">{service.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-400 font-medium">⏱ Duración: <strong className="text-slate-600">{service.duration}</strong></span>
                        <span className="text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Seleccionar <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 2: PRESENTACIÓN DE BARBEROS (HUMANIZADO Y CON RESEÑAS) */}
          {bookingStep === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 font-normal">Cada profesional posee técnicas especializadas. Elige quién moldeará tu estilo:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {barbers.map((barber) => {
                  const isSelected = selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setSelectedBarber(barber);
                        setBookingStep(3); // Salto automático
                      }}
                      className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/20 ring-2 ring-blue-600/10"
                          : "border-slate-200/80 hover:border-slate-300 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 border-2 border-slate-100 bg-slate-50 relative">
                        <img src={barber.img} alt={barber.name} className="w-full h-full object-cover object-top" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center text-white backdrop-blur-xs">
                            <Check size={24} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{barber.name}</h4>
                      <p className="text-[11px] text-gray-400 font-medium uppercase mt-0.5 tracking-tight">{barber.role}</p>
                      
                      {/* Integración del sistema de valoración por tarjeta */}
                      <div className="flex items-center gap-1 mt-3 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-black text-slate-800">{barber.rating}</span>
                        <span className="text-[10px] text-slate-400">({barber.reviews})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3: SELECTOR DE HORARIOS Y DÍAS ALTAMENTE VISUAL (MOBILE-FIRST) */}
          {bookingStep === 3 && (
            <div className="space-y-6">
              
              {/* Carrusel Horizontal de Días Optimizados */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Selecciona la Fecha</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelectedDate(d.id);
                          setSelectedTime(null); // Resetear hora al cambiar día
                        }}
                        className={`flex flex-col items-center justify-center p-3 w-16 h-16 rounded-2xl border text-center shrink-0 snap-start transition-all ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-tight opacity-70">{d.weekday}</span>
                        <span className="text-base font-serif font-black">{d.day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Distribución Semántica de Bloques Horarios con Código de Color */}
              {selectedDate ? (
                <div className="space-y-5 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Horarios Disponibles</label>
                  
                  {Object.entries(timeSlots).map(([zone, slots]) => (
                    <div key={zone} className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">{zone}</span>
                      <div className="grid grid-cols-4 gap-2">
                        {slots.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`py-3 rounded-xl text-xs font-black transition-all ${
                                !slot.available
                                  ? "bg-slate-100 text-slate-300 border border-slate-200/60 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10 border-blue-600"
                                  : "bg-white text-slate-800 border border-slate-200 hover:border-slate-400"
                              }`}
                            >
                              {slot.time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                  ⚠️ Por favor, selecciona un día del carrusel superior para desplegar los bloques horarios.
                </div>
              )}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA (4 COLUMNAS): RESUMEN DINÁMICO DE COMPRA (STICKY WIDGET) */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 lg:sticky lg:top-24">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-blue-400 uppercase tracking-widest block">Resumen de Cita</span>
            <h3 className="text-lg font-serif font-black uppercase tracking-tight">Detalle de tu Turno</h3>
          </div>

          {/* Cuerpo del Resumen - Mutación Dinámica de Estados */}
          <div className="space-y-4 text-xs font-medium border-y border-slate-800 py-4">
            
            {/* Ítem Servicio */}
            <div className="flex gap-3 items-start">
              <Scissors size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Servicio Solicitado</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedService ? selectedService.name : "No seleccionado"}</p>
                {selectedService && <span className="text-[11px] text-slate-400">⏱ {selectedService.duration}</span>}
              </div>
            </div>

            {/* Ítem Profesional */}
            <div className="flex gap-3 items-start">
              <User size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Barbero Asignado</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedBarber ? selectedBarber.name : "No seleccionado"}</p>
              </div>
            </div>

            {/* Ítem Agenda */}
            <div className="flex gap-3 items-start">
              <Clock size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fecha y Hora</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {selectedDate && selectedTime 
                    ? `${selectedDate.split("-")[2]} de Mayo, ${selectedTime} hs` 
                    : "Esperando agenda..."}
                </p>
              </div>
            </div>
          </div>

          {/* Bloque Transparente de Precios */}
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Neto:</span>
            <span className="text-3xl font-serif font-black text-white">
              {selectedService ? `$${selectedService.price.toLocaleString("es-AR")}` : "$0"}
            </span>
          </div>

          {/* CTA Principal Desafiante */}
          {selectedService && selectedBarber && selectedDate && selectedTime ? (
            <div className="space-y-2">
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5">
                Confirmar Reserva Inmediata
              </button>
              <button onClick={handleResetBooking} className="w-full py-2 text-[10px] uppercase font-bold text-slate-400 hover:text-white transition-colors">
                Modificar Opciones
              </button>
            </div>
          ) : (
            <button disabled className="w-full py-4 bg-slate-800 text-slate-500 font-bold uppercase text-xs tracking-widest rounded-2xl cursor-not-allowed border border-slate-800/80">
              Completa los Pasos para Reservar
            </button>
          )}
        </div>
      </main>

      {/* SECCIÓN DE IDENTIDAD: "LA BARBERÍA" (PÁGINA PRINCIPAL MÁS HUMANA) */}
      <section id="local" className="bg-white border-y border-slate-100 py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Textos de Marca Humana e Historia */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-blue-600"></span>
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase block">Cultura & Espacio</span>
            </div>
            <h2 className="text-3xl font-serif font-black text-slate-900 uppercase tracking-tight leading-none">
              Un Ritual con Identidad Propia
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              LUMEN nació bajo la premisa de devolverle al hombre el verdadero valor del ritual de cuidado personal. No somos una cadena masiva de estética rápida; somos un salón de autor donde el diseño de imagen, el perfeccionismo técnico y las conversaciones honestas se fusionan bajo un entorno premium.
            </p>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Cada sillón cuenta con instrumental de máxima gama esterilizado y líneas cosméticas importadas, asegurando confort total desde que ingresas hasta que dejas nuestra estación de trabajo.
            </p>

            {/* Microatributos de Confianza Técnica */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <ShieldCheck className="text-blue-600 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">Seguridad</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Protocolos estrictos de higiene.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <Award className="text-blue-600 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">Premium</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Líneas capilares mundiales.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <Coffee className="text-blue-600 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase">Confort</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Café e infraestructura de autor.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grilla Asimétrica con Fotos Reales del Entorno */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-2xl overflow-hidden shadow-md h-64 sm:h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" 
                alt="Estaciones del Salón" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>
            <div className="col-span-4 space-y-4 flex flex-col justify-between">
              <div className="bg-slate-900 p-4 rounded-2xl text-white flex-grow flex flex-col justify-center items-center text-center shadow-md">
                <span className="text-2xl font-serif font-black text-blue-400">1.2K+</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">Clientes Fieles</span>
              </div>
              <div className="rounded-2xl overflow-hidden h-40 shadow-sm border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400" 
                  alt="Detalle de Barbería Real" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOQUE DE ATENCIÓN LOGÍSTICA CORPORATIVA (TRANSPARENCIA) */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">Ubicación</span>
              <span className="text-xs text-slate-700 font-semibold mt-0.5 block">Avenida Siempre Viva 123, Córdoba Capital</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">Horarios</span>
              <span className="text-xs text-slate-700 font-semibold mt-0.5 block">Martes a Sábados: 09:00 a 20:00 hs</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">Teléfono</span>
              <span className="text-xs text-slate-700 font-semibold mt-0.5 block">+54 9 351 123-4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 py-10 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="text-base font-serif font-black text-white uppercase tracking-wider">
            LUMEN <span className="text-blue-500 font-sans font-light">SALON</span>
          </p>
          <div className="h-px bg-slate-900 w-16 mx-auto" />
          <p className="text-[10px] font-light text-slate-600 max-w-sm mx-auto leading-relaxed">
            © {new Date().getFullYear()} Lumen Salon. Plataforma optimizada de autogestión de reservas con protección y transparencia de datos comerciales.
          </p>
        </div>
      </footer>

    </div>
  );
}