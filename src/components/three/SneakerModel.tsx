'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface SneakerModelProps {
  scrollProgress?: number;
  mouseX?: number;
  mouseY?: number;
  visible?: boolean;
  opacity?: number;
  rotationY?: number;
  rotationX?: number;
  /** Upper colour */
  color?: string;
  /** Sole colour */
  soleColor?: string;
  /** Accent colour (swoosh / detail) */
  accentColor?: string;
  position?: [number, number, number];
  scale?: number;
}

/* ------------------------------------------------------------------ */
/* Geometry builder                                                    */
/* ------------------------------------------------------------------ */
function useSneakerGeometries() {
  return useMemo(() => {
    /* ---- SOLE – extruded shape ---- */
    const soleShape = new THREE.Shape();
    soleShape.moveTo(-0.45, -0.15);
    soleShape.quadraticCurveTo(-0.5, 0, -0.4, 0.15);
    soleShape.lineTo(-0.25, 0.2);
    soleShape.quadraticCurveTo(0, 0.25, 0.3, 0.2);
    soleShape.quadraticCurveTo(0.5, 0.15, 0.55, 0);
    soleShape.quadraticCurveTo(0.5, -0.18, 0.3, -0.2);
    soleShape.lineTo(-0.25, -0.2);
    soleShape.quadraticCurveTo(-0.5, -0.18, -0.45, -0.15);

    const soleGeom = new THREE.ExtrudeGeometry(soleShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 24,
    });
    soleGeom.center();

    /* ---- MIDSOLE (thicker, slightly larger) ---- */
    const midsoleShape = soleShape.clone();
    const midsoleGeom = new THREE.ExtrudeGeometry(midsoleShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.025,
      bevelSegments: 3,
      curveSegments: 24,
    });
    midsoleGeom.center();

    /* ---- UPPER – front portion (like a rounded box rising from sole) ---- */
    const upperShape = new THREE.Shape();
    upperShape.moveTo(-0.38, -0.1);
    upperShape.quadraticCurveTo(-0.42, 0.05, -0.32, 0.15);
    upperShape.lineTo(-0.15, 0.18);
    upperShape.quadraticCurveTo(0, 0.2, 0.2, 0.18);
    upperShape.quadraticCurveTo(0.4, 0.12, 0.42, 0);
    upperShape.quadraticCurveTo(0.4, -0.12, 0.2, -0.15);
    upperShape.lineTo(-0.2, -0.15);
    upperShape.quadraticCurveTo(-0.4, -0.12, -0.38, -0.1);

    const upperGeom = new THREE.ExtrudeGeometry(upperShape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 20,
    });
    upperGeom.center();

    /* ---- TONGUE ---- */
    const tongueGeom = new THREE.BoxGeometry(0.14, 0.04, 0.2);

    /* ---- HEEL TAB ---- */
    const heelGeom = new THREE.BoxGeometry(0.18, 0.18, 0.06);

    /* ---- SWOOSH / ACCENT STRIPE ---- */
    const swooshShape = new THREE.Shape();
    swooshShape.moveTo(-0.3, 0);
    swooshShape.quadraticCurveTo(-0.1, 0.08, 0.15, 0.05);
    swooshShape.quadraticCurveTo(0.35, 0.02, 0.4, -0.02);
    swooshShape.lineTo(0.35, -0.05);
    swooshShape.quadraticCurveTo(0.3, -0.02, 0.1, 0);
    swooshShape.quadraticCurveTo(-0.1, 0.02, -0.3, -0.03);
    swooshShape.closePath();

    const swooshGeom = new THREE.ExtrudeGeometry(swooshShape, {
      depth: 0.01,
      bevelEnabled: false,
      curveSegments: 20,
    });
    swooshGeom.center();

    /* ---- LACE HOLES (tiny torus) ---- */
    const laceHoleGeom = new THREE.TorusGeometry(0.015, 0.005, 6, 12);

    return { soleGeom, midsoleGeom, upperGeom, tongueGeom, heelGeom, swooshGeom, laceHoleGeom };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Materials                                                           */
/* ------------------------------------------------------------------ */
function useSneakerMaterials(
  upperColor: string,
  soleColor: string,
  accentColor: string,
  opacity: number,
) {
  return useMemo(() => {
    const upperMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(upperColor),
      roughness: 0.55,
      metalness: 0.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      sheen: 0.8,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color('#FFFFFF'),
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
    });

    const soleMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(soleColor),
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity,
    });

    const accentMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.5,
      transparent: true,
      opacity,
    });

    const metalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#C9A96E'),
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity,
    });

    return { upperMat, soleMat, accentMat, metalMat };
  }, [upperColor, soleColor, accentColor, opacity]);
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function SneakerModel({
  scrollProgress = 0,
  mouseX = 0,
  mouseY = 0,
  visible = true,
  opacity = 1,
  rotationY,
  rotationX,
  color = '#F5F0EB',
  soleColor = '#E8E0D6',
  accentColor = '#C9A96E',
  position = [0, 0, 0],
  scale = 1,
}: SneakerModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothRotation = useRef({ x: 0, y: 0 });

  const { soleGeom, midsoleGeom, upperGeom, tongueGeom, heelGeom, swooshGeom, laceHoleGeom } =
    useSneakerGeometries();
  const { upperMat, soleMat, accentMat, metalMat } = useSneakerMaterials(
    color,
    soleColor,
    accentColor,
    opacity,
  );

  useEffect(() => {
    upperMat.opacity = opacity;
    soleMat.opacity = opacity;
    accentMat.opacity = opacity;
    metalMat.opacity = opacity;
    upperMat.needsUpdate = true;
    soleMat.needsUpdate = true;
    accentMat.needsUpdate = true;
    metalMat.needsUpdate = true;
  }, [upperMat, soleMat, accentMat, metalMat, opacity]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const targetY = rotationY !== undefined ? rotationY : scrollProgress * Math.PI * 2 + mouseX * 0.15;
    const targetX = rotationX !== undefined ? rotationX : -0.3 + mouseY * 0.1;

    const speed = 1 - Math.pow(0.001, delta);
    smoothRotation.current.x += (targetX - smoothRotation.current.x) * speed;
    smoothRotation.current.y += (targetY - smoothRotation.current.y) * speed;

    groupRef.current.rotation.x = smoothRotation.current.x;
    groupRef.current.rotation.y = smoothRotation.current.y;
  });

  useEffect(() => {
    return () => {
      soleGeom.dispose();
      midsoleGeom.dispose();
      upperGeom.dispose();
      tongueGeom.dispose();
      heelGeom.dispose();
      swooshGeom.dispose();
      laceHoleGeom.dispose();
      upperMat.dispose();
      soleMat.dispose();
      accentMat.dispose();
      metalMat.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <Float speed={1.8} rotationIntensity={0} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
      <group ref={groupRef} position={position} scale={scale} dispose={null}>
        {/* Sole */}
        <mesh geometry={soleGeom} material={soleMat} position={[0, -0.15, 0]} castShadow receiveShadow />

        {/* Midsole */}
        <mesh
          geometry={midsoleGeom}
          material={soleMat}
          position={[0, -0.08, 0]}
          scale={[1.05, 1, 1.05]}
          castShadow
        />

        {/* Upper */}
        <mesh
          geometry={upperGeom}
          material={upperMat}
          position={[0, 0.06, 0]}
          castShadow
          receiveShadow
        />

        {/* Tongue */}
        <mesh
          geometry={tongueGeom}
          material={upperMat}
          position={[0, 0.2, 0.05]}
        />

        {/* Heel tab */}
        <mesh
          geometry={heelGeom}
          material={accentMat}
          position={[-0.32, 0.08, 0]}
          castShadow
        />

        {/* Swoosh – left side */}
        <mesh
          geometry={swooshGeom}
          material={accentMat}
          position={[0, 0.02, 0.16]}
          rotation={[0, 0, 0]}
        />

        {/* Swoosh – right side */}
        <mesh
          geometry={swooshGeom}
          material={accentMat}
          position={[0, 0.02, -0.16]}
          rotation={[0, Math.PI, 0]}
        />

        {/* Lace holes */}
        {[0.06, 0.12, 0.18].map((yOff, i) => (
          <group key={i}>
            <mesh
              geometry={laceHoleGeom}
              material={metalMat}
              position={[0.06, 0.1 + yOff, 0.07]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              geometry={laceHoleGeom}
              material={metalMat}
              position={[0.06, 0.1 + yOff, -0.07]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </group>
        ))}
      </group>
    </Float>
  );
}
