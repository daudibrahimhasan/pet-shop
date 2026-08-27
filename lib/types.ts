export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  symbol: string;
  iconName?: string;
  image?: string;
  itemCount?: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName?: string;
  price: number;
  compareAt?: number;
  stock: number;
  weight?: string;
  description: string;
  badge?: string; // e.g. "- ৳5" or "Newly Launched Product."
  badgeType?: "pink" | "blue" | "sale" | "hot" | "new";
  discountTag?: string; // e.g. "6% OFF"
  dealText?: string; // e.g. "Limited time deal"
  soldText?: string; // e.g. "15.1K+ sold in last 30 days"
  outOfStock?: boolean;
  color?: string;
  brand?: string;
  rating?: number;
  ratingCount?: number;
  featured?: boolean;
  bestSeller?: boolean;
  flashSale?: boolean;
  imageUrl?: string;
};

export type CartItem = { product: Product; quantity: number };
export type OrderStatus = "Pending" | "Confirmed" | "Out for Delivery" | "Delivered" | "Cancelled";
