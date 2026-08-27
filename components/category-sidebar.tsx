import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { categories } from "@/lib/data";

export function CategorySidebar() {
  return (
    <aside className="hidden lg:block w-[240px] shrink-0" aria-label="Category Sidebar">
      <div className="border border-[#E5E7EB] bg-white shadow-xs">
        {/* Header Ribbon (Sharp Box) */}
        <div className="bg-[#55387D] px-4 py-3 text-white flex items-center justify-between text-xs font-black uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Layers size={15} strokeWidth={2.2} />
            <span>Pet Categories</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 font-black">10</span>
        </div>

        {/* Grouped Stack Items (Sharp Geometric Rows) */}
        <div className="divide-y divide-[#E5E7EB]">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-[#374151] transition-colors hover:bg-[#F8F5FC] hover:text-[#55387D] group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base group-hover:scale-105 transition-transform">{cat.symbol}</span>
                <span className="truncate uppercase text-[11px] tracking-tight">{cat.name}</span>
              </div>
              <ChevronRight
                size={13}
                strokeWidth={2.2}
                className="text-gray-300 group-hover:text-[#55387D] group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
