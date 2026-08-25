"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getAdmin } from "@/lib/admin";
import { categories } from "@/lib/data";
import { addLocalProduct, isLocalAdminMode, removeLocalProduct, saveLocalProductImage, setLocalOrderStatus } from "@/lib/local-store";
import { clearLocalAdminSession, createLocalAdminSession, isLocalAdminPassword } from "@/lib/local-admin-auth";

export type ProductActionState = { error?: string; success?: string };

export async function loginAdmin(formData: FormData) {
  if (isLocalAdminMode()) {
    const password = String(formData.get("password") || "");
    if (!isLocalAdminPassword(password)) redirect("/admin/login?error=Password+is+incorrect");
    await createLocalAdminSession();
    redirect("/admin");
  }
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login?error=Supabase+is+not+configured");
  const email = String(formData.get("email") || ""); const password = String(formData.get("password") || "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/admin/login?error=${encodeURIComponent("Email or password is incorrect")}`);
  redirect("/admin");
}

export async function logoutAdmin() {
  if (isLocalAdminMode()) {
    await clearLocalAdminSession();
    redirect("/admin/login");
  }
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

const productSchema = z.object({ name: z.string().trim().min(2).max(140), categoryId: z.string().min(1), price: z.coerce.number().int().min(1), compareAt: z.coerce.number().int().min(0).optional(), stock: z.coerce.number().int().min(0), weight: z.string().trim().min(1).max(40), description: z.string().trim().min(10).max(1500), badge: z.string().trim().max(30).optional() });

export async function createProduct(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
  const admin = await getAdmin(); if (!admin) return { error: "Admin access required." };
  const parsed = productSchema.safeParse({ name: formData.get("name"), categoryId: formData.get("categoryId"), price: formData.get("price"), compareAt: formData.get("compareAt") || undefined, stock: formData.get("stock"), weight: formData.get("weight"), description: formData.get("description"), badge: formData.get("badge") || undefined });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Check the product details." };
  const slug = parsed.data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const image = formData.get("image");
  if (image instanceof File && image.size > 0 && (image.size > 5_000_000 || !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(image.type))) {
    return { error: "Use a JPG, PNG, WebP or AVIF image under 5 MB." };
  }

  if (admin.mode === "local") {
    const category = categories.find((item) => item.id === parsed.data.categoryId);
    if (!category) return { error: "Choose a valid category." };
    const imageUrl = image instanceof File && image.size > 0 ? await saveLocalProductImage(image, slug) : undefined;
    await addLocalProduct({
      id: `local-${crypto.randomUUID()}`,
      name: parsed.data.name,
      slug,
      categorySlug: category.slug,
      price: parsed.data.price,
      compareAt: parsed.data.compareAt || undefined,
      stock: parsed.data.stock,
      weight: parsed.data.weight,
      description: parsed.data.description,
      badge: parsed.data.badge || undefined,
      color: category.accent,
      featured: formData.get("featured") === "on",
      bestSeller: formData.get("bestSeller") === "on",
      imageUrl,
    });
    revalidatePath("/"); revalidatePath("/shop"); revalidatePath("/admin"); revalidatePath("/admin/products");
    return { success: "Product saved locally and published." };
  }

  const { data: product, error } = await admin.supabase.from("products").insert({ name: parsed.data.name, slug, category_id: parsed.data.categoryId, price: parsed.data.price, compare_at_price: parsed.data.compareAt || null, stock: parsed.data.stock, weight: parsed.data.weight, description: parsed.data.description, badge: parsed.data.badge || null, featured: formData.get("featured") === "on", best_seller: formData.get("bestSeller") === "on", active: true }).select("id").single();
  if (error || !product) return { error: error?.message || "Could not create the product." };
  if (image instanceof File && image.size > 0) {
    const extension = image.name.split(".").pop()?.toLowerCase() || "webp"; const path = `${product.id}/${crypto.randomUUID()}.${extension}`;
    const uploaded = await admin.supabase.storage.from("product-images").upload(path, image, { contentType: image.type, upsert: false });
    if (uploaded.error) { await admin.supabase.from("products").delete().eq("id", product.id); return { error: uploaded.error.message }; }
    await admin.supabase.from("products").update({ image_path: path }).eq("id", product.id);
  }
  revalidatePath("/"); revalidatePath("/shop"); revalidatePath("/admin/products");
  return { success: "Product uploaded and published." };
}

export async function updateOrderStatus(formData: FormData) {
  const admin = await getAdmin(); if (!admin) redirect("/admin/login");
  const parsed = z.object({ id: z.string().min(1), status: z.enum(["Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled"]) }).safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return;
  if (admin.mode === "local") await setLocalOrderStatus(parsed.data.id, parsed.data.status);
  else await admin.supabase.from("orders").update({ status: parsed.data.status }).eq("id", parsed.data.id);
  revalidatePath("/admin/orders"); revalidatePath("/admin");
}

export async function removeProduct(formData: FormData) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  const parsed = z.object({ id: z.string().min(1) }).safeParse({ id: formData.get("id") });
  if (!parsed.success) return;

  if (admin.mode === "local") {
    await removeLocalProduct(parsed.data.id);
  } else {
    await admin.supabase.from("products").update({ active: false }).eq("id", parsed.data.id);
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}
