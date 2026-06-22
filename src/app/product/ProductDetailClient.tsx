'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Product } from '@/types';
import { Heart, ShoppingBag, Plus, Minus, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useWishlist } from '@/hooks/WishlistContext';
import ProductCard from '@/components/Product/ProductCard';
import { useToast } from '@/components/UI/ToastProvider';

const Interactive360Viewer = dynamic(
  () => import('@/components/three/Interactive360Viewer'),
  { ssr: false, loading: () => <div className="w-full h-full bg-vellora-deep-black flex items-center justify-center font-mono text-[10px] uppercase text-zinc-500">Loading 360 Viewer...</div> }
);

interface ClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ClientProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Midnight Black');
  const [quantity, setQuantity] = useState(1);
  const [viewerMode, setViewerMode] = useState<'gallery' | '360'>('gallery');

  const isSaved = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      type: 'success',
      title: 'Added to bag',
      description: `${product.name} (${selectedSize} / ${selectedColor}) is ready for checkout.`,
    });
  };

  return (
    <div className="container-vellora py-12 space-y-16">
      
      {/* SPLIT LAYOUT PRODUCT ACTIONS */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* LEFT COLUMN: GALLERY & 360 INTERACTIVE COMPONENT */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="flex gap-2 border-b border-border pb-3">
            <button
              onClick={() => setViewerMode('gallery')}
              className={`ui-text text-[10px] pb-1 border-b transition-colors ${
                viewerMode === 'gallery' ? 'border-accent text-accent font-bold' : 'border-transparent text-foreground-muted'
              }`}
            >
              Editorial Imagery
            </button>
            <button
              onClick={() => setViewerMode('360')}
              className={`ui-text text-[10px] pb-1 border-b transition-colors ${
                viewerMode === '360' ? 'border-accent text-accent font-bold' : 'border-transparent text-foreground-muted'
              }`}
            >
              360 Digital Model
            </button>
          </div>

          <div className="aspect-product w-full bg-border-light relative overflow-hidden flex items-center justify-center">
            {viewerMode === 'gallery' ? (
              <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-3 p-1">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
                {product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} alternate`}
                    className="w-full h-full object-cover hidden sm:block"
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-full absolute inset-0">
                <Interactive360Viewer category={product.category} />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY PURCHASE CONTROLS */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-24 space-y-6">
          <div className="space-y-2">
            <span className="label-text text-accent">{product.collection}</span>
            <h1 className="heading-serif text-2xl sm:text-3xl font-bold uppercase leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i <= Math.round(product.rating) ? 'fill-accent' : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-foreground-muted font-mono">
                {product.rating} / 5.0 ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <p className="font-mono text-xl font-bold text-accent">${product.price}</p>

          <p className="body-text text-sm text-foreground-secondary leading-relaxed">
            {product.description}
          </p>

          <hr className="border-border" />

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px]">Select Color</label>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 border rounded-full text-[10px] font-medium uppercase tracking-wider transition-colors ${
                    selectedColor === c ? 'border-accent bg-accent-light text-accent' : 'border-border text-foreground-secondary hover:border-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="ui-text text-foreground-muted text-[10px]">Select Size</label>
              <a href="#sizing" className="text-[10px] text-accent uppercase tracking-wider underline">Sizing Guide</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 border flex items-center justify-center text-xs font-mono transition-colors ${
                    selectedSize === s ? 'border-accent bg-accent-light text-accent font-bold' : 'border-border text-foreground-secondary hover:border-accent'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <label className="ui-text text-foreground-muted text-[10px]">Quantity</label>
            <div className="flex items-center border border-border w-fit bg-background">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-border-light text-foreground-secondary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 text-sm font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-border-light text-foreground-secondary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="flex-1 btn-primary py-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="btn-outline p-4 hover:border-accent hover:text-accent transition-colors cursor-pointer"
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-accent text-accent' : 'text-foreground-muted'}`} />
            </button>
          </div>

          {/* Product Info Accordions */}
          <div className="space-y-2.5 pt-4">
            <details className="group border-b border-border pb-3 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="ui-text text-xs text-foreground font-semibold">Sartorial Details</span>
                <span className="transition group-open:rotate-180 text-foreground-muted">&darr;</span>
              </summary>
              <div className="mt-3 text-xs text-foreground-secondary leading-relaxed space-y-1.5">
                {product.details.map((detail, idx) => (
                  <p key={idx}>&bull; {detail}</p>
                ))}
              </div>
            </details>

            <details className="group border-b border-border pb-3 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="ui-text text-xs text-foreground font-semibold">Precision Shipping & Returns</span>
                <span className="transition group-open:rotate-180 text-foreground-muted">&darr;</span>
              </summary>
              <div className="mt-3 text-xs text-foreground-secondary leading-relaxed space-y-3">
                <div className="flex items-center gap-2 text-[11px]">
                  <Truck className="w-4 h-4 text-accent" />
                  <span>Complimentary carbon-neutral express shipping globally.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <RefreshCw className="w-4 h-4 text-accent" />
                  <span>Complimentary exchanges and returns within 30 days.</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Each item carries an encrypted NFC-tag authenticity token.</span>
                </div>
              </div>
            </details>
          </div>

        </div>
      </div>

      {/* REVIEWS SECTION */}
      <section className="border-t border-border pt-16 space-y-8">
        <h2 className="ui-text text-sm">Customer Feedback ({product.reviews.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.reviews.length === 0 ? (
            <p className="body-text text-sm text-foreground-muted italic">
              No testimonials have been registered for this garment.
            </p>
          ) : (
            product.reviews.map((rev, idx) => (
              <div key={idx} className="border border-border p-6 bg-background-tertiary space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{rev.name}</h4>
                    <span className="text-[9px] text-foreground-muted font-mono">{rev.date}</span>
                  </div>
                  <div className="flex text-accent">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i <= Math.round(rev.rating) ? 'fill-accent' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="body-text text-xs text-foreground-secondary leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-16 space-y-8">
          <h2 className="ui-text text-sm">Related Garments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
