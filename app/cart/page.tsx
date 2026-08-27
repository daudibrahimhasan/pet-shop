"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Home, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/data";
import { assetPath } from "@/lib/assets";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (!items.length) {
    return (
      <div className="container-page py-16 text-center sm:py-24 pb-24 md:pb-24">
        <div className="mx-auto grid h-20 w-20 place-items-center border border-[#55387D]/20 bg-[#F3EEF9] text-[#55387D]">
          <ShoppingBag size={36} strokeWidth={2.2} />
        </div>
        <h1 className="mt-6 text-2xl font-black uppercase text-[#111827] sm:text-3xl">
          Your Shopping Basket is Empty
        </h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-[#6B7280] sm:text-sm">
          Browse our catalogue for authentic dog & cat food, treats, and pet accessories from DHALI&apos;S in Gulshan-2.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#55387D] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} strokeWidth={2.2} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">My Basket</span>
      </nav>

      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight text-[#111827] sm:text-2xl">
            Shopping Basket
          </h1>
          <p className="mt-1 text-xs text-[#6B7280]">
            You have <strong className="text-[#55387D]">{items.length}</strong> item{items.length === 1 ? "" : "s"} in your basket
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-black uppercase tracking-wider text-[#D91E18] hover:underline"
        >
          Clear Basket
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart Items List */}
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 border border-[#E5E7EB] bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs"
            >
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden border border-[#E5E7EB] bg-[#FAF8F5] p-1.5">
                  {product.imageUrl ? (
                    <Image
                      src={assetPath(product.imageUrl)}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ backgroundColor: product.color || "#F3EEF9" }}
                    />
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#55387D]">
                    {product.categoryName || product.categorySlug.replace("-", " ")}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#111827] hover:text-[#55387D]">
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#6B7280]">
                    {product.weight && <span>{product.weight}</span>}
                    <span>•</span>
                    <span className="font-extrabold text-[#55387D]">{formatPrice(product.price)} each</span>
                  </div>
                </div>
              </div>

              {/* Stepper, Total and Remove (Sharp Edges) */}
              <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3 sm:border-t-0 sm:pt-0 sm:justify-end sm:gap-6">
                {/* Stepper */}
                <div className="flex items-center border border-[#D1D5DB] bg-[#F9FAFB]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="grid h-7 w-7 place-items-center bg-white text-[#111827] border-r border-[#D1D5DB] hover:bg-[#55387D] hover:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} strokeWidth={2.5} />
                  </button>
                  <span className="min-w-[28px] text-center text-xs font-black text-[#111827] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="grid h-7 w-7 place-items-center bg-white text-[#111827] border-l border-[#D1D5DB] hover:bg-[#55387D] hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[70px]">
                  <span className="block text-sm font-black text-[#55387D] sm:text-base tabular-nums">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="grid h-8 w-8 place-items-center text-[#9CA3AF] border border-[#E5E7EB] hover:bg-red-50 hover:text-red-700 transition-colors"
                  aria-label={`Remove ${product.name} from basket`}
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Order Summary Aside (Sharp Geometry) */}
        <aside className="h-fit border border-[#E5E7EB] bg-white p-6 shadow-xs lg:sticky lg:top-28">
          <h2 className="text-base font-black uppercase text-[#111827]">Order Summary</h2>

          <div className="mt-4 space-y-2.5 border-b border-[#E5E7EB] pb-4 text-xs sm:text-sm">
            <div className="flex justify-between text-[#4B5563]">
              <span>Subtotal ({items.length} items)</span>
              <strong className="text-[#111827] font-black tabular-nums">{formatPrice(subtotal)}</strong>
            </div>
            <div className="flex justify-between text-[#4B5563]">
              <span>Estimated Delivery</span>
              <span className="text-[#55387D] font-bold">Confirmed on call (COD)</span>
            </div>
          </div>

          <div className="mt-3.5 flex items-center justify-between">
            <span className="text-sm font-black uppercase text-[#111827]">Total Payable</span>
            <span className="text-xl font-black text-[#55387D] tabular-nums">{formatPrice(subtotal)}</span>
          </div>

          <div className="mt-4 border border-[#55387D]/20 bg-[#F9F6FC] p-3.5 text-xs text-[#4B5563]">
            <div className="flex items-center gap-1.5 font-black text-[#55387D] mb-1 uppercase text-[11px]">
              <Truck size={14} strokeWidth={2.2} />
              <span>Cash on Delivery (COD)</span>
            </div>
            <span>No advance payment required. Pay in cash when delivered to your door.</span>
          </div>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 bg-[#55387D] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#432B64]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>

          <Link
            href="/shop"
            className="mt-3 flex w-full items-center justify-center text-xs font-bold text-[#6B7280] hover:text-[#55387D]"
          >
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
