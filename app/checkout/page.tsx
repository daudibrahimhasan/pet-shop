"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, PackageCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/data";
import { placeCodOrder } from "@/app/actions/orders";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await placeCodOrder({ customer: data, items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })) });
      if (!result.success || !result.orderNumber) throw new Error(result.error || "Could not place the order.");
      const orderNumber = result.orderNumber;
      const saved = JSON.parse(localStorage.getItem("dhali-orders") || "[]");
      saved.unshift({ orderNumber, customer: data, items: items.map(({ product, quantity }) => ({ name: product.name, quantity, price: product.price })), subtotal, status: "Pending", createdAt: new Date().toISOString() });
      localStorage.setItem("dhali-orders", JSON.stringify(saved.slice(0, 20)));
      setOrder(orderNumber); clearCart();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "The order could not be saved. Please call 01618-500629."); } finally { setSubmitting(false); }
  }
  if (order) return <div className="container-page max-w-2xl py-24 text-center"><CheckCircle2 className="mx-auto text-leaf" size={64}/><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-leaf">Order received</p><h1 className="display mt-2 text-5xl">Thanks. We&apos;ve got it.</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-stone-600">Your order number is <strong className="text-ink">{order}</strong>. We may call to confirm the address before dispatch. You&apos;ll pay in cash when it arrives.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-orange px-6 font-black text-white">Back to home</Link></div>;
  if (!items.length) return <div className="container-page py-24 text-center"><PackageCheck className="mx-auto text-orange" size={56}/><h1 className="display mt-5 text-5xl">No order to place yet</h1><p className="mt-3 text-stone-600">Add something to your cart first.</p><Link href="/shop" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-orange px-6 font-black text-white">Shop products</Link></div>;
  return <div className="container-page py-12 md:py-16"><p className="text-xs font-black uppercase tracking-[.2em] text-orange">Cash on Delivery</p><h1 className="display mt-2 text-5xl md:text-6xl">Place your order</h1><div className="mt-9 grid gap-8 lg:grid-cols-[1fr_400px]"><form onSubmit={submit} className="grid gap-5 rounded-[24px] border border-line bg-white p-5 md:p-8"><div><h2 className="text-xl font-black">Delivery details</h2><p className="mt-1 text-sm text-stone-500">We&apos;ll only use these details to fulfil this order.</p></div><label className="grid gap-2 font-bold">Full name<input name="name" required minLength={2} autoComplete="name" className="min-h-12 rounded-xl border border-line px-4 font-normal focus:border-leaf" placeholder="Your full name"/></label><label className="grid gap-2 font-bold">Phone number<input name="phone" required inputMode="tel" pattern="^(?:\+?88)?01[3-9]\d{8}$" autoComplete="tel" className="min-h-12 rounded-xl border border-line px-4 font-normal focus:border-leaf" placeholder="01XXXXXXXXX"/><span className="text-xs font-normal text-stone-500">Use a valid Bangladesh mobile number.</span></label><label className="grid gap-2 font-bold">Delivery address<textarea name="address" required minLength={10} rows={4} autoComplete="street-address" className="rounded-xl border border-line p-4 font-normal focus:border-leaf" placeholder="House, road, area and city"/></label><label className="grid gap-2 font-bold">Order notes <span className="font-normal text-stone-400">(optional)</span><textarea name="notes" maxLength={500} rows={3} className="rounded-xl border border-line p-4 font-normal focus:border-leaf" placeholder="Landmark, preferred time, or anything else"/></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-800">{error}</p>}<button disabled={submitting} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-orange px-7 py-3 font-black text-white hover:bg-[#c94f02] disabled:cursor-wait disabled:opacity-60">{submitting && <Loader2 className="animate-spin" size={18}/>} {submitting ? "Placing order..." : "Place COD order"}</button></form><aside className="h-fit rounded-[24px] bg-cream p-6 lg:sticky lg:top-32"><h2 className="text-xl font-black">Your order</h2><div className="mt-5 grid gap-4">{items.map(({ product, quantity }) => <div key={product.id} className="flex justify-between gap-4 border-b border-line pb-4 text-sm"><span>{quantity} × {product.name}</span><strong className="whitespace-nowrap">{formatPrice(product.price * quantity)}</strong></div>)}</div><div className="mt-5 flex items-center justify-between text-lg"><span className="font-black">Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="mt-5 flex gap-3 rounded-xl bg-white p-4 text-sm leading-6"><CheckCircle2 className="shrink-0 text-leaf" size={20}/><p><strong>Cash on Delivery only.</strong><br/>No card, bKash or Nagad payment is requested.</p></div></aside></div></div>;
}
