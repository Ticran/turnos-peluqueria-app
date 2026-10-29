import React, { useState } from "react";
import Lock from "lucide-react/dist/esm/icons/lock";
import Mail from "lucide-react/dist/esm/icons/mail";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api, DEMO } from "../lib/api";
import { DEMO_PASSWORD, DEMO_USERS } from "../lib/demoApi";
import { homeFor } from "../utils/roles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Si lo mandó acá ProtectedRoute, vuelve a esa página; si no, a su panel.
  // Solo se respeta si es una sección de su rol (un empleado no "vuelve" a /plataforma)
  const destination = (role) => {
    const from = location.state?.from;
    return from && from.startsWith(homeFor(role)) ? from : homeFor(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const signIn = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const data = await api("/api/v1/auth/login", { method: "POST", body: { email: email.trim(), password } });

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

      navigate(destination(data.role), { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={destination(user?.role)} replace />;

  return (
    <div className="flex min-h-dvh bg-white font-sans text-slate-800 selection:bg-rose-900 selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* MITAD IZQUIERDA: IMAGEN DE FONDO */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1200"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-left z-10 pr-12">
          <h2 className="text-3xl font-light text-white tracking-tight mb-2">Tu agenda, <span className="font-semibold text-rose-400">siempre en orden</span></h2>
          <p className="text-sm text-slate-300 font-light">Gestioná turnos, equipo y servicios de tu local desde un solo lugar.</p>
        </div>
      </div>

      {/* MITAD DERECHA: FORMULARIO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-5 sm:px-12 py-20 relative">

        {/* BOTÓN VOLVER */}
        <div className="absolute top-6 left-5 sm:top-8 sm:left-12">
          <Link to="/" className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* HEADER FORMULARIO */}
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-slate-900">
              Turnos <span className="font-light text-rose-800">Online</span>
            </h1>
            <p className="mt-2 text-sm font-light text-slate-500">
              Panel del local. Ingresá tus datos para continuar.
            </p>
          </div>

          {/* DEMO: entrar con un toque, sin tipear */}
          {DEMO && (
            <div className="space-y-2 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-medium text-amber-900">Modo demo · entrá como:</p>
              <div className="grid gap-2">
                {DEMO_USERS.map((u) => (
                  <button key={u.email} type="button" disabled={loading} onClick={() => signIn(u.email, DEMO_PASSWORD)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white border border-amber-200 hover:border-amber-400 text-sm disabled:opacity-60">
                    <span className="font-medium text-slate-900">{u.label}</span>
                    <span className="block text-xs text-slate-500">{u.email} · {DEMO_PASSWORD}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 text-base sm:text-sm font-light outline-none transition focus:border-rose-800 focus:bg-white focus:ring-1 focus:ring-rose-800"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-11 pr-12 text-base sm:text-sm font-light outline-none transition focus:border-rose-800 focus:bg-white focus:ring-1 focus:ring-rose-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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