import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e74c3c",
        secondary: "#5ad27d",
        tertiary: "#6b8afd",
        dark: "#1f2937",
        light: "#f5f7fa",
      },
    },
  },
  plugins: [],
};

export default config
