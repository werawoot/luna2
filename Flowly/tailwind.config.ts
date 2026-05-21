import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06101f",
          900: "#0a1628",
          800: "#10243c"
        },
        electric: {
          500: "#2f7dff",
          400: "#5ea0ff",
          300: "#9bc6ff"
        }
      },
      boxShadow: {
        glow: "0 24px 80px rgba(47, 125, 255, 0.24)",
        card: "0 18px 50px rgba(4, 12, 24, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
