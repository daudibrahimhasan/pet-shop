import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, PhoneCall, Truck } from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";

export default async function HomePage() {
  const products = await getProducts();
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);

  return (
    <>
      <HeroCarousel />

      <section className="container-page grid gap-px overflow-hidden bg-clay sm:grid-cols-3" aria-label="Store benefits">
        <div className="flex min-h-16 items-center gap-3 bg-white px-4 sm:min-h-20 sm:px-5">
          <MapPin size={22} className="text-papaya"/>
          <div><strong className="block text-sm">Gulshan-2 storefront</strong><span className="text-xs text-muted">D.N.C.C Market</span></div>
        </div>
        <div className="flex min-h-16 items-center gap-3 bg-white px-4 sm:min-h-20 sm:px-5">
          <Truck size={22} className="text-sage"/>
          <div><strong className="block text-sm">Cash on Delivery</strong><span className="text-xs text-muted">Pay when it arrives</span></div>
        </div>
        <a href="tel:+8801618500629" className="flex min-h-16 items-center gap-3 bg-white px-4 hover:bg-mint sm:min-h-20 sm:px-5">
          <PhoneCall size={22} className="text-papaya"/>
          <div><strong className="block text-sm">Order support</strong><span className="text-xs text-muted">01618-500629</span></div>
        </a>
      </section>

      <section className="container-page py-12 md:py-24" aria-labelledby="collections-title">
        <div className="mb-6 max-w-2xl md:mb-8">
          <h2 id="collections-title" className="display text-3xl font-bold sm:text-4xl md:text-6xl">Start with their bowl.</h2>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">Clear choices for cats and dogs, without digging through a crowded catalogue.</p>
        </div>
        <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
          <Link href="/category/cat-food" className="group relative min-h-[280px] overflow-hidden bg-cocoa text-white md:min-h-[360px]">
            <Image src="/images/cat-collection.png" alt="A tabby cat beside a bowl and cat food" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-cocoa via-cocoa/45 to-transparent"/>
            <div className="absolute inset-0 flex max-w-[280px] flex-col justify-end p-5 md:p-7">
              <span className="text-sm font-bold text-turmeric">For cats</span>
              <h3 className="display mt-1 text-3xl font-bold md:text-4xl">Cat pantry</h3>
              <span className="mt-4 inline-flex items-center gap-2 font-black">Shop cat food <ArrowRight size={18}/></span>
            </div>
          </Link>
          <Link href="/category/dog-food" className="group relative min-h-[280px] overflow-hidden bg-cocoa text-white md:min-h-[360px]">
            <Image src="/images/dog-collection.png" alt="A golden retriever beside dog food and a bowl" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-l from-cocoa via-cocoa/40 to-transparent"/>
            <div className="absolute inset-0 ml-auto flex max-w-[280px] flex-col items-start justify-end p-5 md:p-7">
              <span className="text-sm font-bold text-turmeric">For dogs</span>
              <h3 className="display mt-1 text-3xl font-bold md:text-4xl">Dog pantry</h3>
              <span className="mt-4 inline-flex items-center gap-2 font-black">Shop dog food <ArrowRight size={18}/></span>
            </div>
          </Link>
        </div>
        <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          <Link href="/category/treats" className="flex min-h-24 items-center justify-between bg-turmeric p-5 sm:min-h-28 sm:p-6">
            <div><span className="text-sm font-bold">Small rewards</span><h3 className="display text-2xl font-bold">Treats</h3></div>
            <ArrowRight size={20}/>
          </Link>
          <Link href="/category/accessories" className="flex min-h-24 items-center justify-between bg-mint p-5 sm:min-h-28 sm:p-6">
            <div><span className="text-sm font-bold text-sage">Everyday kit</span><h3 className="display text-2xl font-bold">Accessories</h3></div>
            <ArrowRight size={20} className="text-sage"/>
          </Link>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-24" aria-labelledby="best-title">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
            <div>
              <h2 id="best-title" className="display text-3xl font-bold sm:text-4xl md:text-6xl">The repeat-order shelf.</h2>
              <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">Products customers come back for.</p>
            </div>
            <Link href="/shop" className="hidden min-h-11 items-center gap-2 font-black text-papaya sm:flex">View all products <ArrowRight size={18}/></Link>
          </div>
          {bestSellers.length ? (
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-5">{bestSellers.map((product) => <ProductCard key={product.id} product={product}/>)}</div>
          ) : (
            <div className="bg-mist p-10 text-center text-muted">Products will appear here after they are uploaded in admin.</div>
          )}
          <Link href="/shop" className="mt-6 flex min-h-12 items-center justify-center border border-papaya font-black text-papaya sm:hidden">View all products <ArrowRight size={18}/></Link>
        </div>
      </section>

      <section className="container-page py-12 md:py-24">
        <div className="grid overflow-hidden bg-cocoa text-white md:grid-cols-[1.15fr_.85fr]">
          <div className="p-6 md:p-14">
            <h2 className="display max-w-[12ch] text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">Order online. Pay at your door.</h2>
            <p className="mt-4 text-sm leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">Choose what you need, add your Dhaka delivery address, and place a Cash on Delivery order. We&apos;ll call if anything needs checking.</p>
            <Link href="/shop" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-papaya px-6 font-black text-white sm:mt-8 sm:w-auto">Start an order <ArrowRight size={18}/></Link>
          </div>
          <div className="grid content-center gap-5 bg-mint p-6 text-cocoa md:gap-6 md:p-12">
            <div className="flex gap-3"><BadgeCheck size={22} className="text-sage"/><div><strong>COD only</strong><p className="mt-1 text-sm text-muted">No card, bKash or Nagad payment is requested.</p></div></div>
            <div className="flex gap-3"><Truck size={22} className="text-sage"/><div><strong>Dhaka delivery</strong><p className="mt-1 text-sm text-muted">Delivery charge is confirmed for your area.</p></div></div>
            <div className="flex gap-3"><MapPin size={22} className="text-sage"/><div><strong>Pick up in Gulshan-2</strong><p className="mt-1 text-sm text-muted">G-1,2,3, D.N.C.C Market.</p></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
