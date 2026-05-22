import React from "react";

export default function EmptyState({ children }) {
  return (
    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-500 font-light">
      {children}
    </div>
  );
}