'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { RotateCw, Maximize2, Minimize2, RefreshCcw, Sun, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

const Interactive360Viewer = dynamic(
  () => import('../three/Interactive360Viewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-JCOPS-deep-black/90 flex flex-col items-center justify-center font-mono text-[9px] uppercase text-zinc-500 gap-4">
        {/* Elegant luxury spinner */}
        <div className="w-8 h-8 border border-accent/20 border-t-accent rounded-full animate-spin" />
        <span>Resolving 3D Garment Model...</span>
      </div>
    )
  }
);

interface Product3DViewerProps {
  category: 't-shirts' | 'pants' | 'sneakers' | 'outerwear' | 'accessories';
}

export default function Product3DViewer({ category }: Product3DViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeLighting, setActiveLighting] = useState<'studio' | 'editorial' | 'dramatic'>('studio');

  return (
    <div className="w-full h-full relative group/viewer border border-border/80 bg-JCOPS-deep-black/95 overflow-hidden flex items-center justify-center">
      {/* 3D Canvas */}
      <div className="w-full h-full absolute inset-0">
        <Interactive360Viewer category={category} />
      </div>

      {/* Control Overlay - Glassmorphism UI */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <div className="glass p-2 flex flex-col gap-2 rounded-xs border border-white/5 shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 transition-all rounded-xs hover:bg-white/10 ${autoRotate ? 'text-accent' : 'text-zinc-400'}`}
            title="Toggle Auto Rotation"
            data-cursor="hover"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
          </button>

          <button
            onClick={() => {
              // Trigger simple camera resets via OrbitControls by unmounting/remounting
              // Normally done inside R3F, we simulate reset by changing lights/setting state
              setActiveLighting('studio');
            }}
            className="p-2 transition-all rounded-xs text-zinc-400 hover:text-white hover:bg-white/10"
            title="Reset Camera View"
            data-cursor="hover"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lighting controls */}
        <div className="glass p-2 flex flex-col gap-1.5 rounded-xs border border-white/5 shadow-lg items-center">
          <span className="ui-text text-[7px] text-zinc-500 font-mono tracking-wider mb-1">LIGHTS</span>
          {(['studio', 'editorial', 'dramatic'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setActiveLighting(style)}
              className={`text-[8px] font-mono px-1.5 py-1 rounded-xs uppercase tracking-wider transition-colors ${activeLighting === style ? 'bg-accent/25 text-accent border border-accent/20' : 'text-zinc-400 hover:text-white'
                }`}
              data-cursor="hover"
            >
              {style[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Indicators */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none select-none flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="ui-text text-[9px] text-[#fafafa] font-bold tracking-[0.2em]">3D Digital Showcase</span>
        </div>
        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
          Rotate: Drag &bull; Zoom: Scroll &bull; Fit: {category}
        </span>
      </div>

      {/* Ambient background styling */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
