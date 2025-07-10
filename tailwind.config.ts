import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "768px",
        xl: "1000px",
        "2xl": "1300px",
        "3xl": "2000px",
      },
    },
    fontFamily: {
      primary: "var(--font-outfit)",
      secondary: "var(--font-robotomono)",
    },
    extend: {
      screens: {
        ...defaultTheme.screens,
        "3xl": "2000px",
      },
      backgroundImage: {
        "cyan-glow":
          "linear-gradient(111deg, rgba(1, 153, 203, .22) 15%, rgba(1, 153, 203, .5) 60%, rgba(1, 153, 203, .2) 90%)",
      },
      colors: {
        primary: "var(--color-primary)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        light: "var(--color-slate)",
        extraLight: "var(--color-light-slate)",
      },
      boxShadow: {
        anim: "var(--button-shadow)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
