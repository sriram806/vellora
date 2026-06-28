'use client';

import React from 'react';

export default function InfiniteMarquee() {
  return (
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
  );
}
