import React from "react";

export default function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
      <div className="p-3 bg-slate-50 text-slate-900 rounded-xl shrink-0 border border-slate-100">
        {Icon && <Icon size={18} />}
      </div>
      <div>
        <span className="text-[10px] font-semibold text-rose-800 uppercase tracking-wider block">{label}</span>
        <span className="text-xs text-slate-600 font-light mt-0.5 block">{value}</span>
      </div>
    </div>
  );
}