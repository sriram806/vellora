'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types';

const products = productsData as Product[];
const categories = ['all', 't-shirts', 'pants', 'sneakers', 'outerwear', 'accessories'];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.collection.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const featuredTerms = ['silk tee', 'pleated trousers', 'cashmere', 'technical cargo'];

  return (
    <div className="container-vellora py-10 sm:py-14 lg:py-16">
      <section className="border-b border-border pb-8">
        <span className="label-text text-accent">Search The Atelier</span>
        <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <h1 className="heading-serif text-4xl uppercase leading-none sm:text-6xl">
              Find Your Piece
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground-secondary">
              Search by garment, collection, fabric, category, or mood across the full Vellora catalogue.
            </p>
          </div>

          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search garments..."
              className="h-14 w-full border border-border bg-background py-3 pl-12 pr-12 text-sm uppercase tracking-[0.16em] outline-none transition-colors focus:border-accent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-foreground-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-5 border-b border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-accent" />
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                category === item
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-foreground-secondary hover:border-accent hover:text-accent'
              }`}
            >
              {item.replace('-', ' ')}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
      </div>

      {!query && (
        <div className="flex flex-wrap gap-2 py-6">
          {featuredTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {results.length === 0 ? (
        <section className="grid min-h-[38vh] place-items-center border-b border-border py-16 text-center">
          <div className="max-w-md space-y-4">
            <Search className="mx-auto h-10 w-10 text-foreground-muted" />
            <h2 className="heading-serif text-3xl uppercase">No pieces found</h2>
            <p className="text-sm leading-7 text-foreground-secondary">
              Try a collection name, category, or fabric such as cashmere, silk, cargo, or trouser.
            </p>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-vellora py-24 text-center font-mono text-xs uppercase tracking-widest text-foreground-muted">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
