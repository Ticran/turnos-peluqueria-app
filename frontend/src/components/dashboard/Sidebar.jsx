import React from "react";
import { ChevronLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { adminMenu, employeeMenu } from "../../data/menu";
import Button from "../ui/Button";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, role, activeMenu, setActiveMenu }) {
  const currentMenu = role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside className={`bg-slate-900 text-slate-300 flex flex-col fixed md:relative h-full z-30 shrink-0 transition-all duration-300 ${isSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}>
      <div className="w-64 flex flex-col h-full min-w-[256px]">
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-medium text-white">Lumen <span className="text-rose-400">Studio</span></span>
          <Button variant="ghost" onClick={() => setIsSidebarOpen(false)}><ChevronLeft size={20} /></Button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-rose-800 text-white" : "hover:bg-slate-800 hover:text-white"}`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white">
            <LogOut size={18} /> Cerrar Sesión
          </Link>
        </div>
      </div>
    </aside>
  );
}