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
  const [bookingStep, setBookingStep] = useState(1);
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased flex flex-col relative selection:bg-rose-900 selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* NAVBAR GLOBAL DE ALTA GAMA */}
      <header className="w-full bg-white/95 border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Logo del local a la izquierda */}
            <img 
              src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=100&q=80" 
              alt="Logo" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200" 
            />
            <span className="text-xl font-medium tracking-tight text-slate-900">
              Lumen <span className="text-rose-800 font-normal">Studio</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm font-medium items-center text-slate-600">
            <a href="#inicio" className="hover:text-rose-800 transition-colors hidden sm:block">Inicio</a>
            <a href="#local" className="hover:text-rose-800 transition-colors hidden sm:block">Quiénes somos</a>
            <a href="#reservar" className="text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">Reservar Turno</a>
          </div>
        </div>
      </header>

      {/* PORTADA (HERO) - Formal, de menor altura y alineada a la izquierda */}
      <section id="inicio" className="relative w-full h-[260px] bg-slate-900 flex flex-col justify-center overflow-hidden">
        {/* Capa de imagen y degradé oscuro */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover opacity-30" 
            alt="Interior del local" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        {/* Contenido alineado a la izquierda */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left">
          <h1 className="text-3xl sm:text-4xl font-light text-white mb-2 tracking-tight">
            Lumen <span className="font-semibold text-rose-400">Studio</span>
          </h1>
          <p className="max-w-lg text-slate-300 text-sm leading-relaxed font-light">
            Un espacio profesional dedicado a potenciar tu imagen. Combinamos técnica, precisión y un ambiente diseñado para tu comodidad.
          </p>
        </div>
      </section>

      {/* COMPONENTE PRINCIPAL: PLATAFORMA DE RESERVAS CON HISTORIAL DINÁMICO */}
      <main id="reservar" className="py-8 sm:py-12 mx-auto max-w-7xl w-full px-4 sm:px-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA (8 COLUMNAS): INTERFAZ INTERACTIVA PASO A PASO */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-5 sm:p-8 space-y-8">
          
          {/* ENCABEZADO DE CONTROL DE PASOS INTERACTIVO */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-medium text-rose-800 uppercase tracking-widest block mb-1">Módulo de Reservas</span>
              <h2 className="text-xl sm:text-2xl font-light text-slate-900">
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
                  className={`w-8 h-8 rounded-full font-medium text-xs flex items-center justify-center transition-all ${
                    bookingStep === step
                      ? "bg-rose-800 text-white shadow-md shadow-rose-800/20"
                      : step < bookingStep
                      ? "bg-slate-50 text-slate-600 border border-slate-200"
                      : "bg-transparent text-slate-300 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  {step < bookingStep ? <Check size={14} strokeWidth={2} /> : step}
                </button>
              ))}
            </div>
          </div>

          {/* PASO 1: SELECCIÓN DE SERVICIOS CON FILTROS CÓMODOS */}
          {bookingStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Tabs de Categorías */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide border transition-all ${
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
                          ? "border-rose-800 bg-rose-50/20 ring-1 ring-rose-800/20 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-base font-semibold text-slate-900 group-hover:text-rose-800 transition-colors">{service.name}</h4>
                          <span className="text-lg font-light text-slate-900 shrink-0">${service.price.toLocaleString("es-AR")}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">{service.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 text-[11px]">
                        <span className="text-slate-400 font-medium">⏱ Duración: <strong className="text-slate-600">{service.duration}</strong></span>
                        <span className="text-rose-800 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-slate-500 font-light mb-2">Cada profesional posee técnicas especializadas. Elige quién moldeará tu estilo:</p>
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
                          ? "border-rose-800 bg-rose-50/20 ring-1 ring-rose-800/20"
                          : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-slate-50 shadow-sm relative">
                        <img src={barber.img} alt={barber.name} className="w-full h-full object-cover object-top" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-rose-900/30 flex items-center justify-center text-white backdrop-blur-[1px]">
                            <Check size={24} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900">{barber.name}</h4>
                      <p className="text-[11px] text-slate-500 font-light mt-0.5">{barber.role}</p>
                      
                      {/* Integración del sistema de valoración por tarjeta */}
                      <div className="flex items-center gap-1 mt-3 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-medium text-slate-800">{barber.rating}</span>
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
            <div className="space-y-6 animate-fade-in">
              
              {/* Carrusel Horizontal de Días Optimizados */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-slate-600 block">Selecciona la Fecha</label>
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
                        className={`flex flex-col items-center justify-center p-3 w-16 h-20 rounded-2xl border text-center shrink-0 snap-start transition-all ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-[10px] font-medium uppercase tracking-tight opacity-70 mb-1">{d.weekday}</span>
                        <span className="text-lg font-light">{d.day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Distribución Semántica de Bloques Horarios con Código de Color */}
              {selectedDate ? (
                <div className="space-y-5 pt-4 border-t border-slate-100">
                  <label className="text-xs font-medium text-slate-600 block">Horarios Disponibles</label>
                  
                  {Object.entries(timeSlots).map(([zone, slots]) => (
                    <div key={zone} className="space-y-2">
                      <span className="text-[10px] font-medium uppercase text-slate-400 tracking-widest block">{zone}</span>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {slots.map((slot) => {
                          const isSelected = selectedTime === slot.time;
                          return (
                            <button
                              key={slot.time}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                                !slot.available
                                  ? "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-rose-800 text-white shadow-md shadow-rose-800/10 border-rose-800"
                                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-400"
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
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-500 font-light">
                  Selecciona un día del carrusel superior para ver los horarios.
                </div>
              )}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA (4 COLUMNAS): RESUMEN DINÁMICO DE COMPRA (STICKY WIDGET) */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6 lg:sticky lg:top-24">
          <div className="space-y-1">
            <span className="text-[10px] font-medium text-rose-400 uppercase tracking-widest block">Resumen</span>
            <h3 className="text-lg font-light tracking-tight">Detalle de tu Turno</h3>
          </div>

          {/* Cuerpo del Resumen - Mutación Dinámica de Estados */}
          <div className="space-y-4 text-xs font-medium border-y border-slate-800 py-5">
            
            {/* Ítem Servicio */}
            <div className="flex gap-4 items-start">
              <Scissors size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Servicio</span>
                <p className="text-sm font-medium text-white">{selectedService ? selectedService.name : "—"}</p>
              </div>
            </div>

            {/* Ítem Profesional */}
            <div className="flex gap-4 items-start">
              <User size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Profesional</span>
                <p className="text-sm font-medium text-white">{selectedBarber ? selectedBarber.name : "—"}</p>
              </div>
            </div>

            {/* Ítem Agenda */}
            <div className="flex gap-4 items-start">
              <Clock size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Fecha y Hora</span>
                <p className="text-sm font-medium text-white">
                  {selectedDate && selectedTime 
                    ? `${selectedDate.split("-")[2]} de Mayo, ${selectedTime} hs` 
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Bloque Transparente de Precios */}
          <div className="flex justify-between items-end">
            <span className="text-sm text-slate-400 font-light">Total Neto:</span>
            <span className="text-3xl font-light text-white">
              {selectedService ? `$${selectedService.price.toLocaleString("es-AR")}` : "$0"}
            </span>
          </div>

          {/* CTA Principal Desafiante */}
          {selectedService && selectedBarber && selectedDate && selectedTime ? (
            <div className="space-y-3 pt-2">
              <button className="w-full py-3.5 bg-rose-800 hover:bg-rose-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-900/20 transition-all hover:-translate-y-0.5">
                Confirmar Reserva
              </button>
              <button onClick={handleResetBooking} className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors font-light">
                Modificar opciones
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <button disabled className="w-full py-3.5 bg-slate-800/50 text-slate-500 font-medium text-sm rounded-xl cursor-not-allowed border border-slate-800">
                Completá los pasos
              </button>
            </div>
          )}
        </div>
      </main>

      {/* SECCIÓN DE IDENTIDAD ORIGINAL DE TU CÓDIGO (SOLO AJUSTÉ COLORES Y FUENTE) */}
      <section id="local" className="bg-white border-y border-slate-100 py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-slate-900"></span>
              <span className="text-xs font-medium tracking-widest text-slate-900 uppercase block">Cultura & Espacio</span>
            </div>
            <h2 className="text-3xl font-light text-slate-900 tracking-tight leading-none">
              Un Ritual con Identidad Propia
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              LUMEN nació bajo la premisa de devolverle al hombre el verdadero valor del ritual de cuidado personal. No somos una cadena masiva de estética rápida; somos un salón de autor donde el diseño de imagen, el perfeccionismo técnico y las conversaciones honestas se fusionan bajo un entorno premium.
            </p>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Cada sillón cuenta con instrumental de máxima gama esterilizado y líneas cosméticas importadas, asegurando confort total desde que ingresas hasta que dejas nuestra estación de trabajo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <ShieldCheck className="text-rose-800 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase">Seguridad</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Protocolos estrictos de higiene.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <Award className="text-rose-800 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase">Premium</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Líneas capilares mundiales.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                <Coffee className="text-rose-800 shrink-0" size={18} />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase">Confort</h4>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">Café e infraestructura de autor.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-2xl overflow-hidden shadow-sm h-64 sm:h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" 
                alt="Estaciones del Salón" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="col-span-4 space-y-4 flex flex-col justify-between">
              <div className="bg-slate-900 p-4 rounded-2xl text-white flex-grow flex flex-col justify-center items-center text-center shadow-md">
                <span className="text-2xl font-light text-rose-400">1.2K+</span>
                <span className="text-[9px] uppercase font-medium tracking-widest text-slate-400 mt-1">Clientes Fieles</span>
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

      {/* BLOQUE DE ATENCIÓN LOGÍSTICA CORPORATIVA */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-slate-50 text-slate-900 rounded-xl shrink-0 border border-slate-100">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">Ubicación</span>
              <span className="text-xs text-slate-600 font-light mt-0.5 block">Avenida Siempre Viva 123, Córdoba</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-slate-50 text-slate-900 rounded-xl shrink-0 border border-slate-100">
              <Clock size={18} />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">Horarios</span>
              <span className="text-xs text-slate-600 font-light mt-0.5 block">Martes a Sábados: 09:00 a 20:00 hs</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-slate-50 text-slate-900 rounded-xl shrink-0 border border-slate-100">
              <Phone size={18} />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">Teléfono</span>
              <span className="text-xs text-slate-600 font-light mt-0.5 block">+54 9 351 123-4567</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CORPORATIVO */}
      <footer className="bg-slate-950 py-10 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="text-base font-medium text-white tracking-wider">
            Lumen <span className="text-rose-800 font-light">Studio</span>
          </p>
          <div className="h-px bg-slate-900 w-16 mx-auto" />
          <p className="text-[10px] font-light text-slate-600 max-w-sm mx-auto leading-relaxed">
            © {new Date().getFullYear()} Lumen Studio. Plataforma optimizada de autogestión de reservas con protección y transparencia de datos comerciales.
          </p>
        </div>
      </footer>

    </div>
  );
}