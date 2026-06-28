'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import productsData from '@/data/products.json';
import { Product } from '@/types';

import HeroSection from '@/components/home/HeroSection';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import ImmersiveShowroom from '@/components/home/ImmersiveShowroom';
import InfiniteMarquee from '@/components/home/InfiniteMarquee';
import DigitalDrops from '@/components/home/DigitalDrops';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';

const IntroExperience = dynamic(
  () => import('@/components/intro/IntroExperience'),
  { ssr: false }
);

const products = productsData as Product[];

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <IntroExperience>
      <div className="relative w-full bg-background">
        <HeroSection />
        <FeaturedCollection featuredProducts={featuredProducts} />
        <ImmersiveShowroom />
        <InfiniteMarquee />
        <DigitalDrops />
        <FeaturedCategories />
        <BrandStory />
        <Testimonials />
      </div>
    </IntroExperience>
  );
}
