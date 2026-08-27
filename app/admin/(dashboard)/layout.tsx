import { AdminNav } from "@/components/admin/admin-nav";
import { AdminGuard } from "@/components/admin/admin-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F4F5F8] text-[#111827]">
        <AdminNav />
        <main className="container-page py-6 sm:py-10">{children}</main>
      </div>
    </AdminGuard>
  );
}
