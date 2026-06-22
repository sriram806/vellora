'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, CreditCard, Landmark, Truck, Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';

export default function CheckoutPage() {
  const { cart, cartTotal, discountAmount, subtotal, coupon, clearCart } = useCart();
  const { toast } = useToast();

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  // App UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [confirmedItems, setConfirmedItems] = useState<any[]>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  // Load saved profile data on mount
  const [profileLoaded, setProfileLoaded] = useState(false);
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('vellora_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.email) setEmail(p.email);
        if (p.firstName) setFirstName(p.firstName);
        if (p.lastName) setLastName(p.lastName);
        if (p.address) setAddress(p.address);
        if (p.city) setCity(p.city);
        if (p.state) setState(p.state);
        if (p.zip) setZip(p.zip);
        if (p.phone) setPhone(p.phone);
        setProfileLoaded(true);
      }
    } catch (err) {
      console.error('Failed to parse saved profile details', err);
    }
  }, []);

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast({
        type: 'error',
        title: 'Empty Bag',
        description: 'You cannot checkout with an empty bag.',
      });
      return;
    }

    if (!email || !firstName || !lastName || !address || !city || !state || !zip || !phone || !cardNumber || !expiry || !cvv) {
      toast({
        type: 'error',
        title: 'Missing Fields',
        description: 'Please fill in all contact, shipping, and payment information.',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `VEL-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Save order to localStorage for Admin Panel
      try {
        const storedOrders = localStorage.getItem('vellora_orders');
        const ordersList = storedOrders ? JSON.parse(storedOrders) : [];
        const newOrder = {
          orderId: generatedOrderId,
          email,
          shippingAddress: {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            phone
          },
          items: cart.map(item => ({
            id: item.id,
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            image: item.product.images?.[0] || ''
          })),
          total: subtotal,
          status: 'Pending',
          date: new Date().toISOString()
        };
        ordersList.unshift(newOrder);
        localStorage.setItem('vellora_orders', JSON.stringify(ordersList));
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      setOrderId(generatedOrderId);
      setConfirmedItems([...cart]);
      setConfirmedTotal(subtotal);
      setOrderConfirmed(true);
      clearCart(); // Clear cart context

      toast({
        type: 'success',
        title: 'Order Placed',
        description: 'Thank you. Your order has been successfully registered.',
      });
    }, 2500);
  };

  const handleFillMockData = () => {
    setEmail('atelier.client@vellora.com');
    setFirstName('Julian');
    setLastName('Sartre');
    setAddress('84 Rue de l\'Université');
    setCity('Paris');
    setState('IDF');
    setZip('75007');
    setPhone('+33 1 44 27 00 00');
    setCardNumber('4111 2222 3333 4444');
    setExpiry('12/28');
    setCvv('789');

    toast({
      type: 'success',
      title: 'Mock Data Loaded',
      description: 'The checkout form has been populated with mock details for quick evaluation.',
    });
  };

  if (orderConfirmed) {
    /* Order Confirmed Post-Purchase Receipt View */
    return (
      <main className="container-vellora py-10 sm:py-16 lg:py-20 flex items-center justify-center min-h-[85vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full border border-border bg-background p-6 sm:p-12 rounded-sm shadow-xl text-center space-y-8"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-accent">
            <CheckCircle2 className="h-10 w-10 stroke-[1.5]" />
          </div>

          <div className="space-y-3">
            <span className="label-text text-[10px] text-accent font-semibold tracking-[0.2em]">Transaction Confirmed</span>
            <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wide">
              Creations Reserved
            </h1>
            <p className="text-sm text-foreground-secondary font-light max-w-md mx-auto leading-relaxed">
              An atelier advisor is preparing your order. A receipt and digital authentication documents have been dispatched to <strong className="font-medium text-foreground">{email}</strong>.
            </p>
          </div>

          <div className="border border-border p-5 bg-background-secondary/50 rounded-sm space-y-4 text-left">
            <div className="flex justify-between items-center text-xs text-foreground-secondary border-b border-border pb-3">
              <span>Order Reference:</span>
              <span className="font-mono font-bold text-foreground">{orderId}</span>
            </div>
            
            {/* Receipts items list */}
            <div className="space-y-3">
              {confirmedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-foreground-secondary truncate max-w-xs sm:max-w-sm">
                    {item.product.name} <span className="font-mono text-[10px] text-foreground-muted">x{item.quantity}</span>
                  </span>
                  <span className="font-mono">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs font-semibold pt-3 border-t border-border text-foreground">
              <span>Total Paid:</span>
              <span className="font-mono text-accent font-bold">${confirmedTotal}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary px-8 py-3.5 text-[10px]">
              Explore New Collections
            </Link>
            <Link href="/" className="btn-outline px-8 py-3.5 text-[10px]">
              Return Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container-vellora py-10 sm:py-16 lg:py-20 min-h-[85vh]">
      {/* Checkout Header */}
      <div className="border-b border-border pb-6 mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-2 font-mono uppercase tracking-wider">
            <Link href="/cart" className="hover:text-accent">Bag</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-semibold">Checkout</span>
          </div>
          <h1 className="heading-serif text-3xl sm:text-4xl uppercase leading-none tracking-wide">
            Secure Checkout
          </h1>
        </div>
        <button
          onClick={handleFillMockData}
          className="text-[9px] uppercase tracking-widest text-accent hover:underline font-semibold font-mono self-start sm:self-auto border border-accent/25 hover:border-accent bg-accent-light px-3 py-1.5 rounded-sm cursor-pointer"
        >
          Autofill Test Details
        </button>
      </div>

      {cart.length === 0 ? (
        /* Guard Empty Cart checkout */
        <section className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-border rounded-lg bg-background-secondary/30">
          <ShoppingBag className="w-12 h-12 text-foreground-muted stroke-[1.25] mb-4" />
          <h2 className="heading-serif text-2xl uppercase">No pieces selected</h2>
          <p className="mt-2 text-sm text-foreground-secondary max-w-sm mx-auto">
            You do not have any items in your bag. Add some creations to start checkout.
          </p>
          <div className="mt-6">
            <Link href="/shop" className="btn-primary px-8 py-3.5 text-[10px]">
              Shop Collections
            </Link>
          </div>
        </section>
      ) : (
        /* Active Checkout Form Grid */
        <form onSubmit={handleSubmitCheckout} className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-start">
          {/* Billing and Shipping forms */}
          <div className="space-y-8">
            {/* Profile Pre-filled Banner */}
            {profileLoaded && (
              <div className="p-4 border border-accent/25 bg-accent-light/5 text-accent text-xs font-mono uppercase tracking-wider flex items-center gap-2 rounded-sm">
                <Sparkles className="w-4 h-4 text-accent shrink-0 animate-pulse" />
                <span>Pre-filled from your Atelier Profile</span>
              </div>
            )}

            {/* Step 1: Account Info */}
            <div className="border border-border p-6 bg-background rounded-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <span className="h-6 w-6 rounded-full bg-accent-light text-accent text-xs font-mono font-bold flex items-center justify-center">1</span>
                <h3 className="ui-text text-xs font-semibold">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <label className="text-[10px] font-mono text-foreground-muted uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. julian@sartre.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                />
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="border border-border p-6 bg-background rounded-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <span className="h-6 w-6 rounded-full bg-accent-light text-accent text-xs font-mono font-bold flex items-center justify-center">2</span>
                <h3 className="ui-text text-xs font-semibold">Delivery Address</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Julian"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sartre"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                <label className="text-[10px] font-mono text-foreground-muted uppercase">Address Details *</label>
                <input
                  type="text"
                  required
                  placeholder="Street name, suite, floor, number..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Paris"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">State / Province *</label>
                  <input
                    type="text"
                    required
                    placeholder="IDF"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">Postal Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="75007"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                <label className="text-[10px] font-mono text-foreground-muted uppercase">Phone Contact *</label>
                <input
                  type="tel"
                  required
                  placeholder="+33 1 44 27 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full font-mono"
                />
              </div>
            </div>

            {/* Step 3: Shipping Mode */}
            <div className="border border-border p-6 bg-background rounded-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <span className="h-6 w-6 rounded-full bg-accent-light text-accent text-xs font-mono font-bold flex items-center justify-center">3</span>
                <h3 className="ui-text text-xs font-semibold">Delivery Preference</h3>
              </div>
              <div className="border border-accent p-4 bg-accent-light/5 flex items-start gap-4 rounded-sm">
                <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">Worldwide Express Courier</span>
                    <span className="font-mono text-xs text-success uppercase font-semibold">Complimentary</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed mt-1">
                    Insured carbon-neutral shipping by DHL Express. Delivered in 2-4 business days. Signature required.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Details */}
            <div className="border border-border p-6 bg-background rounded-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <span className="h-6 w-6 rounded-full bg-accent-light text-accent text-xs font-mono font-bold flex items-center justify-center">4</span>
                <h3 className="ui-text text-xs font-semibold">Payment Details</h3>
              </div>

              {/* Secure Checkout Subtitle */}
              <div className="flex items-center gap-1.5 text-success text-[10px] font-semibold font-mono bg-success/5 p-3 rounded-sm border border-success/10 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Encrypted Transaction Gateway Enabled</span>
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                <label className="text-[10px] font-mono text-foreground-muted uppercase">Cardholder Name *</label>
                <input
                  type="text"
                  required
                  placeholder=" Julian Sartre"
                  className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full"
                />
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                <label className="text-[10px] font-mono text-foreground-muted uppercase">Credit Card Number *</label>
                <div className="relative flex items-center border border-border bg-background px-3 focus-within:border-accent">
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full py-2.5 text-xs outline-none bg-transparent font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-foreground-muted" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">Expiration Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-foreground-muted uppercase">CVV Code *</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-accent w-full font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Summary Sidebar */}
          <aside className="sticky top-32 space-y-6 border border-border bg-background-secondary/70 p-6 sm:p-8 rounded-sm glass">
            <div>
              <p className="label-text text-accent font-semibold font-mono">Summary</p>
              <h2 className="heading-serif mt-1 text-2xl uppercase tracking-wider">Your Selection</h2>
            </div>

            {/* List items compact */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border-light last:border-b-0">
                  <div className="w-12 h-14 relative shrink-0 border border-border bg-background">
                    {item.product.images?.[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-850" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold truncate text-foreground">{item.product.name}</h4>
                      <p className="text-[9px] uppercase tracking-wider text-foreground-muted mt-0.5">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-foreground-muted font-mono">Qty: {item.quantity}</span>
                      <span className="font-mono font-medium text-accent">${item.product.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing details table */}
            <div className="space-y-2 border-t border-border pt-4 font-mono text-xs">
              <div className="flex justify-between text-foreground-secondary">
                <span>Total Items</span>
                <span>${cartTotal}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-accent">
                  <span>Promo ({coupon.code})</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground-secondary">
                <span>Shipping</span>
                <span className="text-[10px] text-success uppercase">Free</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-sm font-semibold text-foreground">
                <span>Final Total</span>
                <span className="text-accent">${subtotal}</span>
              </div>
            </div>

            {/* Submit checkout CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full gap-2 py-4 text-[10px] text-center flex items-center justify-center cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Processing Order...</span>
              ) : (
                <>
                  <span>Place Luxury Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-foreground-muted text-[10px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Double-encrypted card authentication</span>
            </div>
          </aside>
        </form>
      )}
    </main>
  );
}
