import React, { useState, useEffect } from "react";

export default function NewAppointmentModal({ isOpen, onClose, onAppointmentCreated }) {
  // Si el modal está cerrado, no renderizamos nada
  if (!isOpen) return null;

  // Estados para almacenar la información dinámica de la base de datos
  const [dbServices, setDbServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // El estado del formulario ahora maneja IDs numéricos para los selectores
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    serviceId: "",
    employeeId: "1", // Hardcodeado por ahora con Lucas Gómez (ID 1 de la DB)
    date: "",
    time: "",
  });

  // Efecto para buscar los servicios reales en PostgreSQL cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setLoadingServices(true);
      fetch("http://localhost:8080/api/services/business/1") // ID 1 de tu negocio de prueba
        .then((res) => {
          if (!res.ok) throw new Error("Error al conectar con la API de servicios");
          return res.json();
        })
        .then((data) => {
          setDbServices(data);
          setLoadingServices(false);
        })
        .catch((err) => {
          console.error("Error al cargar servicios desde Postgres:", err);
          setLoadingServices(false);
        });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Estructuramos el JSON tal como lo mapea tu entidad de Spring Boot
    const nuevoTurnoBackend = {
      businessId: 1, // Tu Tenant de pruebas por defecto
      employeeId: parseInt(formData.employeeId),
      serviceId: parseInt(formData.serviceId),
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      date: formData.date,               // Mantiene formato "YYYY-MM-DD"
      time: `${formData.time}:00`        // Sumamos los segundos que Hibernate exige para LocalTime
    };

    // Petición HTTP POST real hacia tu backend en Linux
    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoTurnoBackend),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor al guardar el turno");
        return res.json();
      })
      .then((data) => {
        alert("¡Turno guardado con éxito en tu PostgreSQL! 🚀");

        // Si pasaste una función para refrescar la grilla de la agenda, la llamamos
        if (onAppointmentCreated) {
          onAppointmentCreated();
        }

        onClose(); // Cerramos el modal limpio
      })
      .catch((err) => {
        console.error("Error al impactar la DB:", err);
        alert("No se pudo agendar el turno. Revisá si Spring Boot está corriendo.");
      });

    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
      clientName: "",
      clientPhone: "",
      branchId: "", // NUEVO
      serviceId: "",
      employeeId: "",
      date: "",
      time: "",
    });

    // Buscamos las sucursales disponibles al abrir el modal
    useEffect(() => {
      if (isOpen) {
        fetch("http://localhost:8080/api/branches/business/1")
          .then(res => res.json())
          .then(data => setBranches(data))
          .catch(err => console.error("Error al cargar sucursales:", err));
      }
    }, [isOpen]);

    // Efecto secundario: Cuando cambie el branchId seleccionado, cargamos sus servicios específicos
    useEffect(() => {
      if (formData.branchId) {
        setLoadingServices(true);
        fetch(`http://localhost:8080/api/services/business/1/branch/${formData.branchId}`)
          .then((res) => res.json())
          .then((data) => {
            setDbServices(data);
            setLoadingServices(false);
          });
      }
    }, [formData.branchId]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden m-4">

        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="font-semibold text-slate-900 font-poppins">Agendar Nuevo Turno</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Cliente</label>
              <input
                required
                type="text"
                placeholder="Nombre completo"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#800020] outline-none"
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Teléfono</label>
              <input
                required
                type="tel"
                placeholder="+54 9..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#800020] outline-none"
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">Local / Sucursal</label>
            <select
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
              onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
              value={formData.branchId}
            >
              <option value="">Seleccionar Local</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Servicio</label>
              <select
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                value={formData.serviceId}
              >
                <option value="">
                  {loadingServices ? "Cargando catálogo..." : "Seleccionar servicio"}
                </option>
                {dbServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — ${service.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Barbero</label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                value={formData.employeeId}
              >
                {/* Dejamos mapeado al barbero de prueba que cargamos en Flyway */}
                <option value="1">Lucas Gómez (DB)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Fecha</label>
              <input
                required
                type="date"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Hora</label>
              <input
                required
                type="time"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loadingServices}
              className="px-5 py-2 text-sm font-medium text-white bg-[#800020] hover:bg-[#5e0017] rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}