'use client';

import React from 'react';
import { Star, Share2, Shield, Award, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import ProductGallery from '../ProductGallery';
import PriceCard from '../PriceCard';
import VariantSelector from '../VariantSelector';
import PurchaseActions from '../PurchaseActions';
import DeliveryInfo from '../DeliveryInfo';
import SizeGuide from '../SizeGuide';
import ShareModal from '../ShareModal';
import { useProductStore } from '@/hooks/useProductStore';
import AnimatedSection from '../AnimatedSection';

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const setIsShareModalOpen = useProductStore((state) => state.setIsShareModalOpen);

  return (
    <section className="section-JCOPS pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

        {/* Left Column: Premium Gallery (Spans 7 cols on desktop) */}
        <div className="lg:col-span-7 w-full lg:sticky lg:top-24">
          <AnimatedSection animation="fade-up" duration={1.1}>
            <ProductGallery
              images={product.images}
              category={product.category}
              productName={product.name}
            />
          </AnimatedSection>
        </div>

        {/* Right Column: Checkout Specs (Spans 5 cols on desktop) */}
        <div className="lg:col-span-5 w-full space-y-8">

          {/* Breadcrumbs & Badges info */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap gap-2 items-center">
              {product.newArrival && (
                <span className="px-2.5 py-0.5 border border-accent/20 bg-accent-light/10 text-accent font-mono text-[8px] uppercase tracking-widest font-bold">
                  New Arrival
                </span>
              )}
              {product.trending && (
                <span className="px-2.5 py-0.5 border border-accent/20 bg-accent text-white font-mono text-[8px] uppercase tracking-widest font-bold">
                  Trending Showcase
                </span>
              )}
              <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-[0.2em] ml-auto">
                {product.collection} COLLECTION
              </span>
            </div>

            {/* Title & Share button row */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <h1 className="heading-serif text-3xl sm:text-4xl font-bold uppercase leading-tight tracking-wide text-foreground">
                  {product.name}
                </h1>
                <p className="body-text text-xs text-foreground-secondary leading-relaxed max-w-md">
                  {product.description}
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-3 border border-border hover:border-accent hover:text-accent transition-colors shrink-0"
                title="Share piece"
                data-cursor="hover"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Ratings summary block */}
            <div className="flex items-center gap-3 border-t border-b border-border/60 py-2.5 select-none">
              <div className="flex text-accent gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i <= Math.round(product.rating) ? 'fill-accent text-accent' : 'text-zinc-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-foreground-muted font-mono tracking-wider">
                {product.rating} / 5.0 Rating &bull; {product.reviews.length} Verified Reviews
              </span>
            </div>
          </div>

          {/* Pricing detail component */}
          <PriceCard product={product} />

          {/* Color & Size Variant selections */}
          <VariantSelector product={product} />

          {/* Purchase primary CTAs */}
          <PurchaseActions product={product} />

          {/* Postal delivery estimates check */}
          <DeliveryInfo productId={product.id} />

          {/* Size guide and share modals dynamically render */}
          <SizeGuide productId={product.id} />
          <ShareModal productName={product.name} />

        </div>
      </div>
    </section>
  );
}
