import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        primary: {
          default: "#BE3455",
          light: "#e58098",
          dark: "#a81034",
        },
        secondary: {
          default: "#00A1FF",
          light: "#00D1FF",
          dark: "#0077BF",
        },
        foreground: {
          default: "#333333",
          light: "#666666",
          dark: "#000000",
        },
        background: {
          default: "#FFFFFF",
          light: "#F7F7F7",
          dark: "#E0E0E0",
        },
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
