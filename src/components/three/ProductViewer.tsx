'use client';

import { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  AdaptiveDpr,
} from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import TShirtModel from './TShirtModel';
import PantsModel from './PantsModel';
import SneakerModel from './SneakerModel';
import StudioLighting from './StudioLighting';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export type ProductType = 'tshirt' | 'pants' | 'sneaker';

export interface ProductViewerProps {
  /** Which product to display */
  product?: ProductType;
  /** Product colour */
  color?: string;
  /** Container className */
  className?: string;
  /** Show controls UI */
  showControls?: boolean;
}

/* ------------------------------------------------------------------ */
/* Product Renderer                                                    */
/* ------------------------------------------------------------------ */
function ProductMesh({ product, color }: { product: ProductType; color: string }) {
  switch (product) {
    case 'tshirt':
      return (
        <TShirtModel
          visible
          opacity={1}
          rotationY={0}
          rotationX={0}
          color={color}
          scale={1.6}
          position={[0, 0, 0]}
        />
      );
    case 'pants':
      return (
        <PantsModel
          visible
          opacity={1}
          rotationY={0}
          rotationX={0}
          color={color}
          scale={1.2}
          position={[0, 0.4, 0]}
        />
      );
    case 'sneaker':
      return (
        <SneakerModel
          visible
          opacity={1}
          rotationY={0}
          rotationX={-0.3}
          color={color}
          scale={2}
          position={[0, 0, 0]}
        />
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Loading Spinner                                                     */
/* ------------------------------------------------------------------ */
function Spinner() {
  return (
    <Html center>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 24,
            height: 24,
            border: '2px solid rgba(201,169,110,0.3)',
            borderTopColor: '#C9A96E',
            borderRadius: '50%',
            animation: 'pv-spin 0.7s linear infinite',
          }}
        />
        <style>{`@keyframes pv-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/* Control Button                                                      */
/* ------------------------------------------------------------------ */
function ControlButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(201,169,110,0.4)',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#C9A96E',
        fontSize: 16,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.background = '#C9A96E';
        (e.target as HTMLElement).style.color = '#FFF';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
        (e.target as HTMLElement).style.color = '#C9A96E';
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Product Viewer Component                                            */
/* ------------------------------------------------------------------ */
export default function ProductViewer({
  product = 'tshirt',
  color = '#F5F0EB',
  className = '',
  showControls = true,
}: ProductViewerProps) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleReset = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 400,
        background: 'linear-gradient(180deg, #FAFAF8 0%, #F5F0EB 100%)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <AdaptiveDpr pixelated />

        <Suspense fallback={<Spinner />}>
          {/* Lighting */}
          <StudioLighting scene={1} intensity={1} />

          {/* Environment for realistic reflections */}
          <Environment preset="studio" />

          {/* Product */}
          <ProductMesh product={product} color={color} />

          {/* Contact shadow on ground plane */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={5}
            blur={2.5}
            far={4}
          />

          {/* Orbit controls */}
          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enablePan={false}
            enableZoom
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.5}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* UI Controls overlay */}
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 10,
          }}
        >
          <ControlButton onClick={toggleAutoRotate} title={autoRotate ? 'Pause rotation' : 'Auto-rotate'}>
            {autoRotate ? '⏸' : '▶'}
          </ControlButton>
          <ControlButton onClick={handleReset} title="Reset view">
            ↺
          </ControlButton>
        </div>
      )}

      {/* Drag hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
