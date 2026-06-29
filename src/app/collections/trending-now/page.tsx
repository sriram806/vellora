'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductCardVastrado from '@/components/UI/ProductCardVastrado';

const products = productsData as Product[];

export default function TrendingNowPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trendingProducts = products.filter((p) => p.trending);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  if (!isMounted) return null; // prevent hydration mismatch if needed

  return (
    <div className="w-full min-h-screen bg-[#f8f7f4]">

      {/* Collection Hero */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop"
            alt="Trending Now Collection"
            className="w-full h-full object-cover object-center scale-105 animate-spin-slow origin-center" // using standard object-cover, removed spin-slow for a clean static look
            style={{ animation: 'none' }}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-16">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] text-white/80 mb-6 uppercase tracking-[0.2em] flex gap-3 items-center"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="text-white font-bold">Trending Now</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest drop-shadow-md"
          >
            Trending Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-white/90 text-sm md:text-base max-w-2xl font-light tracking-wide leading-relaxed drop-shadow-sm"
          >
            Discover the most sought-after styles this season. From effortless essentials to statement pieces, shop the looks everyone is loving.
          </motion.p>
        </div>
      </section>

      <div className="container-JCOPS py-8 md:py-12">

        {/* Sticky Toolbar */}
        <div className="sticky top-20 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-[#f8f7f4]/95 backdrop-blur-md border-b border-[#e5e5e5] mb-8 gap-4 sm:gap-0">
          <div className="text-[11px] font-bold text-[#121212] uppercase tracking-[0.15em]">
            {trendingProducts.length} <span className="text-[#8a8a8a] font-normal">Products</span>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <button className="text-[11px] font-bold text-[#121212] uppercase tracking-[0.15em] hover:text-[#c9a96e] transition-colors flex items-center gap-2 group">
              <SlidersHorizontal className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Filters
            </button>
            <button className="text-[11px] font-bold text-[#121212] uppercase tracking-[0.15em] hover:text-[#c9a96e] transition-colors flex items-center gap-2 group">
              Sort By
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {trendingProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-12 sm:gap-x-6 sm:gap-y-16"
          >
            {trendingProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCardVastrado product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-xl font-bold text-[#121212] uppercase tracking-wide mb-2">No Products Found</h3>
            <p className="text-[#8a8a8a]">Check back later for new trending styles.</p>
          </div>
        )}

      </div>
    </div>
  );
}
