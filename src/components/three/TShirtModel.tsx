'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface TShirtModelProps {
  /** 0‑1 scroll progress */
  scrollProgress?: number;
  /** Normalised mouse position (-1…1) for subtle reactive tilt */
  mouseX?: number;
  mouseY?: number;
  visible?: boolean;
  opacity?: number;
  /** External rotation override (radians) */
  rotationY?: number;
  rotationX?: number;
  /** Colour override – default off‑white cream */
  color?: string;
  position?: [number, number, number];
  scale?: number;
}

/* ------------------------------------------------------------------ */
/* Geometry builder – creates the full T‑shirt mesh group              */
/* ------------------------------------------------------------------ */
function useTShirtGeometries() {
  return useMemo(() => {
    /* ---- TORSO (front + back panel as a flattened box) ---- */
    const torsoShape = new THREE.Shape();
    // Start bottom‑left, trace clockwise
    torsoShape.moveTo(-0.55, -0.8);
    torsoShape.lineTo(-0.55, 0.25);
    // Left shoulder curve
    torsoShape.quadraticCurveTo(-0.55, 0.55, -0.35, 0.6);
    // Neckline dip
    torsoShape.quadraticCurveTo(-0.12, 0.72, 0, 0.55);
    torsoShape.quadraticCurveTo(0.12, 0.72, 0.35, 0.6);
    // Right shoulder
    torsoShape.quadraticCurveTo(0.55, 0.55, 0.55, 0.25);
    torsoShape.lineTo(0.55, -0.8);
    // Bottom hem with slight curve
    torsoShape.quadraticCurveTo(0, -0.85, -0.55, -0.8);

    const torsoExtrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 24,
    };
    const torsoGeom = new THREE.ExtrudeGeometry(torsoShape, torsoExtrudeSettings);
    torsoGeom.center();

    /* ---- LEFT SLEEVE ---- */
    const sleeveShape = new THREE.Shape();
    sleeveShape.moveTo(0, 0);
    sleeveShape.lineTo(-0.45, -0.15);
    sleeveShape.quadraticCurveTo(-0.55, -0.2, -0.5, -0.35);
    sleeveShape.lineTo(-0.15, -0.3);
    sleeveShape.quadraticCurveTo(0, -0.2, 0, 0);

    const sleeveExtrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
      curveSegments: 16,
    };
    const leftSleeveGeom = new THREE.ExtrudeGeometry(sleeveShape, sleeveExtrudeSettings);
    leftSleeveGeom.center();

    /* ---- RIGHT SLEEVE (mirror) ---- */
    const rightSleeveGeom = leftSleeveGeom.clone();
    rightSleeveGeom.scale(-1, 1, 1);

    /* ---- NECKLINE COLLAR (torus ring) ---- */
    const collarGeom = new THREE.TorusGeometry(0.14, 0.03, 12, 32);

    return { torsoGeom, leftSleeveGeom, rightSleeveGeom, collarGeom };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Material                                                            */
/* ------------------------------------------------------------------ */
function useTShirtMaterial(color: string, opacity: number) {
  return useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.7,
      metalness: 0.0,
      clearcoat: 0.15,
      clearcoatRoughness: 0.6,
      sheen: 1.0,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color('#F5E6D3'),
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    });
  }, [color, opacity]);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function TShirtModel({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  visible = true,
  opacity = 1,
  rotationY,
  rotationX,
  color = '#F5F0EB',
  position = [0, 0, 0],
  scale = 1,
}: TShirtModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothRotation = useRef({ x: 0, y: 0 });

  const { torsoGeom, leftSleeveGeom, rightSleeveGeom, collarGeom } = useTShirtGeometries();
  const material = useTShirtMaterial(color, opacity);

  /* Update material opacity reactively */
  useEffect(() => {
    material.opacity = opacity;
    material.needsUpdate = true;
  }, [material, opacity]);

  /* Per‑frame animation */
  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    /* Target rotation – scroll‑driven or mouse‑reactive */
    const targetY = rotationY !== undefined ? rotationY : scrollProgress * Math.PI * 2 + mouseX * 0.15;
    const targetX = rotationX !== undefined ? rotationX : mouseY * 0.1;

    /* Smooth interpolation (exponential ease) */
    const speed = 1 - Math.pow(0.001, delta);
    smoothRotation.current.x += (targetX - smoothRotation.current.x) * speed;
    smoothRotation.current.y += (targetY - smoothRotation.current.y) * speed;

    groupRef.current.rotation.x = smoothRotation.current.x;
    groupRef.current.rotation.y = smoothRotation.current.y;
  });

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      torsoGeom.dispose();
      leftSleeveGeom.dispose();
      rightSleeveGeom.dispose();
      collarGeom.dispose();
      material.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
      <group ref={groupRef} position={position} scale={scale} dispose={null}>
        {/* Torso */}
        <mesh geometry={torsoGeom} material={material} castShadow receiveShadow />

        {/* Left sleeve */}
        <mesh
          geometry={leftSleeveGeom}
          material={material}
          position={[-0.52, 0.18, 0]}
          castShadow
        />

        {/* Right sleeve */}
        <mesh
          geometry={rightSleeveGeom}
          material={material}
          position={[0.52, 0.18, 0]}
          castShadow
        />

        {/* Collar */}
        <mesh
          geometry={collarGeom}
          material={material}
          position={[0, 0.42, 0.15]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </Float>
  );
}
