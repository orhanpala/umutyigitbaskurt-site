import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        surface: "#F4F6F9",
        "surface-deep": "#EBEEF3",
        ink: "#13213B",
        "ink-soft": "#5B6478",
        navy: "#1F3E70",
        "navy-deep": "#142847",
        amber: "#C2871E",
        "amber-soft": "#FBF1DF",
        border: "#E3E6EC",
      },
      fontFamily: {
        slab: ["var(--font-slab)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      keyframes: {
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "page-in": "page-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
