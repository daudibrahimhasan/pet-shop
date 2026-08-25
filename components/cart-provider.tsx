"use client";

import { CartItem, Product } from "@/lib/types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  notice: string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dhali-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch { setItems([]); }
    setReady(true);
  }, []);

  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items, ready]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const found = current.find((item) => item.product.id === product.id);
      return found
        ? current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item)
        : [...current, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setNotice(`${product.name} added to cart`);
    window.setTimeout(() => setNotice(""), 2500);
  }, []);

  const updateQuantity = (id: string, quantity: number) => setItems((current) => current.map((item) => item.product.id === id ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, quantity)) } : item));
  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.product.id !== id));
  const clearCart = () => setItems([]);
  const value = useMemo(() => ({ items, count: items.reduce((n, item) => n + item.quantity, 0), subtotal: items.reduce((n, item) => n + item.product.price * item.quantity, 0), addItem, updateQuantity, removeItem, clearCart, notice }), [items, addItem, notice]);

  return <CartContext.Provider value={value}>{children}{notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-card">{notice}</div>}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
