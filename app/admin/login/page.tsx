"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, KeyRound, LockKeyhole, User } from "lucide-react";
import { loginAdmin } from "@/app/admin/actions";
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
      {/* Username Field */}
      <label className="block text-xs font-bold text-[#111827]">
        <span>Username</span>
        <div className="relative mt-1">
          <input
            name="username"
            type="text"
            required
            autoFocus
            defaultValue="admin"
            placeholder="admin"
            className="w-full border border-[#D1D5DB] bg-white pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
          />
          <User
            size={15}
            strokeWidth={2.2}
            className="absolute left-3 top-2.5 text-[#6B7280] pointer-events-none"
          />
        </div>
      </label>

      {/* Password Field */}
      <label className="block text-xs font-bold text-[#111827]">
        <span>Password</span>
        <div className="relative mt-1">
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="admin123"
            className="w-full border border-[#D1D5DB] bg-white pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
          />
          <KeyRound
            size={15}
            strokeWidth={2.2}
            className="absolute left-3 top-2.5 text-[#6B7280] pointer-events-none"
          />
        </div>
      </label>

      {/* Helper Credential Hint */}
      <div className="border border-[#55387D]/15 bg-[#F9F6FC] p-2.5 text-[11px] text-[#4B5563] font-medium">
        <span>Default credentials: <strong>admin</strong> / <strong>admin123</strong></span>
      </div>

      {error && (
        <p role="alert" className="border border-red-300 bg-red-50 p-3 text-xs font-bold text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center bg-[#55387D] hover:bg-[#432B64] py-3 text-xs font-black uppercase tracking-wider text-white shadow-xs transition-colors"
      >
        Sign in to Admin Portal
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-[#55387D] p-5">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Storefront</span>
      </Link>

      <div className="w-full max-w-md border border-white/20 bg-white p-7 sm:p-8 shadow-2xl">
        <div className="relative h-14 w-28 border border-[#E5E7EB] bg-white p-1">
          <Image
            src={assetPath("/brand/dhali-logo.png")}
            alt="DHALI's Unique Collection"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-6 flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
          <LockKeyhole size={18} strokeWidth={2.2} className="text-[#55387D]" />
          <h1 className="text-xl font-black uppercase tracking-tight text-[#111827]">
            Admin Sign In
          </h1>
        </div>

        <Suspense fallback={<div className="mt-6 text-xs text-[#6B7280]">Loading sign-in form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
