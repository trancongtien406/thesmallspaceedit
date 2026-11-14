import type { MetadataRoute } from 'next';
import { getGuides, PUBLISHED } from '@/lib/content';
import { CATEGORIES } from '@/lib/taxonomy';
import { SITE } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/guides/', ...CATEGORIES.map((c) => `/${c.slug}/`), '/about/', '/how-we-choose/', '/contact/', '/privacy-policy/', '/affiliate-disclosure/'];
  return [...pages, ...getGuides().map((g) => `/guides/${g.slug}/`)].map((p) => ({ url: SITE.url + p, lastModified: PUBLISHED }));
}
