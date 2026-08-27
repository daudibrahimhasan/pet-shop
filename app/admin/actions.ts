"use client";

import { categories } from "@/lib/data";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type ProductActionState = { error?: string; success?: string };

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") || formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  // 1. Supabase credentials check if configured
  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email: username.includes("@") ? username : `${username}@dhali.com`,
        password,
      });
      if (!error) {
        window.location.href = "/admin";
        return;
      }
    }
  }

  // 2. Direct Username & Password check: admin & admin123
  if (
    (username.toLowerCase() === "admin" && password === "admin123") ||
    (username.toLowerCase() === "admin@dhali.com" && password === "admin123") ||
    password === "admin123"
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem("dhali_admin_session", "true");
      window.location.href = "/admin";
    }
    return;
  }

  window.location.href = `/admin/login?error=${encodeURIComponent("Invalid credentials. Username is 'admin' and Password is 'admin123'")}`;
}

export async function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dhali_admin_session");
  }
  if (isSupabaseConfigured) {
    const supabase = createClient();
    await supabase?.auth.signOut();
  }
  if (typeof window !== "undefined") {
    window.location.href = "/admin/login";
  }
}

export async function createProduct(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
  const name = String(formData.get("name") || "").trim();
  const categoryId = String(formData.get("categoryId") || "").trim();
  const price = Number(formData.get("price"));
  const compareAt = formData.get("compareAt") ? Number(formData.get("compareAt")) : undefined;
  const stock = Number(formData.get("stock"));
  const weight = String(formData.get("weight") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const badge = formData.get("badge") ? String(formData.get("badge")).trim() : undefined;
  const featured = formData.get("featured") === "on";
  const bestSeller = formData.get("bestSeller") === "on";

  if (!name || name.length < 2) return { error: "Product name is too short." };
  if (!categoryId) return { error: "Select a category." };
  if (!price || price < 1) return { error: "Enter a valid price." };

  const category = categories.find((item) => item.id === categoryId);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (isSupabaseConfigured) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.from("products").insert({
        name,
        slug,
        category_id: categoryId,
        price,
        compare_at_price: compareAt || null,
        stock,
        weight,
        description,
        badge: badge || null,
        featured,
        best_seller: bestSeller,
        active: true,
      });
      if (error) return { error: error.message };
      return { success: "Product uploaded to Supabase successfully." };
    }
  }

  // Local storage mode for static export
  if (typeof window !== "undefined") {
    const localProducts = JSON.parse(localStorage.getItem("dhali_custom_products") || "[]");
    localProducts.unshift({
      id: `local-${Date.now()}`,
      name,
      slug,
      categorySlug: category?.slug || "accessories",
      price,
      compareAt,
      stock,
      weight,
      description,
      badge,
      color: "#F3EEF9",
      featured,
      bestSeller,
    });
    localStorage.setItem("dhali_custom_products", JSON.stringify(localProducts));
  }

  return { success: "Product saved successfully." };
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (isSupabaseConfigured) {
    const supabase = createClient();
    await supabase?.from("orders").update({ status }).eq("id", id);
  }

  if (typeof window !== "undefined") {
    const saved = JSON.parse(localStorage.getItem("dhali-orders") || "[]");
    const updated = saved.map((o: any) => (o.orderNumber === id || o.id === id ? { ...o, status } : o));
    localStorage.setItem("dhali-orders", JSON.stringify(updated));
    window.location.reload();
  }
}

export async function removeProduct(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (isSupabaseConfigured) {
    const supabase = createClient();
    await supabase?.from("products").update({ active: false }).eq("id", id);
  }

  if (typeof window !== "undefined") {
    const removed = JSON.parse(localStorage.getItem("dhali_removed_products") || "[]");
    removed.push(id);
    localStorage.setItem("dhali_removed_products", JSON.stringify(removed));
    window.location.reload();
  }
}
