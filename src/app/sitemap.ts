import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wyzie.io",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://wyzie.io/about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...["mission", "values", "how-we-work", "open-source"].map((page) => ({
      url: `https://wyzie.io/${page}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: "https://wyzie.io/contact",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://wyzie.io/privacy",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://wyzie.io/terms",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
