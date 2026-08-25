"use client";

import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

export function ShopGrid({ initialProducts, initialQuery = "", initialSort = "featured" }: { initialProducts: Product[]; initialQuery?: string; initialSort?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort);
  const visible = useMemo(() => {
    const filtered = initialProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "popular") return [...filtered].sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    return filtered;
  }, [initialProducts, query, sort]);
  return <div>
    <div className="mb-6 grid gap-2 bg-white p-3 sm:mb-8 sm:grid-cols-[1fr_auto] sm:gap-3"><label className="sr-only" htmlFor="product-filter">Search products</label><input id="product-filter" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by product name" className="min-h-12 border border-clay px-4 focus:border-sage"/><label className="flex items-center gap-2 border border-clay px-3"><SlidersHorizontal size={18}/><span className="sr-only">Sort products</span><select value={sort} onChange={(e) => setSort(e.target.value)} className="min-h-12 w-full bg-transparent pr-3 font-bold outline-none"><option value="featured">Featured</option><option value="popular">Best sellers</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A-Z</option></select></label></div>
    <p className="mb-5 text-sm text-stone-500" aria-live="polite">{visible.length} product{visible.length === 1 ? "" : "s"}</p>
    {visible.length ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">{visible.map((product) => <ProductCard key={product.id} product={product}/>)}</div> : <div className="rounded-2xl border border-dashed border-line bg-cream px-6 py-16 text-center"><h2 className="text-xl font-black">No products found</h2><p className="mt-2 text-stone-600">Try a shorter product name or clear the search.</p><button onClick={() => setQuery("")} className="mt-5 min-h-11 rounded-xl bg-ink px-5 font-bold text-white">Clear search</button></div>}
  </div>;
}
