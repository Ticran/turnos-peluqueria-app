import React from "react";
import Navbar from "@/components/home/navbar/Navbar";
import Footer from "@/components/home/footer/Footer";

export default function MainLayout({ children, businessName }) {
  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased flex flex-col relative selection:bg-rose-900 selection:text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar businessName={businessName} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer businessName={businessName} />
    </div>
  );
}
