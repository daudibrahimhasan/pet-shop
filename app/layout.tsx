import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { MobileCartBar } from "@/components/mobile-cart-bar";
import "./globals.css";
import "@fontsource-variable/manrope";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "DHALI's Unique Collection | Dog & Cat Food in Gulshan", template: "%s | DHALI's Unique Collection" },
  description: "Dog and cat food, treats and pet essentials from DHALI's Unique Collection in Gulshan-2, Dhaka. Cash on Delivery available.",
  openGraph: { title: "DHALI's Unique Collection", description: "Pet food and essentials delivered across Dhaka.", type: "website", images: ["/images/dhali-hero-branded.png"] },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
