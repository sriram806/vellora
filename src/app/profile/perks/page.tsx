'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function PerksPage() {
  const perksList = [
    {
      icon: Truck,
      title: 'DHL Express Dispatch',
      desc: 'Complimentary shipping and premium logistics management on all global purchases.',
    },
    {
      icon: CheckCircle2,
      title: 'Product Authentication',
      desc: 'Every purchase is linked to a cryptographic authenticity ledger, verified by our ateliers.',
    },
    {
      icon: ShieldCheck,
      title: 'Extended Returns',
      desc: 'Receive extended 30-day trial privileges and complimentary collection courier returns.',
    },
    {
      icon: Sparkles,
      title: 'Editorial Private Access',
      desc: 'Enjoy priority access to experimental capsule drops and customized fabric adjustments.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">Atelier Member Perks</h2>
        <p className="text-xs text-foreground-secondary mt-1">Review the privileges, authentication protocols, and early access options linked to your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
        {perksList.map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <div 
              key={idx} 
              className="border border-border p-6 rounded-sm bg-background-secondary/20 hover:bg-background hover:border-accent/40 shadow-2xs hover:shadow-xs transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-accent-light/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-foreground">{perk.title}</h4>
                <p className="text-foreground-secondary mt-2 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
