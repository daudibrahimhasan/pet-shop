"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, PhoneCall, Sparkles, Truck } from "lucide-react";
import { assetPath } from "@/lib/assets";

const heroSlides = [
  {
    image: "/images/dhali-hero-branded.png",
    alt: "DHALI'S Unique Collection - Golden Retriever and Tabby Cat with Branded Pet Food",
    tag: "D.N.C.C Market, Gulshan-2, Dhaka",
    tagIcon: "pin",
    title: "Fresh & Nutritious Food for the Pets You Love.",
    subtitle: "Imported dry kibble, delicious gravy pouches, clumping litter & pet care essentials with 100% Cash on Delivery in Dhaka.",
    ctaText: "Shop Catalogue",
    ctaLink: "/shop",
  },
  {
    image: "/images/dhali-hero.png",
    alt: "DHALI'S Pets with Healthy Food Bowls",
    tag: "100% Authentic Imported Stock",
    tagIcon: "truck",
    title: "Trusted Nutrition for Happy & Active Pets.",
    subtitle: "Reflex, SmartHeart, Royal Canin, Drools, Nekko, Wanpy & Me-O in stock with fast doorstep dispatch across Bangladesh.",
    ctaText: "Explore Pet Food",
    ctaLink: "/category/cat-food",
  },
  {
    image: "/images/dhali-shop-interior-v2.png",
    alt: "DHALI'S Pet Shop Shelves in Gulshan-2",
    tag: "Physical Storefront in Gulshan-2",
    tagIcon: "sparkles",
    title: "Everything Your Dog & Cat Needs in One Shop.",
    subtitle: "Visit our shop at G-1,2,3 D.N.C.C Market, Gulshan-2 or order online in seconds with zero advance payment.",
    ctaText: "View Products",
    ctaLink: "/shop",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative w-full overflow-hidden border border-[#E5E7EB] bg-[#FAF8F5] shadow-xs select-none">
      {/* 1. Slide Images Layer */}
      <div className="relative min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[480px] w-full">
        {heroSlides.map((item, idx) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              current === idx ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
            }`}
          >
            <Image
              src={assetPath(item.image)}
              alt={item.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 1080px"
              className="object-cover object-right md:object-center"
            />
            {/* Subtle Gradient Veil for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-transparent md:w-3/5" />
          </div>
        ))}

        {/* 2. Overlaid Text & Actions Stack (Sharp Non-Rounded Framing) */}
        <div className="relative z-10 flex h-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[480px] max-w-xl flex-col justify-center p-5 sm:p-8 md:p-12">
          {/* Location / Feature Tag (Sharp Badge) */}
          <div className="inline-flex items-center gap-1.5 bg-[#55387D] px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-white border border-[#432B64] self-start shadow-xs">
            {slide.tagIcon === "pin" && <MapPin size={13} strokeWidth={2.5} />}
            {slide.tagIcon === "truck" && <Truck size={13} strokeWidth={2.5} />}
            {slide.tagIcon === "sparkles" && <Sparkles size={13} strokeWidth={2.5} />}
            <span>{slide.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="mt-3 text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl md:text-4xl leading-[1.15]">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs font-bold leading-relaxed text-[#4B5563] sm:text-sm md:text-base">
            {slide.subtitle}
          </p>

          {/* Action Buttons Stack */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-[#55387D] px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#432B64] btn-press"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight size={15} strokeWidth={2.2} />
            </Link>

            <a
              href="tel:+8801618500629"
              className="inline-flex items-center gap-2 border-2 border-[#55387D] bg-white/95 px-4 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#55387D] shadow-xs transition-colors hover:bg-[#F3EEF9] btn-press"
            >
              <PhoneCall size={14} strokeWidth={2.2} />
              <span>01618-500629</span>
            </a>
          </div>
        </div>

        {/* 3. Navigation Controls (Sharp Geometric Buttons) */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="grid h-8 w-8 place-items-center border border-[#E5E7EB] bg-white text-[#111827] shadow-xs hover:bg-[#55387D] hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
            className="grid h-8 w-8 place-items-center border border-[#E5E7EB] bg-white text-[#111827] shadow-xs hover:bg-[#55387D] hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* 4. Slide Indicator Bars (Sharp Rectangles) */}
        <div className="absolute bottom-3 left-5 z-20 flex items-center gap-1.5 sm:left-8">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-1.5 transition-all ${
                current === idx ? "w-8 bg-[#55387D]" : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
