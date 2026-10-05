import React from "react";

// "Mateo Palacios" -> "MP"
const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");

// Foto de perfil o, si no tiene, sus iniciales
export default function Avatar({ name, photoUrl, className = "w-10 h-10 text-sm" }) {
  return photoUrl ? (
    <img src={photoUrl} alt={name} className={`${className} rounded-full object-cover shrink-0`} />
  ) : (
    <div className={`${className} rounded-full bg-slate-900 text-white flex items-center justify-center font-light shrink-0`} aria-hidden="true">
      {initials(name)}
    </div>
  );
}
