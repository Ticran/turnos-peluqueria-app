import React from "react";

export const inputClass =
  "w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#800020]/20 focus:border-[#800020] disabled:opacity-60";

// Etiqueta + control de formulario
export default function Field({ label, children, className = "" }) {
  return (
    <label className={`block space-y-1 ${className}`}>
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      {children}
    </label>
  );
}

export function FormError({ children }) {
  if (!children) return null;
  return <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-lg p-3">{children}</p>;
}
