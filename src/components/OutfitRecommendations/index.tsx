'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingBag, CheckSquare, Square, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { getPDPExtraData } from '@/data/pdp-data';
import { useCart } from '@/hooks/CartContext';
import { useToast } from '@/components/UI/ToastProvider';
import AnimatedSection from '../AnimatedSection';
import productsData from '@/data/products.json';

interface OutfitProps {
  product: Product;
}

export default function OutfitRecommendations({ product }: OutfitProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const pdpExtra = getPDPExtraData(product.id);
  const outfitData = pdpExtra.outfit || [];

  // Map product references from dataset to matching objects in dataset
  const resolvedOutfit = useMemo(() => {
    return outfitData.map(item => {
      const match = (productsData as Product[]).find(p => p.id === item.id);
      return match || {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        images: [item.image],
        collection: 'Aether',
        sizes: ['M', '42', 'L'],
        colors: ['Chalk White', 'Midnight Black'],
        inStock: true
      } as unknown as Product;
    });
  }, [outfitData]);

  // Keep track of checked items
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    outfitData.forEach(item => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculations
  const checkedItems = useMemo(() => {
    return resolvedOutfit.filter(item => checkedIds[item.id]);
  }, [resolvedOutfit, checkedIds]);

  const totalOutfitPrice = useMemo(() => {
    return checkedItems.reduce((acc, item) => acc + item.price, 0);
  }, [checkedItems]);

  const handleAddAll = () => {
    if (checkedItems.length === 0) {
      toast({
        type: 'error',
        title: 'No Items Selected',
        description: 'Please check at least one garment to add.',
      });
      return;
    }

    checkedItems.forEach(item => {
      const defaultSize = item.sizes?.[0] || 'M';
      const defaultColor = item.colors?.[0] || 'Chalk White';
      addToCart(item, 1, defaultSize, defaultColor);
    });

    toast({
      type: 'success',
      title: 'Outfit Added',
      description: `Added ${checkedItems.length} outfit components to your bag successfully.`,
    });
  };

  if (outfitData.length === 0) return null;

  return (
    <section className="section-JCOPS border-t border-border select-none">
      <div className="container-JCOPS space-y-8">

        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div className="space-y-1.5">
            <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold font-mono">Curated styling</span>
            <h3 className="heading-serif text-xl sm:text-2xl font-bold uppercase leading-tight">
              Complete the Outfit Look
            </h3>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-foreground-muted">Selected Subtotal:</span>
            <span className="text-accent font-bold text-base sm:text-lg">${totalOutfitPrice}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* List items columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resolvedOutfit.map((item) => {
              const isChecked = checkedIds[item.id] === true;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`border p-4 bg-background transition-all duration-300 rounded-xs flex flex-col justify-between gap-4 cursor-pointer select-none ${isChecked ? 'border-accent shadow-xs' : 'border-border opacity-70 hover:opacity-100'
                    }`}
                  data-cursor="hover"
                >
                  <div className="relative aspect-product overflow-hidden border border-border bg-background-secondary rounded-t-xs">
                    <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-2.5 left-2.5 z-10 p-1.5 bg-white border border-border shadow-xs text-accent"
                    >
                      {isChecked ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5 text-zinc-300" />}
                    </button>
                  </div>

                  <div className="space-y-1 pt-1 text-center sm:text-left">
                    <span className="font-mono text-[8px] text-foreground-muted uppercase tracking-widest">{item.collection}</span>
                    <h4 className="font-sans text-xs font-semibold text-foreground line-clamp-1">{item.name}</h4>
                    <span className="font-mono text-xs text-accent font-bold">${item.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout calculator card columns */}
          <div className="lg:col-span-4 w-full">
            <AnimatedSection animation="scale" className="glass p-6 border border-border rounded-xs shadow-md space-y-6">
              <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold font-mono block">STYLING DIRECTIVE</span>
              <h4 className="heading-serif text-sm font-bold uppercase leading-tight text-foreground">Outfit Checklist</h4>

              <div className="divide-y divide-border/60 font-mono text-[10px] space-y-2">
                {resolvedOutfit.map(item => (
                  <div key={item.id} className="pt-2 flex justify-between gap-4">
                    <span className={`line-clamp-1 ${checkedIds[item.id] ? 'text-foreground font-semibold' : 'text-foreground-muted line-through'}`}>
                      {item.name}
                    </span>
                    <span className="font-bold shrink-0">${item.price}</span>
                  </div>
                ))}
              </div>

              <hr className="border-border/60" />

              <div className="flex justify-between items-baseline font-mono text-xs">
                <span>Aggregate Total</span>
                <span className="text-accent font-bold text-lg">${totalOutfitPrice}</span>
              </div>

              <button
                onClick={handleAddAll}
                className="w-full btn-primary h-12 text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5"
                data-cursor="hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add curated look to bag</span>
              </button>
            </AnimatedSection>
          </div>

        </div>

      </div>
    </section>
  );
}
