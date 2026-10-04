import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Overlay from "../components/dashboard/Overlay";

export default function DashboardLayout({
  children,
  isSidebarOpen,
  setIsSidebarOpen,
  isAdmin,
  user,
  businessName,
  businessSlug,
  onLogout,
  activeMenu,
  setActiveMenu,
}) {
  return (
    <div
      className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden selection:bg-rose-900 selection:text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isAdmin={isAdmin}
        businessName={businessName}
        businessSlug={businessSlug}
        onLogout={onLogout}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <Overlay
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={user}
          isAdmin={isAdmin}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
