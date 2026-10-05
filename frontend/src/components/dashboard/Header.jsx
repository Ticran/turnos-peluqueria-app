import React from "react";
import { Menu } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function Header({ isSidebarOpen, setIsSidebarOpen, user, isAdmin }) {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 shrink-0 shadow-sm z-10 gap-4">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm border border-slate-200"
            aria-label="Mostrar menú"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{user.name}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">
            {isAdmin ? "Administrador" : "Profesional"}
          </p>
        </div>
        <Avatar name={user.name} photoUrl={user.photoUrl} />
      </div>
    </header>
  );
}
