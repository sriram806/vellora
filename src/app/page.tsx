'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Flame } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import ProductCard from '@/components/Product/ProductCard';
import ShowroomCanvas from '@/components/three/ShowroomCanvas';

const products = productsData as Product[];

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const heroTee = products.find((product) => product.category === 't-shirts') ?? featuredProducts[0];
  const heroPants = products.find((product) => product.category === 'pants') ?? featuredProducts[1] ?? featuredProducts[0];

  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 48, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-background">
      <section className="relative h-[85vh] min-h-[700px] overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2400&auto=format&fit=crop"
          alt="Vellora Luxury Collection"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

        {/* Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_45%)]" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[18vw] font-black tracking-[0.35em] text-white/[0.03] whitespace-nowrap">
            VELLORA
          </h1>
        </div>

        {/* Content */}
        <div className="relative z-20 container-vellora h-full flex items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur-xl">
              New Collection 2026
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl xl:text-8xl font-light leading-[0.9] text-white">
              THE ART OF
              <br />
              MODERN
              <br />
              ELEGANCE
            </h1>

            <p className="mt-8 max-w-xl text-zinc-300 text-base md:text-lg leading-relaxed">
              Discover refined silhouettes, premium fabrics,
              and timeless craftsmanship designed for the
              next generation of luxury.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="
            px-8 py-4
            rounded-full
            bg-white
            text-black
            text-xs
            uppercase
            tracking-[0.25em]
            font-medium
            transition-all
            hover:scale-105
          "
              >
                Shop Collection
              </Link>

              <Link
                href="/about"
                className="
            px-8 py-4
            rounded-full
            border
            border-white/20
            bg-white/5
            backdrop-blur-xl
            text-white
            text-xs
            uppercase
            tracking-[0.25em]
            hover:bg-white/10
            transition-all
          "
              >
                Discover Vellora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-24 sm:py-28 lg:py-32 bg-background border-t border-border relative z-20">
        <div className="container-vellora space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            <div className="space-y-4">
              <span className="label-text text-accent">Curated Selections</span>
              <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider">
                Featured Pieces
              </h2>
            </div>
            <Link href="/shop" className="btn-outline text-xs inline-flex items-center gap-2 group">
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 xl:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSIVE SHOWROOM EXPERIENCE */}
      <section className="relative h-[60vh] min-h-[500px] bg-black border-t border-border">
        <ShowroomCanvas />
         {/* Watermark */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[18vw] font-black tracking-[0.35em] text-white/[0.03] whitespace-nowrap">
             VELLORA
          </h1>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <section className="py-10 sm:py-14 lg:py-16 bg-vellora-deep-black text-vellora-white border-y border-zinc-800 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 px-6 sm:px-8">
              <span className="font-playfair text-2xl sm:text-4xl font-black uppercase tracking-widest text-zinc-700">
                Vellora Digital Showroom
              </span>
              <span className="w-3 h-3 bg-accent rounded-full" />
              <span className="font-playfair text-2xl sm:text-4xl font-light italic text-accent tracking-widest">
                Italian Craftsmanship
              </span>
              <span className="w-3 h-3 bg-zinc-700 rounded-full" />
              <span className="font-playfair text-2xl sm:text-4xl font-black uppercase tracking-widest text-vellora-white">
                Mulberry Silk
              </span>
              <span className="w-3 h-3 bg-accent rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* DIGITAL ATELIER DROPS (Streetwear / Brohud Style) */}
      <section className="py-24 sm:py-28 lg:py-32 bg-background border-b border-border relative z-20">
        <div className="container-vellora space-y-12">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 pb-8 border-b border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Flame className="w-4 h-4 fill-accent animate-pulse" />
                <span className="label-text uppercase tracking-widest text-xs font-bold font-mono">Limited Release Capsule</span>
              </div>
              <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider">
                Digital Drops & Archives
              </h2>
              <p className="body-text text-sm text-foreground-secondary max-w-lg">
                Exclusive architectural runs. Hand-numbered collections featuring no restocks and no repeats.
              </p>
            </div>

            {/* Live Countdown Clock */}
            <div className="flex items-center gap-3 border border-accent/20 bg-accent-light px-5 py-3 shadow-sm rounded-sm">
              <Clock className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '6s' }} />
              <div className="font-mono text-xs uppercase tracking-wider text-foreground-secondary flex gap-2">
                <span>Next drop in:</span>
                <span className="font-bold text-accent">
                  {timeLeft.hours.toString().padStart(2, '0')}:
                  {timeLeft.minutes.toString().padStart(2, '0')}:
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Drops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">

            {/* Drop Item 1 */}
            <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
              <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop"
                  alt="Signature Tee"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                  Drop 06 // Active
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                  183 Units Released
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Aether Collection</span>
                    <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Signature Silk-Cotton Tee</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-foreground-muted line-through font-mono block">$240</span>
                    <span className="text-xs font-mono font-bold text-accent">$180</span>
                  </div>
                </div>

                {/* Stock Meter */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 94% Claimed</span>
                    <span className="font-bold text-accent">Only 4 items remaining</span>
                  </div>
                  <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-[94%]" />
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/product/vellora-signature-tee" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                    Purchase Archive Piece
                  </Link>
                </div>
              </div>
            </div>

            {/* Drop Item 2 */}
            <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
              <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                  alt="Cropped Bomber"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                  Drop 06 // Active
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                  50 Units Released
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Luminal Collection</span>
                    <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Luminal Cropped Shell Bomber</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-accent">$890</span>
                  </div>
                </div>

                {/* Stock Meter */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 88% Claimed</span>
                    <span className="font-bold text-accent">Only 2 items remaining</span>
                  </div>
                  <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-[88%]" />
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/product/luminal-cropped-bomber" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                    Purchase Archive Piece
                  </Link>
                </div>
              </div>
            </div>

            {/* Drop Item 3 */}
            <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
              <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop"
                  alt="Calfskin Sneaker"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                  Drop 06 // Active
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                  120 Units Released
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Aether Collection</span>
                    <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Aether Calfskin Court Sneaker</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-foreground-muted line-through font-mono block">$620</span>
                    <span className="text-xs font-mono font-bold text-accent">$490</span>
                  </div>
                </div>

                {/* Stock Meter */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 97% Claimed</span>
                    <span className="font-bold text-accent">Only 1 item remaining</span>
                  </div>
                  <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-[97%]" />
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/product/vellora-court-sneaker" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                    Purchase Archive Piece
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      {/* FEATURED CATEGORIES */}
      <section className="py-24 bg-background">
        <div className="container-vellora">
          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: 'Men',
                image:
                  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
              },
              {
                title: 'Women',
                image:
                  'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
              },
              {
                title: 'Accessories',
                image:
                  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
            group
            relative
            overflow-hidden
            rounded-3xl
            aspect-[4/5]
          "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
              absolute inset-0
              h-full w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white text-3xl font-light">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-20 bg-background-secondary brand-story-section overflow-hidden relative z-20">
        <div className="container-vellora grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Image Block */}
          <div className="relative aspect-editorial bg-zinc-100 border border-border overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop"
              alt="Sartorial Craftsmanship"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Text */}
          <div className="space-y-8 max-w-xl">
            <span className="label-text text-accent">Our Philosophy</span>
            <h2 className="heading-serif text-3xl sm:text-5xl font-bold uppercase leading-tight">
              Where Generation Tailoring Meets Tech
            </h2>
            <p className="body-text text-sm text-foreground-secondary leading-relaxed">
              Vellora was built on a singular vision: to dismantle the boundaries between physical tactile luxury garments and immersive digital design. Every single item we create is double-simulated programmatically before a needle touches raw fabric.
            </p>
            <p className="body-text text-sm text-foreground-secondary leading-relaxed">
              We source our wool from eco-responsible herds in Biella, and our mulberry silk from historic family spinning houses in Como. This attention to tactile perfection combined with next-generation digital showroom platforms is Vellora.
            </p>
            <div className="pt-4">
              <Link href="/about" className="btn-primary inline-flex items-center gap-2 group text-xs">
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-background border-t border-border relative z-20">
        <div className="container-vellora space-y-10">
          <div className="text-center space-y-3">
            <span className="label-text text-accent">Client Reviews</span>
            <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase">
              Showroom Experiences
            </h2>
          </div>

          {/* Testimonial Panel */}
          <div className="max-w-3xl mx-auto border border-border p-6 sm:p-12 text-center space-y-6 bg-background-tertiary relative glass">
            <div className="flex justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-accent" />
              ))}
            </div>

            <p className="heading-serif text-lg sm:text-xl italic text-foreground-secondary leading-relaxed">
              &ldquo;The luxury digital showroom allows me to understand fabric weight and construction with incredible accuracy. When the pleated cashmere trousers arrived, the drape was exactly as visualized. This is the future of luxury shopping.&rdquo;
            </p>

            <div>
              <h4 className="ui-text text-xs font-semibold text-foreground">
                Charlotte de Beaufort
              </h4>
              <p className="text-[10px] text-foreground-muted mt-1 uppercase tracking-wider font-mono">
                Paris, France / Verified Client
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
