import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardVastradoProps {
  product: Product;
}

export default function ProductCardVastrado({ product }: ProductCardVastradoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col gap-3">
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} Alternate`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-[#cc0000] px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="bg-[#C9A96E] px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
              New
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <Link href={`/product/${product.id}`} className="hover:text-[#C9A96E] transition-colors duration-300">
          <h3 className="text-[13px] font-medium leading-tight text-inherit line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] font-bold text-[#C9A96E]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-[#8a8a8a] line-through decoration-[#8a8a8a]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
