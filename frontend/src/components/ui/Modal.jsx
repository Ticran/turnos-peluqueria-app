import React, { useEffect } from "react";
import { X } from "lucide-react";

// Modal base del panel: se cierra con Escape, clic afuera o la X
export default function Modal({ title, onClose, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto border border-slate-200`}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0">
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
