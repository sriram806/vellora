'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */
const DUST_COUNT = 180;
const DUST_VOLUME = { x: 16, y: 10, z: 12 };

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function IntroParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  /* ── Generate random dust positions + velocities once ─────────── */
  const { positions, velocities, opacities } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const vel = new Float32Array(DUST_COUNT * 3);
    const opa = new Float32Array(DUST_COUNT);

    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * DUST_VOLUME.x;
      pos[i3 + 1] = (Math.random() - 0.5) * DUST_VOLUME.y;
      pos[i3 + 2] = (Math.random() - 0.5) * DUST_VOLUME.z;

      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = Math.random() * 0.004 + 0.001; // upward bias
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

      opa[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions: pos, velocities: vel, opacities: opa };
  }, []);

  /* ── Particle material ────────────────────────────────────────── */
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.025,
      color: new THREE.Color('#C9A96E'),
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  /* ── Animation loop ───────────────────────────────────────────── */
  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      /* Wrap particles when they drift out of volume */
      if (arr[i3 + 1] > DUST_VOLUME.y / 2) {
        arr[i3 + 1] = -DUST_VOLUME.y / 2;
        arr[i3] = (Math.random() - 0.5) * DUST_VOLUME.x;
        arr[i3 + 2] = (Math.random() - 0.5) * DUST_VOLUME.z;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <>
      {/* ── Dust motes ──────────────────────────────────────────── */}
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
      </points>

      {/* ── Sparkles (drei helper) ──────────────────────────────── */}
      <Sparkles
        count={40}
        size={2.5}
        speed={0.25}
        scale={[14, 8, 10]}
        color="#C9A96E"
        opacity={0.3}
      />

      {/* ── Secondary smaller sparkles for depth ────────────────── */}
      <Sparkles
        count={25}
        size={1.2}
        speed={0.15}
        scale={[10, 6, 8]}
        color="#E8DDD0"
        opacity={0.15}
      />
    </>
  );
}
