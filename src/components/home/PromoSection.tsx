'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoSection() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2400&auto=format&fit=crop"
        alt="Special Discount Promo"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h2 className="text-4xl sm:text-6xl font-bold tracking-wider text-white uppercase drop-shadow-lg">
          End of Season Sale
        </h2>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/90 font-medium drop-shadow-md">
          Get up to <span className="font-bold text-xl sm:text-2xl text-[#c9a96e]">50% OFF</span> on selected styles.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/collections/trending-now"
            className="w-full sm:w-auto bg-white text-[#121212] px-8 py-3 text-[13px] font-bold uppercase tracking-[1px] hover:bg-[#121212] hover:text-white transition-colors duration-300 border border-white"
          >
            Shop Men
          </Link>
          <Link
            href="/collections/trending-now"
            className="w-full sm:w-auto bg-transparent text-white px-8 py-3 text-[13px] font-bold uppercase tracking-[1px] hover:bg-white hover:text-[#121212] transition-colors duration-300 border border-white"
          >
            Shop Women
          </Link>
        </div>
      </div>
    </section>
  );
}
