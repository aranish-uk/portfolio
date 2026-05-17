import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aranish.uk'
  const routes = [
    { path: '', priority: 1 },
    { path: '/recruiters', priority: 0.9 },
    { path: '/developers', priority: 0.9 },
    { path: '/projects', priority: 0.8 },
    { path: '/journey', priority: 0.4 },
    { path: '/versions', priority: 0.3 },
    { path: '/deanslist', priority: 0.5 },
  ]

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
  ]
}
