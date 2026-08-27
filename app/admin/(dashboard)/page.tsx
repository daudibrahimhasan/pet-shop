import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, PackagePlus, ShoppingBag, Store } from "lucide-react";
import { getAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/catalog";
import { readLocalOrders } from "@/lib/local-store";

export default async function AdminPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  let products = 0;
  let orders = 0;
  let lowStock = 0;

  if (admin.mode === "local") {
    const [catalogue, localOrders] = await Promise.all([getProducts(), readLocalOrders()]);
    products = catalogue.length;
    orders = localOrders.filter((order) => order.status === "Pending").length;
    lowStock = catalogue.filter((product) => product.stock <= 5).length;
  } else {
    const [productResult, orderResult, lowStockResult] = await Promise.all([
      admin.supabase.from("products").select("*", { count: "exact", head: true }),
      admin.supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "Pending"),
      admin.supabase.from("products").select("*", { count: "exact", head: true }).lte("stock", 5),
    ]);
    products = productResult.count || 0;
    orders = orderResult.count || 0;
    lowStock = lowStockResult.count || 0;
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="border-b border-[#E5E7EB] bg-white p-6 shadow-xs">
        <span className="inline-block bg-[#F3EEF9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#55387D] border border-[#55387D]/20">
          {admin.mode === "local" ? "Local Offline Mode" : "Supabase Cloud Mode"}
        </span>
        <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
          Store Operations Overview
        </h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Manage inventory, review Cash on Delivery orders, and update products for DHALI&apos;S Unique Collection (Gulshan-2).
        </p>
      </div>

      {/* Local Admin Status Notice */}
      {admin.mode === "local" && (
        <div className="flex items-center gap-3 border border-green-200 bg-[#ECFFEC] p-4 text-xs font-bold text-green-900 shadow-xs">
          <CheckCircle2 size={18} strokeWidth={2.2} className="text-green-700 shrink-0" />
          <span>
            Local Admin Active: Orders and catalogue edits are stored locally in your workspace.
          </span>
        </div>
      )}

      {/* 3 High-Contrast Stat Cards (Sharp Geometric) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Card 1: Total Products */}
        <Link
          href="/admin/products"
          className="group flex flex-col justify-between border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#55387D] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
              Total Products
            </span>
            <div className="grid h-10 w-10 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
              <PackagePlus size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-black text-[#55387D] tabular-nums">
              {products}
            </p>
            <p className="mt-1 text-xs font-bold text-[#6B7280]">
              Active items in catalogue →
            </p>
          </div>
        </Link>

        {/* Card 2: Pending Orders */}
        <Link
          href="/admin/orders"
          className="group flex flex-col justify-between border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#FFA000] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
              Pending Orders
            </span>
            <div className="grid h-10 w-10 place-items-center bg-[#FFF3EB] text-[#FFA000] border border-[#FFA000]/20">
              <ShoppingBag size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-black text-[#111827] tabular-nums">
              {orders}
            </p>
            <p className="mt-1 text-xs font-bold text-[#FFA000]">
              Requires courier confirmation →
            </p>
          </div>
        </Link>

        {/* Card 3: Low Stock Alert */}
        <Link
          href="/admin/products"
          className="group flex flex-col justify-between border border-[#E5E7EB] bg-white p-6 shadow-xs hover:border-[#D91E18] hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#6B7280]">
              Low Stock Alert
            </span>
            <div className="grid h-10 w-10 place-items-center bg-red-50 text-[#D91E18] border border-red-200">
              <AlertTriangle size={20} strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-black text-[#D91E18] tabular-nums">
              {lowStock}
            </p>
            <p className="mt-1 text-xs font-bold text-[#D91E18]">
              ≤ 5 units remaining →
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Actions Panel (Sharp Rectangular) */}
      <div className="border border-[#E5E7EB] bg-white p-6 shadow-xs">
        <h2 className="text-base font-black uppercase tracking-tight text-[#111827]">
          Quick Actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/products#upload"
            className="inline-flex items-center gap-2 bg-[#55387D] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64] transition-colors"
          >
            <PackagePlus size={15} strokeWidth={2.2} />
            <span>Upload New Product</span>
          </Link>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 border border-[#111827] bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-[#111827] hover:bg-[#F3EEF9] hover:border-[#55387D] hover:text-[#55387D] transition-colors"
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span>Review Orders</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 border border-[#D1D5DB] bg-[#F9FAFB] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#4B5563] hover:text-[#111827] hover:bg-white transition-colors"
          >
            <Store size={15} strokeWidth={2} />
            <span>View Public Storefront ↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
