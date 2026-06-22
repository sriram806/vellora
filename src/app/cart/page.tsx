'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';

export default function CartPage() {
  const { toast } = useToast();
  const {
    cart,
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

  return (
    <div className="container-vellora py-10 sm:py-14 lg:py-16">
      <div className="border-b border-border pb-8">
        <span className="label-text text-accent">Digital Atelier</span>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="heading-serif text-4xl uppercase leading-none sm:text-6xl">
              Shopping Bag
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground-secondary">
              Review your selected pieces, adjust quantities, and apply atelier privileges before checkout.
            </p>
          </div>
          <Link href="/shop" className="btn-outline px-6 py-3 text-[10px]">
            Continue Shopping
          </Link>
        </div>
      </div>

      {cart.length === 0 ? (
        <section className="grid min-h-[50vh] place-items-center border-b border-border py-20 text-center">
          <div className="max-w-md space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background-secondary">
              <ShoppingBag className="h-7 w-7 text-accent" />
            </div>
            <div>
              <h2 className="heading-serif text-3xl uppercase">Your bag is empty</h2>
              <p className="mt-3 text-sm leading-7 text-foreground-secondary">
                Add sculpted essentials from the collection to begin your Vellora edit.
              </p>
            </div>
            <Link href="/shop" className="btn-primary px-7 py-3 text-[10px]">
              Explore Collection
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <section className="space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 border border-border bg-background p-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:p-5"
              >
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative aspect-[3/4] overflow-hidden bg-zinc-100"
                >
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-900 text-[10px] uppercase tracking-widest text-zinc-500">
                      {item.product.category}
                    </div>
                  )}
                </Link>

                <div className="flex min-w-0 flex-col justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="label-text text-foreground-muted">{item.product.collection}</p>
                      <Link href={`/product/${item.product.id}`} className="mt-1 block">
                        <h2 className="text-lg font-medium leading-tight transition-colors hover:text-accent">
                          {item.product.name}
                        </h2>
                      </Link>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
                        {item.selectedSize} / {String(item.selectedColor)}
                      </p>
                    </div>
                    <button
                      onClick={() => item.id && removeFromCart(item.id)}
                      className="h-9 w-9 border border-border text-foreground-muted transition-colors hover:border-error hover:text-error"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="mx-auto h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => item.id && updateQuantity(item.id, item.quantity - 1)}
                        className="grid h-10 w-10 place-items-center transition-colors hover:bg-border-light"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                        className="grid h-10 w-10 place-items-center transition-colors hover:bg-border-light"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-mono text-lg font-semibold">${item.product.price * item.quantity}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="sticky top-32 space-y-5 border border-border bg-background-secondary p-5 sm:p-6">
            <div>
              <p className="label-text text-accent">Order Summary</p>
              <h2 className="heading-serif mt-2 text-3xl uppercase">Atelier Total</h2>
            </div>

            {!coupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                  <input
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    placeholder="VEL15"
                    className="w-full border border-border bg-background py-3 pl-10 pr-3 text-xs uppercase tracking-widest outline-none focus:border-accent"
                  />
                </div>
                <button type="submit" className="btn-outline px-4 py-3 text-[10px]">
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between border border-accent/30 bg-accent-light px-3 py-3 text-xs text-accent">
                <span className="font-mono uppercase">{coupon.code} applied</span>
                <button onClick={removeCoupon} className="text-[10px] uppercase tracking-widest text-foreground">
                  Remove
                </button>
              </div>
            )}
            <div className="space-y-3 border-t border-border pt-5 font-mono text-xs">
              <div className="flex justify-between text-foreground-secondary">
                <span>Bag Total</span>
                <span>${cartTotal}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-accent">
                  <span>Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground-secondary">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <button className="btn-primary w-full gap-2 py-4 text-[10px]">
              Secure Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="grid gap-3 border-t border-border pt-5 text-[11px] leading-5 text-foreground-secondary">
              <p className="flex gap-2">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Worldwide express shipping is included on every order.
              </p>
              <p className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Encrypted payment and authenticity-backed product records.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
