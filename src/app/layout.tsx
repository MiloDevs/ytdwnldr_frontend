import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space_grotesk = Space_Grotesk({ weight: ["300", "400", "500", "600" , "700"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "YTDwnldr",
  description: "Download YouTube videos as MP4 & MP3 files.",
  keywords: ["youtube", "download", "mp4", "mp3"],
  manifest: "/site.webmanifest",
  openGraph: {
    title: "YTDwnldr",
    description: "Download YouTube videos as MP4 & MP3 files.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>{children}</body>
    </html>
  );
}
