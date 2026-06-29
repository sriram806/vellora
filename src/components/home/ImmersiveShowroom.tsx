'use client';

import React from 'react';
import ShowroomCanvas from '@/components/three/ShowroomCanvas';
import { useIntro } from '@/hooks/IntroContext';

export default function ImmersiveShowroom() {
  const { isIntroPlaying } = useIntro();

  return (
    <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-black border-t border-border">
      {!isIntroPlaying && <ShowroomCanvas />}
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] sm:text-[14vw] font-black tracking-[0.2em] sm:tracking-[0.35em] text-white/[0.05] whitespace-nowrap">
          JCOPS
        </h1>
      </div>
    </section>
  );
}
