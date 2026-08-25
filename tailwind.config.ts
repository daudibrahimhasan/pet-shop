import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2b1714", cocoa: "#2b1714", cream: "#fffdf7", surface: "#fffdf7", mist: "#f4f7f2",
        orange: "#e96b2c", papaya: "#e96b2c", "papaya-dark": "#c9501d", amber: "#f2b84b", turmeric: "#f2b84b",
        leaf: "#3f745a", sage: "#3f745a", mint: "#ddeee4", line: "#e5d7c7", clay: "#e5d7c7", muted: "#74655f"
      },
      boxShadow: { card: "0 12px 34px rgba(67, 38, 16, .09)" },
      borderRadius: { brand: "1.125rem" },
      fontFamily: { sans: ["Manrope Variable", "sans-serif"], display: ["Manrope Variable", "sans-serif"] }
    }
  },
  plugins: []
} satisfies Config;
