'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useProductStore } from '@/hooks/useProductStore';
import { getPDPExtraData } from '@/data/pdp-data';

const wizardSchema = z.object({
  height: z.string().min(1, 'Please enter height'),
  weight: z.string().min(1, 'Please enter weight'),
  chest: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
});

type WizardFields = z.infer<typeof wizardSchema>;

interface SizeGuideProps {
  productId: string;
}

export default function SizeGuide({ productId }: SizeGuideProps) {
  const isSizeGuideOpen = useProductStore((state) => state.isSizeGuideOpen);
  const setIsSizeGuideOpen = useProductStore((state) => state.setIsSizeGuideOpen);
  const setSelectedSize = useProductStore((state) => state.setSelectedSize);

  const [activeTab, setActiveTab] = useState<'chart' | 'wizard'>('chart');
  const [wizardStep, setWizardStep] = useState(1);
  const [recommendation, setRecommendation] = useState<{ size: string; confidence: number; fitNote: string } | null>(null);

  const pdpExtra = getPDPExtraData(productId);
  const specs = pdpExtra.specs;

  const { register, handleSubmit, formState: { errors } } = useForm<WizardFields>({
    defaultValues: {
      height: '',
      weight: '',
      chest: '',
      waist: '',
      hips: '',
    }
  });

  const onSubmit = (data: WizardFields) => {
    // Elegant dynamic sizing recommendation mockup logic
    const h = parseFloat(data.height) || 175;
    const w = parseFloat(data.weight) || 70;

    let suggested = 'M';
    let confidence = 85;
    let note = 'Based on your measurements, a Medium will fit comfortably relaxed in line with the brand intent.';

    if (w < 60) {
      suggested = 'XS';
      confidence = 90;
      note = 'Our tailored XS offers a clean structured drape without being tight.';
    } else if (w < 70) {
      suggested = 'S';
      confidence = 88;
      note = 'Small will give a refined editorial look with normal tailoring drape.';
    } else if (w > 90) {
      suggested = 'XL';
      confidence = 92;
      note = 'Extra Large provides the intended relaxed volume and chest room.';
    } else if (w > 80) {
      suggested = 'L';
      confidence = 89;
      note = 'Large is recommended for a comfortable, signature relaxed profile.';
    }

    // Adjust score if user input full details
    if (data.chest && data.waist) {
      confidence += 6;
      if (confidence > 98) confidence = 98;
    }

    setRecommendation({
      size: suggested,
      confidence,
      fitNote: note
    });
    setWizardStep(3);
  };

  const applyRecommendedSize = () => {
    if (recommendation) {
      setSelectedSize(recommendation.size);
      setIsSizeGuideOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSizeGuideOpen(false)}
            className="fixed inset-0 z-[9900] bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-[9901] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.45 }}
              className="w-full max-w-2xl pointer-events-auto bg-background/95 dark:bg-zinc-950/95 border border-border rounded-sm shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-accent" />
                  <span className="ui-text text-[10px] tracking-[0.2em] font-semibold text-accent">Sizing Atelier</span>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-1.5 hover:text-accent transition-colors"
                  aria-label="Close size guide"
                  data-cursor="hover"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-border font-mono text-[9px] uppercase tracking-widest text-foreground-muted">
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                    activeTab === 'chart' ? 'border-accent text-accent font-bold' : 'border-transparent hover:text-foreground'
                  }`}
                  data-cursor="hover"
                >
                  Dimensions Table
                </button>
                <button
                  onClick={() => setActiveTab('wizard')}
                  className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                    activeTab === 'wizard' ? 'border-accent text-accent font-bold' : 'border-transparent hover:text-foreground'
                  }`}
                  data-cursor="hover"
                >
                  Find My Size Wizard
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {activeTab === 'chart' ? (
                  <div className="space-y-6">
                    {/* Dimension Chart */}
                    <div className="overflow-x-auto border border-border">
                      <table className="w-full text-left font-mono text-[10px] border-collapse">
                        <thead>
                          <tr className="bg-background-tertiary border-b border-border text-foreground-muted">
                            <th className="p-3 font-semibold uppercase tracking-wider">Garment Size</th>
                            {specs.dimensions[0]?.chest !== 'N/A' && <th className="p-3 font-semibold uppercase tracking-wider">Chest</th>}
                            {specs.dimensions[0]?.waist && <th className="p-3 font-semibold uppercase tracking-wider">Waist</th>}
                            {specs.dimensions[0]?.sleeve && <th className="p-3 font-semibold uppercase tracking-wider">Sleeve</th>}
                            <th className="p-3 font-semibold uppercase tracking-wider">Length</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specs.dimensions.map((dim, idx) => (
                            <tr key={idx} className="border-b border-border hover:bg-background-secondary/30 transition-colors">
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

                    {/* How to Measure Details */}
                    <div className="p-4 bg-background-tertiary border border-border rounded-xs space-y-3">
                      <h4 className="ui-text text-[9px] text-foreground font-semibold">How to Measure</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-foreground-secondary leading-relaxed">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-accent font-bold">1. CHEST</span>
                          <p className="text-[11px]">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] text-accent font-bold">2. SLEEVE</span>
                          <p className="text-[11px]">Measure from the center back of your neck, across your shoulder down to the wrist.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Wizard Steps */}
                    {wizardStep === 1 && (
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <h4 className="heading-serif text-base font-bold">Atelier Size Advisor</h4>
                          <p className="body-text text-xs text-foreground-secondary">
                            Input your basic proportions to calculate your recommended fit.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="ui-text text-[8px] text-foreground-muted">Height (cm)</label>
                            <input
                              type="number"
                              placeholder="e.g. 178"
                              {...register('height')}
                              className="w-full bg-background border border-border px-3 py-2 text-xs font-mono outline-hidden focus:border-accent"
                            />
                            {errors.height && <p className="text-[9px] text-error font-mono">{errors.height.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="ui-text text-[8px] text-foreground-muted">Weight (kg)</label>
                            <input
                              type="number"
                              placeholder="e.g. 72"
                              {...register('weight')}
                              className="w-full bg-background border border-border px-3 py-2 text-xs font-mono outline-hidden focus:border-accent"
                            />
                            {errors.weight && <p className="text-[9px] text-error font-mono">{errors.weight.message}</p>}
                          </div>
                        </div>

                        <button
                          onClick={() => setWizardStep(2)}
                          className="w-full btn-primary py-3.5 text-[10px] flex items-center justify-center gap-1.5"
                          data-cursor="hover"
                        >
                          <span>Next: Precise Measurements</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-5">
                        <div className="space-y-1 flex justify-between items-baseline">
                          <h4 className="heading-serif text-base font-bold">Optional Proportions</h4>
                          <span className="text-[8px] font-mono text-zinc-400">Step 2 of 2</span>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <label className="ui-text text-[8px] text-foreground-muted">Chest (in)</label>
                            <input
                              type="number"
                              placeholder="38"
                              {...register('chest')}
                              className="w-full bg-background border border-border px-2.5 py-2 text-xs font-mono outline-hidden focus:border-accent"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="ui-text text-[8px] text-foreground-muted">Waist (in)</label>
                            <input
                              type="number"
                              placeholder="32"
                              {...register('waist')}
                              className="w-full bg-background border border-border px-2.5 py-2 text-xs font-mono outline-hidden focus:border-accent"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="ui-text text-[8px] text-foreground-muted">Hips (in)</label>
                            <input
                              type="number"
                              placeholder="40"
                              {...register('hips')}
                              className="w-full bg-background border border-border px-2.5 py-2 text-xs font-mono outline-hidden focus:border-accent"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setWizardStep(1)}
                            className="flex-1 btn-outline py-3.5 text-[10px]"
                            data-cursor="hover"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleSubmit(onSubmit)}
                            className="flex-2 btn-primary py-3.5 text-[10px] flex items-center justify-center gap-1.5"
                            data-cursor="hover"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-accent" />
                            <span>Calculate Luxury Fit</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && recommendation && (
                      <div className="space-y-6 text-center py-4">
                        <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto text-accent mb-2">
                          <Sparkles className="w-6 h-6" />
                        </div>

                        <div className="space-y-2">
                          <span className="ui-text text-[9px] text-foreground-muted tracking-[0.25em]">Recommended Size</span>
                          <h3 className="heading-display text-4xl text-accent font-bold">{recommendation.size}</h3>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-zinc-500">Confidence Score:</span>
                            <span className="font-mono text-[10px] text-success font-bold">{recommendation.confidence}%</span>
                          </div>
                        </div>

                        <p className="body-text text-xs text-foreground-secondary max-w-md mx-auto leading-relaxed">
                          {recommendation.fitNote}
                        </p>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => {
                              setRecommendation(null);
                              setWizardStep(1);
                            }}
                            className="flex-1 btn-outline py-3.5 text-[10px]"
                            data-cursor="hover"
                          >
                            Recalculate
                          </button>
                          <button
                            onClick={applyRecommendedSize}
                            className="flex-2 btn-primary py-3.5 text-[10px] flex items-center justify-center gap-1.5"
                            data-cursor="hover"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Apply and Close</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
