"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Phone, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";

const navigation = [
  { href: "/shop", label: "Shop all" },
  { href: "/category/cat-food", label: "Cats" },
  { href: "/category/dog-food", label: "Dogs" },
  { href: "/category/treats", label: "Treats" },
  { href: "/category/accessories", label: "Accessories" },
];

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (value) router.push(`/shop?q=${encodeURIComponent(value)}`);
  };

  if (pathname.startsWith("/admin")) return null;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="container-page flex min-h-[74px] items-center gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="DHALI's Unique Collection home">
            <Image src="/brand/dhali-logo.png" alt="" width={48} height={48} className="h-11 w-11 rounded-full object-cover mix-blend-multiply" priority />
            <span className="leading-none">
              <strong className="font-display block text-[17px] tracking-[-.03em]">DHALI&apos;S</strong>
              <span className="mt-1 block text-[9px] font-bold tracking-[.13em] text-muted">UNIQUE COLLECTION</span>
            </span>
          </Link>

          <nav className="hidden h-[74px] items-stretch lg:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex min-h-11 items-center border-b-2 px-3 text-sm font-bold ${isActive(item.href) ? "border-orange text-orange" : "border-transparent text-cocoa hover:text-orange"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto hidden w-full max-w-[260px] md:block" role="search">
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <div className="relative">
              <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-h-11 w-full rounded-lg border border-line bg-[#faf9f6] px-4 pr-11 text-sm outline-none focus:border-sage" />
              <button aria-label="Search products" className="absolute right-0 top-0 grid min-h-11 min-w-11 place-items-center text-cocoa hover:text-orange"><Search size={20} /></button>
            </div>
          </form>

          <div className="flex items-center gap-1">
            <Link href="/account" className="hidden min-h-11 items-center gap-2 px-2 text-sm font-bold hover:text-orange xl:flex" aria-label="View recent orders"><UserRound size={20} /> Orders</Link>
            <Link href="/cart" className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-bold hover:bg-[#f8f3ec]" aria-label={`Cart with ${count} items`}>
              <span className="relative"><ShoppingBag size={21} />{count > 0 && <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-orange px-1 text-[10px] font-black text-white">{count}</span>}</span>
              <span className="hidden xl:inline">Cart</span>
            </Link>
            <button type="button" onClick={() => setOpen((value) => !value)} className="grid min-h-11 min-w-11 place-items-center lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
            <div className="container-page py-4">
              <form onSubmit={submit} className="mb-4 md:hidden" role="search">
                <label htmlFor="mobile-search" className="sr-only">Search products</label>
                <div className="relative">
                  <input id="mobile-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-h-12 w-full rounded-lg border border-line bg-[#faf9f6] px-4 pr-12 outline-none focus:border-sage" />
                  <button aria-label="Search products" className="absolute right-0 top-0 grid min-h-12 min-w-12 place-items-center"><Search size={20} /></button>
                </div>
              </form>
              <nav className="grid" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? "page" : undefined} className={`flex min-h-12 items-center border-b border-line px-1 font-bold ${isActive(item.href) ? "text-orange" : "text-cocoa"}`}>{item.label}</Link>
                ))}
                <Link href="/account" onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-2 px-1 font-bold"><UserRound size={19} />Recent orders</Link>
                <a href="tel:+8801618500629" className="flex min-h-12 items-center gap-2 px-1 font-bold sm:hidden"><Phone size={18} />01618-500629</a>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
