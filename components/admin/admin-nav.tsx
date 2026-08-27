import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogOut, PackagePlus, ShoppingBag, Store } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { assetPath } from "@/lib/assets";

export function AdminNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#432B64] bg-[#55387D] text-white shadow-sm">
      <div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-4 py-2.5">
        {/* Brand & Title */}
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 border border-white/20 bg-white p-1 shadow-xs">
            <Image
              src={assetPath("/brand/dhali-logo.png")}
              alt="DHALI's"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div>
            <span className="block text-xs font-black uppercase tracking-wider text-white">
              DHALI&apos;S Store Admin
            </span>
            <span className="block text-[10px] font-bold text-white/70 uppercase tracking-widest">
              Management Portal
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5" aria-label="Admin Navigation">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white/15 transition-colors border border-transparent hover:border-white/20"
          >
            <LayoutDashboard size={15} strokeWidth={2.2} />
            <span>Overview</span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white/15 transition-colors border border-transparent hover:border-white/20"
          >
            <PackagePlus size={15} strokeWidth={2.2} />
            <span>Products</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white/15 transition-colors border border-transparent hover:border-white/20"
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span>Orders</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Store size={15} strokeWidth={2} />
            <span>Storefront ↗</span>
          </Link>

          {/* Sign out */}
          <form action={logoutAdmin} className="ml-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#432B64] hover:bg-red-700 px-3 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors border border-white/20"
              aria-label="Sign out"
              title="Sign out of admin"
            >
              <LogOut size={14} strokeWidth={2.2} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
