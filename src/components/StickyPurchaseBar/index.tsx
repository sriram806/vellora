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
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
          className="fixed bottom-0 inset-x-0 z-[40] border-t border-border bg-background/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-2xl py-3 px-4 select-none"
        >
          <div className="container-vellora flex items-center justify-between gap-4">
            
            {/* Product description & thumbnails details (Desktop only) */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-12 bg-background-secondary border border-border overflow-hidden rounded-xs shrink-0">
                <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-xs font-semibold uppercase leading-tight line-clamp-1">{product.name}</h4>
                <div className="flex gap-2 text-[9px] font-mono text-foreground-muted">
                  <span>SIZE: <strong className="text-foreground">{selectedSize || 'None'}</strong></span>
                  <span>&bull;</span>
                  <span>COLOR: <strong className="text-foreground">{selectedColor}</strong></span>
                </div>
              </div>
            </div>

            {/* Price Detail */}
            <div className="flex flex-col sm:items-end justify-center select-none font-mono">
              <span className="text-[9px] text-foreground-muted uppercase tracking-widest hidden sm:inline">Price</span>
              <span className="text-accent font-bold text-sm sm:text-base">${product.price}</span>
            </div>

            {/* CTAs */}
            <div className="flex gap-2 items-center flex-1 sm:flex-initial">
              <button
                onClick={handleAdd}
                disabled={isAdding}
                className="flex-1 sm:flex-none btn-primary px-5 py-3 text-[9px] tracking-widest font-bold uppercase flex items-center justify-center gap-1.5 h-11"
                data-cursor="hover"
              >
                {isAdding ? (
                  <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5" />
                )}
                <span>{isAdding ? 'Adding...' : 'Add To Bag'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-outline px-5 py-3 text-[9px] tracking-widest font-bold uppercase flex items-center justify-center gap-1 h-11"
                data-cursor="hover"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
