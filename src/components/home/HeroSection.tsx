"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

/* ========================================================================
   Slide Data
   ======================================================================== */

interface ImageSlide {
  id: number;
  type: "image";
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
}

interface BrandSlide {
  id: number;
  type: "brand";
}

type Slide = ImageSlide | BrandSlide;

const slides: Slide[] = [
  {
    id: 0,
    type: "brand",
  },
  {
    id: 1,
    type: "image",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop",
    title: "Summer Essentials",
    subtitle: "Lightweight fabrics and effortless silhouettes for the season.",
    buttonText: "Shop Collection",
    link: "/shop",
  },
  {
    id: 2,
    type: "image",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2400&auto=format&fit=crop",
    title: "The Linen Shop",
    subtitle: "Breathe easy in naturally luxurious linen pieces.",
    buttonText: "Shop Collection",
    link: "/shop",
  },
  {
    id: 3,
    type: "image",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2400&auto=format&fit=crop",
    title: "New Arrivals",
    subtitle: "The latest additions to our curated wardrobe.",
    buttonText: "Shop Collection",
    link: "/shop",
  },
  {
    id: 4,
    type: "image",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2400&auto=format&fit=crop",
    title: "Premium Collection",
    subtitle: "Handcrafted pieces defined by exceptional materials.",
    buttonText: "Shop Collection",
    link: "/shop",
  },
];

/* ========================================================================
   HeroSection Component
   ======================================================================== */

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  /** Dynamically set autoplay delay per slide type */
  const handleSlideChange = (swiper: SwiperType) => {
    const currentSlide = slides[swiper.realIndex];
    const delay = currentSlide.type === "brand" ? 5000 : 3000;

    if (swiper.autoplay && swiper.params.autoplay) {
      (swiper.params.autoplay as { delay: number }).delay = delay;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1800}
        loop
        allowTouchMove={false}
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {slide.type === "brand" ? (
              /* ============================================================
                 Brand Intro Slide
                 ============================================================ */
              <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">

                {/* Floating gold particles */}
                <div className="brand-particles absolute inset-0 pointer-events-none">
                  <span /><span /><span /><span />
                  <span /><span /><span /><span />
                </div>

                {/* Pulsing gold glow behind title */}
                <div className="animate-glow-pulse absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-[#c9a96e] blur-[120px] pointer-events-none" />

                {/* Decorative corner brackets */}
                <div className="animate-corner-reveal absolute inset-8 sm:inset-16 md:inset-24 pointer-events-none">
                  <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a96e]/30" />
                  <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c9a96e]/30" />
                  <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#c9a96e]/30" />
                  <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c9a96e]/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  {/* Top Label */}
                  <span className="animate-fade text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#c9a96e] font-medium mb-6 sm:mb-8">
                    Luxury Fashion House
                  </span>

                  {/* Brand Title with shimmer */}
                  <h1 className="animate-logo animate-shimmer text-5xl sm:text-7xl md:text-9xl lg:text-[135px] font-bold uppercase text-white tracking-[0.1em] sm:tracking-[0.15em] leading-none">
                    JCops
                  </h1>

                  {/* Gold Divider */}
                  <div className="animate-line h-px bg-[#c9a96e] mx-auto my-6 sm:my-8" />

                  {/* Tagline */}
                  <p className="animate-text text-[10px] sm:text-xs md:text-sm text-white/60 uppercase tracking-[0.15em] sm:tracking-[0.3em] leading-relaxed max-w-md px-4">
                    Crafted for timeless elegance.
                    <br />
                    Premium clothing designed for modern luxury.
                  </p>

                  {/* CTA Button with glow */}
                  <div className="animate-text mt-8 sm:mt-10">
                    <Link
                      href="/shop"
                      className="animate-btn-glow inline-block border border-white/30 px-8 sm:px-12 py-3 sm:py-4 text-[10px] sm:text-[11px] text-white uppercase tracking-[0.3em] font-medium rounded-none hover:bg-white hover:text-black transition-all duration-700"
                    >
                      Discover Collection
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* ============================================================
                 Image Slide
                 ============================================================ */
              <>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center animate-zoom"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
                  <div className="flex flex-col items-center max-w-2xl">
                    {/* Small Heading */}
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#c9a96e] font-medium mb-4 sm:mb-6">
                      New Collection
                    </span>

                    {/* Title */}
                    <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white tracking-[0.08em] sm:tracking-[0.1em] leading-tight">
                      {slide.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs md:text-sm text-white/70 uppercase tracking-[0.12em] sm:tracking-[0.2em] max-w-lg leading-relaxed">
                      {slide.subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-8 sm:mt-10">
                      <Link
                        href={slide.link}
                        className="inline-block border border-white/30 px-8 sm:px-12 py-3 sm:py-4 text-[10px] sm:text-[11px] text-white uppercase tracking-[0.3em] font-medium rounded-none hover:bg-white hover:text-black transition-all duration-700"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
