import { MetadataRoute } from "next";
import { getAllScripturePaths } from "@/lib/scriptures";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://truth.parallax.kr";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/s`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const scripturePaths = getAllScripturePaths();
  const scripturePages: MetadataRoute.Sitemap = scripturePaths.map((slugParts) => ({
    url: `${baseUrl}/s/${slugParts.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slugParts.length === 1 ? 0.9 : slugParts.length === 2 ? 0.8 : 0.7,
  }));

  return [...staticPages, ...scripturePages];
}
