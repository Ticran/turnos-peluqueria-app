import React, { useState } from "react";
import Lock from "lucide-react/dist/esm/icons/lock";
import Mail from "lucide-react/dist/esm/icons/mail";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { homeFor } from "../utils/roles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await api("/api/v1/auth/login", { method: "POST", body: { email, password } });

      // Guardamos la sesión en el contexto global
      login({
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
        businessId: data.businessId,
        branchId: data.branchId,
        photoUrl: data.photoUrl
      }, data.token);

      navigate(homeFor(data.role));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={homeFor(user?.role)} replace />;

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-800 selection:bg-rose-900 selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* MITAD IZQUIERDA: IMAGEN DE FONDO */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1200"
          alt="Lumen Studio Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-left z-10 pr-12">
          <h2 className="text-3xl font-light text-white tracking-tight mb-2">Tu estilo, <span className="font-semibold text-rose-400">nuestra prioridad</span></h2>
          <p className="text-sm text-slate-300 font-light">Gestioná turnos, equipo y servicios de tu local desde un solo lugar.</p>
        </div>
      </div>

      {/* MITAD DERECHA: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 relative">

        {/* BOTÓN VOLVER */}
        <div className="absolute top-8 left-8 sm:left-12">
          <Link to="/" className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 mt-12 sm:mt-0">
          {/* HEADER FORMULARIO */}
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-slate-900">
              Lumen <span className="font-light text-rose-800">Studio</span>
            </h1>
            <p className="mt-2 text-sm font-light text-slate-500">
              Panel del local. Ingresá tus datos para continuar.
            </p>
          </div>

          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="p-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl font-light">
              {error}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-sm font-light outline-none transition focus:border-rose-800 focus:bg-white focus:ring-1 focus:ring-rose-800"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-sm font-light outline-none transition focus:border-rose-800 focus:bg-white focus:ring-1 focus:ring-rose-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:bg-slate-400 disabled:transform-none"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="text-center text-xs font-light text-slate-500">
            Acceso para el equipo del local. Los clientes reservan sin cuenta desde la{" "}
            <Link to="/" className="font-medium text-rose-800 hover:text-rose-700 transition">página de reservas</Link>.
          </p>
        </div>
      </div>

    </div>
  );
}