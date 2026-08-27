import Link from "next/link";
import { ArrowRight, ChevronRight, Home, MapPin, Phone, Truck } from "lucide-react";

export const metadata = {
  title: "Delivery & Cash on Delivery (COD) Policy | DHALI'S Unique Collection",
  description: "Learn about Cash on Delivery pet food shipping across Dhaka and storefront pickup at D.N.C.C Market, Gulshan-2.",
};

export default function DeliveryPage() {
  const steps = [
    {
      step: "01",
      title: "Add Products to Basket",
      desc: "Browse our catalogue and select your pet food, treats, litter or accessories.",
      bg: "bg-[#F3EEF9]",
      accent: "text-[#55387D]",
    },
    {
      step: "02",
      title: "Enter Delivery Address",
      desc: "Provide recipient name, active mobile number (01XXXXXXXXX) and delivery address in Dhaka.",
      bg: "bg-[#FFF3EB]",
      accent: "text-[#FFA000]",
    },
    {
      step: "03",
      title: "Pay Cash on Delivery",
      desc: "We confirm the order via phone and dispatch. You hand over cash when the courier arrives at your door.",
      bg: "bg-[#ECFFEC]",
      accent: "text-green-800",
    },
  ];

  return (
    <div className="container-page py-6 sm:py-10 pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#6B7280]">
        <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
          <Home size={14} strokeWidth={2.2} />
          <span>Home</span>
        </Link>
        <ChevronRight size={14} strokeWidth={2} />
        <span className="font-black text-[#55387D]">Delivery & Cash on Delivery</span>
      </nav>

      {/* Hero Header */}
      <div className="border border-[#E5E7EB] bg-[#F9F6FC] p-6 sm:p-12 shadow-xs">
        <div className="max-w-2xl">
          <span className="inline-block bg-[#55387D] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
            Safe & Simple
          </span>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#111827] sm:text-4xl leading-tight">
            Cash on Delivery Across Dhaka
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-[#4B5563] sm:text-base font-medium">
            No upfront card, bKash or Nagad transfers required. Order online in seconds from <strong>DHALI&apos;s Unique Collection</strong> and pay comfortably in cash upon receiving your pet essentials.
          </p>
        </div>
      </div>

      {/* 3 Step Process (Sharp Cards) */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex flex-col justify-between border border-[#E5E7EB] bg-white p-6 sm:p-7 shadow-xs"
          >
            <div>
              <span className={`inline-block ${s.bg} ${s.accent} px-2.5 py-1 text-xs font-black uppercase tracking-wider border border-black/5`}>
                STEP {s.step}
              </span>
              <h3 className="mt-4 text-base font-black uppercase text-[#111827] sm:text-lg">
                {s.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Coverage & Store Pickup */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-[#E5E7EB] bg-white p-6 sm:p-7 shadow-xs space-y-3">
          <h3 className="text-base font-black uppercase text-[#111827] flex items-center gap-2">
            <Truck size={18} strokeWidth={2.2} className="text-[#55387D]" />
            <span>Coverage Areas & Delivery Times</span>
          </h3>
          <p className="text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
            We deliver to all major Dhaka city areas including <strong>Gulshan, Banani, Baridhara, Bashundhara R/A, Dhanmondi, Uttara, Mohakhali, Mirpur, Badda, Rampura, and Malibagh</strong>, as well as nationwide courier delivery across Bangladesh.
          </p>
          <p className="text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
            Orders are typically dispatched within <strong>24 to 48 hours</strong>. Delivery charges depend on package weight and location, and are confirmed with you by phone.
          </p>
        </div>

        <div className="border border-[#55387D]/20 bg-[#F9F6FC] p-6 sm:p-7 shadow-xs space-y-3">
          <h3 className="text-base font-black uppercase text-[#111827] flex items-center gap-2">
            <MapPin size={18} strokeWidth={2.2} className="text-[#55387D]" />
            <span>Physical Storefront Pickups in Gulshan-2</span>
          </h3>
          <p className="text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
            Prefer immediate collection? You can pick up your order directly from our shop:
          </p>
          <div className="border border-[#E5E7EB] bg-white p-3.5 text-xs sm:text-sm font-black uppercase text-[#111827]">
            G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212
          </div>
          <p className="text-xs text-[#6B7280] font-medium">
            For assistance or location guidance, call us directly at <strong className="text-[#55387D]">01618-500629</strong>.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#55387D] px-8 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
        >
          <span>Start Your Order Now</span>
          <ArrowRight size={16} strokeWidth={2.2} />
        </Link>
      </div>
    </div>
  );
}
