import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ShopGrid } from "@/components/shop-grid";
import { getProducts } from "@/lib/catalog";

export const dynamic = "force-static";
export const metadata = {
  title: "Shop Pet Food, Treats, Litter & Accessories | DHALI'S Unique Collection",
  description: "Browse authentic imported cat & dog foods, Nekko pouches, Pramy gravy, cat toys, clumping litter, and accessories from DHALI'S in Gulshan-2, Dhaka.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="container-page py-4 sm:py-6 pb-24 md:pb-10">
      {/* Breadcrumb Header Banner (Sharp Box) */}
      <div className="border border-[#E5E7EB] bg-[#F9F6FC] p-6 sm:p-8 shadow-xs">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
          <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
            <Home size={14} strokeWidth={2.2} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} strokeWidth={2} />
          <span className="text-[#55387D] font-black uppercase">All Products</span>
        </nav>

        <h1 className="mt-3 text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
          DHALI&apos;S Pet Pantry & Care Collection
        </h1>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
          Authentic cat and dog nutrition, tasty treats, hygienic clumping litter, and everyday supplies from D.N.C.C Market, Gulshan-2. Cash on Delivery across Bangladesh.
        </p>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <ShopGrid initialProducts={products} />
    </div>
  );
}
