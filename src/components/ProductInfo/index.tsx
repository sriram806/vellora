'use client';

import React from 'react';
import { ShieldCheck, Info, Leaf, PenTool } from 'lucide-react';
import { Product } from '@/types';
import { getPDPExtraData } from '@/data/pdp-data';
import AnimatedSection from '../AnimatedSection';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const pdpExtra = getPDPExtraData(product.id);
  const specs = pdpExtra.specs;

  return (
    <section className="section-JCOPS border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Editorial: Designer Notes */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatedSection animation="fade-up" className="space-y-4">
            <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-accent" />
              <span>Designer Sketch & Philosophy</span>
            </span>
            <h3 className="heading-serif text-xl sm:text-2xl font-bold uppercase leading-snug">
              Atelier Creative Director Notes
            </h3>
            <p className="font-serif italic text-base sm:text-lg text-foreground-secondary leading-relaxed border-l-2 border-accent/40 pl-5">
              &ldquo;{pdpExtra.designerNotes}&rdquo;
            </p>
          </AnimatedSection>

          {/* Key specs highlight */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-wider block">Origin</span>
              <span className="font-sans text-xs font-semibold text-foreground">{pdpExtra.countryOfOrigin}</span>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-wider block">Tailoring Fit</span>
              <span className="font-sans text-xs font-semibold text-foreground">{pdpExtra.fit} Drape</span>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-wider block">GSM Weight</span>
              <span className="font-sans text-xs font-semibold text-foreground">{pdpExtra.fabricWeight}</span>
            </div>
          </div>
        </div>

        {/* Right Info: Craftsmanship Card */}
        <div className="lg:col-span-5">
          <AnimatedSection animation="scale" className="glass p-6 border border-border rounded-sm shadow-md space-y-6">

            {/* Title */}
            <div className="flex items-center justify-between">
              <span className="ui-text text-[9px] text-foreground font-bold tracking-widest">Atelier Specifications</span>
              <span className="font-mono text-[9px] text-foreground-muted">{pdpExtra.sku}</span>
            </div>

            <hr className="border-border/60" />

            {/* Spec items */}
            <div className="space-y-4">
              {/* Materials */}
              <div className="space-y-2">
                <h4 className="font-mono text-[9px] text-foreground-muted uppercase tracking-wider">Material Composition</h4>
                <div className="space-y-1.5">
                  {specs.materials.map((mat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-baseline text-[11px] font-semibold text-foreground">
                        <span>{mat.name}</span>
                        <span className="font-mono text-[10px]">{mat.percentage}%</span>
                      </div>
                      <p className="text-[10px] text-foreground-muted leading-relaxed font-mono">{mat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainability block */}
              <div className="pt-4 border-t border-border/60 space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-[9px] text-foreground-muted uppercase tracking-wider">Sustainability Index</span>
                  <span className="font-mono text-[9px] text-success font-bold ml-auto">{pdpExtra.sustainabilityScore}%</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {pdpExtra.sustainabilityBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[8px] font-mono border border-accent/20 bg-accent-light/10 text-accent uppercase rounded-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}
