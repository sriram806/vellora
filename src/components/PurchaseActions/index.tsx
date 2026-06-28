'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Plus, Minus, CreditCard, Bell, Shuffle, Bookmark } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/CartContext';
import { useWishlist } from '@/hooks/WishlistContext';
import { useToast } from '@/components/UI/ToastProvider';
import { useProductStore } from '@/hooks/useProductStore';

interface PurchaseActionsProps {
  product: Product;
}

export default function PurchaseActions({ product }: PurchaseActionsProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const selectedSize = useProductStore((state) => state.selectedSize);
  const selectedColor = useProductStore((state) => state.selectedColor);
  const selectedFit = useProductStore((state) => state.selectedFit);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [notified, setNotified] = useState(false);

  const isSaved = isInWishlist(product.id);
  const inStock = product.inStock !== false;

  const handleAdd = () => {
    if (!selectedSize) {
      toast({
        type: 'error',
        title: 'Select Size',
        description: 'Please select a size before adding this piece to your bag.',
      });
      return;
    }

    setIsAdding(true);
    // Simulate luxury loader
    setTimeout(() => {
      addToCart(product, quantity, selectedSize, selectedColor);
      setIsAdding(false);
      toast({
        type: 'success',
        title: 'Garment Added',
        description: `${product.name} (${selectedSize} / ${selectedColor}) has been placed in your bag.`,
      });
    }, 800);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        type: 'error',
        title: 'Select Size',
        description: 'Please select a size to checkout.',
      });
      return;
    }
    // Instantly add to cart and route to checkout or toast
    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      type: 'success',
      title: 'Initiating Checkout',
      description: 'Proceeding to secure checkout details.',
    });
  };

  const handleNotify = () => {
    setNotified(true);
    toast({
      type: 'success',
      title: 'Restock Subscription Active',
      description: `We will notify you immediately once ${product.name} size ${selectedSize} returns to stock.`,
    });
  };

  return (
    <div className="space-y-5">
      {inStock ? (
        <>
          {/* Quantity and Wishlist Row */}
          <div className="flex gap-4 items-center select-none">
            {/* Quantity control */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="ui-text text-[9px] text-foreground-muted">QTY</label>
              <div className="flex items-center border border-border bg-background w-full justify-between h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 h-full hover:bg-background-tertiary transition-colors"
                  aria-label="Decrease quantity"
                  data-cursor="hover"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 h-full hover:bg-background-tertiary transition-colors"
                  aria-label="Increase quantity"
                  data-cursor="hover"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wishlist Button */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <label className="ui-text text-[9px] text-foreground-muted">SAVE</label>
              <button
                onClick={() => {
                  toggleWishlist(product);
                  toast({
                    type: 'success',
                    title: isSaved ? 'Removed from Wishlist' : 'Saved to Wishlist',
                    description: isSaved ? 'Removed from your selection.' : 'Saved to your digital collection.',
                  });
                }}
                className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  isSaved 
                    ? 'border-accent bg-accent-light/10 text-accent' 
                    : 'border-border text-foreground hover:border-accent hover:text-accent'
                }`}
                title={isSaved ? 'Saved' : 'Save to Wishlist'}
                data-cursor="hover"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-accent' : ''}`} />
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={isAdding}
              onClick={handleAdd}
              className="flex-1 btn-primary h-13 text-[10px] font-semibold flex items-center justify-center gap-2 select-none"
              data-cursor="hover"
            >
              {isAdding ? (
                <div className="w-4 h-4 border border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
              <span>{isAdding ? 'Placing in Bag...' : 'Add to Shopping Bag'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 btn-outline h-13 text-[10px] font-semibold flex items-center justify-center gap-2 select-none"
              data-cursor="hover"
            >
              <CreditCard className="w-4 h-4" />
              <span>Checkout Now</span>
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-50 border border-zinc-200 text-center space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-bold">This size is currently sold out</p>
            <p className="body-text text-[11px] text-zinc-400">Subscribe below to get notified of upcoming restocks.</p>
          </div>
          <button
            disabled={notified}
            onClick={handleNotify}
            className={`w-full h-12 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest border transition-all ${
              notified 
                ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-default'
                : 'bg-black text-white hover:bg-accent border-black hover:border-accent'
            }`}
            data-cursor={notified ? 'default' : 'hover'}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{notified ? 'Restock Subscription Active' : 'Notify Me When Available'}</span>
          </button>
        </div>
      )}

      {/* Auxiliary comparisons link */}
      <div className="flex justify-center gap-6 pt-2 font-mono text-[9px] uppercase tracking-wider text-foreground-muted">
        <button className="flex items-center gap-1.5 hover:text-accent transition-colors" data-cursor="hover">
          <Shuffle className="w-3 h-3 text-accent" />
          <span>Compare Details</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-accent transition-colors" data-cursor="hover">
          <Bookmark className="w-3 h-3 text-accent" />
          <span>Save for Later</span>
        </button>
      </div>
    </div>
  );
}
