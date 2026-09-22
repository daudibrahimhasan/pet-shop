import Link from "next/link";
import { ChevronDown, ChevronRight, Layers } from "lucide-react";
import { petCategoryGroups } from "@/lib/data";

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
          <span className="text-[10px] bg-white/20 px-2 py-0.5 font-black">4</span>
        </div>

        {/* Grouped Stack Items (Sharp Geometric Rows) */}
        <div className="divide-y divide-[#E5E7EB]">
          {petCategoryGroups.map((group) => (
            <div key={group.name} className="group/category">
              <Link
                href={group.href}
                className="flex items-center justify-between px-3.5 py-3 text-xs font-bold text-[#374151] hover:bg-[#F8F5FC] hover:text-[#55387D]"
                aria-haspopup="menu"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base" aria-hidden="true">{group.symbol}</span>
                  <span className="truncate text-[11px] uppercase tracking-tight">{group.name}</span>
                </div>
                <ChevronDown size={13} strokeWidth={2.2} className="text-gray-400" />
              </Link>
              <div className="hidden border-t border-[#EEE9F3] bg-[#FCFAFE] py-1 group-hover/category:block group-focus-within/category:block" role="menu">
                {group.children.map((child) => (
                  <Link
                    key={`${group.name}-${child.slug}`}
                    href={`/category/${child.slug}`}
                    className="flex items-center justify-between px-5 py-2 text-[10.5px] font-bold uppercase leading-snug text-[#5B6472] hover:bg-[#F3EEF9] hover:text-[#55387D]"
                    role="menuitem"
                  >
                    <span>{child.name}</span>
                    <ChevronRight size={11} strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
