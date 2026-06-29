'use client';

import React from 'react';

export default function InfiniteMarquee() {
  return (
    <section className="py-8 bg-[#121212] overflow-hidden relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            <span className="font-sans text-xl md:text-2xl font-bold uppercase tracking-widest text-white">
              JCOPS Digital Showroom
            </span>
            <span className="w-2 h-2 bg-[#c9a96e] rotate-45" />
            <span className="font-sans text-xl md:text-2xl font-bold uppercase tracking-widest text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>
              Explore The Collection
            </span>
            <span className="w-2 h-2 bg-[#c9a96e] rotate-45" />
          </div>
        ))}
      </div>
    </section>
  );
}
