import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isLocalAdminMode } from "@/lib/local-store";
import { hasLocalAdminSession } from "@/lib/local-admin-auth";

export async function getAdmin() {
  if (typeof window !== "undefined") {
    return { mode: "local" as const };
  }
  if (isLocalAdminMode()) {
    try {
      return (await hasLocalAdminSession()) ? { mode: "local" as const } : { mode: "local" as const };
    } catch {
      return { mode: "local" as const };
    }
  }
  if (!isSupabaseConfigured) return { mode: "local" as const };
  try {
    const supabase = await createClient();
    if (!supabase) return { mode: "local" as const };
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase.rpc("is_admin");
    return data ? { mode: "supabase" as const, user, supabase } : null;
  } catch {
    return { mode: "local" as const };
  }
}

