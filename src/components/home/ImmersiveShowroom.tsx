'use client';

import React from 'react';
import ShowroomCanvas from '@/components/three/ShowroomCanvas';
import { useIntro } from '@/hooks/IntroContext';

export default function ImmersiveShowroom() {
  const { isIntroPlaying } = useIntro();

  return (
    <section className="relative h-[60vh] min-h-[500px] bg-black border-t border-border">
      {!isIntroPlaying && <ShowroomCanvas />}
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[14vw] pl-18 font-black tracking-[0.35em] text-white/[0.05] whitespace-nowrap">
          VELLORA
        </h1>
      </div>
    </section>
  );
}
