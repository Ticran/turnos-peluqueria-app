import React from "react";
import Check from "lucide-react/dist/esm/icons/check";
import Avatar from "@/components/ui/Avatar";

export default React.memo(function BarberCard({ barber, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-rose-800 bg-rose-50/20 ring-1 ring-rose-800/20"
          : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
      }`}
    >
      <div className="w-20 h-20 mb-3 relative rounded-full overflow-hidden">
        <Avatar name={barber.name} photoUrl={barber.photoUrl} className="w-20 h-20 text-xl" />
        {isSelected && (
          <div className="absolute inset-0 bg-rose-900/60 flex items-center justify-center">
            <Check size={24} strokeWidth={3} />
          </div>
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-900">{barber.name}</h4>
      {barber.specialty && <p className="text-[11px] text-slate-500 font-light mt-0.5">{barber.specialty}</p>}
    </button>
  );
});
