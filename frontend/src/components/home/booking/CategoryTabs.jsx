import React from "react";
import Tag from "@/components/ui/Tag";
import { categories } from "@/data/categories";

export default function CategoryTabs({ activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Tag
          key={cat.id}
          active={activeCategory === cat.id}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.name}
        </Tag>
      ))}
    </div>
  );
}