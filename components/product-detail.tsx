"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import Image from "next/image";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  return <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
    <div className="relative grid aspect-[4/5] max-h-[650px] place-items-center overflow-hidden rounded-[18px] bg-mist">{product.badge && <span className="absolute left-5 top-5 z-10 rounded-lg bg-cocoa px-3 py-2 text-xs font-black text-white">{product.badge}</span>}{product.imageUrl?<Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-8"/>:<div className="product-bag max-h-[430px] max-w-[330px]" style={{ "--bag": product.color } as React.CSSProperties}/>}</div>
    <div className="self-center"><p className="text-sm font-black text-sage">{product.categorySlug.replace("-", " ")} / {product.weight}</p><h1 className="display mt-3 text-5xl leading-[1.02] md:text-6xl">{product.name}</h1><div className="mt-5"><span className="text-3xl font-black">{formatPrice(product.price)}</span>{product.compareAt && <span className="ml-3 text-lg text-stone-400 line-through">{formatPrice(product.compareAt)}</span>}</div><p className="mt-6 max-w-xl leading-8 text-muted">{product.description}</p>
      <div className="mt-8 flex flex-wrap gap-3"><div className="flex min-h-12 items-center rounded-xl border border-line bg-white"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid min-h-12 min-w-12 place-items-center" aria-label="Decrease quantity"><Minus size={18}/></button><span className="min-w-9 text-center font-black" aria-live="polite">{quantity}</span><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="grid min-h-12 min-w-12 place-items-center" aria-label="Increase quantity"><Plus size={18}/></button></div><button onClick={() => addItem(product, quantity)} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange px-7 font-black text-white hover:bg-[#c94f02]"><ShoppingBag size={19}/>Add to cart</button></div>
      <p className="mt-3 text-sm text-stone-500">{product.stock > 5 ? "In stock and ready to order" : `Only ${product.stock} left in stock`}</p>
      <div className="mt-9 grid gap-4 border-t border-line pt-7 sm:grid-cols-2"><div className="flex gap-3"><Truck className="shrink-0 text-orange"/><div><p className="font-black">Cash on Delivery</p><p className="mt-1 text-sm leading-6 text-stone-500">Pay when the order arrives.</p></div></div><div className="flex gap-3"><ShieldCheck className="shrink-0 text-leaf"/><div><p className="font-black">Order confirmation</p><p className="mt-1 text-sm leading-6 text-stone-500">We may call before dispatch.</p></div></div></div>
    </div>
  </div>;
}
