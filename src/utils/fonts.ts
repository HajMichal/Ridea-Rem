import localFont from "next/font/local";

export const orkney = localFont({
  src: [
    {
      path: "../../public/fonts/Orkney-Regular.otf",
    },
  ],
  variable: "--font-orkney",
});

export const orkneyBold = localFont({
  src: [
    {
      path: "../../public/fonts/Orkney-Bold.otf",
    },
  ],
  variable: "--font-orkneyBold",
});

export const orkneyLight = localFont({
  src: [
    {
      path: "../../public/fonts/Orkney-Light.otf",
    },
  ],
  variable: "--font-orkneyLight",
});
