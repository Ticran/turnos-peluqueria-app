import React from "react";
import Tag from "@/components/ui/Tag";

// Le agregamos la prop 'services' que viene de tu backend
export default function CategoryTabs({ activeCategory, setActiveCategory, services = [] }) {
  
  // Magia pura: Extraemos las categorías únicas de la base de datos y le sumamos "todos" al principio
  const uniqueCategories = ["todos", ...new Set(services.map(s => s.category).filter(Boolean))];

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueCategories.map((cat, index) => (
        <Tag
          key={index}
          active={activeCategory === cat.toLowerCase()}
          onClick={() => setActiveCategory(cat.toLowerCase())}
        >
          {/* Capitalizamos la primera letra para que quede prolijo en pantalla */}
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </Tag>
      ))}
    </div>
  );
}