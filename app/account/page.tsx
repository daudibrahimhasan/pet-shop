"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";

type SavedOrder = { orderNumber: string; subtotal: number; status: string; createdAt: string; items: { name: string; quantity: number }[] };

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[] | null>(null);
  useEffect(() => { try { setOrders(JSON.parse(localStorage.getItem("dhali-orders") || "[]")); } catch { setOrders([]); } }, []);
  return <div className="container-page py-14 md:py-20"><div className="mb-9"><p className="text-xs font-black uppercase tracking-[.2em] text-orange">This device</p><h1 className="display mt-2 text-5xl md:text-6xl">Recent orders</h1><p className="mt-4 max-w-lg leading-7 text-stone-600">Orders placed from this browser appear here. For order help, call 01618-500629.</p></div>{orders === null ? <div className="h-32 animate-pulse rounded-2xl bg-cream"/> : orders.length ? <div className="grid gap-4">{orders.map((order) => <article key={order.orderNumber} className="grid gap-4 rounded-2xl border border-line bg-white p-5 md:grid-cols-[1fr_1fr_auto]"><div><p className="font-black">{order.orderNumber}</p><p className="mt-1 text-sm text-stone-500">{new Date(order.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}</p></div><p className="text-sm leading-6">{order.items.map((item) => `${item.quantity} × ${item.name}`).join(", ")}</p><div className="md:text-right"><p className="font-black">{formatPrice(order.subtotal)}</p><p className="mt-1 text-sm font-bold text-leaf">{order.status}</p></div></article>)}</div> : <div className="rounded-[24px] border border-dashed border-line bg-cream p-12 text-center"><Package className="mx-auto text-stone-400" size={42}/><h2 className="mt-4 text-xl font-black">No orders on this device</h2><p className="mt-2 text-stone-500">When you place a COD order, it will show up here.</p><Link href="/shop" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-orange px-6 font-black text-white">Browse products</Link></div>}</div>;
}
