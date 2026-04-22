import type { MetadataRoute } from 'next'
import { PLAYERS } from '@/data/crosshairs'

const BASE_URL = 'https://crosshair.gg'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/settings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tier-list`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 }
  ]

  const playerPages: MetadataRoute.Sitemap = PLAYERS.map((name) => ({
    url: `${BASE_URL}/pro/${name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9
  }))

  const blogSlugs = ['como-copiar-mira-valorant', 'mejores-miras-valorant-ranked', 'configuracion-sensibilidad-pro', 'mira-perfecta-principiantes', 'miras-pro-champions-2026']

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  return [...staticPages, ...playerPages, ...blogPages]
}
