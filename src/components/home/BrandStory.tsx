'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
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
  );
}
