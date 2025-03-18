import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // Use system preferences for dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'plot-background': "url('https://cdn.prod.website-files.com/65a509e09ca04e38935eece9/66dffd2b0f8017c53512c6cd_rosenhaeger-wiese_green-account.webp')",
      },
      colors: {
        // 🌱 Brand Colors
          brandBeige: "#fbfaf2", // Solid beige tone (heading + footing + filters bg) 
          brandLightGreen:"#95c11f", // Solid light green (heading + modal button)
          brandEmerald: "#385c56", // Solid emerald green page background
          brandPine: "#0d3a32", // // Solid pine green page

          // 🌞 Light mode
          textPrimary: "#0d3a32",
          bgCard: "rgba(251, 250, 242, 0.66)",
          bgModal: "#fbfaf2", 
          backdropModal: "rgba(13, 58, 50, 0.4)",

          // 🌙 Dark mode
          textDark: "#fbfaf2",
          bgDarkCard: "rgba(13, 58, 50, 0.4)",
          bgDarkModal: "#385c56",
          backdropDarkModal: "rgba(13, 58, 50, 0.66)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;