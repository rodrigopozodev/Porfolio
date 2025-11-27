import { MetadataRoute } from "next"
import { appConfig, routes } from "./lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}${routes.proyectos}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${routes.leagueTracker}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}

