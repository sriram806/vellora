'use client';

import React, { type ReactNode } from 'react';
import { useIntro } from '@/hooks/IntroContext';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* IntroAwareShell                                                     */
/* Wraps Navbar, content, and Footer. During the intro, Navbar and     */
/* Footer are hidden with CSS transitions. When the intro completes,   */
/* they smoothly animate into view.                                    */
/* ------------------------------------------------------------------ */

interface IntroAwareShellProps {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export default function IntroAwareShell({
  navbar,
  footer,
  children,
}: IntroAwareShellProps) {
  const { isIntroPlaying } = useIntro();

  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: 99999,
          pointerEvents: isIntroPlaying ? 'none' : 'auto',
          transform: isIntroPlaying ? 'translateY(-100%)' : 'none',
          opacity: isIntroPlaying ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out',
          transitionDelay: isIntroPlaying ? '0s' : '0.1s',
        }}
      >
        {navbar}
      </div>

      {/* ── Main content: slides up and fades in when intro completes ── */}
      <main className="flex-grow">
        {children}
      </main>

      {/* ── Footer: fades in when intro completes ────────────────── */}
      <div
        style={{
          opacity: isIntroPlaying ? 0 : 1,
          transition: 'opacity 0.8s ease-out',
          transitionDelay: isIntroPlaying ? '0s' : '0.3s',
        }}
      >
        {footer}
      </div>
    </>
  );
}
