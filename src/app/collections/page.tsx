import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getMetadata } from '@/lib/seo';

export const metadata = getMetadata({
  title: 'Editorial Campaigns & Collections | JCOPS',
  description: 'Explore the creative collections of JCOPS: Aether, Luminal, Sartorial Nomad, and Zenith.',
  path: '/collections',
});

const collections = [
  {
    id: 'aether',
    name: 'Aether Collection',
    tagline: 'Sartorial Minimalism & Organic Cashmere',
    description: 'A study in quiet luxury. Crafted with superfine Mongolian cashmere, mulberry silk blend knit tees, and Italian double-breasted overcoats with hand-rolled edges. Designed for absolute timelessness.',
    shopUrl: '/shop?collection=Aether',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'zenith',
    name: 'Zenith Collection',
    tagline: 'Okayama Raw Denim & French Cotton Loops',
    description: 'Rigid architectural structure. Crafted using 15oz selvedge raw Okayama denim and ultra-heavyweight 450 GSM dry-touch Portuguese loopback hoodies. Built to wear in, uniquely.',
    shopUrl: '/shop?collection=Zenith',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function CollectionsPage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f7f4] pt-32 pb-24">
      <div className="container-JCOPS space-y-24">

        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-[11px] font-bold text-[#8a8a8a] uppercase tracking-widest">
            JCOPS Editorial
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#121212] uppercase tracking-wider">
            Campaign Stories
          </h1>
          <p className="text-[#4a4a4a] text-sm sm:text-base leading-relaxed mt-4">
            Each season is a story of material experimentation. Explore our active campaigns and discover tailored garments from our digital showroom.
          </p>
        </div>

        {/* Campaigns Listing */}
        <div className="space-y-32">
          {collections.map((col, idx) => (
            <div
              key={col.id}
              id={col.id}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Image Block */}
              <div className="w-full lg:w-1/2 aspect-[4/5] md:aspect-[3/4] bg-[#f0f0f0] overflow-hidden relative group">
                <img
                  src={col.imageUrl}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 ease-out"
                />
              </div>

              {/* Campaign Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-[11px] font-bold text-[#8a8a8a] uppercase tracking-widest block">
                  {col.tagline}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#121212] uppercase tracking-wider">
                  {col.name}
                </h2>
                <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed max-w-md">
                  {col.description}
                </p>
                <div className="pt-6">
                  <Link
                    href={col.shopUrl}
                    className="inline-flex items-center gap-3 text-[12px] font-bold text-[#121212] uppercase tracking-[0.2em] group border-b border-[#121212] pb-1 hover:text-[#4a4a4a] hover:border-[#4a4a4a] transition-all"
                  >
                    <span>Shop Campaign</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
