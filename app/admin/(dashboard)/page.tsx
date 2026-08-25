import Link from "next/link";
import { redirect } from "next/navigation";
import { PackagePlus, ShoppingBag, TriangleAlert } from "lucide-react";
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
    <>
      <div className="mb-8">
        <p className="text-sm font-bold text-papaya">{admin.mode === "local" ? "Local preview" : "DHALI's operations"}</p>
        <h1 className="font-display mt-1 text-4xl font-bold md:text-5xl">Store overview</h1>
      </div>
      {admin.mode === "local" && <p className="mb-6 rounded-xl border border-sage/20 bg-mint p-4 text-sm font-bold text-sage">Local admin is active. Changes are saved inside this project only.</p>}
      <div className="grid gap-4 md:grid-cols-[1.2fr_.9fr_.9fr]">
        <Link href="/admin/products" className="rounded-2xl bg-cocoa p-6 text-white"><PackagePlus size={22} className="text-turmeric" /><p className="mt-8 text-4xl font-black">{products}</p><p className="mt-1 text-sm text-white/70">Products in catalogue</p></Link>
        <Link href="/admin/orders" className="rounded-2xl bg-white p-6"><ShoppingBag size={22} className="text-papaya" /><p className="mt-8 text-4xl font-black">{orders}</p><p className="mt-1 text-sm text-muted">Pending orders</p></Link>
        <Link href="/admin/products" className="rounded-2xl bg-mint p-6"><TriangleAlert size={22} className="text-sage" /><p className="mt-8 text-4xl font-black">{lowStock}</p><p className="mt-1 text-sm text-sage">Low-stock products</p></Link>
      </div>
      <div className="mt-7 rounded-2xl bg-white p-6">
        <h2 className="font-display text-2xl font-bold">Quick actions</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/admin/products#upload" className="inline-flex min-h-12 items-center rounded-xl bg-papaya px-5 font-black text-white">Upload a product</Link>
          <Link href="/admin/orders" className="inline-flex min-h-12 items-center rounded-xl border border-clay px-5 font-black">Review orders</Link>
          <Link href="/" className="inline-flex min-h-12 items-center px-3 font-bold text-sage">View storefront</Link>
        </div>
      </div>
    </>
  );
}
