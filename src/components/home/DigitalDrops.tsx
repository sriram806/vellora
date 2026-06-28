'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Clock } from 'lucide-react';

export default function DigitalDrops() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 48, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 sm:py-28 lg:py-32 bg-background border-b border-border relative z-20">
      <div className="container-vellora space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 pb-8 border-b border-border">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Flame className="w-4 h-4 fill-accent animate-pulse" />
              <span className="label-text uppercase tracking-widest text-xs font-bold font-mono">Limited Release Capsule</span>
            </div>
            <h2 className="heading-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider">
              Digital Drops & Archives
            </h2>
            <p className="body-text text-sm text-foreground-secondary max-w-lg">
              Exclusive architectural runs. Hand-numbered collections featuring no restocks and no repeats.
            </p>
          </div>

          {/* Live Countdown Clock */}
          <div className="flex items-center gap-3 border border-accent/20 bg-accent-light px-5 py-3 shadow-sm rounded-sm">
            <Clock className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '6s' }} />
            <div className="font-mono text-xs uppercase tracking-wider text-foreground-secondary flex gap-2">
              <span>Next drop in:</span>
              <span className="font-bold text-accent">
                {timeLeft.hours.toString().padStart(2, '0')}:
                {timeLeft.minutes.toString().padStart(2, '0')}:
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Drops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
          {/* Drop Item 1 */}
          <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
            <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop"
                alt="Signature Tee"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                Drop 06 // Active
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                183 Units Released
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Aether Collection</span>
                  <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Signature Silk-Cotton Tee</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-foreground-muted line-through font-mono block">$240</span>
                  <span className="text-xs font-mono font-bold text-accent">$180</span>
                </div>
              </div>

              {/* Stock Meter */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 94% Claimed</span>
                  <span className="font-bold text-accent">Only 4 items remaining</span>
                </div>
                <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[94%]" />
                </div>
              </div>

              <div className="pt-2">
                <Link href="/product/vellora-signature-tee" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                  Purchase Archive Piece
                </Link>
              </div>
            </div>
          </div>

          {/* Drop Item 2 */}
          <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
            <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                alt="Cropped Bomber"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                Drop 06 // Active
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                50 Units Released
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Luminal Collection</span>
                  <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Luminal Cropped Shell Bomber</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-accent">$890</span>
                </div>
              </div>

              {/* Stock Meter */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 88% Claimed</span>
                  <span className="font-bold text-accent">Only 2 items remaining</span>
                </div>
                <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[88%]" />
                </div>
              </div>

              <div className="pt-2">
                <Link href="/product/luminal-cropped-bomber" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                  Purchase Archive Piece
                </Link>
              </div>
            </div>
          </div>

          {/* Drop Item 3 */}
          <div className="group flex flex-col bg-background-tertiary border border-border p-6 space-y-6 shadow-sm hover:border-accent transition-all duration-300">
            <div className="relative aspect-product overflow-hidden border border-border bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop"
                alt="Calfskin Sneaker"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-accent text-white text-[8px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                Drop 06 // Active
              </div>
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1">
                120 Units Released
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-foreground-muted font-mono">Aether Collection</span>
                  <h3 className="text-sm font-semibold tracking-wide uppercase mt-1">Aether Calfskin Court Sneaker</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-foreground-muted line-through font-mono block">$620</span>
                  <span className="text-xs font-mono font-bold text-accent">$490</span>
                </div>
              </div>

              {/* Stock Meter */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[9px] font-mono text-foreground-secondary">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-accent animate-pulse" /> 97% Claimed</span>
                  <span className="font-bold text-accent">Only 1 item remaining</span>
                </div>
                <div className="w-full bg-border-light h-1 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[97%]" />
                </div>
              </div>

              <div className="pt-2">
                <Link href="/product/vellora-court-sneaker" className="btn-primary w-full text-center block py-2.5 text-[10px] uppercase font-mono tracking-wider font-semibold">
                  Purchase Archive Piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
