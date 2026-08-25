import Image from "next/image";
import { redirect } from "next/navigation";
import { ProductUploadForm } from "@/components/admin/product-upload-form";
import { RemoveProductButton } from "@/components/admin/remove-product-button";
import { getAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/catalog";
import { categories as fallbackCategories } from "@/lib/data";

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
      weight: product.weight,
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
      weight: product.weight,
      active: product.active,
      categoryName: product.categories?.name || "Uncategorised",
      imageUrl: product.image_path ? admin.supabase.storage.from("product-images").getPublicUrl(product.image_path).data.publicUrl : undefined,
    }));
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-sm font-bold text-papaya">Catalogue</p>
        <h1 className="font-display mt-1 text-4xl font-bold md:text-5xl">Products</h1>
        <p className="mt-3 max-w-xl text-muted">Upload product photos, set pricing, and keep stock accurate.</p>
      </div>
      <section id="upload"><ProductUploadForm categories={categories} /></section>
      <section className="mt-8 rounded-2xl bg-white p-5 md:p-7">
        <h2 className="font-display text-3xl font-bold">Current catalogue</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-clay text-xs uppercase tracking-wide text-muted">
              <tr><th className="pb-3">Product</th><th>Category</th><th className="text-right">Price</th><th className="text-right">Stock</th><th className="text-right">State</th><th className="text-right">Action</th></tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-clay/70">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? <Image src={product.imageUrl} alt="" width={52} height={52} className="h-13 w-13 rounded-lg object-contain" /> : <div className="h-13 w-13 rounded-lg bg-mist" />}
                      <div><strong>{product.name}</strong><span className="block text-xs text-muted">{product.weight}</span></div>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td className="text-right font-bold">BDT {product.price.toLocaleString("en-BD")}</td>
                  <td className={`text-right font-bold ${product.stock <= 5 ? "text-red-700" : "text-sage"}`}>{product.stock}</td>
                  <td className="text-right">{product.active ? "Published" : "Hidden"}</td>
                  <td className="text-right"><div className="flex justify-end"><RemoveProductButton id={product.id} name={product.name} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!products.length && <p className="py-10 text-center text-muted">No products yet. Use the upload form above.</p>}
        </div>
      </section>
    </>
  );
}
