import React from "react";
import { DEMO } from "@/lib/api";
import { resetDemo } from "@/lib/demoApi";

// Aviso fijo en modo demo: los datos son de ejemplo y quedan solo en este dispositivo
export default function DemoBanner() {
  if (!DEMO) return null;

  const reset = () => {
    if (!window.confirm("¿Borrar todo lo que hiciste en la demo y volver a los datos de ejemplo?")) return;
    resetDemo();
    localStorage.removeItem("lumen_token");
    localStorage.removeItem("lumen_user");
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-2 left-2 z-[60] flex items-center gap-2 rounded-full bg-amber-400 text-amber-950 text-[11px] font-semibold pl-3 pr-1 py-1 shadow-lg">
      DEMO · datos de prueba
      <button type="button" onClick={reset} className="rounded-full bg-amber-950/10 hover:bg-amber-950/20 px-2 py-0.5">
        Reiniciar
      </button>
    </div>
  );
}
