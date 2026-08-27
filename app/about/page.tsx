import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight, Clock, Home, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { assetPath } from "@/lib/assets";

export const metadata = {
  title: "About Us | DHALI'S Unique Collection - Gulshan-2, Dhaka",
  description: "Learn about DHALI'S Unique Collection, your trusted neighborhood pet shop at D.N.C.C Market, Gulshan-2, Dhaka.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">About Our Shop</span>
      </nav>

      {/* Hero Banner (Sharp Box) */}
      <div className="border border-[#E5E7EB] bg-[#F9F6FC] p-6 sm:p-12 shadow-xs">
        <div className="max-w-2xl">
          <span className="inline-block bg-[#55387D] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
            Gulshan-2 Neighborhood Pet Shop
          </span>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111827] sm:text-4xl leading-tight">
            DHALI&apos;S Unique Collection
          </h1>
          <p className="mt-4 text-xs leading-relaxed text-[#4B5563] sm:text-base font-medium">
            Located at <strong>G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212</strong>, we are dedicated to supplying authentic imported dog and cat food, delicious treats, clumping cat litter, and pet accessories directly to your home with prompt Cash on Delivery.
          </p>
        </div>
      </div>

      {/* Store Highlights Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-black uppercase text-[#111827] sm:text-2xl">
              Authentic Nutrition for Cats & Dogs
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
              We understand that your pets are part of your family. Finding genuine imported food with certified batch freshness shouldn&apos;t be difficult. That&apos;s why we stock only authentic, vetted products from brands like SmartHeart, Royal Canin, Reflex, Drools, Nekko, Wanpy, Me-O, and Kasty.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <CheckCircle2 size={20} strokeWidth={2.2} className="mt-0.5 text-[#55387D] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#111827] block mb-0.5 font-black uppercase">100% Genuine Nutrition</strong>
                  <span className="text-[#6B7280]">Imported stock with verified freshness and batch controls.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                <ShieldCheck size={20} strokeWidth={2.2} className="mt-0.5 text-[#55387D] shrink-0" />
                <div className="text-xs">
                  <strong className="text-[#111827] block mb-0.5 font-black uppercase">Cash on Delivery</strong>
                  <span className="text-[#6B7280]">Pay comfortably in cash when your order reaches your door.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Photos (Sharp Frames) */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative h-52 border border-[#E5E7EB] shadow-xs">
              <Image
                src={assetPath("/images/dhali-shop-exterior-v2.png")}
                alt="DHALI's Storefront in Gulshan-2"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover"
              />
            </div>
            <div className="relative h-52 border border-[#E5E7EB] shadow-xs">
              <Image
                src={assetPath("/images/dhali-shop-interior-v2.png")}
                alt="DHALI's Store Shelves with Pet Nutrition"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Storefront Contact Card (Sharp Box) */}
        <aside className="h-fit border border-[#55387D] bg-[#55387D] p-6 sm:p-8 text-white shadow-md">
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
            <Sparkles size={14} className="text-[#FDC040]" />
            <span>Storefront Location</span>
          </div>

          <h2 className="mt-4 text-2xl font-black uppercase text-white">Visit Our Shop</h2>
          <p className="mt-2 text-xs leading-relaxed text-gray-200 sm:text-sm font-medium">
            You are always welcome to visit us in person at D.N.C.C Market.
          </p>

          <div className="mt-6 space-y-4 text-xs sm:text-sm border-t border-white/20 pt-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-[#FDC040]" />
              <span>
                <strong>Shop Address:</strong><br />
                G-1,2,3, D.N.C.C Market,<br />
                Gulshan-2, Dhaka-1212, Bangladesh
              </span>
            </div>

            <a
              href="tel:+8801618500629"
              className="flex items-center gap-3 font-black text-white hover:text-[#FDC040] transition-colors"
            >
              <Phone size={18} className="shrink-0 text-[#FDC040]" />
              <span>Hotline: 01618-500629</span>
            </a>

            <div className="flex items-center gap-3 text-gray-300">
              <Clock size={18} className="shrink-0 text-[#FDC040]" />
              <span>Open Daily: 10:00 AM – 10:00 PM</span>
            </div>
          </div>

          <Link
            href="/shop"
            className="mt-8 flex w-full items-center justify-center gap-2 bg-white py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#55387D] shadow-xs hover:bg-gray-100"
          >
            <span>Explore All Products</span>
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
