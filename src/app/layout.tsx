import type { Metadata } from "next";
import {
  Raleway,
  Barlow,
  Geist_Mono,
  Playfair_Display,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

import BFCacheReload from "@/components/BFCacheReload";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SG Fit",
  description: "Your fitness journey starts here",
  icons: {
    icon: "/logo/sg-fit-logo-1.png",
    apple: "/logo/sg-fit-logo-1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${barlow.variable} ${geistMono.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BFCacheReload />
        {children}
      </body>
    </html>
  );
}
