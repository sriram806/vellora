import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getMetadata } from '@/lib/seo';

export const metadata = getMetadata({
  title: 'Editorial Campaigns & Collections | Vellora',
  description: 'Explore the creative collections of Vellora: Aether, Luminal, Sartorial Nomad, and Zenith.',
  path: '/collections',
});

const collections = [
  {
    id: 'aether',
    name: 'Aether Collection',
    tagline: 'Sartorial Minimalism & Organic Cashmere',
    description: 'A study in quiet luxury. Crafted with superfine Mongolian cashmere, mulberry silk blend knit tees, and Italian double-breasted overcoats with hand-rolled edges. Designed for absolute timelessness.',
    shopUrl: '/shop?collection=Aether',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'luminal',
    name: 'Luminal Collection',
    tagline: 'Technical Satins & Fluid Morphologies',
    description: 'An avant-garde exploration. High-density water-repellent nylon memory trousers, windproof down bombers, and glass-bead embedded reflective windbreakers reflecting silver under spotlights.',
    shopUrl: '/shop?collection=Luminal',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'sartorial',
    name: 'Sartorial Nomad',
    tagline: 'Italian Tailored Creases & Leisure Knits',
    description: 'Merging precision tailoring with contemporary comfort. Hand-crafted wool-cashmere pleated trousers, Sandwashed camp collar shirts, and double-breasted suit jackets woven in Biella.',
    shopUrl: '/shop?collection=Sartorial+Nomad',
    imageUrl: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'zenith',
    name: 'Zenith Collection',
    tagline: 'Okayama Raw Denim & French Cotton Loops',
    description: 'Rigid architectural structure. Crafted using 15oz selvedge raw Okayama denim and ultra-heavyweight 450 GSM dry-touch Portuguese loopback hoodies. Built to wear in, uniquely.',
    shopUrl: '/shop?collection=Zenith',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function CollectionsPage() {
  return (
    <div className="container-vellora py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="label-text text-accent">Vellora Editorial</span>
        <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase tracking-wider">
          Campaign Stories
        </h1>
        <p className="body-text text-sm text-foreground-secondary leading-relaxed">
          Each season is a story of material experimentation. Explore our active campaigns and discover tailored garments from our digital showroom.
        </p>
      </div>

      {/* Campaigns Listing */}
      <div className="space-y-24">
        {collections.map((col, idx) => (
          <div
            key={col.id}
            id={col.id}
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Block */}
            <div className="w-full lg:w-1/2 aspect-hero bg-zinc-100 border border-border overflow-hidden relative group">
              <img
                src={col.imageUrl}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Campaign Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="label-text text-accent">{col.tagline}</span>
              <h2 className="heading-serif text-2xl sm:text-4xl font-bold uppercase">
                {col.name}
              </h2>
              <p className="body-text text-sm text-foreground-secondary leading-relaxed">
                {col.description}
              </p>
              <div className="pt-4">
                <Link
                  href={col.shopUrl}
                  className="btn-primary inline-flex items-center gap-2 group text-xs font-mono"
                >
                  <span>Shop Campaign Pieces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
