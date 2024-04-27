import { blackA, violet, mauve } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...violet,
        ...mauve,
        brand: "#92d136",
        dark: "#303030",
        white: "#FFFFFF",
        red: "#FE4A49",
        backgroundGray: "#E8E7E7",
      },
      fontFamily: {
        orkney: ["var(--font-orkney)"],
        orkneyBold: ["var(--font-orkneyBold)"],
        orkneyLight: ["var(--font-orkneyLight)"],
      },
      backgroundImage: {
        "cover-pic": "url('/login.png')",
      },
      screens: {
        tablet: "768px",
        laptop: "1024px",
        xl: "1440px",
        xxl: "2560px",
      },
    },
  },
  plugins: [],
};
