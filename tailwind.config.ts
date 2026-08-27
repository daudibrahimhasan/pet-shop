import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#55387D",
          hover: "#432B64",
          dark: "#352052",
          light: "#F3EEF9",
          subtle: "#F9F6FC",
          border: "#E2D7EE",
        },
        purple: {
          DEFAULT: "#55387D",
          hover: "#432B64",
          dark: "#352052",
          light: "#F3EEF9",
        },
        heading: "#111827",
        "text-body": "#374151",
        "text-muted": "#6B7280",
        "surface-bg": "#F9FAFB",
        "topbar-bg": "#EFF3EB",
        "border-theme": "#E5E7EB",

        pink: {
          DEFAULT: "#FF3B69",
          badge: "#FF6B8B",
          light: "#FFF0F3",
        },
        coral: {
          DEFAULT: "#FF3B69",
          badge: "#FF6B8B",
        },
        dealRed: "#D91E18",
        amber: {
          DEFAULT: "#FDC040",
          star: "#FFB800",
        },
        orange: {
          DEFAULT: "#FFA000",
          hover: "#E69000",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 24px rgba(85, 56, 125, 0.12)",
        floating: "0 4px 20px rgba(85, 56, 125, 0.25)",
        header: "0 1px 6px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
