'use client';

import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, Award, Lock, Heart } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Authenticated Guarantee',
      desc: 'Embedded NFC tags verify certificate of authenticity on-chain.',
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      desc: 'All purchases processed via 256-bit encrypted credit and token nodes.',
    },
    {
      icon: RefreshCw,
      title: 'Easy Exchange Cycle',
      desc: 'Complimentary parcel returns and shape exchange within 30 days.',
    },
    {
      icon: Award,
      title: 'Atelier Warranty',
      desc: '2-year repair or re-tailoring warranty on stitching, seams and hardware.',
    },
    {
      icon: Sparkles,
      title: 'Local Craftsmanship',
      desc: 'Garments crafted by hand in historic workshops across Italy and Portugal.',
    },
    {
      icon: Heart,
      title: 'Sartorial Ethics',
      desc: '100% certified organic cotton, recycled nylon, and traceable wool sourcing.',
    }
  ];

  return (
    <section className="section-vellora border-t border-border bg-background-secondary/30">
      <div className="container-vellora space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold">Vellora Standards</span>
          <h3 className="heading-serif text-2xl font-bold uppercase leading-tight">
            Our Luxury Commitment
          </h3>
          <p className="body-text text-xs text-foreground-muted">
            Crafting luxury with absolute transparency, authentic lineage, and sustainable materials.
          </p>
        </div>

        {/* Badges Grid */}
        <AnimatedSection animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="p-6 border border-border bg-background hover:border-accent/40 hover:shadow-lg transition-all duration-300 rounded-xs flex gap-4 select-none"
              >
                <div className="w-10 h-10 bg-accent-light/10 border border-accent/15 rounded-full flex items-center justify-center shrink-0 text-accent">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="ui-text text-[10px] font-bold text-foreground tracking-wider">{badge.title}</h4>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed font-mono">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </AnimatedSection>

      </div>
    </section>
  );
}
