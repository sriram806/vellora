'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/hooks/WishlistContext';

interface ProductCardProps {
  product: Product;
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article
      className="
        group
        relative
        rounded-sm
        border
        border-border
        bg-background
        shadow-[0_10px_35px_rgba(0,0,0,0.03)]
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:border-[#C9A96E]/40
        hover:shadow-[0_25px_60px_rgba(201,169,110,0.08)]
      "
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-product overflow-hidden border-b border-border bg-background-secondary rounded-t-sm">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block">
          {/* Primary Image */}
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-all
                duration-700
                ease-out
                group-hover:scale-105
                group-hover:opacity-0
              "
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-light tracking-[0.3em] text-foreground-muted">
                {product.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')}
              </span>
            </div>
          )}

          {/* Secondary Image */}
          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate`}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-0
                scale-102
                transition-all
                duration-700
                ease-out
                group-hover:opacity-100
                group-hover:scale-100
              "
            />
          )}

          {/* Elegant Dark/Light Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {product.newArrival && (
            <span
              className="
                rounded-xs
                border
                border-border/30
                bg-background/90
                px-3
                py-1
                text-[8px]
                uppercase
                tracking-[0.2em]
                font-mono
                font-bold
                text-foreground
                backdrop-blur-md
              "
            >
              New
            </span>
          )}
          {product.trending && (
            <span
              className="
                rounded-xs
                border
                border-accent/30
                bg-accent
                px-3
                py-1
                text-[8px]
                uppercase
                tracking-[0.2em]
                font-mono
                font-bold
                text-JCOPS-white
                backdrop-blur-md
              "
            >
              Trending
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlist}
          className="
            absolute
            top-3
            right-3
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-border/40
            bg-background/80
            backdrop-blur-md
            shadow-md
            transition-all
            duration-300
            hover:scale-105
            hover:bg-background
            text-foreground
            cursor-pointer
          "
          aria-label="Save to wishlist"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-all ${isSaved
                ? 'fill-[#C9A96E] text-[#C9A96E]'
                : 'text-foreground hover:text-[#C9A96E]'
              }`}
          />
        </button>

        {/* Quick Sizes slide-up panel on Hover */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-20
            translate-y-full
            bg-background/95
            backdrop-blur-md
            border-t
            border-border
            p-3
            transition-transform
            duration-300
            ease-out
            group-hover:translate-y-0
            flex
            flex-col
            gap-1.5
          "
        >
          <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-foreground-secondary">
            <span>Size Availability</span>
            <span className="text-[8px] text-accent font-semibold">{product.inStock !== false ? 'In Stock' : 'Low Stock'}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes?.slice(0, 5).map((size) => (
              <span
                key={size}
                className="px-2 py-0.5 text-[9px] font-mono border border-border-light bg-background-secondary/40 text-foreground-secondary text-center"
              >
                {size}
              </span>
            ))}
            {product.sizes?.length > 5 && (
              <span className="px-1.5 py-0.5 text-[8px] font-mono text-foreground-muted flex items-center">+{product.sizes.length - 5}</span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT CARD DETAILS */}
      <div className="px-4 pb-5 pt-4 sm:px-5">
        {/* Collection line */}
        <p className="mb-1 text-[9px] uppercase tracking-[0.25em] text-foreground-muted font-mono">
          {product.collection}
        </p>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="block">
          <h3
            className="
              line-clamp-1
              text-sm
              font-serif
              font-medium
              leading-snug
              tracking-wide
              text-foreground
              transition-colors
              hover:text-[#C9A96E]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-foreground-muted/75 font-mono">
          {product.category}
        </p>

        {/* Swatch Color Circles */}
        {product.colors?.length > 0 && (
          <div className="mt-3 flex gap-1.5">
            {product.colors.slice(0, 5).map((color, index) => (
              <span
                key={index}
                title={color}
                style={{ backgroundColor: getColorHex(color) }}
                className="
                  h-3
                  w-3
                  rounded-full
                  border
                  border-border/60
                  shadow-xs
                  block
                  shrink-0
                "
              />
            ))}
          </div>
        )}

        {/* Pricing Detail */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-[#C9A96E]">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-[10px] text-foreground-muted line-through opacity-70">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="text-[9px] uppercase tracking-widest font-semibold text-foreground hover:text-[#C9A96E] font-mono transition-colors flex items-center gap-1"
          >
            <span>View Edit</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// Mini Icon for Chevron
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
