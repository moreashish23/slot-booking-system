import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F5F6F8",
          100: "#E7E9EE",
          200: "#C7CCD8",
          400: "#6B7385",
          600: "#3A4257",
          800: "#1D2436",
          900: "#14192B",
        },
        signal: {
          50: "#FDF3E4",
          200: "#F6D6A0",
          400: "#EBAA4C",
          500: "#E0942F",
          600: "#C27C1F",
        },
        good: {
          400: "#4E9E7B",
          500: "#3B8A66",
        },
        warn: {
          400: "#E0942F",
        },
        danger: {
          400: "#D0604B",
          500: "#B84A36",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 25, 43, 0.04), 0 1px 8px rgba(20, 25, 43, 0.06)",
        "card-hover": "0 4px 16px rgba(20, 25, 43, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
