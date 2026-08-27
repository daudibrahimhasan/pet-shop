import Link from "next/link";
import { ChevronRight, Home, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DHALI'S Unique Collection",
  description: "Learn how DHALI'S Unique Collection protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-4xl py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">Privacy Policy</span>
      </nav>

      <div className="border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-4">
          <div className="grid h-12 w-12 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
            <ShieldCheck size={26} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-[#111827] sm:text-2xl">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#6B7280] font-bold">DHALI&apos;S Unique Collection • Gulshan-2, Dhaka</p>
          </div>
        </div>

        <div className="mt-6 space-y-5 text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
          <section>
            <h2 className="text-sm font-black uppercase text-[#111827] sm:text-base">
              1. Information We Collect
            </h2>
            <p className="mt-1.5">
              When you place a Cash on Delivery (COD) order, we collect only the necessary details to fulfill your delivery:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Recipient Full Name</li>
              <li>Active Mobile Phone Number for courier and confirmation calls</li>
              <li>Delivery Address and Area in Dhaka / Bangladesh</li>
              <li>Optional notes regarding delivery timing or location landmarks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase text-[#111827] sm:text-base">
              2. Cash on Delivery & Payment Data
            </h2>
            <p className="mt-1.5">
              We do <strong>not</strong> collect or store credit card, debit card, bKash PIN, or Nagad password data on this website. All orders are completed via physical Cash on Delivery upon receiving your items.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase text-[#111827] sm:text-base">
              3. Data Retention & Device Storage
            </h2>
            <p className="mt-1.5">
              For your convenience, a lightweight summary of your recent orders is saved locally in your browser so you can easily reference your order tracking numbers on your device without needing an account.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase text-[#111827] sm:text-base">
              4. Contact Us
            </h2>
            <p className="mt-1.5">
              If you have any questions regarding your data or order details, please reach out directly:
            </p>
            <div className="mt-2.5 border border-[#E5E7EB] bg-[#F9FAFB] p-3.5 text-xs font-bold text-[#111827] space-y-1">
              <p>Email: <a href="mailto:dhalisuniquecollection@gmail.com" className="text-[#55387D] underline">dhalisuniquecollection@gmail.com</a></p>
              <p>Hotline: <a href="tel:+8801618500629" className="text-[#55387D] underline">01618-500629</a></p>
              <p>Address: G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
