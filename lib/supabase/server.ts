import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(url && key);

export async function createClient() {
  if (!url || !key) return null;
  const cookieStore = await cookies();
  return createServerClient(url, key, { cookies: { getAll: () => cookieStore.getAll(), setAll: (values: { name: string; value: string; options: CookieOptions }[]) => { try { values.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch { /* Server components cannot set cookies. */ } } } });
}
