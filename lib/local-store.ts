
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { OrderStatus, Product } from "@/lib/types";

export type LocalOrder = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  delivery_address: string;
  notes?: string;
  total: number;
  status: OrderStatus;
  created_at: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const productsFile = path.join(dataDirectory, "local-products.json");
const ordersFile = path.join(dataDirectory, "local-orders.json");
const removedProductsFile = path.join(dataDirectory, "local-removed-products.json");
const uploadsDirectory = path.join(process.cwd(), "public", "uploads", "products");

async function readJson<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T[];
  } catch {
    return [];
  }
}

async function writeJson<T>(file: string, value: T[]) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export function isLocalAdminMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return process.env.NODE_ENV === "development" && !(url && key);
}

export async function readLocalProducts() {
  return readJson<Product>(productsFile);
}

export async function addLocalProduct(product: Product) {
  const products = await readLocalProducts();
  await writeJson(productsFile, [product, ...products.filter((item) => item.id !== product.id)]);
}

export async function readRemovedLocalProductIds() {
  return readJson<string>(removedProductsFile);
}

export async function removeLocalProduct(id: string) {
  const [products, removedIds] = await Promise.all([readLocalProducts(), readRemovedLocalProductIds()]);
  await Promise.all([
    writeJson(productsFile, products.filter((product) => product.id !== id)),
    writeJson(removedProductsFile, Array.from(new Set([id, ...removedIds]))),
  ]);
}

export async function saveLocalProductImage(file: File, slug: string) {
  await mkdir(uploadsDirectory, { recursive: true });
  const extension = file.name.split(".").pop()?.toLowerCase() || "webp";
  const fileName = `${slug}-${crypto.randomUUID()}.${extension}`;
  await writeFile(path.join(uploadsDirectory, fileName), Buffer.from(await file.arrayBuffer()));
  return `/uploads/products/${fileName}`;
}

export async function readLocalOrders() {
  return readJson<LocalOrder>(ordersFile);
}

export async function addLocalOrder(order: LocalOrder) {
  const orders = await readLocalOrders();
  await writeJson(ordersFile, [order, ...orders]);
}

export async function setLocalOrderStatus(id: string, status: OrderStatus) {
  const orders = await readLocalOrders();
  await writeJson(ordersFile, orders.map((order) => order.id === id ? { ...order, status } : order));
}
