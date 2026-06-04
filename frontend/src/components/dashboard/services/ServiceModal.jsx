import React, { useState, useEffect } from "react";

export default function ServiceModal({ isOpen, onClose, service, onServiceSaved }) {
  

  // Estados controlados para el formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  // 1. CORREGIDO: Declaramos la variable exactamente como durationInMinutes
  const [durationInMinutes, setDurationInMinutes] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); 
  const [submitting, setSubmitting] = useState(false);

  // Sincronizar el formulario con el servicio seleccionado (si se va a editar) o limpiarlo (si es nuevo)
  useEffect(() => {
    if (service) {
      setName(service.name || "");
      setPrice(service.price || "");
      // 2. CORREGIDO: Mapeamos la propiedad que viene de Java (durationInMinutes) al estado
      setDurationInMinutes(service.durationInMinutes || "");
      setDescription(service.description || "");
      setCategory(service.category || "General");
    } else {
      setName("");
      setPrice("");
      setDurationInMinutes("");
      setDescription("");
      setCategory("General");
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // DTO idéntico al que espera recibir Hibernate / Spring Boot
    const payload = {
      businessId: 1, 
      name: name,
      price: parseFloat(price),
      // 3. CORREGIDO: Parseamos la variable correcta 'durationInMinutes'
      durationInMinutes: parseInt(durationInMinutes), 
      description: description,
      category: category,
      active: true 
    };

    const url = service 
      ? `http://localhost:8080/api/services/${service.id}/business/1`
      : "http://localhost:8080/api/services";
      
    const method = service ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al procesar la operación en el catálogo");
        return res.json();
      })
      .then((data) => {
        alert(service ? "¡Servicio actualizado con éxito! ✏️" : "¡Servicio guardado en PostgreSQL! 🚀");
        if (onServiceSaved) onServiceSaved(); 
        onClose(); 
      })
      .catch((err) => {
        console.error("Error en la conexión con la API de servicios:", err);
        alert("Ocurrió un error. Asegurate de tener corriendo el backend en Spring Boot.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900 font-poppins mb-4">
          {service ? "Editar Servicio" : "Nuevo Servicio"}
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">Nombre del servicio</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Corte de Autor + Perfilado" 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Precio ($)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej. 4500" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]" 
                required 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">Duración (minutos)</label>
              <input 
                type="number" 
                // 4. CORREGIDO: Vinculamos el value y onChange a durationInMinutes y setDurationInMinutes
                value={durationInMinutes} 
                onChange={(e) => setDurationInMinutes(e.target.value)}
                placeholder="Ej. 30" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]" 
                required 
              />
            </div>
          </div>

          {/* MENÚ DESPLEGABLE CAMBIADO ACÁ */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">Categoría</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] cursor-pointer" 
              required 
            >
              <option value="General">General</option>
              <option value="Corte">Corte</option>
              <option value="Barba">Barba</option>
              <option value="Tratamiento">Tratamiento</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">Descripción</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles sobre lo que incluye la experiencia premium..." 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 outline-none resize-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020]" 
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-slate-50">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={submitting}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {submitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}