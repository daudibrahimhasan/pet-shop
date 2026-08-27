"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Heart, Package, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { assetPath } from "@/lib/assets";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isPriceSet = product.price > 0;
  const isOutOfStock = product.outOfStock || product.stock < 1;

  const handleAddToCart = () => {
    if (!isPriceSet) return;
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="dhali-card group h-full bg-white flex flex-col justify-between">
      {/* 1. TOP IMAGE STACK WITH SHARP BADGES */}
      <div className="relative">
        {/* Badge if defined */}
        {product.badge && (
          <div className="absolute left-2 top-2 z-10 pointer-events-none">
            <span className="badge-new-blue font-black">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center bg-white/95 text-[#55387D] border border-[#E5E7EB] hover:border-[#55387D] transition-colors btn-press"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={14}
            strokeWidth={2.2}
            className={liked ? "fill-[#FF3B69] text-[#FF3B69]" : "text-[#55387D]"}
          />
        </button>

        {/* Product Image / Placeholder */}
        <Link
          href={`/product/${product.slug}`}
          className="card-img-wrap block bg-white"
          aria-label={product.name}
        >
          {product.imageUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={assetPath(product.imageUrl)}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center p-3 text-center transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: product.color || "#F8F9FA" }}
            >
              <div className="grid h-12 w-12 place-items-center border border-[#55387D]/15 bg-white/90 text-[#55387D] shadow-2xs mb-2">
                <Package size={22} strokeWidth={1.8} />
              </div>
              <span className="text-[9.5px] font-black uppercase tracking-wider text-[#55387D]">
                DHALI&apos;S UNIQUE COLLECTION
              </span>
              <span className="text-[11px] font-bold text-[#6B7280] mt-0.5">
                Item Placeholder
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* 2. STRUCTURED INFORMATION STACK */}
      <div className="flex flex-1 flex-col p-3 sm:p-3.5 space-y-2">
        {/* Row 1: Brand & Category Stack */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
          <span className="truncate">{product.brand || "DHALI'S"}</span>
          <span className="text-[#9CA3AF]">
            {product.weight || (product.categorySlug ? product.categorySlug.replace("-", " ") : "In Stock Soon")}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3 className="line-clamp-2 min-h-[34px] text-xs font-black leading-snug text-[#111827] hover:text-[#55387D] transition-colors">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Row 3: Pricing Stack */}
        <div className="mt-auto pt-2 flex items-baseline gap-2 tabular-nums">
          {isPriceSet ? (
            <>
              <span className="text-base font-black text-[#55387D] sm:text-lg">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && product.compareAt > product.price && (
                <span className="text-xs font-semibold text-[#D91E18] line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs font-black uppercase tracking-wider text-[#55387D] bg-[#F3EEF9] px-2 py-0.5 border border-[#55387D]/20">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* 3. DOCKED BOTTOM ACTION BUTTON (SHARP SQAURE) */}
      <div className="border-t border-[#E5E7EB]">
        {isPriceSet ? (
          isOutOfStock ? (
            <button
              type="button"
              disabled
              className="flex w-full items-center justify-center gap-1.5 bg-[#FFA000] py-2.5 text-xs font-black text-white uppercase tracking-wider cursor-not-allowed opacity-95"
            >
              <ShoppingBag size={14} strokeWidth={2.2} />
              <span>Out Of Stock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex w-full items-center justify-center gap-1.5 py-2.5 text-xs font-black text-white uppercase tracking-wider transition-colors btn-press ${
                justAdded
                  ? "bg-green-700"
                  : "bg-[#55387D] hover:bg-[#432B64] active:bg-[#3B2358]"
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check size={14} strokeWidth={2.5} />
                  <span>Added ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} strokeWidth={2.2} />
                  <span>Add To Cart</span>
                </>
              )}
            </button>
          )
        ) : (
          <Link
            href={`/product/${product.slug}`}
            className="flex w-full items-center justify-center gap-1.5 py-2.5 text-xs font-black text-[#55387D] bg-[#F9FAFB] hover:bg-[#F3EEF9] uppercase tracking-wider transition-colors"
          >
            <span>View Details</span>
            <ArrowRight size={13} strokeWidth={2.2} />
          </Link>
        )}
      </div>
    </article>
  );
}
