"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

type CategoryProductTabsSectionProps = {
  products: Product[];
};

const filterTabs = [
  { id: "cat-toys", label: "Cat Toys" },
  { id: "clothing-beds-carrier", label: "Cat Bag & Carrier" },
  { id: "cat-care-health", label: "Cat Care & Health" },
  { id: "cat-litter", label: "Cat Litter" },
  { id: "cat-accessories", label: "Cat Accessories" },
];

export function CategoryProductTabsSection({ products }: CategoryProductTabsSectionProps) {
  const [activeTab, setActiveTab] = useState("cat-toys");

  const visible = products.filter((p) => {
    if (activeTab === "cat-toys") return p.categorySlug === "cat-toys";
    if (activeTab === "clothing-beds-carrier") return p.categorySlug === "clothing-beds-carrier";
    if (activeTab === "cat-care-health") return p.categorySlug === "cat-care-health";
    if (activeTab === "cat-litter") return p.categorySlug === "cat-litter";
    return p.categorySlug === "cat-accessories";
  });

  const displayList = visible.length ? visible : products.filter((p) => p.outOfStock || p.categorySlug === "cat-toys");

  return (
    <section className="mt-8">
      {/* Sharp Architectural Category Tab Stack */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E5E7EB] pb-3">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors btn-press ${
              activeTab === tab.id
                ? "bg-[#55387D] text-white"
                : "bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] hover:text-[#111827]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {displayList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
