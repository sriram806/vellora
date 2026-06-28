'use client';

import React from 'react';
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  Noise,
  ToneMapping,
} from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';

/* ------------------------------------------------------------------ */
/* Cinematic post-processing for the intro showcase                    */
/* Stronger effects than the main site's PostProcessing.tsx             */
/* ------------------------------------------------------------------ */

export interface IntroPostProcessingProps {
  /** Disable all effects (low-end devices) */
  enabled?: boolean;
}

export default function IntroPostProcessing({ enabled = true }: IntroPostProcessingProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={4}>
      {/* Stronger bloom for cinematic glow on highlights */}
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.65}
        luminanceSmoothing={0.8}
        mipmapBlur
      />



      {/* Darkened vignette edges for cinematic framing */}
      <Vignette
        offset={0.25}
        darkness={0.55}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Subtle film grain for tactile texture */}
      <Noise
        opacity={0.045}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      {/* ACES Filmic tone mapping for rich, cinematic colour grading */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
