import Image from "next/image";
import { redirect } from "next/navigation";
import { ProductUploadForm } from "@/components/admin/product-upload-form";
import { RemoveProductButton } from "@/components/admin/remove-product-button";
import { getAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/catalog";
import { categories as fallbackCategories } from "@/lib/data";
import { assetPath } from "@/lib/assets";
import { formatPrice } from "@/lib/data";

type AdminProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  weight: string;
  active: boolean;
  categoryName: string;
  imageUrl?: string;
};

export default async function AdminProductsPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  let categories: { id: string; name: string }[] = [];
  let products: AdminProduct[] = [];

  if (admin.mode === "local") {
    categories = fallbackCategories.map(({ id, name }) => ({ id, name }));
    products = (await getProducts()).map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      weight: product.weight || "Standard",
      active: true,
      categoryName: fallbackCategories.find((category) => category.slug === product.categorySlug)?.name || "Uncategorised",
      imageUrl: product.imageUrl,
    }));
  } else {
    const [categoryResult, productResult] = await Promise.all([
      admin.supabase.from("categories").select("id,name").order("sort_order"),
      admin.supabase.from("products").select("id,name,price,stock,weight,image_path,active,categories(name)").order("created_at", { ascending: false }),
    ]);
    categories = categoryResult.data || [];
    products = (productResult.data || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      weight: product.weight || "Standard",
      active: product.active,
      categoryName: product.categories?.name || "Uncategorised",
      imageUrl: product.image_path ? admin.supabase.storage.from("product-images").getPublicUrl(product.image_path).data.publicUrl : undefined,
    }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] bg-white p-6 shadow-xs">
        <span className="inline-block bg-[#F3EEF9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#55387D] border border-[#55387D]/20">
          Catalogue & Inventory
        </span>
        <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
          Product Inventory
        </h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Add new items, adjust stock counts, update pricing, and manage visible catalogue entries.
        </p>
      </div>

      {/* Upload Form Section */}
      <section id="upload">
        <ProductUploadForm categories={categories} />
      </section>

      {/* Existing Products Table (Sharp Geometric) */}
      <section className="border border-[#E5E7EB] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
          <h2 className="text-base font-black uppercase tracking-tight text-[#111827]">
            Current Catalogue ({products.length} Products)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-black uppercase tracking-wider text-[#6B7280]">
              <tr>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Price</th>
                <th className="py-3 px-3 text-right">Stock</th>
                <th className="py-3 px-3 text-right">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 border border-[#E5E7EB] bg-white p-1">
                        {product.imageUrl ? (
                          <Image
                            src={assetPath(product.imageUrl)}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#F3EEF9]" />
                        )}
                      </div>
                      <div>
                        <strong className="block font-bold text-[#111827] hover:text-[#55387D]">
                          {product.name}
                        </strong>
                        <span className="block text-[11px] text-[#6B7280]">{product.weight}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#4B5563]">
                    {product.categoryName}
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-[#55387D] tabular-nums">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase ${
                        product.stock <= 5
                          ? "bg-red-50 text-[#D91E18] border border-red-200"
                          : "bg-[#ECFFEC] text-green-800 border border-green-200"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#111827]">
                    {product.active ? "Published" : "Hidden"}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex justify-end">
                      <RemoveProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!products.length && (
            <p className="py-10 text-center text-xs text-[#6B7280]">
              No products found in catalogue.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
