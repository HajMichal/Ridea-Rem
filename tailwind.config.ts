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
      },
      fontFamily: {
        orkney: "Orkney",
      },
    },
  },
  plugins: [],
};
