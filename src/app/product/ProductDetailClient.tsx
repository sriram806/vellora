'use client';

import React, { useEffect } from 'react';
import { Product } from '@/types';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useProductStore } from '@/hooks/useProductStore';

// PDP Components
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductHero from '@/components/ProductHero';
import ProductInfo from '@/components/ProductInfo';
import ProductStory from '@/components/ProductStory';
import ProductSpecs from '@/components/ProductSpecs';
import TrustBadges from '@/components/TrustBadges';
import Reviews from '@/components/Reviews';
import OutfitRecommendations from '@/components/OutfitRecommendations';
import RelatedProducts from '@/components/RelatedProducts';
import StickyPurchaseBar from '@/components/StickyPurchaseBar';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  const resetPDPState = useProductStore((state) => state.resetPDPState);
  const addToRecentlyViewed = useProductStore((state) => state.addToRecentlyViewed);

  // Sync / Reset PDP local state with loaded product attributes on Mount/Update
  useEffect(() => {
    if (product) {
      resetPDPState(
        product.colors?.[0] || 'Chalk White',
        product.sizes?.[0] || 'M',
        'Regular'
      );
      addToRecentlyViewed(product.id);
    }
  }, [product, resetPDPState, addToRecentlyViewed]);

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-24 overflow-x-hidden">

      {/* Editorial floating background gradient orbs (luxury glassmorphic feel) */}
      <div className="absolute top-[10%] left-[-20%] w-[60%] aspect-square rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-3xl opacity-60 pointer-events-none select-none" />
      <div className="absolute top-[40%] right-[-20%] w-[50%] aspect-square rounded-full bg-gradient-to-bl from-accent/5 to-transparent blur-3xl opacity-50 pointer-events-none select-none" />

      {/* Nav Breadcrumbs */}
      <Breadcrumbs
        category={product.category}
        collection={product.collection}
        productName={product.name}
      />

      {/* PDP Container */}
      <div className="container-JCOPS space-y-6 sm:space-y-12">

        {/* Phase 2/3 - Core Hero display grid */}
        <ProductHero product={product} />

        {/* Phase 3 - Specification list info & philosophy */}
        <ProductInfo product={product} />

        {/* Phase 4 - Curated visual heritage story */}
        <ProductStory productId={product.id} />

        {/* Phase 4 - Trust, payments and re-assurance details */}
        <TrustBadges />

        {/* Phase 5 - Detailed specifications tabs/accordions */}
        <ProductSpecs product={product} />

        {/* Phase 5 - Complete the outfit checkouts */}
        <OutfitRecommendations product={product} />

        {/* Phase 5 - Customer Feedback reviews board */}
        <Reviews product={product} />

        {/* Phase 5 - Similars and Recently viewed */}
        <RelatedProducts relatedProducts={relatedProducts} />

      </div>

      {/* Phase 6 - Scroll-triggered Sticky Action Bar */}
      <StickyPurchaseBar product={product} />

    </div>
  );
}
