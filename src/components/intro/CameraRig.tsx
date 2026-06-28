'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface CameraRigProps {
  /** Called when camera choreography finishes (~15s) */
  onComplete?: () => void;
  /** If true, the camera immediately pauses and stays at its current pos */
  paused?: boolean;
  onActiveIndexChange?: (index: number) => void;
}

/* ------------------------------------------------------------------ */
/* Smooth damped lookAt helper                                         */
/* ------------------------------------------------------------------ */
const _lookTarget = new THREE.Vector3();
const _currentLook = new THREE.Vector3(0, 0.3, 0);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function CameraRig({ onComplete, paused = false, onActiveIndexChange }: CameraRigProps) {
  const { camera } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /* Proxy object that GSAP animates; useFrame reads it each frame */
  const target = useRef({
    x: 0,
    y: 0.3,
    z: 8,
    lookX: 0,
    lookY: 0.3,
    lookZ: 0,
  });

  /* Smooth interpolation factor */
  const lerpFactor = 0.045;

  /* ── GSAP camera choreography timeline ────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
      delay: 0.1,
    });
    timelineRef.current = tl;

    // Focus 0: Shirt 1 (Index 0) - Duration: 3.0s
    tl.to(target.current, {
      x: -2.2,
      y: 0.3,
      z: 2.8,
      lookX: -2.2,
      lookY: 0.3,
      lookZ: 0.3,
      duration: 3.0,
      ease: 'power2.inOut',
      onStart: () => onActiveIndexChange?.(0),
    });

    // Focus 1: Hoodie 1 (Index 1) - Duration: 2.5s
    tl.to(target.current, {
      x: 0.0,
      y: 1.6,
      z: 1.5,
      lookX: 0.0,
      lookY: 1.6,
      lookZ: -1.0,
      duration: 2.5,
      ease: 'power2.inOut',
      onStart: () => onActiveIndexChange?.(1),
    });

    // Focus 2: Shirt 2 (Index 2) - Duration: 2.5s
    tl.to(target.current, {
      x: 2.2,
      y: 0.3,
      z: 2.8,
      lookX: 2.2,
      lookY: 0.3,
      lookZ: 0.3,
      duration: 2.5,
      ease: 'power2.inOut',
      onStart: () => onActiveIndexChange?.(2),
    });

    // Shot 8: Collection Finale Pullback - Duration: 2.0s
    tl.to(target.current, {
      x: 0,
      y: 0.3,
      z: 6.8,
      lookX: 0,
      lookY: 0.3,
      lookZ: 0,
      duration: 2.0,
      ease: 'power3.inOut',
      onStart: () => onActiveIndexChange?.(-1), // highlight all products
    });
  }, { dependencies: [] });

  /* ── Per-frame smooth camera interpolation ────────────────────── */
  useFrame((state) => {
    if (paused) return;
    const t = target.current;

    /* Smoothly interpolate camera position */
    camera.position.x += (t.x - camera.position.x) * lerpFactor;
    camera.position.y += (t.y - camera.position.y) * lerpFactor;
    camera.position.z += (t.z - camera.position.z) * lerpFactor;

    /* Smoothly interpolate lookAt target */
    _currentLook.x += (t.lookX - _currentLook.x) * lerpFactor;
    _currentLook.y += (t.lookY - _currentLook.y) * lerpFactor;
    _currentLook.z += (t.lookZ - _currentLook.z) * lerpFactor;

    /* Add subtle camera sway for cinematic feel */
    const time = state.clock.elapsedTime;
    const swayX = Math.sin(time * 0.3) * 0.015;
    const swayY = Math.cos(time * 0.25) * 0.01;

    _lookTarget.set(
      _currentLook.x + swayX,
      _currentLook.y + swayY,
      _currentLook.z,
    );

    camera.lookAt(_lookTarget);
  });

  return null; // CameraRig is a logic-only component
}
