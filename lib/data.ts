import { Category, Product } from "@/lib/types";

export const categories: Category[] = [
  { id: "1", name: "Cat Food", slug: "cat-food", description: "Dry food, wet food and treats for cats.", accent: "#F2B84B", symbol: "CAT" },
  { id: "2", name: "Dog Food", slug: "dog-food", description: "Everyday nutrition for puppies and adult dogs.", accent: "#DDEEE4", symbol: "DOG" },
  { id: "3", name: "Treats", slug: "treats", description: "Small rewards with a lot of tail-wagging power.", accent: "#F6D4C6", symbol: "YUM" },
  { id: "4", name: "Accessories", slug: "accessories", description: "Bowls, collars, litter essentials and more.", accent: "#D7E3F0", symbol: "KIT" }
];

export const products: Product[] = [
  { id: "p1", name: "Ocean Fish Adult Cat Food", slug: "ocean-fish-adult-cat-food", categorySlug: "cat-food", price: 850, compareAt: 920, stock: 14, weight: "1.2 kg", description: "Complete everyday nutrition with ocean fish flavour for adult cats.", badge: "Save BDT 70", color: "#f5b746", featured: true, bestSeller: true },
  { id: "p2", name: "Chicken & Rice Kitten Food", slug: "chicken-rice-kitten-food", categorySlug: "cat-food", price: 690, stock: 9, weight: "900 g", description: "Balanced protein and minerals made for growing kittens.", badge: "Popular", color: "#e98564", featured: true },
  { id: "p3", name: "Beef Recipe Adult Dog Food", slug: "beef-recipe-adult-dog-food", categorySlug: "dog-food", price: 1450, compareAt: 1590, stock: 7, weight: "3 kg", description: "A hearty beef recipe for active adult dogs of all sizes.", badge: "Best seller", color: "#89b7a0", featured: true, bestSeller: true },
  { id: "p4", name: "Puppy Chicken Starter", slug: "puppy-chicken-starter", categorySlug: "dog-food", price: 1180, stock: 11, weight: "2 kg", description: "Easy-to-digest chicken recipe for puppies during early growth.", color: "#e9ca73", featured: true },
  { id: "p5", name: "Creamy Tuna Cat Treats", slug: "creamy-tuna-cat-treats", categorySlug: "treats", price: 280, stock: 22, weight: "5 × 15 g", description: "Smooth lickable treats with tuna flavour.", badge: "New", color: "#e2a1a7", bestSeller: true },
  { id: "p6", name: "Dental Chew Sticks", slug: "dental-chew-sticks", categorySlug: "treats", price: 420, stock: 16, weight: "180 g", description: "Textured daily chews for dogs over six months.", color: "#8db0cd" },
  { id: "p7", name: "Non-slip Pet Bowl", slug: "non-slip-pet-bowl", categorySlug: "accessories", price: 350, stock: 18, weight: "Medium", description: "Easy-clean bowl with a stable rubber base.", color: "#d9a26f", bestSeller: true },
  { id: "p8", name: "Clumping Cat Litter", slug: "clumping-cat-litter", categorySlug: "accessories", price: 780, stock: 6, weight: "5 L", description: "Fast-clumping litter for a cleaner, fresher tray.", badge: "Low stock", color: "#9ba7c8" }
];

export const formatPrice = (value: number) => `BDT ${value.toLocaleString("en-BD")}`;
export const findProduct = (slug: string) => products.find((product) => product.slug === slug);
