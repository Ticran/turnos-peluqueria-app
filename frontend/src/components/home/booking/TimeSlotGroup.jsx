import React from "react";

export default function TimeSlotGroup({ zone, slots, selectedTime, setSelectedTime }) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-medium uppercase text-slate-400 tracking-widest block">
        {zone}
      </span>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? "bg-rose-800 text-white shadow-md shadow-rose-800/10 border-rose-800"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-400"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
