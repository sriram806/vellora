'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getPDPExtraData } from '@/data/pdp-data';
import { Product } from '@/types';

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const pdpExtra = getPDPExtraData(product.id);
  const specs = pdpExtra.specs;

  const tabs = [
    { id: 'materials', label: 'Materials' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'care', label: 'Garment Care' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' },
    { id: 'warranty', label: 'Warranty' },
    { id: 'faqs', label: 'FAQs' }
  ];

  const [activeTab, setActiveTab] = useState('materials');

  const renderContent = (tabId: string) => {
    switch (tabId) {
      case 'materials':
        return (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Atelier Material Log</h4>
            <div className="divide-y divide-border">
              {specs.materials.map((mat, idx) => (
                <div key={idx} className="py-3 flex justify-between gap-6">
                  <span className="font-bold text-foreground">{mat.name} ({mat.percentage}%)</span>
                  <span className="text-foreground-secondary text-right max-w-sm">{mat.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'dimensions':
        return (
          <div className="space-y-4">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Dimension Spec Chart</h4>
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-left font-mono text-[10px] border-collapse">
                <thead>
                  <tr className="bg-background-tertiary border-b border-border text-foreground-muted">
                    <th className="p-3 font-semibold uppercase tracking-wider">Garment Size</th>
                    {specs.dimensions[0]?.chest !== 'N/A' && <th className="p-3 font-semibold uppercase tracking-wider">Chest Width</th>}
                    {specs.dimensions[0]?.waist && <th className="p-3 font-semibold uppercase tracking-wider">Waist Width</th>}
                    {specs.dimensions[0]?.sleeve && <th className="p-3 font-semibold uppercase tracking-wider">Sleeve Length</th>}
                    <th className="p-3 font-semibold uppercase tracking-wider">Total Length</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.dimensions.map((dim, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-background-secondary/20 transition-colors">
                      <td className="p-3 font-bold text-foreground">{dim.size}</td>
                      {dim.chest !== 'N/A' && <td className="p-3 text-foreground-secondary">{dim.chest}</td>}
                      {dim.waist && <td className="p-3 text-foreground-secondary">{dim.waist}</td>}
                      {dim.sleeve && <td className="p-3 text-foreground-secondary">{dim.sleeve}</td>}
                      <td className="p-3 text-foreground-secondary">{dim.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'care':
        return (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Atelier Wash Directives</h4>
            <ul className="list-disc list-inside space-y-2.5 text-foreground-secondary">
              {specs.careInstructions.map((inst, idx) => (
                <li key={idx} className="leading-relaxed">&bull; {inst}</li>
              ))}
            </ul>
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Shipping Terms</h4>
            <p className="text-foreground-secondary leading-relaxed">{specs.shippingInfo}</p>
          </div>
        );
      case 'returns':
        return (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Exchange Cycle</h4>
            <p className="text-foreground-secondary leading-relaxed">{specs.returnsInfo}</p>
          </div>
        );
      case 'warranty':
        return (
          <div className="space-y-3 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Lineage Warranty</h4>
            <p className="text-foreground-secondary leading-relaxed">{specs.warrantyInfo}</p>
          </div>
        );
      case 'faqs':
        return (
          <div className="space-y-4 font-mono text-xs">
            <h4 className="ui-text text-[9px] text-foreground font-bold tracking-widest uppercase">Frequent Questions</h4>
            <div className="divide-y divide-border">
              {specs.faqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h5 className="font-bold text-foreground">Q: {faq.question}</h5>
                  <p className="text-foreground-secondary leading-relaxed">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="section-JCOPS border-t border-border select-none">
      <div className="container-JCOPS space-y-8">

        {/* Title */}
        <div className="max-w-md">
          <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold">Garment Spec Log</span>
          <h3 className="heading-serif text-xl sm:text-2xl font-bold uppercase leading-tight pt-1">
            Product Specifications
          </h3>
        </div>

        {/* Tabbed view: Desktop */}
        <div className="hidden md:flex gap-8 items-start">
          {/* Vertical Menu Buttons */}
          <div className="w-56 shrink-0 flex flex-col border-l border-border pr-2 font-mono text-[9.5px] uppercase tracking-wider text-foreground-muted">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 pl-4 text-left border-l-2 -ml-[1px] transition-colors ${activeTab === tab.id
                    ? 'border-accent text-accent font-bold bg-accent-light/5'
                    : 'border-transparent hover:text-foreground'
                  }`}
                data-cursor="hover"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1 min-h-[250px] p-6 border border-border bg-background-tertiary/20">
            {renderContent(activeTab)}
          </div>
        </div>

        {/* Accordion view: Mobile */}
        <div className="md:hidden space-y-3.5">
          {tabs.map((tab) => (
            <details
              key={tab.id}
              className="group border border-border bg-background [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer p-4 select-none">
                <span className="ui-text text-[10px] text-foreground font-bold tracking-wider">{tab.label}</span>
                <span className="transition-transform group-open:rotate-180 text-foreground-muted">&darr;</span>
              </summary>
              <div className="p-4 border-t border-border bg-background-tertiary/30">
                {renderContent(tab.id)}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
