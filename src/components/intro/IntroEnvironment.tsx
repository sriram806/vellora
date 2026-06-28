'use client';

import React from 'react';
import { Environment, MeshReflectorMaterial } from '@react-three/drei';

/* ------------------------------------------------------------------ */
/* Premium dark showroom environment                                   */
/* ------------------------------------------------------------------ */
export default function IntroEnvironment() {
  return (
    <>
      {/* ── HDRI environment for reflections ─────────────────────── */}
      <Environment preset="studio" environmentIntensity={0.4} />

      {/* ── Reflective glossy floor ──────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshPhysicalMaterial
          color="#010101"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </>
  );
}
