/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Weather theme colors
        sunny: {
          light: "#bae6fd",
          DEFAULT: "#60a5fa",
          dark: "#1e3a8a",
        },
        cloudy: {
          light: "#f3f4f6",
          DEFAULT: "#9ca3af",
          dark: "#6b7280",
        },
        rainy: {
          light: "#64748b",
          DEFAULT: "#334155",
          dark: "#1e293b",
        },
        thunder: {
          light: "#334155",
          DEFAULT: "#1e293b",
          dark: "#0f172a",
        },
        snowy: {
          light: "#f9fafb",
          DEFAULT: "#e0f2fe",
          dark: "#93c5fd",
        },
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
        "float-clouds": "floatClouds 60s linear infinite",
        fall: "fall 1s linear infinite",
        snowfall: "snowfall 8s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        floatClouds: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(150vw)" },
        },
        fall: {
          "0%": { transform: "translateY(-10%)", opacity: "1" },
          "100%": { transform: "translateY(120vh)", opacity: "0.5" },
        },
        snowfall: {
          "0%": { transform: "translateY(-10%) translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateY(120vh) translateX(30px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
