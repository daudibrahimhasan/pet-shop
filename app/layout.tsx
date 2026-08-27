import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { MobileCartBar } from "@/components/mobile-cart-bar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DHALI's Unique Collection | Dog & Cat Food Shop in Gulshan-2, Dhaka",
    template: "%s | DHALI's Unique Collection"
  },
  description: "DHALI's Unique Collection at D.N.C.C Market, Gulshan-2, Dhaka. Authentic imported cat & dog food, healthy treats, litter, and accessories with Cash on Delivery across Bangladesh.",
  openGraph: {
    title: "DHALI's Unique Collection | Gulshan-2 Pet Shop",
    description: "Authentic dog & cat food, treats, and pet accessories delivered across Bangladesh.",
    type: "website",
    images: ["/images/banners/dhali-hero-banner.jpg"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={`${plusJakartaSans.className} font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <MobileCartBar />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
