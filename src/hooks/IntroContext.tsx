'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface IntroContextValue {
  /** Whether the cinematic intro is currently playing */
  isIntroPlaying: boolean;
  /** Mark the intro as complete and persist to sessionStorage */
  completeIntro: () => void;
  /** Whether the initial sessionStorage check has been performed */
  isReady: boolean;
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */
const IntroContext = createContext<IntroContextValue>({
  isIntroPlaying: false,
  completeIntro: () => {},
  isReady: false,
});

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  /* On mount, check if intro was already played this session */
  useEffect(() => {
    try {
      const played = sessionStorage.getItem('vellora_intro_played');
      /* Also respect prefers-reduced-motion */
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!played && !reducedMotion) {
        setIsIntroPlaying(true);
      }
    } catch {
      /* sessionStorage not available (SSR, privacy mode, etc.) */
    }
    setIsReady(true);
  }, []);

  const completeIntro = useCallback(() => {
    setIsIntroPlaying(false);
    try {
      sessionStorage.setItem('vellora_intro_played', 'true');
    } catch {}
  }, []);

  return (
    <IntroContext.Provider value={{ isIntroPlaying, completeIntro, isReady }}>
      {children}
    </IntroContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */
export function useIntro() {
  return useContext(IntroContext);
}
