import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        button: "1px 2px 2px 1px rgba(0, 0, 0, 0.285)",
        activeButton: "inset 1px 2px 2px 0px rgba(0, 0, 0, 0.285)",
        primaryShadow: "2px 2px 0px 2px #277A1C",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#277A1C",
        secondary: "#AACCA6",
        water: "#188396"
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
        fancy: ["Cherry Bomb One", "cursive"], // Correction ici
      },
    },
  },
  plugins: [],
} satisfies Config;