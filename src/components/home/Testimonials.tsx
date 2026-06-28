'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
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
  );
}
