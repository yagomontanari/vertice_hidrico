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
        vertice: {
          green: "#0A4A35",
          lightGreen: "#0C5F43",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          text: "#1E293B",
          textLight: "#64748B",
        }
      },
    },
  },
  plugins: [],
};
export default config;
