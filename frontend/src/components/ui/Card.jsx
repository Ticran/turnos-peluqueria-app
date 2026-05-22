import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}