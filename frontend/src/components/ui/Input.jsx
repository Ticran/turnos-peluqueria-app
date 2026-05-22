import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full bg-slate-50 border border-slate-200 rounded-full py-2 text-sm font-light outline-none focus:border-rose-800 focus:ring-1 focus:ring-rose-800 transition-all ${className}`}
      {...props}
    />
  );
}