'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { getPDPExtraData } from '@/data/pdp-data';

interface PriceCardProps {
  product: Product;
}

export default function PriceCard({ product }: PriceCardProps) {
  const pdpExtra = getPDPExtraData(product.id);
  const originalPrice = product.originalPrice || Math.round(product.price * 1.3); // mockup if not set
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const savings = originalPrice - product.price;

  // Animated Counter for Price Updates
  const [displayPrice, setDisplayPrice] = useState(product.price);

  useEffect(() => {
    const controls = animate(displayPrice, product.price, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayPrice(Math.round(latest))
    });
    return () => controls.stop();
  }, [product.price]);

  return (
    <div className="space-y-4 p-5 border border-border bg-background-tertiary/75 backdrop-blur-xs rounded-sm select-none">
      
      {/* Price Grid */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-accent">
            ${displayPrice}
          </span>
          {originalPrice > product.price && (
            <>
              <span className="font-mono text-xs text-foreground-muted line-through opacity-75">
                ${originalPrice}
              </span>
              <span className="text-[9px] font-mono font-bold bg-accent/15 text-accent border border-accent/20 px-2 py-0.5 uppercase tracking-wider">
                -{discount}% OFF
              </span>
            </>
          )}
        </div>
        {savings > 0 && (
          <p className="text-[10px] font-mono text-success uppercase tracking-wider font-semibold">
            Atelier Savings: ${savings}
          </p>
        )}
      </div>

      <hr className="border-border/60" />

      {/* Finishes and Duties info */}
      <div className="flex flex-col gap-1.5 text-[10px] text-foreground-secondary font-mono uppercase tracking-wider">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Import Duties</span>
          <span className="text-foreground font-semibold">Inclusive of all duties & taxes</span>
        </div>
        
        {pdpExtra.emiOptions?.[0] && (
          <div className="flex justify-between">
            <span className="text-foreground-muted">Financing Options</span>
            <span className="text-foreground font-semibold">From ${pdpExtra.emiOptions[0].amountPerMonth}/mo</span>
          </div>
        )}
      </div>

      {/* Promos / Coupons teaser */}
      <div className="p-3 bg-accent-light/10 border border-accent/15 flex items-start gap-2.5 rounded-xs">
        <Tag className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="ui-text text-[9px] font-bold text-accent">PROMO ACTIVE</span>
            <span className="font-mono text-[8px] border border-accent/30 px-1 py-0.2 text-accent bg-accent-light/30 font-bold uppercase rounded-xs">VEL15</span>
          </div>
          <p className="text-[10px] text-foreground-secondary leading-relaxed font-mono">
            Apply coupon code <strong className="text-foreground font-semibold">VEL15</strong> at shopping bag step to retrieve an extra 15% discount.
          </p>
        </div>
      </div>
      
    </div>
  );
}
