'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';
import { SlidersHorizontal, Grid, List, X, Search, Info } from 'lucide-react';

const products = productsData as Product[];

const getProductFit = (product: Product): string => {
  const desc = (product.description || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  
  if (desc.includes('oversized') || name.includes('oversized') || desc.includes('wide-leg') || name.includes('wide-leg') || desc.includes('wide')) {
    return 'Oversized';
  }
  if (desc.includes('relaxed') || name.includes('relaxed') || desc.includes('fluid') || name.includes('fluid') || desc.includes('leisure')) {
    return 'Relaxed';
  }
  if (desc.includes('slim') || name.includes('slim') || desc.includes('cropped') || name.includes('cropped')) {
    return 'Slim';
  }
  if (desc.includes('tailored') || name.includes('tailored') || desc.includes('pleated') || name.includes('pleated') || desc.includes('sartorial') || name.includes('blazer') || name.includes('overcoat')) {
    return 'Tailored';
  }
  if (desc.includes('tapered') || name.includes('tapered') || desc.includes('cargo') || name.includes('cargo') || name.includes('runner') || name.includes('trainer')) {
    return 'Tapered';
  }
  return 'Slim'; // Default
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial filters from url query if available
  const urlCategory = searchParams.get('category') || '';
  const urlCollection = searchParams.get('collection') || '';

  // Filter local states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(urlCategory);
  const [colorFilter, setColorFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [priceRange, setPriceRange] = useState(3000);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [fitFilter, setFitFilter] = useState('');
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);

  // Lists of available colors and sizes for UI
  const categories = ['t-shirts', 'pants', 'sneakers', 'outerwear', 'accessories'];
  const colors = ['Midnight Black', 'Chalk White', 'Slate Gray', 'Cream', 'Silver Metallic', 'Platinum Silver', 'Espresso', 'Taupe'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size', '40', '41', '42', '43', '44', '45', '46', '48', '50', '52', '54'];
  const fits = ['Slim', 'Relaxed', 'Oversized', 'Tailored', 'Tapered'];

  // Calculate dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((prod) => {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Handle setting category which also updates router url search parameters cleanly
  const handleCategorySelect = (cat: string) => {
    setCategoryFilter(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    router.replace(`/shop?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setColorFilter('');
    setSizeFilter('');
    setFitFilter('');
    setPriceRange(3000);
    setSortBy('featured');
    router.replace('/shop');
  };

  // Compile active filters list
  const activeFiltersList = useMemo(() => {
    const list = [];
    if (categoryFilter) list.push({ key: 'category', label: `Category: ${categoryFilter.replace('-', ' ')}` });
    if (colorFilter) list.push({ key: 'color', label: `Color: ${colorFilter}` });
    if (sizeFilter) list.push({ key: 'size', label: `Size: ${sizeFilter}` });
    if (fitFilter) list.push({ key: 'fit', label: `Fit: ${fitFilter}` });
    if (priceRange < 3000) list.push({ key: 'price', label: `Price: < $${priceRange}` });
    if (searchQuery) list.push({ key: 'search', label: `Search: "${searchQuery}"` });
    return list;
  }, [categoryFilter, colorFilter, sizeFilter, fitFilter, priceRange, searchQuery]);

  const handleRemoveFilter = (filterKey: string) => {
    if (filterKey === 'category') handleCategorySelect('');
    if (filterKey === 'color') setColorFilter('');
    if (filterKey === 'size') setSizeFilter('');
    if (filterKey === 'fit') setFitFilter('');
    if (filterKey === 'price') setPriceRange(3000);
    if (filterKey === 'search') setSearchQuery('');
  };

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = prod.name.toLowerCase().includes(q);
          const matchesDesc = prod.description.toLowerCase().includes(q);
          const matchesColl = prod.collection.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesColl) return false;
        }

        // Category filter
        if (categoryFilter && prod.category !== categoryFilter) return false;

        // Collection filter (from url query)
        if (urlCollection && prod.collection.toLowerCase() !== urlCollection.toLowerCase()) return false;

        // Price range filter
        if (prod.price > priceRange) return false;

        // Color filter
        if (colorFilter && !prod.colors.some(c => c.toLowerCase().includes(colorFilter.toLowerCase()))) return false;

        // Size filter
        if (sizeFilter && !prod.sizes.includes(sizeFilter)) return false;

        // Fit filter
        if (fitFilter) {
          const fit = getProductFit(prod);
          if (fit !== fitFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        
        // Default: featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchQuery, categoryFilter, urlCollection, colorFilter, sizeFilter, fitFilter, priceRange, sortBy]);

  return (
    <div className="container-vellora py-12 space-y-12">
      {/* Editorial Header Banner */}
      <div className="border border-border p-8 sm:p-16 flex flex-col justify-center items-center text-center space-y-4 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-10 pointer-events-none" />
        <span className="label-text text-accent">Vellora Atelier</span>
        <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase tracking-wider">
          The Collection Shop
        </h1>
        <p className="body-text text-sm text-foreground-secondary max-w-xl">
          Discover structured luxury wardrobe staples. Re-engineered using premium cashmere, mulberry silk, and raw Okayama selvedge denim.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* FILTERS PANEL (Desktop) */}
        <aside className="hidden lg:block w-72 space-y-8 flex-shrink-0 border border-border p-6 bg-background-tertiary glass sticky top-32">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <h2 className="ui-text text-sm">Filters</h2>
            <button
              onClick={handleResetFilters}
              className="text-[10px] text-foreground-muted hover:text-accent font-semibold uppercase tracking-wider"
            >
              Reset All
            </button>
          </div>

          {/* Search */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px] block">Search</label>
            <div className="relative border border-border flex items-center bg-background px-3 py-2">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs outline-none uppercase"
              />
              <Search className="w-3.5 h-3.5 text-foreground-muted" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px] block">Category</label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCategorySelect('')}
                className={`text-left text-xs uppercase tracking-wider py-1 hover:text-accent transition-colors flex justify-between items-center w-full ${
                  !categoryFilter ? 'text-accent font-semibold' : 'text-foreground-secondary'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[9px] text-foreground-muted font-mono bg-border-light/40 px-1.5 py-0.5 rounded-full">
                  {products.length}
                </span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left text-xs uppercase tracking-wider py-1 hover:text-accent transition-colors flex justify-between items-center w-full ${
                    categoryFilter === cat ? 'text-accent font-semibold' : 'text-foreground-secondary'
                  }`}
                >
                  <span>{cat.replace('-', ' ')}</span>
                  <span className="text-[9px] text-foreground-muted font-mono bg-border-light/40 px-1.5 py-0.5 rounded-full">
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="ui-text text-foreground-muted text-[10px]">Max Price</label>
              <span className="font-mono text-xs text-accent">${priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-accent bg-border h-1"
            />
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px] block">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColorFilter(colorFilter === c ? '' : c)}
                  className={`px-3 py-1.5 border rounded-full text-[10px] uppercase font-medium tracking-wider transition-colors ${
                    colorFilter === c ? 'border-accent bg-accent-light text-accent' : 'border-border text-foreground-secondary hover:border-accent'
                  }`}
                >
                  {c.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px] block">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(sizeFilter === s ? '' : s)}
                  className={`w-9 h-9 border flex items-center justify-center text-[10px] font-mono transition-colors ${
                    sizeFilter === s ? 'border-accent bg-accent-light text-accent font-bold' : 'border-border text-foreground-secondary hover:border-accent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div className="flex-1 w-full space-y-6">
          {/* Controls Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-border">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-border px-4 py-2 hover:border-accent transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span className="ui-text text-[10px]">Filter</span>
            </button>

            <span className="text-xs text-foreground-muted font-mono hidden sm:inline">
              Showing {filteredProducts.length} Luxury Pieces
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="ui-text text-[10px] text-foreground-muted hidden sm:inline">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-accent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Apparel Fit Horizontal Selector (Lee Style) */}
          <div className="border border-border p-4 bg-background-secondary flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-2 sm:pb-0">
              <span className="text-[10px] text-foreground-muted uppercase tracking-widest font-bold whitespace-nowrap mr-2">Silhouettes:</span>
              <button
                onClick={() => setFitFilter('')}
                className={`px-4 py-1.5 border text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  !fitFilter ? 'border-accent bg-accent text-white font-semibold' : 'border-border bg-background text-foreground-secondary hover:border-accent'
                }`}
              >
                All Fits
              </button>
              {fits.map((f) => (
                <button
                  key={f}
                  onClick={() => setFitFilter(f)}
                  className={`px-4 py-1.5 border text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                    fitFilter === f ? 'border-accent bg-accent text-white font-semibold' : 'border-border bg-background text-foreground-secondary hover:border-accent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Fit Guide Button */}
            <button
              onClick={() => setIsFitGuideOpen(true)}
              className="text-[10px] text-accent uppercase tracking-wider font-semibold border border-accent/20 hover:border-accent bg-background px-4 py-2 flex items-center gap-1.5 transition-all hover:bg-accent-light cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 animate-pulse" />
              <span>View Fit Guide</span>
            </button>
          </div>

          {/* Active Filters Bar (Mufti Style) */}
          {activeFiltersList.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-3 border-b border-border-light">
              <span className="text-[10px] text-foreground-muted uppercase tracking-widest font-bold mr-2">Active:</span>
              {activeFiltersList.map((filt) => (
                <span
                  key={filt.key}
                  className="inline-flex items-center gap-1.5 px-3 py-1 border border-border bg-background text-[10px] uppercase font-mono tracking-wider text-foreground-secondary"
                >
                  <span>{filt.label}</span>
                  <button
                    onClick={() => handleRemoveFilter(filt.key)}
                    className="hover:text-accent font-bold cursor-pointer text-xs ml-1"
                  >
                    x
                  </button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-[9px] text-accent uppercase tracking-widest font-semibold hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Grid Layout */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
              <SlidersHorizontal className="w-8 h-8 text-foreground-muted stroke-[1]" />
              <p className="body-text text-sm text-foreground-muted">
                No luxury pieces match your current filters.
              </p>
              <button onClick={handleResetFilters} className="btn-outline py-2 px-6 text-xs font-mono">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS SIDEBAR (Drawer) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-black/50"
          />
          {/* Content */}
          <div className="absolute top-0 bottom-0 left-0 w-80 max-w-full bg-background border-r border-border p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h2 className="ui-text text-sm">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-foreground-muted hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 mt-6">
                {/* Search */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px]">Search</label>
                  <div className="relative border border-border flex items-center bg-background px-3 py-2">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] block">Category</label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { handleCategorySelect(''); setShowMobileFilters(false); }}
                      className={`text-left text-xs uppercase tracking-wider py-1 hover:text-accent flex justify-between items-center w-full ${
                        !categoryFilter ? 'text-accent font-bold' : 'text-foreground-secondary'
                      }`}
                    >
                      <span>All Categories</span>
                      <span className="text-[9px] text-foreground-muted font-mono bg-border-light/40 px-1.5 py-0.5 rounded-full font-normal">
                        {products.length}
                      </span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { handleCategorySelect(cat); setShowMobileFilters(false); }}
                        className={`text-left text-xs uppercase tracking-wider py-1 hover:text-accent flex justify-between items-center w-full ${
                          categoryFilter === cat ? 'text-accent font-bold' : 'text-foreground-secondary'
                        }`}
                      >
                        <span>{cat.replace('-', ' ')}</span>
                        <span className="text-[9px] text-foreground-muted font-mono bg-border-light/40 px-1.5 py-0.5 rounded-full font-normal">
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="ui-text text-foreground-muted text-[10px]">Max Price</label>
                    <span className="font-mono text-xs text-accent">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                </div>

                {/* Fit / Silhouette */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] block">Silhouette</label>
                  <div className="flex flex-wrap gap-2">
                    {fits.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFitFilter(fitFilter === f ? '' : f)}
                        className={`px-3 py-1.5 border rounded-full text-[10px] uppercase font-medium tracking-wider transition-colors cursor-pointer ${
                          fitFilter === f ? 'border-accent bg-accent-light text-accent' : 'border-border text-foreground-secondary'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] block">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColorFilter(colorFilter === c ? '' : c)}
                        className={`px-3 py-1.5 border rounded-full text-[10px] uppercase font-medium tracking-wider ${
                          colorFilter === c ? 'border-accent bg-accent-light text-accent' : 'border-border text-foreground-secondary'
                        }`}
                      >
                        {c.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSizeFilter(sizeFilter === s ? '' : s)}
                        className={`w-9 h-9 border flex items-center justify-center text-[10px] font-mono ${
                          sizeFilter === s ? 'border-accent bg-accent-light text-accent font-bold' : 'border-border text-foreground-secondary'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-4">
              <button
                onClick={handleResetFilters}
                className="flex-1 btn-outline py-3 text-xs uppercase"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 btn-primary py-3 text-xs uppercase"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIT GUIDE MODAL (Lee style) */}
      {isFitGuideOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFitGuideOpen(false)} />
          <div className="relative bg-background border border-border p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl glass">
            <button
              onClick={() => setIsFitGuideOpen(false)}
              className="absolute top-4 right-4 p-1 hover:text-accent text-foreground-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[9px] text-accent font-mono uppercase tracking-[0.2em] font-bold">Vellora Atelier</span>
              <h2 className="heading-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider">The Silhouette Fit Guide</h2>
              <p className="body-text text-xs text-foreground-secondary">
                Understanding our modular architectural cuts, structured shapes, and drape profiles.
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 border border-border bg-background-secondary space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Slim Fit</h4>
                    <span className="text-[9px] font-mono text-foreground-muted uppercase">Structured Weave</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    Close to the body with clean lines. Tailored shoulders, high armholes, and standard sleeve lengths. Perfect for sleek standalone statements or base-layering.
                  </p>
                </div>

                <div className="p-4 border border-border bg-background-secondary space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Relaxed Fit</h4>
                    <span className="text-[9px] font-mono text-foreground-muted uppercase">Fluid Drape</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    Generous throughout the chest and waist with a fluid, natural drape. Designed for effortless comfort and ventilation without losing geometric shape.
                  </p>
                </div>

                <div className="p-4 border border-border bg-background-secondary space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Oversized Fit</h4>
                    <span className="text-[9px] font-mono text-foreground-muted uppercase">Boxy & Volume</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    Dropped shoulders, wider chest widths, and longer proportions. Built with heavyweight GSM fabrics that hold a rigid, boxy, architectural profile.
                  </p>
                </div>

                <div className="p-4 border border-border bg-background-secondary space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Tailored Fit</h4>
                    <span className="text-[9px] font-mono text-foreground-muted uppercase">Sartorial Outline</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    Precision curves contouring the torso. Features pleated folds, pressed creases, and structured shoulder margins. The pinnacle of formal alignment.
                  </p>
                </div>

                <div className="p-4 border border-border bg-background-secondary space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Tapered Fit</h4>
                    <span className="text-[9px] font-mono text-foreground-muted uppercase">Ergonomic Slope</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    Extra room in the thighs and seat, sloping smoothly to a narrow leg opening. Integrates cargo pocket designs and adjustable cuff toggles.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsFitGuideOpen(false)}
                className="btn-primary px-6 py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-vellora py-24 text-center font-mono text-xs uppercase tracking-widest text-foreground-muted">Loading Vellora Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
