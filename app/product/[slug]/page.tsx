import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { getProduct, getProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const {slug}=await params; const product=await getProduct(slug); if(!product)return{}; return { title: product.name, description: product.description, alternates:{canonical:`/product/${product.slug}`}, openGraph:{title:product.name,description:product.description,images:product.imageUrl?[product.imageUrl]:["/images/dhali-hero-branded.png"]} }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProduct(slug), getProducts()]);
  if (!product) notFound();
  const related = allProducts.filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 3);
  const jsonLd={"@context":"https://schema.org","@type":"Product",name:product.name,description:product.description,image:product.imageUrl?[product.imageUrl]:undefined,offers:{"@type":"Offer",priceCurrency:"BDT",price:product.price,availability:product.stock>0?"https://schema.org/InStock":"https://schema.org/OutOfStock"}};
  return <div className="container-page py-8 md:py-14"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><nav className="mb-8 text-sm text-stone-500" aria-label="Breadcrumb"><Link href="/shop" className="hover:text-orange">Shop</Link> / <span>{product.name}</span></nav><ProductDetail product={product}/>{related.length > 0 && <section className="mt-20"><h2 className="display mb-7 text-4xl">More for their bowl</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item}/>)}</div></section>}</div>;
}
