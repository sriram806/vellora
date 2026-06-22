'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/hooks/WishlistContext';

interface ProductCardProps {
  product: Product;
}

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
        border-zinc-200/60
        bg-white
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-zinc-300
        hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block">
          {/* Primary Image */}
          {product.images?.[0] && (
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
                group-hover:scale-110
                group-hover:opacity-0
              "
            />
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
                scale-105
                transition-all
                duration-700
                group-hover:opacity-100
                group-hover:scale-100
              "
            />
          )}

          {/* Fallback */}
          {!product.images?.[0] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-light tracking-[0.3em] text-zinc-400">
                {product.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')}
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
        </Link>

        {/* NEW Badge */}
        {product.newArrival && (
          <div className="absolute left-4 top-4 z-20">
            <span
              className="
                rounded-sm
                border
                border-white/30
                bg-white/90
                px-4
                py-1.5
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-black
                backdrop-blur-xl
              "
            >
              New
            </span>
          </div>
        )}

        {/* Trending Badge */}
        {product.trending && (
          <div className="absolute left-4 top-14 z-20">
            <span
              className="
                rounded-sm
                border
                border-white/30
                bg-black
                px-4
                py-1.5
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-white
                backdrop-blur-xl
              "
            >
              Trending
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="
            absolute
            top-4
            right-4
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-white/20
            backdrop-blur-xl
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:bg-white/40
          "
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              isSaved
                ? 'fill-black text-black'
                : 'text-zinc-700'
            }`}
          />
        </button>

        {/* Quick View */}
        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            z-20
            translate-y-4
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <Link
            href={`/product/${product.id}`}
            className="
              flex
              items-center
              justify-center
              rounded-sm
              border
              border-white/30
              bg-black/75
              backdrop-blur-xl
              py-3
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-black
            "
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-5 pt-4 sm:px-5">
        {/* Collection */}
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          {product.collection}
        </p>

        {/* Product Name */}
        <Link href={`/product/${product.id}`} className="block">
          <h3
            className="
              line-clamp-2
              text-[15px]
              font-medium
              leading-snug
              tracking-wide
              text-zinc-900
              transition-colors
              hover:text-black
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
          {product.category}
        </p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mt-4 flex gap-2">
            {product.colors.slice(0, 4).map((_, index) => (
              <span
                key={index}
                className="
                  h-3
                  w-3
                  rounded-full
                  border
                  border-zinc-300
                  bg-zinc-200
                "
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-lg font-semibold text-black">
            ${product.price}
          </span>

          {product.originalPrice &&
            product.originalPrice > product.price && (
              <span className="text-sm text-zinc-400 line-through">
                ${product.originalPrice}
              </span>
            )}
        </div>
      </div>
    </article>
  );
}
