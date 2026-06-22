'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface PantsModelProps {
  scrollProgress?: number;
  mouseX?: number;
  mouseY?: number;
  visible?: boolean;
  opacity?: number;
  rotationY?: number;
  rotationX?: number;
  color?: string;
  position?: [number, number, number];
  scale?: number;
}

/* ------------------------------------------------------------------ */
/* Geometry builder                                                    */
/* ------------------------------------------------------------------ */
function usePantsGeometries() {
  return useMemo(() => {
    /* ---- WAISTBAND (flattened torus / ring) ---- */
    const waistbandGeom = new THREE.TorusGeometry(0.38, 0.06, 12, 32);

    /* ---- UPPER HIP / BELT AREA ---- */
    const hipShape = new THREE.Shape();
    hipShape.moveTo(-0.42, 0);
    hipShape.lineTo(-0.42, -0.35);
    hipShape.quadraticCurveTo(-0.38, -0.42, -0.06, -0.42);
    hipShape.lineTo(0.06, -0.42);
    hipShape.quadraticCurveTo(0.38, -0.42, 0.42, -0.35);
    hipShape.lineTo(0.42, 0);
    hipShape.quadraticCurveTo(0, 0.04, -0.42, 0);

    const hipExtrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
      curveSegments: 20,
    };
    const hipGeom = new THREE.ExtrudeGeometry(hipShape, hipExtrudeSettings);
    hipGeom.center();

    /* ---- LEFT LEG (lathe geometry for tapered trouser leg) ---- */
    const legProfile = [
      new THREE.Vector2(0.18, 0),     // top – wider
      new THREE.Vector2(0.17, -0.15),
      new THREE.Vector2(0.16, -0.35),
      new THREE.Vector2(0.15, -0.55),  // knee area
      new THREE.Vector2(0.145, -0.70),
      new THREE.Vector2(0.14, -0.85),
      new THREE.Vector2(0.135, -1.0),  // ankle – narrower
    ];
    const leftLegGeom = new THREE.LatheGeometry(legProfile, 24);

    /* ---- RIGHT LEG (clone) ---- */
    const rightLegGeom = leftLegGeom.clone();

    /* ---- FLY / SEAM DETAIL ---- */
    const seamGeom = new THREE.BoxGeometry(0.02, 0.3, 0.04);

    /* ---- BELT LOOP DETAIL ---- */
    const beltLoopGeom = new THREE.BoxGeometry(0.03, 0.08, 0.06);

    return { waistbandGeom, hipGeom, leftLegGeom, rightLegGeom, seamGeom, beltLoopGeom };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Material                                                            */
/* ------------------------------------------------------------------ */
function usePantsMaterial(color: string, opacity: number) {
  return useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.65,
      metalness: 0.0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.7,
      sheen: 0.6,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color('#E8DDD0'),
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    });
  }, [color, opacity]);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function PantsModel({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  visible = true,
  opacity = 1,
  rotationY,
  rotationX,
  color = '#2C2C2C',
  position = [0, 0, 0],
  scale = 1,
}: PantsModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothRotation = useRef({ x: 0, y: 0 });

  const { waistbandGeom, hipGeom, leftLegGeom, rightLegGeom, seamGeom, beltLoopGeom } =
    usePantsGeometries();
  const material = usePantsMaterial(color, opacity);

  /* Accent material for seam / detail */
  const detailMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1A1A1A'),
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity,
      }),
    [opacity],
  );

  useEffect(() => {
    material.opacity = opacity;
    detailMaterial.opacity = opacity;
    material.needsUpdate = true;
    detailMaterial.needsUpdate = true;
  }, [material, detailMaterial, opacity]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const targetY = rotationY !== undefined ? rotationY : scrollProgress * Math.PI * 2 + mouseX * 0.12;
    const targetX = rotationX !== undefined ? rotationX : mouseY * 0.08;

    const speed = 1 - Math.pow(0.001, delta);
    smoothRotation.current.x += (targetX - smoothRotation.current.x) * speed;
    smoothRotation.current.y += (targetY - smoothRotation.current.y) * speed;

    groupRef.current.rotation.x = smoothRotation.current.x;
    groupRef.current.rotation.y = smoothRotation.current.y;
  });

  useEffect(() => {
    return () => {
      waistbandGeom.dispose();
      hipGeom.dispose();
      leftLegGeom.dispose();
      rightLegGeom.dispose();
      seamGeom.dispose();
      beltLoopGeom.dispose();
      material.dispose();
      detailMaterial.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25} floatingRange={[-0.04, 0.04]}>
      <group ref={groupRef} position={position} scale={scale} dispose={null}>
        {/* Waistband */}
        <mesh
          geometry={waistbandGeom}
          material={material}
          position={[0, 0.02, 0.14]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        />

        {/* Hip / upper section */}
        <mesh geometry={hipGeom} material={material} position={[0, -0.05, 0]} castShadow receiveShadow />

        {/* Left leg */}
        <mesh
          geometry={leftLegGeom}
          material={material}
          position={[-0.2, -0.38, 0.14]}
          castShadow
          receiveShadow
        />

        {/* Right leg */}
        <mesh
          geometry={rightLegGeom}
          material={material}
          position={[0.2, -0.38, 0.14]}
          castShadow
          receiveShadow
        />

        {/* Front seam detail */}
        <mesh geometry={seamGeom} material={detailMaterial} position={[0, -0.2, 0.28]} />

        {/* Belt loops */}
        {[-0.28, -0.1, 0.1, 0.28].map((x, i) => (
          <mesh
            key={i}
            geometry={beltLoopGeom}
            material={detailMaterial}
            position={[x, 0.02, 0.28]}
          />
        ))}
      </group>
    </Float>
  );
}
