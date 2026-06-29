'use client';

import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '@/types';
import ProductCard from '../Product/ProductCard';
import productsData from '@/data/products.json';
import { useProductStore } from '@/hooks/useProductStore';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  const [activeSegment, setActiveSegment] = useState<'similar' | 'trending' | 'recent'>('similar');
  const recentlyViewedIds = useProductStore((state) => state.recentlyViewed);

  // Fetch trending products from JSON
  const trendingProducts = useMemo(() => {
    return (productsData as Product[])
      .filter((p) => p.trending)
      .slice(0, 8);
  }, []);

  // Fetch recently viewed products from store
  const recentlyViewedProducts = useMemo(() => {
    return (productsData as Product[])
      .filter((p) => recentlyViewedIds.includes(p.id))
      .slice(0, 8);
  }, [recentlyViewedIds]);

  const activeProducts = useMemo(() => {
    if (activeSegment === 'trending') return trendingProducts;
    if (activeSegment === 'recent') return recentlyViewedProducts;
    return relatedProducts;
  }, [activeSegment, relatedProducts, trendingProducts, recentlyViewedProducts]);

  return (
    <section className="section-JCOPS border-t border-border select-none">
      <div className="container-JCOPS space-y-8">

        {/* Navigation Selector segments */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 border-b border-border pb-3">
          <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest text-foreground-muted">
            <button
              onClick={() => setActiveSegment('similar')}
              className={`pb-2 border-b-2 transition-colors ${activeSegment === 'similar' ? 'border-accent text-accent font-bold' : 'border-transparent hover:text-foreground'
                }`}
              data-cursor="hover"
            >
              Similar Masterpieces
            </button>
            <button
              onClick={() => setActiveSegment('trending')}
              className={`pb-2 border-b-2 transition-colors ${activeSegment === 'trending' ? 'border-accent text-accent font-bold' : 'border-transparent hover:text-foreground'
                }`}
              data-cursor="hover"
            >
              Trending Now
            </button>
            {recentlyViewedProducts.length > 0 && (
              <button
                onClick={() => setActiveSegment('recent')}
                className={`pb-2 border-b-2 transition-colors ${activeSegment === 'recent' ? 'border-accent text-accent font-bold' : 'border-transparent hover:text-foreground'
                  }`}
                data-cursor="hover"
              >
                Recently Viewed ({recentlyViewedProducts.length})
              </button>
            )}
          </div>

          <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-widest hidden sm:inline">
            Scroll or Drag to inspect
          </span>
        </div>

        {/* Carousel Grid */}
        <div className="w-full relative py-2">
          {activeProducts.length === 0 ? (
            <p className="body-text text-xs text-foreground-muted italic py-6">
              No registered archive pieces under this catalog.
            </p>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
              }}
              className="w-full relative"
              data-cursor="drag"
            >
              {activeProducts.map((prod) => (
                <SwiperSlide key={prod.id} className="py-2 h-full flex">
                  <div className="w-full h-full">
                    <ProductCard product={prod} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

      </div>
    </section>
  );
}
