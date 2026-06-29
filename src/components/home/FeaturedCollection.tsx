'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types';

interface FeaturedCollectionProps {
  featuredProducts: Product[];
}

export default function FeaturedCollection({ featuredProducts }: FeaturedCollectionProps) {
  return (
    <section className="py-16 sm:py-24 md:py-28 lg:py-32 bg-background border-t border-border relative z-20">
      <div className="container-JCOPS space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
          <div className="space-y-4">
            <span className="label-text text-[#C9A96E]">Curated Selections</span>
            <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider">
              Featured Pieces
            </h2>
          </div>
          <Link href="/shop" className="btn-outline text-xs inline-flex items-center gap-2 group hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xl:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
