'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  PerformanceMonitor,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import FloatingProduct from './FloatingProduct';
import CameraRig from './CameraRig';
import IntroEnvironment from './IntroEnvironment';
import IntroLights from './IntroLights';
import IntroParticles from './IntroParticles';

/* ------------------------------------------------------------------ */
/* Product arrangement                                                 */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  {
    id: 'shirt1',
    texturePath: '/images/clothes/shirt1.webp',
    position: [-2.2, 0.3, 0.3] as [number, number, number],
    rotation: -0.15,
    scale: 1.0,
    floatSpeed: 1.0,
    floatAmplitude: 0.07,
    rotationSpeed: 0.1,
  },
  {
    id: 'hoodie1',
    texturePath: '/images/clothes/hoodie1.webp',
    position: [0.0, 1.6, -1.0] as [number, number, number],
    rotation: 0.1,
    scale: 0.95,
    floatSpeed: 0.8,
    floatAmplitude: 0.1,
    rotationSpeed: 0.08,
  },
  {
    id: 'shirt2',
    texturePath: '/images/clothes/shirt2.webp',
    position: [2.2, 0.3, 0.3] as [number, number, number],
    rotation: 0.15,
    scale: 1.0,
    floatSpeed: 0.9,
    floatAmplitude: 0.09,
    rotationSpeed: 0.11,
  },
];

/* ------------------------------------------------------------------ */
/* Texture preloader — placed inside Canvas context                    */
/* ------------------------------------------------------------------ */
function TexturePreloader() {
  /* Preload all product textures so they're cached when products mount */
  useTexture(PRODUCTS.map((p) => p.texturePath));
  return null;
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface IntroSceneProps {
  /** Called when the camera choreography is complete */
  onCameraComplete?: () => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function IntroScene({ onCameraComplete }: IntroSceneProps) {
  const [dpr, setDpr] = useState(1.5);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={dpr}
        camera={{ position: [0, 0.3, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl, scene }) => {
          /* Must set before Suspense resolves — otherwise alpha:false clears white */
          gl.setClearColor('#040404', 1);
          scene.background = new THREE.Color('#040404');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        {/* ── Performance management ─────────────────────────────── */}
        <PerformanceMonitor
          onIncline={() => setDpr((current) => Math.min(2, current + 0.25))}
          onDecline={() => setDpr((current) => Math.max(1, current - 0.25))}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Background + fog outside Suspense so the canvas never clears white */}
        <color attach="background" args={['#040404']} />
        <fog attach="fog" args={['#040404', 8, 28]} />

        <Suspense fallback={null}>
          <TexturePreloader />
          <IntroEnvironment />
          <IntroLights activeIndex={activeIndex} />
          {PRODUCTS.map((product, idx) => (
            <FloatingProduct
              key={product.id}
              idx={idx}
              texturePath={product.texturePath}
              position={product.position}
              rotation={product.rotation}
              scale={product.scale}
              floatSpeed={product.floatSpeed}
              floatAmplitude={product.floatAmplitude}
              rotationSpeed={product.rotationSpeed}
              highlighted={activeIndex === -1 || idx === activeIndex}
            />
          ))}
          <IntroParticles />
          <CameraRig onComplete={onCameraComplete} onActiveIndexChange={setActiveIndex} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
}
