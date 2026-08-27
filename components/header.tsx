"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { categories, formatPrice } from "@/lib/data";
import { assetPath } from "@/lib/assets";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Privilege Club" },
  { href: "/category/cat-food", label: "Cat Food", hasSub: true },
  { href: "/category/dog-food", label: "Dog Food", hasSub: true },
  { href: "/category/cat-toys", label: "Cat Toys" },
  { href: "/category/cat-litter", label: "Cat Litter", hasSub: true },
  { href: "/shop?q=Reflex", label: "Reflex" },
  { href: "/about", label: "About Shop" },
  { href: "/delivery", label: "Delivery & COD" },
];

export function Header() {
  const { count, subtotal } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const val = query.trim();
    if (val) {
      router.push(`/shop?q=${encodeURIComponent(val)}`);
      setMobileMenuOpen(false);
    }
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR (CRISP ARCHITECTURAL BORDER) */}
      <div className="bg-[#55387D] sm:bg-[#EFF3EB] text-xs text-white sm:text-[#4B5563] border-b border-[#432B64] sm:border-[#E5E7EB]">
        <div className="container-page flex min-h-[36px] items-center justify-between gap-2 py-1 px-3 sm:px-0">
          {/* Desktop Left: Store Details */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4 text-xs font-bold">
            <a
              href="tel:+8801618500629"
              className="flex items-center gap-1.5 hover:text-[#55387D]"
            >
              <Phone size={13} strokeWidth={2.2} className="text-[#55387D]" />
              <span>01618-500629</span>
            </a>
            <span className="text-gray-300">|</span>
            <Link
              href="/about"
              className="flex items-center gap-1.5 hover:text-[#55387D]"
            >
              <MapPin size={13} strokeWidth={2.2} className="text-[#55387D]" />
              <span>D.N.C.C Market, Gulshan-2, Dhaka</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/account"
              className="flex items-center gap-1.5 hover:text-[#55387D]"
            >
              <Truck size={13} strokeWidth={2.2} className="text-[#55387D]" />
              <span>Track Your Order</span>
            </Link>
          </div>

          {/* Center Promo Announcement */}
          <div className="flex-1 truncate font-bold text-white sm:text-[#111827] text-[11px] sm:text-xs">
            <span>DHALI&apos;S UNIQUE COLLECTION • Cash on Delivery Across Bangladesh</span>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-3 text-white sm:text-[#6B7280]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 sm:hover:text-[#55387D]" aria-label="Facebook">
              <Facebook size={13} strokeWidth={2} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 sm:hover:text-[#55387D]" aria-label="Instagram">
              <Instagram size={13} strokeWidth={2} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 sm:hover:text-[#55387D]" aria-label="LinkedIn">
              <Linkedin size={13} strokeWidth={2} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 sm:hover:text-[#55387D]" aria-label="YouTube">
              <Youtube size={13} strokeWidth={2} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 sm:hover:text-[#55387D]" aria-label="Twitter">
              <Twitter size={13} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (CRISP SQUARE EDGES, CLEAN LINES) */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="container-page py-3">
          {/* Top Row: Logo, Search (Desktop), Actions */}
          <div className="flex items-center justify-between gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex flex-col items-center justify-center min-h-[40px] min-w-[40px] text-[#111827] border border-[#E5E7EB] bg-[#F9FAFB] md:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={20} strokeWidth={2.2} />
              <span className="text-[9px] font-black uppercase mt-0.5">Menu</span>
            </button>

            {/* Dhali Logo (Clean Square Framing) */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3"
              aria-label="DHALI's Unique Collection Home"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 border border-[#E5E7EB] bg-white p-1">
                <Image
                  src={assetPath("/brand/dhali-logo.png")}
                  alt="DHALI's Unique Collection"
                  fill
                  priority
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="hidden xl:block">
                <span className="block text-base font-black tracking-tight text-[#111827] uppercase">
                  DHALI&apos;S
                </span>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#55387D]">
                  Unique Collection
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar (Sharp Geometric Box) */}
            <form
              onSubmit={handleSearch}
              className="relative hidden flex-1 max-w-2xl md:block mx-4"
              role="search"
            >
              <div className="relative flex items-center">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What can we help you find? (Search cat food, treats, litter...)"
                  className="w-full border border-[#D1D5DB] bg-white py-2.5 pl-4 pr-12 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#55387D] focus:ring-1 focus:ring-[#55387D]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#55387D] hover:bg-[#432B64] text-white flex items-center justify-center transition-colors"
                  aria-label="Search"
                >
                  <Search size={16} strokeWidth={2.2} />
                </button>
              </div>
            </form>

            {/* Right Stack: Hotline & Basket */}
            <div className="flex items-center gap-3">
              {/* Hotline Box (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 border border-[#55387D]/30 bg-[#F3EEF9] px-3.5 py-2 text-xs text-[#55387D] font-bold">
                <Phone size={13} strokeWidth={2.2} />
                <span>01618-500629</span>
              </div>

              {/* Desktop Basket Button (Sharp Rectangular) */}
              <Link
                href="/cart"
                className="hidden md:flex items-center gap-2 border border-[#111827] bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[#111827] transition-all hover:bg-[#55387D] hover:text-white hover:border-[#55387D]"
              >
                <ShoppingBag size={15} strokeWidth={2.2} />
                <span>My Basket ({count})</span>
              </Link>

              {/* Mobile Basket Bag Icon with Sharp Badge */}
              <Link
                href="/cart"
                className="relative md:hidden grid h-10 w-10 place-items-center border border-[#E5E7EB] bg-white text-[#111827]"
                aria-label={`View basket (${count} items)`}
              >
                <ShoppingBag size={20} strokeWidth={2.2} />
                <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center bg-[#FF3B69] px-1 text-[9.5px] font-black text-white">
                  {count}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar Row (Sharp Geometric) */}
          <div className="mt-2.5 md:hidden">
            <form onSubmit={handleSearch} className="relative flex">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What can we help you find?"
                className="w-full border border-[#D1D5DB] bg-white py-2 pl-3 pr-10 text-xs text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#55387D]"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 bg-[#55387D] text-white"
                aria-label="Search"
              >
                <Search size={15} strokeWidth={2.2} />
              </button>
            </form>
          </div>
        </div>

        {/* 3. NAVIGATION STRIP (Sharp Clean Links) */}
        <div className="hidden border-t border-[#E5E7EB] md:block bg-[#FAFAFA]">
          <div className="container-page flex items-center justify-between py-2 text-xs font-extrabold text-[#374151]">
            {/* Category Dropdown Trigger */}
            <Link
              href="/shop"
              className="flex items-center gap-1.5 px-3 py-1 bg-[#55387D] text-white uppercase tracking-wider text-[11px] hover:bg-[#432B64]"
            >
              <span>All Categories</span>
              <ChevronDown size={13} strokeWidth={2.2} />
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-1 uppercase tracking-wide text-[11px] transition-colors ${
                      isActive
                        ? "bg-[#111827] text-white"
                        : "text-[#374151] hover:text-[#55387D] hover:bg-[#F3F4F6]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasSub && (
                      <ChevronDown
                        size={11}
                        strokeWidth={2}
                        className={isActive ? "text-white" : "text-gray-400"}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              Gulshan-2, Dhaka
            </div>
          </div>
        </div>

        {/* 4. MOBILE DRAWER (Sharp Edge Stacks) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 md:hidden animate-in fade-in duration-150">
            <div className="relative max-h-[85vh] overflow-y-auto bg-white p-5 border-t-2 border-[#55387D] shadow-2xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 border border-[#E5E7EB] bg-white p-0.5">
                    <Image src={assetPath("/brand/dhali-logo.png")} alt="" fill className="object-contain" />
                  </div>
                  <div>
                    <span className="font-black text-[#111827] text-sm block uppercase">DHALI&apos;S</span>
                    <span className="text-[10px] text-[#55387D] font-bold uppercase tracking-wider">Unique Collection</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid h-8 w-8 place-items-center bg-[#F3F4F6] text-[#111827]"
                  aria-label="Close menu"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              {/* Grouped Stack Links */}
              <nav className="divide-y divide-[#E5E7EB] text-xs font-bold pt-2" aria-label="Mobile Drawer Navigation">
                {mainNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 text-[#1F2937] hover:text-[#55387D] px-2 uppercase tracking-wide"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} strokeWidth={2} className="text-gray-400" />
                  </Link>
                ))}
                <div className="pt-4">
                  <p className="text-[11px] font-black tracking-wider text-[#6B7280] uppercase mb-2.5 px-2">
                    Browse All Categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="bg-[#F9FAFB] p-3 text-[11px] font-bold text-[#111827] flex items-center gap-2 border border-[#E5E7EB] hover:border-[#55387D] hover:bg-[#F3EEF9] transition-colors"
                      >
                        <span className="text-base">{c.symbol}</span>
                        <span className="truncate uppercase">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* 5. DESKTOP FLOATING BASKET TAB (Sharp Geometry) */}
      <Link
        href="/cart"
        className="floating-basket-tab hidden sm:flex"
        aria-label={`View basket with ${count} items, total ${formatPrice(subtotal)}`}
      >
        <ShoppingCart size={17} strokeWidth={2.2} />
        <span className="text-[9px] font-black uppercase tracking-wider">Basket</span>
        <span className="text-xs font-black tracking-tight">{formatPrice(subtotal)}</span>
      </Link>

      {/* 6. MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav onOpenCategories={() => setMobileMenuOpen(true)} />
    </>
  );
}
