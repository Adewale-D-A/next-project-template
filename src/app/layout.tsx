import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | iSportX",
    default: "iSportX",
  },
  description:
    "Dedicated to give the best scouting and analysis of the world of sports.",
  applicationName: "iSportX",
  referrer: "origin-when-cross-origin",
  keywords: [
    "sport",
    "soccer",
    "football",
    "scout",
    "tournament",
    "competition",
  ],
  manifest: "https://www.isportx.com/manifest.json",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased w-full`}>{children}</body>
    </html>
  );
}
