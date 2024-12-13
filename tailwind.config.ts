import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode based on the class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        greenAccount: {
          daylightBg: "#385c56", // Background for daylight mode
          daylightText: "#0d3a32", // Text for daylight mode
          daylightCard: "#fbfaf2", // Card background for daylight mode
          darkBg: "#385c56", // Background for dark mode
          darkText: "#fbfaf2", // Text for dark mode
          darkCard: "#0d3a32", // Card background for dark mode
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;