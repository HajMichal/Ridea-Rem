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
      },
      fontFamily: {
        orkney: "Orkney",
      },
    },
  },
  plugins: [],
};
