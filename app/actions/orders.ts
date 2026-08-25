import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const schema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    phone: z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/),
    address: z.string().trim().min(10).max(500),
    notes: z.string().trim().max(500).optional()
  }),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1).max(20)
  })).min(1).max(30)
});

export async function placeCodOrder(input: unknown) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Check your delivery details and cart." };

  if (!isSupabaseConfigured) {
    const orderNumber = `DUC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    return { success: true, configured: false, orderNumber };
  }

  const supabase = createClient();
  if (!supabase) {
    const orderNumber = `DUC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    return { success: true, configured: false, orderNumber };
  }

  const { data, error } = await supabase.rpc("place_cod_order", {
    customer_details: parsed.data.customer,
    cart_items: parsed.data.items
  });

  if (error) {
    return {
      success: false,
      error: error.message.includes("unavailable")
        ? "One of the products is out of stock."
        : "Could not place the order. Call 01618-500629 for help."
    };
  }

  return { success: true, configured: true, orderNumber: data as string };
}
