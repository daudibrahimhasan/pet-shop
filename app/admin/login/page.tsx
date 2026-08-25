"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { assetPath } from "@/lib/assets";

function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const [error, setError] = useState(errorParam || "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    await loginAdmin(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      {isSupabaseConfigured ? (
        <>
          <label className="field">Email<input name="email" type="email" autoComplete="email" required autoFocus /></label>
          <label className="field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
        </>
      ) : (
        <>
          <p className="text-sm leading-6 text-muted">Enter the admin password to manage products and orders.</p>
          <label className="field">Password<input name="password" type="password" autoComplete="current-password" required autoFocus placeholder="admin123" /></label>
        </>
      )}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">{error}</p>}
      <button type="submit" className="min-h-12 rounded-xl bg-papaya px-5 font-black text-white hover:bg-papaya-dark">Sign in to admin</button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cocoa p-5">
      <Link href="/" className="absolute left-5 top-5 text-sm font-bold text-white/70 hover:text-white">Back to shop</Link>
      <div className="w-full max-w-md rounded-2xl bg-[#fffdf8] p-7 shadow-2xl">
        <Image src={assetPath("/brand/dhali-logo.png")} alt="DHALI's Unique Collection" width={180} height={90} className="h-20 w-auto mix-blend-multiply" priority />
        <div className="mt-6 flex items-center gap-3">
          <LockKeyhole className="text-papaya" />
          <h1 className="font-display text-3xl font-bold">Admin sign in</h1>
        </div>
        <Suspense fallback={<div className="mt-6 text-sm text-muted">Loading sign in form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
