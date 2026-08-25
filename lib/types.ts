export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  accent: string;
  symbol: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  price: number;
  compareAt?: number;
  stock: number;
  weight: string;
  description: string;
  badge?: string;
  color: string;
  featured?: boolean;
  bestSeller?: boolean;
  imageUrl?: string;
};

export type CartItem = { product: Product; quantity: number };
export type OrderStatus = "Pending" | "Confirmed" | "Out for Delivery" | "Delivered" | "Cancelled";
