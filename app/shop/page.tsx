import { ShopGrid } from "@/components/shop-grid";
import { getProducts } from "@/lib/catalog";

export const dynamic = "force-static";
export const metadata = { title: "Shop pet food and essentials" };

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="container-page py-9 md:py-16">
      <p className="text-sm font-black text-papaya">All products</p>
      <h1 className="display mt-2 text-4xl font-bold sm:text-5xl md:text-6xl">The pet pantry</h1>
      <p className="mb-7 mt-3 max-w-xl text-sm leading-6 text-muted sm:mb-9 sm:mt-4 sm:text-base sm:leading-7">
        Food, treats and useful everyday things for cats and dogs.
      </p>
      <ShopGrid initialProducts={products} />
    </div>
  );
}
