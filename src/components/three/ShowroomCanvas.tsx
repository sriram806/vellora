'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MorphingParticles from './MorphingParticles';

export default function ShowroomCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#C9A96E" />
        
        <Suspense fallback={null}>
          <MorphingParticles />
        </Suspense>
      </Canvas>
      
      {/* Dynamic Grid Overlay in WebGL Background */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
    </div>
  );
}
