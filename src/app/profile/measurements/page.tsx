'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Save, Info } from 'lucide-react';
import { useToast } from '@/components/UI/ToastProvider';

export default function MeasurementsPage() {
  const { toast } = useToast();

  const [height, setHeight] = useState('180');
  const [weight, setWeight] = useState('75');
  const [collar, setCollar] = useState('40');
  const [chest, setChest] = useState('100');
  const [waist, setWaist] = useState('84');
  const [inseam, setInseam] = useState('82');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('JCOPS_measurements');
      if (stored) {
        const m = JSON.parse(stored);
        if (m.height) setHeight(m.height);
        if (m.weight) setWeight(m.weight);
        if (m.collar) setCollar(m.collar);
        if (m.chest) setChest(m.chest);
        if (m.waist) setWaist(m.waist);
        if (m.inseam) setInseam(m.inseam);
      }
    } catch (e) {
      console.error('Failed to load measurements coordinates', e);
    }
  }, []);

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();

    const measurementsData = {
      height,
      weight,
      collar,
      chest,
      waist,
      inseam,
    };

    localStorage.setItem('JCOPS_measurements', JSON.stringify(measurementsData));

    toast({
      type: 'success',
      title: 'Fitting Coordinates Updated',
      description: 'Your body geometry coordinates have been synchronized with fit recommendation systems.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">The Digital Fitting Room</h2>
        <p className="text-xs text-foreground-secondary mt-1">Configure your body dimensions to solve fit equations across our collections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Forms column (Col Span 7) */}
        <form onSubmit={handleSaveMeasurements} className="lg:col-span-7 space-y-6 text-xs text-foreground-secondary">
          <div className="border border-border p-6 bg-background rounded-sm space-y-4">
            <h3 className="ui-text text-xs font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
              <Scissors className="w-4 h-4 text-accent" /> Sizing Dimensions (Metric System)
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Height (cm)</label>
                <input
                  type="number"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Weight (kg)</label>
                <input
                  type="number"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Collar Size (cm)</label>
                <input
                  type="number"
                  required
                  value={collar}
                  onChange={(e) => setCollar(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Chest Width (cm)</label>
                <input
                  type="number"
                  required
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  className="border border-[#e5e5e5] bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Waist Line (cm)</label>
                <input
                  type="number"
                  required
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Inseam length (cm)</label>
                <input
                  type="number"
                  required
                  value={inseam}
                  onChange={(e) => setInseam(e.target.value)}
                  className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary py-3.5 px-8 text-[9px] uppercase font-mono tracking-widest flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Store Dimensions</span>
          </button>
        </form>

        {/* Fitting guide descriptions column (Col Span 5) */}
        <div className="lg:col-span-5 border border-border p-6 rounded-sm bg-background-secondary/35 space-y-4">
          <h3 className="ui-text text-xs font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
            <Info className="w-4 h-4 text-accent" /> Measuring Instructions
          </h3>

          <div className="space-y-3.5 text-xs text-foreground-secondary leading-relaxed">
            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase text-foreground">Collar base:</span>
              <p className="text-[11px] text-foreground-secondary">Measure around the absolute base of your neck where the shirt collar sits. Keep one finger between the tape and your neck.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase text-foreground">Chest width:</span>
              <p className="text-[11px] text-foreground-secondary">Measure around the fullest part of your chest, keeping the measuring tape horizontal and flat against your back.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase text-foreground">Waist line:</span>
              <p className="text-[11px] text-foreground-secondary">Measure around your natural waistline, which sits slightly above your belly button and below your ribcage.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[10px] uppercase text-foreground">Inseam length:</span>
              <p className="text-[11px] text-foreground-secondary">Measure from the top of your inner thigh down to the bottom of your ankle bone. This ensures trousers sit with perfect breaks.</p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
