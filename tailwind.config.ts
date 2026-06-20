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
    },
  },
  plugins: [],
};

export default config;
