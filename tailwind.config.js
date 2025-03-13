import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1160px",
        sm: "767px",
      },
      colors: {
        primary: "rgba(var(--text-primary))",
        secondary: "rgba(var(--text-secondary))",
        default: "rgba(var(--text-default))",
        hover: "rgba(var(--button-hover))",
      },
      backgroundColor: {
        primary: "rgba(var(--primary-bg))",
        secondary: "rgba(var(--secondary-bg))",
        highlight: "rgba(var(--highlight-bg))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
