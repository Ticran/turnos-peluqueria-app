import React from "react";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans text-blue-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-zinc-100">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">
            LUMEN <span className="text-rose-800">Salon</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500">Ingresa a tu cuenta para gestionar tus turnos</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 pl-10 text-sm outline-none transition focus:border-rose-800 focus:ring-1 focus:ring-rose-800"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 pl-10 text-sm outline-none transition focus:border-rose-800 focus:ring-1 focus:ring-rose-800"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="rounded border-zinc-300 accent-rose-800" />
              <span className="text-zinc-600">Recordarme</span>
            </label>
            <a href="#" className="font-semibold text-rose-800 transition hover:text-rose-700">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-blue-950 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-900"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-600">
          ¿No tienes cuenta? <a href="#" className="font-semibold text-rose-800 transition hover:text-rose-700">Regístrate</a>
        </div>

        <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400 transition hover:text-blue-950">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        
      </div>
    </div>
  );
}