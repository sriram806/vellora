'use client';

import React, { Suspense, useRef, useState, useCallback, CSSProperties, ReactNode } from 'react';
import { Canvas, type RootState } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload, Html, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface SceneProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Initial camera position – default [0, 0, 5] */
  cameraPosition?: [number, number, number];
  /** Whether shadows should be enabled */
  shadows?: boolean;
  /** Called once the Canvas has been created */
  onCreated?: (state: RootState) => void;
  /** Pointer move forwarded to parent (normalised -1…1) */
  onPointerMove?: (x: number, y: number) => void;
}

/* ------------------------------------------------------------------ */
/* Fallback spinner shown while Suspense children load                 */
/* ------------------------------------------------------------------ */
function LoadingSpinner() {
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid rgba(201,169,110,0.25)',
            borderTopColor: '#C9A96E',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#C9A96E',
          }}
        >
          Loading
        </span>
        {/* inline keyframe – avoids needing a global stylesheet */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/* Scene component                                                     */
/* ------------------------------------------------------------------ */
export default function Scene({
  children,
  className = '',
  style,
  cameraPosition = [0, 0, 5],
  shadows = true,
  onCreated,
  onPointerMove,
}: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dpr, setDpr] = useState(1.5);

  /* normalise pointer position to -1…1 and forward to parent */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!onPointerMove) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      onPointerMove(x, y);
    },
    [onPointerMove],
  );

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      onPointerMove={handlePointerMove}
    >
      <Canvas
        ref={canvasRef}
        shadows={shadows ? { type: THREE.PCFShadowMap } : false}
        dpr={dpr}
        camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={(state) => {
          // Tone mapping is handled by post-processing; keep linear here
          state.gl.toneMapping = 0; // NoToneMapping
          onCreated?.(state);
        }}
        style={{ background: 'transparent' }}
      >
        {/* Adaptive performance helpers */}
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(2, dpr + 0.25))}
          onDecline={() => setDpr(Math.max(1, dpr - 0.25))}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* All children (models, lights, post-processing) inside Suspense */}
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>

        {/* Pre-load drei assets */}
        <Preload all />
      </Canvas>
    </div>
  );
}
