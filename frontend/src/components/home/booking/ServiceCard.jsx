import React from "react";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { formatPrice } from "@/utils/currency";

export default React.memo(function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer group relative ${
        isSelected
          ? "border-rose-800 bg-rose-50/20 ring-1 ring-rose-800/20 shadow-sm"
          : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex justify-between items-start gap-4">
          <h4 className="text-base font-semibold text-slate-900 group-hover:text-rose-800 transition-colors">
            {service.name}
          </h4>
          <span className="text-lg font-light text-slate-900 shrink-0">
            {formatPrice(service.price)}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
          {service.desc}
        </p>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 text-[11px]">
        <span className="text-slate-400 font-medium">
          ⏱ Duración: <strong className="text-slate-600">{service.durationInMinutes}</strong>
        </span>
        <span className="text-rose-800 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Seleccionar <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
});