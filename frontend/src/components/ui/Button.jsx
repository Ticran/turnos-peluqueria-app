import React from "react";

export default function Button({ children, className = "", variant = "primary", ...props }) {
  const baseStyles = "transition-all duration-200 font-medium text-sm flex items-center justify-center";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10",
    outline: "border border-rose-800 text-rose-800 bg-rose-50 hover:bg-rose-800 hover:text-white",
    ghost: "p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}