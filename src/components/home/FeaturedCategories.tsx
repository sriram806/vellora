'use client';

import React from 'react';

export default function FeaturedCategories() {
  return (
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
              className="group relative overflow-hidden rounded-3xl aspect-[4/5]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
  );
}
