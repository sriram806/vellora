'use client';

import React, { useState, useEffect, useRef, useCallback, Component, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './SplashScreen';
import { useIntro } from '@/hooks/IntroContext';

/* ------------------------------------------------------------------ */
/* Dynamic imports — avoid loading Three.js when intro is skipped      */
/* ------------------------------------------------------------------ */
const IntroScene = dynamic(() => import('./IntroScene'), { ssr: false });
const MobileIntroScene = dynamic(() => import('./MobileIntroScene'), { ssr: false });

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type IntroPhase = 'splash' | 'showcase' | 'transition' | 'complete';

interface IntroExperienceProps {
  children: React.ReactNode;
}

class IntroSceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[IntroExperience] 3D intro failed:', error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function IntroExperience({ children }: IntroExperienceProps) {
  const { isIntroPlaying, completeIntro, isReady } = useIntro();
  const [phase, setPhase] = useState<IntroPhase>('splash');
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ── Detect mobile / low-end on mount ──────────────────────────── */
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window;
      /* Check for low-end GPU hint */
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      let isLowEnd = false;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          isLowEnd = /SwiftShader|llvmpipe|Software/i.test(renderer);
        }
      }
      setIsMobile(width < 768 || (isTouchDevice && width < 1024) || isLowEnd);
    };
    checkMobile();
  }, []);

  /* ── Lock body scroll during intro ─────────────────────────────── */
  useEffect(() => {
    if (isIntroPlaying && phase !== 'complete') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isIntroPlaying, phase]);

  /* ── Phase transition handlers ─────────────────────────────────── */
  const handleSplashComplete = useCallback(() => {
    setPhase('showcase');
  }, []);

  const handleShowcaseComplete = useCallback(() => {
    setPhase('transition');
    /* After the transition animation, mark complete */
    setTimeout(() => {
      setPhase('complete');
      completeIntro();
    }, 1500);
  }, [completeIntro]);

  const handleSkip = useCallback(() => {
    setPhase('transition');
    setTimeout(() => {
      setPhase('complete');
      completeIntro();
    }, 800);
  }, [completeIntro]);

  const handleSceneError = useCallback(() => {
    setPhase('complete');
    completeIntro();
  }, [completeIntro]);

  /* ── Don't render overlay if intro already played or not ready ─── */
  if (!isReady) {
    /* Prevent hydration flash: render a solid black full-screen wrapper during SSR/mount */
    return (
      <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center">
        <div style={{ opacity: 0, pointerEvents: 'none' }}>
          {children}
        </div>
      </div>
    );
  }

  if (!isIntroPlaying) {
    /* Intro already played or skipped — render children directly */
    return <>{children}</>;
  }

  /* ── Intro is playing ──────────────────────────────────────────── */
  return (
    <div className="relative">
      {/* ── Homepage content (pre-rendered, hidden behind overlay) ── */}
      <div
        className="relative"
        style={{
          opacity: phase === 'complete' ? 1 : 0,
          transform: phase === 'complete' ? 'translateY(0)' : 'translateY(35px)',
          transition: 'opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: phase === 'complete' ? 'auto' : 'none',
        }}
      >
        {children}
      </div>

      {/* ── Intro overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase !== 'complete' && (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ background: '#000' }}
          >
            {/* ── Phase 1: Splash Screen ─────────────────────────── */}
            <AnimatePresence>
              {phase === 'splash' && (
                <SplashScreen onComplete={handleSplashComplete} />
              )}
            </AnimatePresence>

            {/* ── Phase 2: Showcase (3D or Mobile 2D) ────────────── */}
            <AnimatePresence>
              {(phase === 'showcase' || phase === 'transition') && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  {isMobile ? (
                    <MobileIntroScene onComplete={handleShowcaseComplete} />
                  ) : (
                    <IntroSceneErrorBoundary onError={handleSceneError}>
                      <IntroScene onCameraComplete={handleShowcaseComplete} />
                    </IntroSceneErrorBoundary>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Skip button ─────────────────────────────────────── */}
            <motion.button
              className="fixed bottom-8 right-8 z-[120] px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              onClick={handleSkip}
              aria-label="Skip intro animation"
            >
              Skip Intro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
