import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "BASE_URL",
      lastModified: new Date(),
      alternates: {
        languages: {
            en: "BASE_URL",
            es: "BASE_URL",
        },
      },
    },
  ];
}
