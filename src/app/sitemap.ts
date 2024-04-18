import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: process.env.NEXT_PUBLIC_BASE_URL,
          es: process.env.NEXT_PUBLIC_BASE_URL,
        },
      },
    },
  ];
}
