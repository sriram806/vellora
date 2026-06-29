'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="container-JCOPS py-10 sm:py-16 lg:py-20 max-w-4xl">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-4 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold">Terms & Conditions</span>
      </div>

      {/* Header section */}
      <div className="border-b border-border pb-8 mb-10">
        <span className="label-text text-accent font-semibold">Atelier Information</span>
        <h1 className="heading-serif text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-2">
          Terms & Conditions
        </h1>
        <p className="text-xs text-foreground-muted font-mono tracking-widest uppercase mt-2">
          Last Updated: June 22, 2026
        </p>
      </div>

      {/* Main Content Details */}
      <div className="space-y-10 text-xs sm:text-sm text-foreground-secondary leading-relaxed font-light">
        <section className="space-y-3">
          <p>
            Welcome to the JCOPS digital atelier. These Terms & Conditions govern your access to and use of our web application, collections, customer services, and ordering systems. By browsing the site or initiating checkout acquisitions, you accept these terms in full.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            1. Purchases & Checkout Transactions
          </h2>
          <p>
            By submitting an order on our [Checkout Page](file:///checkout), you agree that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are purchasing luxury garments and accessories for personal use, not for commercial unauthorized resale.</li>
            <li>All prices are in USD, and you authorize JCOPS to charge your selected credit card or mock payment details for the total order amount, minus any applied active promo privileges (e.g. JCOPS15).</li>
            <li>JCOPS reserves the right to reject checkout processing in the event of stock inaccuracies or verification checks.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            2. DHL Insured Delivery
          </h2>
          <p>
            Every order placed on JCOPS qualifies for complimentary insured worldwide express delivery:
          </p>
          <p>
            DHL Express manages transit logistics, requiring a physical signature upon delivery to secure the integrity of the creations. Standard delivery times range from 2 to 4 business days. Title and risk of loss pass to the client upon DHL delivery verification.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            3. Client Returns & Atelier Trials
          </h2>
          <p>
            We take pride in our workmanship. Our return policy guidelines state:
          </p>
          <p>
            We offer 30-day trial return privileges for unworn creations. Items must be returned in their original packaging, including authentication cards and complimentary signature boxes. If you requested customized gift wrapping notes, please note that the bespoke handwritten cards are yours to keep, but garment attributes must remain unmodified.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            4. Proprietary Designs & IP
          </h2>
          <p>
            All digital designs, product layouts, graphics, font configurations, and brand concepts displayed on JCOPS are the exclusive intellectual property of JCOPS. Copying, republishing, or mimicking our styles, patterns, or layouts without prior written consent is strictly prohibited.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-border pt-6">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider font-mono">
            Concierge Resolution
          </h2>
          <p>
            For assistance resolving transaction disputes, shipping coordinate changes, or detailed size consultations, please contact our atelier:
          </p>
          <p className="font-mono text-xs text-accent">
            Email: concierge@JCOPS.com
          </p>
        </section>
      </div>
    </main>
  );
}
