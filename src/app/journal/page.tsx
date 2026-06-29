'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

interface JournalPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export const journalPosts: JournalPost[] = [
  {
    slug: 'crafting-timeless-luxury',
    title: 'Crafting Timeless Luxury',
    category: 'Editorial',
    date: 'June 25, 2026',
    author: 'Alessandro V.',
    readTime: '5 min read',
    excerpt: "Every collection begins with an idea and evolves through meticulous craftsmanship. Discover the inspiration, premium materials, and refined tailoring that define every JCOPS piece.",
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    slug: 'the-art-of-slow-fashion',
    title: 'The Art of Slow Fashion',
    category: 'Sustainability',
    date: 'May 18, 2026',
    author: 'Elena G.',
    readTime: '4 min read',
    excerpt: 'In an industry defined by speed, we choose pause. Explore our dedication to ethical micro-production, zero-waste packaging, and timeless modular wardrobe architectures built for generations.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop',
  },
  {
    slug: 'okayama-selvedge-denim-mastery',
    title: 'Okayama Selvedge Denim Mastery',
    category: 'Craftsmanship',
    date: 'April 02, 2026',
    author: 'Kenji S.',
    readTime: '6 min read',
    excerpt: 'A journey inside our family-owned mill in Kojima, Okayama. Woven on low-tension shuttle looms, our 15oz raw denim tells a story of patience, deep indigo dye, and custom character aging.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function JournalPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f7f4] pt-32 pb-24">
      <div className="container-JCOPS space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#8a8a8a] uppercase tracking-[0.3em] block">
            JCOPS Editorial
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#121212] uppercase tracking-[0.1em] font-serif">
            The Journal
          </h1>
          <div className="h-px w-16 bg-[#C9A96E] mx-auto my-6" />
          <p className="text-[#4a4a4a] text-sm sm:text-base leading-relaxed">
            Stories behind our seasonal campaigns, details on textile sourcing, and notes on craftsmanship from our workshops in Italy and Japan.
          </p>
        </div>

        {/* Posts Listing */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 pt-6"
        >
          {journalPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={cardVariants}
              className="flex flex-col h-full bg-white border border-[#e5e5e5] group hover:shadow-lg hover:border-[#C9A96E]/50 transition-all duration-500 overflow-hidden"
            >
              {/* Image Banner */}
              <Link href={`/journal/${post.slug}`} className="block relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105 ease-out"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#121212] text-[9px] font-bold font-mono tracking-widest px-3 py-1 uppercase rounded-xs">
                  {post.category}
                </span>
              </Link>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 sm:p-8 justify-between space-y-6">
                <div className="space-y-3">
                  {/* Meta Tags */}
                  <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#C9A96E]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#C9A96E]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#121212] group-hover:text-[#C9A96E] transition-colors leading-tight uppercase font-serif tracking-wide pt-1">
                    <Link href={`/journal/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#4a4a4a] text-xs sm:text-sm leading-relaxed font-light pt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Button */}
                <div className="pt-2">
                  <Link
                    href={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-[#121212] uppercase tracking-[0.2em] group border-b border-[#121212] pb-0.5 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
