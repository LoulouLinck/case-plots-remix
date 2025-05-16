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
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;