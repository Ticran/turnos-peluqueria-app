import React from "react";

export default function Overlay({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 bg-slate-900/40 z-20 md:hidden"
      onClick={onClose}
    />
  );
}