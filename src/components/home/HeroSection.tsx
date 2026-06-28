'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
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
              className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.25em] font-medium transition-all hover:scale-105"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white text-xs uppercase tracking-[0.25em] hover:bg-white/10 transition-all"
            >
              Discover Vellora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
