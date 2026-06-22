'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, ShieldCheck, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';
import productsData from '@/data/products.json';

export default function CartPage() {
  const { toast } = useToast();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    discountAmount,
    subtotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const handleApplyCoupon = (event: React.FormEvent) => {
    event.preventDefault();

    if (applyCoupon(couponCode)) {
      toast({
        type: 'success',
        title: 'Promo applied',
        description: 'Your discount has been added to the order summary.',
      });
      setCouponCode('');
      return;
    }

    toast({
      type: 'error',
      title: 'Promo unavailable',
      description: 'That code is not active. Try VEL15 for the current offer.',
    });
  };

  // Helper to change size/color in cart by replacing the item identity
  const handleUpdateAttributes = (item: any, newSize: string, newColor: string) => {
    if (newSize === item.selectedSize && newColor === item.selectedColor) return;
    
    // Remove old item identity
    removeFromCart(item.id);
    // Add new item identity with same quantity
    addToCart(item.product, item.quantity, newSize, newColor);

    toast({
      type: 'success',
      title: 'Item updated',
      description: `Updated size/color details in your shopping bag.`,
    });
  };

  // Curated items for empty state recommendations
  const recommendations = React.useMemo(() => {
    return productsData
      .filter((p) => p.featured || p.trending)
      .slice(0, 4);
  }, []);

  return (
    <main className="container-vellora py-12 sm:py-20 lg:py-24 min-h-[85vh]">
      {/* Header section */}
      <div className="border-b border-border pb-8">
        <span className="label-text text-accent font-semibold">Digital Atelier</span>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="heading-serif text-4xl uppercase leading-none sm:text-5xl lg:text-6xl tracking-wide">
              Shopping Bag
            </h1>
            <p className="mt-3 text-sm text-foreground-secondary font-light max-w-xl">
              Review your selected creations, refine sizes/colors, and apply atelier privileges before checkout.
            </p>
          </div>
          <Link href="/shop" className="btn-outline px-6 py-3 text-[10px] self-start sm:self-auto">
            Continue Shopping
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {cart.length === 0 ? (
          /* Empty Bag State */
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-16 mt-12"
          >
            <section className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-border bg-background-secondary/30 rounded-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary border border-border text-foreground-muted mb-6">
                <ShoppingBag className="h-8 w-8 stroke-[1.25]" />
              </div>
              <h2 className="heading-serif text-2xl sm:text-3xl uppercase tracking-wider">Your bag is empty</h2>
              <p className="mt-3 text-sm text-foreground-secondary max-w-sm mx-auto leading-relaxed">
                Start adding pieces from our collections to design your signature edit.
              </p>
              <div className="mt-8">
                <Link href="/shop" className="btn-primary px-8 py-4 text-[10px]">
                  Explore Shop
                </Link>
              </div>
            </section>

            {/* Recommendations */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="ui-text text-xs font-semibold">Atelier Select Suggestions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((product) => (
                  <div key={product.id} className="group relative flex flex-col">
                    <Link
                      href={`/product/${product.id}`}
                      className="relative aspect-product overflow-hidden border border-border bg-background-secondary rounded-sm"
                    >
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-800 text-[10px] uppercase font-mono text-zinc-500">
                          {product.category}
                        </div>
                      )}
                    </Link>
                    <div className="mt-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="label-text text-[9px] text-foreground-muted">{product.collection}</span>
                        <h4 className="font-medium text-sm mt-1 transition-colors hover:text-accent">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h4>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-sm text-accent font-semibold">${product.price}</span>
                        <Link
                          href={`/product/${product.id}`}
                          className="text-[10px] uppercase tracking-widest text-foreground hover:text-accent font-semibold flex items-center gap-1.5"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          /* Cart Contents Grid */
          <motion.div
            key="cart-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-12 py-10 lg:grid-cols-[1fr_390px] lg:items-start"
          >
            {/* Items List (Minimalist Editorial Style) */}
            <section className="divide-y divide-border/60">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative group"
                  >
                    {/* Image */}
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-full sm:w-36 aspect-product overflow-hidden border border-border/60 bg-background-secondary rounded-xs shrink-0 relative block"
                    >
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-800 text-[10px] uppercase font-mono text-zinc-500">
                          {item.product.category}
                        </div>
                      )}
                    </Link>

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch gap-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <span className="label-text text-[9px] text-foreground-muted">{item.product.collection}</span>
                          <Link href={`/product/${item.product.id}`} className="mt-1 block">
                            <h2 className="text-xl font-serif font-medium leading-snug transition-colors hover:text-accent truncate">
                              {item.product.name}
                            </h2>
                          </Link>
                          
                          {/* Attribute Text Selectors (Borderless look) */}
                          <div className="mt-4 flex flex-wrap items-center gap-5">
                            {/* Size selector */}
                            <div className="flex items-center gap-1.5 border-b border-border/40 pb-0.5">
                              <span className="text-[9px] font-mono text-foreground-muted uppercase tracking-wider">Size</span>
                              <select
                                value={item.selectedSize}
                                onChange={(e) => handleUpdateAttributes(item, e.target.value, item.selectedColor)}
                                className="bg-transparent text-[10px] font-mono px-1 border-none focus:outline-none focus:text-accent font-semibold tracking-wider cursor-pointer"
                              >
                                {item.product.sizes?.map((size: string) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Color selector */}
                            <div className="flex items-center gap-1.5 border-b border-border/40 pb-0.5">
                              <span className="text-[9px] font-mono text-foreground-muted uppercase tracking-wider">Color</span>
                              <select
                                value={item.selectedColor}
                                onChange={(e) => handleUpdateAttributes(item, item.selectedSize, e.target.value)}
                                className="bg-transparent text-[10px] font-mono px-1 border-none focus:outline-none focus:text-accent font-semibold tracking-wider cursor-pointer"
                              >
                                {item.product.colors?.map((color: string) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => item.id && removeFromCart(item.id)}
                          className="p-2 text-foreground-muted hover:text-error hover:bg-error-light/10 rounded-full transition-all cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity & Price Row */}
                      <div className="flex items-center justify-between gap-4 pt-4 mt-auto">
                        <div className="flex items-center border border-border/80 rounded-full bg-background-secondary/35 px-1.5">
                          <button
                            onClick={() => item.id && updateQuantity(item.id, item.quantity - 1)}
                            className="grid h-7 w-7 place-items-center transition-colors hover:text-accent cursor-pointer text-foreground-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                            className="grid h-7 w-7 place-items-center transition-colors hover:text-accent cursor-pointer text-foreground-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          {item.quantity > 1 && (
                            <span className="text-[10px] font-mono text-foreground-muted block mb-0.5">
                              ${item.product.price} each
                            </span>
                          )}
                          <p className="font-mono text-base font-semibold text-accent">${item.product.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </section>

            {/* Sidebar Summary & Bespoke Options */}
            <aside className="sticky top-32 space-y-6">
              {/* Order Summary box */}
              <div className="border border-border bg-background-secondary/70 p-6 sm:p-8 rounded-sm glass shadow-[0_20px_50px_rgba(201,169,110,0.04)] space-y-6">
                <div>
                  <p className="label-text text-accent font-semibold">Order Summary</p>
                  <h2 className="heading-serif mt-1 text-2xl uppercase tracking-wider">Atelier Total</h2>
                </div>

                {/* Shipping progress tracker bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-success">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Express Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-success w-full" />
                  </div>
                </div>

                {/* Promo input */}
                {!coupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 border-t border-border/60 pt-5">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                      <input
                        value={couponCode}
                        onChange={(event) => setCouponCode(event.target.value)}
                        placeholder="PROMO CODE (e.g. VEL15)"
                        className="w-full border border-border bg-background py-2 pl-10 pr-3 text-xs uppercase tracking-widest outline-none focus:border-accent font-mono"
                      />
                    </div>
                    <button type="submit" className="btn-outline px-4 py-2 text-[10px] cursor-pointer">
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between border border-accent/25 bg-accent-light px-3 py-3 text-xs text-accent rounded-sm">
                    <span className="font-mono uppercase tracking-wider font-medium">{coupon.code} Applied</span>
                    <button onClick={removeCoupon} className="text-[10px] uppercase tracking-widest text-foreground hover:text-accent font-semibold cursor-pointer">
                      Remove
                    </button>
                  </div>
                )}

                {/* Summary table */}
                <div className="space-y-3 border-t border-border pt-5 font-mono text-xs">
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
                    <span className="text-[10px] text-success uppercase">Complimentary</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-4 text-sm font-semibold text-foreground">
                    <span>Subtotal</span>
                    <span className="text-accent font-bold">${subtotal}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link href="/checkout" className="btn-primary w-full gap-2 py-4 text-[10px] text-center flex items-center justify-center cursor-pointer">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-foreground-muted text-[10px] font-mono border-t border-border/40 pt-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Double-encrypted card authentication</span>
                </div>
              </div>

              {/* Bespoke Gift Wrapping Options */}
              <div className="border border-border p-6 bg-background rounded-xs space-y-4 shadow-sm">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-accent" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider">Gift Atelier Packaging</h4>
                      <p className="text-[10px] text-foreground-muted mt-0.5">Free signature box and custom note</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="rounded border-border text-accent focus:ring-accent cursor-pointer h-4 w-4 accent-accent"
                  />
                </label>

                <AnimatePresence>
                  {isGift && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2">
                        <textarea
                          rows={3}
                          placeholder="Type your personalized gift message here. It will be hand-written on a gold-embossed card."
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          className="w-full text-xs p-3 border border-border bg-background outline-none focus:border-accent resize-none placeholder:text-foreground-muted/80 rounded-xs"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
