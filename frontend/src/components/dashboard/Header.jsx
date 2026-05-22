import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function Header({ isSidebarOpen, setIsSidebarOpen, role, setRole, setActiveMenu }) {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 shrink-0 shadow-sm z-10 gap-4">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm border border-slate-200 animate-fade-in"
            title="Mostrar menú"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="relative w-72 lg:w-96 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            type="text" 
            placeholder="Buscar clientes, turnos o servicios..." 
            className="pl-10 pr-4"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        <Button
          variant="outline"
          className="text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
          onClick={() => {
            const nextRole = role === "admin" ? "employee" : "admin";
            setRole(nextRole);
            setActiveMenu(nextRole === "admin" ? "dashboard" : "agenda");
          }}
        >
          Vista {role === "admin" ? "Empleado" : "Admin"}
        </Button>

        <button className="relative text-slate-400 hover:text-slate-900 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-800 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 group-hover:text-rose-800 transition-colors">
              {role === "admin" ? "Facundo" : "Mateo Palacios"}
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              {role === "admin" ? "Dueño / Admin" : "Barbero Principal"}
            </p>
          </div>
          <img 
            src={role === "admin" ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" : "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80"} 
            alt="Perfil" 
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" 
          />
        </div>
      </div>
    </header>
  );
}