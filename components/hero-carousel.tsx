"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, Sparkles, Tag, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";

const slides = [
  {
    image: assetPath("/images/dhali-hero-branded.png"),
    alt: "Happy pets with premium pet food packages",
    badge: "100% Cash on Delivery in Dhaka",
    badgeIcon: "truck",
    title: "Fresh & Nutritious Food for the Pets You Love.",
    description: "Premium dry kibble, delicious creamy treats, clumping litter and daily accessories from Gulshan-2's trusted neighborhood pet shop.",
    cta: "Shop The Pantry",
    href: "/shop",
    bgTint: "from-[#DEF9EC]/90 via-[#F2FCE4]/80 to-transparent",
    dark: false,
  },
  {
    image: assetPath("/images/dhali-shop-interior-v2.png"),
    alt: "Shelves packed with pet food and care essentials",
    badge: "Gulshan-2 Storefront",
    badgeIcon: "sparkles",
    title: "Everything Your Cat & Dog Needs Under One Roof.",
    description: "Reflex, SmartHeart, Drools, Nekko, Wanpy, Me-O and top international pet nutrition brands in stock with fast doorstep delivery.",
    cta: "Explore Categories",
    href: "/shop",
    bgTint: "from-[#253D4E]/95 via-[#253D4E]/75 to-transparent",
    dark: true,
  },
  {
    image: assetPath("/images/dhali-shop-exterior-v2.png"),
    alt: "D.N.C.C Market Gulshan-2 storefront",
    badge: "Visit Or Order Online",
    badgeIcon: "tag",
    title: "Visit Our Shop at D.N.C.C Market, Gulshan-2.",
    description: "Open 7 days a week. Order online in 30 seconds or drop by our storefront for genuine pet care products at best market prices.",
    cta: "Order with COD",
    href: "/shop",
    bgTint: "from-[#253D4E]/95 via-[#253D4E]/75 to-transparent",
    dark: true,
  },
] as const;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slide = slides[active];
  const show = (index: number) => setActive((index + slides.length) % slides.length);

  useEffect(() => {
    const timer = window.setTimeout(() => show(active + 1), 6000);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <div className="container-page mt-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Main Hero Slider */}
        <section
          className="relative min-h-[440px] sm:min-h-[480px] md:min-h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl border border-primary-border bg-white shadow-card touch-pan-y select-none"
          aria-roledescription="carousel"
          aria-label="Pet Shop featured promotions"
          onTouchStart={(e) => {
            touchStart.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const dist = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dist) > 50) show(active + (dist < 0 ? 1 : -1));
            touchStart.current = null;
          }}
        >
          {/* Background Slides */}
          {slides.map((item, index) => (
            <div
              key={item.image}
              className={`hero-slide-layer absolute inset-0 ${
                active === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={active !== index}
            >
              <Image
                src={item.image}
                alt={active === index ? item.alt : ""}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-right md:object-center"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.bgTint} md:w-4/5`}
              />
            </div>
          ))}

          {/* Slide Text Content */}
          <div
            key={slide.image}
            className={`hero-copy-enter relative z-10 flex h-full max-w-[580px] flex-col justify-center p-6 sm:p-10 md:p-14 ${
              slide.dark ? "text-white" : "text-heading"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm self-start">
              {slide.badgeIcon === "truck" && <Truck size={14} />}
              {slide.badgeIcon === "sparkles" && <Sparkles size={14} className="text-amber" />}
              {slide.badgeIcon === "tag" && <Tag size={14} className="text-coral" />}
              <span>{slide.badge}</span>
            </div>

            {/* Title */}
            <h1 className="mt-4 text-2xl font-extrabold leading-[1.15] sm:text-3xl md:text-5xl">
              {slide.title}
            </h1>

            {/* Description */}
            <p
              className={`mt-3 text-xs leading-relaxed sm:text-sm md:text-base ${
                slide.dark ? "text-gray-200" : "text-text-body"
              }`}
            >
              {slide.description}
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all hover:bg-primary-hover hover:gap-3 active:scale-95"
              >
                <span>{slide.cta}</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+8801618500629"
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold backdrop-blur-sm transition-all ${
                  slide.dark
                    ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                    : "border-primary/30 bg-white/80 text-heading hover:bg-white"
                }`}
              >
                <PhoneCall size={15} className="text-primary" />
                <span>01618-500629</span>
              </a>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-6 z-20 flex items-center gap-1.5 sm:left-10">
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => show(index)}
                className={`h-2.5 rounded-full transition-all ${
                  active === index ? "w-7 bg-primary" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => show(active - 1)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-heading shadow-sm transition-colors hover:bg-primary hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => show(active + 1)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-heading shadow-sm transition-colors hover:bg-primary hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Right Side Promo Cards (Desktop/Tablet) */}
        <div className="hidden lg:grid grid-rows-2 gap-4">
          {/* Side Promo 1: Cat Nutrition */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-border bg-[#F2FCE4] p-6 transition-all hover:shadow-md">
            <div>
              <span className="inline-block rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                Kitten & Cat Care
              </span>
              <h3 className="mt-2 text-lg font-bold text-heading">
                Dry Food & Gravy Pouches
              </h3>
              <p className="mt-1 text-xs text-text-body">
                Reflex, SmartHeart & Me-O in stock
              </p>
            </div>
            <Link
              href="/category/cat-food"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:underline"
            >
              <span>Shop Cat Food</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Side Promo 2: Treats & Litter */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-border bg-[#FFF3EB] p-6 transition-all hover:shadow-md">
            <div>
              <span className="inline-block rounded-full bg-[#F99D1C]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#F99D1C]">
                Daily Treats & Litter
              </span>
              <h3 className="mt-2 text-lg font-bold text-heading">
                Creamy Treats & Tofu Litter
              </h3>
              <p className="mt-1 text-xs text-text-body">
                Drools, Wanpy & Kasty Tofu Litter
              </p>
            </div>
            <Link
              href="/category/treats"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F99D1C] hover:underline"
            >
              <span>Explore Treats</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
