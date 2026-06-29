'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useWishlist } from '@/hooks/WishlistContext';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';
import productsData from '@/data/products.json';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddDefaultToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const size = product.sizes?.[0] || 'M';
    const color = product.colors?.[0] || 'Midnight Black';
    addToCart(product, 1, size, color);

    toast({
      type: 'success',
      title: 'Added to Bag',
      description: `${product.name} (${size}) has been added to your shopping bag.`,
    });
  };

  const handleAddSizeToCart = (product: any, size: string, e: React.MouseEvent) => {
    e.preventDefault();
    const color = product.colors?.[0] || 'Midnight Black';
    addToCart(product, 1, size, color);

    toast({
      type: 'success',
      title: 'Added to Bag',
      description: `${product.name} (${size}) has been added to your shopping bag.`,
    });
  };

  // Curated recommendations for empty state (featured or trending products)
  const recommendations = React.useMemo(() => {
    return productsData
      .filter((p) => p.featured || p.trending)
      .slice(0, 4);
  }, []);

  return (
    <main className="container-JCOPS py-10 sm:py-16 lg:py-20 min-h-[80vh]">
      {/* Page Header */}
      <div className="border-b border-border pb-8 mb-12">
        <span className="label-text text-accent font-semibold">Atelier Saved Creations</span>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="heading-serif text-4xl uppercase leading-none sm:text-5xl lg:text-6xl tracking-wide">
              My Wishlist
            </h1>
            <p className="mt-3 text-sm text-foreground-secondary font-light max-w-xl">
              A private edit of your desired expressions. Items in your wishlist are saved for when you are ready to make them yours.
            </p>
          </div>
          <Link href="/shop" className="btn-outline px-6 py-3 text-[10px] self-start sm:self-auto">
            Explore Collection
          </Link>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {wishlist.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-wishlist"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            <section className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-border bg-background-secondary/35 rounded-lg">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background-secondary border border-border text-foreground-muted mb-6">
                <Heart className="h-8 w-8 stroke-[1.25]" />
              </div>
              <h2 className="heading-serif text-2xl sm:text-3xl uppercase tracking-wider">Your wishlist is empty</h2>
              <p className="mt-3 text-sm text-foreground-secondary max-w-sm mx-auto leading-relaxed">
                Refine your style. Browse the boutique and save articles you admire to build your personal wishlist.
              </p>
              <div className="mt-8">
                <Link href="/shop" className="btn-primary px-8 py-4 text-[10px]">
                  Shop New Arrivals
                </Link>
              </div>
            </section>

            {/* Recommendations Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="ui-text text-xs font-semibold">Recommended for Your Edit</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((product) => (
                  <motion.div
                    key={product.id}
                    className="group relative flex flex-col"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
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
                      {/* Quick Add Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/90 backdrop-blur-md border-t border-border flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-foreground-secondary">Quick Add</span>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes?.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => handleAddSizeToCart(product, size, e)}
                              className="px-2.5 py-1 text-[9px] font-mono border border-border hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer bg-background"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
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
                        <button
                          onClick={(e) => handleAddDefaultToCart(product, e)}
                          className="text-[10px] uppercase tracking-widest text-foreground hover:text-accent font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">Add</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <motion.div
            key="wishlist-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            {wishlist.map((product) => (
              <motion.article
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-product overflow-hidden border border-border bg-background-secondary rounded-sm">
                  <Link href={`/product/${product.id}`} className="block h-full w-full">
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

                  {/* Top Actions Overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="h-8 w-8 rounded-full bg-background/95 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-error hover:border-error/30 shadow-md transition-all cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Stock Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[8px] tracking-widest font-mono uppercase bg-background/95 backdrop-blur-sm border border-border font-semibold rounded-sm text-foreground">
                      {product.inStock !== false ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Quick Add Sizes Panel */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/90 backdrop-blur-md border-t border-border flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-wider font-mono text-foreground-secondary font-medium">Quick Add Size</span>
                      <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes?.map((size: string) => (
                        <button
                          key={size}
                          onClick={(e) => handleAddSizeToCart(product, size, e)}
                          className="px-2.5 py-1 text-[9px] font-mono border border-border hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer bg-background"
                        >
                          {size}
                        </button>
                      ))}
                      {(!product.sizes || product.sizes.length === 0) && (
                        <button
                          onClick={(e) => handleAddDefaultToCart(product, e)}
                          className="w-full text-center py-1.5 text-[9px] font-mono border border-border hover:border-accent hover:bg-accent hover:text-white transition-all cursor-pointer bg-background"
                        >
                          Add to Bag
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Container */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="label-text text-[9px] text-foreground-muted">{product.collection}</span>
                    <h3 className="font-medium text-sm mt-1 transition-colors hover:text-accent leading-tight">
                      <Link href={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-accent font-semibold">${product.price}</span>
                    <button
                      onClick={(e) => handleAddDefaultToCart(product, e)}
                      className="text-[10px] uppercase tracking-widest text-foreground hover:text-accent font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
