import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import useApi from "@/hooks/useApi";

// Portada de la plataforma: listado de locales con su link de reservas
export default function Directory() {
  const { data, loading, error } = useApi("/api/public/businesses");
  const businesses = data ?? [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <header className="bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center gap-4">
          <span className="text-lg font-medium">Turnos <span className="text-rose-400">Online</span></span>
          <Link to="/login" className="text-sm text-slate-300 hover:text-white">Acceso para locales</Link>
        </div>
        <div className="max-w-5xl mx-auto px-6 pb-14 pt-6">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight">Reservá tu turno <span className="font-semibold text-rose-400">en segundos</span></h1>
          <p className="text-slate-400 mt-2 text-sm">Elegí el local, el servicio y el horario que te quede cómodo. Sin crear cuenta.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-8 pb-16">
        {loading ? (
          <p className="text-center py-12 text-slate-400 animate-pulse">Cargando locales...</p>
        ) : error ? (
          <p className="text-center py-12 text-slate-500">{error}</p>
        ) : businesses.length === 0 ? (
          <p className="text-center py-12 text-slate-500">Todavía no hay locales publicados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {businesses.map((b) => (
              <Link
                key={b.id}
                to={`/${b.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all"
              >
                <div className="h-32 bg-slate-800 relative">
                  {b.imageUrl && <img src={b.imageUrl} alt="" className="w-full h-full object-cover opacity-70" />}
                </div>
                <div className="p-5 space-y-1">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-rose-800">{b.name}</h2>
                  {b.address && (
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> {b.address}</p>
                  )}
                  {b.description && <p className="text-sm text-slate-500 font-light line-clamp-2 pt-1">{b.description}</p>}
                  <p className="text-sm font-medium text-rose-800 pt-2">Reservar turno →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
