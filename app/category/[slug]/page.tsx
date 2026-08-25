import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop-grid";
import { categories, products } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const category=categories.find((item)=>item.slug===slug);return category?{title:category.name,description:category.description,alternates:{canonical:`/category/${slug}`}}:{};}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const liveProducts = await getProducts();
  return <div className="container-page py-12 md:py-16"><div className="mb-10 max-w-3xl rounded-[18px] p-7 md:p-10" style={{ background: category.accent }}><p className="text-sm font-black opacity-60">{category.symbol} collection</p><h1 className="display mt-2 text-5xl font-bold md:text-6xl">{category.name}</h1><p className="mt-3 max-w-lg leading-7">{category.description}</p></div><ShopGrid initialProducts={liveProducts.filter((product) => product.categorySlug === slug)}/></div>;
}
