import "server-only";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isLocalAdminMode } from "@/lib/local-store";
import { hasLocalAdminSession } from "@/lib/local-admin-auth";

export async function getAdmin() {
  if (isLocalAdminMode()) return (await hasLocalAdminSession()) ? { mode: "local" as const } : null;
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase!.auth.getUser();
  if (!user) return null;
  const { data } = await supabase!.rpc("is_admin");
  return data ? { mode: "supabase" as const, user, supabase: supabase! } : null;
}
