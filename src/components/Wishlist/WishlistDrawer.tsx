'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/hooks/WishlistContext';
import { useCart } from '@/hooks/CartContext';
import Link from 'next/link';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    // Add default first size and color
    const size = product.sizes[0] || 'M';
    const color = product.colors[0] || 'Midnight Black';
    addToCart(product, 1, size, color);
    toggleWishlist(product); // Remove from wishlist
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-background text-foreground z-[51] flex flex-col shadow-2xl border-l border-border glass"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-accent fill-accent" />
                <h2 className="ui-text text-sm">Wishlist</h2>
                <span className="text-xs text-foreground-muted bg-border-light px-2 py-0.5 rounded-full font-mono">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-border-light rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Heart className="w-12 h-12 text-foreground-muted stroke-[1]" />
                  <p className="body-text text-sm text-foreground-secondary">
                    Your wishlist is empty. Save pieces you love.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-outline py-2 px-6 text-xs uppercase tracking-widest"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-border-light last:border-b-0"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 bg-zinc-100 relative overflow-hidden flex-shrink-0 aspect-product border border-border">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] uppercase font-mono">
                          {product.category.substring(0, 3)}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm leading-tight hover:text-accent transition-colors">
                            <Link href={`/product/${product.id}`} onClick={onClose}>
                              {product.name}
                            </Link>
                          </h3>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="p-1 text-foreground-muted hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-mono text-sm text-accent mt-1">${product.price}</p>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="w-full btn-outline py-2 px-3 text-[10px] uppercase tracking-widest mt-3 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
