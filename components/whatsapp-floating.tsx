"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide in admin dashboard
  if (pathname.startsWith("/admin")) return null;

  return (
    <aside aria-label="WhatsApp chat support">
      <a
        href="https://wa.me/8801618500629?text=Hello%20DHALI%27S%20Unique%20Collection%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 sm:px-3.5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.65)] transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="WhatsApp directly"
        title="WhatsApp (01618-500629)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <WhatsAppIcon size={20} className="text-white shrink-0" />
        <span className="font-extrabold text-xs tracking-wider uppercase">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
