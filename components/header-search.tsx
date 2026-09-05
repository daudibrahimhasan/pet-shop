"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Flame, Layers, Search, Sparkles, X } from "lucide-react";
import { categories as catalogueCategories, formatPrice, products as catalogueProducts } from "@/lib/data";
import { assetPath } from "@/lib/assets";
import { Category, Product } from "@/lib/types";

const POPULAR_SEARCHES = [
  "Cat Food",
  "Reflex",
  "Cat Litter",
  "Cat Toys",
  "Deworming",
  "Kitten Kibble",
  "Cat Harness",
  "Dog Food",
];

interface HeaderSearchProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function HeaderSearch({ isMobile = false, onNavigate }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [matchedCategories, setMatchedCategories] = useState<Category[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep search client-side so it works on static hosts such as GitHub Pages.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setMatchedProducts([]);
      setMatchedCategories([]);
      setTotalMatches(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const q = trimmed.toLowerCase();
      const products = catalogueProducts.filter((product) =>
        [
          product.name,
          product.description,
          product.categoryName,
          product.categorySlug,
          product.brand,
          product.barcode,
        ].some((value) => value?.toLowerCase().includes(q))
      );
      const categories = catalogueCategories.filter((category) =>
        [category.name, category.slug, category.description].some((value) =>
          value.toLowerCase().includes(q)
        )
      );

      setMatchedProducts(products.slice(0, 8));
      setMatchedCategories(categories.slice(0, 4));
      setTotalMatches(products.length);
      setLoading(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalNavigableItems =
    (matchedCategories.length > 0 ? matchedCategories.length : 0) +
    (matchedProducts.length > 0 ? matchedProducts.length : 0) +
    (query.trim() ? 1 : 0);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const val = query.trim();
    if (val) {
      setIsOpen(false);
      if (onNavigate) onNavigate();
      router.push(`/shop?q=${encodeURIComponent(val)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalNavigableItems - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalNavigableItems - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        e.preventDefault();
        // Category indices first
        if (selectedIndex < matchedCategories.length) {
          const cat = matchedCategories[selectedIndex];
          setIsOpen(false);
          if (onNavigate) onNavigate();
          router.push(`/category/${cat.slug}`);
          return;
        }
        // Product indices
        const prodIndex = selectedIndex - matchedCategories.length;
        if (prodIndex < matchedProducts.length) {
          const prod = matchedProducts[prodIndex];
          setIsOpen(false);
          if (onNavigate) onNavigate();
          router.push(`/product/${prod.slug}`);
          return;
        }
        // Submit full search
        handleSubmit();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    setIsOpen(false);
    if (onNavigate) onNavigate();
    router.push(`/shop?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isMobile ? "max-w-full" : "flex-1 w-full mx-2 md:mx-4 lg:mx-8"
      }`}
    >
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} role="search" className="relative w-full">
        <div
          className={`flex items-center w-full bg-white border-2 transition-all duration-150 ${
            isOpen
              ? "border-[#55387D] shadow-[0_0_0_2px_rgba(85,56,125,0.15)]"
              : "border-[#D1D5DB] hover:border-[#9CA3AF] focus-within:border-[#55387D]"
          } ${isMobile ? "h-10" : "h-11 sm:h-12"}`}
        >
          {/* Leading Search Icon */}
          <div className="pl-3.5 pr-2 text-[#6B7280] flex items-center justify-center pointer-events-none">
            <Search size={isMobile ? 17 : 20} strokeWidth={2.4} className="text-[#55387D]" />
          </div>

          {/* Search Input Field */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              isMobile
                ? "Search cat food, treats, litter..."
                : "What can we help you find? (Search cat food, treats, litter, accessories...)"
            }
            className={`w-full bg-transparent text-[#111827] placeholder:text-[#9CA3AF] outline-none font-semibold ${
              isMobile ? "text-xs py-2 pr-2" : "text-sm py-2.5 pr-3"
            }`}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear Button */}
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setMatchedProducts([]);
                setMatchedCategories([]);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-gray-400 hover:text-[#111827] transition-colors"
              aria-label="Clear search query"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          )}

          {/* Submit Search Button */}
          <button
            type="submit"
            className={`h-full bg-[#55387D] hover:bg-[#432B64] text-white font-extrabold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${
              isMobile ? "px-3 text-xs" : "px-4 sm:px-5 text-xs"
            }`}
            aria-label="Search"
          >
            <span className={isMobile ? "sr-only" : "hidden sm:inline font-bold"}>Search</span>
            <Search size={isMobile ? 15 : 16} strokeWidth={2.4} className="sm:hidden" />
          </button>
        </div>
      </form>

      {/* Interactive Suggestions Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border-2 border-[#55387D] shadow-2xl divide-y divide-[#E5E7EB] overflow-hidden max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {/* 1. EMPTY QUERY STATE: TRENDING & CATEGORIES */}
          {!query.trim() && (
            <div className="p-4 space-y-4">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#55387D] mb-2.5">
                  <Flame size={14} className="text-[#FF3B69]" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleSelectTag(tag)}
                      className="px-2.5 py-1 text-xs font-bold bg-[#F3F4F6] text-[#374151] hover:bg-[#55387D] hover:text-white transition-colors border border-[#E5E7EB] hover:border-[#55387D]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump Links */}
              <div className="pt-2 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#6B7280] mb-2">
                  <Layers size={13} />
                  <span>Quick Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: "Cat Food", slug: "cat-food", icon: "🐱" },
                    { name: "Cat Litter", slug: "cat-litter", icon: "🧺" },
                    { name: "Cat Toys", slug: "cat-toys", icon: "🎾" },
                    { name: "Dog Food", slug: "dog-food", icon: "🐶" },
                  ].map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        if (onNavigate) onNavigate();
                      }}
                      className="flex items-center gap-2 p-2 bg-[#F9FAFB] hover:bg-[#F3EEF9] border border-[#E5E7EB] hover:border-[#55387D] transition-colors text-xs font-bold text-[#111827]"
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. LOADING STATE */}
          {query.trim() && loading && (
            <div className="p-4 flex items-center justify-center gap-2 text-xs font-bold text-[#6B7280]">
              <div className="h-4 w-4 border-2 border-[#55387D] border-t-transparent animate-spin rounded-full" />
              <span>Searching catalog for &quot;{query}&quot;...</span>
            </div>
          )}

          {/* 3. MATCHED CATEGORIES */}
          {query.trim() && !loading && matchedCategories.length > 0 && (
            <div className="p-3 bg-[#F9FAFB]">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#55387D] mb-2">
                <Sparkles size={13} />
                <span>Matching Categories</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat, idx) => {
                  const isHighlighted = selectedIndex === idx;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        if (onNavigate) onNavigate();
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-black uppercase transition-all ${
                        isHighlighted
                          ? "bg-[#55387D] text-white border-[#55387D]"
                          : "bg-white text-[#111827] border-[#D1D5DB] hover:border-[#55387D] hover:bg-[#F3EEF9]"
                      }`}
                    >
                      <span className="text-sm">{cat.symbol}</span>
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. MATCHED PRODUCTS */}
          {query.trim() && !loading && matchedProducts.length > 0 && (
            <div className="divide-y divide-[#F3F4F6]">
              <div className="px-3.5 py-2 bg-[#FAFAFA] text-[10px] font-black uppercase tracking-wider text-[#6B7280]">
                Suggested Products ({matchedProducts.length})
              </div>
              {matchedProducts.map((prod, idx) => {
                const globalIndex = matchedCategories.length + idx;
                const isHighlighted = selectedIndex === globalIndex;
                return (
                  <Link
                    key={prod.id || prod.slug}
                    href={`/product/${prod.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      if (onNavigate) onNavigate();
                    }}
                    className={`flex items-center justify-between p-3 transition-colors ${
                      isHighlighted
                        ? "bg-[#F3EEF9] border-l-4 border-l-[#55387D]"
                        : "hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      {/* Product Thumbnail / Icon */}
                      <div className="relative h-10 w-10 shrink-0 border border-[#E5E7EB] bg-white p-0.5 flex items-center justify-center">
                        {prod.imageUrl ? (
                          <Image
                            src={assetPath(prod.imageUrl)}
                            alt={prod.name}
                            fill
                            sizes="40px"
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-lg">🐱</span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="min-w-0 truncate">
                        <div className="text-xs font-bold text-[#111827] truncate">
                          {prod.name}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-[#6B7280] font-semibold mt-0.5">
                          <span className="uppercase tracking-wider text-[#55387D] font-bold">
                            {prod.categoryName || prod.categorySlug}
                          </span>
                          {prod.weight && <span>• {prod.weight}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="shrink-0 text-right">
                      <div className="text-xs font-black text-[#55387D]">
                        {formatPrice(prod.price)}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                        In Stock
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* 5. EMPTY SEARCH RESULTS */}
          {query.trim() &&
            !loading &&
            matchedProducts.length === 0 &&
            matchedCategories.length === 0 && (
              <div className="p-5 text-center">
                <p className="text-xs font-bold text-[#111827]">
                  No exact matches found for &quot;{query}&quot;
                </p>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Try searching for cat food, litter, treats, or check all products.
                </p>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#55387D] hover:bg-[#432B64] text-white text-xs font-black uppercase tracking-wider"
                >
                  <Search size={13} />
                  <span>Search All for &quot;{query}&quot;</span>
                </button>
              </div>
            )}

          {/* 6. BOTTOM ACTION BAR: VIEW ALL RESULTS */}
          {query.trim() && !loading && (
            <div
              onClick={() => handleSubmit()}
              className={`p-3 bg-[#F3EEF9] hover:bg-[#EADDFA] cursor-pointer flex items-center justify-between transition-colors border-t border-[#E5E7EB] ${
                selectedIndex === totalNavigableItems - 1 ? "bg-[#EADDFA]" : ""
              }`}
            >
              <span className="text-xs font-black uppercase tracking-wide text-[#55387D] flex items-center gap-1.5">
                <Search size={14} />
                <span>
                  View all results for &quot;{query}&quot;
                  {totalMatches > 0 ? ` (${totalMatches} items)` : ""}
                </span>
              </span>
              <ArrowRight size={14} className="text-[#55387D]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
