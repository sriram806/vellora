import { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const products = productsData as Product[];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vellora-luxury.vercel.app';
  
  const routes = ['', '/shop', '/collections', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
