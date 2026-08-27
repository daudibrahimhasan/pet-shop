import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductCard } from "@/components/product-card";
import { CategoryProductTabsSection } from "@/components/category-product-tabs-section";
import { HeroBanner } from "@/components/hero-banner";
import { DhaliPromoBanner } from "@/components/dhali-promo-banner";
import { getProducts } from "@/lib/catalog";
import { featuredCategoryBoxes, subcategoryChips } from "@/lib/data";
import { assetPath } from "@/lib/assets";

export default async function HomePage() {
  const products = await getProducts();

  // Top flash sale & popular products
  const topFeedProducts = products.slice(0, 4);

  // Dear Dog products
  const dogProducts = products.filter(
    (p) => p.categorySlug === "dog-food" || p.categorySlug === "dog-health-accessories"
  );

  // Dear Cat products
  const catPouchProducts = products.filter(
    (p) => p.categorySlug === "cat-food"
  );

  return (
    <div className="container-page py-3 sm:py-4 pb-24 md:pb-10">
      {/* 2-COLUMN DESKTOP LAYOUT (Left Sidebar + Right Content) */}
      <div className="flex gap-6 items-start">
        {/* Left Category Sidebar */}
        <CategorySidebar />

        {/* Main Content Column */}
        <main className="flex-1 min-w-0 space-y-6 sm:space-y-8">
          {/* 1. DHALI'S ORIGINAL HERO BANNER WITH BRANDED PACKAGING & PETS */}
          <HeroBanner />

          {/* 2. DHALI'S STORE HEADER STACK */}
          <div className="text-center py-1 sm:py-2">
            <span className="inline-flex items-center gap-1.5 bg-[#F3EEF9] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#55387D] border border-[#55387D]/20">
              <MapPin size={12} strokeWidth={2.5} />
              <span>D.N.C.C Market, Gulshan-2, Dhaka</span>
            </span>
            <h1 className="text-base font-black text-[#111827] sm:text-2xl md:text-3xl leading-tight mt-1.5 tracking-tight uppercase">
              DHALI&apos;S Unique Collection
            </h1>
            <p className="text-xs font-bold text-[#4B5563] sm:text-sm mt-0.5 max-w-xl mx-auto">
              Authentic Imported Dog & Cat Nutrition • Cash on Delivery Across Bangladesh
            </p>
          </div>

          {/* 3. FEATURED CATEGORIES (SHARP SQUARE GRID STACKS) */}
          <section aria-labelledby="featured-categories-title">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2 mb-3 sm:mb-4">
              <h2
                id="featured-categories-title"
                className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#55387D] flex items-center gap-1.5"
              >
                <Sparkles size={14} strokeWidth={2.2} />
                <span>Featured Categories</span>
              </h2>
              <Link
                href="/shop"
                className="text-xs font-black uppercase tracking-wider text-[#6B7280] hover:text-[#55387D]"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 lg:grid-cols-6">
              {featuredCategoryBoxes.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
                  className="featured-cat-box group p-2.5 sm:p-3"
                >
                  <div className="relative h-16 w-16 sm:h-24 sm:w-24 mb-2">
                    <Image
                      src={assetPath(cat.image)}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 30vw, 112px"
                      className="object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9.5px] sm:text-[11px] font-black text-[#111827] uppercase tracking-tight line-clamp-1 group-hover:text-[#55387D]">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* 4. SUBCATEGORY TAG CHIPS ROW (SHARP RECTANGULAR) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-1">
            {subcategoryChips.map((chip, idx) => (
              <Link
                key={idx}
                href={chip.href}
                className="subcat-chip text-[10px] sm:text-xs py-1.5 px-3.5"
              >
                {chip.name}
              </Link>
            ))}
          </div>

          {/* 5. DHALI'S AUTHENTIC BRANDED PROMOTIONAL BANNER */}
          <DhaliPromoBanner />

          {/* 6. TOP PRODUCT FEED / FLASH SALE */}
          <section aria-labelledby="top-feed-title" className="pt-1">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5 mb-3.5 sm:mb-4">
              <h2
                id="top-feed-title"
                className="text-sm font-black uppercase tracking-tight text-[#111827] sm:text-lg"
              >
                Flash Sale & Popular Items
              </h2>
              <Link
                href="/shop"
                className="text-xs font-black uppercase tracking-wider text-[#55387D] hover:underline"
              >
                Explore Catalogue →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4">
              {topFeedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* 7. "Dear DOG" HERO BANNER & PRODUCTS */}
          <section className="pt-2">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#FEE8E8] via-[#FFF0F0] to-[#FED6D6] p-4 sm:p-6 mb-4 border border-[#FBCACA] shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase text-[#55387D] tracking-wider">
                    DHALI&apos;S Canine Nutrition
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-[#55387D] tracking-tight mt-0.5 uppercase">
                    Dear <span className="text-[#FF3B69]">DOG</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#4B5563] mt-0.5 max-w-sm font-bold">
                    Healthy dog biscuits, canned meals, and nutritional supplements.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <Link
                    href="/category/dog-food"
                    className="inline-flex items-center gap-1.5 bg-[#55387D] px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-[#432B64]"
                  >
                    <span>Explore Dog Food</span>
                    <ChevronRight size={14} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4">
              {dogProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* 8. "Dear CAT" HERO BANNER & PRODUCTS */}
          <section className="pt-2">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#FDE1E6] via-[#FFF0F3] to-[#FDE1E6] p-4 sm:p-6 mb-4 border border-[#FAD0D8] shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase text-[#55387D] tracking-wider">
                    DHALI&apos;S Feline Gourmet
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-[#55387D] tracking-tight mt-0.5 uppercase">
                    Dear <span>CAT</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#4B5563] mt-0.5 max-w-sm font-bold">
                    Pure tuna gourmet, delicious gravy pouches, and lickable purées.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4">
              {catPouchProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* 9. DHALI'S PLATINUM MEMBERSHIP BANNER */}
          <div className="relative w-full border border-[#E5E7EB] bg-white shadow-xs overflow-hidden">
            <Image
              src={assetPath("/images/banners/dhali-membership-banner.jpg")}
              alt="DHALI'S UNIQUE COLLECTION - Purchase 5000 TK Get Platinum Membership Card"
              width={1376}
              height={768}
              sizes="(max-width: 1024px) 100vw, 1080px"
              className="w-full h-auto object-contain block"
            />
          </div>

          {/* 10. CATEGORY PRODUCT TABS */}
          <CategoryProductTabsSection products={products} />
        </main>
      </div>
    </div>
  );
}
