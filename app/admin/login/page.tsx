import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/app/admin/actions";
import { isLocalAdminMode } from "@/lib/local-store";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const localMode = isLocalAdminMode();

  return (
    <main className="grid min-h-screen place-items-center bg-cocoa p-5">
      <Link href="/" className="absolute left-5 top-5 text-sm font-bold text-white/70 hover:text-white">Back to shop</Link>
      <div className="w-full max-w-md rounded-2xl bg-[#fffdf8] p-7 shadow-2xl">
        <Image src="/brand/dhali-logo.png" alt="DHALI's Unique Collection" width={180} height={90} className="h-20 w-auto mix-blend-multiply" />
        <div className="mt-6 flex items-center gap-3">
          <LockKeyhole className="text-papaya" />
          <h1 className="font-display text-3xl font-bold">Admin sign in</h1>
        </div>

        {localMode ? (
          <form action={loginAdmin} className="mt-6 grid gap-4">
            <p className="text-sm leading-6 text-muted">Enter the admin password to manage products and orders.</p>
            <label className="field">Password<input name="password" type="password" autoComplete="current-password" required autoFocus /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">{error}</p>}
            <button className="min-h-12 rounded-xl bg-papaya px-5 font-black text-white hover:bg-papaya-dark">Sign in to admin</button>
          </form>
        ) : isSupabaseConfigured ? (
          <form action={loginAdmin} className="mt-6 grid gap-4">
            <label className="field">Email<input name="email" type="email" autoComplete="email" required /></label>
            <label className="field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">{error}</p>}
            <button className="min-h-12 rounded-xl bg-papaya px-5 font-black text-white hover:bg-papaya-dark">Sign in to admin</button>
          </form>
        ) : (
          <div className="mt-6 rounded-xl bg-mint p-4 text-sm leading-6 text-sage">
            <strong>Connect Supabase to activate admin.</strong><br />
            Add the project keys and run the migration.
          </div>
        )}
      </div>
    </main>
  );
}
