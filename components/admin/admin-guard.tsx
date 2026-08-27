"use client";

import { useEffect, useState } from "react";
import { Lock, ShieldAlert } from "lucide-react";
import { assetPath } from "@/lib/assets";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check local admin session
    const session = typeof window !== "undefined" ? localStorage.getItem("dhali_admin_session") : null;

    if (session === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      window.location.href = assetPath("/admin/login");
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#55387D] p-6 text-white">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-12 w-12 place-items-center border border-white/30 bg-white/10 animate-pulse">
            <Lock size={22} className="text-white" />
          </div>
          <p className="text-xs font-black uppercase tracking-wider">
            Verifying DHALI&apos;S Admin Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#55387D] p-6 text-white">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-12 w-12 place-items-center border border-white/30 bg-white/10">
            <ShieldAlert size={22} className="text-red-300" />
          </div>
          <p className="text-xs font-black uppercase tracking-wider">
            Access Restricted. Redirecting to Login...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
