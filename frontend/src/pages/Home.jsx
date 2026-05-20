import React from "react";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import Music from "lucide-react/dist/esm/icons/music";
import Clock from "lucide-react/dist/esm/icons/clock";
import Phone from "lucide-react/dist/esm/icons/phone";

import Camera from "lucide-react/dist/esm/icons/camera";

export default function Home() {
  const professionals = [
    { name: "Martín Gómez", role: "Barbero Principal", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&q=80" },
    { name: "Sofía Ruiz", role: "Colorista Experta", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&q=80" },
    { name: "Lucas Vega", role: "Estilista", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  ];

  const services = [
    { name: "Corte Clásico", desc: "Corte a tijera o máquina con lavado y peinado final." },
    { name: "Barba Premium", desc: "Perfilado, toalla caliente y productos de hidratación." },
    { name: "Colorimetría", desc: "Tintes, reflejos y tratamientos de color personalizados." },
    { name: "Tratamiento Capilar", desc: "Nutrición profunda, botox capilar y alisados." },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-blue-950">
      
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight text-blue-950">
            LUMEN <span className="text-rose-800">Salon</span>
          </h1>
          <nav className="hidden gap-8 font-medium md:flex">
            <a href="#inicio" className="transition hover:text-rose-800">Inicio</a>
            <a href="#profesionales" className="transition hover:text-rose-800">Profesionales</a>
            <a href="#servicios" className="transition hover:text-rose-800">Servicios</a>
            <a href="#contacto" className="transition hover:text-rose-800">Contacto</a>
          </nav>
          <button className="rounded-xl bg-blue-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-900">
            Reservar Turno
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        id="inicio" 
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-blue-950/70"></div>
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <h2 className="mb-4 text-5xl font-extrabold text-white md:text-7xl">
            Tu estilo, <span className="text-rose-500">nuestra pasión</span>
          </h2>
          <p className="mb-8 max-w-2xl text-lg text-zinc-200">
            Experimenta el cuidado personal al más alto nivel. Profesionales expertos, ambiente exclusivo y resultados impecables.
          </p>
          <button className="rounded-xl bg-rose-800 px-8 py-4 text-lg font-bold text-white shadow-rose-900/30 transition hover:-translate-y-1 hover:bg-rose-700 hover:shadow-2xl">
            Reserva tu lugar ahora
          </button>
        </div>
      </section>

      {/* PROFESIONALES */}
      <section id="profesionales" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold">Nuestros Profesionales</h3>
          <p className="mt-2 text-zinc-600">Expertos dedicados a potenciar tu imagen</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {professionals.map((prof, idx) => (
            <div key={idx} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
              <img src={prof.img} alt={prof.name} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold">{prof.name}</h4>
                <p className="mb-4 text-rose-800 font-medium">{prof.role}</p>
                <button className="w-full rounded-lg border-2 border-blue-950 py-2 font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white">
                  Reservar con {prof.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="bg-blue-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold">Servicios Premium</h3>
            <p className="mt-2 text-blue-200">Todo lo que necesitas en un solo lugar</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((srv, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-2xl bg-blue-900/50 p-6 backdrop-blur-sm border border-blue-800 transition hover:bg-blue-900">
                <div>
                  <h4 className="mb-2 text-xl font-bold text-rose-400">{srv.name}</h4>
                  <p className="mb-6 text-sm text-blue-100">{srv.desc}</p>
                </div>
                <button className="w-full rounded-lg bg-white py-2 font-semibold text-blue-950 transition hover:bg-zinc-200">
                  Reservar turno
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN Y REDES */}
      <section id="contacto" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Ubicación */}
          <div className="flex flex-col justify-center rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold">Visítanos</h3>
            <div className="mb-4 flex items-center gap-4 text-zinc-700">
              <MapPin className="text-rose-800" size={24} />
              <p>Av. Siempre Viva 123, Centro</p>
            </div>
            <div className="mb-4 flex items-center gap-4 text-zinc-700">
              <Clock className="text-rose-800" size={24} />
              <p>Mar a Sáb: 09:00 - 20:00</p>
            </div>
            <div className="mb-8 flex items-center gap-4 text-zinc-700">
              <Phone className="text-rose-800" size={24} />
              <p>+54 9 11 1234-5678</p>
            </div>
            <div className="h-64 w-full overflow-hidden rounded-xl bg-zinc-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13618.361528659556!2d-64.1833!3d-31.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-rose-800 p-8 text-center text-white shadow-lg">
            <h3 className="mb-4 text-3xl font-bold">Conecta con nosotros</h3>
            <p className="mb-8 text-rose-100">Síguenos en nuestras redes para ver nuestros trabajos y enterarte de las promociones.</p>
            <div className="flex gap-6">
<a href="#" className="rounded-full bg-white/10 p-4 transition hover:bg-white hover:text-rose-400 hover:scale-110">
  <Camera size={32} />
</a>
              <a href="#" className="rounded-full bg-white/10 p-4 transition hover:bg-white hover:text-green-500 hover:scale-110">
                <MessageCircle size={32} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-4 transition hover:bg-white hover:text-black hover:scale-110">
                <Music size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-950 py-8 text-center text-sm text-blue-200 border-t border-blue-900">
        <p>© {new Date().getFullYear()} LUMEN Salon. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}