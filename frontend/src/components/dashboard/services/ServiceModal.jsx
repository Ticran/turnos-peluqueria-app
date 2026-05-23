import React from "react";

export default function ServiceModal({ isOpen, onClose, service }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">{service ? "Editar Servicio" : "Nuevo Servicio"}</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <input type="text" defaultValue={service?.name} placeholder="Nombre del servicio" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" defaultValue={service?.price} placeholder="Precio" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
            <input type="text" defaultValue={service?.duration} placeholder="Ej: 45 min" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" required />
          </div>
          <textarea defaultValue={service?.desc} placeholder="Descripción" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24" />
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-500">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}