import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { getAdmin } from "@/lib/admin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-[#111827]">
      <AdminNav />
      <main className="container-page py-6 sm:py-10">{children}</main>
    </div>
  );
}
