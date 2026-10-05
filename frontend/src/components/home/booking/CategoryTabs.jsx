import React from "react";
import Tag from "@/components/ui/Tag";

// 'services' es el catálogo completo de la sucursal (no el filtrado, para no perder pestañas)
export default function CategoryTabs({ activeCategory, setActiveCategory, services = [] }) {

  // Categorías únicas de la base de datos, con "todos" al principio
  const uniqueCategories = ["todos", ...new Set(services.map(s => s.category?.toLowerCase()).filter(Boolean))];
  if (uniqueCategories.length <= 2) return null;

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