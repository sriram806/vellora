'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const PRODUCT_POSITIONS = [
  [-2.2, 0.3, 0.3],   // shirt1  (index 0)
  [0.0, 1.6, -1.0],   // hoodie1 (index 1)
  [2.2, 0.3, 0.3],    // shirt2  (index 2)
];

interface IntroLightsProps {
  activeIndex: number;
}

export default function IntroLights({ activeIndex }: IntroLightsProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const spotlightTargetRef = useRef<THREE.Object3D>(null!);

  if (!spotlightTargetRef.current) {
    spotlightTargetRef.current = new THREE.Object3D();
  }

  useEffect(() => {
    if (spotLightRef.current && spotlightTargetRef.current) {
      spotLightRef.current.target = spotlightTargetRef.current;
    }
  }, []);

  useFrame((state) => {
    if (!spotLightRef.current || !spotlightTargetRef.current) return;
    const t = state.clock.elapsedTime;

    // Default values (Wide/ambient lighting)
    let targetX = 0;
    let targetY = 0.3;
    let targetZ = 0;
    let targetIntensity = 3.5;
    let targetAngle = 0.45;

    // Spot coordinates setup
    let spotX = 5;
    let spotY = 8;
    let spotZ = 5;

    if (activeIndex >= 0 && activeIndex < PRODUCT_POSITIONS.length) {
      const pos = PRODUCT_POSITIONS[activeIndex];
      targetX = pos[0];
      targetY = pos[1];
      targetZ = pos[2];

      if (activeIndex === 2) {
        // Scene Three (Shirt 2): lighting rotates around the shirt.
        const angle = t * 1.6;
        spotX = pos[0] + Math.sin(angle) * 3;
        spotY = pos[1] + 3.5;
        spotZ = pos[2] + Math.cos(angle) * 3;
        targetAngle = 0.35;
        targetIntensity = 4.2;
      } else {
        // Normal showcase lights from above/front
        spotX = pos[0] + 1;
        spotY = pos[1] + 4;
        spotZ = pos[2] + 2.5;
        targetAngle = 0.38;
        targetIntensity = 3.8;
      }
    } else {
      // Grand Finale / Out-of-bounds: activeIndex is -1
      spotX = 0;
      spotY = 8;
      spotZ = 6;
      targetX = 0;
      targetY = 0.3;
      targetZ = 0;
      targetAngle = 0.75;
      targetIntensity = 5.0;
    }

    // Smoothly interpolate spotlight position
    spotLightRef.current.position.x += (spotX - spotLightRef.current.position.x) * 0.08;
    spotLightRef.current.position.y += (spotY - spotLightRef.current.position.y) * 0.08;
    spotLightRef.current.position.z += (spotZ - spotLightRef.current.position.z) * 0.08;

    // Smoothly interpolate target coordinate
    spotlightTargetRef.current.position.x += (targetX - spotlightTargetRef.current.position.x) * 0.08;
    spotlightTargetRef.current.position.y += (targetY - spotlightTargetRef.current.position.y) * 0.08;
    spotlightTargetRef.current.position.z += (targetZ - spotlightTargetRef.current.position.z) * 0.08;

    // Smoothly interpolate intensity and angle
    spotLightRef.current.intensity = THREE.MathUtils.lerp(spotLightRef.current.intensity, targetIntensity, 0.08);
    spotLightRef.current.angle = THREE.MathUtils.lerp(spotLightRef.current.angle, targetAngle, 0.08);
  });

  return (
    <>
      <primitive object={spotlightTargetRef.current} />

      {/* ── Key light: Dynamic spotlight ───────────────────────────── */}
      <spotLight
        ref={spotLightRef}
        angle={0.45}
        penumbra={0.9}
        intensity={3.5}
        color="#FFF5E6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* ── Cool blue rim light ─────────────────────────────────── */}
      <pointLight
        position={[-5, 3, -5]}
        intensity={1.8}
        color="#4488CC"
        decay={2}
      />

      {/* ── Warm fill light ─────────────────────────────────────── */}
      <directionalLight
        position={[-4, 5, 3]}
        intensity={1.2}
        color="#FFE8C8"
      />

      {/* ── Gold accent light ───────────────────────────────────── */}
      <pointLight
        position={[0, 6, 0]}
        intensity={1.0}
        color="#C9A96E"
        decay={2}
      />

      {/* ── Low ground bounce ───────────────────────────────────── */}
      <pointLight
        position={[0, -3, 2]}
        intensity={0.4}
        color="#8899BB"
        decay={2}
      />

      {/* ── Ambient base ────────────────────────────────────────── */}
      <ambientLight intensity={0.25} color="#F5F0EB" />

      {/* ── Contact shadows on the floor ────────────────────────── */}
      <ContactShadows
        position={[0, -2.49, 0]}
        opacity={0.35}
        scale={20}
        blur={2.5}
        far={6}
        color="#000000"
      />
    </>
  );
}
