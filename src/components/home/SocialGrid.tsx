'use client';

import React from 'react';

const socialImages = [
  'https://images.unsplash.com/photo-1527010154944-f2241763d806?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBnaXJsfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1542996966-2e31c00bae31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFwYW5lc2UlMjBnaXJsfGVufDB8fDB8fHww',
];

export default function SocialGrid() {
  return (
    <section className="pt-16 pb-0 md:pt-24 md:pb-0 bg-white border-t border-[#e5e5e5]">
      <div className="container-JCOPS text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-[#121212] uppercase">
          #JCOPSStories
        </h2>
        <p className="mt-2 text-sm text-[#8a8a8a] uppercase tracking-wide">
          Join the community on Instagram
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {socialImages.map((src, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={src}
              alt={`Social post ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
