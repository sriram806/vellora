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
  const { isIntroPlaying, isReady } = useIntro();
  const shouldHide = isIntroPlaying || !isReady;

  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: 99999,
          pointerEvents: shouldHide ? 'none' : 'auto',
          transform: shouldHide ? 'translateY(-100%)' : 'none',
          opacity: shouldHide ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out',
          transitionDelay: shouldHide ? '0s' : '0.1s',
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
          opacity: shouldHide ? 0 : 1,
          pointerEvents: shouldHide ? 'none' : 'auto',
          transition: 'opacity 0.8s ease-out',
          transitionDelay: shouldHide ? '0s' : '0.3s',
        }}
      >
        {footer}
      </div>
    </>
  );
}
