'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useProductStore } from '@/hooks/useProductStore';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';

interface StickyBarProps {
  product: Product;
}

export default function StickyPurchaseBar({ product }: StickyBarProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const selectedSize = useProductStore((state) => state.selectedSize);
  const selectedColor = useProductStore((state) => state.selectedColor);

  const [visible, setVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Monitor scroll height to show/hide sticky checkout bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 680) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdd = () => {
    if (!selectedSize) {
      toast({
        type: 'error',
        title: 'Select Size',
        description: 'Please select a size in the options menu.',
      });
      // Scroll user back to top so they see size options
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, 1, selectedSize, selectedColor);
      setIsAdding(false);
      toast({
        type: 'success',
        title: 'Garment Added',
        description: `${product.name} Added to Bag.`,
      });
    }, 600);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        type: 'error',
        title: 'Select Size',
        description: 'Please select a size to checkout.',
      });
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    addToCart(product, 1, selectedSize, selectedColor);
    toast({
      type: 'success',
      title: 'Checkout Direct',
      description: 'Proceeding to secure checkout billing details.',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '150%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '150%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="fixed bottom-6 inset-x-0 mx-auto z-[40] max-w-4xl w-[92%] border border-white/10 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full py-2.5 px-6 select-none flex items-center justify-between gap-4"
        >
          {/* Product description & thumbnails details (Desktop only) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-9 h-11 bg-background-secondary border border-border overflow-hidden rounded-md shrink-0">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif text-[11px] font-semibold uppercase leading-tight line-clamp-1">{product.name}</h4>
              <div className="flex gap-2 text-[8px] font-mono text-foreground-muted">
                <span>SIZE: <strong className="text-foreground">{selectedSize || 'None'}</strong></span>
                <span>&bull;</span>
                <span>COLOR: <strong className="text-foreground">{selectedColor}</strong></span>
              </div>
            </div>
          </div>

          {/* Price Detail */}
          <div className="flex flex-col sm:items-end justify-center select-none font-mono">
            <span className="text-[8px] text-foreground-muted uppercase tracking-widest hidden sm:inline">Price</span>
            <span className="text-[#9c7c3c] font-bold text-xs sm:text-sm">${product.price}</span>
          </div>

          {/* CTAs */}
          <div className="flex gap-2 items-center flex-1 sm:flex-initial">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="flex-1 sm:flex-none bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-full px-6 py-2.5 text-[9px] tracking-widest font-bold uppercase flex items-center justify-center gap-1.5 h-9 transition-colors"
              data-cursor="hover"
            >
              {isAdding ? (
                <div className="w-3 h-3 border border-white/20 border-t-white dark:border-neutral-950/20 dark:border-t-neutral-950 rounded-full animate-spin" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5" />
              )}
              <span>{isAdding ? 'Adding...' : 'Add To Bag'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 rounded-full px-6 py-2.5 text-[9px] tracking-widest font-bold uppercase flex items-center justify-center gap-1 h-9 transition-all text-neutral-800 dark:text-neutral-200"
              data-cursor="hover"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
