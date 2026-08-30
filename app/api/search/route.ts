import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
import { categories } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  try {
    const allProducts = await getProducts();

    if (!q) {
      return NextResponse.json({
        products: allProducts.slice(0, 6),
        categories: categories.slice(0, 4),
      });
    }

    const matchedCategories = categories.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );

    const matchedProducts = allProducts.filter((p) => {
      const nameMatch = p.name ? p.name.toLowerCase().includes(q) : false;
      const descMatch = p.description ? p.description.toLowerCase().includes(q) : false;
      const catMatch = p.categoryName ? p.categoryName.toLowerCase().includes(q) : false;
      const catSlugMatch = p.categorySlug ? p.categorySlug.toLowerCase().includes(q) : false;
      const brandMatch = p.brand ? p.brand.toLowerCase().includes(q) : false;
      const slugMatch = p.slug ? p.slug.toLowerCase().includes(q) : false;
      return nameMatch || descMatch || catMatch || catSlugMatch || brandMatch || slugMatch;
    });

    return NextResponse.json({
      products: matchedProducts.slice(0, 8),
      categories: matchedCategories.slice(0, 4),
      totalMatches: matchedProducts.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { products: [], categories: [], totalMatches: 0 },
      { status: 500 }
    );
  }
}
