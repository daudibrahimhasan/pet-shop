import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Compatibility file for old cached builds. Live catalogue search runs in the browser.
export function GET() {
  return NextResponse.json({ products: [], categories: [], totalMatches: 0 });
}
