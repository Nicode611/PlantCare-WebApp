import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"], // Police principale (par défaut)
        mono: ["Martian Mono", "monospace"],
        fancy: ["Cherry Bomb One", "cursive"], // Correction ici
      },
    },
  },
  plugins: [],
} satisfies Config;