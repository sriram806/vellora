'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/hooks/useProductStore';

// Helper to map color names to premium luxury color codes
const getColorHex = (colorName: string): string => {
  const c = colorName.toLowerCase();
  if (c.includes('black')) return '#141414';
  if (c.includes('white')) return '#faf8f5';
  if (c.includes('platinum') || c.includes('silver') || c.includes('volt')) return '#d4d4d8';
  if (c.includes('gray') || c.includes('slate')) return '#7e7e82';
  if (c.includes('cream') || c.includes('ivory')) return '#fcfaf2';
  if (c.includes('espresso') || c.includes('brown')) return '#4b382a';
  if (c.includes('taupe')) return '#8b8589';
  if (c.includes('sand') || c.includes('linen') || c.includes('beige')) return '#dfd5c6';
  if (c.includes('olive') || c.includes('sage') || c.includes('green')) return '#909e8f';
  if (c.includes('camel') || c.includes('cognac') || c.includes('bronze')) return '#c19a6b';
  if (c.includes('burgundy') || c.includes('red')) return '#722f37';
  return '#c0c0c0'; // default gold-silver
};

interface VariantSelectorProps {
  product: Product;
}

export default function VariantSelector({ product }: VariantSelectorProps) {
  const selectedColor = useProductStore((state) => state.selectedColor);
  const setSelectedColor = useProductStore((state) => state.setSelectedColor);
  
  const selectedSize = useProductStore((state) => state.selectedSize);
  const setSelectedSize = useProductStore((state) => state.setSelectedSize);

  const selectedFit = useProductStore((state) => state.selectedFit);
  const setSelectedFit = useProductStore((state) => state.setSelectedFit);
  
  const setIsSizeGuideOpen = useProductStore((state) => state.setIsSizeGuideOpen);

  const colors = product.colors || [];
  const sizes = product.sizes || [];

  // Conditional variant options based on product category
  const fits = ['Slim', 'Regular', 'Relaxed'];
  const sleeveOptions = product.category === 't-shirts' || product.category === 'outerwear' ? ['Short Sleeve', 'Long Sleeve'] : null;
  const patternOptions = ['Solid', 'Ribbed', 'Heathered'];

  return (
    <div className="space-y-6">
      {/* Color Swatches */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] ui-text text-foreground-muted">
          <span>COLOR: <strong className="text-foreground">{selectedColor}</strong></span>
          {selectedColor.toLowerCase().includes('gold') && (
            <span className="text-accent text-[8px] tracking-wider font-bold uppercase">Limited Edition</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((color) => {
            const isSelected = selectedColor === color;
            const hex = getColorHex(color);
            return (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                  isSelected ? 'border-accent scale-108' : 'border-border hover:border-accent/40'
                }`}
                title={color}
                data-cursor="hover"
              >
                <span
                  style={{ backgroundColor: hex }}
                  className="w-6 h-6 rounded-full block border border-black/10 shadow-inner"
                />
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Check className={`w-3.5 h-3.5 ${color.toLowerCase().includes('white') ? 'text-black' : 'text-white'}`} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Selection Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] ui-text text-foreground-muted">
          <span>SIZE: <strong className="text-foreground">{selectedSize}</strong></span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-accent underline text-[9px] hover:text-accent-hover transition-colors font-medium tracking-wider"
            data-cursor="hover"
          >
            Find My Size wizard
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            
            // Mocking variant in-stock status (XS/XL have low stock or out)
            const isLowStock = size === 'XS' || size === '54';
            const isOutOfStock = size === 'XXS'; // mockup out of stock

            return (
              <button
                key={size}
                disabled={isOutOfStock}
                onClick={() => setSelectedSize(size)}
                className={`relative aspect-square border flex flex-col items-center justify-center transition-all ${
                  isOutOfStock 
                    ? 'border-border-light text-zinc-300 bg-zinc-50/20 cursor-not-allowed'
                    : isSelected
                    ? 'border-accent bg-accent-light text-accent font-bold scale-102 shadow-xs'
                    : 'border-border hover:border-accent/40 text-foreground-secondary hover:text-foreground'
                }`}
                data-cursor={isOutOfStock ? 'default' : 'hover'}
              >
                <span className="font-mono text-xs uppercase tracking-wider">{size}</span>
                {isLowStock && !isSelected && (
                  <span className="absolute bottom-1 text-[7px] text-accent uppercase font-bold tracking-tight">Low</span>
                )}
                {isOutOfStock && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-[120%] h-[1px] bg-zinc-300 rotate-45 transform pointer-events-none" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit & Sleeve options */}
      <div className="grid grid-cols-2 gap-4">
        {/* Fit selector */}
        <div className="space-y-2.5">
          <label className="ui-text text-[9px] text-foreground-muted">Sartorial Fit</label>
          <select
            value={selectedFit}
            onChange={(e) => setSelectedFit(e.target.value)}
            className="w-full bg-background border border-border px-3 py-2 text-[10px] font-mono uppercase tracking-wider focus:border-accent outline-hidden"
            data-cursor="hover"
          >
            {fits.map((fit) => (
              <option key={fit} value={fit}>{fit} Fit</option>
            ))}
          </select>
        </div>

        {/* Pattern / Sleeve selectors */}
        {sleeveOptions ? (
          <div className="space-y-2.5">
            <label className="ui-text text-[9px] text-foreground-muted">Pattern Finish</label>
            <select
              className="w-full bg-background border border-border px-3 py-2 text-[10px] font-mono uppercase tracking-wider focus:border-accent outline-hidden"
              data-cursor="hover"
            >
              {patternOptions.map((pat) => (
                <option key={pat} value={pat}>{pat} Cut</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-2.5">
            <label className="ui-text text-[9px] text-foreground-muted">Tailoring Style</label>
            <select
              className="w-full bg-background border border-border px-3 py-2 text-[10px] font-mono uppercase tracking-wider focus:border-accent outline-hidden"
              data-cursor="hover"
            >
              <option>Classic Heritage</option>
              <option>Contemporary Drape</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
