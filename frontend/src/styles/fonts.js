import { IBM_Plex_Mono, IBM_Plex_Sans, Montserrat } from "next/font/google";

export const Mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300"],
});

export const Sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "100",
});

export const SansBold = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "200",
});

export const monts = Montserrat({
  weight: "200",
  subsets: ["latin"],
});

export const montsBold = Montserrat({
  weight: "800",
  subsets: ["latin"],
});
