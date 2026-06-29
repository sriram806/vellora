'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

const products = productsData as Product[];

// Map color names to premium hexadecimal codes for live swatches
const getColorHex = (colorName: string): string => {
  const c = colorName.toLowerCase();
  if (c.includes('black')) return '#141414';
  if (c.includes('white')) return '#faf8f5';
  if (c.includes('platinum') || c.includes('silver') || c.includes('volt')) return '#d4d4d8';
  if (c.includes('gray')) return '#8a8a8a';
  if (c.includes('cream') || c.includes('ivory')) return '#fcfaf2';
  if (c.includes('espresso') || c.includes('brown')) return '#4b382a';
  if (c.includes('taupe')) return '#8b8589';
  if (c.includes('sand') || c.includes('linen') || c.includes('beige')) return '#dfd5c6';
  if (c.includes('olive') || c.includes('sage') || c.includes('green')) return '#909e8f';
  if (c.includes('camel') || c.includes('cognac') || c.includes('bronze')) return '#c19a6b';
  if (c.includes('burgundy') || c.includes('red')) return '#722f37';
  return '#c0c0c0'; // default gray
};

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  // Collapsible sidebar states
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    category: true,
    price: true,
    color: true,
    size: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const productsSectionRef = useRef<HTMLDivElement>(null);

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

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, colorFilter, sizeFilter, fitFilter, priceRange, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll back to the products grid header
    if (productsSectionRef.current) {
      const topOffset = productsSectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
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

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container-JCOPS py-12 space-y-12">
      {/* Editorial Header Banner */}
      <div className="border border-border p-8 sm:p-16 flex flex-col justify-center items-center text-center space-y-4 bg-background-secondary relative overflow-hidden group">
        {/* Subtle radial luxury mesh gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        {/* Gold Inset Frame */}
        <div className="absolute inset-4 border border-[#C9A96E]/20 pointer-events-none transition-all duration-700 group-hover:inset-3 group-hover:border-[#C9A96E]/40" />

        <span className="text-[10px] tracking-[0.3em] text-[#C9A96E] uppercase font-mono font-bold">JCOPS Atelier</span>
        <h1 className="heading-serif text-3xl sm:text-6xl font-bold uppercase tracking-widest text-foreground">
          The Collection Shop
        </h1>
        <p className="body-text text-xs sm:text-sm text-foreground-secondary max-w-xl leading-relaxed">
          Discover structured luxury wardrobe staples. Re-engineered using premium cashmere, mulberry silk, and raw Okayama selvedge denim.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start" ref={productsSectionRef}>
        {/* FILTERS PANEL (Desktop) */}
        <aside className="hidden lg:block w-72 space-y-6 flex-shrink-0 border border-border p-6 bg-background-tertiary glass sticky top-32">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <h2 className="ui-text text-xs font-semibold uppercase tracking-wider text-foreground">Filters</h2>
            {activeFiltersList.length > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[10px] text-foreground-muted hover:text-[#C9A96E] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Search Section */}
          <div className="border-b border-border pb-5 space-y-3">
            <button
              onClick={() => toggleSection('search')}
              className="flex justify-between items-center w-full text-left py-1.5 group cursor-pointer"
            >
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-bold">Search</span>
              {expandedSections.search ? (
                <ChevronUp className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              )}
            </button>
            {expandedSections.search && (
              <div className="relative border border-border flex items-center bg-background px-3 py-2 transition-all duration-300 focus-within:border-[#C9A96E]">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs outline-none uppercase placeholder:text-foreground-muted/65"
                />
                <Search className="w-3.5 h-3.5 text-foreground-muted" />
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div className="border-b border-border pb-5 space-y-3">
            <button
              onClick={() => toggleSection('category')}
              className="flex justify-between items-center w-full text-left py-1.5 group cursor-pointer"
            >
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-bold">Category</span>
              {expandedSections.category ? (
                <ChevronUp className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              )}
            </button>
            {expandedSections.category && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => handleCategorySelect('')}
                  className={`text-left text-xs uppercase tracking-wider py-1 hover:text-[#C9A96E] transition-colors flex justify-between items-center w-full cursor-pointer ${!categoryFilter ? 'text-[#C9A96E] font-bold' : 'text-foreground-secondary'
                    }`}
                >
                  <span>All Categories</span>
                  <span className="text-[9px] text-foreground-muted font-mono bg-border-light/60 px-2 py-0.5 rounded-full">
                    {products.length}
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left text-xs uppercase tracking-wider py-1 hover:text-[#C9A96E] transition-colors flex justify-between items-center w-full cursor-pointer ${categoryFilter === cat ? 'text-[#C9A96E] font-bold' : 'text-foreground-secondary'
                      }`}
                  >
                    <span>{cat.replace('-', ' ')}</span>
                    <span className="text-[9px] text-foreground-muted font-mono bg-border-light/60 px-2 py-0.5 rounded-full">
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Section */}
          <div className="border-b border-border pb-5 space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex justify-between items-center w-full text-left py-1.5 group cursor-pointer"
            >
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-bold">Price</span>
              {expandedSections.price ? (
                <ChevronUp className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              )}
            </button>
            {expandedSections.price && (
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-secondary">Max Range</span>
                  <span className="font-mono text-xs text-[#C9A96E] font-bold">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#C9A96E] bg-border h-1 rounded-lg cursor-ew-resize"
                />
              </div>
            )}
          </div>

          {/* Colors Section (Custom swatches with concentric outline) */}
          <div className="border-b border-border pb-5 space-y-3">
            <button
              onClick={() => toggleSection('color')}
              className="flex justify-between items-center w-full text-left py-1.5 group cursor-pointer"
            >
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-bold">Color Palette</span>
              {expandedSections.color ? (
                <ChevronUp className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              )}
            </button>
            {expandedSections.color && (
              <div className="grid grid-cols-4 gap-4 pt-2">
                {colors.map((c) => {
                  const isSelected = colorFilter === c;
                  const colorHex = getColorHex(c);
                  return (
                    <button
                      key={c}
                      onClick={() => setColorFilter(isSelected ? '' : c)}
                      title={c}
                      className="group relative flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <span
                        style={{ backgroundColor: colorHex }}
                        className={`h-7 w-7 rounded-full border transition-all duration-300 relative flex items-center justify-center ${isSelected
                          ? 'border-[#C9A96E] scale-110 ring-2 ring-[#C9A96E]/35'
                          : 'border-border group-hover:scale-105 group-hover:border-foreground-secondary'
                          }`}
                      >
                        {isSelected && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: c.toLowerCase().includes('white') || c.toLowerCase().includes('cream')
                                ? '#c9a96e'
                                : '#ffffff'
                            }}
                          />
                        )}
                      </span>
                      <span className={`text-[8px] uppercase tracking-wider line-clamp-1 max-w-full text-center ${isSelected ? 'text-[#C9A96E] font-bold' : 'text-foreground-muted'
                        }`}>
                        {c.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sizes Section */}
          <div className="pb-2 space-y-3">
            <button
              onClick={() => toggleSection('size')}
              className="flex justify-between items-center w-full text-left py-1.5 group cursor-pointer"
            >
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-bold">Sizes</span>
              {expandedSections.size ? (
                <ChevronUp className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted group-hover:text-[#C9A96E] transition-colors" />
              )}
            </button>
            {expandedSections.size && (
              <div className="grid grid-cols-4 gap-2 pt-1">
                {sizes.map((s) => {
                  const isSelected = sizeFilter === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSizeFilter(isSelected ? '' : s)}
                      className={`h-9 border flex items-center justify-center text-[10px] font-mono transition-all duration-300 cursor-pointer ${isSelected
                        ? 'border-[#C9A96E] bg-[#C9A96E] text-white font-bold shadow-xs'
                        : 'border-border text-foreground-secondary hover:border-[#C9A96E] hover:text-[#C9A96E]'
                        }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div className="flex-grow w-full space-y-6">
          {/* Controls Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-border">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-border px-4 py-2 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C9A96E]" />
              <span className="ui-text text-[10px] font-semibold uppercase tracking-wider">Filters</span>
            </button>

            <span className="text-xs text-foreground-muted font-mono hidden sm:inline">
              Showing {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Luxury Pieces
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="ui-text text-[10px] text-foreground-muted uppercase tracking-wider font-semibold hidden sm:inline">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background-tertiary border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-[#C9A96E] cursor-pointer"
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
                className={`px-4 py-1.5 border text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${!fitFilter
                  ? 'border-[#C9A96E] bg-[#C9A96E] text-white font-semibold'
                  : 'border-border bg-background text-foreground-secondary hover:border-[#C9A96E] hover:text-[#C9A96E]'
                  }`}
              >
                All
              </button>
              {fits.map((f) => (
                <button
                  key={f}
                  onClick={() => setFitFilter(f)}
                  className={`px-4 py-1.5 border text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${fitFilter === f
                    ? 'border-[#C9A96E] bg-[#C9A96E] text-white font-semibold shadow-xs'
                    : 'border-border bg-background text-foreground-secondary hover:border-[#C9A96E] hover:text-[#C9A96E]'
                    }`}
                >
                  {fitFilter === f && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                  <span>{f}</span>
                </button>
              ))}
            </div>

            {/* Fit Guide Button */}
            <button
              onClick={() => setIsFitGuideOpen(true)}
              className="text-[10px] text-[#C9A96E] uppercase tracking-wider font-semibold border border-[#C9A96E]/20 hover:border-[#C9A96E] bg-background px-4 py-2 flex items-center gap-1.5 transition-all hover:bg-[#C9A96E]/5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
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
                    className="hover:text-[#C9A96E] font-bold cursor-pointer text-xs ml-1 transition-colors"
                  >
                    x
                  </button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-[9px] text-[#C9A96E] uppercase tracking-widest font-semibold hover:underline ml-auto cursor-pointer"
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
              <button onClick={handleResetFilters} className="btn-outline py-2 px-6 text-xs font-mono cursor-pointer">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {paginatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {/* Luxury Catalog Progress Bar & Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-10 border-t border-border flex flex-col items-center space-y-6">
                  {/* Progress bar */}
                  <div className="flex flex-col items-center space-y-2 w-full max-w-xs">
                    <span className="text-[10px] text-foreground-muted font-mono uppercase tracking-wider">
                      Showing {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} pieces
                    </span>
                    <div className="w-full bg-border h-[2px] relative overflow-hidden rounded-full">
                      <div
                        className="absolute left-0 top-0 h-full bg-[#C9A96E] transition-all duration-500 ease-out"
                        style={{ width: `${(Math.min(currentPage * itemsPerPage, filteredProducts.length) / filteredProducts.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Buttons controls */}
                  <div className="flex items-center gap-1.5">
                    {/* Prev */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`flex items-center justify-center w-10 h-10 border transition-all duration-300 rounded-sm cursor-pointer ${currentPage === 1
                        ? 'border-border-light text-foreground-muted opacity-40 cursor-not-allowed'
                        : 'border-border hover:border-[#C9A96E] hover:text-[#C9A96E]'
                        }`}
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isCurrent = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 border font-mono text-xs transition-all duration-300 rounded-sm cursor-pointer flex items-center justify-center ${isCurrent
                            ? 'border-[#C9A96E] bg-[#C9A96E] text-white font-bold'
                            : 'border-border hover:border-[#C9A96E] hover:text-[#C9A96E]'
                            }`}
                        >
                          {pageNum.toString().padStart(2, '0')}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={`flex items-center justify-center w-10 h-10 border transition-all duration-300 rounded-sm cursor-pointer ${currentPage === totalPages
                        ? 'border-border-light text-foreground-muted opacity-40 cursor-not-allowed'
                        : 'border-border hover:border-[#C9A96E] hover:text-[#C9A96E]'
                        }`}
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
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
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          {/* Content */}
          <div className="absolute top-0 bottom-0 left-0 w-80 max-w-full bg-background border-r border-border p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <h2 className="ui-text text-sm font-semibold uppercase tracking-wider text-foreground">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-foreground-muted hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 mt-6">
                {/* Search */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Search</label>
                  <div className="relative border border-border flex items-center bg-background px-3 py-2">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs outline-none uppercase placeholder:text-foreground-muted/65"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Category</label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => { handleCategorySelect(''); setShowMobileFilters(false); }}
                      className={`text-left text-xs uppercase tracking-wider py-1 hover:text-[#C9A96E] flex justify-between items-center w-full cursor-pointer ${!categoryFilter ? 'text-[#C9A96E] font-bold' : 'text-foreground-secondary'
                        }`}
                    >
                      <span>All Categories</span>
                      <span className="text-[9px] text-foreground-muted font-mono bg-border-light/60 px-1.5 py-0.5 rounded-full">
                        {products.length}
                      </span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { handleCategorySelect(cat); setShowMobileFilters(false); }}
                        className={`text-left text-xs uppercase tracking-wider py-1 hover:text-[#C9A96E] flex justify-between items-center w-full cursor-pointer ${categoryFilter === cat ? 'text-[#C9A96E] font-bold' : 'text-foreground-secondary'
                          }`}
                      >
                        <span>{cat.replace('-', ' ')}</span>
                        <span className="text-[9px] text-foreground-muted font-mono bg-border-light/60 px-1.5 py-0.5 rounded-full">
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="ui-text text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Max Price</label>
                    <span className="font-mono text-xs text-[#C9A96E] font-bold">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[#C9A96E]"
                  />
                </div>

                {/* Colors (custom circular color list for mobile drawer) */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Color Palette</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {colors.map((c) => {
                      const isSelected = colorFilter === c;
                      const colorHex = getColorHex(c);
                      return (
                        <button
                          key={c}
                          onClick={() => setColorFilter(isSelected ? '' : c)}
                          className={`px-3 py-1.5 border rounded-full text-[10px] uppercase font-medium tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${isSelected
                            ? 'border-[#C9A96E] bg-[#C9A96E]/5 text-[#C9A96E]'
                            : 'border-border text-foreground-secondary bg-background'
                            }`}
                        >
                          <span
                            style={{ backgroundColor: colorHex }}
                            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          />
                          <span>{c.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-3">
                  <label className="ui-text text-foreground-muted text-[10px] uppercase font-bold tracking-wider">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => {
                      const isSelected = sizeFilter === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSizeFilter(isSelected ? '' : s)}
                          className={`w-9 h-9 border flex items-center justify-center text-[10px] font-mono cursor-pointer ${isSelected
                            ? 'border-[#C9A96E] bg-[#C9A96E]/5 text-[#C9A96E] font-bold'
                            : 'border-border text-foreground-secondary bg-background'
                            }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-4">
              <button
                onClick={() => { handleResetFilters(); setShowMobileFilters(false); }}
                className="flex-1 btn-outline py-3 text-xs uppercase cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 btn-primary py-3 text-xs uppercase cursor-pointer"
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsFitGuideOpen(false)} />
          <div className="relative bg-background border border-border p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl glass animate-fade-in-up">
            <button
              onClick={() => setIsFitGuideOpen(false)}
              className="absolute top-4 right-4 p-1 hover:text-[#C9A96E] text-foreground-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[9px] text-[#C9A96E] font-mono uppercase tracking-[0.2em] font-bold">JCOPS Atelier</span>
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
                className="btn-primary px-6 py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold cursor-pointer"
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
    <Suspense fallback={<div className="container-JCOPS py-24 text-center font-mono text-xs uppercase tracking-widest text-foreground-muted">Loading JCOPS Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
