'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    discountAmount,
    subtotal,
    applyCoupon,
    removeCoupon,
    coupon,
  } = useCart();
  const { toast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();

    if (applyCoupon(couponCode)) {
      toast({
        type: 'success',
        title: 'Promo applied',
        description: 'Your atelier privilege has been added to this bag.',
      });
      setCouponCode('');
    } else {
      toast({
        type: 'error',
        title: 'Invalid promo code',
        description: 'Check the code and try again. VEL15 is active today.',
      });
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      toast({
        type: 'success',
        title: 'Order placed',
        description: 'Thank you for choosing Vellora. Your confirmation is being prepared.',
      });
    }, 2000);
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
            className="fixed right-0 top-0 bottom-0 w-full sm:w-120 bg-background text-foreground z-51 flex flex-col shadow-2xl border-l border-border glass"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-background-secondary/70 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-accent/20 bg-accent-light flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="ui-text text-sm">Shopping Cart</h2>
                  <p className="text-[10px] text-foreground-muted uppercase tracking-[0.2em]">Edit your selection</p>
                </div>
                <span className="text-xs text-foreground-muted bg-border-light px-2 py-0.5 rounded-full font-mono">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-border-light rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <ShoppingBag className="w-12 h-12 text-foreground-muted stroke-1" />
                  <p className="body-text text-sm text-foreground-secondary">
                    Your luxury collection is currently empty.
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-outline py-2 px-6 text-xs uppercase tracking-widest"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id!}
                    className="flex gap-5 pb-7 border-b border-border-light last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-28 bg-zinc-100 relative overflow-hidden shrink-0 aspect-product border border-border rounded-sm">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] uppercase font-mono">
                          {item.product.category.substring(0, 3)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 flex flex-col justify-between gap-2">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-medium text-sm leading-tight">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id!)}
                            className="p-1 text-foreground-muted hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-foreground-muted mt-1 uppercase tracking-wider">
                          Size: {item.selectedSize} / Color: {item.selectedColor}
                        </p>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-border rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                            className="p-2 hover:bg-border-light text-foreground-secondary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                            className="p-2 hover:bg-border-light text-foreground-secondary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-semibold text-accent">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 sm:p-8 border-t border-border bg-background-secondary/80 backdrop-blur-xl space-y-6">
                {/* Coupon Code Input */}
                {!coupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (e.g. VELLORA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-background border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-accent"
                    />
                    <button
                      type="submit"
                      className="btn-outline py-2 px-4 text-xs font-mono"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center bg-accent-light px-3 py-2 text-xs text-accent border border-accent/20">
                    <span>
                      PROMO APPLIED: <strong>{coupon.code}</strong> (
                      {coupon.discountType === 'percentage'
                        ? `${coupon.value}% OFF`
                        : `$${coupon.value} OFF`}
                      )
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-foreground hover:text-accent font-semibold uppercase tracking-wider text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {/* Pricing Summary */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-foreground-secondary">
                    <span>Bag Total</span>
                    <span>${cartTotal}</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-accent font-medium">
                      <span>Discount</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground-secondary">
                    <span>Shipping</span>
                    <span className="uppercase text-[10px] text-success">Complimentary</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between text-sm font-semibold text-foreground">
                    <span>Subtotal</span>
                    <span className="text-accent font-bold">${subtotal}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="btn-outline py-3.5 text-xs text-center flex items-center justify-center gap-2"
                  >
                    View Bag
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="btn-primary py-3.5 text-xs text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <span>Checkout</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
