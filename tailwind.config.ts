import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF7F9",
          100: "#FDE8EE",
          200: "#F9CBDA",
          300: "#F3A6C0",
        },
        rose: {
          400: "#E85D8A",
          500: "#D8447A",
          600: "#C23F6B",
          700: "#9C3055",
        },
        ink: "#2B2530",
        gold: "#D4AF6A",
      },
      fontFamily: {
        display: [
          "Georgia",
          "Iowan Old Style",
          "Palatino Linotype",
          "URW Palladio L",
          "P052",
          "serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 8px 30px -8px rgba(216, 68, 122, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
