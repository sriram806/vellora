'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TShirtModel from './TShirtModel';
import PantsModel from './PantsModel';
import SneakerModel from './SneakerModel';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface OutfitModelProps {
  scrollProgress?: number;
  mouseX?: number;
  mouseY?: number;
  visible?: boolean;
  opacity?: number;
  rotationY?: number;
  /** Overall scale of the outfit group */
  scale?: number;
  /** Whether to animate the "collection reveal" entrance */
  revealAnimation?: boolean;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function OutfitModel({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  visible = true,
  opacity = 1,
  rotationY,
  scale = 1,
  revealAnimation = false,
}: OutfitModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothValues = useRef({
    scale: revealAnimation ? 0 : scale,
    rotY: 0,
    tshirtY: 1.1,
    pantsY: -0.3,
    sneakerY: -1.5,
  });

  /* Per-frame animation */
  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const speed = 1 - Math.pow(0.001, delta);

    /* Scale – animate entrance if revealAnimation is on */
    const targetScale = visible ? scale : 0;
    smoothValues.current.scale += (targetScale - smoothValues.current.scale) * speed;
    groupRef.current.scale.setScalar(smoothValues.current.scale);

    /* Rotation */
    const targetRotY = rotationY !== undefined ? rotationY : scrollProgress * Math.PI * 0.5 + mouseX * 0.1;
    smoothValues.current.rotY += (targetRotY - smoothValues.current.rotY) * speed;
    groupRef.current.rotation.y = smoothValues.current.rotY;

    /* Outfit pieces spread / gather based on scroll */
    const spread = Math.sin(scrollProgress * Math.PI) * 0.15;
    smoothValues.current.tshirtY += (1.1 + spread - smoothValues.current.tshirtY) * speed;
    smoothValues.current.pantsY += (-0.3 - smoothValues.current.pantsY) * speed;
    smoothValues.current.sneakerY += (-1.5 - spread - smoothValues.current.sneakerY) * speed;
  });

  /* Start reveal animation after mount */
  useEffect(() => {
    if (revealAnimation) {
      smoothValues.current.scale = 0;
    }
  }, [revealAnimation]);

  if (!visible && smoothValues.current.scale < 0.01) return null;

  return (
    <group ref={groupRef} dispose={null}>
      {/* T-Shirt – upper body */}
      <TShirtModel
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={visible}
        opacity={opacity}
        rotationY={0}
        rotationX={0}
        position={[0, smoothValues.current.tshirtY, 0]}
        scale={0.9}
        color="#F5F0EB"
      />

      {/* Pants – mid body */}
      <PantsModel
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={visible}
        opacity={opacity}
        rotationY={0}
        rotationX={0}
        position={[0, smoothValues.current.pantsY, 0]}
        scale={0.85}
        color="#2C2C2C"
      />

      {/* Left Sneaker */}
      <SneakerModel
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={visible}
        opacity={opacity}
        rotationY={0}
        rotationX={0}
        position={[-0.2, smoothValues.current.sneakerY, 0]}
        scale={0.7}
        color="#F5F0EB"
        accentColor="#C9A96E"
      />

      {/* Right Sneaker */}
      <SneakerModel
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        visible={visible}
        opacity={opacity}
        rotationY={0}
        rotationX={0}
        position={[0.2, smoothValues.current.sneakerY, 0]}
        scale={0.7}
        color="#F5F0EB"
        accentColor="#C9A96E"
      />
    </group>
  );
}
