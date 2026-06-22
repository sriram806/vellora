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
  SearchIcon,
  Tag
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  image: string;
  colors: string[];
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
  colors: p.colors || [],
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

    // Reset states on open
    setQuery('');
    setSelectedIndex(-1);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    const saved = localStorage.getItem('vellora_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      setIsSearching(true);

      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
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
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.collection.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
      }

      if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
          saveSearch(query);
          onClose();
          window.location.href = `/product/${results[selectedIndex].id}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query]);

  const suggestedSearches = [
    '🔥 Trending',
    '✨ New Arrivals',
    '👔 Tailoring',
    '💎 Luxury',
    '👜 Accessories',
  ];

  const featuredCollections = [
    {
      title: 'Summer 2026',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop',
      link: '/shop?collection=aether'
    },
    {
      title: 'Luxury Tailoring',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop',
      link: '/shop?category=outerwear'
    },
    {
      title: 'Modern Essentials',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop',
      link: '/shop?category=t-shirts'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-background/98 dark:bg-background/98 backdrop-blur-xl text-foreground"
        >
          {/* Ambient Glow Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px] dark:bg-accent/15" />
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-hover/5 blur-[100px] dark:bg-accent-hover/10" />
          </div>

          {/* Shortcut note */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 border border-border bg-background-secondary/70 rounded-xs font-mono text-[9px] text-foreground-muted tracking-widest uppercase select-none absolute right-24 top-11 z-50">
            ESC to close
          </span>

          {/* Close button with hover animation */}
          <button
            onClick={onClose}
            className="fixed right-8 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background-secondary hover:border-accent hover:text-accent transition-all duration-300 shadow-sm cursor-pointer hover:rotate-90"
            aria-label="Close search"
          >
            <X size={18} />
          </button>

          <div className="relative mx-auto max-w-5xl px-6 py-20 z-10 space-y-12">
            {/* Search Input block */}
            <div className="space-y-4">
              <div className="relative border-b border-border focus-within:border-accent transition-colors py-4 flex items-center">
                <Search className="text-foreground-muted shrink-0 mr-4" size={26} />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH THE ATELIER..."
                  className="w-full bg-transparent text-[clamp(1.5rem,5vw,3.5rem)] font-light tracking-[0.1em] uppercase outline-none placeholder:text-foreground-muted/30"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-foreground-muted font-mono uppercase">
                <span>Discover timeless luxury creations</span>
                {query.length > 0 && (
                  <button 
                    onClick={() => setQuery('')}
                    className="hover:text-accent font-bold transition-colors cursor-pointer"
                  >
                    Clear [x]
                  </button>
                )}
              </div>

              {/* Progress bar loader */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <div className="h-[2px] w-full bg-border-light relative overflow-hidden rounded-full">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 bg-accent"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Default State: Suggestions and Featured */}
            {query.length <= 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
                
                {/* Suggestions & Recent */}
                <div className="lg:col-span-5 space-y-8">
                  {/* Suggested */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-foreground-muted uppercase tracking-[0.2em] font-bold border-b border-border pb-2">
                      Suggested Terms
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {suggestedSearches.map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item.replace(/[^\w\s-]/g, '').trim())}
                          className="px-4 py-2 border border-border bg-background-secondary/50 rounded-full text-[10px] uppercase font-semibold tracking-wider hover:border-accent hover:text-accent hover:bg-background transition-all duration-300 cursor-pointer text-foreground-secondary"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 text-[10px] font-mono text-foreground-muted uppercase tracking-[0.2em] font-bold border-b border-border pb-2">
                        <Clock3 size={12} />
                        Recent Explorations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((item) => (
                          <button
                            key={item}
                            onClick={() => setQuery(item)}
                            className="px-3.5 py-1.5 border border-border-light bg-background-tertiary text-xs text-foreground-secondary hover:border-accent rounded-sm font-mono transition-colors cursor-pointer"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Featured Collections Column */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="flex items-center gap-2 text-[10px] font-mono text-foreground-muted uppercase tracking-[0.2em] font-bold border-b border-border pb-2">
                    <Sparkles size={12} className="text-accent" />
                    Featured Curations
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {featuredCollections.map((item) => (
                      <Link
                        href={item.link}
                        onClick={onClose}
                        key={item.title}
                        className="group relative overflow-hidden rounded-xs border border-border aspect-square bg-background-secondary shadow-xs hover:border-accent/40 transition-all duration-500"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-4 left-4 text-white text-xs font-serif tracking-wider font-semibold uppercase">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Results Listings */}
            {query.length > 1 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-foreground-muted uppercase border-b border-border pb-2">
                  <span>Acquisitions Matching Inquiry</span>
                  <span>{results.length} Pieces Found</span>
                </div>

                {results.length === 0 ? (
                  <div className="py-12 text-center space-y-3 border border-dashed border-border rounded-sm">
                    <SearchIcon className="w-6 h-6 mx-auto text-foreground-muted stroke-[1]" />
                    <p className="text-xs text-foreground-muted uppercase tracking-wider font-mono">No creations match the search phrase.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {results.map((product, index) => {
                      const isSelected = selectedIndex === index;
                      return (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={() => {
                            saveSearch(query);
                            onClose();
                          }}
                          className={`
                            group
                            flex
                            items-center
                            gap-6
                            border
                            p-4
                            rounded-sm
                            transition-all
                            duration-300
                            cursor-pointer
                            ${
                              isSelected
                                ? 'border-accent bg-accent-light/10 shadow-xs'
                                : 'border-border bg-background-secondary/20 hover:border-accent/45 hover:bg-background-secondary/40'
                            }
                          `}
                        >
                          {/* Image */}
                          <div className="h-16 w-14 overflow-hidden border border-border bg-background rounded-xs shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Data details */}
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-accent">
                              {product.collection}
                            </span>
                            <h3 className="text-xs font-serif font-semibold text-foreground truncate group-hover:text-accent transition-colors mt-0.5">
                              {product.name}
                            </h3>
                            <span className="text-[9px] uppercase tracking-wider text-foreground-muted block font-mono mt-0.5">
                              In {product.category}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-xs font-bold text-accent">${product.price}</span>
                            <span className="text-[8px] font-mono text-foreground-muted block mt-0.5 uppercase tracking-widest">In Stock</span>
                          </div>

                          <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
