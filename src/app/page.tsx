'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import productsData from '@/data/products.json';
import { Product } from '@/types';

import HeroSection from '@/components/home/HeroSection';
import PromoSection from '@/components/home/PromoSection';
import TrendingNowSection from '@/components/home/TrendingNowSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import JournalHighlight from '@/components/home/JournalHighlight';
import InfiniteMarquee from '@/components/home/InfiniteMarquee';
import SocialGrid from '@/components/home/SocialGrid';

const IntroExperience = dynamic(
  () => import('@/components/intro/IntroExperience'),
  { ssr: false }
);

const products = productsData as Product[];

export default function Home() {
  const trendingProducts = products.filter((p) => p.trending);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <IntroExperience>
      <div className="relative w-full bg-[#f8f7f4]">
        <HeroSection />
        <PromoSection />
        <FeaturedCategories />
        <TrendingNowSection products={trendingProducts} />
        <JournalHighlight />
        <InfiniteMarquee />
        <SocialGrid />
      </div>
    </IntroExperience>
  );
}
