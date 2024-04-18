import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const space_grotesk = Space_Grotesk({ weight: ["300", "400", "500", "600" , "700"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "YTDwnldr",
  description: "Download YouTube videos as MP4 & MP3 files.",
  keywords: ["youtube", "download", "mp4", "mp3"],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  manifest: "/site.webmanifest",
  openGraph: {
    title: "YTDwnldr",
    description: "Download YouTube videos as MP4 & MP3 files quickly and conveniently with YTDwnldr.",
    url: "https://ytdwnldr.vercel.app",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        alt: "YTDwnldr",
      },
    ],
  },
  twitter: {
    site: "@YTDwnldr",
    creator: "@milodevs",
    images: [
      {
        url: "/logo.png",
        alt: "YTDwnldr",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>
        {children}
        <GoogleAnalytics gaId="G-D6QKTHFC99" />
      </body>
    </html>
  );
}
