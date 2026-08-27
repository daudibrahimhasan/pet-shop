"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

type HomeProductTabsProps = {
  products: Product[];
};

const tabs = [
  { id: "all", label: "All Products" },
  { id: "cat-food", label: "Cat Food" },
  { id: "dog-food", label: "Dog Food" },
  { id: "treats", label: "Treats & Chews" },
  { id: "litter", label: "Litter & Hygiene" },
  { id: "accessories", label: "Accessories" },
];

export function HomeProductTabs({ products }: HomeProductTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products.slice(0, 8);
    return products.filter((p) => p.categorySlug === activeTab).slice(0, 8);
  }, [products, activeTab]);

  return (
    <section className="container-page py-10 sm:py-14" aria-labelledby="popular-products-heading">
      {/* Section Header & Tabs */}
      <div className="flex flex-col gap-4 border-b border-[#ECECEC] pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="popular-products-heading" className="text-2xl font-extrabold text-heading sm:text-3xl">
            Popular Products
          </h2>
          <p className="mt-1 text-xs text-text-muted sm:text-sm">
            Top choices favored by pet parents across Dhaka city
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-heading border border-[#ECECEC] hover:border-primary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-8 text-center">
        <Link
          href={activeTab === "all" ? "/shop" : `/category/${activeTab}`}
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-white px-6 py-2.5 text-sm font-extrabold text-primary transition-all hover:bg-primary hover:text-white shadow-sm"
        >
          <span>View All in {tabs.find((t) => t.id === activeTab)?.label ?? "Shop"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
