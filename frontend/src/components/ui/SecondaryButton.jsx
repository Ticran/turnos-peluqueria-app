import React from "react";

export default function SecondaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 text-xs text-slate-400 hover:text-white transition-colors font-light ${className}`}
    >
      {children}
    </button>
  );
}