import Image from "next/image";
import Link from "next/link";
import { Facebook, Headphones, Instagram, Mail, MapPin, Phone, ShieldCheck, Truck, Youtube } from "lucide-react";
import { assetPath } from "@/lib/assets";

export function Footer() {
  return (
    <footer className="mt-12 bg-white border-t border-[#E5E7EB] text-[#4B5563] pb-20 md:pb-0">
      {/* 1. Compact Feature Reassurance Strip */}
      <div className="border-b border-[#E5E7EB] bg-[#FAF8F5] py-3">
        <div className="container-page grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="flex items-center gap-2 px-1">
            <Truck size={16} strokeWidth={2.2} className="text-[#55387D] shrink-0" />
            <span className="text-[11px] font-black uppercase text-[#111827] truncate">Fast Delivery Dhaka & All BD</span>
          </div>
          <div className="flex items-center gap-2 px-1">
            <ShieldCheck size={16} strokeWidth={2.2} className="text-[#55387D] shrink-0" />
            <span className="text-[11px] font-black uppercase text-[#111827] truncate">100% Genuine Imported Stock</span>
          </div>
          <div className="flex items-center gap-2 px-1">
            <Headphones size={16} strokeWidth={2.2} className="text-[#55387D] shrink-0" />
            <a href="tel:+8801618500629" className="text-[11px] font-black uppercase text-[#111827] hover:text-[#55387D] truncate">Hotline: 01618-500629</a>
          </div>
          <div className="flex items-center gap-2 px-1">
            <MapPin size={16} strokeWidth={2.2} className="text-[#55387D] shrink-0" />
            <span className="text-[11px] font-black uppercase text-[#111827] truncate">Cash on Delivery (COD)</span>
          </div>
        </div>
      </div>

      {/* 2. Short & Compact Main Links Section */}
      <div className="container-page py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand & Store Info */}
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 border border-[#E5E7EB] bg-white p-1">
              <Image
                src={assetPath("/brand/dhali-logo.png")}
                alt="DHALI'S Unique Collection"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="block text-xs font-black uppercase tracking-tight text-[#111827]">
                DHALI&apos;S Unique Collection
              </span>
              <span className="block text-[10.5px] text-[#6B7280]">
                G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212 • <a href="tel:+8801618500629" className="font-bold text-[#55387D] hover:underline">01618-500629</a>
              </span>
            </div>
          </div>

          {/* Quick Links Inline Row */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-[#4B5563]" aria-label="Footer Navigation">
            <Link href="/" className="hover:text-[#55387D]">Home</Link>
            <Link href="/shop" className="hover:text-[#55387D]">All Products</Link>
            <Link href="/category/cat-food" className="hover:text-[#55387D]">Cat Food</Link>
            <Link href="/category/dog-food" className="hover:text-[#55387D]">Dog Food</Link>
            <Link href="/category/cat-litter" className="hover:text-[#55387D]">Cat Litter</Link>
            <Link href="/account" className="hover:text-[#55387D]">Track Order</Link>
            <Link href="/delivery" className="hover:text-[#55387D]">Delivery & COD</Link>
            <Link href="/about" className="hover:text-[#55387D]">About Shop</Link>
            <Link href="/privacy" className="hover:text-[#55387D]">Privacy</Link>
            <Link href="/admin/login" className="text-gray-400 hover:text-[#55387D]">Admin</Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5 text-[#55387D]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="grid h-7 w-7 place-items-center bg-[#F3EEF9] hover:bg-[#55387D] hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={13} strokeWidth={2} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="grid h-7 w-7 place-items-center bg-[#F3EEF9] hover:bg-[#55387D] hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={13} strokeWidth={2} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="grid h-7 w-7 place-items-center bg-[#F3EEF9] hover:bg-[#55387D] hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={13} strokeWidth={2} />
            </a>
            <a href="mailto:dhalisuniquecollection@gmail.com" className="grid h-7 w-7 place-items-center bg-[#F3EEF9] hover:bg-[#55387D] hover:text-white transition-colors" aria-label="Email shop">
              <Mail size={13} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Compact Copyright & "Built by Nexasity" Bar */}
      <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] py-3 text-[11px] text-[#6B7280]">
        <div className="container-page flex flex-col items-center justify-between gap-1 text-center sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} DHALI&apos;S Unique Collection. All rights reserved.</p>
          <p className="font-bold text-[#111827]">
            Built by <span className="text-[#55387D] font-black">Nexasity</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
