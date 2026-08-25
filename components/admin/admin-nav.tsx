import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogOut, PackagePlus, ShoppingBag } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { assetPath } from "@/lib/assets";

export function AdminNav() {
  return <header className="border-b border-white/10 bg-cocoa text-white"><div className="container-page flex min-h-20 flex-wrap items-center gap-4 py-3"><Link href="/admin" className="flex items-center gap-3"><Image src={assetPath("/brand/dhali-logo.png")} alt="DHALI's" width={104} height={52} priority className="h-11 w-auto rounded-md bg-[#fffaf4] object-contain mix-blend-normal"/><span className="hidden text-sm font-black sm:block">Store admin</span></Link><nav className="ml-auto flex items-center gap-1" aria-label="Admin"><Link href="/admin" className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold hover:bg-white/10"><LayoutDashboard size={18}/>Overview</Link><Link href="/admin/products" className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold hover:bg-white/10"><PackagePlus size={18}/>Products</Link><Link href="/admin/orders" className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold hover:bg-white/10 sm:flex"><ShoppingBag size={18}/>Orders</Link><form action={logoutAdmin}><button className="grid min-h-11 min-w-11 place-items-center rounded-xl hover:bg-white/10" aria-label="Sign out"><LogOut size={18}/></button></form></nav></div></header>;
}
