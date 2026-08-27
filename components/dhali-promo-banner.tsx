import Image from "next/image";
import { PhoneCall, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { assetPath } from "@/lib/assets";

export function DhaliPromoBanner() {
  return (
    <div className="relative w-full overflow-hidden border border-[#55387D]/20 bg-gradient-to-r from-[#EBF7F7] via-[#F3FAFA] to-[#E5F4F4] shadow-xs">
      <div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:px-6 sm:py-5">
        {/* Left: Dhali's Official Logo */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 border-2 border-[#55387D]/30 bg-white p-1.5 shadow-sm">
            <Image
              src={assetPath("/brand/dhali-logo.png")}
              alt="DHALI'S Unique Collection"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 bg-[#55387D] px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider text-white">
              <Sparkles size={10} />
              <span>DHALI&apos;S GULSHAN-2</span>
            </span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-[#111827] mt-1">
              তুরস্কের সেরা পোষা প্রাণীর খাবার
            </h3>
            <p className="text-[11px] font-bold text-[#55387D]">
              Reflex & 100% Authentic Imported Pet Nutrition
            </p>
          </div>
        </div>

        {/* Middle Feature Highlights */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-[#374151]">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck size={16} strokeWidth={2.2} className="text-[#55387D]" />
            <span>১০০% আসল ইম্পোর্টেড স্টক</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <Truck size={16} strokeWidth={2.2} className="text-[#55387D]" />
            <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

        {/* Right: Hotline Order CTA */}
        <div className="flex flex-col items-center sm:items-end gap-1 shrink-0">
          <a
            href="tel:+8801618500629"
            className="flex items-center gap-2 bg-[#D91E18] hover:bg-[#B91C1C] px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs transition-colors"
          >
            <PhoneCall size={15} strokeWidth={2.5} />
            <span>অর্ডার করুন: 01618-500629</span>
          </a>
          <span className="text-[10px] font-extrabold text-[#6B7280] uppercase tracking-wider">
            G-1,2,3 D.N.C.C Market, Gulshan-2, Dhaka
          </span>
        </div>
      </div>
    </div>
  );
}
