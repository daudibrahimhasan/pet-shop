"use client";
import Script from "next/script";
export function Analytics() { const id = process.env.NEXT_PUBLIC_ANALYTICS_ID; if (!id) return null; return <Script id="analytics-hook" strategy="afterInteractive">{`window.dhaliAnalyticsId=${JSON.stringify(id)};window.dataLayer=window.dataLayer||[];`}</Script>; }
