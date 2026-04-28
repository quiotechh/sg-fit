import type { Metadata } from "next";
import { Raleway, Barlow, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${raleway.variable} ${barlow.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnnouncementBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
