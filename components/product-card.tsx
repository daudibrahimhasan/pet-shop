"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import Image from "next/image";
import { assetPath } from "@/lib/assets";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white">
    <Link href={`/product/${product.slug}`} className="relative grid aspect-[4/5] place-items-center overflow-hidden bg-mist" aria-label={product.name}>
      {product.badge && <span className="absolute left-3 top-3 z-10 rounded-md bg-ink px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-white">{product.badge}</span>}
      {product.imageUrl ? <Image src={assetPath(product.imageUrl)} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-5"/> : <div className="product-bag" style={{ "--bag": product.color } as React.CSSProperties}/>} 
    </Link>
    <div className="flex flex-1 flex-col p-3 sm:p-4"><p className="text-[11px] font-bold text-sage sm:text-xs">{product.weight}</p><h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 sm:text-base sm:leading-6"><Link href={`/product/${product.slug}`} className="hover:text-papaya">{product.name}</Link></h3><div className="mt-auto flex items-end justify-between gap-1.5 pt-3 sm:gap-2 sm:pt-4"><div><span className="text-base font-black sm:text-lg">{formatPrice(product.price)}</span>{product.compareAt && <span className="ml-2 hidden text-xs text-stone-400 line-through sm:inline">{formatPrice(product.compareAt)}</span>}</div><button onClick={() => addItem(product)} disabled={product.stock < 1} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 bg-papaya px-2.5 text-white hover:bg-papaya-dark disabled:cursor-not-allowed disabled:bg-stone-300 sm:px-3" aria-label={`Add ${product.name} to cart`}><ShoppingBag size={18}/><span className="hidden text-sm font-black lg:inline">Add</span></button></div></div>
  </article>;
}
