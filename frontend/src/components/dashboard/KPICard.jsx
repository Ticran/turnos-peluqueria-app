import React from "react";
import Card from "../ui/Card";

export default function KPICard({ title, value, icon: Icon, iconBg }) {
  return (
    <Card className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase">{title}</p>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
      </div>
    </Card>
  );
}