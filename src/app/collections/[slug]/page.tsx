'use client';

import React, { use, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, ChevronLeft } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const products = productsData as Product[];

// Collection configuration data for dynamic campaigns
const collectionData: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    image: string;
    filterFn: (p: Product) => boolean;
  }
> = {
  accessories: {
    title: 'Accessories Collection',
    tagline: 'Timeless Luxury Accents & Bags',
    description: 'Precision-crafted leather goods, structural bags, and signature accessories designed to seamlessly complement the JCOPS wardrobe outline.',
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=2400&auto=format&fit=crop',
    filterFn: (p) => p.category.toLowerCase() === 'accessories',
  },
  menswear: {
    title: "Men's Collection",
    tagline: 'Structured Minimalist Wardrobe Staples',
    description: 'Generational tailoring meets modern engineering. Discover raw Okayama denim, heavy-loopback sweats, and double-breasted cashmere overcoats.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2400&auto=format&fit=crop',
    filterFn: (p) => p.category.toLowerCase() !== 'accessories',
  },
  womenswear: {
    title: "Women's Collection",
    tagline: 'Fluid Drapery & Oversized Contours',
    description: 'Effortless luxury in sandwashed silks, double-mercerized organic cottons, and architectural knitwear designed for an elegant drape profile.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2400&auto=format&fit=crop',
    filterFn: (p) => p.category.toLowerCase() !== 'accessories',
  },
};

export default function CollectionSlugPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();

  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Retrieve current config or fall back to default
  const config = collectionData[slug] || {
    title: `${resolvedParams.slug} Collection`,
    tagline: 'Premium Luxury Creations',
    description: 'Explore the curated digital showroom catalog of luxury staples and capsule designs.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop',
    filterFn: () => true,
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(config.filterFn)
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [slug, sortBy, config]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-[#f8f7f4] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#8a8a8a]">
        Loading Atelier Collection...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f7f4]">
      {/* Collection Hero Banner */}
      <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={config.image}
            alt={config.title}
            className="w-full h-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.75)' }}
          />
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
          {/* Ambient Gold Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.15),transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 max-w-3xl space-y-4">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[9px] sm:text-[10px] text-white/80 uppercase tracking-[0.25em] flex gap-2.5 items-center font-mono"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white font-bold">{config.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-widest drop-shadow-sm font-serif"
          >
            {config.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-white/90 text-xs sm:text-sm font-light tracking-wide leading-relaxed max-w-xl drop-shadow-sm"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      <div className="container-JCOPS py-8 md:py-12">
        {/* Collection Toolbar */}
        <div className="sticky top-20 z-40 flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-[#f8f7f4]/95 backdrop-blur-md border-b border-[#e5e5e5] mb-8 gap-4 sm:gap-0">
          <div className="text-[10px] font-mono text-[#121212] uppercase tracking-[0.15em] font-bold">
            {filteredProducts.length} <span className="text-[#8a8a8a] font-normal">Creations Found</span>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <Link 
              href="/shop"
              className="text-[10px] font-bold text-[#121212] uppercase tracking-[0.15em] hover:text-[#C9A96E] transition-colors flex items-center gap-1.5 group"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-[#C9A96E]" />
              <span>Interactive Filters</span>
            </Link>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#8a8a8a] uppercase tracking-wider font-mono hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-[#e5e5e5] px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-mono outline-none focus:border-[#C9A96E] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-[#8a8a8a] stroke-[1]" />
            <h3 className="text-sm font-bold text-[#121212] uppercase tracking-wide">No Pieces Found</h3>
            <p className="text-xs text-[#8a8a8a] max-w-xs">This dynamic campaign catalogue does not currently contain active releases.</p>
          </div>
        )}
      </div>
    </div>
  );
}
