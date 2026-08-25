"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/data";

export function MobileCartBar() { const {count,subtotal}=useCart(); const pathname=usePathname(); if(!count||pathname.startsWith("/cart")||pathname.startsWith("/checkout")||pathname.startsWith("/admin")) return null; return <div className="fixed inset-x-3 bottom-3 z-40 md:hidden"><Link href="/cart" className="flex min-h-14 items-center justify-between rounded-2xl bg-cocoa px-5 text-white shadow-2xl"><span className="flex items-center gap-2 font-black"><ShoppingBag size={19}/>{count} item{count===1?"":"s"}</span><span className="font-black">View cart / {formatPrice(subtotal)}</span></Link></div>; }
