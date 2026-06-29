import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/wishlist'],
    },
    sitemap: 'https://JCOPS-luxury.vercel.app/sitemap.xml',
  };
}
