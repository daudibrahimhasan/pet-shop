"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Home,
  Minus,
  Package,
  PhoneCall,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { assetPath } from "@/lib/assets";
import { ProductCard } from "@/components/product-card";

type ProductDetailProps = {
  product: Product;
  relatedProducts?: Product[];
};

export function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "spec" | "shipping">("desc");

  const isPriceSet = product.price > 0;
  const isOutOfStock = product.outOfStock || product.stock < 1;

  const handleBuyNow = () => {
    if (!isPriceSet || isOutOfStock) return;
    addItem(product, quantity);
    router.push("/checkout");
  };

  const discountAmount = product.compareAt && product.compareAt > product.price ? product.compareAt - product.price : 0;

  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <Link href="/shop" className="hover:text-[#55387D]">
          Shop
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <Link href={`/category/${product.categorySlug}`} className="uppercase hover:text-[#55387D]">
          {product.categorySlug.replace("-", " ")}
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="line-clamp-1 font-black text-[#55387D]">{product.name}</span>
      </nav>

      {/* Main Product Card (Sharp Box Framing) */}
      <div className="grid gap-8 border border-[#E5E7EB] bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 shadow-xs">
        {/* Left: Image Container */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-[#E5E7EB] bg-white p-6 sm:p-10">
          {product.badge && (
            <div className="absolute left-3 top-3 z-10">
              <span className="badge-new-blue font-black">
                {product.badge}
              </span>
            </div>
          )}

          {product.imageUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={assetPath(product.imageUrl)}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
              style={{ backgroundColor: product.color || "#F8F9FA" }}
            >
              <div className="grid h-16 w-16 place-items-center border border-[#55387D]/15 bg-white/90 text-[#55387D] shadow-2xs mb-3">
                <Package size={30} strokeWidth={1.8} />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#55387D]">
                DHALI&apos;S UNIQUE COLLECTION
              </span>
              <span className="text-xs font-bold text-[#6B7280] mt-1">
                Item Placeholder
              </span>
            </div>
          )}
        </div>

        {/* Right: Product Information Stack */}
        <div className="flex flex-col justify-center">
          {/* Badges Stack */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${product.categorySlug}`}
              className="bg-[#F3EEF9] px-2.5 py-1 text-xs font-black uppercase text-[#55387D] border border-[#55387D]/20 hover:bg-[#55387D] hover:text-white transition-colors"
            >
              {product.categorySlug.replace("-", " ")}
            </Link>
            {product.brand && (
              <span className="bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 text-xs font-bold text-[#111827] uppercase">
                Brand: {product.brand}
              </span>
            )}
            {product.barcode && (
              <span className="bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 text-xs font-bold text-[#4B5563]">
                Barcode: {product.barcode}
              </span>
            )}
            <span className="px-2.5 py-1 text-xs font-black uppercase border bg-[#ECFFEC] text-green-800 border-green-300">
              {isPriceSet ? (isOutOfStock ? "✕ Out of Stock" : `✓ In Stock (${product.stock} units)`) : "In Stock Soon"}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 text-xl font-black text-[#111827] sm:text-2xl lg:text-3xl leading-snug">
            {product.name}
          </h1>

          {/* Price Box Stack (Sharp Border) */}
          <div className="mt-4 flex flex-wrap items-baseline gap-3 border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            {isPriceSet ? (
              <>
                <span className="text-2xl sm:text-3xl font-black text-[#55387D] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.compareAt && product.compareAt > product.price && (
                  <>
                    <span className="text-sm font-semibold text-[#D91E18] line-through tabular-nums">
                      {formatPrice(product.compareAt)}
                    </span>
                    <span className="bg-[#D91E18] px-2 py-0.5 text-xs font-black uppercase text-white">
                      Save {formatPrice(discountAmount)}
                    </span>
                  </>
                )}
              </>
            ) : (
              <div>
                <span className="text-lg sm:text-xl font-black text-[#55387D] uppercase">
                  Coming Soon / In Stock Soon
                </span>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Direct pricing and details will be updated once active in stock.
                </p>
              </div>
            )}
          </div>

          {/* Short Description */}
          <p className="mt-4 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
            {product.description}
          </p>

          {/* Action Buttons Stack */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isPriceSet ? (
              <>
                {/* Stepper */}
                <div className="flex items-center border border-[#D1D5DB] bg-[#F9FAFB]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                    className="grid h-10 w-10 place-items-center bg-white text-[#111827] border-r border-[#D1D5DB] hover:bg-[#55387D] hover:text-white transition-colors disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} strokeWidth={2.5} />
                  </button>
                  <span className="min-w-[40px] text-center text-sm font-black text-[#111827] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={isOutOfStock}
                    className="grid h-10 w-10 place-items-center bg-white text-[#111827] border-l border-[#D1D5DB] hover:bg-[#55387D] hover:text-white transition-colors disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} strokeWidth={2.5} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addItem(product, quantity)}
                  className="inline-flex flex-1 min-w-[130px] items-center justify-center gap-2 bg-[#55387D] px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[#432B64] shadow-xs"
                >
                  <ShoppingCart size={16} strokeWidth={2.2} />
                  <span>Add To Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex min-w-[130px] items-center justify-center gap-1.5 border-2 border-[#55387D] bg-white px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#55387D] hover:bg-[#F3EEF9]"
                >
                  <span>Order Now</span>
                  <ArrowRight size={15} strokeWidth={2.2} />
                </button>
              </>
            ) : (
              <a
                href="tel:+8801618500629"
                className="inline-flex items-center justify-center gap-2 bg-[#55387D] hover:bg-[#432B64] px-8 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-colors shadow-xs"
              >
                <PhoneCall size={16} strokeWidth={2.2} />
                <span>Call Hotline for Stock & Pricing: 01618-500629</span>
              </a>
            )}
          </div>

          {/* Quick Helpline */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#6B7280]">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={14} strokeWidth={2.2} className="text-[#55387D]" />
              <span>Cash on Delivery across Bangladesh</span>
            </span>
          </div>

          {/* Reassurance Features */}
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-4">
            <div className="flex items-start gap-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
                <Truck size={16} strokeWidth={2.2} />
              </div>
              <div className="text-xs">
                <strong className="text-[#111827] block font-black uppercase">Fast Delivery</strong>
                <span className="text-[#6B7280]">Safe doorstep dispatch</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="grid h-8 w-8 shrink-0 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
                <ShieldCheck size={16} strokeWidth={2.2} />
              </div>
              <div className="text-xs">
                <strong className="text-[#111827] block font-black uppercase">100% Genuine Stock</strong>
                <span className="text-[#6B7280]">Authentic imported items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Stack (Sharp Rectangles) */}
      <div className="mt-8 border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("desc")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors sm:text-sm ${
              activeTab === "desc"
                ? "bg-[#55387D] text-white shadow-xs"
                : "text-[#374151] bg-[#F3F4F6] hover:bg-[#E5E7EB]"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("shipping")}
            className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors sm:text-sm ${
              activeTab === "shipping"
                ? "bg-[#55387D] text-white shadow-xs"
                : "text-[#374151] bg-[#F3F4F6] hover:bg-[#E5E7EB]"
            }`}
          >
            Delivery & COD Terms
          </button>
        </div>

        <div className="mt-5 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
          {activeTab === "desc" && (
            <div className="space-y-3">
              <p>{product.description}</p>
              <p>
                All pet products at <strong>DHALI&apos;S Unique Collection</strong> are inspected for fresh batch packaging, nutrition integrity, and optimal pet safety.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-2 font-medium">
              <p>• <strong>Cash on Delivery (COD):</strong> Pay in cash directly upon receiving your package.</p>
              <p>• <strong>Store Pickup:</strong> G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212.</p>
              <p>• <strong>Support Hotline:</strong> 01618-500629.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
            <h2 className="text-base font-black uppercase tracking-tight text-[#111827] sm:text-lg">
              Other Catalogue Items
            </h2>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-xs font-black uppercase tracking-wider text-[#55387D] hover:underline"
            >
              View More →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
