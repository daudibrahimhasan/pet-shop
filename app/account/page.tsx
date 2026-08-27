"use client";

import Link from "next/link";
import { Clock, Home, Package, Truck, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";

type SavedOrder = {
  orderNumber: string;
  subtotal: number;
  status: string;
  createdAt: string;
  customer?: { name?: string; phone?: string; address?: string };
  items: { name: string; quantity: number; price?: number }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[] | null>(null);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("dhali-orders") || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">Track Recent Orders</span>
      </nav>

      <div className="border-b border-[#E5E7EB] pb-4">
        <span className="bg-[#F3EEF9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#55387D] border border-[#55387D]/20">
          DHALI&apos;S Order Tracking
        </span>
        <h1 className="mt-2 text-xl font-black uppercase text-[#111827] sm:text-2xl">
          Recent Cash on Delivery Orders
        </h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Track orders placed through your browser. For inquiries, address changes or quick confirmation, call <strong>01618-500629</strong>.
        </p>
      </div>

      {orders === null ? (
        <div className="mt-8 grid gap-4">
          <div className="h-28 animate-pulse bg-white border border-[#E5E7EB]" />
          <div className="h-28 animate-pulse bg-white border border-[#E5E7EB]" />
        </div>
      ) : orders.length > 0 ? (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <article
              key={order.orderNumber}
              className="border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#6B7280]">Order Reference:</span>
                  <p className="text-base font-black text-[#55387D]">{order.orderNumber}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-[#6B7280] font-medium">
                    <Clock size={13} strokeWidth={2} />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-BD", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </span>

                  <span className="bg-[#ECFFEC] px-2.5 py-0.5 text-xs font-black uppercase text-green-800 border border-green-300">
                    {order.status || "Pending Confirmation"}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-4 grid gap-2 text-xs text-[#4B5563]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      <strong className="text-[#111827]">{item.quantity}×</strong> {item.name}
                    </span>
                    {item.price && (
                      <span className="text-[#6B7280] font-bold tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#6B7280] font-bold uppercase text-[11px]">
                  <Truck size={14} strokeWidth={2.2} className="text-[#55387D]" />
                  <span>Cash on Delivery</span>
                </span>
                <div className="text-right">
                  <span className="text-[#6B7280] text-[11px] font-bold">Total: </span>
                  <strong className="text-sm font-black text-[#55387D] sm:text-base tabular-nums">
                    {formatPrice(order.subtotal)}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-[#D1D5DB] bg-white p-12 text-center shadow-xs">
          <div className="mx-auto grid h-16 w-16 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
            <Package size={30} strokeWidth={2.2} />
          </div>
          <h2 className="mt-4 text-lg font-black uppercase text-[#111827]">No Orders Recorded Yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-xs text-[#6B7280] sm:text-sm">
            When you place a Cash on Delivery order with us, your order tracking reference will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 bg-[#55387D] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
}
