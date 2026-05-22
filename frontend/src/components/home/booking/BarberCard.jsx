import React from "react";
import Check from "lucide-react/dist/esm/icons/check";
import Star from "lucide-react/dist/esm/icons/star";

export default React.memo(function BarberCard({ barber, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-rose-800 bg-rose-50/20 ring-1 ring-rose-800/20"
          : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
      }`}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-slate-50 shadow-sm relative">
        <img src={barber.img} alt={barber.name} className="w-full h-full object-cover object-top" />
        {isSelected && (
          <div className="absolute inset-0 bg-rose-900/30 flex items-center justify-center text-white backdrop-blur-[1px]">
            <Check size={24} strokeWidth={3} />
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-900">{barber.name}</h4>
      <p className="text-[11px] text-slate-500 font-light mt-0.5">{barber.role}</p>
      
      <div className="flex items-center gap-1 mt-3 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
        <Star size={12} className="text-amber-500 fill-amber-500" />
        <span className="text-[11px] font-medium text-slate-800">{barber.rating}</span>
        <span className="text-[10px] text-slate-400">({barber.reviews})</span>
      </div>
    </div>
  );
});