import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nordic Precision Design Tokens
        "canvas-dark": "#08090A",
        "surface-dark": "#101216",
        "surface-elevated-dark": "#181B20",
        "surface-container-lowest": "#0D0E0F",
        "surface-container-low": "#1B1C1D",
        "surface-container": "#1F2021",
        "surface-container-high": "#292A2B",
        "surface-container-highest": "#343536",
        "surface-bright": "#38393A",
        "border-dark": "#23272F",

        "canvas-light": "#F8FAFC",
        "surface-light": "#FFFFFF",
        "border-light": "#E2E8F0",

        "cobalt-light": "#1D4ED8",
        "cobalt-dark": "#3B82F6",
        "emerald-light": "#059669",
        "emerald-dark": "#10B981",
        "amber-light": "#D97706",
        "amber-dark": "#F59E0B",
        "rose-light": "#E11D48",
        "rose-dark": "#F43F5E",

        // Text & Outlines
        "on-surface": "#E3E2E3",
        "on-surface-variant": "#C2C6D6",
        "outline": "#8C909F",
        "outline-variant": "#424754",
        "primary": "#3B82F6",
        "on-primary": "#002E6A",
        "secondary-fixed-dim": "#4EDEA3",

        // Legacy palette compatibility
        cat: {
          bg: "#f8fafc",
          surface: "#ffffff",
          border: "#e2e8f0",
          primary: "#1d4ed8",
          secondary: "#0284c7",
          accent: "#f59e0b",
          success: "#10b981",
          warning: "#f97316",
          danger: "#ef4444",
          text: "#0f172a",
          muted: "#64748b",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
