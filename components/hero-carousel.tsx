"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/images/dhali-hero-branded.png",
    alt: "A golden retriever and tabby cat with DHALI branded pet food packs",
    eyebrow: "Gulshan-2, Dhaka",
    title: "Better food for the pets you love.",
    description: "Cat food, dog food, treats and daily essentials from a real neighborhood shop. Order online and pay when it arrives.",
    position: "object-[64%_center] md:object-center",
    dark: false,
  },
  {
    image: "/images/dhali-shop-exterior-v2.png",
    alt: "The entrance of DHALI's Unique Collection pet shop in Gulshan-2",
    eyebrow: "Visit the shop",
    title: "A real pet shop in the heart of Gulshan.",
    description: "Find us at G-1,2,3, D.N.C.C Market, Gulshan-2, Dhaka-1212.",
    position: "object-center",
    dark: true,
  },
  {
    image: "/images/dhali-shop-interior-v2.png",
    alt: "Shelves of pet food and accessories inside DHALI's Unique Collection",
    eyebrow: "Stocked for cats and dogs",
    title: "Everything they need, under one roof.",
    description: "Food, treats, litter and everyday accessories, carefully arranged and easy to shop.",
    position: "object-center",
    dark: true,
  },
] as const;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slide = slides[active];
  const show = (index: number) => setActive((index + slides.length) % slides.length);

  useEffect(() => {
    const timer = window.setTimeout(() => show(active + 1), 5500);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section
      className="container-page relative mt-4 overflow-hidden bg-surface shadow-[0_18px_50px_rgba(43,23,20,.08)] touch-pan-y select-none"
      aria-roledescription="carousel"
      aria-label="DHALI shop highlights"
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 50) show(active + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="relative h-[560px] sm:h-[580px] md:h-[590px]">
        {slides.map((item, index) => (
          <div key={item.image} className={`hero-slide-layer absolute inset-0 ${active === index ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={active !== index}>
            <Image src={item.image} alt={active === index ? item.alt : ""} fill priority={index === 0} sizes="(max-width: 768px) 100vw, 1240px" className={`object-cover ${item.position}`} />
            <div className={`absolute inset-0 ${item.dark ? "bg-cocoa/80 md:bg-transparent md:bg-gradient-to-r md:from-cocoa/95 md:via-cocoa/55 md:to-transparent" : "bg-[#fffdf7]/80 md:bg-transparent md:bg-gradient-to-r md:from-[#fffdf7] md:via-[#fffdf7]/66 md:to-[#fffdf7]/5"}`} />
          </div>
        ))}
        <div key={slide.image} className={`hero-copy-enter relative z-10 flex h-full max-w-[650px] flex-col justify-start px-5 pb-24 pt-12 md:justify-center md:px-16 md:pb-20 md:pt-16 ${slide.dark ? "text-white" : "text-cocoa"}`}>
          <p className={`flex items-center gap-2 text-sm font-black ${slide.dark ? "text-amber" : "text-sage"}`}><MapPin size={18}/>{slide.eyebrow}</p>
          <h1 className="display mt-4 max-w-[11ch] text-[2.35rem] font-extrabold leading-[.95] sm:text-[2.7rem] md:text-[clamp(2.7rem,6.4vw,5.8rem)] md:leading-[.92]">{slide.title}</h1>
          <p className={`mt-4 line-clamp-3 max-w-[47ch] text-sm leading-6 md:mt-6 md:line-clamp-none md:text-lg md:leading-7 ${slide.dark ? "text-white/85" : "text-muted"}`}>{slide.description}</p>
          <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-8">
            <Link href="/shop" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-papaya px-5 py-3 font-black text-white hover:bg-papaya-dark sm:min-h-13 sm:px-6">Shop the pantry <ArrowRight size={20}/></Link>
            <a href="tel:+8801618500629" className={`flex min-h-11 items-center justify-center font-black sm:min-h-12 ${slide.dark ? "text-white" : "text-cocoa"}`}>Call 01618-500629</a>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">Slide {active + 1} of {slides.length}: {slide.title}</p>
      <div className="absolute bottom-4 left-4 z-20 flex items-center bg-white/90 px-1 md:left-1/2 md:-translate-x-1/2" aria-label="Choose a hero slide">
        {slides.map((item, index) => (
          <button key={item.image} type="button" onClick={() => show(index)} className="grid min-h-11 min-w-11 place-items-center" aria-label={`Show slide ${index + 1}`} aria-current={active === index ? "true" : undefined}>
            <span className={`block h-1.5 w-5 ${active === index ? "bg-papaya" : "bg-cocoa/25"}`} />
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 z-20 flex border border-white/30 bg-cocoa text-white">
        <button type="button" onClick={() => show(active - 1)} className="grid min-h-11 min-w-11 place-items-center border-r border-white/20 hover:bg-white/10" aria-label="Previous hero slide"><ChevronLeft size={20}/></button>
        <button type="button" onClick={() => show(active + 1)} className="grid min-h-11 min-w-11 place-items-center hover:bg-white/10" aria-label="Next hero slide"><ChevronRight size={20}/></button>
      </div>
    </section>
  );
}
