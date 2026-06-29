'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function JournalHighlight() {
  return (
    <section className="bg-[#f8f7f4] py-20 lg:py-32">
      <div className="container-JCOPS">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* Image */}

          <div className="relative overflow-hidden aspect-[4/5] group">

            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
              alt="JCob's Editorial Campaign"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[9000ms] ease-linear group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-8">

              <p className="uppercase tracking-[6px] text-white/70 text-xs">
                Editorial 2026
              </p>

              <h3 className="mt-3 text-white text-3xl font-light uppercase tracking-[4px]">
                Behind The Collection
              </h3>

            </div>

          </div>

          {/* Content */}

          <div>

            <p className="uppercase tracking-[8px] text-xs text-neutral-500">
              The Journal
            </p>

            <h2 className="mt-6 text-4xl md:text-6xl xl:text-7xl font-light uppercase tracking-[4px] leading-tight text-[#111]">
              Crafting
              <br />
              Timeless Luxury
            </h2>

            <div className="mt-8 h-px w-24 bg-[#C9A96E]" />

            <p className="mt-10 text-neutral-600 leading-9 max-w-xl text-lg">
              Every collection begins with an idea and evolves through
              meticulous craftsmanship. Discover the inspiration, premium
              materials, and refined tailoring that define every JCob's piece.
            </p>

            <p className="mt-8 text-neutral-500 leading-8 max-w-xl">
              Designed for modern individuals who appreciate understated
              elegance, our garments balance contemporary design with timeless
              sophistication.
            </p>

            <Link
              href="/journal"
              className="group mt-12 inline-flex items-center gap-4 border border-black px-8 py-4 uppercase tracking-[4px] text-xs font-medium transition-all duration-700 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-white"
            >
              Explore Journal

              <ArrowRight
                className="transition-transform duration-500 group-hover:translate-x-2"
                size={18}
              />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}