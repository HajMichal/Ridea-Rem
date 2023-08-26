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
        brand: "#FEEB1A",
        dark: "#303030",
        white: "#FFFFFF",
        red: "#FE4A49",
      },
      fontFamily: {
        orkney: "Orkney",
        orkneyBold: "Orkney-Bold",
        orkneyLight: "Orkney-Light",
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
