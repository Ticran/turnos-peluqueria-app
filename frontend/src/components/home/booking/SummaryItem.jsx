import React from "react";

export default function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-4 items-start">
      {Icon && <Icon className="text-rose-400 shrink-0 mt-0.5" size={16} />}
      <div>
        <span className="text-[10px] text-slate-400 block mb-0.5">{label}</span>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}