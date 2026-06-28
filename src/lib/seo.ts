import { Metadata } from 'next';
import { Product } from '@/types';

const SITE_URL = 'https://vellora-luxury.vercel.app'; // Production placeholder url
const DEFAULT_TITLE = 'Jcops | Premium Luxury Digital Fashion Showroom';
const DEFAULT_DESCRIPTION = 'Experience Jcops, a next-generation luxury digital fashion showroom. Explore our curated collections of silk-cotton tees, pleated wool trousers, calfskin sneakers, and Italian cashmere overcoats.';

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
}

export function getMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/og-image.jpg',
  type = 'website',
}: MetadataOptions = {}): Metadata {
  const url = `${SITE_URL}${path}`;
  const displayTitle = title.includes('Jcops') ? title : `${title} | Jcops`;

  return {
    title: displayTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: 'Jcops',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [image],
      creator: '@vellora_luxury',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getProductSchema(product: Product) {
  const url = `${SITE_URL}/product/${product.id}`;
  const images = product.images.map((img) => `${SITE_URL}${img}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Jcops',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Jcops',
      },
    },
    aggregateRating: product.reviews.length
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviews.length,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
    review: product.reviews.map((rev) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating,
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: rev.name,
      },
      reviewBody: rev.comment,
      datePublished: rev.date,
    })),
  };
}

export function getStoreSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FashionStore',
    name: 'Jcops Luxury Showroom',
    image: `${SITE_URL}/images/campaign_hero.png`,
    '@id': `${SITE_URL}/#store`,
    url: SITE_URL,
    telephone: '+1-800-JCOPS',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Rue du Faubourg Saint-Honoré',
      addressLocality: 'Paris',
      postalCode: '75008',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8698,
      longitude: 2.3218,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/vellora_luxury',
      'https://twitter.com/vellora_luxury',
    ],
  };
}
