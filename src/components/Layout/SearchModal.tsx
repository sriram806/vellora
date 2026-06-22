'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import productsData from '@/data/products.json';
import {
  Search,
  X,
  ArrowRight,
  Clock3,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  image: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const products: Product[] = (productsData as any[]).map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category || '',
  collection: p.collection || '',
  price: p.price,
  image: p.images?.[0] || '',
}));

export default function SearchModal({
  isOpen,
  onClose,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    const saved = localStorage.getItem(
      'vellora_recent_searches'
    );

    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      setIsSearching(true);

      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [query]);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;

    const updated = [
      term,
      ...recentSearches.filter((item) => item !== term),
    ].slice(0, 6);

    setRecentSearches(updated);

    localStorage.setItem(
      'vellora_recent_searches',
      JSON.stringify(updated)
    );
  };

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];

    return products
      .filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.collection
            .toLowerCase()
            .includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
      }

      if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
          saveSearch(query);
          window.location.href = `/product/${results[selectedIndex].id}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
  }, [
    isOpen,
    results,
    selectedIndex,
    query,
    recentSearches,
  ]);

  const suggestedSearches = [
    '🔥 Trending',
    '✨ New Arrivals',
    '👔 Tailoring',
    '💎 Luxury',
    '👜 Women',
    '🏆 Best Sellers',
  ];

  const featuredCollections = [
    {
      title: 'Summer 2026',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    },
    {
      title: 'Luxury Tailoring',
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
    },
    {
      title: 'Modern Essentials',
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            fixed
            inset-0
            z-[9999]
            overflow-y-auto
            bg-gradient-to-b
            from-[#fafafa]
            via-[#fdfcf8]
            to-[#f4efe5]
            backdrop-blur-3xl
          "
        >
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -60, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 18,
              }}
              className="
                absolute
                top-0
                left-0
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#D4AF37]/10
                blur-[120px]
              "
            />

            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 80, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 22,
              }}
              className="
                absolute
                bottom-0
                right-0
                h-[500px]
                w-[500px]
                rounded-full
                bg-amber-300/10
                blur-[120px]
              "
            />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="
              fixed
              right-8
              top-8
              z-50
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/80
              shadow-lg
            "
          >
            <X size={20} />
          </button>

          <div className="relative mx-auto max-w-7xl rounded-4xl px-6 py-20">
            {/* Search Input */}
            <div>
              <div className="relative border-b rounded-4xl border-vellora-gold-light">
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  size={28}
                />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="SEARCH VELLORA"
                  className="
                    w-full
                    bg-transparent
                    py-5
                    pl-12
                    text-[clamp(2rem,6vw,5rem)]
                    font-light
                    tracking-[0.12em]
                    outline-none
                  "
                />
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-zinc-500">
                Discover timeless luxury
              </p>

              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    <p className="mb-2 text-xs uppercase tracking-[0.3em]">
                      Searching Collection...
                    </p>

                    <div className="h-[2px] overflow-hidden bg-zinc-200">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {query.length <= 1 && (
              <>
                {/* Suggestions */}
                <div className="mt-14">
                  <p className="mb-5 text-xs uppercase tracking-[0.3em]">
                    Suggested Searches
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {suggestedSearches.map((item) => (
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                        }}
                        key={item}
                        onClick={() =>
                          setQuery(item.replace(/[^\w\s]/g, ''))
                        }
                        className="
                          rounded-full
                          border
                          border-zinc-300
                          bg-white
                          px-5
                          py-3
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          shadow-sm
                        "
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Recent */}
                {recentSearches.length > 0 && (
                  <div className="mt-10">
                    <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
                      <Clock3 size={14} />
                      Recent Searches
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {recentSearches.map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="rounded-full border px-4 py-2 text-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured */}
                <div className="mt-20">
                  <div className="mb-8 flex items-center gap-3">
                    <Sparkles size={18} />
                    <p className="text-xs uppercase tracking-[0.3em]">
                      Featured Collections
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {featuredCollections.map((item) => (
                      <motion.div
                        whileHover={{
                          y: -10,
                        }}
                        key={item.title}
                        className="group overflow-hidden rounded-[32px]"
                      >
                        <div className="relative h-[420px]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition
                              duration-700
                              group-hover:scale-110
                            "
                          />

                          <div className="absolute inset-0 bg-black/30" />

                          <div className="absolute bottom-8 left-8">
                            <h3 className="text-3xl text-white">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="mt-14 space-y-4">
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    custom={index}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() =>
                        saveSearch(query)
                      }
                      className={`
                        group
                        flex
                        items-center
                        gap-6
                        rounded-[32px]
                        border
                        bg-white/70
                        p-5
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:border-[#D4AF37]/50
                        hover:bg-white
                        hover:shadow-[0_25px_60px_rgba(212,175,55,0.12)]
                        ${
                          selectedIndex === index
                            ? 'border-[#D4AF37]'
                            : ''
                        }
                      `}
                    >
                      <div className="h-28 w-24 overflow-hidden rounded-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-700
                            group-hover:scale-125
                          "
                        />
                      </div>

                      <div className="flex-1">
                        <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                          New
                        </span>

                        <h3 className="mt-3 text-xl">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-zinc-500">
                          {product.collection}
                        </p>

                        <p className="mt-2 font-medium">
                          ${product.price}
                        </p>
                      </div>

                      <ArrowRight />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
