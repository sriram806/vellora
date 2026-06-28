'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getPDPExtraData } from '@/data/pdp-data';
import AnimatedSection from '../AnimatedSection';

interface ProductStoryProps {
  productId: string;
}

export default function ProductStory({ productId }: ProductStoryProps) {
  const pdpExtra = getPDPExtraData(productId);
  const storyBlocks = pdpExtra.story || [];

  return (
    <section className="section-vellora border-t border-border overflow-hidden select-none">
      <div className="container-vellora space-y-16">
        
        {/* Intro */}
        <div className="max-w-2xl space-y-4">
          <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold">Behind The Seams</span>
          <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase leading-tight">
            Craftsmanship & Heritage Story
          </h2>
          <p className="body-text text-sm text-foreground-secondary leading-relaxed max-w-xl">
            A journey of precise material selections, generational craftsmanship, and refined design philosophies behind this garment.
          </p>
        </div>

        {/* Storyboard list */}
        <div className="space-y-16 lg:space-y-28">
          {storyBlocks.map((block, idx) => {
            const isLeft = block.layout === 'left-image';
            return (
              <div 
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                
                {/* Image block */}
                <div className={`lg:col-span-7 w-full aspect-editorial overflow-hidden border border-border bg-background-secondary ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ParallaxImage src={block.imageUrl} alt={block.title} speed={block.parallaxSpeed} />
                </div>

                {/* Text block */}
                <div className={`lg:col-span-5 space-y-4 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  <AnimatedSection animation={isLeft ? 'fade-right' : 'fade-left'}>
                    <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest block">{block.subtitle}</span>
                    <h3 className="heading-serif text-2xl font-bold uppercase leading-tight pt-1">
                      {block.title}
                    </h3>
                    <p className="body-text text-xs text-foreground-secondary leading-relaxed pt-2">
                      {block.description}
                    </p>
                  </AnimatedSection>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Custom Smooth Scroll Parallax Image component
function ParallaxImage({ src, alt, speed = 10 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Map progress to translate Y
  const y = useTransform(scrollYProgress, [0, 1], [speed * -2, speed * 2]);

  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden">
      <motion.img
        style={{ y, scale: 1.12 }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover select-none"
      />
      {/* Editorial overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
