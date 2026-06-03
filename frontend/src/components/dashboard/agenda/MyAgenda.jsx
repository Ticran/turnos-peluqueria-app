import React, { useState, useEffect } from "react";
import CalendarTable from "../CalendarTable";

export default function MyAgenda({ role }) {
  // Id del empleado Lucas Gómez que insertamos mediante Flyway
  const LOGGED_EMPLOYEE_ID = 1;

  // Empezamos con la lista de turnos vacía
  const [myAppointments, setMyAppointments] = useState([]);
  // Estado de carga para que la app no rompa mientras espera al backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos la petición HTTP a tu Spring Boot en Linux
    fetch(`http://localhost:8080/api/appointments/employee/${LOGGED_EMPLOYEE_ID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo conectar con el servidor de turnos");
        }
        return response.json();
      })
      .then((data) => {
        // Guardamos los turnos reales de la base de datos
        setMyAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error trayendo datos del backend:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-slate-900 font-poppins">
            Mi Agenda Semanal
          </h1>
          <p className="text-sm font-light text-slate-500 mt-1">
            Visualización de turnos asignados a tu perfil en tiempo real.
          </p>
        </div>
        
        {/* Badge identificador del empleado real de la DB */}
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 w-fit">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Sesión: Lucas Gómez (DB)
          </span>
        </div>
      </div>

      {/* Si el backend no respondió todavía, mostramos un cartel amigable */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-light border border-dashed border-slate-300 rounded-xl bg-slate-50">
          Conectando con el servidor de Spring Boot...
        </div>
      ) : (
        /* Cuando llega la data, se la pasamos limpia a tu tabla */
        <CalendarTable appointments={myAppointments} role={role} />
      )}
    </div>
  );
}