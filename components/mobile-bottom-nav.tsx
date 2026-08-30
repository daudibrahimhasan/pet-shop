"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, PackageCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { assetPath } from "@/lib/assets";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function MobileBottomNav({ onOpenCategories }: { onOpenCategories: () => void }) {
  const { count } = useCart();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";
  const isCart = pathname === "/cart";
  const isAccount = pathname === "/account";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-40 block md:hidden bg-white border-t border-[#E5E7EB] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
    >
      <div className="flex h-15 items-center justify-around px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {/* 1. Categories Tab */}
        <button
          type="button"
          onClick={onOpenCategories}
          className="flex flex-1 flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] text-[10px] font-black uppercase tracking-wider text-[#4B5563] hover:text-[#55387D] active:text-[#55387D]"
          aria-label="Open categories menu"
        >
          <LayoutGrid size={19} strokeWidth={2} className="text-[#374151]" />
          <span>Categories</span>
        </button>

        {/* 2. My Basket Tab */}
        <Link
          href="/cart"
          className={`relative flex flex-1 flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] text-[10px] font-black uppercase tracking-wider ${
            isCart ? "text-[#55387D]" : "text-[#4B5563] hover:text-[#55387D]"
          }`}
          aria-label={`My Basket with ${count} items`}
        >
          <div className="relative">
            <ShoppingBag
              size={19}
              strokeWidth={isCart ? 2.5 : 2}
              className={isCart ? "text-[#55387D]" : "text-[#374151]"}
            />
            {count > 0 && (
              <span className="absolute -right-2.5 -top-1 grid h-4 min-w-4 place-items-center bg-[#FF3B69] px-1 text-[9px] font-black text-white">
                {count}
              </span>
            )}
          </div>
          <span>Basket</span>
        </Link>

        {/* 3. Center Raised Home Token (Sharp Geometric Frame) */}
        <Link
          href="/"
          className="relative -top-3 flex flex-col items-center justify-center group"
          aria-label="Dhali Home"
        >
          <div
            className={`grid h-12 w-12 place-items-center bg-white p-1 shadow-md border-2 ${
              isHome ? "border-[#55387D]" : "border-[#111827] group-hover:border-[#55387D]"
            } transition-colors`}
          >
            <div className="relative h-9 w-9">
              <Image
                src={assetPath("/brand/dhali-logo.png")}
                alt="DHALI's"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
          </div>
          <span
            className={`text-[9.5px] font-black uppercase tracking-wider mt-0.5 ${
              isHome ? "text-[#55387D]" : "text-[#111827]"
            }`}
          >
            Home
          </span>
        </Link>

        {/* 4. Track Order Tab */}
        <Link
          href="/account"
          className={`flex flex-1 flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] text-[10px] font-black uppercase tracking-wider ${
            isAccount ? "text-[#55387D]" : "text-[#4B5563] hover:text-[#55387D]"
          }`}
          aria-label="Track order"
        >
          <PackageCheck
            size={19}
            strokeWidth={isAccount ? 2.5 : 2}
            className={isAccount ? "text-[#55387D]" : "text-[#374151]"}
          />
          <span>Track</span>
        </Link>

        {/* 5. Direct WhatsApp Support */}
        <a
          href="https://wa.me/8801618500629?text=Hello%20DHALI%27S%20Unique%20Collection%2C%20I%20would%20like%20to%20inquire%20about%20your%20pet%20products."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] text-[10px] font-black uppercase tracking-wider text-[#4B5563] hover:text-[#25D366]"
          aria-label="WhatsApp Support directly"
        >
          <WhatsAppIcon size={19} className="text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
