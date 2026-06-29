'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ViewerProps {
  category: 't-shirts' | 'pants' | 'sneakers' | 'outerwear' | 'accessories';
}

function PointCloud({ category }: ViewerProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [particleTexture, setParticleTexture] = useState<THREE.Texture | undefined>(undefined);
  const count = 2500;

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);
    setParticleTexture(texture);
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    const randomInCylinder = (radius: number, height: number, centerY: number, centerX: number = 0) => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      return {
        x: centerX + Math.cos(angle) * r,
        y: centerY + (Math.random() - 0.5) * height,
        z: Math.sin(angle) * r,
      };
    };

    const randomInBox = (w: number, h: number, d: number, cx: number, cy: number, cz: number) => {
      return {
        x: cx + (Math.random() - 0.5) * w,
        y: cy + (Math.random() - 0.5) * h,
        z: cz + (Math.random() - 0.5) * d,
      };
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let point = { x: 0, y: 0, z: 0 };

      if (category === 't-shirts') {
        const rand = Math.random();
        if (rand < 0.7) {
          point = randomInCylinder(0.6, 1.2, 0);
        } else if (rand < 0.85) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * 0.2;
          const len = Math.random() * 0.45;
          point = { x: -0.6 - len * 0.8, y: 0.3 - len * 0.4, z: Math.sin(angle) * r };
        } else {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * 0.2;
          const len = Math.random() * 0.45;
          point = { x: 0.6 + len * 0.8, y: 0.3 - len * 0.4, z: Math.sin(angle) * r };
        }
      } else if (category === 'pants') {
        const rand = Math.random();
        if (rand < 0.2) {
          point = randomInCylinder(0.45, 0.3, 0.4);
        } else if (rand < 0.6) {
          point = randomInCylinder(0.18, 1.1, -0.3, -0.2);
        } else {
          point = randomInCylinder(0.18, 1.1, -0.3, 0.2);
        }
      } else if (category === 'sneakers') {
        const rand = Math.random();
        if (rand < 0.6) {
          point = randomInBox(0.3, 0.2, 0.7, 0, -0.3, 0);
        } else {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.12;
          point = { x: Math.cos(angle) * r, y: -0.1 + Math.random() * 0.2, z: -0.2 + Math.sin(angle) * r };
        }
      } else if (category === 'outerwear') {
        // Thick cylinder coat shape
        const rand = Math.random();
        if (rand < 0.75) {
          point = randomInCylinder(0.7, 1.5, -0.1);
        } else {
          // Sleeves
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.2;
          const len = Math.random() * 0.6;
          const side = Math.random() > 0.5 ? 1 : -1;
          point = { x: side * (0.7 + len * 0.4), y: 0.2 - len * 0.8, z: Math.sin(angle) * r };
        }
      } else {
        // Accessories (Spherical/box shape, like a bag or belt loop)
        const angle = Math.random() * Math.PI * 2;
        const u = Math.random() * 2 - 1;
        const r = 0.5;
        point = {
          x: Math.sqrt(1 - u * u) * Math.cos(angle) * r,
          y: Math.sqrt(1 - u * u) * Math.sin(angle) * r,
          z: u * r,
        };
      }

      pos[i3] = point.x;
      pos[i3 + 1] = point.y;
      pos[i3 + 2] = point.z;
    }
    return pos;
  }, [category]);

  // Subtle breathing rotation
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#C9A96E"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={particleTexture}
      />
    </points>
  );
}

export default function Interactive360Viewer({ category }: ViewerProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing border border-border bg-JCOPS-deep-black/60 rounded"
      data-cursor="drag"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      <Canvas camera={{ position: [0, 0, 2.0], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <PointCloud category={category} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-[9px] ui-text text-zinc-500 pointer-events-none select-none">
        Drag to inspect 360° wireframe
      </div>
    </div>
  );
}
