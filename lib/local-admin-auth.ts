
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "dhali_local_admin";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

const password = () => process.env.ADMIN_PASSWORD || "admin123";
const sessionSecret = () => process.env.ADMIN_SESSION_SECRET || password();
const digest = (value: string) => createHash("sha256").update(value).digest();
const sign = (issuedAt: string) => createHmac("sha256", sessionSecret()).update(issuedAt).digest("hex");

export function isLocalAdminPassword(value: string) {
  return timingSafeEqual(digest(value), digest(password()));
}

export async function createLocalAdminSession() {
  const issuedAt = String(Math.floor(Date.now() / 1000));
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${issuedAt}.${sign(issuedAt)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function clearLocalAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function hasLocalAdminSession() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [issuedAt, signature] = value.split(".");
  if (!issuedAt || !signature || !/^\d+$/.test(issuedAt)) return false;
  const age = Math.floor(Date.now() / 1000) - Number(issuedAt);
  if (age < 0 || age > SESSION_SECONDS) return false;
  const expected = Buffer.from(sign(issuedAt), "hex");
  const actual = Buffer.from(signature, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
