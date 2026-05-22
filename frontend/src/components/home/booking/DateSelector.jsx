import React from "react";
import { availableDates } from "@/data/dates";

export default function DateSelector({ selectedDate, setSelectedDate, setSelectedTime }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-slate-600 block">Selecciona la Fecha</label>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {availableDates.map((d) => {
          const isSelected = selectedDate === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDate(d.id);
                setSelectedTime(null);
              }}
              className={`flex flex-col items-center justify-center p-3 w-16 h-20 rounded-2xl border text-center shrink-0 snap-start transition-all ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="text-[10px] font-medium uppercase tracking-tight opacity-70 mb-1">
                {d.weekday}
              </span>
              <span className="text-lg font-light">{d.day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}