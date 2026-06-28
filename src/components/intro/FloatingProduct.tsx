'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export interface FloatingProductProps {
  /** Path to the texture image (relative to /public) */
  texturePath: string;
  /** 3D position [x, y, z] */
  position: [number, number, number];
  /** Initial Y-axis rotation in radians */
  rotation?: number;
  /** Uniform scale multiplier */
  scale?: number;
  /** Vertical float speed multiplier */
  floatSpeed?: number;
  /** Vertical float amplitude */
  floatAmplitude?: number;
  /** Y-axis rotation speed (rad/s) */
  rotationSpeed?: number;
  /** Horizontal drift amplitude */
  driftAmplitude?: number;
  /** Whether this product is currently "highlighted" (camera near) */
  highlighted?: boolean;
  /** Index of the garment in the array */
  idx: number;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function FloatingProduct({
  texturePath,
  position,
  rotation = 0,
  scale = 1,
  floatSpeed = 0.5,
  floatAmplitude = 0.01, // extremely subtle breathing float
  rotationSpeed = 0,
  driftAmplitude = 0.002, // minimal drift
  highlighted = false,
  idx,
}: FloatingProductProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  /* Load texture with alpha support */
  const texture = useTexture(texturePath);

  /* Calculate aspect ratio from texture for correct proportions */
  const aspect = useMemo(() => {
    const img = texture.image as { width?: number; height?: number } | null;
    if (img?.width && img?.height) {
      return img.width / img.height;
    }
    return 0.75; // fallback ~3:4
  }, [texture]);

  /* Plane dimensions based on texture aspect ratio */
  const planeHeight = 2.2 * scale;
  const planeWidth = planeHeight * aspect;

  /* Store initial position and a random phase offset for organic motion */
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  /* Per-frame highlight target for smooth lerping */
  const highlightIntensity = useRef(0);

  /* ---------------------------------------------------------------- */
  /* Animation loop                                                    */
  /* ---------------------------------------------------------------- */
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = state.clock.elapsedTime;

    /* Smooth highlight lerp */
    const targetHighlight = highlighted ? 1 : 0;
    highlightIntensity.current += (targetHighlight - highlightIntensity.current) * 0.06;
    const hi = highlightIntensity.current;

    /* Gentle vertical float */
    const floatY = Math.sin((t + phaseOffset) * floatSpeed) * floatAmplitude;

    /* Horizontal drift */
    const driftX = Math.sin((t + phaseOffset) * 0.2) * driftAmplitude;

    /* Museum exhibition rise mechanics for Hoodie 1 (idx === 1) */
    let currentY = initialPos.y + floatY;
    if (idx === 1) {
      // Hoodie 1 slowly rises from floor
      currentY = (initialPos.y - 0.7) + (0.7 * hi) + floatY;
    }

    meshRef.current.position.set(
      initialPos.x + driftX,
      currentY,
      initialPos.z,
    );

    /* Controlled rotation for luxury museum exhibit feel */
    if (idx === 0) {
      // Shirt 1 rotates slowly only a few degrees when active
      meshRef.current.rotation.y = rotation + (hi * 0.12);
    } else if (idx === 2) {
      // Shirt 2 remains completely still (light does the moving)
      meshRef.current.rotation.y = rotation;
    } else if (idx === 1) {
      // Hoodie 1 turns/unfolds slightly
      meshRef.current.rotation.y = rotation + (hi * 0.08);
    }

    /* Emissive glow when highlighted */
    materialRef.current.emissiveIntensity = hi * 0.15;
    materialRef.current.clearcoat = 0.4 + hi * 0.3;
    materialRef.current.opacity = 0.12 + 0.88 * hi;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {/* Plane geometry prevents texture doubling on thin edges */}
      <planeGeometry args={[planeWidth, planeHeight]} />

      <meshPhysicalMaterial
        ref={materialRef}
        map={texture}
        alphaMap={texture}
        transparent
        alphaTest={0.05}
        side={THREE.DoubleSide}
        /* PBR properties for luxury material feel */
        roughness={0.35}
        metalness={0.05}
        clearcoat={0.4}
        clearcoatRoughness={0.2}
        envMapIntensity={0.8}
        /* Subtle emissive for highlight glow */
        emissive={new THREE.Color('#C9A96E')}
        emissiveIntensity={0}
        toneMapped
      />
    </mesh>
  );
}
