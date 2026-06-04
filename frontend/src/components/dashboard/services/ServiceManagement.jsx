import React, { useState, useEffect } from "react";
import ServiceModal from "./ServiceModal";

export default function ServiceManagement({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Estado dinámico conectado a PostgreSQL
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función reutilizable para pedir los servicios al backend
  const fetchServices = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/services/business/1") // ID de negocio por defecto (Tenant 1)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => {
        // Opcional: Si en la vista del admin solo querés ver los activos, podés filtrarlos. 
        // Aunque generalmente el admin quiere ver todos, o los filtramos para que coincida con la Home.
        const activos = data.filter(svc => svc.active !== false);
        setServicesList(activos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener servicios de Postgres:", err);
        setLoading(false);
      });
  };

  // Traer catálogo real al montar el componente
  useEffect(() => {
    fetchServices();
  }, []);

  const handleAction = (service = null) => {
    if (role !== "admin") return; // Protección simple por rol
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // FUNCIÓN NUEVA: Borrado lógico enviando la actualización al backend
  const handleDeleteService = (service) => {
  if (role !== "admin") return;

  if (!window.confirm(`¿Dar de baja "${service.name}"?`)) {
    return;
  }

  fetch(
    `http://localhost:8080/api/services/${service.id}/business/1`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al eliminar");
      }
    })
    .then(() => {
      alert("Servicio dado de baja correctamente");
      fetchServices();
    })
    .catch((err) => {
      console.error(err);
      alert("Error al eliminar el servicio");
    });
};

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-slate-900 font-poppins">Servicios</h1>
          <p className="text-sm text-slate-500">Gestión del catálogo de servicios del salón.</p>
        </div>
        {role === "admin" && (
          <button 
            onClick={() => handleAction()}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all font-medium shadow-sm"
          >
            + Agregar Servicio
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500 text-sm">Cargando catálogo real...</div>
      ) : servicesList.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-2xl">
          No hay servicios cargados en la base de datos.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((svc) => (
            <div key={svc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-slate-300 transition-all">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900 font-poppins">{svc.name}</h3>
                  {/* CORREGIDO: Cambiado svc.duration por svc.durationInMinutes */}
                  <span className="text-xs font-bold text-[#800020] bg-rose-50 px-2 py-1 rounded-full">
                    {svc.durationInMinutes} min
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                  {svc.description || "Sin descripción disponible."}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900 font-poppins">${svc.price}</span>
                {role === "admin" && (
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAction(svc)} 
                      className="text-sm font-medium text-slate-600 hover:text-[#800020] transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteService(svc)} 
                      className="text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService}
        onServiceSaved={fetchServices} // Callback para refrescar la lista
      />
    </div>
  );
}