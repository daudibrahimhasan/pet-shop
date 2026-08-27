"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Home,
  Loader2,
  PackageCheck,
  PhoneCall,
  Truck,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/data";
import { placeCodOrder } from "@/app/actions/orders";
import { assetPath } from "@/lib/assets";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await placeCodOrder({
        customer: data,
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        })),
      });

      if (!result.success || !result.orderNumber) {
        throw new Error(result.error || "Could not place the order.");
      }

      const orderNumber = result.orderNumber;
      const saved = JSON.parse(localStorage.getItem("dhali-orders") || "[]");
      saved.unshift({
        orderNumber,
        customer: data,
        items: items.map(({ product, quantity }) => ({
          name: product.name,
          quantity,
          price: product.price,
        })),
        subtotal,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("dhali-orders", JSON.stringify(saved.slice(0, 20)));

      setOrder(orderNumber);
      clearCart();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "The order could not be processed. Please call 01618-500629 directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Order Confirmed Screen (Sharp Geometric)
  if (order) {
    return (
      <div className="container-page max-w-2xl py-16 text-center sm:py-24 pb-24 md:pb-24">
        <div className="mx-auto grid h-20 w-20 place-items-center border border-[#55387D]/20 bg-[#F3EEF9] text-[#55387D] shadow-xs">
          <CheckCircle2 size={42} strokeWidth={2.2} />
        </div>
        <span className="mt-6 inline-block bg-[#ECFFEC] border border-green-300 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-green-800">
          Order Placed Successfully
        </span>
        <h1 className="mt-3 text-2xl font-black uppercase text-[#111827] sm:text-3xl">
          Thank You! Your Order is Confirmed
        </h1>
        <div className="mx-auto mt-4 max-w-md border border-[#E5E7EB] bg-white p-5 text-left text-xs sm:text-sm shadow-xs">
          <p className="text-[#6B7280] font-bold">Order Reference Number:</p>
          <p className="text-xl font-black text-[#55387D]">{order}</p>
          <div className="mt-3 space-y-1.5 text-[#4B5563] font-medium">
            <p>• <strong>Store:</strong> DHALI&apos;S Unique Collection (Gulshan-2)</p>
            <p>• <strong>Payment Mode:</strong> Cash on Delivery (COD)</p>
            <p>• <strong>Hotline:</strong> 01618-500629</p>
            <p>• Our team will call your mobile number to confirm before courier dispatch.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#55387D] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
          >
            <span>Back to Home</span>
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 border border-[#D1D5DB] bg-white px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#111827] hover:bg-[#F4F6FA]"
          >
            <span>Track Order</span>
          </Link>
        </div>
      </div>
    );
  }

  // Empty State
  if (!items.length) {
    return (
      <div className="container-page py-16 text-center sm:py-24 pb-24 md:pb-24">
        <div className="mx-auto grid h-20 w-20 place-items-center border border-[#FFA000]/30 bg-[#FFF3EB] text-[#FFA000]">
          <PackageCheck size={40} strokeWidth={2.2} />
        </div>
        <h1 className="mt-6 text-2xl font-black uppercase text-[#111827] sm:text-3xl">
          No Items to Place Yet
        </h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-[#6B7280] sm:text-sm">
          Please add items to your basket before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-[#55387D] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
        >
          <span>Shop Cat & Dog Food</span>
          <ArrowRight size={16} strokeWidth={2.2} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <Link href="/cart" className="hover:text-[#55387D]">
          Basket
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">Cash on Delivery Checkout</span>
      </nav>

      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-xl font-black uppercase tracking-tight text-[#111827] sm:text-2xl">
          Cash on Delivery Checkout
        </h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Pay in cash upon doorstep delivery from DHALI&apos;S Unique Collection (Gulshan-2). No advance payment needed.
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Form (Sharp Geometric Inputs) */}
        <form
          onSubmit={submit}
          className="space-y-5 border border-[#E5E7EB] bg-white p-5 sm:p-7 shadow-xs"
        >
          <div className="border-b border-[#E5E7EB] pb-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#111827]">1. Delivery Details</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs font-bold text-[#111827]">
              <span>Full Name <span className="text-[#D91E18]">*</span></span>
              <input
                name="name"
                required
                minLength={2}
                autoComplete="name"
                placeholder="e.g. Tanvir Ahmed"
                className="w-full border border-[#D1D5DB] bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-[#55387D]"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-[#111827]">
              <span>Phone Number <span className="text-[#D91E18]">*</span></span>
              <input
                name="phone"
                required
                inputMode="tel"
                pattern="^(?:\+?88)?01[3-9]\d{8}$"
                autoComplete="tel"
                placeholder="01XXXXXXXXX"
                className="w-full border border-[#D1D5DB] bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-[#55387D]"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-xs font-bold text-[#111827]">
            <span>Area / District <span className="text-[#D91E18]">*</span></span>
            <select
              name="area"
              required
              defaultValue="Dhaka - Inside City"
              className="w-full border border-[#D1D5DB] bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-[#55387D] cursor-pointer"
            >
              <option value="Dhaka - Inside City">Dhaka - Inside City</option>
              <option value="Dhaka - Suburbs (Savar/Gazipur/Keraniganj)">Dhaka - Suburbs</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Other District">Other District (All Bangladesh)</option>
            </select>
          </label>

          <label className="grid gap-1.5 text-xs font-bold text-[#111827]">
            <span>Full Delivery Address <span className="text-[#D91E18]">*</span></span>
            <textarea
              name="address"
              required
              minLength={10}
              rows={3}
              autoComplete="street-address"
              placeholder="House, Road, Area, Landmark"
              className="w-full border border-[#D1D5DB] bg-white p-3 text-xs sm:text-sm outline-none focus:border-[#55387D]"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-bold text-[#111827]">
            <span>Order Notes <span className="font-normal text-gray-400">(Optional)</span></span>
            <textarea
              name="notes"
              maxLength={400}
              rows={2}
              placeholder="Special instructions for delivery"
              className="w-full border border-[#D1D5DB] bg-white p-3 text-xs sm:text-sm outline-none focus:border-[#55387D]"
            />
          </label>

          {error && (
            <div role="alert" className="border border-red-300 bg-red-50 p-3 text-xs font-bold text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 bg-[#55387D] py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#432B64] disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Place Cash on Delivery Order</span>
                <ArrowRight size={15} strokeWidth={2.2} />
              </>
            )}
          </button>
        </form>

        {/* Aside Review (Sharp Box) */}
        <aside className="h-fit border border-[#E5E7EB] bg-white p-5 shadow-xs lg:sticky lg:top-28">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#111827]">2. Order Summary</h2>

          <div className="mt-3 max-h-64 overflow-y-auto space-y-2.5 border-b border-[#E5E7EB] pb-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 text-xs">
                <div className="relative h-11 w-11 shrink-0 border border-[#E5E7EB] bg-[#FAF8F5] p-1">
                  {product.imageUrl ? (
                    <Image
                      src={assetPath(product.imageUrl)}
                      alt={product.name}
                      fill
                      sizes="44px"
                      className="object-contain"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ backgroundColor: product.color || "#F3EEF9" }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 font-bold text-[#111827]">{product.name}</p>
                  <p className="text-[11px] text-[#6B7280]">{quantity} × {formatPrice(product.price)}</p>
                </div>
                <span className="font-black text-[#55387D] tabular-nums">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3.5 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-[#4B5563]">
              <span>Items Subtotal</span>
              <strong className="text-[#111827] font-black tabular-nums">{formatPrice(subtotal)}</strong>
            </div>
            <div className="flex justify-between text-[#4B5563]">
              <span>Delivery Charge</span>
              <span className="text-[#55387D] font-bold">Confirmed on call (COD)</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3 text-base">
              <span className="font-black uppercase text-[#111827] text-sm">Total Payable</span>
              <strong className="text-xl font-black text-[#55387D] tabular-nums">{formatPrice(subtotal)}</strong>
            </div>
          </div>

          <div className="mt-4 border border-[#55387D]/20 bg-[#F9F6FC] p-3 text-xs text-[#4B5563]">
            <div className="flex items-center gap-1.5 font-black text-[#55387D] mb-1 uppercase text-[11px]">
              <Truck size={14} strokeWidth={2.2} />
              <span>Cash on Delivery Only</span>
            </div>
            <p>
              Pay the exact amount in cash directly to the courier upon parcel handover.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#6B7280]">
            <PhoneCall size={13} strokeWidth={2.2} className="text-[#55387D]" />
            <span>Store hotline: <strong>01618-500629</strong></span>
          </div>
        </aside>
      </div>
    </div>
  );
}
