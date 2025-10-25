/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#05060a",
          light: "#0b0d16"
        },
        panel: {
          DEFAULT: "#11131f",
          light: "#16192a"
        },
        accent: {
          DEFAULT: "#38bdf8",
          warning: "#f59e0b",
          danger: "#ef4444",
          success: "#22c55e"
        }
      },
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(7, 12, 30, 0.45)"
      }
    }
  },
  plugins: []
};
