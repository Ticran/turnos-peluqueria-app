import React from "react";

export default function SectionTitle({ uppercaseText, mainText }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="h-0.5 w-6 bg-slate-900"></span>
        <span className="text-xs font-medium tracking-widest text-slate-900 uppercase block">
          {uppercaseText}
        </span>
      </div>
      <h2 className="text-3xl font-light text-slate-900 tracking-tight leading-none">
        {mainText}
      </h2>
    </div>
  );
}