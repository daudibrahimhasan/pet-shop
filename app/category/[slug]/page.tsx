import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import { assetPath } from "@/lib/assets";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return category
    ? {
        title: `${category.name} | DHALI'S Unique Collection`,
        description: category.description,
        alternates: { canonical: `/category/${slug}` },
      }
    : {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const liveProducts = await getProducts();
  const catProducts = liveProducts.filter((p) => p.categorySlug === slug);

  return (
    <div className="container-page py-4 sm:py-6 pb-24 md:pb-10">
      {/* Category Banner Header (Sharp Box) */}
      <div className="relative overflow-hidden border border-[#E5E7EB] bg-[#F9F6FC] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <nav
              aria-label="Breadcrumbs"
              className="flex items-center gap-1.5 text-xs font-bold text-[#6B7280]"
            >
              <Link href="/" className="flex items-center gap-1 hover:text-[#55387D]">
                <Home size={14} strokeWidth={2.2} />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} strokeWidth={2} />
              <Link href="/shop" className="hover:text-[#55387D]">
                Categories
              </Link>
              <ChevronRight size={14} strokeWidth={2} />
              <span className="text-[#55387D] font-black uppercase">{category.name}</span>
            </nav>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-3xl">{category.symbol}</span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
                {category.name}
              </h1>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-[#4B5563] sm:text-sm font-medium">
              {category.description}
            </p>

            <span className="mt-3 inline-block bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-[#55387D] border border-[#E5E7EB]">
              {catProducts.length} Products in Stock
            </span>
          </div>

          {category.image && (
            <div className="relative hidden h-28 w-28 shrink-0 md:block border border-[#E5E7EB] bg-white p-2">
              <Image
                src={assetPath(category.image)}
                alt={category.name}
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Grid filtered by category */}
      <ShopGrid initialProducts={liveProducts} initialCategory={slug} />
    </div>
  );
}
