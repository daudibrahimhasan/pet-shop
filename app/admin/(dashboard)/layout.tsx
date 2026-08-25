import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { getAdmin } from "@/lib/admin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) { const admin = await getAdmin(); if (!admin) redirect("/admin/login"); return <div className="min-h-screen bg-[#f4f7f2]"><AdminNav/><main className="container-page py-8 md:py-12">{children}</main></div>; }
