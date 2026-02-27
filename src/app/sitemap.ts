import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const subdomains = [
    'noct',
    'focus',
    'tyme',
    'readflow',
    'host',
    'music',
    'intellitab',
    'yourwall',
    'f1'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://aranish.uk',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    }
  ]

  for (const subdomain of subdomains) {
    sitemapEntries.push({
      url: `https://${subdomain}.aranish.uk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return sitemapEntries
}
