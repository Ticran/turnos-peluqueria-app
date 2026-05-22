import React from "react";

export default function Badge({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-2.5 items-start bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
      {Icon && <Icon className="text-rose-800 shrink-0" size={18} />}
      <div>
        <h4 className="text-xs font-semibold text-slate-900 uppercase">{title}</h4>
        <p className="text-[10px] text-slate-500 font-light mt-0.5">{desc}</p>
      </div>
    </div>
  );
}