"use server";

import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getProducts } from "@/lib/catalog";
import { addLocalOrder, isLocalAdminMode } from "@/lib/local-store";

const schema = z.object({ customer: z.object({ name: z.string().trim().min(2).max(100), phone: z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/), address: z.string().trim().min(10).max(500), notes: z.string().trim().max(500).optional() }), items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(20) })).min(1).max(30) });

export async function placeCodOrder(input: unknown) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Check your delivery details and cart." };
  if (!isSupabaseConfigured) {
    const orderNumber = `DUC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    if (isLocalAdminMode()) {
      const catalogue = await getProducts();
      let total = 0;
      for (const item of parsed.data.items) {
        const product = catalogue.find((candidate) => candidate.id === item.productId);
        if (!product || product.stock < item.quantity) return { success: false, error: "One of the products is unavailable." };
        total += product.price * item.quantity;
      }
      await addLocalOrder({
        id: `local-order-${crypto.randomUUID()}`,
        order_number: orderNumber,
        customer_name: parsed.data.customer.name,
        phone: parsed.data.customer.phone,
        delivery_address: parsed.data.customer.address,
        notes: parsed.data.customer.notes,
        total,
        status: "Pending",
        created_at: new Date().toISOString(),
      });
    }
    return { success: true, configured: false, orderNumber };
  }
  const supabase = await createClient();
  const { data, error } = await supabase!.rpc("place_cod_order", { customer_details: parsed.data.customer, cart_items: parsed.data.items });
  if (error) return { success: false, error: error.message.includes("unavailable") ? "One of the products is out of stock." : "Could not place the order. Call 01618-500629 for help." };
  return { success: true, configured: true, orderNumber: data as string };
}
