'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="container-JCOPS py-10 sm:py-16 lg:py-20 max-w-4xl">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-foreground-muted mb-4 font-mono uppercase tracking-wider">
        <Link href="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold">Privacy Policy</span>
      </div>

      {/* Header section */}
      <div className="border-b border-border pb-8 mb-10">
        <span className="label-text text-accent font-semibold">Atelier Information</span>
        <h1 className="heading-serif text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide mt-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-foreground-muted font-mono tracking-widest uppercase mt-2">
          Last Updated: June 22, 2026
        </p>
      </div>

      {/* Main Content Details */}
      <div className="space-y-10 text-xs sm:text-sm text-foreground-secondary leading-relaxed font-light">
        <section className="space-y-3">
          <p>
            At JCOPS, your privacy is of paramount importance. This Privacy Policy details how we collect, utilize, and protect the personal coordinates and transaction records of clients browsing our digital atelier and purchasing our collections.
          </p>
          <div className="flex items-center gap-2 text-success font-semibold font-mono text-[10px] bg-success/5 p-3 rounded-sm border border-success/10 mt-4">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>All transaction streams are secured using SSL-encrypted gateways.</span>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            1. Information Collection
          </h2>
          <p>
            When you interact with the JCOPS digital experience, we collect specific coordinates required to fulfill your requests:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Coordinates:</strong> Your name, billing/shipping addresses, phone number, and email details collected during client profile registration or checkout.</li>
            <li><strong>Acquisition Records:</strong> History of collection items you save to your wishlist, add to your bag, or purchase through secure checkout transaction points.</li>
            <li><strong>Technical Parameters:</strong> Navigation details, IP address, and cookie parameters configured to optimize your browsing speed, shopping session, and cart drapes.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            2. Utilization of Data
          </h2>
          <p>
            We process client coordinates exclusively to manage your relations with JCOPS:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Fulfilling orders and coordinating DHL Express insured global deliveries.</li>
            <li>Syncing client profiles and order records dynamically in the local browser cache for auto-population during future checkout acquisitions.</li>
            <li>Dispatching digital collections announcements, editorial notes, or concierge alerts (only upon explicit newsletter subscription).</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            3. Client Ledger Security
          </h2>
          <p>
            JCOPS utilizes industry-leading security practices:
          </p>
          <p>
            All payment card numbers are processed via double-encrypted payment token gateways. We do not store raw credit card details or CVV codes directly on our servers. Your local profile details (shipping address, wishlist selections, etc.) are synced securely inside your device browser local caches and are only shared with certified payment/delivery carriers during active checkouts.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider border-b border-border-light pb-2 font-mono">
            4. Client Control & Rights
          </h2>
          <p>
            As a JCOPS client, you hold complete control over your credentials:
          </p>
          <p>
            You can modify your shipping details and contact parameters at any time via your [Client Profile](file:///profile). You can also completely reset all stored local data, wishlist records, and transaction listings by clicking the "Reset Session Profile" button located inside the profile tab or the "Reset Atelier Session Data" button in the [Atelier Console Settings](file:///admin).
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-border pt-6">
          <h2 className="ui-text text-xs text-foreground font-semibold uppercase tracking-wider font-mono">
            Atelier Contact
          </h2>
          <p>
            If you have questions regarding our privacy standards or wish to request profile deletion, please contact our bespoke concierge desk:
          </p>
          <p className="font-mono text-xs text-accent">
            Email: concierge@JCOPS.com
          </p>
        </section>
      </div>
    </main>
  );
}
