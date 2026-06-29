'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types';

import 'swiper/css';

interface TrendingNowSectionProps {
  products: Product[];
}

export default function TrendingNowSection({
  products,
}: TrendingNowSectionProps) {
  if (!products?.length) return null;

  return (
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
      <div className="container-JCOPS">

        {/* Heading */}

        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <p className="uppercase tracking-[8px] text-xs text-neutral-500">
              New Season
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-light uppercase tracking-[5px] text-[#111]">
              Trending Now
            </h2>

            <div className="mt-7 h-px w-24 bg-[#C9A96E]" />

          </div>

          <Link
            href="/collections/trending-now"
            className="group flex items-center gap-3 uppercase tracking-[3px] text-xs font-medium text-[#111] hover:text-[#C9A96E] transition-colors duration-300"
          >
            View Collection

            <span className="transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </Link>

        </div>

        {/* Fade Effect */}

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Slider */}

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={18}
          loop
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 28,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>

              <div className="transition-all duration-500 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}