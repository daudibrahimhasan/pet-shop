"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import { Product } from "@/lib/types";
import { categories } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

type ShopGridProps = {
  initialProducts: Product[];
  initialCategory?: string;
  initialQuery?: string;
  initialSort?: string;
};

export function ShopGrid({
  initialProducts,
  initialCategory = "all",
  initialQuery = "",
  initialSort = "featured",
}: ShopGridProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sort, setSort] = useState(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get("q");
    if (urlQuery) setQuery(urlQuery);
  }, []);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set);
  }, [initialProducts]);

  // Filter & Sort Logic
  const visible = useMemo(() => {
    let list = initialProducts;

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Keyword search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.barcode && p.barcode.includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    // Sorting
    const sorted = [...list];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "popular" || sort === "bestseller")
      sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));

    return sorted;
  }, [initialProducts, query, selectedCategory, selectedBrand, sort]);

  const clearAllFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSort("featured");
  };

  const hasActiveFilters =
    query !== "" || selectedCategory !== "all" || selectedBrand !== "all" || sort !== "featured";

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* 1. DESKTOP FILTER SIDEBAR (SHARP ARCHITECTURAL STACKS) */}
      <aside className="hidden lg:block space-y-6">
        {/* Category Filter Box */}
        <div className="border border-[#E5E7EB] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#111827]">
              Categories
            </h3>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-[11px] font-bold text-[#55387D] hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          <div className="mt-3.5 space-y-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`flex w-full items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#55387D] text-white"
                  : "text-[#374151] hover:bg-[#F3EEF9] hover:text-[#55387D]"
              }`}
            >
              <span className="uppercase tracking-wider text-[11px]">All Categories</span>
              <span className={`px-2 py-0.5 text-[10px] font-black ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[#F3EEF9] text-[#55387D]"}`}>
                {initialProducts.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = initialProducts.filter((p) => p.categorySlug === cat.slug).length;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => setSelectedCategory(isSelected ? "all" : cat.slug)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-[#55387D] text-white"
                      : "text-[#374151] hover:bg-[#F3EEF9] hover:text-[#55387D]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.symbol}</span>
                    <span className="uppercase tracking-tight text-[11px]">{cat.name}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-black ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#F3EEF9] text-[#55387D]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Filter Box */}
        {brands.length > 0 && (
          <div className="border border-[#E5E7EB] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                Brands
              </h3>
              {selectedBrand !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedBrand("all")}
                  className="text-[11px] font-bold text-[#55387D] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="mt-3.5 space-y-1">
              <button
                type="button"
                onClick={() => setSelectedBrand("all")}
                className={`flex w-full items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                  selectedBrand === "all"
                    ? "bg-[#55387D] text-white"
                    : "text-[#374151] hover:bg-[#F3EEF9] hover:text-[#55387D]"
                }`}
              >
                <span className="uppercase tracking-wider text-[11px]">All Brands</span>
              </button>

              {brands.map((b) => {
                const count = initialProducts.filter((p) => p.brand === b).length;
                const isSelected = selectedBrand === b;
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setSelectedBrand(isSelected ? "all" : b)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-[#55387D] text-white"
                        : "text-[#374151] hover:bg-[#F3EEF9] hover:text-[#55387D]"
                    }`}
                  >
                    <span className="uppercase tracking-tight text-[11px]">{b}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-black ${
                        isSelected ? "bg-white/20 text-white" : "bg-[#F3EEF9] text-[#55387D]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Promo Reassurance Box */}
        <div className="border border-[#55387D]/20 bg-[#F9F6FC] p-5 text-xs text-[#4B5563] shadow-xs">
          <div className="flex items-center gap-2 font-black text-[#111827] text-sm uppercase">
            <Tag className="text-[#55387D]" size={16} strokeWidth={2.2} />
            <span>Cash on Delivery</span>
          </div>
          <p className="mt-2 leading-relaxed">
            Order genuine imported pet nutrition with zero advance payment. Pay in cash upon doorstep handover.
          </p>
        </div>
      </aside>

      {/* 2. MAIN PRODUCTS CONTENT AREA */}
      <div>
        {/* Top Control Bar (Sharp Geometric) */}
        <div className="flex flex-col gap-3 border border-[#E5E7EB] bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between shadow-xs">
          {/* Keyword Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in this catalogue..."
              className="w-full border border-[#D1D5DB] bg-white px-4 py-2 text-xs font-semibold text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#55387D] sm:text-sm"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-2.5 text-[#6B7280] hover:text-[#111827]"
                aria-label="Clear search"
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            ) : (
              <Search
                size={16}
                strokeWidth={2.2}
                className="absolute right-3 top-2.5 text-[#9CA3AF] pointer-events-none"
              />
            )}
          </div>

          {/* Sort & Mobile Filter */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 border border-[#55387D] bg-[#55387D] px-3.5 py-2 text-xs font-black uppercase text-white lg:hidden"
            >
              <Filter size={15} strokeWidth={2.2} />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 border border-[#D1D5DB] bg-white px-3 py-1.5">
              <SlidersHorizontal size={14} strokeWidth={2} className="text-[#6B7280] shrink-0" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer bg-transparent text-xs font-black uppercase text-[#111827] outline-none"
                aria-label="Sort products"
              >
                <option value="featured">Sort: Featured</option>
                <option value="popular">Sort: Best Sellers</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Bar / Active Tag Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold text-[#6B7280]" aria-live="polite">
            Showing <strong className="text-[#111827]">{visible.length}</strong> product
            {visible.length === 1 ? "" : "s"}
          </p>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-[#F3EEF9] px-2.5 py-1 text-xs font-bold text-[#55387D] border border-[#55387D]/20">
                  <span>
                    Category: {categories.find((c) => c.slug === selectedCategory)?.name ?? selectedCategory}
                  </span>
                  <button type="button" onClick={() => setSelectedCategory("all")} aria-label="Remove category filter">
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </span>
              )}

              {selectedBrand !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-[#F3EEF9] px-2.5 py-1 text-xs font-bold text-[#55387D] border border-[#55387D]/20">
                  <span>Brand: {selectedBrand}</span>
                  <button type="button" onClick={() => setSelectedBrand("all")} aria-label="Remove brand filter">
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </span>
              )}

              {query && (
                <span className="inline-flex items-center gap-1.5 bg-[#FFF3EB] px-2.5 py-1 text-xs font-bold text-[#FF8C00] border border-[#FF8C00]/30">
                  <span>Query: &quot;{query}&quot;</span>
                  <button type="button" onClick={() => setQuery("")} aria-label="Remove query filter">
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#D91E18] hover:underline ml-1"
              >
                <RotateCcw size={12} strokeWidth={2.2} />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-[#D1D5DB] bg-white p-12 text-center shadow-xs">
            <div className="mx-auto grid h-16 w-16 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
              <Search size={28} strokeWidth={2.2} />
            </div>
            <h3 className="mt-4 text-lg font-black uppercase text-[#111827]">No Products Found</h3>
            <p className="mx-auto mt-2 max-w-sm text-xs text-[#6B7280] sm:text-sm">
              We couldn&apos;t find any items matching your selected criteria. Try adjusting your filters or search keywords.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-6 inline-flex items-center gap-2 bg-[#55387D] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
            >
              <RotateCcw size={14} strokeWidth={2.2} />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 lg:hidden animate-in fade-in duration-150">
          <div className="flex max-h-[85vh] w-full flex-col bg-white p-5 border-t-2 border-[#55387D] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <h3 className="text-base font-black uppercase text-[#111827]">Filter Catalogue</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="grid h-8 w-8 place-items-center bg-[#F3F4F6] text-[#111827]"
                aria-label="Close filters"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setMobileFilterOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase ${
                      selectedCategory === "all" ? "bg-[#55387D] text-white" : "text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB]"
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{initialProducts.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase ${
                        selectedCategory === c.slug ? "bg-[#55387D] text-white" : "text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.symbol}</span>
                        <span>{c.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-3">
                    Brands
                  </h4>
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand("all");
                        setMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase ${
                        selectedBrand === "all" ? "bg-[#55387D] text-white" : "text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB]"
                      }`}
                    >
                      <span>All Brands</span>
                    </button>
                    {brands.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          setSelectedBrand(b);
                          setMobileFilterOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase ${
                          selectedBrand === b ? "bg-[#55387D] text-white" : "text-[#111827] bg-[#F9FAFB] border border-[#E5E7EB]"
                        }`}
                      >
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-auto w-full bg-[#55387D] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs"
            >
              Apply Filters ({visible.length} results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
