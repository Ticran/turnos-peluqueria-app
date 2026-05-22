import React from "react";

export default function PrimaryButton({ children, onClick, disabled = false, className = "" }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3.5 bg-rose-800 hover:bg-rose-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-900/20 transition-all hover:-translate-y-0.5 disabled:bg-slate-800/50 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border disabled:border-slate-800 disabled:transform-none disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}