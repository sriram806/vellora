'use client';

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ToneMapping,
} from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface PostProcessingProps {
  /** Bloom glow intensity 0‑1 – default 0.4 */
  bloomIntensity?: number;
  /** Vignette darkness 0‑1 – default 0.35 */
  vignetteIntensity?: number;
  /** Film grain opacity 0‑1 – default 0.06 */
  noiseIntensity?: number;
  /** Completely disable effects (e.g. on low‑end devices) */
  enabled?: boolean;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function PostProcessing({
  bloomIntensity = 0.4,
  vignetteIntensity = 0.35,
  noiseIntensity = 0.06,
  enabled = true,
}: PostProcessingProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={4}>
      {/* Subtle glow on bright / reflective surfaces */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.7}
        mipmapBlur
      />

      {/* Cinematic darkened edges */}
      <Vignette
        offset={0.3}
        darkness={vignetteIntensity}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Subtle film grain for tactile texture */}
      <Noise
        opacity={noiseIntensity}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      {/* ACES Filmic tone mapping for rich, cinematic tones */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
