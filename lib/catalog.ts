import { categories as fallbackCategories, products as fallbackProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { readLocalProducts, readRemovedLocalProductIds } from "@/lib/local-store";

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  if (!supabase) {
    const [localProducts, removedIds] = await Promise.all([readLocalProducts(), readRemovedLocalProductIds()]);
    const removed = new Set(removedIds);
    return [...localProducts, ...fallbackProducts].filter((product) => !removed.has(product.id));
  }
  const { data, error } = await supabase.from("products").select("*, categories(slug)").eq("active", true).order("created_at", { ascending: false });
  if (error || !data) return fallbackProducts;
  return data.map((row: any) => ({ id: row.id, name: row.name, slug: row.slug, categorySlug: row.categories?.slug || "accessories", price: row.price, compareAt: row.compare_at_price || undefined, stock: row.stock, weight: row.weight, description: row.description, badge: row.badge || undefined, color: "#e9a26a", featured: row.featured, bestSeller: row.best_seller, imageUrl: row.image_path ? supabase.storage.from("product-images").getPublicUrl(row.image_path).data.publicUrl : undefined }));
}
export async function getProduct(slug: string) { return (await getProducts()).find((product) => product.slug === slug); }
