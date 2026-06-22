'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface StudioLightingProps {
  /** Current scene number 1‑10 */
  scene?: number;
  /** Global intensity multiplier 0‑2 */
  intensity?: number;
}

/* ------------------------------------------------------------------ */
/* Colour palettes per scene                                          */
/* ------------------------------------------------------------------ */
const SCENE_PALETTES: Record<number, { key: string; fill: string; rim: string; ambient: string }> = {
  1:  { key: '#FFF5E6', fill: '#E8DDD0', rim: '#C9A96E', ambient: '#F5F0EB' },
  2:  { key: '#FFF5E6', fill: '#E8DDD0', rim: '#C9A96E', ambient: '#F5F0EB' },
  3:  { key: '#FFECD2', fill: '#DDD5CB', rim: '#D4AF72', ambient: '#EDE6DD' },
  4:  { key: '#FFF0DB', fill: '#E0D8CE', rim: '#C9A96E', ambient: '#F0EAE2' },
  5:  { key: '#FFE8C8', fill: '#D8CFC4', rim: '#BFA36A', ambient: '#EAE2D8' },
  6:  { key: '#FDE2BD', fill: '#CFC7BC', rim: '#B09660', ambient: '#E2DAD0' },
  7:  { key: '#FCE0B8', fill: '#C8C0B5', rim: '#A88E58', ambient: '#DDD5CB' },
  8:  { key: '#FCDCB0', fill: '#C5BDB2', rim: '#BFA36A', ambient: '#D8D0C6' },
  9:  { key: '#FCE4C0', fill: '#CCC4B9', rim: '#C9A96E', ambient: '#E0D8CE' },
  10: { key: '#FFF5E6', fill: '#E8DDD0', rim: '#D4B87A', ambient: '#F5F0EB' },
};

function getPalette(scene: number) {
  return SCENE_PALETTES[scene] ?? SCENE_PALETTES[1];
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function StudioLighting({ scene = 1, intensity = 1 }: StudioLightingProps) {
  const keyRef = useRef<THREE.SpotLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  /* Pre‑create colour objects so we don't allocate every frame */
  const colors = useMemo(
    () => ({
      key: new THREE.Color(),
      fill: new THREE.Color(),
      rim: new THREE.Color(),
      ambient: new THREE.Color(),
      target: {
        key: new THREE.Color(),
        fill: new THREE.Color(),
        rim: new THREE.Color(),
        ambient: new THREE.Color(),
      },
    }),
    [],
  );

  useFrame(() => {
    const palette = getPalette(scene);
    colors.target.key.set(palette.key);
    colors.target.fill.set(palette.fill);
    colors.target.rim.set(palette.rim);
    colors.target.ambient.set(palette.ambient);

    /* Smoothly lerp towards target colours */
    const lerpSpeed = 0.04;
    colors.key.lerp(colors.target.key, lerpSpeed);
    colors.fill.lerp(colors.target.fill, lerpSpeed);
    colors.rim.lerp(colors.target.rim, lerpSpeed);
    colors.ambient.lerp(colors.target.ambient, lerpSpeed);

    if (keyRef.current) {
      keyRef.current.color.copy(colors.key);
      keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, 2.5 * intensity, lerpSpeed);
    }
    if (fillRef.current) {
      fillRef.current.color.copy(colors.fill);
      fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, 1.2 * intensity, lerpSpeed);
    }
    if (rimRef.current) {
      rimRef.current.color.copy(colors.rim);
      rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, 1.8 * intensity, lerpSpeed);
    }
    if (ambientRef.current) {
      ambientRef.current.color.copy(colors.ambient);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, 0.4 * intensity, lerpSpeed);
    }
  });

  return (
    <>
      {/* Key light – main illumination, upper left */}
      <spotLight
        ref={keyRef}
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.5 * intensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill light – softer, opposite side */}
      <directionalLight
        ref={fillRef}
        position={[-4, 3, 2]}
        intensity={1.2 * intensity}
      />

      {/* Rim / back light – creates edge glow */}
      <pointLight
        ref={rimRef}
        position={[0, 3, -5]}
        intensity={1.8 * intensity}
      />

      {/* Ambient base */}
      <ambientLight ref={ambientRef} intensity={0.4 * intensity} />
    </>
  );
}
